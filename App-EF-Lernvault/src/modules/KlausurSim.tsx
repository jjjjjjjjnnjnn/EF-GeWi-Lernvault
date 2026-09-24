import React, { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { VaultNote } from "../vault/parser";
import { MasteryEngine } from "../engine/mastery";
import { MasteryRadar } from "../components/MasteryRadar";
import {
  EXAM_SUBJECT_ORDER,
  composeExamVariants,
  getActiveTaskIds,
  getExamAfbPointTotals,
  getExamMaxPoints,
  gradeComposedExam,
  normalizeExamSubject,
  type ComposedExam,
  type ComposedExamGrade,
  type ComposedExamTask,
  type ExamCourseType,
  type ExamOptionSelections,
  type MathToolset,
} from "../engine/examComposer";

export interface KlausurSimProps {
  notes: VaultNote[];
  currentFach?: string;
  onSubjectChange?: (fach: string) => void;
}

const PRACTICE_MINUTES = 45;

const pageStyle: CSSProperties = {
  color: "var(--ink)",
  background: "var(--paper)",
  borderColor: "var(--line, var(--hairline))",
};

const panelStyle: CSSProperties = {
  color: "var(--ink)",
  background: "var(--paper-subtle)",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "var(--line, var(--hairline))",
  borderRadius: "var(--radius, 5px)",
};

const paperPanelStyle: CSSProperties = {
  color: "var(--ink)",
  background: "var(--surface)",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "var(--line, var(--hairline))",
  borderRadius: "var(--radius, 5px)",
};

const controlStyle: CSSProperties = {
  color: "var(--ink)",
  background: "var(--surface)",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "var(--line, var(--hairline))",
  borderRadius: "var(--radius, 5px)",
  minHeight: 32,
  padding: "4px 8px",
};

const buttonStyle: CSSProperties = {
  color: "var(--ink)",
  background: "var(--surface)",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "var(--line, var(--hairline))",
  borderRadius: "var(--radius, 5px)",
  padding: "5px 10px",
  cursor: "pointer",
};

const primaryButtonStyle: CSSProperties = {
  ...buttonStyle,
  color: "var(--paper)",
  background: "var(--accent)",
  borderColor: "var(--accent)",
};

const mutedStyle: CSSProperties = {
  color: "var(--gray, var(--ink-secondary))",
};

function formatTimer(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const rest = safeSeconds % 60;
  return [hours, minutes, rest]
    .map((part) => part.toString().padStart(2, "0"))
    .join(":");
}

function formatMinutes(minutes: number | null): string {
  if (minutes === null) return "nicht vorgesehen";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours > 0 ? `${hours} Std. ${rest} Min.` : `${rest} Min.`;
}

function orderSubjects(subjects: readonly string[]): string[] {
  const unique = Array.from(new Set(subjects.filter(Boolean)));
  const known = EXAM_SUBJECT_ORDER.filter((subject) => unique.includes(subject));
  const additional = unique
    .filter((subject) => !EXAM_SUBJECT_ORDER.includes(subject as (typeof EXAM_SUBJECT_ORDER)[number]))
    .sort((a, b) => a.localeCompare(b, "de"));
  return [...known, ...additional];
}

function defaultSelections(exam: ComposedExam): ExamOptionSelections {
  return Object.fromEntries(
    Object.entries(exam.defaultOptionSelections).map(([groupId, taskIds]) => [groupId, [...taskIds]])
  );
}

export const KlausurSim: React.FC<KlausurSimProps> = ({
  notes,
  currentFach,
  onSubjectChange,
}) => {
  const availableSubjects = useMemo(
    () => orderSubjects(notes.map((note) => note.fach)),
    [notes]
  );
  const initialSubject =
    currentFach && currentFach !== "alle" && availableSubjects.includes(currentFach)
      ? currentFach
      : availableSubjects[0] ?? "Deutsch";
  const [subject, setSubject] = useState(initialSubject);
  const [courseType, setCourseType] = useState<ExamCourseType>("LK");
  const [mathToolset, setMathToolset] = useState<MathToolset>("WTR");
  const [compositionMode, setCompositionMode] = useState<"auto" | "variant">("auto");
  const [variantIndex, setVariantIndex] = useState(0);
  const [composeNonce, setComposeNonce] = useState(0);
  const [exam, setExam] = useState<ComposedExam | null>(null);
  const [optionSelections, setOptionSelections] = useState<ExamOptionSelections>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [gradingResult, setGradingResult] = useState<ComposedExamGrade | null>(null);
  const [timerMode, setTimerMode] = useState<"practice" | "official">("practice");
  const [secondsRemaining, setSecondsRemaining] = useState(PRACTICE_MINUTES * 60);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [timerExpired, setTimerExpired] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  const [radarVersion, setRadarVersion] = useState(0);
  const [masterySaved, setMasterySaved] = useState(false);
  const [copiedPatch, setCopiedPatch] = useState(false);
  const masteryEngine = useMemo(() => new MasteryEngine(), []);

  const subjectNotes = useMemo(
    () =>
      notes.filter((note) => {
        const normalizedNote = normalizeExamSubject(note.fach) ?? note.fach;
        const normalizedSubject = normalizeExamSubject(subject) ?? subject;
        return normalizedNote === normalizedSubject;
      }),
    [notes, subject]
  );

  useEffect(() => {
    if (currentFach && currentFach !== "alle" && availableSubjects.includes(currentFach)) {
      setSubject(currentFach);
      return;
    }
    const fallbackSubject = availableSubjects[0];
    setSubject((current) =>
      availableSubjects.includes(current) ? current : fallbackSubject ?? current
    );
    if (
      currentFach &&
      currentFach !== "alle" &&
      fallbackSubject &&
      currentFach !== fallbackSubject
    ) {
      onSubjectChange?.(fallbackSubject);
    }
  }, [availableSubjects, currentFach, onSubjectChange]);

  const composition = useMemo(() => {
    if (subjectNotes.length === 0) {
      return { exams: [] as ComposedExam[], error: null as string | null };
    }
    try {
      return {
        exams: composeExamVariants(subjectNotes, subject, courseType, 3, {
          seed: (2026 + composeNonce * 1009) >>> 0,
          masteryLookup: (topicId) => masteryEngine.getTopicMastery(topicId),
          weakTopicBoost: 3,
          mathToolset,
        }),
        error: null,
      };
    } catch (error) {
      return {
        exams: [] as ComposedExam[],
        error: error instanceof Error ? error.message : "Die Prüfung konnte nicht zusammengestellt werden.",
      };
    }
  }, [composeNonce, courseType, masteryEngine, mathToolset, subject, subjectNotes]);

  useEffect(() => {
    if (variantIndex >= composition.exams.length) setVariantIndex(0);
  }, [composition.exams.length, variantIndex]);

  const activeVariantIndex = Math.min(
    variantIndex,
    Math.max(0, composition.exams.length - 1)
  );
  const activeExam = composition.exams[activeVariantIndex] ?? null;

  useEffect(() => {
    setExam(activeExam);
    if (!activeExam) {
      setOptionSelections({});
      setAnswers({});
      setGradingResult(null);
      return;
    }
    setOptionSelections(defaultSelections(activeExam));
    setAnswers({});
    setGradingResult(null);
    setMasterySaved(false);
    setCopiedPatch(false);
  }, [activeExam]);

  const officialMinutes = activeExam?.officialWorkingTimeMinutes ?? null;
  const effectiveMinutes = timerMode === "practice" ? PRACTICE_MINUTES : officialMinutes;

  useEffect(() => {
    if (timerMode === "official" && officialMinutes === null) setTimerMode("practice");
  }, [officialMinutes, timerMode]);

  useEffect(() => {
    const seconds = (effectiveMinutes ?? 0) * 60;
    setSecondsRemaining(seconds);
    setDeadline(null);
    setTimerExpired(false);
  }, [effectiveMinutes, exam?.id]);

  useEffect(() => {
    if (deadline === null) return;
    const update = () => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining === 0) {
        setDeadline(null);
        setTimerExpired(true);
      }
    };
    update();
    const interval = window.setInterval(update, 250);
    return () => window.clearInterval(interval);
  }, [deadline]);

  const activeTaskIds = exam ? getActiveTaskIds(exam, optionSelections) : [];
  const activeTaskIdSet = new Set(activeTaskIds);
  const activeTasks = exam?.tasks.filter((task) => activeTaskIdSet.has(task.id)) ?? [];
  const totalPoints = exam ? getExamMaxPoints(exam, optionSelections) : 0;
  const afbTotals = exam
    ? getExamAfbPointTotals(exam, optionSelections)
    : { "AFB I": 0, "AFB II": 0, "AFB III": 0 };

  const handleSubjectChange = (nextSubject: string) => {
    setSubject(nextSubject);
    setVariantIndex(0);
    setCompositionMode("auto");
    setComposeNonce((value) => value + 1);
    setTimerMode("practice");
    onSubjectChange?.(nextSubject);
  };

  const handleCourseChange = (nextCourse: ExamCourseType) => {
    setCourseType(nextCourse);
    setVariantIndex(0);
    setComposeNonce((value) => value + 1);
  };

  const handleRecompose = () => {
    setComposeNonce((value) => value + 1);
    setVariantIndex(0);
    setCompositionMode("auto");
  };

  const handleTimerToggle = () => {
    setGradingResult(null);
    if (deadline !== null) {
      setDeadline(null);
      return;
    }
    const startingSeconds = secondsRemaining > 0
      ? secondsRemaining
      : (effectiveMinutes ?? PRACTICE_MINUTES) * 60;
    setSecondsRemaining(startingSeconds);
    setTimerExpired(false);
    setDeadline(Date.now() + startingSeconds * 1000);
  };

  const handleAnswerChange = (taskId: string, value: string) => {
    setAnswers((current) => ({ ...current, [taskId]: value }));
  };

  const handleOptionChange = (groupId: string, taskId: string) => {
    if (!exam) return;
    const group = exam.optionGroups.find((item) => item.id === groupId);
    if (!group) return;
    const current = optionSelections[groupId] ?? exam.defaultOptionSelections[groupId] ?? [];
    let next: string[];
    if (group.choose === 1) {
      next = [taskId];
    } else if (current.includes(taskId)) {
      next = [...current];
    } else if (current.length < group.choose) {
      next = [...current, taskId];
    } else {
      next = [current[0], taskId];
    }
    setOptionSelections((selections) => ({ ...selections, [groupId]: next }));
    setGradingResult(null);
  };

  const handleSubmit = () => {
    if (!exam) return;
    setDeadline(null);
    setGradingResult(gradeComposedExam(exam, answers, optionSelections));
  };

  const handleRecordToMastery = () => {
    if (!exam || !gradingResult) return;
    const outcomes = new Map<string, { note: VaultNote | undefined; passed: boolean }>();
    for (const task of activeTasks) {
      const taskGrade = gradingResult.taskGrades.find((item) => item.taskId === task.id);
      const passed = taskGrade ? taskGrade.points / Math.max(1, taskGrade.maxPoints) >= 0.5 : false;
      const note = subjectNotes.find((item) => item.path === task.sourceNotePaths[0]);
      for (const topicId of task.topicIds) {
        const current = outcomes.get(topicId);
        outcomes.set(topicId, { note: note ?? current?.note, passed: passed || Boolean(current?.passed) });
      }
    }
    for (const [topicId, outcome] of outcomes) {
      masteryEngine.recordAttempt(
        topicId,
        outcome.note?.thema ?? exam.subject,
        exam.subject,
        outcome.passed,
        [exam.subject, ...(outcome.note?.tags ?? [])]
      );
    }
    setMasterySaved(true);
    setRadarVersion((version) => version + 1);
  };

  const handleCopyPatch = () => {
    if (!gradingResult || !exam) return;
    const patch = gradingResult.taskGrades
      .flatMap((taskGrade) => {
        const task = exam.tasks.find((item) => item.id === taskGrade.taskId);
        return taskGrade.missingCriteriaDE.map(
          (criterion) => `- [ ] ${task?.sourceNotePaths[0] ?? exam.subject} (${task?.code ?? taskGrade.taskId}): ${criterion}`
        );
      })
      .join("\n");
    if (!navigator.clipboard) return;
    void navigator.clipboard.writeText(patch).then(() => {
      setCopiedPatch(true);
      window.setTimeout(() => setCopiedPatch(false), 2500);
    });
  };

  if (availableSubjects.length === 0) {
    return (
      <div className="font-sans p-8 text-center" style={panelStyle}>
        <p>Für die Vollsimulation werden Lernnotizen mit Fachzuordnung benötigt.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-2 font-sans space-y-4" style={pageStyle}>
      <section className="p-4 space-y-4" style={panelStyle}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-serif text-xl font-semibold">Vollsimulationsprüfung</h1>
            <p className="text-xs mt-1" style={mutedStyle}>
              Selbst zusammengestellte Übungsaufgaben aus {subjectNotes.length} Lernnotizen. Die ausgewiesenen Indikatoren bleiben für diese Übung fix.
            </p>
          </div>
          <button type="button" style={buttonStyle} onClick={() => setShowRadar((value) => !value)}>
            {showRadar ? "Kompetenz-Radar ausblenden" : "Kompetenz-Radar anzeigen"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <label className="text-xs space-y-1">
            <span className="block">Fach</span>
            <select
              className="w-full font-sans text-sm"
              style={controlStyle}
              value={subject}
              onChange={(event) => handleSubjectChange(event.target.value)}
            >
              {availableSubjects.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-xs space-y-1">
            <span className="block">Kursform</span>
            <select
              className="w-full font-sans text-sm"
              style={controlStyle}
              value={courseType}
              onChange={(event) => handleCourseChange(event.target.value as ExamCourseType)}
            >
              <option value="GK">Grundkurs (GK)</option>
              <option value="LK">Leistungskurs (LK)</option>
            </select>
          </label>
          {subject === "Mathe" && (
            <label className="text-xs space-y-1">
              <span className="block">Teil-2-System</span>
              <select
                className="w-full font-sans text-sm"
                style={controlStyle}
                value={mathToolset}
                onChange={(event) => {
                  setMathToolset(event.target.value as MathToolset);
                  setComposeNonce((value) => value + 1);
                  setVariantIndex(0);
                }}
              >
                <option value="WTR">WTR</option>
                <option value="CAS">CAS/MMS</option>
              </select>
            </label>
          )}
          <label className="text-xs space-y-1">
            <span className="block">Zusammenstellung</span>
            <select
              className="w-full font-sans text-sm"
              style={controlStyle}
              value={compositionMode}
              onChange={(event) => setCompositionMode(event.target.value as "auto" | "variant")}
            >
              <option value="auto">Automatisch nach BKT-Schwäche</option>
              <option value="variant">Variante auswählen</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          {compositionMode === "variant" && composition.exams.length > 0 && (
            <label className="text-xs space-y-1">
              <span className="block">Variante</span>
              <select
                className="font-sans text-sm"
                style={controlStyle}
                value={activeVariantIndex}
                onChange={(event) => setVariantIndex(Number(event.target.value))}
              >
                {composition.exams.map((item, index) => (
                  <option key={item.id} value={index}>Variante {index + 1}</option>
                ))}
              </select>
            </label>
          )}
          <button type="button" style={buttonStyle} onClick={handleRecompose}>
            Neu automatisch komponieren
          </button>
          <div className="text-xs" style={mutedStyle}>
            Amtliche Arbeitszeit: {formatMinutes(officialMinutes)}
          </div>
        </div>
      </section>

      {showRadar && (
        <MasteryRadar key={`${subject}-${radarVersion}`} fach={subject} />
      )}

      {composition.error && (
        <div className="p-4 text-sm" style={paperPanelStyle}>
          {composition.error}
        </div>
      )}

      {exam && (
        <>
          <section className="p-4 space-y-3" style={panelStyle}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-lg font-semibold">
                  {exam.subject} · {courseType === "LK" ? "Leistungskurs" : "Grundkurs"}
                </h2>
                <p className="text-xs mt-1" style={mutedStyle}>
                  {timerMode === "practice"
                    ? `Praxismodus: ${PRACTICE_MINUTES} Minuten, nicht die reale Prüfungszeit.`
                    : `Prüfungsmodus: ${formatMinutes(officialMinutes)} gemäß NRW 2026.`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  aria-label="Zeitmodus"
                  className="font-sans text-xs"
                  style={controlStyle}
                  value={timerMode}
                  onChange={(event) => {
                    setTimerMode(event.target.value as "practice" | "official");
                    setGradingResult(null);
                  }}
                >
                  <option value="practice">Praxiszeit: {PRACTICE_MINUTES} Min.</option>
                  <option value="official" disabled={officialMinutes === null}>
                    Prüfungszeit: {formatMinutes(officialMinutes)}
                  </option>
                </select>
                <div className="font-mono text-lg font-semibold" style={secondsRemaining <= 300 ? { color: "var(--accent)" } : undefined}>
                  {formatTimer(secondsRemaining)}
                </div>
                <button type="button" style={buttonStyle} onClick={handleTimerToggle}>
                  {deadline !== null ? "Pause" : secondsRemaining === 0 ? "Neu starten" : "Start"}
                </button>
              </div>
            </div>
            {timerExpired && (
              <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                Zeit abgelaufen. Die verbleibende Zeit kann nicht als Prüfungszeit weiterlaufen.
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div style={paperPanelStyle} className="p-2">Gesamt: {totalPoints} Übungspunkte</div>
              <div style={paperPanelStyle} className="p-2">AFB I: {afbTotals["AFB I"]} P.</div>
              <div style={paperPanelStyle} className="p-2">AFB II: {afbTotals["AFB II"]} P.</div>
              <div style={paperPanelStyle} className="p-2">AFB III: {afbTotals["AFB III"]} P.</div>
            </div>
            <ul className="text-xs space-y-1" style={mutedStyle}>
              {exam.rulesDE.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </section>

          {exam.optionGroups.length > 0 && (
            <section className="p-4 space-y-3" style={paperPanelStyle}>
              {exam.optionGroups.map((group) => {
                const selected = optionSelections[group.id] ?? exam.defaultOptionSelections[group.id] ?? [];
                return (
                  <div key={group.id} className="space-y-2">
                    <h3 className="font-serif font-semibold text-sm">{group.titleDE}</h3>
                    <p className="text-xs" style={mutedStyle}>Auswahl: {selected.length} / {group.choose}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {group.taskIds.map((taskId) => {
                        const task = exam.tasks.find((item) => item.id === taskId);
                        if (!task) return null;
                        const checked = selected.includes(taskId);
                        return (
                          <label
                            key={task.id}
                            className="flex items-start gap-2 p-2 text-xs"
                            style={{ ...paperPanelStyle, cursor: "pointer" }}
                          >
                            <input
                              type={group.choose === 1 ? "radio" : "checkbox"}
                              name={group.id}
                              checked={checked}
                              onChange={() => handleOptionChange(group.id, task.id)}
                              style={{ accentColor: "var(--accent)", marginTop: 3 }}
                            />
                            <span>
                              <strong>{task.code} · {task.afb} · {task.points} P.</strong>
                              <span className="block" style={mutedStyle}>{task.sourceNotePaths.join(", ")}</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {exam.sections.map((section) => {
            const sectionTasks = section.taskIds
              .map((taskId) => exam.tasks.find((task) => task.id === taskId))
              .filter((task): task is ComposedExamTask => Boolean(task))
              .filter((task) => activeTaskIdSet.has(task.id));
            return (
              <section key={section.id} className="space-y-3">
                <div className="pb-2" style={{ borderBottom: "1px solid var(--line, var(--hairline))" }}>
                  <h2 className="font-serif text-lg font-semibold">{section.titleDE}</h2>
                  <p className="text-xs mt-1" style={mutedStyle}>{section.instructionDE}</p>
                  {section.aidsDE && <p className="text-xs font-semibold mt-1">{section.aidsDE}</p>}
                </div>
                {sectionTasks.map((task) => {
                  const taskGrade = gradingResult?.taskGrades.find((item) => item.taskId === task.id);
                  return (
                    <article key={task.id} className="p-4 space-y-3" style={paperPanelStyle}>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-mono font-semibold">{task.code} · {task.afb} · {task.points} Punkte</span>
                        <span style={mutedStyle}>Quelle: {task.sourceNotePaths.join(", ")}</span>
                      </div>
                      <div>
                        <p className="font-serif text-base font-semibold">{task.promptDE}</p>
                        <p className="text-xs mt-1" style={{ ...mutedStyle, fontSize: 12 }}>{task.promptZH}</p>
                      </div>
                      <div className="text-xs" style={mutedStyle}>Operator: {task.operator}</div>
                      <textarea
                        aria-label={`Antwort zu ${task.code}`}
                        className="w-full font-serif text-sm leading-relaxed"
                        style={{ ...controlStyle, minHeight: 150, resize: "vertical" }}
                        value={answers[task.id] ?? ""}
                        onChange={(event) => handleAnswerChange(task.id, event.target.value)}
                        disabled={Boolean(gradingResult)}
                        placeholder="Formulieren Sie Ihre Antwort in präziser deutscher Fachsprache."
                      />
                      <div className="flex justify-between text-xs" style={mutedStyle}>
                        <span>Wörter: {(answers[task.id] ?? "").split(/\s+/).filter(Boolean).length}</span>
                        {taskGrade && <span>Ergebnis: {taskGrade.points} / {taskGrade.maxPoints} P.</span>}
                      </div>
                      {taskGrade && (
                        <div className="text-xs space-y-1" style={paperPanelStyle}>
                          <div className="font-semibold">Feste Bewertungsindikatoren</div>
                          {taskGrade.criterionGrades.map((criterion) => (
                            <div key={criterion.criterionId} className="flex justify-between gap-3">
                              <span>{criterion.indicatorDE}</span>
                              <span className="font-mono shrink-0">
                                {criterion.points} / {task.criteria.find((item) => item.id === criterion.criterionId)?.points ?? 0} P.
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </section>
            );
          })}

          {!gradingResult && (
            <div className="flex justify-end">
              <button type="button" style={primaryButtonStyle} onClick={handleSubmit}>
                Abgeben und lokale Indikatorauswertung starten
              </button>
            </div>
          )}

          {gradingResult && (
            <section className="p-4 space-y-3" style={panelStyle} aria-live="polite">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-serif text-lg font-semibold">Lokale Übungsauswertung</h2>
                  <p className="text-xs mt-1" style={mutedStyle}>
                    {gradingResult.totalPoints} / {gradingResult.maxTotalPoints} ganze Punkte ({gradingResult.percentage} %).
                  </p>
                </div>
                <span className="text-xs" style={mutedStyle}>{exam.pointBasisDE}</span>
              </div>
              <p className="text-xs" style={mutedStyle}>
                Diese lokale Heuristik ist keine amtliche Korrektur. Bewertet werden ausschließlich die festen ganzen Punkte der erzeugten Übungsaufgabe.
              </p>
              <div className="flex flex-wrap gap-2">
                <button type="button" style={buttonStyle} onClick={handleCopyPatch}>
                  {copiedPatch ? "Patch kopiert" : "Fehlerlog-Patch kopieren"}
                </button>
                <button
                  type="button"
                  style={masterySaved ? buttonStyle : primaryButtonStyle}
                  onClick={handleRecordToMastery}
                  disabled={masterySaved}
                >
                  {masterySaved ? "In Kompetenz-Radar gespeichert" : "In Kompetenz-Radar eintragen"}
                </button>
                <button type="button" style={buttonStyle} onClick={() => setGradingResult(null)}>
                  Bearbeitung fortsetzen
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
