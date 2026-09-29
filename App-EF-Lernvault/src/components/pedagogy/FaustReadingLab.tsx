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
          "浮士德在开篇独白第 354–376 行中历数了传统大学四大学科体系（哲学、法学、医学与神学）。结合中世纪以来的大学分科传统，浮士德在此得出了怎样兼具认识论（Erkenntnistheorie）与生存存在主义（Existenzialismus）的确切破产结论？",
        options: [
          {
            id: "a",
            textDE:
              "Er hat Philosophie, Juristerei, Medizin und Theologie studiert, ist jedoch vermögenslos ('weder Gut noch Geld') und verzweifelt daran, dass wahre Naturerkenntnis dem menschlichen Verstand unzugänglich bleibt.",
            textZH:
              "他以三十年皓首穷经证实：传统经院学术不仅无法通达终极自然奥义（‘自知人类一无所知’），而且在现实生活中使他陷入尊严与物质的双重赤贫（‘无金钱财产、无尘世荣光’），更沦为欺骗学生的虚伪教书匠。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er bedauert vor allem den Verlust seines Universitätslehrstuhls und plant die Eröffnung einer privaten Apotheke in Leipzig.",
            textZH:
              "他主要批判神学垄断了自然科学的研究经费，导致医学与法学无法展开经验主义解剖实验，因而悔恨自己未能早日脱离教会管辖前往新大陆开办实科学校。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er ist stolz auf seine akademischen Titel als Magister und Doktor und möchte sein Wissen in einem neuen Handbuch der Naturlehre publizieren.",
            textZH:
              "他认为四大传统学科的逻辑推演本身严密无误，但因当时哥廷根大学学派内讧频繁、同行评议不公，使他失去了晋升帝国顾问的机会，从而产生了暂时性的职业倦怠。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Goethe lässt Faust die gesamte damalige Wissensordnung abarbeiten: Das Resümee ist der absolute geistige und materielle Nullpunkt.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 354–376 行构成了全剧著名的「学者危机总清算」（Abrechnung mit der Spätscholastik）。歌德让浮士德自底向上的检视中世纪以来的四大经典分科（预备学科 Artistenfakultät / 哲学，以及三门高等学院：法学、医学、神学）。浮士德的绝望具有双重毁灭性：\n1. 认识论灭顶：人类纯粹依靠理性字面推演根本无法洞悉宇宙生命本源（„Dass wir nichts wissen können!“，第 364 行）；\n2. 存在与生存清零：他既无财产金钱，又无世俗名望（„Weder Gut noch Geld, noch Ehr und Herrlichkeit der Welt“），甚至在道德上痛感自己沦为误人子弟的骗子（„unsre Schüler an der Nase herumführen“）。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（时代概念倒错）：将 16 世纪至 18 世纪末的形而上学存在危机降维成了 19 世纪晚期关于「科研经费分配」与「实科中学（Realschule）」的现代世俗化体制争端；\n• 选项 C 诊断（庸俗化心理误读）：浮士德的痛苦绝非学者晋升受阻的职业倦怠（Burnout），而是直面人类理性极限时的形而上学绝望。\n\n【🏛 时代思潮与哲学脉络】\n歌德借此打破了启蒙运动（Aufklärung）对「理性全能论」的盲目乐观迷信，宣告单凭笛卡尔式的知性推演无法拯救人类的心灵荒原。",
        klausurSatzDE:
          "In der Exposition (V. 354–376) bilanziert Faust das existentielle Scheitern seines lebenslangen Studiums aller vier Fakultäten: Indem er das scholastische Buchwissen als illusionsstiftenden Selbstbetrug entlarvt, radikalisiert er seine Erkenntniskrise zu einem absoluten geistigen und materiellen Nullpunkt.",
        klausurSatzZH:
          "在开篇独白（第 354–376 行）中，浮士德全面清算了其毕生研习四大传统学院所遭遇的存在主义溃败：他将经院书斋知识揭露为虚妄的自我欺骗，从而将其认识论危机激化为精神与物质的双重绝对归零。",
        ehzKeyPointsDE: [
          "Nennung der vier Fakultäten: Philosophie, Jura, Medizin, Theologie.",
          "Existenzieller Nullpunkt: Erkenntnisgrenze ('dass wir nichts wissen können').",
          "Materieller Totalverlust: Fehlen von Gut, Geld, weltlicher Ehre.",
          "Verlust pädagogischer Legitimität: Täuschung der Schüler.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Inhalt 4P)：精准列举四大学科（哲学、法学、医学、神学）并定性为欧洲经院知识传统完备体系。",
          "踩分点 2 (Erkenntnis 4P)：提炼认识论死局——指出理性逻辑在终极自然面前的无能（引证 V. 364 „dass wir nichts wissen können“）。",
          "踩分点 3 (Existenz 4P)：概括生存与道德的三重破产：无产无金（Gut/Geld）、无世俗尊荣（Ehr）、教育合法性沦丧（An-der-Nase-Herumführen）。",
          "扣分警示 (Abzug -2P)：若仅将此独白解读为普通失业或学者心理倦怠，未上升至启蒙理性危机者，扣除相应层级分数。",
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
          "在独白核心诗行第 382–383 行（„Dass ich erkenne, was die Welt / Im Innersten zusammenhält“）中，浮士德所宣示的探索诉求如何体现了「狂飙突进」（Sturm und Drang）与「浮士德精神」（Faustisches Streben）的崇高本质？",
        options: [
          {
            id: "a",
            textDE:
              "Das titanische Faustische Streben: Die Weigerung, sich mit beschränktem Buchwissen zu begnügen, und der unbedingte Drang nach ganzheitlicher Wesenserkenntnis der Natur.",
            textZH:
              "他所追求的绝非冷冰冰的外在科学定律或孤立的经验事实拼凑，而是渴求与宇宙生生不息的活态有机造化源初力量（‚alle Wirkenskraft und Samen‘）实现神性合一与直观体悟。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Das barocke 'Memento Mori': Die ständige Todesermahnung und die Sehnsucht nach asketischer Weltabgewandtheit.",
            textZH:
              "他试图恢复托马斯·阿奎那的经院哲学权威，证明上帝在创世时赋予神圣罗马帝国的君权神授法律基础具有不可动摇的永恒性。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Der aufklärerische Deismus: Das Vertrauen, dass Gott die Welt wie ein perfektes mechanisches Uhrwerk konstruiert hat.",
            textZH:
              "他希望借助莱布尼茨的单子论数学公式，将大自然的一切生物运动精确计算为无摩擦的机械齿轮运动，从而制造出永动机。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Das Faustische Streben überwindet die rationalistische Aufklärung: Faust sucht die lebendige Urkraft des Kosmos statt toter Begriffe.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 382–383 行是全剧最著名的哲理诗句（Kernzitat），确立了整个德语文学史上最崇高的母题——「浮士德式永恒求索」（Faustisches Streben）：\n1. 质的跃迁：浮士德不再满足于「在词藻杂货堆里翻检（in Worten kramen）」，他要把握的是维系宇宙生生不息运转的内在灵魂枢纽；\n2. 活态有机论（Organismusgedanke）：结合第 384 行的「全部活力与胚芽（alle Wirkenskraft und Samen）」，歌德在此融入了赫尔德（Herder）与斯宾诺莎（Spinoza）的泛神论生命观——大自然并非冰冷的机械钟表，而是充满神性神力的生命巨流，浮士德渴望的是主体与客体的终极融合。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（反动经院神学）：浮士德在开篇就已经宣称自己「既不怕地狱也不怕魔鬼（fürchte mich weder vor Hölle noch Teufel，V. 369）」，彻底打破了天主教教权枷锁，绝不可能去为经院神权背书；\n• 选项 C 诊断（启蒙机械论混淆）：将宇宙拆解为「无摩擦齿轮」是笛卡尔与牛顿机械宇宙观的典型产物，而狂飙突进时期的歌德最激烈的正是反抗这种将自然物化去神圣化的机械模型。\n\n【🏛 时代思潮与哲学脉络】\n此处的浮士德展现了狂飙突进典型的「泰坦主义（Titanismus）」：拒绝接受凡人理性的有限天花板，宁可打破禁忌涉足魔法（Magie），也要夺取等同于造物主的无限神性。",
        klausurSatzDE:
          "Mit dem berühmten Bekenntnis, erkennen zu wollen, »was die Welt im Innersten zusammenhält« (V. 382f.), artikuliert Faust das titanische Streben des Sturm und Drang nach einer holistischen Naturmystik, die den analytischen Reduktionismus der Aufklärung radikal transzendiert.",
        klausurSatzZH:
          "通过宣告渴求参透‘究竟何种力量在最核心深处维系着整个宇宙’（第382–383行），浮士德精准外化了狂飙突进时期整体性自然神秘主义的泰坦求索，从根本上超越了启蒙运动割裂的分析还原论。",
        ehzKeyPointsDE: [
          "Begriff 'Titanismus / Faustisches Streben' präzise definieren.",
          "Kontrastierung von toter Begriffswelt ('Worte kramen') und organischer Naturkraft ('Samen').",
          "Überwindung der rationalistischen Schranken durch Magie.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Definition 4P)：精准界定「浮士德式求索精神（Faustisches Streben）」及狂飙突进泰坦主义（Titanismus）特征。",
          "踩分点 2 (Antithese 4P)：尖锐对比死文字考据（Worten kramen）与自然有机生命原动力（Wirkenskraft und Samen）的本质对立。",
          "踩分点 3 (Pantheismus 4P)：指出歌德泛神论（Gott-Natur）思想在诗句中的渗透——追求主体与自然造化的神圣同一。",
          "扣分警示 (Abzug -2P)：若未能指出该母题对启蒙理性机械论的超越，仅停留于字面科学好奇心，视为论证浮于表面。",
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
          "此段独白在整部《浮士德 I》的戏剧宏观架构中承担了怎样的「多米诺骨牌」首推职能？它在接下来的场景中不可逆地引发了怎样环环相扣的因果戏剧行动链条？",
        options: [
          {
            id: "a",
            textDE:
              "Er dient als psychologische Exposition der Gelehrtentragödie: Die Verzweiflung treibt Faust zur Geisterbeschwörung (Erdgeist), nach dessen schroffer Zurückweisung an den Rand des Suizids und öffnet ihn letztlich für den teuflischen Pakt mit Mephisto.",
            textZH:
              "独白呈现的存在绝境直接触发其‘转向魔法’，而召唤地灵遭受的残酷人格羞辱进一步将其逼向‘服毒自尽’边缘；自杀未遂后的侥幸与空虚，最终在心理上为他毫无顾忌地接受‘魔鬼血契’奠定了无可替代的行动支点。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er bildet den Schlusspunkt der Gretchentragödie und fasst Fausts Reue über den Tod von Valentins Schwester zusammen.",
            textZH:
              "独白促使浮士德立刻顿悟了基督教天恩救赎的真谛，使他当晚便在书斋中写下《圣经·约翰福音》的德语译本，并在第二天复活节清晨前往格蕾琴的忏悔室完成了灵魂洗礼。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er dient der Einführung der Wette zwischen dem Herrn und Mephisto im 'Prolog im Himmel'.",
            textZH:
              "独白在戏剧法上纯粹是一段独立抒情插曲，与后文魔鬼梅菲斯特的登场毫无因果关联，梅菲斯特之所以来到书斋完全是出于天上序曲中上帝的直接行政派遣。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Dramaturgisch fungiert der Monolog als unverzichtbare Kausalkette: Wissenschaftskrise → Magie → Erdgeist → Giftbecher → Mephisto-Pakt.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n在亚里士多德式与现代戏剧因果法中，黑夜独白构成了「学者悲剧（Gelehrtentragödie）」无可替代的第一推动力：\n1. 动机链条 1：理性破产 → 转向通灵魔法（„Drum hab ich mich der Magie ergeben“，V. 377）；\n2. 动机链条 2：宏观宇宙符号（Makrokosmos）的隔靴搔痒 → 强行召唤地灵（Erdgeist）→ 遭地灵严酷鄙夷（„Du gleichst dem Geist, den du begreifst, / Nicht mir!“）引发精神崩塌；\n3. 动机链条 3：认知天花板被焊死 → 试图通过服毒自杀（Giftbecher）以肉身毁灭强渡彼岸 → 被复活节圣歌（Osterglocken）唤回尘世留恋；\n4. 动机链条 4：城门口游春时无处安放的精神危机 → 招引黑犬进书斋 → 浮士德已成亡命之徒，彻底为与梅菲斯特立下豪赌契约做好了心理准备。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（情节移花接木与道德美化）：浮士德翻译约翰福音是在与魔鬼立约之前（将 „Im Anfang war das Wort“ 改为 „die Tat“，展现行动主义而非虔信）；格蕾琴更是后文「市民悲剧（Gretchentragödie）」才登场的受害者，浮士德绝非圣徒；\n• 选项 C 诊断（抹杀戏剧内在必然性）：若无此独白揭示浮士德破罐破摔的绝境，后续他毫不犹豫与魔鬼赌命的行为将在心理学上显得毫无说服力。戏剧必须由浮士德内在危机自发推进。\n\n【🏛 时代思潮与哲学脉络】\n歌德在此展现了深刻的因果宿命：浮士德之所以走向深渊，不是因为他平庸邪恶，恰恰是因为其精神追求过于崇高而尘世无法承载。",
        klausurSatzDE:
          "Dramaturgisch fungiert der Eingangsmonolog als psychologische Exposition der Gelehrtentragödie, indem er die unausweichliche Kausalitätskette von magischer Geisterbeschwörung über die existentielle Zurückweisung durch den Erdgeist bis hin zur Suizidalität und der daraus resultierenden Paktbereitschaft zwingend grundlegt.",
        klausurSatzZH:
          "在戏剧法上，开篇独白充当了学者悲剧的心理铺垫开端，必然地奠定了从通灵召魂、遭地灵无情贬斥、诱发自杀倾向直至最终甘愿立下魔鬼契约的一连串不可逆因果链条。",
        ehzKeyPointsDE: [
          "Einordnung in die Szenenfolge: Nach 'Prolog im Himmel', vor 'Vor dem Tor'.",
          "Kausale Verknüpfung: Wissenschaftskrise → Magie → Erdgeist → Giftbecher → Teufelspakt.",
          "Verbindung von Gelehrtentragödie und späterer Gretchentragödie.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Exposition 4P)：准确定位开篇独白在整剧宏观结构中的功能——奠定学者悲剧（Gelehrtentragödie）的心理与情节基石。",
          "踩分点 2 (Kausalkette 4P)：完整梳理四级因果递进：学术危机 → 投身魔法 → 地灵受挫自尊破碎 → 服毒自尽未遂 → 缔结魔契。",
          "踩分点 3 (Figurenmotivation 4P)：剖析浮士德亡命徒赌徒心理（Risikobereitschaft）的形成机理，说明其接受魔鬼要约的内在合理性。",
          "扣分警示 (Abzug -2P)：若割裂独白与后续情节的内在逻辑联系，将其孤立描述为无因果作用的情感宣泄，扣除结构分析分值。",
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
          "歌德在独白中密集选用了具有强烈贬抑色彩的民间与古典词汇，如「armer Tor」（第358行）、「Laffen」（第366行）以及「in Worten kramen」（第385行）。结合当时的语言社会学语境，这些词汇承载了怎样的修辞颠覆力？",
        options: [
          {
            id: "a",
            textDE:
              "„Tor“ meint den trotz Buchwissens unweisen Menschen; „Laffen“ degradiert das universitäre Establishment zu eitlen Gecken; „in Worten kramen“ brandmarkt scholastische Begriffsklauberei ohne Lebensbezug.",
            textZH:
              "歌德以市井大众口语反讽暴力砸碎了经院学术的体面外壳：‘Tor’将拥有博士学衔的学者定性为精神愚人；‘Laffen’将道貌岸然的教授群体贬为浅薄佞臣与纨绔；‘kramen’则将崇高的神圣学术推演贬低为在旧货杂物堆里翻检毫无生气的破烂。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "„Tor“ beschreibt ein architektonisches Portal; „Laffen“ bezeichnet studentische Verbindungen; „kramen“ bedeutet das Verkaufen von Schriften auf dem Marktplatz.",
            textZH:
              "这些词汇是 18 世纪魏玛宫廷贵族在沙龙交际中专用的高雅社交辞令，歌德借此展示浮士德作为上流社会枢密顾问官的优雅教养与外交礼节。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Alle drei Begriffe stammen aus der mittelhochdeutschen Minnedichtung und drücken Fausts unerfüllte Liebessehnsucht aus.",
            textZH:
              "歌德从马丁·路德德译《圣经》的启示录中直接借用了这些末世神学词汇，旨在告诫读者审判日即将来临，任何异端学者都将被视为撒旦的走狗。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Goethes Sprachwahl ist revolutionär: Volkssprachliche Abwertungen zerstören das elitäre Gehabe der Spätscholastik.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n歌德在狂飙突进时期最革命性的贡献之一便是「语言的非宫廷化与粗砺现实主义复归」：\n1. „armer Tor“（可怜的愚汉）：在古高地与中古德语中，„Tor“ 代表狂妄自大却对真实天命毫无感知的愚痴者。浮士德自加硕士（Magister）与博士（Doktor）高贵桂冠，转瞬间自嘲为「愚汉」，构成刺痛人心的反讽矛盾法（Oxymoron）；\n2. „Laffen“（佞臣/浮滑纨绔）：源自古低地德语，特指那些毫无真才实学、依附体制耀武扬威的庸俗之辈。浮士德用 „gescheiter als alle die Laffen, Doktoren, Magister, Schreiber und Pfaffen“ 将所有传统学术官僚一网打尽；\n3. „in Worten kramen“（翻检词藻字据）：动词 „kramen“ 带有极其浓烈的贱民集市色彩，原指小商贩在旧货摊里手忙脚乱地翻动破旧织物杂物。学术被降格为「翻破烂」，无情撕下了经院哲学装腔作势的神圣遮羞布。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（词域完全颠倒）：将激进反叛的狂飙突进粗砺语言，曲解为法国化的魏玛宫廷客套辞令（Hofsprache），完全违背了歌德反抗古典宫廷戏剧浮华文风的初衷；\n• 选项 C 诊断（神学原条教条主义）：将歌德自觉的文学反叛语言误读为路德教派的末日宣教，脱离了德国启蒙时代与狂飙突进时期的思想史语境。\n\n【🏛 时代思潮与哲学脉络】\n这种语用颠覆正是德国 18 世纪「民族文学解放」的核心策源：打破拉丁化经院语法与法语宫廷文风，重新接引 16 世纪汉斯·萨克斯（Hans Sachs）式的民间鲜活血脉。",
        klausurSatzDE:
          "Goethes provokante Wortwahl – von der Selbstentwürdigung als »armer Tor« über die Invektive gegen universitäre Würdenträger als »Laffen« bis zur Degradierung von Wissenschaft als bloßes »in Worten kramen« – dekonstruiert die elitäre Scheinautorität der Spätscholastik mit drastischer sprachlicher Wucht.",
        klausurSatzZH:
          "歌德极具挑衅性的用词——从自嘲为‘可怜的愚汉’，到怒斥大学体面学者为‘浮滑佞臣’，再到将科学推演贬黜为低贱的‘旧货摊翻检词藻’——以惊人的语言冲击力彻底解构了晚期经院哲学的虚伪精英权威。",
        ehzKeyPointsDE: [
          "Etymologische Präzision: 'Tor' = Narr vs. intellektueller Anspruch.",
          "Soziokulturelle Konnotation: 'Laffen' als Entlarvung autoritärer Scheinautoritäten.",
          "Metaphorische Abwertung: 'Kramen' im Gegensatz zu lebendigem Schaffen.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Semantik 'Tor' 3P)：分析「Tor」与「Magister/Doktor」的强烈反讽对照，揭示知识丰富与宇宙智慧赤贫的张力。",
          "踩分点 2 (Soziokultur 'Laffen' 3P)：阐明「Laffen」对建制派学者（Doktoren, Schreiber, Pfaffen）伪善外衣的颠覆性嘲弄。",
          "踩分点 3 (Metaphorik 'kramen' 3P)：精准拆解「in Worten kramen」的市井商业隐喻——将形而上学推演贬斥为死文字的杂物翻捡。",
          "踩分点 4 (Epoche 3P)：结合狂飙突进（Sturm und Drang）反叛宫廷优雅语言、拥抱民间生命力的语域特征进行综述评价。",
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
          "歌德在此段诗行中选用古德国四音步「Knittelvers」（短韵偶句体）与随韵（Paarreim），并大量杂糅感叹词（Exclamatio）、尖锐对照（Antithese）与突兀破折号。这种形式格律如何服务于浮士德心理状态的外化表达？",
        options: [
          {
            id: "a",
            textDE:
              "Der vierhebige Knittelvers mit freier Senkungsfüllung und Paarreimen verleiht der Rede einen erregten, pochenden Redefluss; rhetorische Ausrufe (Exclamatio 'ach!'), drastische Tiervergleiche ('Hund') und Antithesen spiegeln seine Zerrissenheit.",
            textZH:
              "具有自由轻音填充的四音步 Knittelvers 打破了传统戏剧格律的死板工整，形成如心脏剧烈搏动般的急促语流；感叹法（‘ach!’）、严酷野兽比喻（‘kein Hund’）与破折号停顿，精准外化了浮士德内心剧烈的精神动荡与濒临绝境的痉挛挣扎。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Klassischer fünfhebiger Blankvers ohne Reim, der durch vollkommene Harmonie und Ruhe antike Gelassenheit demonstriert.",
            textZH:
              "Knittelvers 是为了模仿天主教复调弥撒的平缓圣咏，通过绝对对称的抑扬格五音步，营造出超脱尘世焦虑的安详冥想氛围，旨在向观众传达内心的无喜无悲。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Ein gereimtes Sonett mit strenger Terzett-Struktur, das rational geordnete Argumente wie ein juristisches Plädoyer gliedert.",
            textZH:
              "这纯粹是歌德在早年创作戏剧时格律技巧不成熟留下的技术硬伤，歌德在后来的魏玛古典主义修正版中已全面放弃此种粗糙形式，改用严格的古典酒神赞歌颂体。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Knittelvers ist kein formelles Manko, sondern bewusstes Stilmittel: Er erzeugt seismographische Unruhe und bricht mit der starren Hofdichtung.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n歌德选用 Knittelvers 是德国戏剧史上里程碑式的形式美学自觉（Formbewusstsein）：\n1. 音步自由性：Knittelvers 固定为四重音步（vier Hebungen），但轻音音节数量完全自由（freie Senkungsfüllung）。这种韵律绝不像法国古典主义的六音步亚历山大琴体（Alexandriner）那样平整匀称，而是随着呼吸狂暴波动，时而短促迫切（„Habe nun, ach! Philosophie“），时而沉重绵长；\n2. 随韵（Paarreim, aabb）的紧逼感：两两押韵形成步步紧逼的听觉压迫感，催促戏剧动作快速向前；\n3. 修辞图景的精神地震仪功能：\n   • 叹词 Exclamatio（„ach!“）：开门见山宣告生存痛苦，打破传统学者的沉稳风度；\n   • 严酷动物隐喻 Metapher（„Es möchte kein Hund so länger leben!“）：将博学的自己置于连看门狗都不如的苟且地位，自虐式的夸张（Hyperbel）达到情绪峰值；\n   • 破折号（Gedankenstrich）：在 „Und sehe, dass wir nichts wissen können! – / Das will mir schier das Herz verbrennen“ 处，破折号充当了思想断裂与内心绞痛的停顿符。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（格律与氛围颠倒）：将狂暴短韵指鹿为马说成「天主教复调平缓圣咏」，其音响特征与冥想氛围完全与浮士德焦躁狂暴的心理状态背道而驰；\n• 选项 C 诊断（否定文学史常识）：Knittelvers 是歌德向宗教改革时期平民诗人汉斯·萨克斯致敬的杰作，更是《浮士德》最标志性的声音指纹，绝非所谓技术缺陷。\n\n【🏛 时代思潮与哲学脉络】\n内容与形式的辩证统一：狂暴无羁的 Knittelvers 本身就是对启蒙理性「秩序、对称、自制」形式枷锁的直接炸裂，是狂飙突进天才美学的最生动注脚。",
        klausurSatzDE:
          "Indem Goethe den erregten Redefluss Fausts im ungebändigten Rhythmus des vierhebigen Knittelverses fasst und mit expressiven Stilfiguren wie Exclamationes und Antithesen überlagert, fungiert die Metrik als akustisches Seismogramm einer tiefgreifenden psychischen Zerrissenheit.",
        klausurSatzZH:
          "歌德将浮士德激愤的语流浇筑于不羁的四音步 Knittelvers 格律之中，并叠加感叹词与对照等爆发性修辞，使形式格律化为精准记录其深层精神分裂与狂躁痛苦的声学地震仪。",
        ehzKeyPointsDE: [
          "Metrik: Vierhebiger Knittelvers (historischer Kolorit des 16. Jh.).",
          "Reimschema: Vorwiegend Paarreim (aabb), rhythmisch drängend.",
          "Figuren: Exclamatio ('ach!'), Oxymoron ('armer Tor'), Enjambement ('was die Welt / Im Innersten').",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Metrik 4P)：精准指出四音步 Knittelvers 及轻音自由填充（freie Senkungsfüllung）的不规则节律特征。",
          "踩分点 2 (Stilmittel 4P)：分析 Exclamatio (ach!)、Tiervergleich (Hund) 与破折号停顿对心理痉挛的外化功能。",
          "踩分点 3 (Synthese 4P)：深刻阐述格律形式如何完美服务于狂飙突进反抗宫廷雅正、抒发原始野性激情的戏剧主旨。",
          "扣分警示 (Abzug -2P)：若仅罗列修辞名称，未能说明其与浮士德痛苦心理之间的功能性映射关系，扣除分析深度分数。",
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
          "结合整段独白，浮士德一方面面对世俗同行展现出冷酷傲慢（„gescheiter als alle die Laffen“），另一方面面对自然神明又陷入无尽的自轻自贱（„armer Tor“、„nichts wissen“）。这种悖论式的双极人格揭示了其怎样的存在主义裂变？",
        options: [
          {
            id: "a",
            textDE:
              "Ein paradoxer Dualismus aus elitärer Überheblichkeit gegenüber den Mitmenschen ('gescheiter als alle die Laffen') und tiefster Ohnmacht vor der Natur ('nichts wissen können'); er verachtet bürgerliche Sicherheit, leidet jedoch unter seiner totalen existentiellen Isolation.",
            textZH:
              "揭示出歌德笔下著名的‘浮士德双重灵魂撕裂’：他在知性优越感上凌驾于庸俗市民之上，因而无法融入世俗平庸的安稳幸福；但面对宇宙造化的无限神圣，其凡人肉身的有限性又令他痛感虚无与瘫痪，这种两极张力注定将其推向悲剧深渊。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er ist ein bescheidener, gottesfürchtiger Gelehrter, der sich nach familiärem Glück und bürgerlicher Eintracht im Kreise der Dorfgemeinschaft sehnt.",
            textZH:
              "证明浮士德患有典型的间歇性精神分裂症，其所有痛苦仅源于独居书斋缺乏社交导致的心智退化，只要娶妻生子便能彻底消解其内心矛盾。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er ist ein rein zynischer Nihilist, der die Natur völlig geringschätzt und ausschließlich nach materieller Bereicherung und politischer Macht am Kaiserhof strebt.",
            textZH:
              "说明浮士德骨子里是一个机会主义骗子，他在市民面前装出博学以骗取学费，在独自一人时又因担心被司法机关识破伪造文凭而惊恐万状。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Hier kündigt sich bereits das Faustische 'Zwei-Seelen-Dilemma' (V. 1112) an: Titanische Hybris prallt auf fundamentale menschliche Ohnmacht.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n此处已然奠定了全剧第 1112 行最震撼的心理谶语——„Zwei Seelen wohnen, ach! in meiner Brust“（两道灵魂在我胸中交战）：\n1. 向上攀登的灵魂（Der titanische Geist）：傲视群伦的泰坦狂傲（Titanische Hybris）。浮士德蔑视一切体制内的凡夫俗子（Doktoren, Magister, Schreiber, Pfaffen），他拥有超凡的智性自觉，拒绝被琐碎平庸的市民温饱所规训驯化；\n2. 被肉身钉死的灵魂（Die irdische Begrenzung）：面对大自然与浩瀚宇宙，他又无比清醒地意识到人类理性的苍白与肉体皮囊的脆弱。越是渴望与神比肩，越能感受到凡人天花板带来的窒息绝望；\n3. 悲剧根源：他既「回不去平庸安稳的市民生活」，又「上不去全知全能的神圣天堂」。正是这种悬置在人神之间的绝望张力，逼迫他跨越善恶界限，并在后续情节中为了追逐超越性体验而不惜摧毁纯洁无辜的格蕾琴。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（庸俗心理学消解）：将崇高的存在主义形而上学悲剧降维成「大龄单身宅男缺乏社交」，彻底瓦解了古典悲剧主人公的崇高尊严与时代反思价值；\n• 选项 C 诊断（小人度君子）：浮士德在独白中正是因为无法忍受对学生的欺骗与知识的虚妄才陷入自杀边缘，其痛苦源于极度的良知苛责与求知真诚，绝非世俗诈骗犯的畏罪恐慌。\n\n【🏛 时代思潮与哲学脉络】\n浮士德的人格裂变是现代西方「现代性人（Der moderne Mensch）」的诞生日记：理性的启蒙让人摆脱了神权襁褓成为自主个体，但孤独的主体也因此失去了精神家园，注定在永无止境的漂泊中承受痛苦。",
        klausurSatzDE:
          "In der bipolaren Spannung zwischen elitärer Verachtung des bürgerlichen Konformismus und existentieller Selbstzerrüttung vor der unzugänglichen Natur manifestiert sich bereits Fausts tragisches »Zwei-Seelen-Dilemma«, das seine Unfähigkeit zu irdischer Genügsamkeit ontologisch begründet.",
        klausurSatzZH:
          "在蔑视市民庸俗从众的精英傲岸，与面对不可企及的大自然时彻底的精神自我摧毁之间，鲜明地展现出浮士德悲剧性的‘双重灵魂裂变’，在本体论层面上奠定了他绝不可能安于凡尘小确幸的悲剧宿命。",
        ehzKeyPointsDE: [
          "Charakter-Ambivalenz: Hybris vs. Demut/Verzweiflung.",
          "Verhältnis zur Gesellschaft: Verachtung ('Laffen'), Isolation, Einsamkeit.",
          "Verhältnis zur Natur: Sehnsucht nach unmittelbarer Verschmelzung statt wissenschaftlicher Sezierung.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Dualismus 4P)：精准分析浮士德双极人格——对市民学术体制的居高临下（Hybris）与面对终极宇宙时的谦卑绝望（Ohnmacht）。",
          "踩分点 2 (Zwei-Seelen 4P)：联系后文第 1112 行「两道灵魂（Zwei Seelen）」母题，阐明肉身有限性与精神无限性不可调和的矛盾。",
          "踩分点 3 (Tragik 4P)：揭示该性格结构对整部悲剧的推动作用——注定无法在世俗秩序中获得安宁，必然走向打破道德禁忌的激进冒险。",
          "扣分警示 (Abzug -2P)：若简单归咎于性格缺陷或病理失常，未理解其代表现代性人类存在困境的崇高性，扣除人物形象评价层级分值。",
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
          "浮士德在诗行 V. 1692–1699 中为魔鬼何时可以合法索取其灵魂设定了什么极其严密的先决条件？歌德在此如何将传统的民间卖魂契约（Pakt）颠覆为动态的意志之赌（Wette）？",
        options: [
          {
            id: "a",
            textDE:
              "Erst in dem Augenblick, in dem Faust sich in träger Selbstzufriedenheit verliert und zum Moment sagt: »Verweile doch! du bist so schön!«",
            textZH:
              "浮士德将判定权严格绑定于自身内在的精神求索状态：唯有当他丧失前进意志、在懒惰与世俗享乐中陷入彻底自满并对某个瞬间由衷赞叹说出‘停一停吧！你是多么的美丽！’时，魔鬼方可判其输掉赌局、夺取灵魂；只要他仍在永恒奋斗求索，魔鬼便无可奈何。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE: "Genau 24 Jahre nach der Unterzeichnung des Vertrages mit seinem Blut.",
            textZH: "浮士德与魔鬼约定了整整 24 年的固定法定期限，在此期间无论浮士德是否停步，魔鬼都必须无偿提供法力；24 年期满钟声敲响的一刻，魔鬼便可不论条件自动勾走其魂魄。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE: "Sobald Mephisto ihm Reichtum, Jugend und die Liebe Gretchens verschafft hat.",
            textZH: "浮士德规定魔鬼必须将他护送至神圣罗马帝国的皇宫加冕为全欧洲皇帝，若魔鬼无法在三年内夺取帝国皇冠，赌约便自动作废且魔鬼将反向成为浮士德的永久奴仆。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Faust transformiert den mittelalterlichen Pakt in eine moderne Dynamik-Wette: Nur geistiger Stillstand besiegelt die Niederlage.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 1692–1699 行是全剧的法律与哲学基石：\n„Werd ich zum Augenblicke sagen: / Verweile doch! du bist so schön! / Dann magst du mich in Fesseln schlagen, / Dann will ich gern zugrunde gehn!“\n1. 从契约到赌约的伟大跃迁：在 1587 年《浮士德民间故事书》（Faustbuch）中，浮士德签订的是卖身契（Pakt）——以 24 年固定期限换取魔术享乐。而歌德将之彻底升华为动态哲学豪赌（Wette）；\n2. 判决标准的内在化：赌局输赢的裁判权不在魔鬼手中，而在浮士德自身的精神能动性上。唯有浮士德「主动放弃对无限的追求，沉溺于当下的凡俗满足（Verweilen）」，他才算真正精神死亡；\n3. 浮士德的胜算自信：浮士德深知大自然与人性的无限渴求，认定尘世没有任何有限的享乐可以真正填饱自己的灵魂，因而立于不败之地。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（民间故事旧范式倒错）：24 年固定期限是 16 世纪马洛（Christopher Marlowe）与民间木偶戏的陈旧模式。若真有固定年限，浮士德后期的求索与救赎便毫无意义；\n• 选项 C 诊断（把文学巨著降级为权谋爽文）：浮士德在契约之初就鄙视世俗黄金与政治皇权，他要的是吞吐全宇宙的崇高体验，而非小朝廷的虚名。\n\n【🏛 时代思潮与哲学脉络】\n此处直接呼应了天上序曲（Prolog im Himmel）中上帝对浮士德的定性：„Es irrt der Mensch, solang er strebt“（人只要奋斗，就难免迷惘）。在歌德的魏玛古典主义伦理学中，最大的罪孽不是犯错，而是「停滞（Stillstand）」！",
        klausurSatzDE:
          "Indem Faust den traditionellen Teufelspakt in eine anthropologische Dynamik-Wette transformiert (V. 1692ff.), bindet er sein Seelenheil nicht an eine zeitliche Frist, sondern an die Unstillbarkeit seines transzendenten Strebens: Erst die Kapitulation vor dem Moment (»Verweile doch!«) besiegelt seinen Untergang.",
        klausurSatzZH:
          "通过将传统魔鬼契约改造为充满人类学动能的意志豪赌（第1692行起），浮士德将其灵魂救赎的裁判权不是绑定于固定时间期限，而是锚定于其超越性求索的永不满足：唯有向某一瞬间屈膝投降（‘停一停吧！’），才会宣告其彻底毁灭。",
        ehzKeyPointsDE: [
          "Identifikation der Kernaussage V. 1692–1693 als Bedingungssatz.",
          "Abgrenzung von traditionellen Teufelsbündnissen mit fester Jahresfrist.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Transformation 4P)：精准指出歌德对传统卖魂契约（Pakt）向现代动态赌约（Wette）的革命性改造。",
          "踩分点 2 (Kernbedingung 4P)：深入解析「Verweile doch! du bist so schön!」的象征意义——代表精神进取向动物性感官自满的堕落投降。",
          "踩分点 3 (Prolog-Bezug 4P)：紧扣天上序曲中上帝的判词，阐明人只要保持奋斗求索（Streben），即使历经沉沦亦具备免除罪责的崇高合法性。",
          "扣分警示 (Abzug -2P)：若混淆传统固定期限民间契约与现代意志之赌，扣除核心主旨分析分数。",
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
          "在这场立约中，浮士德与梅菲斯特各自抱持着怎样截然对立的心理预期？这场赌约为何在本质上是两种根本人性观的殊死决战？",
        options: [
          {
            id: "a",
            textDE:
              "Weil Faust seine Seele erst dann an Mephisto verliert, wenn er sich jemals in träger Selbstzufriedenheit und Genuss erschöpft ('Verweile doch!'), während Mephisto davon ausgeht, ihn mit Sinnesfreuden abzustumpfen.",
            textZH:
              "浮士德坚信人类灵魂深处的‘神圣求索冲动’永无止境，绝不可能被有限的肉欲享乐填饱；而梅菲斯特作为虚无犬儒主义者，认定人不过是披着理性外衣的动物，笃信只要用美色、权力与浅薄感官刺激便能使其意志瘫痪堕落。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Weil Mephisto von Faust verlangt, ihm monatliche Zinsen in Golddukaten zu zahlen.",
            textZH:
              "浮士德打算在契约生效的第一天便故意大喊‘停一停吧’，以此尽早前往地狱刺探冥界虚实并刺杀路西法；而梅菲斯特则深爱浮士德的高洁灵魂，企图用契约保护他不被尘世小人谋害。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Weil der Vertrag sofort erlischt, sobald Faust die heilige Messe in Köln besucht.",
            textZH:
              "两人在人性观上毫无分歧，都一致赞同康德的绝对命令（Kategorischer Imperativ），立约只是为了向魏玛公国法庭演示一份合法的标准跨国劳动聘用合同。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Antagonismus der Wette basiert auf zwei unvereinbaren Menschenbildern: Glaube an transzendente Dynamik vs. nihilistischer Materialismus.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n这场赌约是全剧戏剧冲突的总发动机，承载了西方文明核心人性观的对决：\n1. 浮士德的人性观（古典人文主义与神性肯定）：他鄙视魔鬼所能提供的一切世俗玩物（„Was willst du armer Teufel geben?“）。他自知灵魂是一口无底深渊，任何有限的食粮、黄金与美色都会在触碰的一瞬间化为索然无味，因此他坚信自己永远不可能说出 „Verweile doch!“；\n2. 梅菲斯特的人性观（机械唯物论与虚无主义嘲弄）：魔鬼在天上序曲中就把人类比作「长腿的蚱蜢（Heuschrecke）」，认定人所谓的理性不过是用来比野兽更兽性。在梅菲斯特看来，只要给浮士德喂饱了感官享乐（从莱比锡奥尔巴赫地下酒馆到格蕾琴的闺房），浮士德那点可怜的狂傲立刻就会烟消云散，老老实实当一具享乐的行尸走肉。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（奇幻降智解读）：将深刻的哲学意志之赌曲解为玄幻网络爽文中的卧底行刺，丧失了世界文学名著的基本思辨尊严；\n• 选项 C 诊断（康德伦理学乱入）：康德的绝对命令要求将人视为目的而非手段，而魔鬼梅菲斯特恰恰是要将人完全物化为欲望的奴隶，二者根本水火不容。\n\n【🏛 时代思潮与哲学脉络】\n这不仅是浮士德与魔鬼的对赌，更是启蒙主义理想（人类拥有自主超越的神圣火种）与现代消费主义/虚无主义（一切价值皆可被感官满足所消解）之间的永恒论辩。",
        klausurSatzDE:
          "Der Antagonismus der Wette begründet sich in zwei unversöhnlichen Anthropologien: Während Faust auf die transzendente Unersättlichkeit des humanen Geistes vertraut, kalkuliert Mephisto zynisch mit der Triebhaftigkeit des Menschen, den er durch materielle Verführung zur geistigen Selbstaufgabe verleiten will.",
        klausurSatzZH:
          "赌约的尖锐对抗植根于两种水火不容的人类学世界观：浮士德坚信人类精神具有不可填满的超越性饥渴，而梅菲斯特则冷酷算计着人性的动物本能，企图以物质诱惑诱使其走向精神的彻底自我缴械。",
        ehzKeyPointsDE: [
          "Differenzierung: Pakt (feste Frist gegen Seele) vs. Wette (Bedingung des Stillstands).",
          "Bedeutung von 'Verweile doch!': Metapher für geistige Trägheit und Genusssättigung.",
          "Verknüpfung mit dem 'Prolog im Himmel' ('Ein guter Mensch in seinem dunklen Drange...').",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Fausts Position 4P)：深刻阐述浮士德对人类精神永恒求索（Faustisches Streben）的自傲信任，指出其蔑视有限物质享乐的泰坦气度。",
          "踩分点 2 (Mephistos Zynismus 4P)：剖析梅菲斯特的唯物本能论与虚无主义——认定任何崇高理想终将被动物性欲望腐蚀驯服。",
          "踩分点 3 (Philosophischer Diskurs 4P)：联系魏玛古典主义对人性完整性（Humanitätsideal）的肯定，揭示对赌背后的人性论决战实质。",
          "扣分警示 (Abzug -2P)：若未能提炼出两种根本对立的人性观与哲学假设，仅流于具体享乐描写的复述，降等给分。",
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
          "当浮士德已然庄严给出口头男儿誓言后，梅菲斯特却在第 1708 行斤斤计较地坚持要求‘赐下几行字据’（ein paar Zeilen ausbitten）。这一戏剧细节具有怎样深刻的因果转折与讽刺批判职能？",
        options: [
          {
            id: "a",
            textDE:
              "Es entlarvt Mephistos juristisch-bürokratische Natur als zynischer Kleinbürger, der dem lebendigen Geist misstraut und das überlegene Genie Faust an ein formelles, mittelalterliches Blutsiegel ketten will.",
            textZH:
              "它以极具戏剧性的讽刺笔法无情剥去了魔鬼所谓的超自然威严，暴露其本质上是一个死扣中世纪形式主义字据的庸俗市民官僚；同时点燃了浮士德对‘写定死字据’的狂怒，促使其进一步喊出‘男儿誓言’的高贵自主性。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Mephisto benötigt die Unterschrift lediglich, um Fausts Erbe gerichtlich einzufordern.",
            textZH:
              "它表明魔鬼在司法程序上极为严谨合法，准备将该手谕呈递至德国联邦宪法法院进行公证，以确保双方在民法典框架下的债权债务关系受到普鲁士警察力量的严格保护。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Es soll beweisen, dass Faust des Lesens und Schreibens mächtig ist.",
            textZH:
              "梅菲斯特之所以坚持要写字据，是因为他年迈体衰、患有严重的阿尔茨海默健忘症，若没有白纸黑字提醒，第二天醒来就会忘记浮士德的名字与住址。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Kontrast zwischen lebendigem Ehrenwort und toter Schriftlichkeit entlarvt Mephistos bürokratische Entfremdung.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 1708–1710 行是全场最具戏剧反讽力量的火花碰撞：\n„MEPHISTO: Nur eins! – Um Lebens oder Sterbens willen / Bitt ich mir ein paar Zeilen aus. / FAUST: Auch was Geschriebnes forderst du, Pedant? / Hast du noch keinen Mann, kein Mannes-Wort gekannt?“\n1. 魔鬼的市民化与官僚化：号称无所不能的地狱化身，在面对真正的誓约时，居然露出了小市民公证员般的可笑嘴脸。歌德在此尖锐解构了封建法权与经院官僚对白纸黑字（toter Buchstabe）的病态迷信；\n2. 生机意志 vs 死板教条：浮士德信奉的是狂飙突进时期推崇的「生动男儿一诺（lebendiges Mannes-Wort）」，是主体人格的至高无上；而梅菲斯特笃信的则是字据契约（mittelalterliche Schriftlichkeit），认定人本质上势必反悔赖账；\n3. 戏剧推进动力：正是梅菲斯特这一冬烘小人般的索求，激怒了浮士德，促使浮士德在后续诗行中用血签下名字（„Blut ist ein ganz besondrer Saft“），不仅未损其豪气，反而将契约推向了极度悲壮的血色仪式。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（普鲁士现代宪法倒错）：将神圣悲剧与讽刺戏谑，错误关联到 19–20 世纪的现代宪法法院与民法典，完全脱离了神圣罗马帝国晚期的市民法学背景；\n• 选项 C 诊断（低级生理恶搞）：将歌德精心编织的「制度异化与官僚主义批判」降维为无厘头的记忆力衰退段子，背离了高中德语考纲对文本讽刺（Ironie）与人物刻画的鉴赏要求。\n\n【🏛 时代思潮与哲学脉络】\n歌德身兼魏玛公国枢密顾问官与法学博士，深谙欧洲官僚法制对人性的物化剥夺。在此处，他借魔鬼之口狠狠讽刺了市民社会将一切人际信用契约化、票据化、非人格化的虚伪本质。",
        klausurSatzDE:
          "Mephistos pedantische Forderung nach schriftlicher Fixierung des Paktes (V. 1708) entlarvt den Verfehrer als zynischen Repräsentanten einer erstarrten Kontrakt-Bürokratie, die Fausts idealistischer Berufung auf das unantastbare »Mannes-Wort« mit bürokratischem Misstrauen begegnet.",
        klausurSatzZH:
          "梅菲斯特对契约书面字据的学究式死抠（第1708行），无情拆穿了诱惑者作为僵化合同官僚主义化身的犬儒嘴脸，使其对浮士德基于神圣不可侵犯的‘男儿誓言’所作出的理想主义宣告，报以满腹狐疑的官僚式不信任。",
        ehzKeyPointsDE: [
          "Dramaturgische Funktion des Übergangs vom mündlichen Gelöbnis zum Blutkontrakt.",
          "Charakterisierung Mephistos als pedantischer Repräsentant toter Buchstabenregeln.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Charakterisierung 4P)：精准指出梅菲斯特作为死板教条冬烘学究（Pedant）的市民官僚特征，剖析其超自然威严的去神圣化反讽。",
          "踩分点 2 (Antithese 4P)：深入对比浮士德自主性人格「男儿诺言（Mannes-Wort）」与魔鬼「书面字据（geschriebnes Wort）」之间的哲学理念鸿沟。",
          "踩分点 3 (Dramaturgie 4P)：阐述该细节如何激化冲突，引出后续标志性的「鲜血立约（Blutvertrag）」戏剧高潮。",
          "扣分警示 (Abzug -2P)：若仅理解为正常的商业办事手续，未能体会歌德对官僚制度主义的讽刺意图者，扣除相应鉴赏分数。",
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
          "浮士德在第 1703 行怒斥的「奴隶 (Knecht)」与第 1709 行嘲讽的「冬烘学究 (Pedant)」两个核心词汇，在全剧的语用学与存在主义哲学体系中承载了怎样的对立张力？",
        options: [
          {
            id: "a",
            textDE:
              "»Pedant« geißelt Mephistos kleinkariertes Pochen auf tote Formalien; »Knecht« bringt Fausts Überzeugung zum Ausdruck, dass jeglicher Stillstand des Geistes bereits die ultimative Sklaverei bedeutet – gleichgültig unter welchem Herrn.",
            textZH:
              "‘Pedant’直击那些丧失生命活力、死抱僵死教条字据不放的狭隘市侩；‘Knecht’则宣告了浮士德的存在主义铁律：只要主体的精神求索陷入停滞，便已然自甘堕落为最可耻的奴隶——在此种行尸走肉状态下，究竟当谁的奴仆（即便是当魔鬼的奴仆）都已经毫无差别。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "»Pedant« war damals der offizielle akademische Titel für juristische Notare in Weimar.",
            textZH:
              "‘Pedant’指代那些在古希腊雅典学院教授修辞学的尊敬学者；‘Knecht’则严格指代当时波罗的海沿岸受到容克地主残酷剥削的农业农奴，表达了浮士德对废除农奴制的无产阶级同情。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "»Knecht« bezieht sich wörtlich auf Fausts Wunsch, Landwirt in der Magdeburger Börde zu werden.",
            textZH:
              "这两个词只是浮士德在酒后语无伦次脱口而出的市井脏话，在考纲文学分析中被视为无实际语义功能的填充词（Füllwörter），无需进行哲学解读。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Knechtschaft ist bei Goethe ein ontologischer Zustand der Passivität; Pedanterie die Kapitulation vor toten Buchstaben.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n歌德在精炼的对白中使用了两个极具哲学张力的关键词汇：\n1. „Knecht“（奴隶，第 1703 行）：\n   „Wie ich beharre, bin ich Knecht, / Ob dein, was frag ich, oder wessen.“\n   这是浮士德最石破天惊的存在主义自白！浮士德指出：人之所以为尊贵的主体，唯在其永不停息的求索动能（Streben）。一旦停滞僵死（Beharren），主体的灵魂便已然丧失自由与尊严，彻底沦为虚无的奴隶。既然已经是精神奴隶，那么在形式上归魔鬼奴役还是归别人奴役，根本就无足轻重了；\n2. „Pedant“（冬烘学究，第 1709 行）：\n   来自意大利语 pedante，18 世纪专指那些在大学与行政机构中死抱繁文缛节、缺乏精神开创力的小人。浮士德用此词嘲弄梅菲斯特，暴露出魔鬼试图用有限的死文字捆绑无限的生命意志，展现了主体对教条主义的绝顶轻蔑。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（农奴制阶级分析穿凿附会）：把存在主义的精神奴役隐喻（ontologischer Knechtschaftszustand）硬套成 19 世纪东普鲁士废除农奴制的土地政治议题，属于典型的过度解读与时代倒错；\n• 选项 C 诊断（虚无解构放弃鉴赏）：歌德字字珠玑，在代表作核心立约场景中绝不可能存在无意义的粗俗填充词。放弃解读反映了文学文本细读能力的缺失。\n\n【🏛 时代思潮与哲学脉络】\n康德在《什么是启蒙？》中呼吁人摆脱「自我招致的蒙昧与不成熟」，而歌德借「Knecht」将这一哲学命题推至终极：自由不是被赐予的特权，而是主体每时每刻在行动中夺取的生存状态。",
        klausurSatzDE:
          "Die semantische Antithese von autonomer Tat und servilem »Knecht« (V. 1703) fundiert Fausts existenzialistische Ethik: Geistiger Stillstand bedeutet ontologische Sklaverei, gegenüber der Mephistos bürokratischer Kleinmut als unbedeutende Pedanterie (V. 1709) verblasst.",
        klausurSatzZH:
          "自主行动与屈从‘奴隶’（第1703行）的语义尖锐对立，奠定了浮士德存在主义伦理学基石：精神停滞即意味着本体论意义上的自我奴役，相形之下，梅菲斯特死抠形式的官僚主义胆怯则彻底沦为微不足道的迂腐冬烘（第1709行）。",
        ehzKeyPointsDE: [
          "Semantische Analyse von 'Pedant' als Invektive gegen bürokratischen Kleinmut.",
          "Philosophische Interpretation von 'Knecht' als existentieller Stillstand.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Analyse 'Knecht' 4P)：精准阐发「Wie ich beharre, bin ich Knecht」的哲学内涵——停滞即是奴役（Stillstand = Sklaverei）。",
          "踩分点 2 (Analyse 'Pedant' 4P)：分析「Pedant」作为反讽嘲骂词的语用学价值，揭示其对僵死形式主义与契约拜物教的解构力。",
          "踩分点 3 (Existenzialistische Relevanz 4P)：提炼出歌德对人类主体能动性（Subjekt-Autonomie）的高扬与对被动依附状态的绝对拒斥。",
          "扣分警示 (Abzug -2P)：若将「Knecht」仅按字面理解为社会阶级雇工，未上升至精神存在状态分析者，扣除相应哲学分析分值。",
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
          "浮士德在第 1694–1698 行连续使用了四重排比首语重复（Anapher: „Dann...“），并最终导向‘时钟停摆、指针崩落’（„Die Uhr mag stehn, der Zeiger fallen“）的末日隐喻。这种修辞建构产生了怎样的戏剧性高潮张力？",
        options: [
          {
            id: "a",
            textDE:
              "Sie erzeugt eine unerbittliche Klimax kompromissloser Entschlossenheit: Die kaskadenartige Reihung potenziert Fausts Verachtung für ein bequemes Dasein und inszeniert den Stillstand als kosmisches Weltenende.",
            textZH:
              "连续四重‘Dann’的如惊雷贯耳，以排山倒海的势头强化了浮士德对自己永不妥协沉沦的绝对自负，构成了层层递进的戏剧誓言高潮；而时钟指针崩落的隐喻，则将个人意志的怠惰直接提升为宇宙时空毁灭的壮绝末日图景，展现出毁灭亦无悔的崇高意志。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Die Wiederholung von »Dann« dient lediglich als metrische Notlösung zur Wahrung des Knittelverses.",
            textZH:
              "首语重复‘Dann’纯粹是为了在音律上凑足四音步 Knittelvers 的音节缺额，时钟停摆则是因为书斋中的机械摆钟确实因为年久失修而发条断裂，提醒观众注意剧场道具的现实主义精巧。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Sie signalisiert Fausts wachsende Verwirrung und Resignation gegenüber Mephistos Zauberkräften.",
            textZH:
              "浮士德通过四次重复‘到那时’，暗示他在为自己寻找退路与法律豁免漏洞，时钟停落象征着他打算通过调慢发条来拖延向魔鬼交接灵魂的时间。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Die anaphorische Steigerung potenziert den Schwur; der Uhren-Zeiger-Fall stilisiert den Stillstand zum absoluten Weltenende.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 1694–1698 行是全剧修辞美学的巅峰华彩段落：\n„Dann magst du mich in Fesseln schlagen, / Dann will ich gern zugrunde gehn! / Dann mag die Totenglocke schallen, / Dann bist du deines Dienstes frei, / Die Uhr mag stehn, der Zeiger fallen, / Es sei die Zeit für mich vorbei!“\n1. 四重首语重复（Vierfache Anapher: Dann...）：\n   以极其严密的句法结构一气呵成。每一次重复都在加码毁灭的代价——从「被缚上枷锁（in Fesseln schlagen）」到「甘愿毁灭（zugrunde gehn）」，再到「丧钟鸣响（Totenglocke schallen）」，最终是「你的仆役之责解除（deines Dienstes frei）」。这种层层递进（Klimax）彰显了他视死如归的豪情，毫无犹疑畏缩；\n2. 宇宙级的时钟停摆隐喻（Metapher der zerbrochenen Uhr）：\n   „Die Uhr mag stehn, der Zeiger fallen“ 不仅是肉身生物学死亡的宣告，更是形而上学时间的终结。在歌德的世界里，浮士德的存在就是时间的标尺；浮士德一旦停滞，时间对人类便失去了意义，整个宇宙时钟即可轰然崩塌。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（道具实物化滑稽解构）：将震撼人心的宇宙终极时间隐喻，误读为书斋里真有一座机械钟坏了，完全丧失了文学抽象思维能力；\n• 选项 C 诊断（小人度君子式臆测）：浮士德用这一连串排比恰恰是为了断绝自己的一切退路，向魔鬼展示男子汉顶天立地的绝决气概，绝非在钻法律空子。\n\n【🏛 时代思潮与哲学脉络】\n康德论崇高（Das Erhabene）：当主体直面粉身碎骨的浩大威胁时，其内在道德意志却依然高高超越于一切物理毁灭之上。浮士德在此处展现的正是纯正的德国古典「崇高之美」。",
        klausurSatzDE:
          "Die anaphorische Kaskade (»Dann...«, V. 1694ff.) kulminiert in der kosmischen Metapher der zerbrechenden Uhr (V. 1698) und radikalisiert Fausts Pakt-Eingehung zu einem heroischen Akt der Selbstüberhöhung, in dem die eigene existentielle Dynamik mit dem Fortlauf der Weltzeit gleichgesetzt wird.",
        klausurSatzZH:
          "首语重复的瀑布式排比（‘到那时...’，第1694行起）在时钟崩落停摆的宏大宇宙隐喻中达到高潮（第1698行），将浮士德的订约行为激化为英雄主义的自我升华行动，在此行动中，其个人的存在动能直接与整个宇宙世界时间的运转画上了等号。",
        ehzKeyPointsDE: [
          "Funktionsbestimmung der Anapher (V. 1694–1697) als dramatische Steigerung.",
          "Deutung der Metapher 'Die Uhr mag stehn, der Zeiger fallen' als Zeitstillstand.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Rhetorische Klimax 4P)：精准剖析四重首语重复（Anapher: Dann...）如何步步递进，构建出视死如归的誓言高潮（Klimax）。",
          "踩分点 2 (Metaphorik der Zeit 4P)：深入阐发时钟停摆（Uhr stehn / Zeiger fallen）的象征意蕴——意志停滞即等于时空终结与形而上学死亡。",
          "踩分点 3 (Heroismus & Hybris 4P)：揭示浮士德在此处迸发的泰坦式英雄狂傲（Titanische Hybris）与其敢于对赌整个宇宙的崇高美学（Das Erhabene）。",
          "扣分警示 (Abzug -2P)：若仅将时钟指针视为普通时间工具，未能挖掘其作为生命与宇宙进程隐喻的深层意涵，扣除修辞深度分值。",
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
          "立约对话中浮士德诉诸‘男儿誓言’的神圣尊严，而梅菲斯特则死死咬定‘一纸血书字据’的条规约束。这一人物心理交锋如何生动折射了 18 世纪末德国狂飙突进‘天才观’与现代市民官僚‘犬儒理性’的剧烈历史冲撞？",
        options: [
          {
            id: "a",
            textDE:
              "Faust verkörpert das autonome Sturm-und-Drang-Genie, das allein dem lebendigen Ehrenwort vertraut; Mephisto hingegen repräsentiert den zynischen, bürgerlich-bürokratischen Geist, der den Menschen prinzipiell für korrupt und wortbrüchig hält.",
            textZH:
              "浮士德化身狂飙突进运动所推崇的‘自主性原初天才（Originalgenie）’，坚信人神之间以神圣的人格与自由意志为最高契约；而梅菲斯特则代表了现代资本主义官僚体制下异化的犬儒主义，在骨子里认定人性唯利是图、必定背信弃义，因而将一切生命关系还原为冰冷、物化的字据契约。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Faust zeigt sich als ängstlicher Schüler, während Mephisto als liebevoller väterlicher Mentor agiert.",
            textZH:
              "浮士德代表了中世纪封建贵族赖账不还的霸道特权，而梅菲斯特则是保护平民合法债权的无产阶级劳动法先驱，二人争辩的是封建债务豁免权与现代破产保护法的法理边界。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Beide Figuren vertreten exakt dieselbe philosophische Schule des scholastischen Kirchenrechts.",
            textZH:
              "这一对话表明浮士德对笔墨文字怀有严重的心理创伤恐惧症，而梅菲斯特作为受过正规师范教育的家庭教师，正在通过严格的拼写练习帮助浮士德克服书写障碍。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Im Antagonismus prallen das autonome Sturm-und-Drang-Genie und die materialistische Zweckrationalität aufeinander.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n全幕对话是全剧在思想史层面最具深度的人物交锋：\n1. 浮士德——狂飙突进的原初天才（Originalgenie）：\n   浮士德继承了卢梭（Rousseau）与赫尔德（Herder）的思想精髓，信奉内心的诚挚神圣性。在他看来，男儿立于天地之间，一诺千金（„Das Mannes-Wort“）；白纸黑字非但不能增添信任，反而是对人格尊严的极大侮辱；\n2. 梅菲斯特——现代性冰冷理性的化身（Zynischer Bürokrat）：\n   魔鬼深谙现代市民社会的阴暗面：契约制度的诞生本身就基于「对人性的根本不信任」。魔鬼嘲笑浮士德的狂妄浪漫主义，他深知在欲望与生存的逼迫下，人类的豪言壮语往往不堪一击，唯有物理留存的血书字据（Blutvertrag）才能作为在法庭上强制执行的合法凭证。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（封建特权与破产法生搬硬套）：把浮士德基于崇高人格信用的抗争，歪曲成贵族老赖逃废债务，把魔鬼美化成劳动法先驱，完全颠倒了作品的善恶美学价值取向；\n• 选项 C 诊断（书写障碍心理搞笑）：将伟大的时代世界观冲突降维为小学语文书写障碍矫正，属于对世界名著的荒诞解构。\n\n【🏛 时代思潮与哲学脉络】\n这一冲突是现代性进程中人类灵魂痛苦的缩影：浪漫主义/古典主义渴望人与人之间充满信任与灵性共鸣，但现代文明的科层制（Bürokratie）与法律理性（Rechtsrationalismus）却不可逆转地将一切神圣誓约物化为冰冷的合同条款。",
        klausurSatzDE:
          "Im Disput um das »Mannes-Wort« und die schriftliche Besiegelung kollidieren das idealistische Menschenbild des Sturm-und-Drang-Genies und der nihilistische Materialismus der modernen Zweckrationalität, wodurch Goethe die Entfremdung der zwischenmenschlichen Beziehungen im bürokratischen Zeitalter antizipiert.",
        klausurSatzZH:
          "在围绕‘男儿誓言’与书面字据印契的激烈争辩中，狂飙突进天才的理想主义人类观与现代工具理性的虚无主义唯物论展开了尖锐碰撞，歌德以此深刻预示了官僚时代人际关系的物化与异化。",
        ehzKeyPointsDE: [
          "Charakterisierung Fausts als Repräsentant des Geniekults (Autonomie, Ehrenwort).",
          "Charakterisierung Mephistos als skeptisch-bürokratischer Spötter.",
          "Bewertung der Szene für den Gesamtverlauf der Gelehrten- und Gretchentragödie.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Geniekult 4P)：深刻界定浮士德所代表的狂飙突进原初天才观（Originalgenie）——高扬生命本真性、人格自主与内在神圣一诺。",
          "踩分点 2 (Zweckrationalität 4P)：剖析梅菲斯特所象征的现代工具理性（Zweckrationalität）与资本官僚制——基于对人性的彻底不信任与契约物化。",
          "踩分点 3 (Epochendiagnose 4P)：联系卢梭对文明异化的批判，评价歌德在该段对话中所展现出的超前现代性批判视野。",
          "扣分警示 (Abzug -2P)：若未能指出两种时代思潮（浪漫/狂飙突进 vs 启蒙末期市民工具理性）的对抗本质，扣除时代语境综合分析分数。",
        ],
      },
    ],
  },
];

export function FaustReadingLab({ lang }: { lang: Lang }) {
  const de = lang === "de";

  // 当前激活的选段
  const [selectedExcerptId, setSelectedExcerptId] = useState<string>("nacht-monolog");
  // 当前激活选中的诗行号（用于左侧点亮与右侧详情联动）
  const [activeVerseNum, setActiveVerseNum] = useState<number>(354);

  // 诗句滚动容器引用与各诗句节点引用
  const verseListRef = useRef<HTMLDivElement | null>(null);
  const verseRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 诊断面板分段胶囊
  const [activeDiagTab, setActiveDiagTab] = useState<"anchor" | "distractors" | "context" | "muster" | "all">("anchor");

  // 用户的答题记录
  const [answers, setAnswers] = useState<Record<string, string>>({});
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

  // 解析长篇诊断文案为结构化区块
  const parseExplanationSections = (text: string) => {
    const anchorMatch = text.match(/【✅ 正解依据与文本锚点】([\s\S]*?)(?=【❌ 干扰项逐项诊断】|$)/);
    const distractorsMatch = text.match(/【❌ 干扰项逐项诊断】([\s\S]*?)(?=【🏛 时代思潮与哲学脉络】|$)/);
    const contextMatch = text.match(/【🏛 时代思潮与哲学脉络】([\s\S]*?)$/);

    return {
      anchor: anchorMatch ? anchorMatch[1].trim() : text,
      distractors: distractorsMatch ? distractorsMatch[1].trim() : "",
      context: contextMatch ? contextMatch[1].trim() : "",
      full: text,
    };
  };

  const diagSections = parseExplanationSections(currentQ.explanationZH);

  // 渲染诗句原著卷轴（去燥、纯色高亮标记、无边框、舒朗行间距）
  const renderVerseScroll = (heightClass: string = "h-[500px]") => (
    <div
      ref={verseListRef}
      className={`rounded-xl border border-[var(--line)]/70 bg-[var(--paper)] p-3.5 sm:p-4 shadow-xs font-serif ${heightClass} overflow-y-auto select-none scroll-smooth`}
    >
      {activeExcerpt.verses.map((verse) => {
        const isSelected = verse.lineNum === activeVerseNum;
        const hasStilmittel = !!verse.stilmittel;
        const hasVocab = !!verse.vocab;

        let highlightBg = "";
        if (isSelected) {
          highlightBg = "bg-amber-200/70 text-amber-950 font-medium";
        } else if (hasStilmittel) {
          highlightBg = "bg-amber-100/60 text-stone-900";
        } else if (hasVocab) {
          highlightBg = "bg-sky-100/60 text-stone-900";
        } else {
          highlightBg = "hover:bg-[var(--surface)] text-[var(--ink)]";
        }

        return (
          <div
            key={verse.lineNum}
            ref={(el) => {
              verseRefs.current[verse.lineNum] = el;
            }}
            onClick={() => setActiveVerseNum(verse.lineNum)}
            className={`group py-1.5 px-2.5 rounded transition-colors cursor-pointer flex items-baseline gap-2.5 text-[14px] sm:text-[15px] leading-[1.8] ${highlightBg}`}
          >
            {/* 行号 */}
            <span className="font-mono text-[11px] text-[var(--gray)]/60 w-8 shrink-0 text-right select-none">
              {verse.lineNum % 5 === 0 || isSelected ? verse.lineNum : ""}
            </span>

            {/* 德语原诗 + 纯色微标 (无边框方框) */}
            <div className="flex-1 min-w-0 flex items-baseline justify-between gap-2">
              <div className="min-w-0">
                <span className={`tracking-wide ${hasStilmittel ? "font-serif text-amber-950 font-medium" : "text-[var(--ink)]"}`}>
                  {verse.textDE}
                </span>
                <span className="ml-2.5 font-sans text-xs text-[var(--gray)] opacity-0 group-hover:opacity-100 transition-opacity">
                  // {verse.translationZH}
                </span>
              </div>

              {/* 纯色极简标示：无边框无方框 */}
              <div className="flex items-center gap-2 shrink-0 text-[10px] select-none">
                {hasStilmittel && (
                  <span
                    className="text-amber-800 font-mono text-[10px] font-medium tracking-tight"
                    title={verse.stilmittel?.type}
                  >
                    § {verse.stilmittel?.type.split("(")[0].replace("&", "+").trim()}
                  </span>
                )}
                {hasVocab && (
                  <span
                    className="text-sky-800 font-mono text-[10px] font-medium tracking-tight"
                    title={verse.vocab?.word}
                  >
                    📖 {verse.vocab?.word}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // 渲染显微镜解析抽屉（舒朗统一单卡，消除嵌套方框）
  const renderMicroscope = () => (
    activeVerse && (
      <div className="rounded-xl border border-[var(--line)]/70 bg-[var(--surface)] p-4 space-y-2.5 shadow-xs font-sans text-xs">
        <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-[var(--ink)]">
              Vers {activeVerse.lineNum} // {de ? "Detail-Analyse" : "逐行显微镜精析"}
            </span>
            {activeVerse.toneCategory && (
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
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
        <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]/50 space-y-1">
          <div className="font-mono text-[9px] text-[var(--gray)] uppercase tracking-wider">
            {de ? "Wortgetreue Übersetzung" : "直译与义理对照"}
          </div>
          <div className="font-serif text-[13px] text-[var(--ink)] leading-relaxed">
            {activeVerse.translationZH}
          </div>
        </div>

        {activeVerse.stilmittel && (
          <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-amber-950 space-y-0.5">
            <div className="font-mono text-[10px] uppercase font-bold text-amber-900">
              § {activeVerse.stilmittel.type}
            </div>
            <div className="text-xs leading-relaxed">
              {de ? activeVerse.stilmittel.descDE : activeVerse.stilmittel.descZH}
            </div>
          </div>
        )}

        {activeVerse.vocab && (
          <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/70 text-blue-950 space-y-0.5">
            <div className="font-mono text-[10px] font-bold text-blue-900">
              📖 Glossar: <span className="underline">{activeVerse.vocab.word}</span>
            </div>
            <div className="text-xs leading-relaxed">
              <strong>{activeVerse.vocab.meaningDE}</strong> — {activeVerse.vocab.meaningZH}
            </div>
          </div>
        )}
      </div>
    )
  );

  // 渲染试题设问与选项（开阔大卡片，舒展内边距与字体）
  const renderQuestionCard = (hideDiagnostics: boolean = false) => {
    const isAnswered = !!answers[currentQ.id];
    return (
      <div className="rounded-xl border border-[var(--line)]/70 bg-[var(--surface)] p-6 sm:p-7 shadow-xs space-y-5">
        {/* 题头 */}
        <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)]/60 pb-3">
          <span className="font-bold text-sm text-[var(--ink)]">
            第 {focusIndex + 1} 题：{currentQ.titleZH}
          </span>
          {isAnswered && (
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.8 rounded-md border border-emerald-300">
              ✓ 已作答
            </span>
          )}
        </div>

        {/* 设问正文 */}
        <p className="font-serif text-[15px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
          {currentQ.questionZH}
        </p>

        {/* 选项组 */}
        <div className="space-y-3 pt-1">
          {currentQ.options.map((opt) => {
            const selectedOptionId = answers[currentQ.id];
            const isThisSelected = selectedOptionId === opt.id;
            let btnStyle = "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--gray)] shadow-2xs";

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-medium ring-1 ring-emerald-500 shadow-2xs";
              } else if (isThisSelected && !opt.isCorrect) {
                btnStyle = "border-rose-400 bg-rose-50 text-rose-950 line-through";
              } else {
                btnStyle = "border-[var(--line)]/60 bg-[var(--paper-subtle)] opacity-40";
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isAnswered}
                onClick={() => setAnswers({ ...answers, [currentQ.id]: opt.id })}
                className={`w-full text-left p-3.5 sm:p-4 rounded-lg border text-xs sm:text-[13px] leading-relaxed transition cursor-pointer flex items-start gap-3.5 ${btnStyle}`}
              >
                <span className="h-6 w-6 rounded-md bg-[var(--paper-subtle)] border border-[var(--line)] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {opt.id.toUpperCase()}
                </span>
                <span className="flex-1">{opt.textZH}</span>
              </button>
            );
          })}
        </div>

        {/* 嵌入式诊断（在非分栏模式下展示） */}
        {!hideDiagnostics && isAnswered && renderDiagnosticTabs()}

        {/* 步进器 */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]/60">
          <button
            type="button"
            disabled={focusIndex === 0}
            onClick={() => setFocusIndex(focusIndex - 1)}
            className="px-4 py-2 rounded-lg border border-[var(--line)] text-xs font-mono cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--paper-subtle)] transition"
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
            className={`px-4 py-2 rounded-lg text-xs font-mono cursor-pointer transition ${
              answers[currentQ.id] && focusIndex < activeExcerpt.questions.length - 1
                ? "bg-[var(--ink)] text-white shadow-2xs font-bold hover:opacity-90"
                : "border border-[var(--line)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--paper-subtle)]"
            }`}
          >
            下一题 ▶
          </button>
        </div>
      </div>
    );
  };

  // 渲染诊断胶囊切换卡（舒展大气，段落分明）
  const renderDiagnosticTabs = () => {
    const isAnswered = !!answers[currentQ.id];
    if (!isAnswered) return null;
    const isCorr = currentQ.options.find((o) => o.id === answers[currentQ.id])?.isCorrect;

    return (
      <div className="mt-5 pt-5 border-t border-[var(--line)]/70 space-y-3.5 animate-fadeIn">
        {/* 正误提示 */}
        <div
          className={`text-xs font-mono font-bold flex items-center justify-between ${
            isCorr ? "text-emerald-800" : "text-rose-900"
          }`}
        >
          <span className="text-sm">{isCorr ? "✓ 解题命中 // 正确理解" : "✗ 需强化辨析 // 深入思考"}</span>
          <span className="text-[11px] text-[var(--gray)] font-normal">点击胶囊分段阅读深度分析</span>
        </div>

        {/* 诊断分段胶囊选择器 */}
        <div className="flex items-center gap-1.5 flex-wrap border-b border-[var(--line)]/40 pb-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveDiagTab("anchor")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "anchor"
                ? "bg-emerald-700 text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            🎯 正解依据与锚点
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("distractors")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "distractors"
                ? "bg-rose-700 text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            ⚠️ 干扰项深度诊断
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("context")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "context"
                ? "bg-purple-700 text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            🏛 时代思潮哲学
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("muster")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "muster"
                ? "bg-[var(--ink)] text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            ✍️ 高分句与EHZ
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("all")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "all"
                ? "bg-amber-800 text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            📑 全景展开
          </button>
        </div>

        {/* 动态分段内容 */}
        <div className="text-[13px] sm:text-[14px] leading-[1.8] text-[var(--ink)] font-sans p-4 sm:p-5 rounded-xl bg-[var(--paper-subtle)] border border-[var(--line)]/60 shadow-2xs">
          {activeDiagTab === "anchor" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-[11px] font-bold text-emerald-800">
                【✅ 正解依据与文本锚点】
              </div>
              <div>{diagSections.anchor}</div>
            </div>
          )}

          {activeDiagTab === "distractors" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-[11px] font-bold text-rose-800">
                【❌ 干扰项逐项诊断】
              </div>
              <div>{diagSections.distractors || "针对错误审题与概念混淆的深度辨析。"}</div>
            </div>
          )}

          {activeDiagTab === "context" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-[11px] font-bold text-purple-800">
                【🏛 时代思潮与哲学脉络】
              </div>
              <div>{diagSections.context || "启蒙时代、狂飙突进与近代知识体系演进。"}</div>
            </div>
          )}

          {activeDiagTab === "all" && (
            <div className="space-y-2.5 whitespace-pre-line">
              {currentQ.explanationZH}
            </div>
          )}

          {activeDiagTab === "muster" && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--gray)]">
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
                <div className="font-serif italic text-[13px] sm:text-[14px] text-[var(--ink)] leading-relaxed pl-3 border-l-2 border-amber-500/70">
                  „{currentQ.klausurSatzDE}“
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs space-y-1.5">
                <div className="font-mono text-[11px] text-[var(--gray)] font-bold">
                  📋 官方评分期望标准 (EHZ 要点):
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[var(--gray)] font-sans text-xs sm:text-[13px] leading-relaxed">
                  {currentQ.ehzKeyPointsZH.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <span className="text-[var(--ink)]">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 常驻迷你高分句快捷栏 (在非 muster tab 时展现单行) */}
        {activeDiagTab !== "muster" && (
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] text-xs font-mono">
            <span className="text-[11px] text-[var(--gray)] truncate max-w-[80%]">
              § 考场标准句: „{currentQ.klausurSatzDE.slice(0, 55)}...“
            </span>
            <button
              type="button"
              onClick={() => setActiveDiagTab("muster")}
              className="text-[11px] text-[var(--ink)] font-bold underline cursor-pointer"
            >
              展开完整句式 ▶
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-sans text-[var(--ink)] space-y-4">
      {/* 极简顶栏：歌德《浮士德 I》+ 选段切换 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2.5">
          <span className="font-serif font-bold text-lg text-[var(--ink)]">
            Johann Wolfgang von Goethe: <span className="italic">Faust I</span>
          </span>
          <span className="text-[10px] font-mono text-[var(--gray)] bg-[var(--paper-subtle)] px-2 py-0.5 rounded border border-[var(--line)]">
            EF/Q1
          </span>
          <span className="text-xs text-[var(--gray)] font-serif italic hidden sm:inline">
            {de ? activeExcerpt.sceneTitleDE.split("//")[0] : activeExcerpt.sceneTitleZH}
          </span>
        </div>

        {/* 选段切换 */}
        <div className="inline-flex rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-0.5 text-xs font-mono self-start sm:self-auto shadow-2xs">
          {EXCERPTS.map((ex) => {
            const isCurrent = selectedExcerptId === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleSelectExcerpt(ex.id)}
                className={`px-3.5 py-1.5 rounded-md transition cursor-pointer font-medium ${
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

      {/* 宽幅呼吸双栏典雅版面 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
        {/* 左栏 (5列): 诗剧原著正文 + 显微镜 */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)]/60 pb-1.5">
            <span className="font-bold text-[var(--ink)]">
              {de ? "Originaltext (Goethe)" : "原著德语诗剧正文"}
            </span>
            <span className="text-[10px] text-[var(--gray)]">
              {de ? "Klick auf Zeile zum Analysieren" : "点击诗行即可深入释义"}
            </span>
          </div>
          {renderVerseScroll("h-[500px]")}
          {renderMicroscope()}
        </div>

        {/* 右栏 (7列): 逐题深入 + 诊断分段胶囊 */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-sm text-[var(--ink)]">
                📖 {de ? "Leseverständnis · Schritt für Schritt" : "阅读理解 · 逐题深入"}
              </span>
              <span className="text-xs font-mono text-[var(--gray)]">
                (第 {focusIndex + 1} 题 / 共 {activeExcerpt.questions.length} 题)
              </span>
            </div>
            {/* 进度圆点 */}
            <div className="flex items-center gap-2 font-mono text-xs">
              {activeExcerpt.questions.map((q, idx) => {
                const isCurrent = focusIndex === idx;
                const ans = answers[q.id];
                const isCorr = q.options.find((o) => o.id === ans)?.isCorrect;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setFocusIndex(idx)}
                    className={`h-6 w-6 rounded-full text-[11px] flex items-center justify-center font-bold cursor-pointer transition ${
                      isCurrent
                        ? "bg-[var(--ink)] text-white shadow-xs scale-110"
                        : ans
                        ? isCorr
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                        : "bg-[var(--paper-subtle)] text-[var(--gray)] border border-[var(--line)] hover:border-[var(--gray)]"
                    }`}
                  >
                    {ans ? (isCorr ? "✓" : "✗") : idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
          {renderQuestionCard(false)}
        </div>
      </div>
    </div>
  );
}

