// FaustReadingLab — 德语文学巨著《浮士德 I》文本细读与六维会考解剖工坊
// 专为北威州高中德语会考（Gymnasiale Oberstufe: EF / Q1 Klausur Aufgabentyp 1A）设计：
// 1. 典雅文献双栏架构：左侧高密度行号原著选段（Zeilennummerierung）+ 逐句交互释义与修辞高亮
// 2. 六维真题考向解剖矩阵：内容(Inhalt)、主旨(Motiv)、情节(Handlung)、词汇(Wortschatz)、修辞(Stilmittel)、描写(Figurenzeichnung)
// 3. 官方评卷期望标准（Erwartungshorizont / EHZ）+ 高中德语会考标准句式积木（Klausur-Formulierungshilfe）
import { useState, useRef } from "react";
import type { Lang } from "../../i18n";

export interface VerseItem {
  lineNum: number;
  textDE: string;
  translationZH: string;
  commentDE?: string;
  commentZH?: string;
  stilmittel?: { type: string; descDE: string; descZH: string };
  vocab?: { word: string; meaningDE: string; meaningZH: string };
  toneCategory?: "krise" | "spott" | "titanismus";
}

export interface DimensionQuestion {
  id: string;
  dimension: "inhalt" | "motiv" | "handlung" | "wortschatz" | "stilmittel" | "figuren";
  titleDE: string;
  titleZH: string;
  afb: "AFB I" | "AFB II" | "AFB III";
  questionDE: string;
  questionZH: string;
  options: {
    id: string;
    textDE: string;
    textZH: string;
    isCorrect: boolean;
  }[];
  explanationDE: string;
  explanationZH: string;
  klausurSatzDE: string;
  klausurSatzZH: string;
  ehzKeyPointsDE: string[];
  ehzKeyPointsZH: string[];
}

export interface TextExcerpt {
  id: string;
  sceneTitleDE: string;
  sceneTitleZH: string;
  versesRange: string;
  contextDE: string;
  contextZH: string;
  verses: VerseItem[];
  questions: DimensionQuestion[];
}

// 文本选段数据库：收录《浮士德 I》最经典的三大必考会考篇目
const EXCERPTS: TextExcerpt[] = [
  {
    id: "nacht-monolog",
    sceneTitleDE: "Szene: Nacht // Der Gelehrtenmonolog",
    sceneTitleZH: "第一幕：黑夜 · 哥特书斋学者独白 (学者危机与认识论绝望)",
    versesRange: "Vers 354–385",
    contextDE:
      "Faust sitzt unruhig am Pult in seinem hochgewölbten, engen gotischen Zimmer. Nach jahrzehntelangem Studium aller Wissenschaften erkennt er die Begrenztheit des menschlichen Verstandes.",
    contextZH:
      "浮士德深夜独坐在狭窄高拱的哥特式书斋案前。在耗费数十年穷尽大学一切学科后，他深刻体认到人类理性认知的绝对局限，陷入痛彻心扉的生存危机。",
    verses: [
      {
        lineNum: 354,
        textDE: "Habe nun, ach! Philosophie,",
        translationZH: "唉！我如今把哲学、",
        stilmittel: {
          type: "Exclamatio (叹词感叹)",
          descDE: "„ach!“ signalisiert tiefen existenziellen Seufzer und Frustration.",
          descZH: "破空而出的叹词‘ach!’瞬间定调全剧沉郁悲痛的求索基调。",
        },
        toneCategory: "krise",
      },
      {
        lineNum: 355,
        textDE: "Juristerei und Medizin,",
        translationZH: "法律和医学，",
        commentDE: "Die vier klassischen Universitätsfakultäten des Mittelalters und der Frühen Neuzeit.",
        commentZH: "中世纪至近代欧洲大学的四大传统学科之三，代表经院世俗知识顶峰。",
      },
      {
        lineNum: 356,
        textDE: "Und leider auch Theologie!",
        translationZH: "甚至连神学也无奈地——",
        stilmittel: {
          type: "Antithese & Klimax (对照渐强)",
          descDE: "Das Adverb „leider“ markiert die Theologie als größte Enttäuschung.",
          descZH: "副词‘leider’将神学置于知识阶梯的终点，却也是最大精神幻灭之所在。",
        },
        toneCategory: "krise",
      },
      {
        lineNum: 357,
        textDE: "Durchaus studiert, mit heißem Bemühn.",
        translationZH: "彻头彻尾饱读研习，付出了滚烫的心血。",
        vocab: {
          word: "Durchaus",
          meaningDE: "Vollständig, gründlich von Anfang bis Ende.",
          meaningZH: "彻底、自始至终穷尽。",
        },
      },
      {
        lineNum: 358,
        textDE: "Da steh ich nun, ich armer Tor!",
        translationZH: "可现在我站在这里，不过是个可怜的傻瓜！",
        stilmittel: {
          type: "Oxymoron / Paradoxon (矛盾自嘲)",
          descDE: "Der gebildete Gelehrte bezeichnet sich selbst als einfältigen Toren.",
          descZH: "通晓四门学问的大学者却称自己为‘愚人’，形成极具张力的认知悖论。",
        },
        vocab: {
          word: "Tor",
          meaningDE: "Ein Narr, Unwissender (trotz formaler Gelehrsamkeit).",
          meaningZH: "愚汉、无知之徒（空有学衔却未得智慧）。",
        },
        toneCategory: "krise",
      },
      {
        lineNum: 359,
        textDE: "Und bin so klug als wie zuvor;",
        translationZH: "比以前没聪明哪怕一丁点儿；",
        commentDE: "Epistemologische Skepsis: Sokrates' Diktum 'Ich weiß, dass ich nichts weiß' in tragischer Verzweiflung.",
        commentZH: "苏格拉底‘自知无知’命题在浮士德身上演化为痛苦绝望的否定。",
      },
      {
        lineNum: 360,
        textDE: "Heiße Magister, heiße Doktor gar,",
        translationZH: "枉称硕士，甚至枉称博士，",
        commentDE: "Akademische Ehrentitel verkommen zu wertlosen Worthülsen.",
        commentZH: "经院头衔在本体论终极真理面前彻底沦为空洞标签。",
      },
      {
        lineNum: 361,
        textDE: "Und ziehe schon an die zehen Jahr",
        translationZH: "这十年以来，",
      },
      {
        lineNum: 362,
        textDE: "Herauf, herab und quer und krumm",
        translationZH: "领着学生上上下下、兜兜转转，",
        stilmittel: {
          type: "Alliteration & Antithese (声韵与方位回旋)",
          descDE: "Spiegelt die orientierungslose Bewegung schulmeisterlicher Dogmen wider.",
          descZH: "‘Herauf, herab...’形象刻画出大学讲坛脱离实际的空转与兜圈子。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 363,
        textDE: "Meine Schüler an der Nase herum –",
        translationZH: "把他们当猴耍、牵着鼻子走——",
        vocab: {
          word: "an der Nase herumziehen",
          meaningDE: "Täuschen, mit Scheingelehrsamkeit hinhalten.",
          meaningZH: "以虚妄学术蒙蔽、糊弄学生。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 364,
        textDE: "Und sehe, dass wir nichts wissen können!",
        translationZH: "我终于看清：我们人类根本什么都不可能真正知道！",
        stilmittel: {
          type: "Episteme der Ohnmacht (真理无能断言)",
          descDE: "Kernaussage der Aufklärungskritik: Die Grenzen der rationalen ratio.",
          descZH: "对启蒙理性主义极限的严厉控诉：纯粹理性无法洞悉宇宙生命本源。",
        },
        toneCategory: "krise",
      },
      {
        lineNum: 365,
        textDE: "Das will mir schier das Herz verbrennen.",
        translationZH: "这把火简直要烧穿我绝望的胸膛。",
        vocab: {
          word: "schier",
          meaningDE: "Beinahe, fast gänzlich.",
          meaningZH: "几乎、简直、完全。",
        },
        toneCategory: "krise",
      },
      {
        lineNum: 366,
        textDE: "Zwar bin ich gescheiter als alle die Laffen,",
        translationZH: "诚然，我自认比那帮浮夸浅薄的蠢材要聪明，",
        vocab: {
          word: "Laffen",
          meaningDE: "Eitle, geckenhafte Schwätzer; hohle Würdenträger.",
          meaningZH: "浮华虚夸之徒、徒有其表的腐儒。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 367,
        textDE: "Doktoren, Magister, Schreiber und Pfaffen;",
        translationZH: "胜过这帮博士、硕士、文士和教士神职；",
        stilmittel: {
          type: "Asyndeton & Parataxe (非连词并列列举)",
          descDE: "Verächtliche Aufzählung des gesamten intellektuellen und klerikalen Establishments.",
          descZH: "一口气连缀四类体面阶层，倾泻出对建制派学者神棍的刻骨鄙夷。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 368,
        textDE: "Mich plagen keine Skrupel noch Zweifel,",
        translationZH: "我心中毫无宗教教条的顾忌与猜忌，",
      },
      {
        lineNum: 369,
        textDE: "Fürchte mich weder vor Hölle noch Teufel –",
        translationZH: "既不怕地狱也不畏惧魔鬼——",
        commentDE: "Faust steht bereits jenseits christlicher Normen (Voraussetzung für den späteren Pakt).",
        commentZH: "浮士德早已打破传统基督教地狱神罚的道德枷锁，为后续魔鬼契约铺垫。",
        toneCategory: "titanismus",
      },
      {
        lineNum: 370,
        textDE: "Dafür ist mir auch alle Freud entrissen,",
        translationZH: "然而代价是，我心中的一切人间欢乐也荡然无存，",
        toneCategory: "krise",
      },
      {
        lineNum: 371,
        textDE: "Bilde mir nicht ein, was Rechts zu wissen,",
        translationZH: "再不敢狂妄自大以为掌握了真经，",
      },
      {
        lineNum: 372,
        textDE: "Bilde mir nicht ein, ich könnte was lehren,",
        translationZH: "更不妄想自己能把什么道义教给世人，",
      },
      {
        lineNum: 373,
        textDE: "Die Menschen zu bessern und zu bekehren.",
        translationZH: "去匡正人心、劝人向善皈依。",
        commentDE: "Abkehr vom pädagogischen Optimismus der Aufklärung.",
        commentZH: "彻底摒弃了启蒙运动坚信‘教育与理性即可改良人类社会’的盲目乐观。",
      },
      {
        lineNum: 374,
        textDE: "Auch hab ich weder Gut noch Geld,",
        translationZH: "况且我既无财产又无银钱，",
      },
      {
        lineNum: 375,
        textDE: "Noch Ehr und Herrlichkeit der Welt;",
        translationZH: "更无这尘世间的荣耀与显赫地位；",
        stilmittel: {
          type: "Alliteration & Antithese (双声排比与剥夺感)",
          descDE: "Gut/Geld und Ehr/Herrlichkeit betonen den weltlichen Totalverlust.",
          descZH: "世俗名利的全面缺失，彻底斩断了浮士德回归常人安稳生活的退路。",
        },
      },
      {
        lineNum: 376,
        textDE: "Es möchte kein Hund so länger leben!",
        translationZH: "就连一条狗也不愿再这么苟且活下去！",
        stilmittel: {
          type: "Vulgär-Metapher & Drastik (市井极言发泄)",
          descDE: "Dramatischer Tiefpunkt: Tiervergleich verdeutlicht unerträglichen Ekel.",
          descZH: "以‘犬’自喻的剧烈粗鄙反讽，将文人雅士的尊严砸得粉碎，宣告绝境。",
        },
        toneCategory: "krise",
      },
      {
        lineNum: 377,
        textDE: "Drum hab ich mich der Magie ergeben,",
        translationZH: "因此，我毅然全身心投向了神秘的魔法，",
        commentDE: "Der dramatische Entschluss: Flucht aus der Ratio in die Transzendenz und das Okkulte.",
        commentZH: "全剧核心转折：从经验理性的绝境决然投身超自然的神秘玄学与魔法探求。",
        toneCategory: "titanismus",
      },
      {
        lineNum: 378,
        textDE: "Ob mir durch Geistes Kraft und Mund",
        translationZH: "但愿能借助精灵的神力与口舌，",
      },
      {
        lineNum: 379,
        textDE: "Nicht manch Geheimnis würde kund;",
        translationZH: "揭开天地间未为人知的玄奥秘密；",
      },
      {
        lineNum: 380,
        textDE: "Dass ich nicht mehr mit saurem Schweiß",
        translationZH: "好教我从此不再流着辛酸的汗水，",
      },
      {
        lineNum: 381,
        textDE: "Zu sagen brauche, was ich nicht weiß;",
        translationZH: "去硬着头皮讲授自己根本不懂的假学问；",
      },
      {
        lineNum: 382,
        textDE: "Dass ich erkenne, was die Welt",
        translationZH: "好教我真正彻底参透：究竟是什么力量",
        stilmittel: {
          type: "Enjambement (跨行诗韵)",
          descDE: "Verbindet Vers 382 und 383 zur berühmtesten Synthese des Faustischen Strebens.",
          descZH: "跨行一气呵成，铸就全剧最宏大的浮士德式探索宪纲。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 383,
        textDE: "Im Innersten zusammenhält,",
        translationZH: "在最核心深处维系着整个宇宙世界，",
        stilmittel: {
          type: "Zentralmotiv (Titanisches Streben)",
          descDE: "Suche nach der ontologischen Urkraft, nicht bloßer Faktenanhäufung.",
          descZH: "不再满足于碎片化经验事实，誓要掌握万物本体论的总枢纽。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 384,
        textDE: "Schau alle Wirkenskraft und Samen,",
        translationZH: "亲眼目睹万物生长的一切源初动力与造化萌芽，",
        vocab: {
          word: "Samen",
          meaningDE: "Ursprungskräfte, Keimzellen allen organischen Lebens.",
          meaningZH: "万物生生不息的宇宙元始生机与胚芽。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 385,
        textDE: "Und tu nicht mehr in Worten kramen.",
        translationZH: "再也不在那干瘪的书本辞藻里徒劳翻拣！",
        stilmittel: {
          type: "Metapher (Verachtung der Buchgelehrsamkeit)",
          descDE: "„in Worten kramen“ degradiert Wissenschaft zu staubiger Trödelarbeit.",
          descZH: "将经院书本考据贬低为‘在故纸堆里翻破烂’，呼应开篇学者危机。",
        },
        vocab: {
          word: "kramen",
          meaningDE: "Mühselig und planlos in altem Tand herumsuchen.",
          meaningZH: "在杂物烂货堆里费力翻检。",
        },
        toneCategory: "krise",
      },
    ],
    questions: [
      {
        id: "q-inhalt",
        dimension: "inhalt",
        titleDE: "1. Inhalt & Fakten",
        titleZH: "核心论点与知识检视",
        afb: "AFB I",
        questionDE:
          "Welche vier akademischen Fakultäten zählt Faust auf, und zu welchem konkreten materiellen wie existenziellen Resümee gelangt er in Vers 354–376?",
        questionZH:
          "浮士德在开篇历数了哪四门传统大学学科？面对数十年的学术生涯，他在物质资产与生存意义上得出了怎样确切的结论？",
        options: [
          {
            id: "a",
            textDE:
              "Er hat Philosophie, Juristerei, Medizin und Theologie studiert, ist jedoch vermögenslos ('weder Gut noch Geld') und verzweifelt daran, dass wahre Naturerkenntnis dem menschlichen Verstand unzugänglich bleibt.",
            textZH:
              "他穷尽哲学、法律、医学与神学，却身无分文（‘既无财产又无金钱’），更对人类知性终究无法掌握终极自然真理感到绝望崩塌。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er bedauert vor allem den Verlust seines Universitätslehrstuhls und plant die Eröffnung einer privaten Apotheke in Leipzig.",
            textZH:
              "他主要悔恨自己被大学剥夺了讲席教席，并计划在莱比锡开设私人药铺维生。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er ist stolz auf seine akademischen Titel als Magister und Doktor und möchte sein Wissen in einem neuen Handbuch der Naturlehre publizieren.",
            textZH:
              "他为自己荣膺硕士与博士头衔深感自豪，正准备将毕生所学汇编成自然科学指南出版。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Goethe lässt Faust die gesamte damalige Wissensordnung (Artistenfakultät + die drei oberen Fakultäten Jura, Medizin, Theologie) abarbeiten. Das nüchterne Fazit: Trotz Titeln völlige Orientierungslosigkeit ('armer Tor') und absolute Armut.",
        explanationZH:
          "歌德借浮士德之口全盘检视欧洲中世纪以来的四大经典知识体系。其残酷结论是：空有虚衔，却毫无真知（‘可怜的愚汉’），且尘世财产与意义荡然无存。",
        klausurSatzDE:
          "In den einleitenden Versen 354–376 konstatiert Faust das Scheitern seines lebenslangen Studiums aller vier Fakultäten, indem er formale Gelehrsamkeit als inhaltsleere Illusion entlarvt und seinen materiellen wie geistigen Ruin bilanziert.",
        klausurSatzZH:
          "在开篇第 354 至 376 行中，浮士德宣告了其毕生研习四大传统学科的彻底失败，不仅揭露了经院学衔的虚妄空洞，更总结了自己在精神与物质上的全面破产。",
        ehzKeyPointsDE: [
          "Nennung der vier Fakultäten: Philosophie, Jura, Medizin, Theologie.",
          "Existenzieller Nullpunkt: Erkenntnisgrenze ('dass wir nichts wissen können').",
          "Materieller Totalverlust: Fehlen von Gut, Geld, weltlicher Ehre.",
          "Verlust pädagogischer Legitimität: Täuschung der Schüler.",
        ],
        ehzKeyPointsZH: [
          "准确列举四大传统学科：哲学、法学、医学、神学。",
          "指出认识论归零：‘人类根本什么都无法知道’。",
          "概括世俗利益的剥夺：无钱、无产、无世俗名望。",
          "自省教育合法性的丧失：‘牵着学生的鼻子走’。",
        ],
      },
      {
        id: "q-motiv",
        dimension: "motiv",
        titleDE: "2. Hauptthema & Motiv",
        titleZH: "浮士德求索精神与存在危机",
        afb: "AFB II",
        questionDE:
          "Welches Kernmotiv des 'Sturm und Drang' bzw. der deutschen Klassik manifestiert sich in den berühmten Versen 382–383 ('Dass ich erkenne, was die Welt / Im Innersten zusammenhält')?",
        questionZH:
          "在全剧最著名的第 382–383 行（‘好教我参透：究竟是什么力量 / 在最核心深处维系着整个宇宙’）中，集中体现了狂飙突进与德国古典文学的哪一核心母题？",
        options: [
          {
            id: "a",
            textDE:
              "Das titanische Faustische Streben: Die Weigerung, sich mit beschränktem Buchwissen zu begnügen, und der unbedingte Drang nach ganzheitlicher Wesenserkenntnis der Natur.",
            textZH:
              "泰坦式‘浮士德求索精神’（Faustisches Streben）：绝不安于干瘪孤立的书斋死知识，誓要把握宇宙本体论全貌与生命源动力的极度冲动。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Das barocke 'Memento Mori': Die ständige Todesermahnung und die Sehnsucht nach asketischer Weltabgewandtheit.",
            textZH:
              "巴洛克时期的‘铭记死亡’（Memento Mori）母题：无休止反思肉身速朽，渴求禁欲出世遁入空门。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Der aufklärerische Deismus: Das Vertrauen, dass Gott die Welt wie ein perfektes mechanisches Uhrwerk konstruiert hat.",
            textZH:
              "启蒙运动的自然神论（Deismus）：坚信上帝宛如钟表匠，将宇宙构筑为精密运转的机械装置。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Das 'Faustische Streben' (Titanismus) überwindet die rationalistische Aufklärung: Faust sucht keine bloßen mathematisch-mechanischen Formeln, sondern die organische, lebendige Urkraft des Kosmos ('alle Wirkenskraft und Samen').",
        explanationZH:
          "‘浮士德式求索’（Titanismus / 狂飙突进时期的巨人主义）超越了启蒙理性的机械论框架：他要洞悉的不是冰冷的公式，而是宇宙有机生命繁衍的终极奥义与本源动力。",
        klausurSatzDE:
          "Das in den Versen 382–385 artikulierte Verlangen markiert das zentrale Faustische Erkenntnismotiv des Dramas: Faust begehrt nicht bloß additive Faktenkenntnis, sondern die unmittelbare Schau der ontologischen Schöpfungskräfte.",
        klausurSatzZH:
          "第 382 至 385 行所迸发的情感确立了全剧的核心母题——浮士德式的本体求索：他绝非追求零散事实的简单累加，而是渴望直接目睹并融入造化的源初力量。",
        ehzKeyPointsDE: [
          "Begriff 'Titanismus / Faustisches Streben' präzise definieren.",
          "Kontrastierung von toter Begriffswelt ('Worte kramen') und organischer Naturkraft ('Samen').",
          "Überwindung der rationalistischen Schranken durch Magie.",
        ],
        ehzKeyPointsZH: [
          "准确界定‘泰坦精神 / 浮士德式求索’的概念内涵。",
          "对比干瘪语言词藻（‘Worte kramen’）与鲜活有机生命（‘Samen’）的本质鸿沟。",
          "阐明其企图借助魔法打破人类知性天花板的狂妄野心。",
        ],
      },
      {
        id: "q-handlung",
        dimension: "handlung",
        titleDE: "3. Handlung & Dramenkontext",
        titleZH: "戏剧开端与因果动机链条",
        afb: "AFB II",
        questionDE:
          "Welche dramaturgische Schlüsselfunktion erfüllt dieser Monolog in der Makrostruktur des Gesamtwerkes, und welche unmittelbare Kausalkette stößt er im Folgenden an?",
        questionZH:
          "此段开篇独白在整部《浮士德 I》的戏剧宏观结构中承担了怎样的关键职能？它在接下来的情节中直接引发了哪一连串多米诺骨牌式的因果链条？",
        options: [
          {
            id: "a",
            textDE:
              "Er dient als psychologische Exposition der Gelehrtentragödie: Die Verzweiflung treibt Faust zur Geisterbeschwörung (Erdgeist), nach dessen schroffer Zurückweisung an den Rand des Suizids und öffnet ihn letztlich für den teuflischen Pakt mit Mephisto.",
            textZH:
              "它构成了‘学者悲剧’的心理铺垫开端：绝望促使他召唤地灵（Erdgeist），在地灵冷酷拒绝其比肩企图后将其逼至服毒自尽边缘，并最终为其接受魔鬼梅菲斯特的赌约契约彻底敞开大门。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er bildet den Schlusspunkt der Gretchentragödie und fasst Fausts Reue über den Tod von Valentins Schwester zusammen.",
            textZH:
              "它构成了‘格蕾琴悲剧’的终局反思，总结了浮士德对瓦伦廷妹妹之死所承担的迟到忏悔。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er dient der Einführung der Wette zwischen dem Herrn und Mephisto im 'Prolog im Himmel'.",
            textZH:
              "它专用于在人间引出‘天上序曲’中上帝与魔鬼梅菲斯特关于浮士德灵魂归属的对赌。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Ohne diese existentielle Ausweglosigkeit im Studierzimmer wäre Fausts Bereitschaft, sich mit dem Teufel einzulassen, psychologisch unmotiviert. Der Monolog begründet Fausts absolute Radikalität und Risikobereitschaft.",
        explanationZH:
          "若无书斋中这种走到尽头的深重绝望，浮士德后续与魔鬼缔结血契在心理学上就将失去立足点。正是此处的破罐破摔，赋予了他不顾毁灭的亡命赌徒心态。",
        klausurSatzDE:
          "Dramaturgisch fungiert der Monolog als Exposition der Gelehrtentragödie, indem er Fausts inneren Notstand offenlegt und somit die Kausalitätskette von Erdgeistbeschwörung über Suizidversuch bis zum Mephisto-Pakt zwingend grundlegt.",
        klausurSatzZH:
          "在戏剧法上，该独白承担了学者悲剧的开端铺垫功能，剖白了浮士德的内在绝境，从而必然地诱发了由召唤地灵、企图自杀到与梅菲斯特立约的戏剧因果锁链。",
        ehzKeyPointsDE: [
          "Einordnung in die Szenenfolge: Nach 'Prolog im Himmel', vor 'Vor dem Tor'.",
          "Kausale Verknüpfung: Wissenschaftskrise → Magie → Erdgeist → Giftbecher → Teufelspakt.",
          "Verbindung von Gelehrtentragödie und späterer Gretchentragödie.",
        ],
        ehzKeyPointsZH: [
          "精准定位戏剧位序：紧随‘天上序曲’之后，‘城门口游春’之前。",
          "清晰梳理因果链：学术危机 → 投身魔法 → 地灵受挫 → 服毒自杀未遂 → 缔结魔契。",
          "点明从个人学者求索向后续格蕾琴道德悲剧转移的深层动力。",
        ],
      },
      {
        id: "q-wortschatz",
        dimension: "wortschatz",
        titleDE: "4. Wortschatz & Semantik",
        titleZH: "经院学术词汇的历史语用内涵",
        afb: "AFB II",
        questionDE:
          "Welche historische Konnotation tragen Goethes Wendungen „armer Tor“ (V. 358), „Laffen“ (V. 366) und „in Worten kramen“ (V. 385) im Kontext der damaligen Gelehrsamkeit?",
        questionZH:
          "歌德在诗行中使用的‘armer Tor’（358行）、‘Laffen’（366行）以及‘in Worten kramen’（385行），在当时的学术语境中承载了怎样的历史语用内涵？",
        options: [
          {
            id: "a",
            textDE:
              "„Tor“ meint den trotz Buchwissens unweisen Menschen; „Laffen“ degradiert das universitäre Establishment zu eitlen Gecken; „in Worten kramen“ brandmarkt scholastische Begriffsklauberei ohne Lebensbezug.",
            textZH:
              "‘Tor’指空有经院学衔却缺乏真正宇宙大智慧的‘愚痴者’；‘Laffen’将大学体面阶层贬为虚荣轻浮的纨绔与佞臣；‘in Worten kramen’直指脱离鲜活生命、在故纸堆字缝里扣字眼的僵化经院考据。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "„Tor“ beschreibt ein architektonisches Portal; „Laffen“ bezeichnet studentische Verbindungen; „kramen“ bedeutet das Verkaufen von Schriften auf dem Marktplatz.",
            textZH:
              "‘Tor’指哥特书斋的拱券大门；‘Laffen’指当时的新式学生社团；‘kramen’指在集市摆摊叫卖学术手册。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Alle drei Begriffe stammen aus der mittelhochdeutschen Minnedichtung und drücken Fausts unerfüllte Liebessehnsucht aus.",
            textZH:
              "这三个词汇均源自中古高地德语宫廷抒情诗，表达的是浮士德对纯洁女性爱情的求而不得。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Goethes Sprachwahl ist hochexplosiv: Er nutzt volkssprachliche, abwertende Ausdrücke, um die elitäre Fassade der Spätscholastik zu zertrümmern. Wissenschaft wird semantisch als nutzloses 'Trödeln' (kramen) abqualifiziert.",
        explanationZH:
          "歌德在用词上极具颠覆性：他大胆采纳市井民间贬抑性词汇砸碎经院正统的高雅面具，将自命清高的学术考据在语义上贬斥为毫无产出价值的‘在旧货摊翻破烂’（kramen）。",
        klausurSatzDE:
          "Die Wortwahl Goethes – von der Selbsttitulierung als 'armer Tor' bis zur Entwertung von Bildungskonventionen als 'in Worten kramen' – verdeutlicht die Kluft zwischen toter Nomenklatur und existenzieller Wahrheit.",
        klausurSatzZH:
          "歌德的用词——从自嘲为‘可怜的愚汉’，到将传统学术贬低为‘在文字堆里翻捡’——鲜明地揭示了僵死学术概念与存在主义终极真理之间的巨大鸿沟。",
        ehzKeyPointsDE: [
          "Etymologische Präzision: 'Tor' = Narr vs. intellektueller Anspruch.",
          "Soziokulturelle Konnotation: 'Laffen' als Entlarvung autoritärer Scheinautoritäten.",
          "Metaphorische Abwertung: 'Kramen' im Gegensatz zu lebendigem Schaffen.",
        ],
        ehzKeyPointsZH: [
          "词源准确性：区分普通无知与大学者自省下的‘知识愚人’。",
          "社会文化内涵：‘Laffen’对虚妄权威与教条主义的无情解构。",
          "隐喻贬义：将学术推演降维为旧物杂货翻检。",
        ],
      },
      {
        id: "q-stilmittel",
        dimension: "stilmittel",
        titleDE: "5. Stilmittel & Rhetorik",
        titleZH: "Knittelvers 韵律与修辞手法功能",
        afb: "AFB II",
        questionDE:
          "Welche formalen und rhetorischen Gestaltungsmerkmale (Metrik, Stilfiguren) prägen Goethes Verse, und wie spiegeln sie Fausts psychische Verfassung wider?",
        questionZH:
          "歌德在此段诗行中运用了哪些标志性的形式格律（Metrik）与修辞手法（Stilmittel）？它们如何外化并映射出浮士德内心的剧烈精神动荡？",
        options: [
          {
            id: "a",
            textDE:
              "Der vierhebige Knittelvers mit freier Senkungsfüllung und Paarreimen verleiht der Rede einen erregten, pochenden Redefluss; rhetorische Ausrufe (Exclamatio 'ach!'), drastische Tiervergleiche ('Hund') und Antithesen spiegeln seine Zerrissenheit.",
            textZH:
              "采用四音步Knittelvers古朴偶韵短诗格律，自由的轻音顿挫赋予独白狂暴急促、如心脏剧烈搏动般的语流；感叹法（‘ach!’）、严酷的野兽粗鄙隐喻（‘Hund’）与鲜明对照（Antithese）精准外化其极度精神分裂与挣扎。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Klassischer fünfhebiger Blankvers ohne Reim, der durch vollkommene Harmonie und Ruhe antike Gelassenheit demonstriert.",
            textZH:
              "采用严整无韵五音步抑扬格无韵诗（Blankvers），以近乎完美的和谐静穆展现古典主义的不以物喜、不以己悲。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Ein gereimtes Sonett mit strenger Terzett-Struktur, das rational geordnete Argumente wie ein juristisches Plädoyer gliedert.",
            textZH:
              "采用严格遵循十四行诗（Sonett）的起承转合结构，如法庭答辩般将论据编排得井井有条、逻辑严密。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Knittelvers ist kein formelles Manko, sondern bewusstes Stilmittel: Er knüpft an die Dichtung des 16. Jahrhunderts (Hans Sachs) an, erzeugt dynamische Unruhe und unterscheidet sich radikal von der glatten Eleganz des französischen Hoftheaters.",
        explanationZH:
          "歌德选用古德国Knittelvers短韵绝非草率，而是高度自觉的美学实践：它致敬了16世纪汉斯·萨克斯等平民大师的铿锵生命力，打破了宫廷法语戏剧虚伪工整的桎梏，让读者真切听到浮士德灵魂的战栗与呐喊。",
        klausurSatzDE:
          "Formal unterstützt der unruhige Rhythmus des Knittelverses die emotive Erregung des Sprechers: Die Anhäufung von Exclamationes, Antithesen und expressiven Metaphern zeichnet die innere Getriebenheit Fausts seismographisch nach.",
        klausurSatzZH:
          "在形式层面上，Knittelvers格律的波澜起伏生动衬托出言说者的激愤情绪：反复出现的感叹调、尖锐对照以及极具爆发力的隐喻，如地震仪般精准记录下浮士德内心野兽般的被困与暴突。",
        ehzKeyPointsDE: [
          "Metrik: Vierhebiger Knittelvers (historischer Kolorit des 16. Jh.).",
          "Reimschema: Vorwiegend Paarreim (aabb), rhythmisch drängend.",
          "Figuren: Exclamatio ('ach!'), Oxymoron ('armer Tor'), Enjambement ('was die Welt / Im Innersten').",
        ],
        ehzKeyPointsZH: [
          "格律定性：四音步Knittelvers，融入16世纪德国民间歌谣的浑厚质感。",
          "押韵范式：以随韵/偶韵（aabb）为主，音步紧逼扣人心弦。",
          "典型修辞：感叹词（‘ach!’）、矛盾法（‘armer Tor’）、跨行连缀（‘was die Welt / Im Innersten zusammenhält’）。",
        ],
      },
      {
        id: "q-figuren",
        dimension: "figuren",
        titleDE: "6. Figurenzeichnung & Psychologie",
        titleZH: "浮士德自傲与自卑的悖论人格",
        afb: "AFB III",
        questionDE:
          "Welche seelische Zerrissenheit und welche paradoxen Charakterzüge offenbart Faust in seinem Verhältnis zur bürgerlichen Gesellschaft einerseits und zur Natur andererseits?",
        questionZH:
          "浮士德在独白中展现了怎样深刻的精神分裂与悖论性格？他一方面面对世俗市民社会，另一方面面对自然造化，其心理状态呈现何种极性张力？",
        options: [
          {
            id: "a",
            textDE:
              "Ein paradoxer Dualismus aus elitärer Überheblichkeit gegenüber den Mitmenschen ('gescheiter als alle die Laffen') und tiefster Ohnmacht vor der Natur ('nichts wissen können'); er verachtet bürgerliche Sicherheit, leidet jedoch unter seiner totalen existentiellen Isolation.",
            textZH:
              "展现出奇特而深刻的双极分裂：面对尘世同侪展现出极度傲岸冷蔑（‘自认胜过所有蠢材与伪君子’），但面对宇宙造化又展现出深入骨髓的卑微绝望（‘自知人类一无所知’）；他唾弃小市民的平庸安稳，却又备受自身极端精神孤立的折磨煎熬。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er ist ein bescheidener, gottesfürchtiger Gelehrter, der sich nach familiärem Glück und bürgerlicher Eintracht im Kreise der Dorfgemeinschaft sehnt.",
            textZH:
              "他是一个谦卑敬虔的传统书生，终日向往家庭的天伦之乐，渴望回归乡村邻里社会安享天年。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er ist ein rein zynischer Nihilist, der die Natur völlig geringschätzt und ausschließlich nach materieller Bereicherung und politischer Macht am Kaiserhof strebt.",
            textZH:
              "他是一个纯粹冷酷的虚无主义狂徒，视大自然如草芥，毕生只求在帝国宫廷攫取金钱与政治特权。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Hier kündigt sich bereits das berühmte Faustische 'Zwei-Seelen-Dilemma' (Vers 1112) an: Der unstillbare Drang nach oben (Transzendenz, Verschmelzung mit der Natur) bei gleichzeitiger Bindung an irdische Begrenztheit und Verzweiflung.",
        explanationZH:
          "此处已深刻预示了全剧核心命题‘两个灵魂在胸中争战’（1112行）：一个灵魂渴望拔地而起、与宇宙神性合为一体，另一个灵魂却被困在肉身的局限与冷酷绝望中无处遁形。",
        klausurSatzDE:
          "Die Figurenkonzeption Fausts im Eingangsmonolog zeichnet das Porträt eines existentiell Entwurzelten: Zerrissen zwischen titanischem Allmachtsbegehren und niederschmetternder Erkenntnisgrenze verkörpert Faust den modernen Krisenmenschen an der Schwelle zur Moderne.",
        klausurSatzZH:
          "开篇独白对浮士德的人物塑造，刻画了一位存在主义意义上的‘失根之人’：在狂妄的泰坦全知渴求与毁灭性的认识论天花板之间剧烈撕扯，成为了步入近代门槛前现代人精神危机的缩影。",
        ehzKeyPointsDE: [
          "Charakter-Ambivalenz: Hybris vs. Demut/Verzweiflung.",
          "Verhältnis zur Gesellschaft: Verachtung ('Laffen'), Isolation, Einsamkeit.",
          "Verhältnis zur Natur: Sehnsucht nach unmittelbarer Verschmelzung statt wissenschaftlicher Sezierung.",
        ],
        ehzKeyPointsZH: [
          "人物性格的两面性：自命不凡的狂妄傲骨（Hybris）与绝望自惭的剧烈拉锯。",
          "与人类社会的关系：深恶痛绝传统建制（‘Laffen’），陷入绝对的精神孤独孤岛。",
          "与大自然的关系：拒绝把自然当冷冰冰的解剖客体，渴求直接拥抱合一。",
        ],
      },
    ],
  },
  {
    id: "studierzimmer-pakt",
    sceneTitleDE: "Szene: Studierzimmer // Pakt & Wette mit Mephistopheles",
    sceneTitleZH: "书斋立约 · 世纪之赌",
    versesRange: "V. 1692–1711",
    contextDE:
      "Faust schließt mit Mephistopheles keine klassische Verkaufsurkunde, sondern eine dynamische Wette auf sein unstillbares Lebensstreben ab.",
    contextZH:
      "浮士德与魔鬼梅菲斯特签订的并非传统买卖灵魂契约，而是一场赌上其永恒求索意志的现代动态之赌。",
    verses: [
      {
        lineNum: 1692,
        textDE: "Werd ich zum Augenblicke sagen:",
        translationZH: "假使有朝一日，我对转瞬即逝的某一瞬间说：",
        stilmittel: {
          type: "Konditionalsatz (假设条件句 Auftakt)",
          descDE: "Eröffnet die Bedingung der Wette.",
          descZH: "开启全剧至高赌约的决定性假设前提。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 1693,
        textDE: "Verweile doch! du bist so schön!",
        translationZH: "‘停一停吧！你是多么的美丽！’",
        stilmittel: {
          type: "Apostrophe & Kernmotiv (核心母题金句)",
          descDE: "Die berühmteste Zeile des Werkes: Das Verweilen bedeutet Stillstand und geistigen Tod.",
          descZH: "全剧灵魂核心金句：一旦沉溺安逸止步不前，即意味着精神死灭与契约失守。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 1694,
        textDE: "Dann magst du mich in Fesseln schlagen,",
        translationZH: "到那时，你就把锁链套在我身上，",
        stilmittel: {
          type: "Anapher (Dann...) & Konzessivreihe",
          descDE: "Beginn der vierfachen Anapher bedingungsloser Unterwerfung.",
          descZH: "开启连续四重‘到那时’排比，展现对安逸堕落的决绝否定。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 1695,
        textDE: "Dann will ich gern zugrunde gehn!",
        translationZH: "到那时，我甘愿万劫不复、自取毁灭！",
        vocab: {
          word: "zugrunde gehn",
          meaningDE: "Untergehen, vernichtet werden.",
          meaningZH: "自取毁灭、万劫不复。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 1696,
        textDE: "Dann mag die Totenglocke schallen,",
        translationZH: "到那时，就让送葬的丧钟敲响吧，",
        stilmittel: {
          type: "Akustische Metapher (死亡听觉意象)",
          descDE: "Totenglocke als traditionelles Zeichen des physischen und seelischen Endes.",
          descZH: "丧钟敲响作为肉体与精神双重终局的象征。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 1697,
        textDE: "Dann bist du deines Dienstes frei,",
        translationZH: "到那时，你的仆役之役便可就此结束，",
        toneCategory: "titanismus",
      },
      {
        lineNum: 1698,
        textDE: "Die Uhr mag stehn, der Zeiger fallen,",
        translationZH: "时钟可以停摆，指针可以崩落，",
        stilmittel: {
          type: "Metapher des Zeitendes (生命终局隐喻)",
          descDE: "Stillstand der Uhr symbolisiert das Erlöschen der existentiellen Zeitlichkeit.",
          descZH: "指针崩落标志着生命存在性时间维度的终结。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 1699,
        textDE: "Es sei die Zeit für mich vorbei!",
        translationZH: "对我来说，时间便彻底化作了过去！",
        toneCategory: "titanismus",
      },
      {
        lineNum: 1700,
        textDE: "MEPHISTOPHELES: Bedenk dies wohl, wir werden's nicht vergessen.",
        translationZH: "梅菲斯特：你可要想清楚了，我们是绝不会遗忘此约的。",
        commentDE: "Mephisto pocht auf juristische Verbindlichkeit und unterschätzt Fausts Streben.",
        commentZH: "梅菲斯特极力强调契约的法律约束力，暴露出魔鬼对人类求索本质的狭隘理解。",
        toneCategory: "spott",
      },
      {
        lineNum: 1701,
        textDE: "FAUST: Dazu hast du ein volles Recht;",
        translationZH: "浮士德：这一点你大有权利放心；",
      },
      {
        lineNum: 1702,
        textDE: "Ich habe mich nicht freventlich vermessen.",
        translationZH: "我绝非出于狂妄而轻率托大。",
        vocab: {
          word: "freventlich vermessen",
          meaningDE: "Sich frevlerisch, anmaßend überschätzen.",
          meaningZH: "狂妄自大、轻率非分地自以为是。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 1703,
        textDE: "Wie ich beharre, bin ich Knecht,",
        translationZH: "只要我一旦停滞不前，我便沦为了奴隶，",
        commentDE: "Stillstand = Sklaverei des Geistes.",
        commentZH: "核心哲学公式：停顿即精神的奴隶化。",
        toneCategory: "krise",
      },
      {
        lineNum: 1704,
        textDE: "Ob dein, was frag ich, oder wessen.",
        translationZH: "无论沦为你或是谁的奴仆，我全不在乎。",
        toneCategory: "titanismus",
      },
      {
        lineNum: 1705,
        textDE: "MEPHISTOPHELES: Ich werde heute gleich, beim Doktorschmaus,",
        translationZH: "梅菲斯特：我今天就去博士宴席上，",
      },
      {
        lineNum: 1706,
        textDE: "Als Diener meine Pflicht erfüllen.",
        translationZH: "以仆人身份恪尽职守侍奉你。",
      },
      {
        lineNum: 1707,
        textDE: "Nur eins! – Um Lebens oder Sterbens willen",
        translationZH: "只有一件事！——看在生死由命的份上，",
      },
      {
        lineNum: 1708,
        textDE: "Bitt ich mir ein paar Zeilen aus.",
        translationZH: "我还得劳烦你赐下几行亲笔手谕。",
        commentDE: "Mephisto fordert den schriftlichen Blutvertrag (mittelalterliche Bürokratie).",
        commentZH: "梅菲斯特坚持索要书面血书字据，暴露出中世纪市民官僚主义的狭隘习气。",
        toneCategory: "spott",
      },
      {
        lineNum: 1709,
        textDE: "FAUST: Auch was Geschriebnes forderst du, Pedant?",
        translationZH: "浮士德：你这迂腐冬烘的学究，竟还要什么字据？",
        vocab: {
          word: "Pedant",
          meaningDE: "Kleinlicher, engstirniger Prinzipienreiter.",
          meaningZH: "迂腐冬烘、死扣条规教条的小人。",
        },
        stilmittel: {
          type: "Invektive & Ironie (嘲讽斥责)",
          descDE: "Entrüstung über Mephistos bürokratische Engstirnigkeit.",
          descZH: "对梅菲斯特市民官僚主义死板教条的极度轻蔑与怒斥。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 1710,
        textDE: "Hast du noch keinen Mann, nicht Mannes-Wort gekannt?",
        translationZH: "难道你从未见识过一个男子汉、领教过男子汉的诺言？",
        stilmittel: {
          type: "Rhetorische Frage (反诘修辞)",
          descDE: "Antithese zwischen moralischem Ehrenwort und bürokratischem Papier.",
          descZH: "以反问对比男儿千金一诺与官僚死板字据的境界天壤之别。",
        },
        toneCategory: "titanismus",
      },
      {
        lineNum: 1711,
        textDE: "Ist's nicht genug, dass mein gesprochnes Wort / Auf ewig soll mit meinen Tagen schalten?",
        translationZH: "难道我亲口说出的誓言，还不足以永远主宰我一生的岁月么？",
        toneCategory: "titanismus",
      },
    ],
    questions: [
      {
        id: "q-pakt-inhalt",
        dimension: "inhalt",
        titleDE: "1. Inhalt & Fakten",
        titleZH: "赌约生效的核心触发条件",
        afb: "AFB I",
        questionDE:
          "Welche präzise Bedingung nennt Faust für den Zeitpunkt, an dem Mephisto seine Seele rechtmäßig fordern darf (V. 1692–1699)?",
        questionZH:
          "浮士德在诗行 V. 1692–1699 中，为梅菲斯特何时可以合法索取其灵魂设定了什么极其严密的先决条件？",
        options: [
          {
            id: "a",
            textDE:
              "Erst in dem Augenblick, in dem Faust sich in träger Selbstzufriedenheit verliert und zum Moment sagt: »Verweile doch! du bist so schön!«",
            textZH:
              "唯有当浮士德在懒惰的自我满足中驻足止步，并对某一个瞬间由衷赞叹说出‘停一停吧！你是多么的美丽！’之时。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE: "Genau 24 Jahre nach der Unterzeichnung des Vertrages mit seinem Blut.",
            textZH: "在用自己的鲜血签署契约整整 24 年之后。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE: "Sobald Mephisto ihm Reichtum, Jugend und die Liebe Gretchens verschafft hat.",
            textZH: "只要梅菲斯特为他提供了财富、青春以及格蕾琴的爱情之后。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Faust schließt keinen Zeitvertrag, sondern bindet sein Schicksal an seine innere geistige Dynamik: Stillstand bedeutet Niederlage.",
        explanationZH:
          "浮士德签订的绝非期限固定的买卖契约，而是将自身命运与内在精神求索状态紧密绑定：停滞沉溺即宣告失败。",
        klausurSatzDE:
          "Der Pakt wird von Faust als existenzielle Wette definiert, deren Erfüllungsbedingung ausschließlich im subjektiven Stillstand des Strebens (»Verweile doch!«) liegt.",
        klausurSatzZH:
          "浮士德将契约重新定义为一场存在主义的赌约，其输掉赌局的先决条件仅仅在于内在求索意志的主观停顿（‘停一停吧！’）。",
        ehzKeyPointsDE: [
          "Identifikation der Kernaussage V. 1692–1693 als Bedingungssatz.",
          "Abgrenzung von traditionellen Teufelsbündnissen mit fester Jahresfrist.",
        ],
        ehzKeyPointsZH: [
          "精准提炼 V. 1692–1693 条件假设句作为判定赌局输赢的唯一核心准则。",
          "严格区分传统民间传说中 24 年固定期限出卖灵魂的陈旧模式。",
        ],
      },
      {
        id: "q-pakt-wette",
        dimension: "motiv",
        titleDE: "2. Hauptthema & Motiv",
        titleZH: "浮士德与魔鬼的赌约机制",
        afb: "AFB II",
        questionDE:
          "Warum handelt es sich bei Fausts Abmachung mit Mephisto nicht um einen traditionellen Teufelspakt, sondern um eine dynamische Wette?",
        questionZH:
          "为什么浮士德与梅菲斯特达成的协议并非传统民间传说里的被动魔鬼契约，而是一场由浮士德主导的动态‘意志之赌’？",
        options: [
          {
            id: "a",
            textDE:
              "Weil Faust seine Seele erst dann an Mephisto verliert, wenn er sich jemals in träger Selbstzufriedenheit und Genuss erschöpft ('Verweile doch!'), während Mephisto davon ausgeht, ihn mit Sinnesfreuden abzustumpfen.",
            textZH:
              "因为浮士德唯有在自己哪一天屈服于懒惰自满的世俗享乐、说出‘停一停吧’沉湎止步时，灵魂才会输给魔鬼；他笃定自己的求索永无止境，而梅菲斯特则企图用低俗感官享乐将他驯服腐化。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Weil Mephisto von Faust verlangt, ihm monatliche Zinsen in Golddukaten zu zahlen.",
            textZH:
              "因为梅菲斯特仅仅要求浮士德按月用金币支付仆从劳务报酬与利息。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Weil der Vertrag sofort erlischt, sobald Faust die heilige Messe in Köln besucht.",
            textZH:
              "因为契约规定一旦浮士德前往科隆大教堂做弥撒，魔鬼的约定便自动作废失效。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Goethe transformiert die mittelalterliche Volkssage: Faust ist kein passiver Sünder, sondern ein moderner Aktivist. Stillstand ('Verweilen') ist seine Sünde, unendliche Dynamik ('Streben') seine Existenzberechtigung.",
        explanationZH:
          "歌德彻底改造了民间魔鬼契约的陈旧叙事：浮士德不是怯懦的卖灵魂者，而是激进的现代探索者。在歌德的世界观里，停滞与自满才是唯一的堕落，永恒奋斗求索则是生命的最高神圣性。",
        klausurSatzDE:
          "Durch die Umwandlung des Paktes in eine Wette auf das Nicht-Verweilen begründet Goethe das dynamische Menschenbild der Weimarer Klassik: Der Mensch rettet sich durch rastloses Streben.",
        klausurSatzZH:
          "歌德通过将卖魂契约转化为‘绝不停步沉沦’的世纪豪赌，牢固确立了魏玛古典主义充满能动性的崇高人类形象：唯有永不停歇的奋发求索，才能成就灵魂的超拔救赎。",
        ehzKeyPointsDE: [
          "Differenzierung: Pakt (feste Frist gegen Seele) vs. Wette (Bedingung des Stillstands).",
          "Bedeutung von 'Verweile doch!': Metapher für geistige Trägheit und Genusssättigung.",
          "Verknüpfung mit dem 'Prolog im Himmel' ('Ein guter Mensch in seinem dunklen Drange...').",
        ],
        ehzKeyPointsZH: [
          "精准辨析概念差异：传统契约（固定年限换取法力）vs 现代赌约（以精神停滞为判定门槛）。",
          "剖析‘停一停吧’的哲学隐喻：警惕心灵的懈怠与感官动物化沉溺。",
          "遥相呼应‘天上序曲’中天主的判词：‘善良的人在追求的迷惘中，终究会意识到正确的路径’。",
        ],
      },
      {
        id: "q-pakt-handlung",
        dimension: "handlung",
        titleDE: "3. Handlung & Dramenkontext",
        titleZH: "梅菲斯特索求血字手谕的因果功能",
        afb: "AFB II",
        questionDE:
          "Welche dramaturgische Funktion hat Mephistos Beharren auf »ein paar Zeilen« (V. 1708) vor dem Hintergrund der Pakt-Szene?",
        questionZH:
          "在赌约订立的情节关键节点，梅菲斯特坚持索要‘几行字据’（V. 1708）具有什么重要的戏剧因果与结构功能？",
        options: [
          {
            id: "a",
            textDE:
              "Es entlarvt Mephistos juristisch-bürokratische Natur als zynischer Kleinbürger, der dem lebendigen Geist misstraut und das überlegene Genie Faust an ein formelles, mittelalterliches Blutsiegel ketten will.",
            textZH:
              "它暴露出梅菲斯特作为犬儒市民官僚的死板本性：魔鬼不信任鲜活自由的生命意志，企图用中世纪形式主义的血书印契将浮士德套牢。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Mephisto benötigt die Unterschrift lediglich, um Fausts Erbe gerichtlich einzufordern.",
            textZH: "梅菲斯特仅仅需要这张签名以便向法庭主张继承浮士德的祖传庄园遗产。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Es soll beweisen, dass Faust des Lesens und Schreibens mächtig ist.",
            textZH: "这是为了向冥界证明浮士德确实识字并具备民事签字行为能力。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Kontrast zwischen Fausts titanischem Geist (Ehrenwort) und Mephistos pedantischer Bürokratie (Blutvertrag) vertieft die unüberbrückbare Wesensdifferenz beider Figuren.",
        explanationZH:
          "浮士德泰坦式的崇高气魄（注重人格承诺）与梅菲斯特小肚鸡肠的官僚教条（死扣血书字据）形成强烈戏剧反差，深化了二者本质的不可调和性。",
        klausurSatzDE:
          "Mephistos Verlangen nach schriftlicher Besiegelung (V. 1708) fungiert als dramaturgischer Katalysator, der die bürokratische Begrenztheit des Verführers der titanischen Autonomie des Protagonisten diametral gegenüberstellt.",
        klausurSatzZH:
          "梅菲斯特对书面字据的顽固索求（V. 1708）充当了关键戏剧催化剂，将诱惑者狭隘的官僚教条与主人公崇高的泰坦式主体自主性形成了水火不容的鲜明对照。",
        ehzKeyPointsDE: [
          "Dramaturgische Funktion des Übergangs vom mündlichen Gelöbnis zum Blutkontrakt.",
          "Charakterisierung Mephistos als pedantischer Repräsentant toter Buchstabenregeln.",
        ],
        ehzKeyPointsZH: [
          "分析口头立誓过渡到血书字据的情节转折意义。",
          "揭示梅菲斯特作为死板教条代表的市民性与讽刺性。",
        ],
      },
      {
        id: "q-pakt-wortschatz",
        dimension: "wortschatz",
        titleDE: "4. Wortschatz & Semantik",
        titleZH: "冬烘学究与精神奴役的语义对立",
        afb: "AFB II",
        questionDE:
          "Welche semantische Tiefenschärfe besitzen die Begriffe »Pedant« (V. 1709) und »Knecht« (V. 1703) im Diskurs der Szene?",
        questionZH:
          "场景中出现的概念‘冬烘学究 (Pedant)’（V. 1709）与‘奴隶 (Knecht)’（V. 1703）蕴含着怎样的考纲语用学与哲学深度？",
        options: [
          {
            id: "a",
            textDE:
              "»Pedant« geißelt Mephistos kleinkariertes Pochen auf tote Formalien; »Knecht« bringt Fausts Überzeugung zum Ausdruck, dass jeglicher Stillstand des Geistes bereits die ultimative Sklaverei bedeutet – gleichgültig unter welchem Herrn.",
            textZH:
              "‘Pedant’痛斥梅菲斯特死抠教条字据的狭隘市侩气；‘Knecht’则深刻阐明浮士德的哲学信念：精神一旦止步怠惰，便已然沦为最可耻的奴隶——根本无需在乎主人是谁。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "»Pedant« war damals der offizielle akademische Titel für juristische Notare in Weimar.",
            textZH: "‘Pedant’在当时的魏玛公国是公证员与书记官的正式学术官衔称谓。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "»Knecht« bezieht sich wörtlich auf Fausts Wunsch, Landwirt in der Magdeburger Börde zu werden.",
            textZH: "‘Knecht’在此按字面意义指代浮士德打算前往马格德堡农场当雇工的朴素愿望。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Goethe nutzt philosophisch aufgeladene Begriffe: Knechtschaft ist bei ihm kein sozialer, sondern ein ontologischer Zustand der Passivität.",
        explanationZH:
          "歌德赋予日常词汇深刻的本体论哲学色彩：‘奴役’在此不是社会阶级地位，而是主体失去求索活力后的精神瘫痪状态。",
        klausurSatzDE:
          "Mit der semantischen Opposition von freiem »Mannes-Wort« und servilem »Knecht« radikalisiert Faust die aufklärerische Autonomie: Nur der rastlos Strebende bewahrt seine menschliche Würde.",
        klausurSatzZH:
          "通过自由‘男儿誓言’与屈从‘奴隶’的语义对立，浮士德将启蒙自主性激进化：唯有永不停步的求索者，方能捍卫真正的人格尊严。",
        ehzKeyPointsDE: [
          "Semantische Analyse von 'Pedant' als Invektive gegen bürokratischen Kleinmut.",
          "Philosophische Interpretation von 'Knecht' als existentieller Stillstand.",
        ],
        ehzKeyPointsZH: [
          "分析‘Pedant’作为痛击官僚胆怯的嘲讽语用学色彩。",
          "阐释‘Knecht’作为存在主义式停滞不前的哲学投射。",
        ],
      },
      {
        id: "q-pakt-stilmittel",
        dimension: "stilmittel",
        titleDE: "5. Stilmittel & Rhetorik",
        titleZH: "四重首语重复与末日隐喻修辞",
        afb: "AFB II",
        questionDE:
          "Welche rhetorische Dynamik entfaltet die vierfache Anapher »Dann...« (V. 1694–1697) in Verbindung mit der Metapher der fallenden Zeiger (V. 1698)?",
        questionZH:
          "四重首语重复‘到那时... (Dann...)’（V. 1694–1697）与指针崩落的时钟终局隐喻（V. 1698）结合，产生了怎样的修辞气势与修辞效果？",
        options: [
          {
            id: "a",
            textDE:
              "Sie erzeugt eine unerbittliche Klimax kompromissloser Entschlossenheit: Die kaskadenartige Reihung potenziert Fausts Verachtung für ein bequemes Dasein und inszeniert den Stillstand als kosmisches Weltenende.",
            textZH:
              "它构成了层层递进的决绝高潮：瀑布般的排比排空了对安逸的一切留恋，将意志的停顿直接等同于宇宙时空终结的宏大末日图景。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Die Wiederholung von »Dann« dient lediglich als metrische Notlösung zur Wahrung des Knittelverses.",
            textZH: "‘Dann’的重复仅仅是为了凑足四音步民谣体押韵的音节不足。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Sie signalisiert Fausts wachsende Verwirrung und Resignation gegenüber Mephistos Zauberkräften.",
            textZH: "它表明浮士德面对梅菲斯特的神通感到了深深的语无伦次与认输顺从。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Die rhetorische Wucht der Anapher unterstreicht Fausts Hybris und seine absolute Siegesgewissheit über Mephistos Versuchungen.",
        explanationZH:
          "连续排比句展现出惊人的修辞张力，生动彰显了浮士德傲然睥睨一切平庸诱惑的泰坦自信。",
        klausurSatzDE:
          "Die anaphorische Steigerung (»Dann...«, V. 1694ff.) kulminiert in der Metapher der zerbrochenen Uhr und stilisiert Fausts existenziellen Pakt zu einem Drama von kosmischer Tragweite.",
        klausurSatzZH:
          "首语重复的层层推进（‘Dann...’，V. 1694起）最终在钟表停摆崩落的隐喻中达到顶点，将浮士德的存在之赌升格为震撼宇宙维度的崇高戏剧。",
        ehzKeyPointsDE: [
          "Funktionsbestimmung der Anapher (V. 1694–1697) als dramatische Steigerung.",
          "Deutung der Metapher 'Die Uhr mag stehn, der Zeiger fallen' als Zeitstillstand.",
        ],
        ehzKeyPointsZH: [
          "分析首语重复（Anapher）作为戏剧性递进强化的功能。",
          "阐释时钟指针停落隐喻所代表的生命存在时间终结。",
        ],
      },
      {
        id: "q-pakt-figuren",
        dimension: "figuren",
        titleDE: "6. Figurenzeichnung & Psychologie",
        titleZH: "狂飙突进天才观与市民官僚犬儒",
        afb: "AFB III",
        questionDE:
          "Inwiefern offenbart der Dialog V. 1700–1711 die psychologische Kollision zweier diametral entgegengesetzter Welt- und Menschenbilder?",
        questionZH:
          "在诗行 V. 1700–1711 的激烈交锋中，展现了哪两种截然对立的世界观与人性观在心理层面的剧烈冲撞？",
        options: [
          {
            id: "a",
            textDE:
              "Faust verkörpert das autonome Sturm-und-Drang-Genie, das allein dem lebendigen Ehrenwort vertraut; Mephisto hingegen repräsentiert den zynischen, bürgerlich-bürokratischen Geist, der den Menschen prinzipiell für korrupt und wortbrüchig hält.",
            textZH:
              "浮士德体现了狂飙突进时期推崇的‘自主天才观’，坚信男儿人格誓言的神圣性；而梅菲斯特则代表了现代市民官僚体制的犬儒主义，在骨子里认定人性本恶、势必毁约背信，因而死抱字据不放。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Faust zeigt sich als ängstlicher Schüler, während Mephisto als liebevoller väterlicher Mentor agiert.",
            textZH: "浮士德表现为一个胆怯的学生，而梅菲斯特则扮演着慈祥温和的慈父良师。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Beide Figuren vertreten exakt dieselbe philosophische Schule des scholastischen Kirchenrechts.",
            textZH: "两人代表了完全相同的中世纪经院教会法学派传统。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Dieser Dialog ist das philosophische Kernstück des Dramas: Glaube an die transzendente Würde des Geistes vs. nihilistischer Materialismus.",
        explanationZH:
          "这段交锋是全剧的哲学灵魂：是对人类精神超越性尊严的崇高信仰，与将一切还原为契约物质的虚无主义冷酷算计之间的永恒交战。",
        klausurSatzDE:
          "Im Antagonismus zwischen Fausts Berufung auf das »Mannes-Wort« und Mephistos Beharren auf der Schriftlichkeit prallen das idealistische Menschenbild des autonomen Subjekts und der materialistisch-entfremdete Bürokratismus unversöhnlich aufeinander.",
        klausurSatzZH:
          "在浮士德诉诸‘男儿誓言’与梅菲斯特死抠‘书面字据’的戏剧对抗中，自主主体的唯意志论理想主义人类观与异化的物化官僚教条展开了水火不容的深刻碰撞。",
        ehzKeyPointsDE: [
          "Charakterisierung Fausts als Repräsentant des Geniekults (Autonomie, Ehrenwort).",
          "Charakterisierung Mephistos als skeptisch-bürokratischer Spötter.",
          "Bewertung der Szene für den Gesamtverlauf der Gelehrten- und Gretchentragödie.",
        ],
        ehzKeyPointsZH: [
          "将浮士德定性为狂飙突进狂傲天才观（自主性、人格信用）的代表。",
          "将梅菲斯特剖析为怀疑论与市民官僚主义嘲讽者的化身。",
          "对该场景在整个学者悲剧与格蕾琴悲剧中的枢纽地位作出论述评价。",
        ],
      },
    ],
  },
];

const BOOKMARKS: Record<string, { lineNum: number; labelDE: string; labelZH: string }[]> = {
  "nacht-monolog": [
    { lineNum: 354, labelDE: "V. 354: Habe nun, ach!", labelZH: "V. 354: 学者叹息" },
    { lineNum: 358, labelDE: "V. 358: Armer Tor", labelZH: "V. 358: 愚汉自嘲" },
    { lineNum: 364, labelDE: "V. 364: Nichts wissen", labelZH: "V. 364: 认识绝境" },
    { lineNum: 369, labelDE: "V. 369: Hölle noch Teufel", labelZH: "V. 369: 冲破神权" },
    { lineNum: 376, labelDE: "V. 376: Kein Hund", labelZH: "V. 376: 犬喻厌世" },
    { lineNum: 377, labelDE: "V. 377: Der Magie ergeben", labelZH: "V. 377: 投身魔法" },
    { lineNum: 382, labelDE: "V. 382: Im Innersten", labelZH: "V. 382: 宇宙本源" },
    { lineNum: 385, labelDE: "V. 385: Worten kramen", labelZH: "V. 385: 破除故纸" },
  ],
  "studierzimmer-pakt": [
    { lineNum: 1692, labelDE: "V. 1692: Zum Augenblicke", labelZH: "V. 1692: 瞬间假设" },
    { lineNum: 1693, labelDE: "V. 1693: Verweile doch!", labelZH: "V. 1693: 停一停吧 · 核心母题" },
    { lineNum: 1695, labelDE: "V. 1695: Zugrunde gehn", labelZH: "V. 1695: 万劫不复" },
    { lineNum: 1698, labelDE: "V. 1698: Der Zeiger fallen", labelZH: "V. 1698: 指针崩落" },
    { lineNum: 1703, labelDE: "V. 1703: Bin ich Knecht", labelZH: "V. 1703: 精神奴役" },
    { lineNum: 1709, labelDE: "V. 1709: Pedant?", labelZH: "V. 1709: 怒斥学究" },
    { lineNum: 1710, labelDE: "V. 1710: Mannes-Wort", labelZH: "V. 1710: 男儿誓言" },
  ],
};

export function FaustReadingLab({ lang }: { lang: Lang }) {
  const de = lang === "de";

  // 当前激活的选段
  const [selectedExcerptId, setSelectedExcerptId] = useState<string>("nacht-monolog");
  // 当前激活选中的诗行号（用于左侧点亮与右侧详情联动）
  const [activeVerseNum, setActiveVerseNum] = useState<number>(354);

  // 诗句滚动容器引用与各诗句节点引用（仅在诗歌栏目局部内平滑居中滚动，绝不拉扯外层页面）
  const verseListRef = useRef<HTMLDivElement | null>(null);
  const verseRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 定位诗句：仅在诗歌栏目内部进行局部平滑滚动，并更新当前激活诗行与显微镜解析，外层大窗口和页面完全静止
  const jumpToVerse = (lineNum: number) => {
    setActiveVerseNum(lineNum);
    const container = verseListRef.current;
    const target = verseRefs.current[lineNum];
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const relativeTop = targetRect.top - containerRect.top;
      const targetScrollTop =
        container.scrollTop + relativeTop - container.clientHeight / 2 + targetRect.height / 2;
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    }
  };

  // 用户的答题记录
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // 是否展示 Erwartungshorizont (评分标准详情)
  const [showEHZ, setShowEHZ] = useState<Record<string, boolean>>({});
  // 复制提示
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // 当前聚焦的考题索引 (0 - 5)
  const [focusIndex, setFocusIndex] = useState<number>(0);

  const activeExcerpt = EXCERPTS.find((e) => e.id === selectedExcerptId) ?? EXCERPTS[0];
  const activeVerse = activeExcerpt.verses.find((v) => v.lineNum === activeVerseNum) ?? activeExcerpt.verses[0];
  const currentQ = activeExcerpt.questions[focusIndex] || activeExcerpt.questions[0];

  // 选段切换处理：重置诗行、题目索引并滚动至顶部
  const handleSelectExcerpt = (id: string) => {
    setSelectedExcerptId(id);
    const target = EXCERPTS.find((e) => e.id === id) ?? EXCERPTS[0];
    setActiveVerseNum(target.verses[0].lineNum);
    setFocusIndex(0);
    if (verseListRef.current) {
      verseListRef.current.scrollTop = 0;
    }
  };

  const handleCopySentence = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="font-sans text-[var(--ink)] space-y-3">
      {/* 极简顶栏：歌德《浮士德 I》+ 选段切换 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[var(--line)] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-base text-[var(--ink)]">
            Johann Wolfgang von Goethe: <span className="italic">Faust I</span>
          </span>
          <span className="text-[10px] font-mono text-[var(--gray)] bg-[var(--paper-subtle)] px-1.5 py-0.5 rounded border border-[var(--line)]">
            EF/Q1
          </span>
          <span className="text-xs text-[var(--gray)] font-serif italic hidden sm:inline">
            {de ? activeExcerpt.sceneTitleDE.split("//")[0] : activeExcerpt.sceneTitleZH}
          </span>
        </div>

        {/* 选段切换 */}
        <div className="inline-flex rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-0.5 text-xs font-mono self-start sm:self-auto">
          {EXCERPTS.map((ex) => {
            const isCurrent = selectedExcerptId === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleSelectExcerpt(ex.id)}
                className={`px-3 py-1 rounded transition cursor-pointer font-medium ${
                  isCurrent
                    ? "bg-[var(--surface)] text-[var(--ink)] font-bold shadow-2xs border border-[var(--line)]"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {ex.id === "nacht-monolog" ? "📜 学者独白" : "⚡ 书斋立约"} ({ex.versesRange})
              </button>
            );
          })}
        </div>
      </div>

      {/* 核心双栏精读解剖台 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================================================================= */}
        {/* 左栏 (6列): 原著诗剧精读 + 逐行显微镜 */}
        {/* ================================================================= */}
        <div className="lg:col-span-6 space-y-2.5">
          {/* 原文工具栏 */}
          <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)]/60 pb-1">
            <span className="font-bold text-[var(--ink)]">
              {de ? "Originaltext (Goethe)" : "原著德语诗剧正文"}
            </span>
            <span className="text-[10px] text-[var(--gray)]">
              {de ? "Klick auf Zeile zum Analysieren" : "点击诗行即可释义"}
            </span>
          </div>

          {/* 诗句原著卷轴 */}
          <div
            ref={verseListRef}
            className="rounded-lg border border-[var(--line)] bg-[var(--paper)] p-3 shadow-2xs font-serif divide-y divide-[var(--line)]/20 h-[360px] overflow-y-auto select-none scroll-smooth"
          >
            {activeExcerpt.verses.map((verse) => {
              const isSelected = verse.lineNum === activeVerseNum;
              const hasStilmittel = !!verse.stilmittel;
              const hasVocab = !!verse.vocab;

              // 标黄等标记：还原学生最喜爱的重点标记与批注感
              let highlightBg = "";
              if (isSelected) {
                highlightBg = "bg-amber-100 ring-2 ring-amber-500 font-medium shadow-2xs";
              } else if (hasStilmittel) {
                highlightBg = "bg-amber-50/90 border-l-[3px] border-amber-400 pl-2 text-amber-950";
              } else if (hasVocab) {
                highlightBg = "bg-blue-50/70 border-l-[3px] border-blue-400 pl-2 text-blue-950";
              } else {
                highlightBg = "hover:bg-[var(--surface)]";
              }

              return (
                <div
                  key={verse.lineNum}
                  ref={(el) => {
                    verseRefs.current[verse.lineNum] = el;
                  }}
                  onClick={() => setActiveVerseNum(verse.lineNum)}
                  className={`group py-1.5 px-2.5 rounded transition cursor-pointer flex items-baseline gap-2.5 text-sm leading-relaxed ${highlightBg}`}
                >
                  {/* 行号 */}
                  <span className="font-mono text-[10px] text-[var(--gray)]/80 w-8 shrink-0 text-right select-none">
                    {verse.lineNum % 5 === 0 || isSelected ? verse.lineNum : ""}
                  </span>

                  {/* 德语原诗 + 中文对照 (悬停显示翻译) */}
                  <div className="flex-1 min-w-0">
                    <span className={`tracking-wide ${hasStilmittel ? "font-serif text-amber-950 font-medium" : "text-[var(--ink)]"}`}>
                      {verse.textDE}
                    </span>
                    <span className="ml-2 font-sans text-xs text-[var(--gray)] opacity-0 group-hover:opacity-100 transition-opacity">
                      // {verse.translationZH}
                    </span>
                  </div>

                  {/* 右侧标记：标黄修辞标签与词汇标签 */}
                  <div className="flex items-center gap-1.5 shrink-0 text-[10px] select-none">
                    {hasStilmittel && (
                      <span
                        className="px-1.5 py-0.5 rounded bg-amber-200/90 text-amber-900 border border-amber-300 font-mono font-bold"
                        title={verse.stilmittel?.type}
                      >
                        § {verse.stilmittel?.type.split("(")[0].trim()}
                      </span>
                    )}
                    {hasVocab && (
                      <span
                        className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 font-mono"
                        title={verse.vocab?.word}
                      >
                        📖 {verse.vocab?.word}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 选定单行的显微镜详情卡片 */}
          {activeVerse && (
            <div className="rounded-md border border-[var(--line)] bg-[var(--surface)] p-3 space-y-2 shadow-2xs font-sans text-xs">
              <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[var(--ink)]">
                    Vers {activeVerse.lineNum} // {de ? "Detail-Analyse" : "逐行显微镜解析"}
                  </span>
                  {activeVerse.toneCategory && (
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.2 rounded border ${
                        activeVerse.toneCategory === "krise"
                          ? "bg-rose-50 text-rose-900 border-rose-200"
                          : activeVerse.toneCategory === "spott"
                          ? "bg-purple-50 text-purple-900 border-purple-200"
                          : "bg-emerald-50 text-emerald-900 border-emerald-200"
                      }`}
                    >
                      {activeVerse.toneCategory === "krise"
                        ? de ? "Erkenntniskrise" : "学者认知绝望"
                        : activeVerse.toneCategory === "spott"
                        ? de ? "Spott über Dogmatik" : "对经院伪善的嘲讽"
                        : de ? "Titanisches Streben" : "泰坦式求索冲动"}
                    </span>
                  )}
                </div>
              </div>

              {/* 逐句直译与诗意精析 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-[var(--paper-subtle)] border border-[var(--line)]/50">
                  <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-0.5">
                    {de ? "Wortgetreue Übersetzung" : "直译与义理对照"}
                  </div>
                  <div className="font-serif text-[13px] text-[var(--ink)] leading-snug">
                    {activeVerse.translationZH}
                  </div>
                </div>

                {activeVerse.stilmittel && (
                  <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60 text-amber-950">
                    <div className="font-mono text-[10px] uppercase font-bold text-amber-900 mb-0.5">
                      § {activeVerse.stilmittel.type}
                    </div>
                    <div className="text-[11px] leading-relaxed">
                      {de ? activeVerse.stilmittel.descDE : activeVerse.stilmittel.descZH}
                    </div>
                  </div>
                )}
              </div>

              {/* 古典词汇释义 */}
              {activeVerse.vocab && (
                <div className="p-2 rounded bg-blue-50/60 border border-blue-200/60 text-blue-950">
                  <div className="font-mono text-[10px] font-bold text-blue-900 mb-0.5">
                    📖 Glossar: <span className="underline">{activeVerse.vocab.word}</span>
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    <strong>{activeVerse.vocab.meaningDE}</strong> — {activeVerse.vocab.meaningZH}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 黄金诗句快速定位 */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono pt-0.5">
            <span className="text-[10px] text-[var(--gray)] font-bold">📌 {de ? "Kernzitate:" : "黄金诗句:"}</span>
            {(BOOKMARKS[activeExcerpt.id] || []).map((bm) => (
              <button
                key={bm.lineNum}
                type="button"
                onClick={() => jumpToVerse(bm.lineNum)}
                className={`px-1.5 py-0.5 text-[10px] rounded border cursor-pointer transition ${
                  activeVerseNum === bm.lineNum
                    ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold"
                    : "bg-[var(--paper-subtle)] text-[var(--gray)] border-[var(--line)] hover:border-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? bm.labelDE : bm.labelZH}
              </button>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 右栏 (6列): 逐题精读理解 (选项性阅读理解，一点一点深入) */}
        {/* ================================================================= */}
        <div className="lg:col-span-6 space-y-3">
          {/* 精读理解进度顶栏：无标签噪音，纯净步进 */}
          <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-[var(--ink)]">
                📖 {de ? "Leseverständnis · Schritt für Schritt" : "阅读理解 · 逐题深入"}
              </span>
              <span className="text-[11px] font-mono text-[var(--gray)]">
                (第 {focusIndex + 1} 题 / 共 {activeExcerpt.questions.length} 题)
              </span>
            </div>

            {/* 6 题进度圆点导航：点击可直达，已答即标勾叉 */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              {activeExcerpt.questions.map((q, idx) => {
                const isCurrent = focusIndex === idx;
                const ans = answers[q.id];
                const isCorr = q.options.find((o) => o.id === ans)?.isCorrect;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setFocusIndex(idx)}
                    className={`h-5 w-5 rounded-full text-[10px] flex items-center justify-center font-bold cursor-pointer transition ${
                      isCurrent
                        ? "bg-[var(--ink)] text-white shadow-2xs scale-110"
                        : ans
                        ? isCorr
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                        : "bg-[var(--paper-subtle)] text-[var(--gray)] border border-[var(--line)] hover:border-[var(--gray)]"
                    }`}
                    title={`第 ${idx + 1} 题: ${q.titleZH}`}
                  >
                    {ans ? (isCorr ? "✓" : "✗") : idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 单题阅读理解卡片 */}
          {currentQ && (
            <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4 shadow-2xs space-y-3">
              {/* 题头：清晰明确 */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)]/60 pb-2">
                <span className="font-bold text-[var(--ink)]">
                  第 {focusIndex + 1} 题：{currentQ.titleZH}
                </span>
                {answers[currentQ.id] && (
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    已作答
                  </span>
                )}
              </div>

              {/* 设问正文 */}
              <p className="font-serif text-[14px] leading-relaxed text-[var(--ink)]">
                {currentQ.questionZH}
              </p>

              {/* 选项组 */}
              <div className="space-y-2 pt-1">
                {currentQ.options.map((opt) => {
                  const selectedOptionId = answers[currentQ.id];
                  const isAnswered = !!selectedOptionId;
                  const isThisSelected = selectedOptionId === opt.id;
                  let btnStyle = "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--gray)]";

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium ring-1 ring-emerald-500";
                    } else if (isThisSelected && !opt.isCorrect) {
                      btnStyle = "border-rose-400 bg-rose-50 text-rose-950 line-through";
                    } else {
                      btnStyle = "border-[var(--line)] bg-[var(--paper-subtle)] opacity-50";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => setAnswers({ ...answers, [currentQ.id]: opt.id })}
                      className={`w-full text-left p-2.5 rounded-md border text-xs leading-relaxed transition cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="font-mono font-bold shrink-0 mt-0.5">
                        {opt.id.toUpperCase()}.
                      </span>
                      <span>{opt.textZH}</span>
                    </button>
                  );
                })}
              </div>

              {/* 作答反馈与解析 */}
              {answers[currentQ.id] && (
                <div className="mt-2.5 pt-2.5 border-t border-[var(--line)]/60 space-y-2 animate-fadeIn">
                  <div
                    className={`text-xs font-mono font-bold flex items-center gap-1.5 ${
                      currentQ.options.find((o) => o.id === answers[currentQ.id])?.isCorrect
                        ? "text-emerald-800"
                        : "text-rose-900"
                    }`}
                  >
                    <span>
                      {currentQ.options.find((o) => o.id === answers[currentQ.id])?.isCorrect
                        ? "✓ 解题命中 // 正确理解"
                        : "✗ 需强化辨析 // 深入思考"}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-[var(--gray)] font-sans">
                    {currentQ.explanationZH}
                  </p>

                  {/* 德语标准答题句式积木 (Klausur-Formulierung) */}
                  <div className="p-2 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--gray)]">
                      <span className="font-bold text-[var(--ink)]">
                        § {de ? "Muster-Formulierung für die Klausur" : "德语高分答题句式"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopySentence(currentQ.klausurSatzDE, currentQ.id)}
                        className="text-[var(--ink)] hover:underline cursor-pointer"
                      >
                        {copiedId === currentQ.id ? "✓ Kopiert" : de ? "Kopieren" : "复制德语文案"}
                      </button>
                    </div>
                    <div className="font-serif italic text-xs text-[var(--ink)] leading-relaxed">
                      „{currentQ.klausurSatzDE}“
                    </div>
                  </div>

                  {/* 官方评卷期望标准 (Erwartungshorizont / EHZ) 折叠栏 */}
                  <div className="pt-0.5">
                    <button
                      type="button"
                      onClick={() => setShowEHZ({ ...showEHZ, [currentQ.id]: !showEHZ[currentQ.id] })}
                      className="text-[11px] font-mono text-[var(--gray)] hover:text-[var(--ink)] flex items-center gap-1 underline cursor-pointer"
                    >
                      <span>{showEHZ[currentQ.id] ? "▲" : "▼"}</span>
                      <span>
                        {showEHZ[currentQ.id]
                          ? de ? "Erwartungshorizont verbergen" : "收起官方评分期望标准"
                          : de ? "Offiziellen Erwartungshorizont (EHZ) einsehen" : "查看官方评分期望标准 (EHZ 要点)"}
                      </span>
                    </button>

                    {showEHZ[currentQ.id] && (
                      <div className="mt-1.5 p-2 rounded bg-[var(--surface)] border border-[var(--line)] text-xs space-y-1 font-mono text-[11px]">
                        <ul className="list-disc pl-4 space-y-0.5 text-[var(--gray)] font-sans text-xs">
                          {currentQ.ehzKeyPointsZH.map((pt, pIdx) => (
                            <li key={pIdx}>
                              <span className="text-[var(--ink)]">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 题目导航步进器 */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]/60">
                <button
                  type="button"
                  disabled={focusIndex === 0}
                  onClick={() => setFocusIndex(focusIndex - 1)}
                  className="px-3 py-1.5 rounded border border-[var(--line)] text-xs font-mono cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--paper-subtle)]"
                >
                  ◀ 上一题
                </button>

                <span className="text-xs font-mono text-[var(--gray)]">
                  第 {focusIndex + 1} 题 / 共 {activeExcerpt.questions.length} 题
                </span>

                <button
                  type="button"
                  disabled={focusIndex === activeExcerpt.questions.length - 1}
                  onClick={() => setFocusIndex(focusIndex + 1)}
                  className={`px-3.5 py-1.5 rounded text-xs font-mono cursor-pointer transition ${
                    answers[currentQ.id] && focusIndex < activeExcerpt.questions.length - 1
                      ? "bg-[var(--ink)] text-white shadow-2xs font-bold hover:opacity-90"
                      : "border border-[var(--line)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--paper-subtle)]"
                  }`}
                >
                  下一题 ▶
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
