import { describe, it, expect, beforeEach } from "vitest";
import {
  createSession,
  loadSessions,
  renameSession,
  togglePinSession,
  deleteSession,
  clearAllSessions,
  saveSessionMessages,
  loadSessionMessages,
  groupSessionsByDate,
  type TutorChatMessage,
} from "./tutorHistory";

describe("src/storage/tutorHistory.ts - Tutor Multi-Session & Message Persistence", () => {
  beforeEach(async () => {
    await clearAllSessions();
  });

  it("erstellt eine Sitzung und benennt sie sinnvoll nach der ersten Frage", async () => {
    const s1 = await createSession("Was ist das Magische Sechseck?");
    expect(s1.title).toContain("Magische Sechseck");
    expect(s1.messageCount).toBe(0);

    const list = await loadSessions();
    expect(list.length).toBe(1);
    expect(list[0].id).toBe(s1.id);
  });

  it("unterstützt Umbenennen und Pinning", async () => {
    const s = await createSession("Testfrage");
    await renameSession(s.id, "Neuer benutzerdefinierter Titel");

    let list = await loadSessions();
    expect(list[0].title).toBe("Neuer benutzerdefinierter Titel");

    await togglePinSession(s.id);
    list = await loadSessions();
    expect(list[0].pinned).toBe(true);
  });

  it("speichert und lädt Nachrichten einer Sitzung", async () => {
    const s = await createSession("Thema SoWi");
    const msgs: TutorChatMessage[] = [
      {
        id: "m1",
        sessionId: s.id,
        role: "du",
        text: "Wie funktioniert die Tarifautonomie?",
        timestamp: Date.now(),
      },
      {
        id: "m2",
        sessionId: s.id,
        role: "ki",
        text: "Art. 9 Abs. 3 GG garantiert Tarifautonomie [08_SoWi/Betrieb-Mitbestimmung.md#2].",
        timestamp: Date.now() + 100,
      },
    ];

    await saveSessionMessages(s.id, msgs);

    const loaded = await loadSessionMessages(s.id);
    expect(loaded.length).toBe(2);
    expect(loaded[0].text).toContain("Tarifautonomie");
    expect(loaded[1].role).toBe("ki");

    const sessionList = await loadSessions();
    expect(sessionList.find((item) => item.id === s.id)?.messageCount).toBe(2);
  });

  it("löscht eine einzelne Sitzung mitsamt Nachrichten", async () => {
    const s1 = await createSession("Sitzung 1");
    const s2 = await createSession("Sitzung 2");

    await deleteSession(s1.id);
    const list = await loadSessions();
    expect(list.length).toBe(1);
    expect(list[0].id).toBe(s2.id);
  });

  it("gruppiert Sitzungen korrekt nach Zeitabschnitten", async () => {
    const now = Date.now();
    const mockSessions = [
      { id: "1", title: "Heute Session", createdAt: now, updatedAt: now, messageCount: 1 },
      { id: "2", title: "Gestern Session", createdAt: now - 86400000, updatedAt: now - 86400000, messageCount: 1 },
      { id: "3", title: "Alte Session", createdAt: now - 10 * 86400000, updatedAt: now - 10 * 86400000, messageCount: 1 },
    ];

    const groups = groupSessionsByDate(mockSessions, "de");
    expect(groups.length).toBeGreaterThanOrEqual(2);
    expect(groups.some((g) => g.group === "Heute")).toBe(true);
  });
});
