export type Lang = "de" | "zh";

export const t = (lang: Lang) => ({
  search: lang === "de" ? "Suchen …" : "搜索笔记 / 卡片 / 术语…",
  library: lang === "de" ? "Bibliothek" : "笔记库",
  flashcards: lang === "de" ? "Karteikarten" : "背卡",
  quiz: lang === "de" ? "Quiz & Klausur" : "刷题自测",
  tutor: lang === "de" ? "KI-Tutor" : "AI 助教",
  planner: lang === "de" ? "Lernplan" : "学习规划",
  mindmap: lang === "de" ? "Mindmap" : "思维导图",
  reise: lang === "de" ? "Lernreise" : "互动旅程",
  due: lang === "de" ? "fällig" : "到期",
  showAnswer: lang === "de" ? "Antwort zeigen" : "显示答案",
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
  offline:
    lang === "de"
      ? "KI-Engine aus oder nicht erreichbar — prüfe die KI-Einstellungen oben."
      : "AI引擎未开启或不可达——请检查上方AI设置。",

  // UI-SPEC-V3 bilingual strings
  dueToday: (n: number, m: number) =>
    lang === "de" ? `fällig ${n} / ${m}` : `到期 ${n} / 共 ${m}`,
  newCards: (k: number) => (lang === "de" ? `Neue ${k}` : `新卡 ${k}`),
  doneToday: lang === "de" ? "Fertig für heute" : "今天已完成",
  browseAnyway: lang === "de" ? "Trotzdem weiter" : "继续浏览",
  nextDue: (x: string | number) => (lang === "de" ? `→ ${x}d` : `${x}天后`),
  lmDown:
    lang === "de"
      ? "KI-Engine nicht bereit — Vorlagen-Modus"
      : "AI引擎未就绪——模板模式",
  noSource: lang === "de" ? "ohne Beleg" : "无出处",
  copyPatch: lang === "de" ? "Kopieren" : "复制",
  copied: lang === "de" ? "Kopiert ✓" : "已复制",
  daysLeft: (x: number, date?: string) =>
    lang === "de"
      ? `Noch ${x} Tage bis Klausur${date ? ` (${date})` : ""}`
      : `距考试 ${x} 天${date ? ` (${date})` : ""}`,
  exportFsrs:
    lang === "de"
      ? "FSRS Fortschritt exportieren"
      : "导出FSRS进度",

  // UI-SPEC-V4 desirable difficulty strings
  ddHard:
    lang === "de"
      ? "Schwer beim Üben, leicht in der Klausur"
      : "练时难，考时易",
  ddError:
    lang === "de"
      ? "Fehler sind gute Signale"
      : "选错是好信号",
  ddInterleave:
    lang === "de"
      ? "Mischen schlägt Pauken"
      : "穿插刷比连刷记得牢",
  ddRetrieval:
    lang === "de"
      ? "Abrufen schlägt Wiederlesen"
      : "合上书默写，胜过重读三遍",
  ddExample:
    lang === "de"
      ? "Erst Beispiel, dann selbst"
      : "先看例题，再自己来",

  // UI-SPEC-V4 Vergleich & feedback layers
  vergleichen: lang === "de" ? "Vergleichen" : "对照看看",
  zurErklaerung: lang === "de" ? "Zur Erklärung" : "进解析",
  loesungVergleichen: lang === "de" ? "Lösung vergleichen" : "对照解析",
  warumPlaceholder:
    lang === "de" ? "Warum? Ein Satz genügt" : "为什么？一句话就够",
  naechstesMal:
    lang === "de" ? "Nächstes Mal zuerst…" : "下次先…",
  naechstesMalPlaceholder:
    lang === "de" ? "z. B. Erst Operator markieren" : "比如：先标 Operator",
  richtig: lang === "de" ? "Richtig" : "对了",
  falsch: lang === "de" ? "Falsch" : "错了",
  belegkette: lang === "de" ? "Belegkette" : "证据链",
  operatorabfolge: lang === "de" ? "Operatorabfolge" : "程序顺序",
  klausurDrill:
    lang === "de" ? "Klausur-Drill (5 Schritte)" : "模考大题 (五步长文)",
  vergleichDrill:
    lang === "de" ? "Vergleich & Unterscheidung" : "对比辨析 (二选一与并排)",

  //主页 (Home)
  home: lang === "de" ? "Start" : "主页",
  homeTitle: lang === "de" ? "Heute lernen" : "今日学习",
  homeDue: lang === "de" ? "Fällig heute" : "今日到期",
  homeNew: lang === "de" ? "Neue Karten" : "新卡",
  homeXp: lang === "de" ? "XP gesamt" : "总积分",
  homeStreak: lang === "de" ? "Tage in Folge" : "连击天数",
  homeNext: lang === "de" ? "Zuerst wiederholen" : "优先重背",
  homeEmpty: lang === "de" ? "Noch nichts fällig — Vault verbinden oder Karten lernen." : "暂无到期——先连接知识库或去背卡。",
  homeMastery: lang === "de" ? "Beherrschung je Fach" : "各科掌握度",
  homeNoPlan: lang === "de" ? "Kein Wochenplan" : "无周计划",
  homeWeek: (p: number) => (lang === "de" ? `Woche: ${p} % erledigt` : `本周完成${p}%`),
  homeKlausur: (d: number) => (lang === "de" ? `Klausur in ${d} Tagen` : `距考试${d}天`),
  ilOn: lang === "de" ? "Interleaved an" : "交错开",
  ilOff: lang === "de" ? "Interleaved aus" : "交错关",
  ilBack: lang === "de" ? "Thema zurück in den Stapel" : "送回背卡堆",
  ilBackDone: (n: number) =>
    lang === "de"
      ? `${n} Karte(n) zurück in den Stapel gelegt — heute wiederholen.`
      : `已送回${n}张卡——今天重背。`,

  // Onboarding (Erststart-Assistent)
  obTitle: lang === "de" ? "Willkommen im Lernstudio" : "欢迎来到学习工作室",
  obSub:
    lang === "de"
      ? "Drei Schritte, dann lernst du mit deinen echten Notizen."
      : "三步设置，然后用你自己的笔记开始学习。",
  obStep1: lang === "de" ? "Vault verbinden" : "连接知识库",
  obStep2: lang === "de" ? "Fächer wählen" : "选择学科",
  obStep3: lang === "de" ? "Ziel setzen" : "设定目标",
  obVaultText:
    lang === "de"
      ? "Wähle deinen Vault-Ordner (die Notizen bleiben lokal, nichts wird hochgeladen). Ohne Vault startest du im Demo-Modus."
      : "选择你的知识库文件夹（笔记只留在本地，不上传）。跳过则进入演示模式。",
  obVaultOpen: lang === "de" ? "Vault-Ordner wählen" : "选择知识库文件夹",
  obVaultDemo: lang === "de" ? "Ohne Vault fortfahren (Demo)" : "跳过，用演示数据",
  obFachText:
    lang === "de"
      ? "Womit beginnst du? Fertige Fächer sind voll nutzbar, der Rest wächst mit."
      : "先学哪几科？备好的完全可用，其余在持续补充。",
  obFachReady: lang === "de" ? "Bereit" : "已备好",
  obFachActive: lang === "de" ? "Im Aufbau" : "建设中",
  obFachSkeleton: lang === "de" ? "Gerüst" : "仅骨架",
  obDateText:
    lang === "de"
      ? "Wann ist deine nächste Klausur? Der Lernplan zählt von dort rückwärts."
      : "下次考试是哪天？学习规划从那天倒数。",
  obDateLabel: lang === "de" ? "Klausurtermin" : "考试日期",
  obBack: lang === "de" ? "Zurück" : "上一步",
  obNext: lang === "de" ? "Weiter" : "下一步",
  obFinish: lang === "de" ? "Los geht's" : "开始学习",
  obSkip: lang === "de" ? "Überspringen" : "跳过",
  obRedo: lang === "de" ? "Einrichtung erneut zeigen" : "重新显示引导",

  // KI-Einstellungen (AiSettings)
  aiProvider: lang === "de" ? "Anbieter" : "服务商",
  aiModel: lang === "de" ? "Modell (editierbar)" : "模型（可改）",
  aiEmbedModel: lang === "de" ? "Embedding-Modell L2 (leer = aus)" : "向量模型L2（空=关闭）",
  aiVector: lang === "de" ? "Lokale Vektorsuche L1" : "本地向量检索L1",
  aiVectorOff: lang === "de" ? "Aus (nur Stichwort)" : "关闭（仅关键词）",
  aiVectorAuto: lang === "de" ? "Auto (nur wenn geladen)" : "自动（仅已加载时）",
  aiVectorOn: lang === "de" ? "An (Download erlaubt)" : "开启（允许下载）",
  aiVectorLoad: lang === "de" ? "Vektormodell jetzt laden (~300 MB)" : "现在加载向量模型（约300MB）",
  aiVectorReady: lang === "de" ? "Bereit · RAG-L1 aktiv" : "就绪·RAG-L1生效",
  aiVectorIdle: lang === "de" ? "Nicht geladen · RAG-L0 aktiv (steckt nichts fest)" : "未加载·RAG-L0生效中（不会卡死）",
  aiMirror: lang === "de" ? "HF-Spiegel (leer = offiziell, z.B. https://hf-mirror.com)" : "HF镜像（空=官方，如https://hf-mirror.com）",
  aiLocalReset: lang === "de" ? "Lokal zurücksetzen" : "重置本地引擎",
  aiBaseUrl: lang === "de" ? "Base-URL (nur Eigen-Anbieter)" : "Base-URL（仅自定义）",
  aiApiKey: lang === "de" ? "API-Key (nur lokal gespeichert)" : "API-Key（仅存本地）",
  aiManualHint:
    lang === "de"
      ? "Anleitung + Free-Tiers: AI-SETUP.md im App-Ordner. Key bleibt in deinem Browser."
      : "操作手册+免费额度见App目录AI-SETUP.md，Key只存你的浏览器。",
  aiNoWebgpu: lang === "de" ? "Kein WebGPU — bitte Chrome/Edge 113+ nutzen" : "无WebGPU——请用 Chrome/Edge 113+",
  aiNeedKey: lang === "de" ? "Bitte API-Key in den KI-Einstellungen eintragen." : "请在AI设置里填写API-Key。",
  aiShowSettings: lang === "de" ? "KI-Einstellungen" : "AI设置",
  aiHideSettings: lang === "de" ? "Einklappen" : "收起",
  aiLocalLoading: (p: number) =>
    lang === "de" ? `Lokales Modell lädt … ${Math.round(p * 100)} %` : `本地模型下载中…${Math.round(p * 100)}%`,

  // Einstellungen (Settings-Hub)
  settings: lang === "de" ? "Einstellungen" : "设置",
  stLanguage: lang === "de" ? "Sprache" : "语言",
  stSource: lang === "de" ? "Wissensquelle" : "知识库",
  stAi: lang === "de" ? "KI-Engine" : "AI引擎",
  stData: lang === "de" ? "Daten & Export" : "数据与导出",
  stKeys: lang === "de" ? "Tastaturkürzel" : "快捷键",
  stAbout: lang === "de" ? "Über" : "关于",
  stVaultOpen: lang === "de" ? "Vault-Ordner öffnen" : "打开知识库文件夹",
  stVaultDemo: lang === "de" ? "Kein Vault verbunden — Demo-Modus mit Beispieldaten." : "未连接知识库——正用示例数据演示。",
  stOpenHelp: lang === "de" ? "Tastaturhilfe öffnen" : "打开快捷键帮助",
  stExportXp: lang === "de" ? "XP-Fortschritt exportieren" : "导出学习积分",
  stWipe: lang === "de" ? "Alle App-Daten löschen" : "清除全部应用数据",
  stWipeConfirm:
    lang === "de"
      ? "Wirklich alle lokalen Daten löschen (FSRS, Plan, XP, KI-Key, Einrichtung)?"
      : "确定清除全部本地数据吗（记忆进度、规划、积分、Key、引导状态）？",
  stSync: lang === "de" ? "Cloud-Sync (eigener Server)" : "云同步（自备服务器）",
  stSyncEndpoint: lang === "de" ? "Sync-Endpoint (https://…)" : "同步地址（https://…）",
  stSyncToken: lang === "de" ? "Token (optional)" : "令牌（可选）",
  stSyncPush: lang === "de" ? "Hochladen" : "上传",
  stSyncPull: lang === "de" ? "Herunterladen" : "下载",
  stSyncOk: (n: number, dir: string) =>
    lang === "de" ? `Sync ok: ${n} Schlüssel ${dir}.` : `同步成功：${dir}${n}个键。`,
  stSyncErr:
    lang === "de" ? "Sync fehlgeschlagen — Endpoint/Netz prüfen." : "同步失败——检查地址与网络。",
  stSyncLast:
    lang === "de" ? "Letzter Sync" : "上次同步",
  stAboutText:
    lang === "de"
      ? "EF-Lernvault v0.2.0-curriculum — lokal, offline-fähig. Vault ist einzige Quelle, App schreibt nie zurück."
      : "EF-Lernvault v0.2.0-curriculum——本地、支持离线。知识库是唯一内容源，App从不写回。",
});
