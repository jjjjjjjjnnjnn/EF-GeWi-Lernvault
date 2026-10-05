// readingLabRegistry.ts — 文科学术原典精读与六维会考解剖工坊核心数据中心
// 专为北威州高中会考（Gymnasiale Oberstufe: EF / Q1 Klausur Aufgabentyp 1A / Textanalyse）设计
// 涵盖：德语文学 (Deutsch) · 哲学原典 (Philosophie) · 社会科学 (SoWi) · 英语文学与演讲 (Englisch)

export interface VerseOrLineItem {
  lineNum: number;
  textDE: string;
  translationZH: string;
  speaker?: string;
  metrumMarkup?: string;
  reimschema?: string;
  kadenz?: "männlich" | "weiblich";
  commentDE?: string;
  commentZH?: string;
  stilmittel?: { type: string; descDE: string; descZH: string };
  vocab?: { word: string; meaningDE: string; meaningZH: string };
  toneCategory?: "krise" | "spott" | "streben" | "autoritaet" | "moral" | "existenz" | "sehnsucht" | "leidenschaft";
}

export interface DimensionQuestion {
  id: string;
  dimension: "inhalt" | "motiv" | "handlung" | "wortschatz" | "stilmittel" | "figuren" | "argumentation" | "theorie";
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

export interface GeWiTextExcerpt {
  id: string;
  fach: "Deutsch" | "Philosophie" | "SoWi" | "Englisch";
  genre?: "Drama" | "Lyrik" | "Epik" | "Sachtext";
  meterOverviewDE?: string;
  meterOverviewZH?: string;
  dramaticConflictDE?: string;
  dramaticConflictZH?: string;
  author: string;
  workTitleDE: string;
  workTitleZH: string;
  sceneTitleDE: string;
  sceneTitleZH: string;
  versesRange: string;
  epochDE: string;
  epochZH: string;
  contextDE: string;
  contextZH: string;
  verses: VerseOrLineItem[];
  questions: DimensionQuestion[];
}

export const GEWI_TEXT_REGISTRY: GeWiTextExcerpt[] = [
  // =========================================================================
  // 1. DEUTSCH: Johann Wolfgang von Goethe — Faust I (黑夜学者独白)
  // =========================================================================
  {
    id: "faust-monolog",
    fach: "Deutsch",
    author: "Johann Wolfgang von Goethe",
    workTitleDE: "Faust. Der Tragödie erster Teil",
    workTitleZH: "《浮士德》悲剧第一部",
    sceneTitleDE: "Szene: Nacht // Der Gelehrtenmonolog",
    sceneTitleZH: "第一幕：黑夜 · 哥特书斋学者独白 (学者危机与认识论绝望)",
    versesRange: "Vers 354–385",
    epochDE: "Sturm und Drang / Weimarer Klassik",
    epochZH: "狂飙突进运动 / 魏玛古典主义",
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
        commentDE: "Epistemologische Skepsis: Sokrates' Diktum 'Ich weiß, dass ich nichts weiß'.",
        commentZH: "苏格拉底‘自知无知’命题在浮士德身上演化为痛苦绝望的否定。",
      },
      {
        lineNum: 360,
        textDE: "Heiße Magister, heiße Doktor gar,",
        translationZH: "枉称硕士，甚至枉称博士，",
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
          type: "Alliteration & Antithese (声韵与回旋)",
          descDE: "Spiegelt die orientierungslose Bewegung schulmeisterlicher Dogmen wider.",
          descZH: "‘Herauf, herab...’形象刻画出大学讲坛脱离实际的空转与兜圈子。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 363,
        textDE: "Meine Schüler an der Nase herum –",
        translationZH: "把我的弟子们牵着鼻子兜圈子——",
        vocab: {
          word: "an der Nase herumziehen",
          meaningDE: "Täuschen, zum Narren halten.",
          meaningZH: "牵着鼻子走、愚弄。",
        },
      },
      {
        lineNum: 364,
        textDE: "Und sehe, daß wir nichts wissen können!",
        translationZH: "这才看透，我们根本什么都不能知道！",
        stilmittel: {
          type: "Hyperbel & Epistemische Resignation (绝望极言)",
          descDE: "Radikale Absage an die Rationalität der europäischen Aufklärung.",
          descZH: "对启蒙运动以来欧洲理性主义认识论的毁灭性全盘否定。",
        },
        toneCategory: "krise",
      },
      {
        lineNum: 365,
        textDE: "Das will mir schier das Herz verbrennen.",
        translationZH: "这真叫我心如刀绞，几乎要把五脏六腑烧焦。",
      },
      {
        lineNum: 382,
        textDE: "Daß ich erkenne, was die Welt",
        translationZH: "好让我终于认清，究竟是什么在最深处",
        toneCategory: "streben",
      },
      {
        lineNum: 383,
        textDE: "Im Innersten zusammenhält,",
        translationZH: "将整个宇宙万物紧紧维系在一起，",
        stilmittel: {
          type: "Metapher des Faustischen Strebens (浮士德式精神隐喻)",
          descDE: "Der absolute Erkenntnisdrang nach dem Wesen des Kosmos und der Natur.",
          descZH: "全剧灵魂诗句：对自然本质、生命源泉与终极造化法则的绝对求索冲动。",
        },
        toneCategory: "streben",
      },
      {
        lineNum: 384,
        textDE: "Schau alle Wirkenskraft und Samen,",
        translationZH: "去洞察一切化育万物的生机原力与创世种子，",
        vocab: {
          word: "Samen",
          meaningDE: "Urkräfte der Zeugung und Schöpfung (pantheistische Naturbetrachtung).",
          meaningZH: "创生本源与生命胚芽（泛神论自然观）。",
        },
      },
      {
        lineNum: 385,
        textDE: "Und tu nicht mehr in Worten kramen.",
        translationZH: "从此再也不用在故纸堆的空洞死字眼间翻检讨生活！",
        stilmittel: {
          type: "Metaphorische Invektive (对经院字句的唾弃)",
          descDE: "Abwertung toter Buchgelehrsamkeit zugunsten lebendiger Lebensanschauung.",
          descZH: "‘Worten kramen’以生动的贬损隐喻，宣告与死板教条书本知识的决裂。",
        },
        toneCategory: "spott",
      },
    ],
    questions: [
      {
        id: "q-monolog-1",
        dimension: "inhalt",
        titleDE: "1. Inhalt & Textverstaendnis",
        titleZH: "学者认识论危机的根源",
        afb: "AFB I",
        questionDE:
          "Welche fundamentale Erkenntniskrise formuliert Faust in den einleitenden Versen 354–364?",
        questionZH:
          "浮士德在开篇第 354–364 行中表达的核心困境究竟是什么？这一危机为何指向欧洲启蒙理性的极限？",
        options: [
          {
            id: "a",
            textDE:
              "Er erkennt, dass das rein rationale und universitäre Buchwissen nicht zur wahren Wesenserkenntnis der Welt führt.",
            textZH:
              "他发现穷尽大学四大经典的经院式死书本知识，根本无法触及宇宙本源与生命的终极真理，理性的自大与现实的无知形成剧烈反差。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er klagt lediglich über zu geringe Bezahlung an der Universität und will mehr Gold.",
            textZH:
              "他仅仅是因为大学发放的教授薪金过于微薄而发牢骚，企图通过学习魔法来炼金发财以偿还房租债务。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er hat keine Bücher zur Verfügung und beklagt den Mangel an Universitätsbibliotheken.",
            textZH:
              "他抱怨当时魏玛大学的图书馆没有足够的馆藏图书供他借阅，因此无法完成其法学与医学学位论文。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Fausts Krise ist keine materielle, sondern eine fundamentale Sinn- und Erkenntniskrise der Moderne.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 354–359 行直接宣告了经院理性的破产：\n„Habe nun, ach! Philosophie... durchaus studiert... Da steh ich nun, ich armer Tor! Und bin so klug als wie zuvor;“\n1. 四大学科穷尽后的虚无：哲学、法学、医学乃至最高的神学，均无法回答生命的终极意义；\n2. 经院头衔的异化：所谓硕士、博士只是名分标签，在真正的造化真理面前完全苍白无力；\n3. 认识论悲剧：从‘自知其无知’（V. 364: daß wir nichts wissen können）到主体存在的窒息感。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（庸俗化解构）：浮士德在后续诗行明确表明不求黄金财富（„Weder Geld noch Gut“），将崇高存在主义痛苦歪曲为金钱计较是严重审题失误；\n• 选项 C 诊断（事实性倒错）：书斋四壁皆是发黄故纸书籍（V. 385: tu nicht mehr in Worten kramen），他的痛苦恰恰源于书太多而非书不够。\n\n【🏛 时代思潮与哲学脉络】\n此处标志着从启蒙时代对「理性万能」的崇拜，转向狂飙突进运动（Sturm und Drang）对「生命本真体验」与「自然整体感」的热烈呼唤。",
        klausurSatzDE:
          "Goethe inszeniert Fausts Eingangsmonolog als radikale Abrechnung mit der scholastischen Wissenschaftstradition: Das rationale Wissensstreben scheitert an der Unerkennbarkeit des transzendenten Weltzusammenhangs.",
        klausurSatzZH:
          "歌德将浮士德的开篇独白戏剧化为对经院学术传统的决绝清算：纯粹理性的求知狂热在面对不可知晓的超验宇宙有机联系时遭遇彻底失败。",
        ehzKeyPointsDE: [
          "Identifikation der vier klassischen Fakultäten (V. 354-356).",
          "Darstellung der Diskrepanz zwischen Gelehrsamkeit und existenzieller Weisheit.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Textnachweis 4P)：精准指出四大学科（哲法医神）及感叹词 'ach!' 的文本功能。",
          "踩分点 2 (Erkenntniskrise 4P)：深刻提炼出理性书本知识与生命本体真理之间的断裂鸿沟。",
          "踩分点 3 (Epoche 4P)：准确定位狂飙突进反抗经院教条、追求本真直觉的时代哲学背景。",
        ],
      },
      {
        id: "q-monolog-2",
        dimension: "motiv",
        titleDE: "2. Hauptmotiv: Faustisches Streben",
        titleZH: "浮士德精神的核心诉求",
        afb: "AFB II",
        questionDE:
          "Wie manifestiert sich das 'Faustische Streben' in Vers 382–383 („Dass ich erkenne, was die Welt / Im Innersten zusammenhält“)?",
        questionZH:
          "在独白核心诗行第 382–383 行中，浮士德所宣示的探索诉求如何体现了「狂飙突进」与「浮士德精神」的崇高本质？",
        options: [
          {
            id: "a",
            textDE:
              "Als pantheistischer Drang nach lebendiger Schau der kosmischen Urkräfte ('Wirkenskraft und Samen') jenseits toter Buchstabengelehrsamkeit.",
            textZH:
              "他所追求的绝非冰冷孤立的经验事实碎片，而是渴望与宇宙生生不息的活态有机造化源初力量（alle Wirkenskraft und Samen）实现神性合一与直观体悟。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Als Versuch, scholastische Definitionen über päpstliche Bullen zu perfektionieren.",
            textZH:
              "他试图恢复托马斯·阿奎那的经院哲学权威，证明上帝在创世时赋予神圣罗马帝国的君权神授法律基础具有不可动摇的永恒性。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Als Plan, eine mechanische Dampfmaschine zur industriellen Nutzung zu konstruieren.",
            textZH:
              "他希望借助莱布尼茨的单子论公式，将大自然的一切生物运动精确计算为无摩擦的机械齿轮运动，从而制造出永动机。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Das Faustische Streben überwindet den Rationalismus zugunsten pantheistischer Ganzheitserkenntnis.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 382–385 行是全书乃至歌德自然哲学的最高纲领：\n„Daß ich erkenne, was die Welt / Im Innersten zusammenhält, / Schau alle Wirkenskraft und Samen, / Und tu nicht mehr in Worten kramen.“\n1. 泛神论（Pantheismus）自然观：受斯宾诺莎（Spinoza）影响，歌德视大自然为生机勃勃的神圣整体；\n2. 拒绝死字句（Worten kramen）：科学不应是纸面逻辑的自我繁殖，而应是对原初力量（Urkräfte）的真切感知；\n3. 泰坦式精神（Titanismus）：人类主体以有限身躯，悍然向无限神性宇宙发起冲锋。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（经院神学倒错）：浮士德在第 356 行已将神学视为最大的失望，绝不可能走回头路去论证教皇通谕；\n• 选项 C 诊断（机械论错位）：牛顿与笛卡尔式的机械钟表宇宙观恰恰是歌德终其一生猛烈批判的对象，浮士德要的是活的有机体（Organismus）而非发条齿轮。\n\n【🏛 时代思潮与哲学脉络】\n魏玛古典主义与早期浪漫主义共同的人文主义理想：人必须在理智与感性之间建立完整和谐，拒斥将世界客体化为无生命的材料。",
        klausurSatzDE:
          "Das Faustische Streben artikuliert sich als metaphysischer Pantheismus: Ziel der Erkenntnis ist nicht die analytische Sezierung von Phänomenen, sondern das schöpferische Einswerden mit den dynamischen Urkräften des Kosmos.",
        klausurSatzZH:
          "浮士德式求索被表述为一种形而上学的泛神论：其认识的终极目的绝非对经验现象的机械解剖，而是与宇宙生生不息的动态生发原力达成创造性的神性合一。",
        ehzKeyPointsDE: [
          "Interpretation von 'Wirkenskraft und Samen' als pantheistische Kosmologie.",
          "Abgrenzung des dynamischen Strebens von statischer Schulphilosophie.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Schluesselzitat 4P)：精准引用第 382–383 诗行，阐发 'Im Innersten zusammenhält' 的本体论意蕴。",
          "踩分点 2 (Pantheismus 4P)：结合斯宾诺莎泛神论，指出 'Wirkenskraft und Samen' 象征的大自然创造原能。",
          "踩分点 3 (Titanismus 4P)：剖析浮士德精神对人类主体无限超越能动性的高扬。",
        ],
      },
    ],
  },

  // =========================================================================
  // 2. DEUTSCH: Johann Wolfgang von Goethe — Faust I (书斋立约豪赌)
  // =========================================================================
  {
    id: "faust-pakt",
    fach: "Deutsch",
    author: "Johann Wolfgang von Goethe",
    workTitleDE: "Faust. Der Tragödie erster Teil",
    workTitleZH: "《浮士德》悲剧第一部",
    sceneTitleDE: "Szene: Studierzimmer // Der Teufelspakt und die Wette",
    sceneTitleZH: "第二幕：书斋 · 赌约成立 (停滞即毁灭的现代性意志豪赌)",
    versesRange: "Vers 1692–1711",
    epochDE: "Weimarer Klassik",
    epochZH: "魏玛古典主义",
    contextDE:
      "Nach langen Verhandlungen schließt Faust mit Mephistopheles ein folgenschweres Bündnis. Doch anstelle des mittelalterlichen Teufelspakts auf Zeit formuliert Faust die Abmachung als existenzielle Wette.",
    contextZH:
      "历经激烈的言辞交锋，浮士德与魔鬼梅菲斯特达成盟约。歌德彻底抛弃了中世纪卖魂求荣的定期契约模式，由浮士德主动将其升级为向瞬间投降即算输的现代存在主义豪赌。",
    verses: [
      {
        lineNum: 1692,
        textDE: "Werd ich zum Augenblicke sagen:",
        translationZH: "倘若我有一朝向某一瞬间说道：",
        toneCategory: "streben",
      },
      {
        lineNum: 1693,
        textDE: "Verweile doch! du bist so schön!",
        translationZH: "‘停一停吧！你是多么美丽！’",
        stilmittel: {
          type: "Exclamatio & Kernaussage der Wette (核心赌约命题)",
          descDE: "Die berühmteste Bedingungszeile der Weltliteratur: Chiffre für geistigen Stillstand.",
          descZH: "世界文学最著名的假设悬赏：象征进取意志向凡俗满足的妥协投降。",
        },
        toneCategory: "streben",
      },
      {
        lineNum: 1694,
        textDE: "Dann magst du mich in Fesseln schlagen,",
        translationZH: "到那时，你尽可以把铁枷加在我的身上，",
        stilmittel: {
          type: "Anapher (Dann...) & Klimax (首语排比与渐强)",
          descDE: "Die viermalige Wiederholung von 'Dann' treibt den Schwur zur absoluten Radikalität.",
          descZH: "连续四重‘Dann’以排山倒海之势构建起不可逆转的戏剧高潮。",
        },
      },
      {
        lineNum: 1695,
        textDE: "Dann will ich gern zugrunde gehn!",
        translationZH: "到那时，我甘心情愿万劫不复毁灭！",
        toneCategory: "existenz",
      },
      {
        lineNum: 1696,
        textDE: "Dann mag die Totenglocke schallen,",
        translationZH: "到那时，任凭丧钟为我鸣响，",
      },
      {
        lineNum: 1697,
        textDE: "Dann bist du deines Dienstes frei,",
        translationZH: "到那时，你便可以卸去仆役之责，重获自由，",
      },
      {
        lineNum: 1698,
        textDE: "Die Uhr mag stehn, der Zeiger fallen,",
        translationZH: "时钟任凭停摆，指针任凭崩落，",
        stilmittel: {
          type: "Metapher des Zeitstillstands (时间与世界末日隐喻)",
          descDE: "Der Untergang des subjektiven Strebens wird dem Ende der kosmischen Zeit gleichgesetzt.",
          descZH: "主观追求的终结被赋予宇宙时间崩落停摆的末日意象。",
        },
        toneCategory: "existenz",
      },
      {
        lineNum: 1699,
        textDE: "Es sei die Zeit für mich vorbei!",
        translationZH: "时间对我而言，便算彻底终结！",
        toneCategory: "existenz",
      },
      {
        lineNum: 1700,
        textDE: "MEPHISTOPHELES: Bedenk es wohl, wir werden's nicht vergessen.",
        translationZH: "梅菲斯特：你可要想清楚，我们绝不会忘记今日之约。",
      },
      {
        lineNum: 1701,
        textDE: "FAUST: Dazu hast du ein volles Recht;",
        translationZH: "浮士德：你完全有这个权利；",
      },
      {
        lineNum: 1702,
        textDE: "Ich habe mich nicht freventlich vermessen.",
        translationZH: "我绝不是在狂妄地胡吹大气。",
      },
      {
        lineNum: 1703,
        textDE: "Wie ich beharre, bin ich Knecht,",
        translationZH: "只要我一旦停滞僵化，我便沦为了奴隶，",
        stilmittel: {
          type: "Sentenz & Existenzphilosophisches Axiom (存在主义格言)",
          descDE: "Stillstand bedeutet ontologischen Freiheitsverlust.",
          descZH: "‘停滞即奴隶’：主体一旦放弃行动能动性，便丧失了一切自由存在尊严。",
        },
        toneCategory: "moral",
      },
      {
        lineNum: 1704,
        textDE: "Ob dein, was frag ich, oder wessen.",
        translationZH: "到那时究竟归你所有，还是归谁所有，对我又有何区别？",
      },
      {
        lineNum: 1708,
        textDE: "MEPHISTOPHELES: Bitt ich mir ein paar Zeilen aus.",
        translationZH: "梅菲斯特：我还得求您在纸上赐下几行字据。",
        vocab: {
          word: "ausbitten",
          meaningDE: "Erbitten, zur Bedingung machen.",
          meaningZH: "索求、作为书面凭证。",
        },
      },
      {
        lineNum: 1709,
        textDE: "FAUST: Auch was Geschriebnes forderst du, Pedant?",
        translationZH: "浮士德：你这迂腐冬烘，居然还要书面凭据？",
        stilmittel: {
          type: "Invektive & Ironische Entlarvung (讽刺嘲弄)",
          descDE: "Faust entlarvt Mephistos bürgerliche Bürokraten-Mentalität.",
          descZH: "‘Pedant’无情剥除魔鬼的超自然威严，暴露其死抠形式主义的官僚嘴脸。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 1710,
        textDE: "Hast du noch keinen Mann, kein Mannes-Wort gekannt?",
        translationZH: "难道你一生未曾领教过男子汉的神圣一诺？",
        toneCategory: "moral",
      },
      {
        lineNum: 1711,
        textDE: "Reicht mein gesprochnes Wort nicht hin?",
        translationZH: "难道我口口相授的诺言还不够分量吗？",
      },
    ],
    questions: [
      {
        id: "q-pakt-1",
        dimension: "motiv",
        titleDE: "1. Pakt vs. Wette",
        titleZH: "从买卖契约到动态意志之赌",
        afb: "AFB II",
        questionDE:
          "Warum transformiert Faust den traditionellen Teufelspakt in eine dynamische Wette?",
        questionZH:
          "在这场立约中，浮士德为何将民间故事传统的定期‘卖身契’（Pakt）颠覆为动态的‘意志豪赌’（Wette）？",
        options: [
          {
            id: "a",
            textDE:
              "Weil er seine Seele nur an den Stillstand ('Verweile doch!') bindet, den er aufgrund der Unstillbarkeit seines Geistes für unmöglich hält.",
            textZH:
              "因为浮士德将其灵魂裁判权绑定于‘精神求索的停滞（Verweile doch!）’而非固定时间年限；他深知人类精神的无限饥渴，认定尘世没有任何感官享受能使自己真正放弃进取。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Weil er Mephisto durch eine juristische Klausel um den Lohn betrügen will.",
            textZH:
              "因为他企图通过钻神圣罗马帝国民事法典的合同漏洞，在立约第二天借由教会法庭宣告该契约无效以赖账脱身。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Weil er den Pakt nur für ein Schauspiel hält, das keine metaphysischen Konsequenzen hat.",
            textZH:
              "因为他把魔鬼当成了狂欢节上装神弄鬼的杂耍戏子，立约只是为了向莱比锡大学生演示一场幽默的舞台小品。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Faust bindet sein Seelenheil nicht an Fristen, sondern an den Stillstand seines Strebens.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 1692–1699 行是全剧的核心法理机制：\n„Werd ich zum Augenblicke sagen: / Verweile doch! du bist so schön! / Dann magst du mich in Fesseln schlagen...“\n1. 赌注是‘精神停滞’：歌德颠覆了1587年民间书固定24年的卖身买卖，将其升华为形而上学意志对决；\n2. 浮士德的胜算底气：他深信有限的肉欲欢愉无法填饱无限的超越性欲望；\n3. 存在主义自律：人唯一的真正毁灭是放弃进取（V. 1703: Wie ich beharre, bin ich Knecht）。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（小人度君子）：浮士德在此处展现的是坦荡决绝的泰坦英雄气魄，‘视死如归’（Dann will ich gern zugrunde gehn!），绝非钻法律空子的老赖；\n• 选项 C 诊断（解构戏剧张力）：梅菲斯特的超自然身份是全剧推动力，将其视为杂耍彻底消解了悲剧的崇高与沉重。\n\n【🏛 时代思潮与哲学脉络】\n契合魏玛古典主义伦理学：生命即是行动（In der Tat），最大的罪过不是迷惘犯错，而是怠惰与停滞（Trägheit und Stillstand）。",
        klausurSatzDE:
          "Durch die Umwandlung des mittelalterlichen Paktes in eine Wette (V. 1692ff.) emanzipiert sich Faust als autonomes Subjekt: Seine Existenz scheitert erst im Moment passiver Genusssättigung.",
        klausurSatzZH:
          "通过将中世纪契约改造为现代意志之赌（第1692行起），浮士德确立了其作为自主性主体的崇高尊严：唯有当其屈从于消极感官自满的那一刻，其存在才算真正毁灭。",
        ehzKeyPointsDE: [
          "Differenzierung von Pakt (zeitlich terminiert) und Wette (qualitativ-konditional).",
          "Analyse der Chiffre 'Verweile doch! du bist so schön!'.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Kondition 4P)：精准阐述以 'Verweile doch!' 为触发条件的豪赌本质。",
          "踩分点 2 (Stillstand-Metapher 4P)：深刻提炼出 'Uhr mag stehn' 与 'bin ich Knecht' 的存在主义精神内核。",
          "踩分点 3 (Humanitaetsideal 4P)：联系古典主义人性观，对比魔鬼犬儒主义物化与浮士德主体尊严。",
        ],
      },
    ],
  },

  // =========================================================================
  // 3. DEUTSCH: Georg Büchner — Woyzeck (剃头场景与阶级道德压迫)
  // =========================================================================
  {
    id: "woyzeck-rasieren",
    fach: "Deutsch",
    author: "Georg Büchner",
    workTitleDE: "Woyzeck",
    workTitleZH: "《沃伊采克》",
    sceneTitleDE: "Szene: Beim Hauptmann // Der Woyzeck rasiert den Hauptmann",
    sceneTitleZH: "经典必考幕：连长军营 · 剃头场景 (阶级话语暴政与贫民道德悖论)",
    versesRange: "Dramenszene (Vormärz)",
    epochDE: "Vormärz / Frührealismus",
    epochZH: "三月前夕运动 / 早期现实主义",
    contextDE:
      "Woyzeck rasiert seinen Vorgesetzten, den Hauptmann. Der Hauptmann philosophiert selbstgefällig über Zeit, Moral und Tugend, während er den gedemütigten Soldaten wegen dessen Armut und unehelichen Kindes herablassend belehrt.",
    contextZH:
      "底层士兵沃伊采克正在给长官连长剃须。大腹便便的连长悠闲地空谈着时间、道德与美德，并以居高临下的伪善口吻，羞辱沃伊采克的贫困及其非婚生子。沃伊采克在此喊出了世界文学中最震撼的底层呐喊。",
    verses: [
      {
        lineNum: 1,
        textDE: "HAUPTMANN: Langsam, Woyzeck, langsam! Eins nach dem Andern!",
        translationZH: "连长：慢点，沃伊采克，慢点！一件一件来！",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 2,
        textDE: "Er macht mir ganz schwindlig. Was soll ich denn mit den zehn Minuten anfangen,",
        translationZH: "你刮得我头晕目眩。要是你提早十分钟刮完，我剩下的这十分钟该怎么打发？",
      },
      {
        lineNum: 3,
        textDE: "die Er heut zu früh fertig wird? Woyzeck, bedenk Er, Er hat noch seine schönen dreißig Jahre zu leben!",
        translationZH: "沃伊采克，你想想看，你可还有足足三十年好光阴要活呢！",
      },
      {
        lineNum: 4,
        textDE: "Dreißig Jahre! Das sind dreihundertundsechzig Monate! Was will Er denn mit der ungeheuren Zeit anfangen?",
        translationZH: "三十年！那就是三百六十个月！这么浩瀚无边的漫长岁月，你打算拿来干什么？",
        stilmittel: {
          type: "Hyperbel der Langeweile (市侩阶层的无聊极言)",
          descDE: "Der Hauptmann leidet an elitärer Melancholie und Zeitüberfluss.",
          descZH: "统治阶层饱食终日无所事事的虚无空虚感（Langeweile）。",
        },
      },
      {
        lineNum: 5,
        textDE: "WOYZECK: Jawohl, Herr Hauptmann.",
        translationZH: "沃伊采克：是，连长长官。",
        toneCategory: "existenz",
      },
      {
        lineNum: 6,
        textDE: "HAUPTMANN: Es wird mir ganz angst um die Welt, wenn ich an die Ewigkeit denke. Geschäft, Woyzeck, Geschäft!",
        translationZH: "连长：一想到永恒，我心里就直发慌。找点营生吧，沃伊采克，找点消遣！",
      },
      {
        lineNum: 7,
        textDE: "Woyzeck, Er hat keine Moral! Moral, das ist, wenn man moralisch ist, versteht Er.",
        translationZH: "沃伊采克，你这个人没有道德！道德嘛，那就是人要讲道德，你懂不懂？",
        stilmittel: {
          type: "Tautologie (循环空洞同义反复)",
          descDE: "Die Definition von Moral als bloße Phrase entlarvt die geistige Verarmung des Adels.",
          descZH: "‘道德就是讲道德’——典型的教条同义反复，暴露出统治阶层话语体系的荒谬空洞。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 8,
        textDE: "Es ist ein gutes Wort. Er hat ein Kind ohne den Segen der Kirche.",
        translationZH: "这是个顶好的词儿。你没经教堂祝福就生下了私生子。",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 9,
        textDE: "WOYZECK: Herr Hauptmann, der liebe Gott wird den armen Wurm nicht drum ansehen,",
        translationZH: "沃伊采克：连长长官，仁慈的上帝绝不会单单因为一声阿门没念，",
        toneCategory: "moral",
      },
      {
        lineNum: 10,
        textDE: "ob das Amen drüber gesagt ist, eh er gemacht wurde. Der Herr sprach: »Lasset die Kleinen zu mir kommen.«",
        translationZH: "就怪罪那可怜的小虫子。主曾说过：‘让小孩子们到我这里来。’",
        stilmittel: {
          type: "Biblisches Zitat (颠覆性圣经援引)",
          descDE: "Woyzeck nutzt christliche Nächstenliebe gegen die scheinheilige Amtskirche.",
          descZH: "底层平民引用基督仁爱之语，直接将虚伪的建制教会与神权特权击得粉碎。",
        },
      },
      {
        lineNum: 11,
        textDE: "HAUPTMANN: Was sagt Er da? Was ist das für eine kuriose Antwort?",
        translationZH: "连长：你这说的是什么浑话？这算什么古怪回答？",
      },
      {
        lineNum: 12,
        textDE: "WOYZECK: Wir arme Leut – Sehn Sie, Herr Hauptmann: Geld, Geld! Wer kein Geld hat –",
        translationZH: "沃伊采克：我们穷苦人——您瞧瞧，连长长官：钱啊，钱！谁要是没钱——",
        stilmittel: {
          type: "Parataxe & Emphase (碎裂断句与悲切重音)",
          descDE: "Die Sprache zerbricht unter der Last existenzieller Verzweiflung.",
          descZH: "语言在无情贫困的摧残下彻底碎裂为急促、泣血的实词呼告。",
        },
        toneCategory: "existenz",
      },
      {
        lineNum: 13,
        textDE: "Da setz einmal einer seinesgleichen auf die Moral in der Welt!",
        translationZH: "在这世上，谁又有资格要求像我们这样的人去守什么高尚道德！",
      },
      {
        lineNum: 14,
        textDE: "Man hat auch sein Fleisch und Blut. Unsereiner ist doch einmal unselig in der und der andern Welt,",
        translationZH: "穷人也是有血有肉的凡胎肉身。我们这种人在这个世上、在那个来世，横竖都注定万劫不复，",
      },
      {
        lineNum: 15,
        textDE: "ich glaub, wenn wir in Himmel kämen, so müssten wir donnern helfen!",
        translationZH: "我琢磨着，就算我们将来真上了天堂，也只配给天老爷打杂帮着敲雷鸣吧！",
        stilmittel: {
          type: "Groteske Metapher (悲壮的底层黑色荒诞)",
          descDE: "Verelendung bis in das Jenseits: Ewige Klassengesellschaft auch im Paradies.",
          descZH: "‘帮着敲雷’——将阶级剥削投射到天国天界，构成了世界戏剧史上最震撼的荒诞控诉。",
        },
        toneCategory: "existenz",
      },
    ],
    questions: [
      {
        id: "q-woyzeck-1",
        dimension: "inhalt",
        titleDE: "1. Soziale Determination & Moral",
        titleZH: "社会阶层对道德的绝对决定论",
        afb: "AFB II",
        questionDE:
          "Welche fundamentale Gesellschaftskritik äußert Woyzeck mit dem Ausruf »Wir arme Leut – Wer kein Geld hat« (Z. 12-14)?",
        questionZH:
          "沃伊采克在第 12–14 行喊出的‘我们穷苦人……谁要是没钱’表达了怎样的唯物史观与社会阶级批判？",
        options: [
          {
            id: "a",
            textDE:
              "Er entlarvt bürgerliche Moral als elitäres Privileg: Wer in existenzieller materieller Not lebt, kann sich bürgerliche Tugendregeln schlichtweg nicht leisten.",
            textZH:
              "他无情拆穿了资产阶级道德不过是富贵阶层衣食无忧时的奢侈特权：当人连基本的肉身生存都难以维系时，高高在上的道德教条纯属残酷的空中楼阁。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er fordert eine Erhöhung des Soldes, um Marie Diamantschmuck kaufen zu können.",
            textZH:
              "他只是借机向长官讨价还价要求涨薪，好去珠宝店为玛丽购买钻石项链来博取欢心。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er stimmt dem Hauptmann vollkommen zu und gelobt, sofort ins Kloster einzutreten.",
            textZH:
              "他被连长的崇高伦理说服得五体投地，当场痛哭流涕忏悔自己的私生子罪孽并承诺遁入空门当修道士。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Büchner formuliert einen proto-marxistischen Materialismus: Das Sein bestimmt das moralische Bewusstsein.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 12–15 行是毕希纳现实主义戏剧的定海神针：\n„Wir arme Leut – Sehn Sie, Herr Hauptmann: Geld, Geld! Wer kein Geld hat – Da setz einmal einer seinesgleichen auf die Moral in der Welt! Man hat auch sein Fleisch und Blut.“\n1. 经济基础决定道德意识（Soziale Determination）：贫困剥夺了穷人遵守市民道德的形式条件；\n2. 伪善的连长话语：连长整天吃饱了撑的叹息时间太多（Langeweile），却要求食不果腹的士兵恪守教规；\n3. 天堂打雷隐喻（Groteske Metapher）：阶级压迫在沃伊采克眼中甚至连上帝的天国都无法赦免。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（消费主义庸俗化）：沃伊采克每天只靠吃医生给的豌豆、拿几分钱微薄收入补贴家用，把生存绝境曲解为买首饰是典型错误；\n• 选项 C 诊断（彻底颠倒角色立场）：沃伊采克在全场是用圣经真言（Lasset die Kleinen...）猛烈反击长官的伪善，绝非屈膝认同。\n\n【🏛 时代思潮与哲学脉络】\n三月前夕（Vormärz）革命先驱毕希纳在《黑森信使》（Der Hessische Landbote）中提出「和平归于茅舍，战争引向宫廷（Friede den Hütten! Krieg den Palästen!）」，本幕正是这一革命纲领的文学绝响。",
        klausurSatzDE:
          "Büchner dekonstruiert die bürgerliche Morallehre als ideologisches Herrschaftsinstrument: Woyzecks Replik entlarvt die materielle Gebundenheit jeglicher Ethik (»Geld, Geld!«) und antizipiert den historischen Materialismus.",
        klausurSatzZH:
          "毕希纳将市民道德说教彻底解构为统治阶级的意识形态枷锁：沃伊采克沉痛的辩白揭示了一切伦理道德的物质条件性（‘钱啊，钱！’），深刻预示了唯物史观的诞生。",
        ehzKeyPointsDE: [
          "Entlarvung der Tautologie des Hauptmanns als inhaltsleere Phrase.",
          "Analyse von Woyzecks Argumentation bezüglich Armut und Fleisch/Blut.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Sprachanalyse 4P)：精准指出连长 'Moral, das ist, wenn man moralisch ist' 的空洞同义反复与阶级傲慢。",
          "踩分点 2 (Soziale Kausalitaet 4P)：深刻提炼出沃伊采克 'Wir arme Leut' 背后的唯物主义生存困境。",
          "踩分点 3 (Vormaers-Kontext 4P)：结合 1830 年代德国三月前夕贫困化（Pauperismus）历史现实进行社会批判深度评价。",
        ],
      },
    ],
  },

  // =========================================================================
  // 4. PHILOSOPHIE: Immanuel Kant — GMS (定言绝对命令与善良意志)
  // =========================================================================
  {
    id: "kant-kategorisch",
    fach: "Philosophie",
    author: "Immanuel Kant",
    workTitleDE: "Grundlegung zur Metaphysik der Sitten (1785)",
    workTitleZH: "《道德形而上学奠基》",
    sceneTitleDE: "Abschnitt II // Der kategorische Imperativ und die Universalisierungsformel",
    sceneTitleZH: "第二章：从通俗道德哲学到道德形而上学 (定言绝对命令与普遍立法法则)",
    versesRange: "Akademie-Ausgabe IV, 421",
    epochDE: "Europäische Aufklärung",
    epochZH: "欧洲启蒙运动",
    contextDE:
      "Kant deduziert das oberste Prinzip der Moralität. Er grenzt hypothetische Imperative (Zweck-Mittel-Rationalität) scharf vom kategorischen Imperativ ab, der als unbedingtes Sittengesetz für alle vernünftigen Wesen a priori gilt.",
    contextZH:
      "康德论证道德哲学的至高最高原则。他严格区分了假言命令（基于功利欲望的手段目的工具理性）与定言绝对命令，确立了放之四海而皆准的先天自律纯粹道德法则。",
    verses: [
      {
        lineNum: 1,
        textDE: "Der kategorische Imperativ ist also nur ein einziger und zwar dieser:",
        translationZH: "因此，定言绝对命令唯独只有一个，那就是：",
        toneCategory: "moral",
      },
      {
        lineNum: 2,
        textDE: "handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst,",
        translationZH: "你要只按照你同时能够愿意它成为一条普遍法则的准则去行动；",
        stilmittel: {
          type: "Grundformel des Sittengesetzes (道德法则普遍法则基本公式)",
          descDE: "Die Universalisierungsformel als logischer Prüfstein moralischer Maximen.",
          descZH: "普遍化检验原则：行动准则必须通过无逻辑矛盾的普遍立法推演。",
        },
        toneCategory: "moral",
      },
      {
        lineNum: 3,
        textDE: "daß sie ein allgemeines Gesetz werde.",
        translationZH: "使得该准则能够升华为一条普世恒常的自然法则。",
        vocab: {
          word: "Maxime",
          meaningDE: "Subjektiver Grundsatz des Wollens und Handelns.",
          meaningZH: "行动的主观准则。",
        },
      },
      {
        lineNum: 4,
        textDE: "Wenn nun aus diesem einigen Imperativ alle Imperative der Pflicht",
        translationZH: "倘若一切关于义务的命令都能从这唯一的这道命令中推导出来，",
      },
      {
        lineNum: 5,
        textDE: "als aus ihrem Prinzip abgeleitet werden können,",
        translationZH: "如同从其本源原理中生发出来一样，",
      },
      {
        lineNum: 6,
        textDE: "so werden wir, ob wir es gleich unausgemacht lassen, ob nicht überhaupt das, was man Pflicht nennt, ein leerer Begriff sei,",
        translationZH: "那么我们纵使暂且悬搁所谓‘义务’是否纯属空洞概念的怀疑，",
      },
      {
        lineNum: 7,
        textDE: "doch wenigstens anzeigen können, was wir dadurch denken und was dieser Begriff sagen wolle.",
        translationZH: "也至少能够阐明我们借此所思索的究竟为何、这一概念究竟蕴含着何等本质。",
        toneCategory: "streben",
      },
    ],
    questions: [
      {
        id: "q-kant-1",
        dimension: "theorie",
        titleDE: "1. Kategorischer vs. Hypothetischer Imperativ",
        titleZH: "定言命令与假言命令的本质界河",
        afb: "AFB II",
        questionDE:
          "Worin besteht nach Kant der fundamentale Unterschied zwischen einem hypothetischen und dem kategorischen Imperativ?",
        questionZH:
          "根据康德在《奠基》中的论证，定言绝对命令与假言命令之间的根本分水岭究竟何在？",
        options: [
          {
            id: "a",
            textDE:
              "Hypothetische Imperative gelten nur bedingt als Mittel zu einem empirischen Zweck (z. B. Klugheit, Glück); der kategorische Imperativ gebietet eine Handlung an sich als objektiv-notwendig ohne jede Zweckbindung.",
            textZH:
              "假言命令只是达成某个经验欲望目的（如追求幸福、趋利避害）的‘有条件手段’；而定言绝对命令则是不依附于任何外部功利结果、纯粹因行动本身符合善良意志而先天具有客观必然性的绝对义务。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Der kategorische Imperativ gilt nur für Richter und Staatsbeamte, während hypothetische Imperative für das gemeine Volk gedacht sind.",
            textZH:
              "定言命令专门用来约束普鲁士法官和公务员的行政治理，而假言命令则是为普通百姓制定的世俗生活准则。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Hypothetische Imperative basieren auf der Bibel, während der kategorische Imperativ die antike Astrologie fortsetzt.",
            textZH:
              "假言命令完全源自《圣经》旧约的十诫戒律，而定言命令则是古希腊占星术在哥尼斯堡的延续。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Kants Deontologie begründet die Pflicht a priori aus reiner Vernunft, unabhängig von Neigungen und Konsequenzen.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n康德伦理学的核心建构：\n1. 假言命令（Hypothetischer Imperativ）：格式为‘如果你想要目的 X，你就必须做手段 Y’。它完全受制于经验爱好（Neigung）与功利结果，不具备普世约束力；\n2. 定言命令（Kategorischer Imperativ）：格式为‘你应当！’（Du sollst!）。无条件的绝对命令（unbedingt），行动自身即是目的，绝不可沦为达成其他目的的工具；\n3. 自律原则（Autonomie des Willens）：道德律令不是上帝或外在社会强加的他律，而是理性存在者自身的实践理性立法。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（特权阶层误读）：康德的道德律令面向一切具备理性的存在者（alle vernünftigen Wesen），在道德法则面前众生平等，绝无阶级官职差异；\n• 选项 C 诊断（荒诞倒错）：康德哲学是纯粹实践理性的批判（Kritik der reinen praktischen Vernunft），坚决排斥神秘主义与宗教他律盲从。\n\n【🏛 时代思潮与哲学脉络】\n欧洲启蒙运动的核心口号：人作为目的自身（Zweck an sich selbst）。康德以此彻底终结了功利主义把人工具化的可能，奠定了现代人权宪政的哲学基石。",
        klausurSatzDE:
          "Kant begründet eine deontologische Pflichtethik: Der kategorische Imperativ fordert die Überprüfung der subjektiven Handlungsmaxime auf ihre logische Universalisierbarkeit (Gesetzesformel), frei von heteronomen Zweck-Mittel-Kalkülen.",
        klausurSatzZH:
          "康德奠定了严格的义务论伦理学：定言绝对命令要求检验主观行动准则是否具有逻辑上的可普遍化性（普遍法则公式），坚决排除了任何受外在欲望驱使的手段-目的功利算计。",
        ehzKeyPointsDE: [
          "Begriffsbestimmung: Maxime als subjektives Prinzip vs. Gesetz als objektives Prinzip.",
          "Erläuterung des Widerspruchsfreiheitskriteriums bei der Universalisierung.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Definition 4P)：准确界定准则（Maxime）、普遍法则（allgemeines Gesetz）与定言绝对性。",
          "踩分点 2 (Deontologie 4P)：剖析义务论（Pflichtethik）与功利主义（Utilitarismus）对后果评价的根本差异。",
          "踩分点 3 (Autonomie 4P)：阐述意志自律作为人类尊严最高根据的哲学价值。",
        ],
      },
    ],
  },

  // =========================================================================
  // 5. SOWI: Frank-Walter Steinmeier — Rede zur Demokratie (政治演说与抗辩文化)
  // =========================================================================
  {
    id: "steinmeier-rede",
    fach: "SoWi",
    author: "Frank-Walter Steinmeier",
    workTitleDE: "Demokratie braucht Demokraten (Antrittsrede 2017)",
    workTitleZH: "《民主需要民主人士》联邦总统就职演说",
    sceneTitleDE: "Redeausschnitt // Streitkultur, Zusammenhalt und Verfassungspatriotismus",
    sceneTitleZH: "核心篇目：联邦大会就职演说 (民主抗辩文化、社会团结与极化防御)",
    versesRange: "Plenarprotokoll des Deutschen Bundestages",
    epochDE: "Bundesrepublik Deutschland / Gegenwart",
    epochZH: "当代德国政治与基本法秩序",
    contextDE:
      "Bundespräsident Frank-Walter Steinmeier analysiert die Gefährdungen der liberalen Demokratie im Zeitalter von Populismus, sozialer Spaltung und digitaler Desinformation. Er plädiert für eine lebendige, kompromissbereite Streitkultur auf dem Fundament des Grundgesetzes.",
    contextZH:
      "联邦总统弗兰克-瓦尔特·施泰因迈尔在就职演说中深刻剖析民粹主义、社会撕裂与数字化虚假信息对自由民主政体的威胁。他呼吁公民在基本法宪法爱国主义基石上，守护理性、包容与勇于妥协的抗辩文化。",
    verses: [
      {
        lineNum: 1,
        textDE: "Demokratie ist kein Zustand, der einmal erreicht ist und für immer bleibt.",
        translationZH: "民主绝不是某种一劳永逸达成后便能永葆长存的既定状态。",
        toneCategory: "moral",
      },
      {
        lineNum: 2,
        textDE: "Demokratie ist eine anspruchsvolle, ja die anstrengendste aller Staatsformen.",
        translationZH: "民主是一切国家制度中要求最高、也无疑是最为劳心费力的形式。",
        stilmittel: {
          type: "Gradatio / Klimax (层层递进)",
          descDE: "Betont die ständige Aktivierungsbedürftigkeit mündiger Bürger.",
          descZH: "从‘要求最高’到‘最为费力’，强调成熟公民永不停歇的参与之责。",
        },
      },
      {
        lineNum: 3,
        textDE: "Denn sie verlangt uns etwas ab: Sie fordert den Streit, aber sie verlangt auch den Kompromiss.",
        translationZH: "因为它向我们每个人提出了严苛要求：它鼓励不同观点的交锋，但它同样要求达成妥协的胸襟。",
        stilmittel: {
          type: "Antithese (对偶张力)",
          descDE: "Dialektik von pluralistischem Dissens und demokratischem Konsens.",
          descZH: "‘多元抗辩’与‘协商妥协’构成了民主运转的辩证双翼。",
        },
        toneCategory: "streben",
      },
      {
        lineNum: 4,
        textDE: "Wer den Kompromiss verachtet, der verachtet den Kern der parlamentarischen Demokratie.",
        translationZH: "谁要是蔑视妥协，谁就是在蔑视议会民主制的心脏。",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 5,
        textDE: "Lassen Sie uns nicht übereinander reden, sondern miteinander!",
        translationZH: "让我们不要在背后对彼此评头论足，而要在台前开诚布公地彼此对话！",
        stilmittel: {
          type: "Chiasmus & Paronomasie (语音回环呼吁)",
          descDE: "Appell zur Überwindung von gesellschaftlichen Echokammern und Polarisierung.",
          descZH: "‘übereinander’到‘miteinander’的精巧转折，发出冲破信息茧房与极化对立的清脆呼召。",
        },
        toneCategory: "moral",
      },
    ],
    questions: [
      {
        id: "q-steinmeier-1",
        dimension: "argumentation",
        titleDE: "1. Redeanalyse & Streitkultur",
        titleZH: "政治演说的论辩机制与妥协价值",
        afb: "AFB II",
        questionDE:
          "Welche funktionale Bedeutung misst Steinmeier dem 'Kompromiss' für das Überleben der parlamentarischen Demokratie bei?",
        questionZH:
          "施泰因迈尔在演说中为何将‘妥协能力’提升为议会民主制生死存亡的核心法宝？",
        options: [
          {
            id: "a",
            textDE:
              "Der Kompromiss ist das unverzichtbare Instrument, um im weltanschaulichen Pluralismus friedlichen Zusammenhalt zu stiften, ohne die Identität der Andersdenkenden zu vernichten.",
            textZH:
              "妥协是多元主义社会中凝聚和平共识不可或缺的制度法宝，它使不同利益诉求在博弈中找到最大公约数，既避免了多数人暴政，又维护了他者的尊严与认同。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Der Kompromiss dient lediglich dazu, unentschlossene Wähler durch faule Ausreden zu betrügen.",
            textZH:
              "妥协只是政客在竞选民调胶着时用来糊弄中间选民的推诿借口，在政治学上代表了原则立场的彻底背叛与堕落。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er plädiert für die Abschaffung des Bundestags zugunsten eines automatischen KI-Wahlcomputers.",
            textZH:
              "他呼吁彻底废除联邦议院各党派辩论，改由柏林超级人工智能计算机直接根据大数据算法来分配国家预算。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "In der politischen Theorie von Ernst Fraenkel ist der Kompromiss das Herzstück pluralistischer Demokratien.",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 3–5 行直击现代政治学的核心常识：\n„Wer den Kompromiss verachtet, der verachtet den Kern der parlamentarischen Demokratie... Lassen Sie uns nicht übereinander reden, sondern miteinander!“\n1. 弗兰克尔（Ernst Fraenkel）多元主义民主理论：社会必然存在异质性分歧（Dissens），民主不是消灭分歧，而是规范分歧；\n2. 妥协的崇高价值：妥协不是软弱放弃，而是承认彼此合法性的最高政治智慧；\n3. 警惕民粹主义（Populismus）：民粹派往往宣称代表唯一不可分割的人民公意，将妥协污名化为背叛，这是对民主体制最大的内生性腐蚀。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（民粹主义负面定性）：将理性妥协抹黑为欺诈，恰恰是施泰因迈尔所猛烈警示与反击的政治极化思潮；\n• 选项 C 诊断（科技幻想乱入）：国家元首旨在捍卫基本法第一条人性尊严与代议民主，绝无可能鼓吹技术威权主义。\n\n【🏛 时代思潮与哲学脉络】\n哈贝马斯（Jürgen Habermas）沟通行动理论（Theorie des kommunikativen Handelns）：民主合法性源自无强迫的商谈与论辩交往过程。",
        klausurSatzDE:
          "Steinmeier fundiert seine demokratietheoretische Argumentation auf der Notwendigkeit einer reflexiven Streitkultur: Der Kompromiss fungiert als friedensstiftender Mechanismus pluralistischer Willensbildung, der totalitären Absolutheitsansprüchen vorbeugt.",
        klausurSatzZH:
          "施泰因迈尔将其民主理论论述锚定在反思性抗辩文化的必要性上：妥协扮演了多元主义意愿表达中捍卫和平的制度化机制，有力防范了极权式的绝对主义霸权企图。",
        ehzKeyPointsDE: [
          "Identifikation des Gegensatzpaares Streit vs. Kompromiss.",
          "Einordnung in Fraenkels Pluralismuskonzept der Bundesrepublik.",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Redeanalyse 4P)：精准剖析 'Streit' 与 'Kompromiss' 辩证对立的修辞与论证功能。",
          "踩分点 2 (Pluralismus 4P)：结合德国联邦多元主义学说（Pluralismustheorie），阐发防止社会极化的现实针对性。",
          "踩分点 3 (Verfassungspatriotismus 4P)：提炼出基本法秩序下公民交往理性与宪政认同的时代要求。",
        ],
      },
    ],
  },

  // =========================================================================
  // 6. ENGLISCH: William Shakespeare — Macbeth (虚无独白与悲剧英雄)
  // =========================================================================
  {
    id: "macbeth-soliloquy",
    fach: "Englisch",
    author: "William Shakespeare",
    workTitleDE: "Macbeth (Act V, Scene 5)",
    workTitleZH: "《麦克白》（第五幕第五场）",
    sceneTitleDE: "Soliloquy: Tomorrow, and tomorrow, and tomorrow",
    sceneTitleZH: "世界文学巅峰独白：明天，明天，又一个明天 (时间空虚与幻灭)",
    versesRange: "Act 5, Scene 5, Lines 17–28",
    epochDE: "Renaissance / Elizabethan Drama",
    epochZH: "文艺复兴 / 伊丽莎白时代戏剧",
    contextDE:
      "Upon receiving news of Lady Macbeth's death and the approaching Birnam Wood, Macbeth confronts the ultimate futility of his bloody ambition in one of the most famous soliloquies in English literature.",
    contextZH:
      "在得知麦克白夫人自尽身亡、且勃南树林正逼近城堡的绝望前夕，麦克白在世界文学史上最负盛名的独白中，直面其血腥野心的终极荒诞与虚无。",
    verses: [
      {
        lineNum: 17,
        textDE: "She should have died hereafter;",
        translationZH: "她本该在以后再死的；",
        toneCategory: "krise",
      },
      {
        lineNum: 18,
        textDE: "There would have been a time for such a word.",
        translationZH: "总会有合适的时候来传达这样一声噩耗。",
      },
      {
        lineNum: 19,
        textDE: "Tomorrow, and tomorrow, and tomorrow,",
        translationZH: "明天，明天，又一个明天，",
        stilmittel: {
          type: "Repetitio & Polysyndeton (三叠排比与连词递进)",
          descDE: "Dismal monotony of linear time without metaphysical hope.",
          descZH: "三声毫无波澜的‘明天’，生动刻画出时间毫无形而上学希望的单调冰冷流逝。",
        },
        toneCategory: "existenz",
      },
      {
        lineNum: 20,
        textDE: "Creeps in this petty pace from day to day,",
        translationZH: "便这样迈着琐屑卑微的步子，日复一日地爬行，",
        vocab: {
          word: "petty",
          meaningDE: "Bedeutungslos, trivial, kleinlich.",
          meaningZH: "琐碎、微不足道、渺小。",
        },
      },
      {
        lineNum: 21,
        textDE: "To the last syllable of recorded time;",
        translationZH: "直到注定被记载的时间流下最后一个音节；",
      },
      {
        lineNum: 22,
        textDE: "And all our yesterdays have lighted fools",
        translationZH: "而我们所有逝去的昨日，不过是照亮了傻子们",
      },
      {
        lineNum: 23,
        textDE: "The way to dusty death. Out, out, brief candle!",
        translationZH: "通往化为尘埃的死亡之路。熄灭吧，熄灭吧，短暂的烛火！",
        stilmittel: {
          type: "Metaphor of the Candle (生命烛火隐喻)",
          descDE: "Fragility of human existence in the face of absolute nothingness.",
          descZH: "以摇曳短促的烛光比喻肉身脆弱的生命，呼出决绝的幻灭感。",
        },
        toneCategory: "existenz",
      },
      {
        lineNum: 24,
        textDE: "Life's but a walking shadow, a poor player,",
        translationZH: "人生不过是一个行走的影子，一个可怜的拙劣戏子，",
        stilmittel: {
          type: "Theatrum Mundi (世界大剧场母题)",
          descDE: "Shakespeare's quintessential motif: The actor alienated from reality.",
          descZH: "文艺复兴经典托泊斯‘人生大剧场’：演员在舞台上的狂嚣转瞬即逝。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 25,
        textDE: "That struts and frets his hour upon the stage,",
        translationZH: "在台上趾高气扬地大声喧哗、自寻烦恼了一阵，",
      },
      {
        lineNum: 26,
        textDE: "And then is heard no more. It is a tale",
        translationZH: "然后便再也悄无声息。人生乃是一个故事，",
      },
      {
        lineNum: 27,
        textDE: "Told by an idiot, full of sound and fury,",
        translationZH: "由一个白痴滔滔不绝讲出，充满了喧哗与骚动，",
        stilmittel: {
          type: "Climax of Nihilism (虚无主义巅峰定性)",
          descDE: "Radical deconstruction of human meaning and divine teleology.",
          descZH: "对人类一切奋斗意义与神圣目的论的彻底毁灭性解构。",
        },
        toneCategory: "existenz",
      },
      {
        lineNum: 28,
        textDE: "Signifying nothing.",
        translationZH: "却毫无半点意义。",
        toneCategory: "existenz",
      },
    ],
    questions: [
      {
        id: "q-macbeth-1",
        dimension: "stilmittel",
        titleDE: "1. Metaphorik & Theatrum Mundi",
        titleZH: "世界大剧场与白痴狂嚣的修辞解剖",
        afb: "AFB II",
        questionDE:
          "How do the metaphors of the 'brief candle', 'walking shadow' and the 'tale told by an idiot' articulate Macbeth's existential despair?",
        questionZH:
          "麦克白在独白中连续使用的‘短暂烛火’、‘行走的阴影’以及‘白痴讲的故事’三重隐喻，如何层层递进地宣告了其狂妄野心的终极破产？",
        options: [
          {
            id: "a",
            textDE:
              "They dismantle any metaphysical or moral meaning of human ambition: Power and tyranny are reduced to hollow theatrical illusions that vanish into absolute cosmic absurdity.",
            textZH:
              "它们彻底击碎了人类野心的一切形而上学或道德光环：权欲与篡位暴政最终被降维为空洞的舞台幻觉与无常阴影，在绝对的宇宙虚无与无意义面前彻底坍塌。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Macbeth is complaining about bad theater actors in London and wants to write a better screenplay.",
            textZH:
              "麦克白只是在发牢骚抱怨伦敦环球剧场的演员演技太烂，打算自己在苏格兰重新写一部更好的商业剧本。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "He intends to blow out candles to save castle expenses during the siege.",
            textZH:
              "他之所以大喊‘熄灭吧烛火’，是因为城堡在被围困期间蜡烛燃料储备不足，为了节省城堡财政开支而要求士兵吹灭蜡烛。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Shakespeare's tragic hero confronts the nihilistic abyss after violating the natural order (Great Chain of Being).",
        explanationZH:
          "【✅ 正解依据与文本锚点】\n第 23–28 行是文艺复兴悲剧的至高经典：\n„Out, out, brief candle! / Life's but a walking shadow, a poor player... / It is a tale / Told by an idiot, full of sound and fury, / Signifying nothing.“\n1. 烛火隐喻（Brief candle）：脆弱易逝的物质肉身；\n2. 戏子隐喻（Poor player & Theatrum mundi）：人在命运与权力诱惑面前不过是傀儡戏偶；\n3. 喧哗与骚动（Sound and fury, signifying nothing）：背叛良知篡位夺权的血腥历程，最终被时间归零为纯粹的虚无。\n\n【❌ 干扰项逐项诊断】\n• 选项 B 诊断（字面化降智解构）：将世界文学中最深沉的存在主义形而上学悲叹，误解为对剧场演员的挑剔吐槽；\n• 选项 C 诊断（物质实用主义倒错）：将生命烛火的崇高死亡隐喻曲解为节约蜡烛开销，完全丧失了文学审美感受力。\n\n【🏛 时代思潮与哲学脉络】\n伊丽莎白时代的「巨链存在秩序」（Great Chain of Being）：麦克白弑君篡位破坏了神圣自然伦理，不仅导致苏格兰政治流血，更必然导致篡位者自身精神世界的彻底解体与形而上学荒芜。",
        klausurSatzDE:
          "Shakespeare dekonstruiert die hybrisgeladene Tyrannei des tragischen Helden durch die Metaphern des theatralischen Scheins und der flüchtigen Kerze: Der Raub der Krone kulminiert im existentiellen Nihilismus der absoluten Sinnlosigkeit (»Signifying nothing«).",
        klausurSatzZH:
          "莎士比亚通过舞台幻觉与易逝烛火的双重隐喻，无情解构了悲剧英雄充斥着狂妄骄横（Hybris）的暴政：弑君夺冠的血腥征程最终沉沦于绝对无意义的存在主义虚无深渊（‘毫无半点意义’）。",
        ehzKeyPointsDE: [
          "Analyse der dreifachen Metaphern-Kaskade (candle, shadow, player).",
          "Funktion des rhythmischen Zusammenbruchs im Blankvers (signifying nothing).",
        ],
        ehzKeyPointsZH: [
          "踩分点 1 (Metaphernanalyse 4P)：精准阐发烛火、暗影、拙劣戏子三重视角对存在本质的虚无定性。",
          "踩分点 2 (Theatrum Mundi 4P)：深刻提炼文艺复兴世界大剧场母题在悲剧终局中的反讽职能。",
          "踩分点 3 (Tragik 4P)：结合素体无韵诗（Blankvers）节奏与语用张力，阐明野心破产与精神毁灭的必然因果。",
        ],
      },
    ],
  },

  // =========================================================================
  // 7. DEUTSCH: Gotthold Ephraim Lessing — Nathan der Weise (Die Ringparabel)
  // =========================================================================
  {
    id: "nathan-ringparabel",
    fach: "Deutsch",
    genre: "Drama",
    author: "Gotthold Ephraim Lessing",
    workTitleDE: "Nathan der Weise",
    workTitleZH: "《智者纳坦》",
    sceneTitleDE: "Dritter Aufzug, siebenter Auftritt: Die Ringparabel",
    sceneTitleZH: "第三幕第七场：指环寓言（宗教宽容与实践人道）",
    versesRange: "Vers 1911–1946",
    epochDE: "Aufklärung (1720–1785)",
    epochZH: "欧洲启蒙运动 (1720–1785)",
    dramaticConflictDE:
      "Saladin stellt Nathan die Fangfrage nach der 'wahren Religion'; Nathan weicht dem Dogmenstreit aus und antwortet mit der Parabel der drei Ringe, die Wahrheit an sittliche Praxis bindet.",
    dramaticConflictZH:
      "萨拉丁抛出‘三大宗教谁是真理’的试探性圈套；纳坦超越教条之争，以三枚指环的哲理寓言作答，将真理的裁判权彻底锚定于人道善行与道德实践。",
    contextDE:
      "Im Palast zu Jerusalem bittet Sultan Saladin den wohlhabenden jüdischen Kaufmann Nathan zu sich. Er verlangt zu wissen, welche der drei Weltreligionen Nathan für die beste und wahre halte.",
    contextZH:
      "在十字军东征时期的耶路撒冷王宫，穆斯林苏丹萨拉丁召见犹太富商纳坦，当面质问他认为犹太教、基督教与伊斯兰教中究竟何者为至高唯一的真实宗教。",
    verses: [
      {
        lineNum: 1911,
        textDE: "Vor grauen Jahren lebt' ein Mann im Osten,",
        translationZH: "在迢遥悠久的古老年岁里，东方曾生活着一个人，",
        speaker: "Nathan",
        toneCategory: "moral",
        stilmittel: {
          type: "Märchenhafter Topos (传奇寓言开篇)",
          descDE: "„Vor grauen Jahren“ entrückt die Handlung ins Zeitlose und Allgemeine.",
          descZH: "‘古老年岁’以寓言泛指超越具体历史时空的普遍性真理法则。",
        },
      },
      {
        lineNum: 1912,
        textDE: "Der einen Ring von unschätzbarem Wert",
        translationZH: "他拥有一枚价值无法估量的祖传指环，",
        speaker: "Nathan",
        vocab: {
          word: "unschätzbar",
          meaningDE: "Von unendlichem, unbezahlbarem ideellem Wert.",
          meaningZH: "无价之宝、难以估量。",
        },
      },
      {
        lineNum: 1913,
        textDE: "Aus lieber Hand besaß. Der Stein war ein",
        translationZH: "那是挚爱之人的亲手馈赠。戒面镶嵌着一颗",
        speaker: "Nathan",
      },
      {
        lineNum: 1914,
        textDE: "Opal, der hundert schöne Farben spielte,",
        translationZH: "能变幻流转上百种绚丽光彩的欧泊蛋白石，",
        speaker: "Nathan",
        stilmittel: {
          type: "Metapher des Opals (蛋白石色彩隐喻)",
          descDE: "Der vielfarbige Opal spiegelt die Vielgestaltigkeit und Brechung göttlicher Wahrheit wider.",
          descZH: "欧泊石能流转百色，象征绝对真理在不同民族文化与时代折射出的丰富斑斓光谱，反对单色独断。",
        },
      },
      {
        lineNum: 1915,
        textDE: "Und hatte die geheime Kraft, vor Gott",
        translationZH: "并且蕴藏着一股神圣而奇异的隐秘伟力：",
        speaker: "Nathan",
      },
      {
        lineNum: 1916,
        textDE: "Und Menschen angenehm zu machen, wer",
        translationZH: "凡怀着这般坚定确信虔诚佩戴它的人，",
        speaker: "Nathan",
      },
      {
        lineNum: 1917,
        textDE: "In dieser Zuversicht ihn trug. Was Wunder,",
        translationZH: "便能在上帝与全人类眼前皆蒙受恩宠与喜爱。",
        speaker: "Nathan",
        stilmittel: {
          type: "Pragmatische Bedingung (实践信德前提)",
          descDE: "Die Wirkung ist an die innere Gesinnung gebunden („in dieser Zuversicht“).",
          descZH: "‘In dieser Zuversicht’：指环效力绝非巫术物神崇拜，而是要求佩戴者内在具备崇高的行善信德。",
        },
        toneCategory: "moral",
      },
      {
        lineNum: 1928,
        textDE: "Der Richter sprach: Wenn ihr mir nun den Vater",
        translationZH: "智慧的法官这样裁决道：若你们现在不能将父亲",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1929,
        textDE: "Nicht bald zur Stelle schafft, so treib' ich euch",
        translationZH: "立即传唤到我的公堂法席之上，那我立刻就要将你们",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1930,
        textDE: "Von meinem Stuhle. Denkt ihr, daß ich Rätsel",
        translationZH: "逐出我的法庭！难道你们以为我坐在此处，",
        speaker: "Nathan / Richter",
        stilmittel: {
          type: "Rhetorische Abwehr (拒绝形而上猜谜)",
          descDE: "Der Richter weist dogmatische Spitzfindigkeiten als unlösbare Rätsel ab.",
          descZH: "启蒙法官断然拒绝充当无谓神学空谈的解谜裁判。",
        },
      },
      {
        lineNum: 1931,
        textDE: "Zu lösen da bin? Oder harrt ihr, bis",
        translationZH: "是为了替你们解谜猜字？抑或你们是在翘首以盼，",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1932,
        textDE: "Der rechte Ring den Mund eröffne? – Doch",
        translationZH: "直到那枚真正的真指环自己开口说话？——然而",
        speaker: "Nathan / Richter",
        stilmittel: {
          type: "Ironische Personifikation (讽刺拟人)",
          descDE: "Spott über den Aberglauben, ein materielles Objekt könne Wahrheit bezeugen.",
          descZH: "以拟人化讽刺把物质器物当成绝对真理神启的荒谬迷信。",
        },
      },
      {
        lineNum: 1933,
        textDE: "Halt! Hört ihr nicht, der rechte Ring besitzt",
        translationZH: "且慢！你们难道未曾听说，那枚真指环拥有一种",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1934,
        textDE: "Die Wunderkraft, beliebt zu machen; vor",
        translationZH: "令人亲近喜悦的奇迹伟力，在上帝与",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1935,
        textDE: "Gott und Menschen angenehm? Das muß",
        translationZH: "全人类面前彰显博爱喜悦？这必然就是",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1936,
        textDE: "Entscheiden! Denn die falschen Ringe werden",
        translationZH: "唯一的决断判据！因为伪造的赝品指环",
        speaker: "Nathan / Richter",
        stilmittel: {
          type: "Kriterium der Praxis (实践检验真理)",
          descDE: "Wahrheit offenbart sich nicht im Bekenntnis, sondern in gelebter Humanität.",
          descZH: "真理的唯一检验标准不在于教条口号宣称，而在于日常生活中流淌出的人道仁爱。",
        },
        toneCategory: "moral",
      },
      {
        lineNum: 1937,
        textDE: "Doch das nicht können! – Nun; wen lieben zwei",
        translationZH: "绝不可能拥有这等行善利他的力量！——那么请讲，你们三人之中",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1938,
        textDE: "Von euch am meisten? Macht, sagt an! Ihr schweigt?",
        translationZH: "究竟有谁被其余两人所由衷爱戴？快回答啊！为何尽皆哑口无言？",
        speaker: "Nathan / Richter",
        stilmittel: {
          type: "Beredtes Schweigen (哑口无言的反诘)",
          descDE: "Das Schweigen der Söhne entlarvt ihren dogmatischen Hochmut und Neid.",
          descZH: "三兄弟的死寂沉默，无情戳穿了他们争夺独家真理名分背后的自私狂妄与嫉妒。",
        },
      },
      {
        lineNum: 1941,
        textDE: "Am meisten? – O so seid ihr alle drei",
        translationZH: "最深？——啊，这么说来，你们三个人",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1942,
        textDE: "Betrogene Betrüger! Eure Ringe",
        translationZH: "全都是受了欺骗的骗子！你们手中的指环",
        speaker: "Nathan / Richter",
        stilmittel: {
          type: "Oxymoron / Paradoxon (悖论金句)",
          descDE: "„Betrogene Betrüger“ demontiert den dogmatischen Ausschließlichkeitsanspruch.",
          descZH: "‘Betrogene Betrüger’（受骗的骗子）：德语戏剧史最著名悖论，彻底砸碎宗派唯我独尊的幻觉。",
        },
        toneCategory: "spott",
      },
      {
        lineNum: 1943,
        textDE: "Sind alle drei nicht echt. Der echte Ring",
        translationZH: "统统全都不是真货！那枚唯一的真正祖传指环，",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1944,
        textDE: "Vermutlich ging verloren. Die Verlierung",
        translationZH: "恐怕早已在不可考的幽暗岁月中遗失了。而父亲",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1945,
        textDE: "Zu bergen, dem Verlust zu steuern, ließ",
        translationZH: "为了弥补缺憾、为了对三个儿子展现平等的父爱，",
        speaker: "Nathan / Richter",
      },
      {
        lineNum: 1946,
        textDE: "Der Vater drei für einen machen.",
        translationZH: "才特意命工匠以一枚为蓝本，铸造了三枚毫无二致的指环！",
        speaker: "Nathan / Richter",
        stilmittel: {
          type: "Pädagogischer Humanismus (平等博爱假说)",
          descDE: "Die absolute theologische Wahrheit ist transzendent und ungreifbar; vor Gott sind alle gleich.",
          descZH: "神圣绝对真理是超验不可把握的；在父亲（上帝）眼中，所有诚挚践行善德的子民一律平等受造。",
        },
        toneCategory: "moral",
      },
    ],
    questions: [
      {
        id: "q-nathan-1",
        dimension: "inhalt",
        titleDE: "1. Inhalt & Parabelstruktur",
        titleZH: "指环寓言的情节设定与试探本质",
        afb: "AFB I",
        questionDE:
          "Warum wählt Nathan die Form einer Parabel, um auf Saladins Frage nach der 'wahren Religion' zu antworten?",
        questionZH:
          "纳坦为何不直接正面指认犹太教为唯一正教，而是选择以‘三枚指环’的虚构寓言来回答苏丹萨拉丁的盘问？",
        options: [
          {
            id: "a",
            textDE:
              "Um der dogmatischen Fangfrage auszuweichen und das theologische Streitgespräch auf eine ethisch-praktische Handlungsebene zu heben.",
            textZH:
              "为了避开非此即彼的宗派政治圈套，通过寓言类比将神学教条之争转化为普遍的人道伦理与善行竞赛。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Weil er die arabische Sprache nicht beherrscht und sich nur in Fabeln ausdrücken kann.",
            textZH:
              "因为纳坦不熟悉宫廷阿拉伯语，词汇匮乏，只能借用通俗民间童话故事来敷衍苏丹的召见。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er möchte Saladin drei echte Juwelen verkaufen, um sein Handelsvermögen zu vergrößern.",
            textZH:
              "他企图借此机会向财政拮据的萨拉丁推销三枚高价欧泊宝石，以赚取巨额商业暴利。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Nathan erkennt die Falle: Nennt er das Judentum, beleidigt er Saladin; nennt er den Islam, verleugnet er seinen Glauben. Die Parabel ermöglicht eine philosophische Entschärfung.",
        explanationZH:
          "【正解依据与文本锚点】\n纳坦深知苏丹的提问暗藏杀机：若称犹太教为真，必触怒穆斯林统治者；若顺从称伊斯兰教为真，则背叛了祖辈信仰。纳坦运用启蒙理性思维，以指环寓言（Ringparabel）将‘哪门宗教是真理’的形而上死结，转化为‘哪位信徒更能践行博爱’的道德实践检验。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（低级事实捏造）：纳坦通晓多种语言与东方文化，寓言是苏格拉底产婆术与启蒙对话的最高艺术，绝非语言障碍；\n• 选项 C 诊断（物质市侩化曲解）：将启蒙人道思想家降格为推销珠宝的奸商，完全脱离了戏剧哲思核心。\n\n【时代思潮与哲学脉络】\n莱辛代表了德国启蒙运动（Aufklärung）对宗教狂热与宗派排他主义的批判：真理绝非静止垄断的教条财产，而是需要在历史长河中通过善行（tätige Liebe）不断自证的过程。",
        klausurSatzDE:
          "Lessing bedient sich der Parabelform als aufklärerischem Erkenntnisinstrument: Nathan dekonstruiert Saladins dogmatische Fragestellung und substituiert theologische Orthodoxie durch eine säkulare Ethik gelebter Humanität.",
        klausurSatzZH:
          "莱辛运用寓言体裁作为启蒙认识论的核心解剖利刃：纳坦成功解构了萨拉丁教条主义的试探圈套，以活生生的世俗人道主义伦理彻底置换了僵死封闭的神学正统之争。",
        ehzKeyPointsDE: [
          "Funktion der Parabel als didaktisches Medium der Aufklärung.",
          "Vermeidung des diplomatischen und theologischen Dilemmas vor Saladin.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Parabelanalyse 4P)：精准阐释寓言作为启蒙教育媒介解构教条主义的核心功能。",
          "采分点 2 (Dilemma-Auflösung 4P)：深入剖析纳坦化解政治圈套、将神学争端转向伦理实践的论证策略。",
        ],
      },
      {
        id: "q-nathan-2",
        dimension: "stilmittel",
        titleDE: "2. Symbolik & Stilmittel",
        titleZH: "欧泊蛋白石与指环的象征体系",
        afb: "AFB II",
        questionDE:
          "Welche tiefere symbolische Bedeutung trägt der 'Opal, der hundert schöne Farben spielte' (V. 1914)?",
        questionZH:
          "第 1914 行中能变幻‘流转上百种绚丽光彩的欧泊蛋白石’（Opal）究竟蕴藏着怎样的哲学象征意蕴？",
        options: [
          {
            id: "a",
            textDE:
              "Er symbolisiert die Pluralität und facettenreiche Brechung der göttlichen Wahrheit in verschiedenen Kulturen und Epochen.",
            textZH:
              "它象征神圣真理的多元性与折射性：绝对真理如同光芒照入欧泊石，在不同的民族、时代与文化语境中呈现出缤纷多彩却同归于善的绚丽面貌。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Der Opal steht für magische Alchemie und zeigt, dass Lessing an Zauberkräfte glaubte.",
            textZH:
              "蛋白石代表中世纪炼金术的巫术道具，表明莱辛本质上是一位迷信超自然神力的神秘主义者。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er zeigt lediglich die optische Eigenschaft von Mineralien ohne jeglichen philosophischen Bezug.",
            textZH:
              "这仅仅是莱辛对自然界矿物光学物理特性的客观罗列，不具备任何思想史层面的象征隐喻。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Opal bricht das einfallende Licht in unendliche Nuancen. Ebenso ist Religion keine monochrome Einheitslehre, sondern ein lebendiges Mosaik der Menschheitskultur.",
        explanationZH:
          "【正解依据与文本锚点】\n欧泊石（Opal）是莱辛戏剧构思的神来之笔：单色宝石象征僵化死板的教条独尊，而欧泊石‘hundert schöne Farben spielte’，恰恰隐喻绝对的光明真理在尘世历史中必然折射为犹太、基督、伊斯兰等多元文化形态，每一道色彩皆有其不可替代的美善与尊严。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（时代思潮错置）：启蒙运动坚决反击巫术迷信与超自然盲从，指环的‘魔力’在后文被法官明确解释为信徒内心的道德向善意志；\n• 选项 C 诊断（文学象征盲视）：将经典戏剧核心道具降格为无意义的矿物描写，忽视了启蒙文学象征体系（Symbolik）。\n\n【时代思潮与哲学脉络】\n斯宾诺莎泛神论与莱辛的真理观：人类有限的理性永远无法独占完整的神性全貌，正如多色欧泊，承认多样性（Pluralität）才是走向普遍宽容的唯一阶梯。",
        klausurSatzDE:
          "Das Farbenspiel des Opals fungiert als signifikantes Sinnbild aufklärerischer Wahrheitstheorie: Wahrheit existiert nicht als monolithisches Dogma, sondern offenbart sich als polychromes Kontinuum menschlicher Sittlichkeit.",
        klausurSatzZH:
          "欧泊石的斑斓色彩扮演着启蒙真理观的关键象征：真理绝非铁板一块的单一教条垄断，而是作为人类崇高道德实践的多彩色谱而显现。",
        ehzKeyPointsDE: [
          "Interpretation des Opals als Symbol für Toleranz und Wahrheitsvielfalt.",
          "Verknüpfung von ästhetischer Form und philosophischer Botschaft der Aufklärung.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Symbolik 4P)：精准阐发欧泊多色变幻对宗教多元共存与反教条主义的象征内涵。",
          "采分点 2 (Form-Funktion 4P)：深度联系莱辛文学生动性与启蒙哲学宽容纲领的内在有机契合。",
        ],
      },
      {
        id: "q-nathan-3",
        dimension: "argumentation",
        titleDE: "3. Richterurteil & Beweislast",
        titleZH: "法官判决与举证责任倒置",
        afb: "AFB II",
        questionDE:
          "Inwiefern vollzieht der Richter (V. 1928–1946) eine fundamentale Umkehrung der Beweislast?",
        questionZH:
          "聪慧的法官在第 1928–1946 行的终审判决中，如何巧妙实现了举证责任的颠覆性逆转？",
        options: [
          {
            id: "a",
            textDE:
              "Er verlangt nicht den historischen Nachweis der Echtheit, sondern fordert jeden Sohn auf, die Kraft des Rings durch gelebte Nächstenliebe und vorurteilsloses Handeln erst in der Zukunft zu beweisen.",
            textZH:
              "他不再纠缠于考察指环在历史源头上是否正统真伪，而是将三兄弟推向未来：要求每个人各自以毫无偏私的宽容仁爱与道德品行，在有生之年主动证明自己指环的真理力量。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er verurteilt alle drei Söhne zu Gefängnisstrafen wegen Betrugs und konfisziert das Erbe für die Stadt.",
            textZH:
              "他以涉嫌伪造假冒遗产的欺诈罪，将三兄弟全部判处长期监禁，并将三枚指环收归法庭国库公有。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er lässt durch ein Gottesurteil im Duell entscheiden, wer den echten Ring behalten darf.",
            textZH:
              "他重拾中世纪蒙昧的神明裁判法，要求三兄弟举行持剑殊死决斗，以生还者判定真指环归属。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Richterspruch verlegt das Kriterium der Wahrheit von der Vergangenheit (Herkunft/Kaufbeleg) in die ethische Zukunft (Handlungswirksamkeit).",
        explanationZH:
          "【正解依据与文本锚点】\n第 1933–1946 行是整出戏剧的思想冠冕：法官发现指环的效力在于‘beliebt zu machen vor Gott und Menschen’。既然三兄弟互不相让、相互攻讦，说明他们当下的指环全是无效的死物（‘Betrogene Betrüger’）。法官发出伟大的启蒙判词：‘Es eifre jeder seiner unbestoch'nen, von Vorurteilen freien Liebe nach!’谁能在千百年后最受世人爱戴，谁手中的指环便是真品！\n\n【干扰项逐项诊断】\n• 选项 B 诊断（法学专制误判）：启蒙法官不是专制暴君，他不行使暴力惩戒，而是实施哲学启蒙与道德规劝；\n• 选项 C 诊断（历史反动）：神裁决斗是中世纪蒙昧落后的产物，与莱辛宣扬的理性法理精神背道而驰。\n\n【时代思潮与哲学脉络】\n康德实践理性优先与莱辛的历史教育学：历史性的启示宗教（Offenbarungsreligion）不过是人类幼年期的摇篮，人类最终必将走向基于道德自律的理性宗教（Vernunftreligion）。",
        klausurSatzDE:
          "Durch den Urteilsspruch des Richters transformiert Lessing die theologische Verifikationskrise in einen zukunftsoffenen moralischen Handlungsimperativ: Echtheit erweist sich ausschließlich in tätiger Praxis und vorurteilsfreier Humanität.",
        klausurSatzZH:
          "通过法官的精妙判词，莱辛将神学考据的证实危机彻底升华为面向未来的道德行动命令：真理的真实性唯有在积极作为的善行与毫无偏见的博爱中方能显现其合法性。",
        ehzKeyPointsDE: [
          "Analyse der Verlagerung von historischer Dogmatik zu zukunftsorientierter Ethik.",
          "Erläuterung des Konzepts der praktischen Bewährung vor Gott und Menschen.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Argumentationsgang 4P)：深刻梳理从探究历史真伪向面向未来伦理实践的举证逻辑跃迁。",
          "采分点 2 (EHZ-Prüfung 4P)：精准阐释‘实践自证’（praktische Bewährung）在北威州会考标准答案中的核心提分表述。",
        ],
      },
      {
        id: "q-nathan-4",
        dimension: "theorie",
        titleDE: "4. Aufklärung & Moderner Pluralismus",
        titleZH: "启蒙宽容观与当代宪政秩序",
        afb: "AFB III",
        questionDE:
          "Inwieweit lässt sich Lessings aufklärerisches Toleranzkonzept als Vorläufer des modernen, säkularen Verfassungsstaates (z.B. Art. 4 GG) beurteilen?",
        questionZH:
          "在何种程度上，我们可以将莱辛在《智者纳坦》中确立的启蒙宽容原则，评估为现代世俗宪政国家（如德国《基本法》第4条宗教自由）的先驱基石？",
        options: [
          {
            id: "a",
            textDE:
              "Lessing antizipiert die staatliche Neutralitätspflicht und Religionsfreiheit, indem er den Staat bzw. die Vernunft über dogmatische Exklusivitätsansprüche stellt und friedliche Koexistenz zur obersten Bürgerpflicht erhebt.",
            textZH:
              "莱辛极具前瞻性地奠定了国家宗教中立与信仰自由的雏形：他将理性与法律置于教条独断之上，将维护多元共存与相互尊重的实践善行确立为公民的最高契约义务。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Lessings Modell fordert die gewaltsame Abschaffung aller Religionen und die Errichtung einer atheistischen Diktatur.",
            textZH:
              "莱辛的思想实质上主张以专制国家机器暴力取缔一切宗教信仰，建立绝对反神论的极权统治。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Das Konzept ist im 21. Jahrhundert völlig überholt, da es keinerlei Relevanz für interkulturelle Konflikte besitzt.",
            textZH:
              "这一理念在21世纪已毫无价值，因为面对现代复杂的文化冲突与原教旨主义，古典戏剧的温情说教早已破产。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Lessings Werk bildet das ethische Fundament für Artikel 4 des Grundgesetzes (Freiheit des Glaubens und Gewissens).",
        explanationZH:
          "【正解依据与文本锚点】\n德国《基本法》Art. 4 Abs. 1 GG（‘Die Freiheit des Glaubens, des Gewissens und die Freiheit des religiösen und weltanschaulichen Bekenntnisses sind unverletzlich’）在思想史上直接承袭了莱辛的宽容命题：国家不裁定哪门宗教在教理上正确，国家保护每一个公民平等自由地信奉其神明并和平共处。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（极左狂热误判）：莱辛反对的是宗教狂热（Fanatismus）与盲从，而非消灭宗教情感；\n• 选项 C 诊断（虚无主义短视）：全盘抹杀古典文学对现代人权秩序的立法启示，违背 AFB III 客观辩证评估规范。\n\n【时代思潮与哲学脉络】\n从约翰·洛克《论宗教宽容》到莱辛，再到哈贝马斯后世俗社会理论：在公共领域中，宗教信徒必须学会用世俗通约的理性语言表达诉求，这与纳坦用人道善行论证指环真谛完全互为表里。",
        klausurSatzDE:
          "In einem theologiekritischen Fazit erweist sich Nathan der Weise als visionäres Gründungsdokument des liberalen Verfassungsstaates: Indem Lessing den metaphysischen Absolutheitsanspruch delegitimiert, bahnt er den Weg für die verfassungsrechtliche Garantie universeller Gewissens- und Religionsfreiheit.",
        klausurSatzZH:
          "在总结性学术审视中，《智者纳坦》确凿无疑地构成了自由宪政国家的奠基性思想文献：莱辛通过彻底剥夺形而上学排他性真理的合法性，为现代宪法保障普遍信仰自由与良知自由扫清了关键道路。",
        ehzKeyPointsDE: [
          "Transfer der Ringparabel auf die Grundrechte moderner Demokratien (Art. 4 GG).",
          "Kritische Würdigung der Grenzen von Toleranz gegenüber Intoleranz.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Transfer 4P)：高水平将指环寓言的宽容哲学迁移映射至德国《基本法》第4条基本人权。",
          "采分点 2 (AFB III Urteil 4P)：辩证指出宽容原则面对不宽容原教旨挑战时的法治防卫底线（防卫性民主思想呼应）。",
        ],
      },
    ],
  },

  // =========================================================================
  // 8. DEUTSCH: Friedrich Schiller — Kabale und Liebe (Miller vs. Präsident)
  // =========================================================================
  {
    id: "kabale-miller-praesident",
    fach: "Deutsch",
    genre: "Drama",
    author: "Friedrich Schiller",
    workTitleDE: "Kabale und Liebe",
    workTitleZH: "《阴谋与爱情》",
    sceneTitleDE: "Zweiter Akt, fünfter Auftritt: Miller gegen den Präsidenten",
    sceneTitleZH: "第二幕第五场：平民乐师米勒抗衡宰相（市民尊严的觉醒）",
    versesRange: "Akt II, Szene 5",
    epochDE: "Sturm und Drang (1767–1785) / Bürgerliches Trauerspiel",
    epochZH: "狂飙突进运动 (1767–1785) / 市民悲剧",
    dramaticConflictDE:
      "Der absolutistische Präsident von Walter dringt gewaltsam in das Haus des bürgerlichen Musikers Miller ein; Miller überwindet seine Standesfurcht und pocht auf sein Hausrecht.",
    dramaticConflictZH:
      "专制宰相冯·瓦尔特暴力闯入市民乐师米勒的私宅并污蔑其女；平民米勒冲破封建等级畏惧，以‘家宅即城堡’誓死捍卫女儿与市民阶层的人格尊严。",
    contextDE:
      "Präsident von Walter erfährt von der Heiratabsicht seines Sohnes Ferdinand mit der bürgerlichen Luise Miller. Begleitet von Schergen stürmt er Millers Wohnzimmer, um die Familie einzuschüchtern und die Verbindung gewaltsam zu zerstören.",
    contextZH:
      "封建贵族宰相冯·瓦尔特得知爱子斐迪南誓娶平民乐师之女露易丝。深感贵族门第蒙羞的宰相率领打手法警公差蛮横闯入米勒客厅，企图通过抄家恫吓强行斩断恋情。",
    verses: [
      {
        lineNum: 1,
        textDE: "PRÄSIDENT. Wer bezahlt dich dafür, Kuppler?",
        translationZH: "宰相：老皮条客，这桩买卖别人付了你多少赏钱？",
        speaker: "Präsident",
        toneCategory: "autoritaet",
        stilmittel: {
          type: "Feudale Invektive & Entwürdigung (封建辱骂挑衅)",
          descDE: "Die Schmähung als „Kuppler“ degradiert die bürgerliche Familie zur moralischen Verkommenheit.",
          descZH: "‘皮条客’的下流蔑称将清白自守的市民家庭肆意踩踏至道德泥潭，展露封建贵族的傲慢专横。",
        },
      },
      {
        lineNum: 2,
        textDE: "MILLER. Ich heiße Miller, wenn der Herr mich bei meinem ehrlichen Namen rufen wollen.",
        translationZH: "米勒：大人要是愿意以体面的尊姓呼唤我，鄙人行不改名坐不改姓，叫米勒！",
        speaker: "Miller",
        toneCategory: "moral",
        stilmittel: {
          type: "Selbstbehauptung (直面权贵自正名分)",
          descDE: "Miller korrigiert die Beleidigung sofort durch das Beharren auf seinen bürgerlichen Namen.",
          descZH: "米勒不卑不亢立刻反唇相讥，以平民的体面正名截断贵族居高临下的羞辱。",
        },
      },
      {
        lineNum: 3,
        textDE: "PRÄSIDENT. Die Hure soll vor Gericht! Wer ist das Mädchen?",
        translationZH: "宰相：那个娼妇必须押上公堂法办！这贱丫头究竟是谁？",
        speaker: "Präsident",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 4,
        textDE: "MILLER. Mein Mädchen! Mein Fleisch und mein Blut! Wer ihr zu nahe tritt, der schlägt mir ins Gesicht!",
        translationZH: "米勒：是我的亲闺女！是我身上掉下来的骨肉！谁要是敢动她一根汗毛，就是当面狠狠抽我米勒的耳光！",
        speaker: "Miller",
        stilmittel: {
          type: "Metaphorik des Blutes & Klimax (血肉深情渐强抗辩)",
          descDE: "Naturrechtliche Väterlichkeit triumphiert über feudale Standesunterwerfung.",
          descZH: "‘Mein Fleisch und Blut’：以天然神圣的父爱血缘直面碾压冷酷的封建等级奴役。",
        },
        toneCategory: "leidenschaft",
      },
      {
        lineNum: 5,
        textDE: "PRÄSIDENT. Schafft mir das Pack aus den Augen! Schergen, fasst sie an!",
        translationZH: "宰相：快把这帮叫花子贱民拖开！公差们，给我拿下他们！",
        speaker: "Präsident",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 6,
        textDE: "MILLER. Herr! Meine Stube ist mein Fürstentum! Über meine Schwelle kommst du mir nicht mit Gewalt!",
        translationZH: "米勒：大人！这间狭小的客厅就是我米勒的公国诸侯领地！跨过我的门槛，你休想凭借暴力在此为所欲为！",
        speaker: "Miller",
        stilmittel: {
          type: "Hyperbel & Rechtstopos (家宅即城堡的市民神圣法权)",
          descDE: "„Meine Stube ist mein Fürstentum“: Miller beansprucht dieselbe Souveränität im Privaten wie der Fürst im Staat.",
          descZH: "名垂德语文学史的名句：米勒将简陋私宅拔高为‘公国领地’，宣布市民私人空间与君王诸侯同样神圣不可侵犯！",
        },
        toneCategory: "leidenschaft",
      },
      {
        lineNum: 7,
        textDE: "PRÄSIDENT. Ins Zuchthaus mit dem Halunken! Die Dirne an den Pranger!",
        translationZH: "宰相：把这老无赖关进苦役监狱！把这下流小娘们绑上闹市耻辱柱游街示众！",
        speaker: "Präsident",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 8,
        textDE: "LUISE. Vater! Rette mich! Mein Gewissen ist rein vor Gott!",
        translationZH: "露易丝：爹爹！救救女儿！在全能的上帝面前，女儿的良知清清白白！",
        speaker: "Luise",
        toneCategory: "krise",
      },
      {
        lineNum: 9,
        textDE: "MILLER. Halt, Schandvogt! Wer mir die Ehre antastet, der kriegt ein Paar Ohrenfeigen, und wenn er ein Herzog wäre!",
        translationZH: "米勒：站住，你这无耻狗官！谁敢玷污老子的清白名誉，老子就当场赏他两记响亮大耳光，哪怕他是公爵大公也休想例外！",
        speaker: "Miller",
        stilmittel: {
          type: "Plebejische Furie & Pleonasmus (平民怒火与暴力自卫)",
          descDE: "Bruch sämtlicher Standesschranken; Androhung physischer Gewalt gegen den obersten Staatsdiener.",
          descZH: "封建阶级秩序彻底崩塌：平民音乐家公然威胁要殴打最高专制宰相，狂飙突进反叛精神喷薄而出。",
        },
        toneCategory: "leidenschaft",
      },
    ],
    questions: [
      {
        id: "q-kabale-1",
        dimension: "inhalt",
        titleDE: "1. Handlungsanalyse & Ständekonflikt",
        titleZH: "客厅突袭事件的阶级冲突本质",
        afb: "AFB I",
        questionDE:
          "Welche dramaturgische Funktion erfüllt der gewaltsame Auftritt des Präsidenten in Millers bürgerlicher Stube?",
        questionZH:
          "封建宰相强行闯入平民乐师米勒的客厅，在全剧的戏剧冲突推进中承担了何种关键功能？",
        options: [
          {
            id: "a",
            textDE:
              "Er markiert die brutale Kollision zweier unvereinbarer Welten: Die absolutistische Willkür des Adels bricht unerbittlich in die geschützte moralische Intimsphäre des Bürgertums ein.",
            textZH:
              "它标志着两个水火不容世界的毁灭性碰撞：封建贵族不受制约的专制横暴，蛮横撕裂了市民阶层竭力捍卫的道德伦理私密城堡，将阶级绝裂推向无可挽回的极点。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Der Präsident möchte sich für die Verlobung bedanken und der Braut wertvolle Geschenke überreichen.",
            textZH:
              "宰相专程登门是为了向米勒一家道喜祝贺订婚，并准备当场向未来的平民儿媳赠送珍贵聘礼。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er möchte eine Musikausbildung bei Miller beginnen, um Cello spielen zu lernen.",
            textZH:
              "他微服私访是为了拜米勒为师学习大提琴演奏，属于纯粹的业余音乐艺术交流活动。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Raum der 'Stube' ist im bürgerlichen Trauerspiel das Zentrum sittlicher Autonomie. Das Eindringen des Hofes zerstört diese Zuflucht.",
        explanationZH:
          "【正解依据与文本锚点】\n在启蒙与狂飙突进市民悲剧（Bürgerliches Trauerspiel）中，‘Stube’（客厅）是市民家庭免受宫廷腐朽侵蚀的道德避难所。宰相不仅人身入侵，更以‘Hure’（娼妇）、‘Kuppler’（皮条客）对这一神圣空间实施语言强暴，彻底宣告了斐迪南与露易丝跨阶级纯洁爱情在封建等级社会中的必然幻灭。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（讽刺性黑白颠倒）：宰相视跨阶级通婚为家族奇耻大辱，此行目的是抓人摧毁恋情；\n• 选项 C 诊断（荒诞降智构陷）：完全脱离剧本严肃的政治悲剧定调。\n\n【时代思潮与哲学脉络】\n狂飙突进运动对德国小邦专制暴政（Fürstenwillkür）的愤怒控诉：青年席勒以笔为投枪，无情鞭笞官僚权贵对平民人权的肆意践踏。",
        klausurSatzDE:
          "Schiller inszeniert das gewaltsame Eindringen des Präsidenten als paradigmatischen Raumkonflikt: Die bürgerliche Stube als Hort tugendhafter Autonomie wird durch den absolutistischen Machtanspruch des Adels entweiht, was die Unüberbrückbarkeit des Ständekonflikts besiegelt.",
        klausurSatzZH:
          "席勒将宰相的暴力侵入编排为典范性的空间政治冲突：市民客厅作为美德与自主性的避风港，遭到封建贵族专制强权的肆意亵渎，从而无可辩驳地宣告了阶级鸿沟的不可逾越性。",
        ehzKeyPointsDE: [
          "Analyse des Eindringens der höfischen Welt in den bürgerlichen Schutzraum.",
          "Funktion der Szene als Beschleuniger der tragischen Katastrophe.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Raumanalyse 4P)：精准阐释‘宫廷入侵市民私密空间’在悲剧冲突激化中的象征动力。",
          "采分点 2 (Katastrophendynamik 4P)：深刻梳理该场景如何促使斐迪南拔剑反抗、催生宰相阴谋信件的后续因果链。",
        ],
      },
      {
        id: "q-kabale-2",
        dimension: "figuren",
        titleDE: "2. Soziolekt & Machtkampf",
        titleZH: "阶层语言特征与权力天平反转",
        afb: "AFB II",
        questionDE:
          "Wie wandelt sich Millers Haltung und Sprache im Verlauf des Auftritts von anfänglicher Furcht zu rebellischer Wut?",
        questionZH:
          "在整场对话交锋中，米勒乐师的语言语调与心理态度经历了怎样从初始畏惧到奋起抗争的剧烈突变？",
        options: [
          {
            id: "a",
            textDE:
              "Von serviler Höflichkeit schlägt seine Sprache in plebejischen Furor um: Als seine Vaterwürde verletzt wird, bricht er mit allen feudalen Respektsnormen und droht dem Präsidenten physische Gewalt an.",
            textZH:
              "从起初敬称‘Herr’的克制礼节，剧变为平民怒不可遏的狂暴反击：当父亲的人格尊严与女儿清白遭遇践踏时，他彻底撕破所有等级敬语假面，公然威胁对最高权贵施加肉体耳光痛击。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Er bleibt vom Anfang bis zum Ende der Szene völlig apathisch und unterschreibt kampflos die Verbannung seiner Tochter.",
            textZH:
              "米勒从头到尾表现得极度麻木懦弱，任凭宰相辱骂殴打，并主动在流放女儿的契约上签字画押。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Er verfällt in gereimte Barockverse und bittet den Präsidenten unter Tränen um eine fürstliche Rente.",
            textZH:
              "他突然念诵起巴洛克式的押韵赞美诗，泪流满面跪求宰相为他发放一份体面的宫廷养老金。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Miller verkörpert den heraufziehenden Bürgerstolz: Gegen die Dekadenz des Hofes setzt er den moralischen Ernst des ehrlichen Handwerkers.",
        explanationZH:
          "【正解依据与文本锚点】\n关注语言句式的剧烈升温：\n1. 第 2 行：‘Ich heiße Miller...’（冷静而坚定的自尊）；\n2. 第 6 行：‘Meine Stube ist mein Fürstentum!’（建立法理边界）；\n3. 第 9 行：‘Halt, Schandvogt! ...kriegt ein Paar Ohrenfeigen, und wenn er ein Herzog wäre!’（狂暴的反抗怒火）。\n米勒完成了从‘等级秩序顺民’向‘自由自主公民’的心智突变。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（性格形象歪曲）：米勒是狂飙突进运动中最富血性的平民父亲形象，绝非软弱奴才；\n• 选项 C 诊断（文体风格错乱）：席勒采用的是充满力度的市民散文口语（Prosasprache），而非华丽巴洛克格律。\n\n【时代思潮与哲学脉络】\n让-雅克·卢梭的自然人论断：封建头衔不过是人造的枷锁，在自然的生身父母之爱面前，宰相的权杖变得苍白脆弱。",
        klausurSatzDE:
          "Schiller gestaltet Millers Sprachduktus als dynamischen Emanzipationsakt: Die Entladung plebejischer Wut culminiert im Bruch ständischer Deferenz und antizipiert das revolutionäre Selbstbewusstsein des aufbegehrenden Bürgertums.",
        klausurSatzZH:
          "席勒将米勒的语言语调塑造成动态的个性解放行动：平民怒火的喷薄爆发彻底终结了封建卑躬屈膝的奴颜，极富先瞻性地宣告了觉醒市民阶层革命性的独立自我意识。",
        ehzKeyPointsDE: [
          "Nachweis des Umschlagspunkts von Defensivhaltung zu offener Rebellion.",
          "Funktionsanalyse des bürgerlichen Vokabulars (Ehre, Fürstentum, Züchtigen).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Dynamik 4P)：敏锐捕捉米勒由防御克制向决绝反叛转化的戏剧质变节点。",
          "采分点 2 (Soziolekt-Analyse 4P)：精准分析市民核心词汇（Ehre, Fürstentum, Ohrenfeigen）所承载的阶级自尊抗衡功能。",
        ],
      },
    ],
  },

  // =========================================================================
  // 9. DEUTSCH: Johann Wolfgang von Goethe — Willkommen und Abschied (Erlebnislyrik)
  // =========================================================================
  {
    id: "goethe-willkommen-abschied",
    fach: "Deutsch",
    genre: "Lyrik",
    author: "Johann Wolfgang von Goethe",
    workTitleDE: "Willkommen und Abschied",
    workTitleZH: "《重逢与别离》",
    sceneTitleDE: "Strophen 1 & 2: Der nächtliche Ritt (Die Erlebnislyrik des Sturm und Drang)",
    sceneTitleZH: "第 1–2 节：深夜奔赴（狂飙突进体验诗与自然激情）",
    versesRange: "Strophe 1 & 2 (Vers 1–16)",
    epochDE: "Sturm und Drang (1771)",
    epochZH: "狂飙突进运动 (1771 / 塞森海姆时期)",
    meterOverviewDE:
      "Vierhebiger Jambus (˘ ´ | ˘ ´ | ˘ ´ | ˘ ´) im Kreuzreim (abab cdcd) mit alternierender weiblicher und männlicher Kadenz.",
    meterOverviewZH:
      "四音步抑扬格（˘ ´），交错韵（abab cdcd），柔性阴韵与沉重阳韵交替，形成奔腾向前的马蹄节奏与内心情感悸动。",
    contextDE:
      "Während seiner Straßburger Studienzeit ritt der junge Goethe oft heimlich in der Abenddämmerung nach Sesenheim, um seine Geliebte Friederike Brion zu treffen. Das Gedicht gilt als Ursprung der modernen deutschen Erlebnislyrik.",
    contextZH:
      "在斯特拉斯堡求学期间，青年歌德常常在黄昏暗夜中策马狂奔至塞森海姆与恋人弗里德里克幽会。本诗被公认为德国现代‘体验抒情诗’（Erlebnislyrik）的开山巅峰之作。",
    verses: [
      {
        lineNum: 1,
        textDE: "Es schlug mein Herz, geschwind zu Pferde!",
        translationZH: "我的心狂跳不止，快快跃上骏马！",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´ ˘",
        reimschema: "a",
        kadenz: "weiblich",
        toneCategory: "leidenschaft",
        stilmittel: {
          type: "Inversion & Imperativischer Impuls (倒装与行动召唤)",
          descDE: "„Es schlug mein Herz“ stellt die emotionale Erregung an den Beginn; die Handlung folgt dem Gefühl.",
          descZH: "心脏怦怦狂跳的内心激情抢先置于句首，身体行动完全听命于炽烈的情感呼唤。",
        },
      },
      {
        lineNum: 2,
        textDE: "Es war getan fast eh gedacht;",
        translationZH: "行动几乎比动念头还要敏捷迅速；",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´",
        reimschema: "b",
        kadenz: "männlich",
        stilmittel: {
          type: "Antithese (Tat vs. Gedanke / 意念与行动的对抗)",
          descDE: "Abkehr von aufklärerischer Reflexion: Der Sturm-und-Drang-Held handelt aus Instinkt und Leidenschaft.",
          descZH: "彻底与启蒙理性的冷酷沉思决裂：狂飙突进的主体由本能与激情驱使，行动先于理智。",
        },
      },
      {
        lineNum: 3,
        textDE: "Der Abend wiegte schon die Erde,",
        translationZH: "暮色已然在轻轻摇曳抚慰大地，",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´ ˘",
        reimschema: "a",
        kadenz: "weiblich",
        stilmittel: {
          type: "Personifikation der Natur (自然拟人化)",
          descDE: "Der Abend als mütterliche, wiegende Kraft erzeugt eine trügerische Ruhe.",
          descZH: "暮霭化身为慈母般摇晃摇篮的温柔力量，与抒情主人公内心的焦灼奔腾形成对照。",
        },
      },
      {
        lineNum: 4,
        textDE: "Und an den Bergen hing die Nacht;",
        translationZH: "群山巍峨之巅已低垂笼罩着深沉暗夜；",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´",
        reimschema: "b",
        kadenz: "männlich",
      },
      {
        lineNum: 5,
        textDE: "Schon stand im Nebelkleid die Eiche,",
        translationZH: "橡树已然披上迷蒙轻裹的雾之衣衫，",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´ ˘",
        reimschema: "c",
        kadenz: "weiblich",
        stilmittel: {
          type: "Metapher des Nebelkleids (雾衣隐喻)",
          descDE: "Mythische Verkleidung der vertrauten Natur; Auflösung fester Konturen.",
          descZH: "‘Nebelkleid’：朦胧神秘的雾纱消融了客观物象的理性轮廓，大自然步入神话幻象。",
        },
      },
      {
        lineNum: 6,
        textDE: "Ein aufgetürmter Riese, da,",
        translationZH: "宛若一尊平地耸立拔起的巍峨巨人，",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´",
        reimschema: "d",
        kadenz: "männlich",
        stilmittel: {
          type: "Metapher & Hyperbel (巨人夸张意象)",
          descDE: "Die Eiche wird zum dämonischen Riesen; Projektion innerer Angstzustände.",
          descZH: "静止的古橡树在夜色中幻化为耸立巨人，外化了奔马骑士内心深处的畏惧与兴奋震撼。",
        },
      },
      {
        lineNum: 7,
        textDE: "Wo Finsternis aus dem Gesträuche",
        translationZH: "在那幽暗黑影丛生灌木之间，",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´ ˘",
        reimschema: "c",
        kadenz: "weiblich",
      },
      {
        lineNum: 8,
        textDE: "Mit hundert schwarzen Augen sah.",
        translationZH: "赫然睁开上百双漆黑森然的双眼窥探。",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´",
        reimschema: "d",
        kadenz: "männlich",
        stilmittel: {
          type: "Dämonisierung & Chiffre (大自然的鬼魅拟人)",
          descDE: "Die Dunkelheit wird aktiv blickend; Paranoia und Faszination der Nacht.",
          descZH: "黑暗竟生长出‘百双黑眼’贪婪窥伺，以恐怖鬼魅的意象烘托奔赴爱情路途的险阻与崇高感。",
        },
      },
      {
        lineNum: 9,
        textDE: "Der Mond von einem Wolkenhügel",
        translationZH: "明月在层叠堆积的云丘背后，",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´ ˘",
        reimschema: "e",
        kadenz: "weiblich",
      },
      {
        lineNum: 10,
        textDE: "Sah kläglich aus dem Duft hervor,",
        translationZH: "凄凉而哀愁地从薄雾轻岚中探头凝望，",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´",
        reimschema: "f",
        kadenz: "männlich",
        stilmittel: {
          type: "Anthropomorphisierung (月光的拟人情态)",
          descDE: "„kläglich“: Der Mond teilt die zerrissene Gefühlswelt des Reitenden.",
          descZH: "‘kläglich’（凄然）：月亮不再是冷冰冰的天体，而是倒映出骑士内心深处告别的隐忧与痛楚。",
        },
      },
      {
        lineNum: 11,
        textDE: "Die Winde schwangen leise Flügel,",
        translationZH: "夜风微微振动着轻柔飘渺的翅翼，",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´ ˘",
        reimschema: "e",
        kadenz: "weiblich",
      },
      {
        lineNum: 12,
        textDE: "Umsausten schauerlich mein Ohr;",
        translationZH: "在我的耳畔呼啸呜咽，令人毛骨悚然；",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´",
        reimschema: "f",
        kadenz: "männlich",
        stilmittel: {
          type: "Onomatopoesie & Synästhesie (拟声与通感震撼)",
          descDE: "„Umsausten schauerlich“: Akustische Bedrohung verstärkt das emotionale Drama.",
          descZH: "‘umsausten schauerlich’：呼啸的风声与刺骨的寒意交织，制造出强烈的临场感与听觉冲击。",
        },
      },
      {
        lineNum: 13,
        textDE: "Die Nacht schuf tausend Ungeheuer,",
        translationZH: "黑夜幻化出千万头张牙舞爪的怪兽，",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´ ˘",
        reimschema: "g",
        kadenz: "weiblich",
        stilmittel: {
          type: "Hyperbel (千头怪兽的狂放极言)",
          descDE: "Schöpfungskraft der Einbildungskraft (Phantasie als heroische Kraft).",
          descZH: "‘tausend Ungeheuer’：想象力在夜色中无限膨胀，制造出神话史诗般的试炼考验。",
        },
      },
      {
        lineNum: 14,
        textDE: "Doch frisch und fröhlich war mein Mut:",
        translationZH: "然而我的胸中却豪情满怀、坦荡欢畅：",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´",
        reimschema: "h",
        kadenz: "männlich",
        stilmittel: {
          type: "Alliteration & Wendepunkt (全韵与英雄心志逆转)",
          descDE: "„frisch und fröhlich“: Alliteration betont den heroischen Siegeswillen des Liebenden.",
          descZH: "‘frisch und fröhlich’：双重头韵如晴天霹雳，瞬间以恋爱者的英雄勇气荡涤整片恐怖暗夜！",
        },
        toneCategory: "leidenschaft",
      },
      {
        lineNum: 15,
        textDE: "In meinen Adern welches Feuer!",
        translationZH: "在我的奔涌血脉之中，燃烧着何等炽烈的烈火！",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´ ˘",
        reimschema: "g",
        kadenz: "weiblich",
        stilmittel: {
          type: "Exclamatio & Feuermetapher (感叹与烈焰隐喻)",
          descDE: "Das Feuer als Chiffre für dionysische Leidenschaft und unbändigen Lebensdrang.",
          descZH: "‘welches Feuer’：破折叹号与烈焰意象，定格狂飙突进天才灵魂对生命极限的燃烧与索求。",
        },
      },
      {
        lineNum: 16,
        textDE: "In meinem Herzen welche Glut!",
        translationZH: "在我的怦怦胸膛之内，激荡着何等狂热的赤焰！",
        metrumMarkup: "˘  ´ | ˘  ´ | ˘  ´ | ˘  ´",
        reimschema: "h",
        kadenz: "männlich",
        stilmittel: {
          type: "Parallelismus & Klimax (排比双峰渐强)",
          descDE: "Syntaktische Verdopplung von Adern/Feuer und Herzen/Glut besiegelt den Triumph des Ichs.",
          descZH: "与上一行构成工整至极的严密排比，肉体血脉与心灵烈焰合二为一，宣告主体激情的完全胜利。",
        },
      },
    ],
    questions: [
      {
        id: "q-willkommen-1",
        dimension: "stilmittel",
        titleDE: "1. Metrum & Rhythmusanalyse",
        titleZH: "四音步抑扬格与骏马奔驰节奏",
        afb: "AFB II",
        questionDE:
          "Welche funktionale Korrespondenz besteht zwischen dem vierhebigen Jambus (V. 1–16) und der inneren Erregung des lyrischen Ichs?",
        questionZH:
          "诗篇全程采用的严格四音步抑扬格（vierhebiger Jambus）与阴阳交错韵尾，与抒情主人公内心的激动情感构成了怎样的功能性共振？",
        options: [
          {
            id: "a",
            textDE:
              "Der Jambus (unbetont-betont) erzeugt einen rhythmischen Vorwärtsdrang, der das Hufgetrappel des Pferdes und den stürmischen Herzschlag des Reiters lautmalerisch und kinetisch spiegelt.",
            textZH:
              "从弱到强的抑扬格（˘ ´）营造出一往无前的强大推进力，在声律动力学上生动摹拟了骏马飞驰的蹄声与骑士急切狂跳的心搏，形式与内容浑然天成。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Der Jambus dient dazu, das Gedicht wie ein monotones Kirchenlied klingen zu lassen, um das Einschlafen zu erleichtern.",
            textZH:
              "抑扬格的目的是让诗篇模仿教堂催眠乏味的赞美诗圣歌，从而帮助失眠的读者尽快在深夜入睡。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Die Metrik ist fehlerhaft und zeigt, dass der junge Goethe noch keine Gedichte verfassen konnte.",
            textZH:
              "这首诗的格律充满低级韵脚漏洞，表明年轻时期的歌德尚不具备掌握德语格律文学的基本功底。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Die jambische Hebung drängt nach vorn. Im Wechsel mit abwechselnd klingender (weiblicher) und stumpfer (männlicher) Kadenz entsteht der Eindruck eines stetigen Galopps.",
        explanationZH:
          "【正解依据与文本锚点】\n第 1 行‘Es schlug mein Herz, geschwind zu Pferde!’以纯正的抑扬格（˘ ´ | ˘ ´ | ˘ ´ | ˘ ´ ˘）起笔，弱拍之后紧跟重拍敲击，赋予诗行无可阻挡的冲刺感。阴性韵尾（Pferde / Erde）带来舒缓呼吸的延展，而阳性韵尾（gedacht / Nacht）则如马蹄重重踏上坚实大地的定音槌。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（反常识滑稽误读）：本诗是狂飙突进充满雄性生机与荷尔蒙激荡的代表作，与沉闷催眠毫不相干；\n• 选项 C 诊断（颠倒大师地位）：《重逢与别离》开创了德国现代体验诗历史，格律严谨精妙堪称典范。\n\n【时代思潮与哲学脉络】\n赫尔德（Herder）民歌理论对歌德的影响：摆脱启蒙时代亚历山大体（Alexandriner）与法国宫廷矫揉造作的文雅修饰，回归有力的民歌律动与心跳本真生命力。",
        klausurSatzDE:
          "Goethe nutzt den vierhebigen Jambus als kinetisches Äquivalent seelischer Erregung: Der metrische Vorwärtsdrang verschmilzt das Hufgeklapper des nächtlichen Ritts mit dem leidenschaftlichen Herzschlag des Sturm-und-Drang-Subjekts.",
        klausurSatzZH:
          "歌德运用四音步抑扬格作为灵魂激荡的声学动力对应物：向前呼啸的格律冲击力将暗夜骑行的急促马蹄声，与狂飙突进主体炽烈的爱情心跳熔铸为不可分割的艺术整体。",
        ehzKeyPointsDE: [
          "Exakte Bestimmung des Versmaßes (vierhebiger Jambus).",
          "Analyse der Korrespondenz zwischen Metrum, Reitbewegung und Seelenlage.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Metrik 4P)：精准指出四音步抑扬格（vierhebiger Jambus）与交错韵（Kreuzreim abab）的结构参数。",
          "采分点 2 (Wirkung 4P)：深度剖析格律推进力与狂暴内心外化之间的因果美学机制。",
        ],
      },
      {
        id: "q-willkommen-2",
        dimension: "stilmittel",
        titleDE: "2. Dämonisierung & Naturprojektion",
        titleZH: "大自然拟人化与主观畏惧的投影",
        afb: "AFB II",
        questionDE:
          "Welche psychologische Dynamik verbirgt sich hinter der Dämonisierung der Natur in Vers 5–8 ('Wo Finsternis aus dem Gesträuche / Mit hundert schwarzen Augen sah')?",
        questionZH:
          "在第 5–8 行中将自然大肆鬼魅拟人化（‘黑暗从灌木丛中睁开上百双黑眼窥视’），背后折射出抒情主人公怎样的心理投射机制？",
        options: [
          {
            id: "a",
            textDE:
              "Die äußere Natur fungiert als Seelenlandschaft: Die Furcht vor der eigenen verbotenen Leidenschaft und gesellschaftlichen Tabus wird unbewusst in die bedrohliche nächtliche Umwelt projiziert.",
            textZH:
              "外界自然扮演着‘心灵风景画’（Seelenlandschaft）的功能：骑士面对幽会违逆世俗道德的内心惶恐与激情震撼，被无意识外化投射为充满敌意窥伺的恐怖暗夜森林。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Der Reiter wird im Wald von einer Herde wilder Wölfe verfolgt, die ihn fressen wollen.",
            textZH:
              "骑士在森林里确实不幸遭遇了一大群饥肠辘辘的野狼围攻，黑眼是指狼群发光的眼睛。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Der Dichter litt unter einer Augenkrankheit und sah optische Halluzinationen.",
            textZH:
              "青年诗人当时患有严重青光眼，产生了视力模糊的生理病理学视幻觉。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "In der Erlebnislyrik spiegelt die Landschaft die innere Gefühlslage des Ichs wider. Die bedrohliche Natur betont den Mut des Reiters, der alle Gefahren überwindet.",
        explanationZH:
          "【正解依据与文本锚点】\n‘Nebelkleid’、‘aufgetürmter Riese’、‘hundert schwarze Augen’是典型的表现性隐喻：现实中的老橡树与荆棘丛本是死物，但在深夜狂奔的少年眼中化作拦路巨人与百双窥伺黑眼。自然的凶险恐怖反衬出第 14 行‘Doch frisch und fröhlich war mein Mut’的英雄主义气魄——越是凶险可怖，越见爱之崇高。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（字面动物学误读）：把浪漫超现实的文学意象机械理解为动物捕食纪录片；\n• 选项 C 诊断（医学降格荒谬）：以眼疾生理病变抹杀抒情诗的心智投射美学。\n\n【时代思潮与哲学脉络】\n狂飙突进时期泛神论（Pantheismus）与有机自然观：人与自然不再是笛卡尔式的‘观察者与被观察对象’，自然是活生生同呼吸、共激荡的情感共鸣腔。",
        klausurSatzDE:
          "Die anthropomorphisierende Dämonisierung der Nachtlandschaft erweist sich als Projektionsfläche innerer Ambivalenz: Indem das lyrische Ich die physische Bedrohung heroisch überwindet, feiert Goethe den Siegeszug des autonomen Gefühls über Angst und Konvention.",
        klausurSatzZH:
          "暗夜自然风景的拟人化鬼魅渲染，构成了抒情主体内在矛盾情感的绝妙投影面：通过英勇战胜大自然构设的重重险阻，歌德热烈赞颂了独立自主的炽烈情感对恐惧与世俗成见的终极胜利。",
        ehzKeyPointsDE: [
          "Erläuterung des Konzepts der beseelten Natur (Naturlyrik des Sturm und Drang).",
          "Funktionsbestimmung der Dämonisierung als Kontrastfolie zum heroischen Mut.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Seelenlandschaft 4P)：深刻提炼狂飙突进‘通灵自然’（beseelte Natur）与主体心境同频共振的美学法则。",
          "采分点 2 (Antithetik 4P)：精准阐释幽暗恐怖对后文‘豪情坦荡’（frisch und fröhlich）所形成的强烈对照反衬职能。",
        ],
      },
      {
        id: "q-willkommen-3",
        dimension: "theorie",
        titleDE: "3. Epochenumbruch & Erlebnislyrik",
        titleZH: "体验诗对启蒙理性的历史突破",
        afb: "AFB III",
        questionDE:
          "Inwiefern begründet 'Willkommen und Abschied' einen epochalen Bruch mit der Dichtungstheorie der Aufklärung?",
        questionZH:
          "在何种意义上，《重逢与别离》的横空出世标志着对欧洲启蒙主义传统诗学纲领的划时代决裂？",
        options: [
          {
            id: "a",
            textDE:
              "Es ersetzt die moralische Belehrung (Docere) und akademische Regelpoetik durch das authentische, subjektive Erleben; Dichtung wird zum unzensierten Ausdruck individueller Empfindung.",
            textZH:
              "它彻底废弃了启蒙诗学以‘道德教化’（Docere）和经院规范为先的戒律，确立了以真实切身体验（Authentizität）为本的诗学观；诗歌从此成为个体鲜活情感不加粉饰的自由呐喊。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Es kehrt zu den lateinischen Versmaßen des römischen Mittelalters zurück und verbietet die deutsche Sprache.",
            textZH:
              "它全面倒退回中世纪经院哲学的拉丁文死板格律，并主张在德意志土地上全面废止德语写作。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Es enthält keinerlei Neuerung und wiederholt lediglich die Thesen von Gottscheds Dichtkunst.",
            textZH:
              "这首诗毫无创新突破，仅仅是在照抄高特舍德（Gottsched）旧式启蒙诗学理论对规则的死板遵守。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Mit Goethe wird Dichtung nicht mehr 'gemacht' nach Regeln (Poeta faber), sondern bricht aus dem genialischen Individuum hervor (Genieästhetik).",
        explanationZH:
          "【正解依据与文本锚点】\n在启蒙时代，诗歌是文人学者根据修辞学手册刻板雕琢的‘工艺品’，其首要宗旨是宣讲理性美德。而歌德在第 2 行便写出‘Es war getan fast eh gedacht’（行动先于理智沉思），直接宣布了感觉与体验的至高优先权。狂飙突进的‘天才美学’（Genieästhetik）由本诗奠定。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（历史方向颠倒）：狂飙突进是德语民族语言活力全面爆发的巅峰，绝非倒退回拉丁文；\n• 选项 C 诊断（颠倒诗学阵营）：高特舍德正是歌德年轻时代激烈批判反叛的保守派代表。\n\n【时代思潮与哲学脉络】\n从‘客体摹仿’走向‘主体抒情’：歌德的体验诗完成了德国文学现代性的惊人一跃，不仅深刻启发了后世的魏玛古典与浪漫主义，更重塑了近现代人对‘何为纯真爱情体验’的情感语法。",
        klausurSatzDE:
          "In literaturgeschichtlicher Synthese markiert das Gedicht den Durchbruch der Genieästhetik: Indem Goethe die normative Vernunftpoetik zugunsten unbändiger Subjektivität suspendiert, begründet er die moderne Erlebnislyrik als autonomes Bekenntnis des schöpferischen Individuums.",
        klausurSatzZH:
          "在文学史综合审视中，本诗标志着天才美学的决定性突破：歌德通过搁置规范主义理性诗学，确立奔涌不羁的主体性，从而将现代体验抒情诗确立为创造性个体自主心声的神圣告白。",
        ehzKeyPointsDE: [
          "Historische Einordnung in den Übergang von Aufklärung zu Sturm und Drang.",
          "Würdigung der Genieästhetik und des Konzepts der Erlebnislyrik.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Epochenvergleich 4P)：精准对比启蒙规范诗学（Regelpoetik）与狂飙突进天才美学的本质分野。",
          "采分点 2 (Erlebnislyrik 4P)：高水平阐明‘体验诗’概念对德语现代抒情诗演进历程的奠基性意义。",
        ],
      },
    ],
  },
];
