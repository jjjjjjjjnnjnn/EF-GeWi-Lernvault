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
  // =========================================================================
  // 5. PHILOSOPHIE: Thomas Hobbes — Leviathan (自然状态与社会契约)
  // =========================================================================
  {
    id: "hobbes-leviathan",
    fach: "Philosophie",
    genre: "Sachtext",
    author: "Thomas Hobbes",
    workTitleDE: "Leviathan",
    workTitleZH: "《利维坦》",
    sceneTitleDE: "Kapitel 13 & 17 // Naturzustand & Staatsgründung",
    sceneTitleZH: "自然状态与社会契约（所有人对所有人的战争与利维坦诞生）",
    versesRange: "Kap. 13 & 17 (Z. 1–16)",
    epochDE: "Frühe Neuzeit / Vertragstheorie (1651)",
    epochZH: "早期近代西方哲学 / 唯物契约论 (1651)",
    contextDE:
      "Vor dem Hintergrund des blutigen englischen Bürgerkriegs begründet Thomas Hobbes den Staat radikal anthropologisch: Aus der Gleichheit der menschlichen Fähigkeiten und der Konkurrenz um Ressourcen folgt im staatenlosen Naturzustand der kriegerische Zustand von jedem gegen jeden (bellum omnium contra omnes). Um das nackte Überleben zu sichern, gebietet die Vernunft (lex naturalis) den vollständigen Verzicht auf das Naturrecht zugunsten eines unumschränkten Souveräns.",
    contextZH:
      "在英国资产阶级革命内战惨剧的阴影下，霍布斯对国家起源做出了石破天惊的唯物主义理性重构：在缺乏足以威慑所有人的统一强力时，人类因本性中的平等与自保欲望必然陷入‘所有人对所有人的战争’。生命注定‘孤独、贫困、肮脏、野蛮和短命’。唯有通过理性建立社会契约，将一切统治权让渡给终有一死的世俗上帝‘利维坦’，人类方能逃离互噬厄运。",
    verses: [
      {
        lineNum: 1,
        textDE: "Die Natur hat die Menschen hinsichtlich der körperlichen und geistigen Fähigkeiten so gleich geschaffen,",
        translationZH: "自然赋予人在身心能力上的天赋是如此均等，",
        toneCategory: "moral",
        stilmittel: {
          type: "Anthropologische Prämisse (人类学平等预设)",
          descDE: "Hobbes bricht radikal mit Aristoteles' Hierarchie-Denken: Alle Menschen sind im Naturzustand potenziell gleich stark und verwundbar.",
          descZH: "彻底颠覆亚里士多德的天生贵贱论：在自然状态下，人人身体与智性潜能大致平等，皆具备致命杀伤力与脆弱性。",
        },
      },
      {
        lineNum: 2,
        textDE: "dass der Schwächste Kraft genug hat, den Stärksten zu töten – sei es durch List, sei es durch Bündnisse.",
        translationZH: "以至于哪怕最弱小之人也有足够力量杀死最强者——无论通过阴谋诡计，还是拉帮结派。",
        vocab: {
          word: "List & Bündnis",
          meaningDE: "Strategische Klugheit oder Koalitionen zum Ausgleich physischer Defizite.",
          meaningZH: "智谋狡计或利益同盟：物理强弱在此被彻底抹平，无人能获得绝对安全。",
        },
      },
      {
        lineNum: 3,
        textDE: "Aus dieser Gleichheit der Fähigkeiten entsteht die Gleichheit der Hoffnung, unsere Ziele zu erreichen.",
        translationZH: "正是这种能力上的均等，孕育出人人皆渴望达成自身欲望目标的同等期望。",
      },
      {
        lineNum: 4,
        textDE: "Und wenn daher zwei Menschen dasselbe begehren, dessen sie sich doch nicht beide erfreuen können,",
        translationZH: "因此，当两个人渴望拥有同一件不可共享之物时，",
        toneCategory: "krise",
      },
      {
        lineNum: 5,
        textDE: "so werden sie Feinde und streben danach, einander zu vernichten oder zu unterwerfen.",
        translationZH: "他们便立时沦为生死仇敌，企图将对方彻底消灭或征服奴役。",
        stilmittel: {
          type: "Logische Kausalität (资源稀缺与冲突之必然)",
          descDE: "Aus knappen Gütern und Gleichheit folgt unvermeidlich existenzielle Feindschaft.",
          descZH: "严密演绎因果链：平等与物质稀缺结合，直接推导出无可避免的生存死敌关系。",
        },
      },
      {
        lineNum: 6,
        textDE: "So finden wir in der Natur des Menschen drei Hauptursachen für Streit: Erstens Konkurrenz, zweitens Misstrauen, drittens Ruhmsucht.",
        translationZH: "由此我们发现，在人的本性中存在着三种导致纷争的主要根源：第一是竞争求利，第二是猜忌自保，第三是虚荣求誉。",
        vocab: {
          word: "Konkurrenz, Misstrauen, Ruhmsucht",
          meaningDE: "Die drei anthropologischen Triebfedern für Gewalt im Naturzustand.",
          meaningZH: "三种暴力原初驱动：为了利益竞争、为了安全猜忌预防、为了虚名声誉复仇。",
        },
      },
      {
        lineNum: 7,
        textDE: "Daraus erhellt, dass, solange die Menschen ohne eine gemeinsame Macht leben, die sie alle in Schrecken hält,",
        translationZH: "显而易见，只要人们生活在一个缺乏足以慑服所有人的公共强力之下，",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 8,
        textDE: "sie sich in jenem Zustand befinden, den man Krieg nennt, und zwar ein Krieg eines jeden gegen jeden.",
        translationZH: "他们就无可避免地处于所谓的‘战争状态’——那是所有人对所有人的你死我活之战。",
        stilmittel: {
          type: "Terminus Technicus: Bellum omnium contra omnes (所有人对所有人的战争)",
          descDE: "Krieg meint nicht permanente Schlacht, sondern die ständige bekannte Neigung dazu ohne Sicherheitsgarantie.",
          descZH: "战争状态不仅指接连不断的厮杀交火，更是指人人自危、随时可能遭受突袭暴毙的永久性结构危机。",
        },
      },
      {
        lineNum: 9,
        textDE: "In einem solchen Zustand gibt es keinen Platz für Fleiß, keine Kultur der Erde, keine Schifffahrt, keine Künste,",
        translationZH: "在这样的绝境中，勤劳毫无立足之地，没有土地农耕，没有航海贸易，亦无任何艺术科学；",
        toneCategory: "existenz",
      },
      {
        lineNum: 10,
        textDE: "und das menschliche Leben ist einsam, armselig, ekelhaft, tierisch und kurz.",
        translationZH: "人的生命注定是孤独、贫困、卑污、残暴和短促的。",
        stilmittel: {
          type: "Asyndetische Klimax (无连接词排比渐强)",
          descDE: "Die berühmte Quintessenz der Hobbes'schen Anthropologie: 'solitary, poor, nasty, brutish, and short'.",
          descZH: "西方哲学史震撼人心的至理名言：五连断语将无国家状态下的生存惨状刻画至极点。",
        },
      },
      {
        lineNum: 11,
        textDE: "Das natürliche Recht (Ius naturale) ist die Freiheit eines jeden, seine eigene Macht nach seinem Willen zur Erhaltung seines Lebens anzuwenden.",
        translationZH: "自然权利（Ius naturale）是每个人依其自身意志运用全部力量来保全生命的绝对自由，即拥有掠夺一切的原始权利。",
        vocab: {
          word: "Ius naturale",
          meaningDE: "Vollkommene regellose Handlungsfreiheit im Naturzustand (Recht auf alles).",
          meaningZH: "自然权利：在前政治状态下为了求生而对一切事物拥有使用与掠夺权，但人人皆有时意味着人人皆无保障。",
        },
      },
      {
        lineNum: 12,
        textDE: "Ein Gesetz der Natur (Lex naturalis) aber ist eine von der Vernunft gefundene Vorschrift, nach der es verboten ist, das eigene Leben zu zerstören.",
        translationZH: "然而自然法则（Lex naturalis）则是理性发现的诫令，严禁人类做出毁灭自身生命的狂暴蠢行。",
        vocab: {
          word: "Lex naturalis",
          meaningDE: "Vernunftgebot zur Selbsterhaltung durch Friedensstiftung.",
          meaningZH: "自然法则：理性的自我约束指令，驱动人走出丛林状态。",
        },
      },
      {
        lineNum: 13,
        textDE: "Die erste und grundlegende Regel der Natur ist: Jeder hat nach Frieden zu suchen, solange Hoffnung darauf besteht.",
        translationZH: "自然的第一条根本法则便是：只要存有一线希望，人人都当竭尽全力寻求和平。",
        toneCategory: "streben",
      },
      {
        lineNum: 14,
        textDE: "Der einzige Weg, eine solche allgemeine Macht zu errichten, besteht darin, alle Macht und Stärke auf einen Mann oder eine Versammlung zu übertragen.",
        translationZH: "而构建这样一种威慑公共强力的唯一途径，便是将所有人的一切力量与权柄彻底移交给一个人或一个议会。",
      },
      {
        lineNum: 15,
        textDE: "Ich autorisiere diesen Mann oder diese Versammlung und übertrage ihm mein Recht, mich selbst zu regieren, unter der Bedingung, dass du es ebenso tust.",
        translationZH: "‘我授权此人或此议会，并将自我统治之权完全转让予他，条件是你也必须同样将权利如数转让。’",
        stilmittel: {
          type: "Vertragsformel des Gesellschaftsvertrags (社会契约原初誓约)",
          descDE: "Horizontaler Vertrag der Untertanen untereinander zugunsten eines unbeteiligten Dritten (Souverän).",
          descZH: "平民个体之间的水平互约：契约是百姓彼此订立并推举第三方作为受益者，君主本身非契约当事人，不受制于臣民诉求。",
        },
      },
      {
        lineNum: 16,
        textDE: "Dies ist die Erzeugung jenes großen Leviathan, jenes sterblichen Gottes, dem wir unter dem unsterblichen Gott unseren Frieden verdanken.",
        translationZH: "如此便诞生了伟大的‘利维坦’——我们在永生上帝庇佑之下，正是向这位‘终有一死的世俗上帝’索求和平与庇护。",
        toneCategory: "autoritaet",
        vocab: {
          word: "Leviathan (Der sterbliche Gott)",
          meaningDE: "Das allmächtige Staatsmonopol als Garant für Rechtssicherheit und inneren Frieden.",
          meaningZH: "利维坦（终有一死的上帝）：国家专政暴力垄断机器，以至高威慑粉碎内战、保障秩序底线。",
        },
      },
    ],
    questions: [
      {
        id: "q-hobbes-1",
        dimension: "argumentation",
        titleDE: "1. Anthropologie und Ursachen des Naturzustands",
        titleZH: "人性假设与自然状态三大冲突根源",
        afb: "AFB I",
        questionDE:
          "Welche drei anthropologischen Hauptursachen führen nach Thomas Hobbes zwingend zum Zustand des 'Krieges aller gegen alle' (bellum omnium contra omnes)?",
        questionZH:
          "在霍布斯的严格论证逻辑中，哪三大人性内在根源导致无国家状态下的人类必然陷入‘所有人对所有人的战争’？",
        options: [
          {
            id: "a",
            textDE:
              "Konkurrenz (Streben nach Gewinn), Misstrauen (Streben nach Sicherheit) und Ruhmsucht (Streben nach Ansehen).",
            textZH:
              "竞争（贪求物质利益与生活资料）、猜忌（恐惧遭受背刺突袭而被迫先发制人求自保）、虚荣（贪图声誉威望与名号尊严）。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Religiöser Fanatismus, mangelnde Schulbildung und böse Erziehung durch fehlerhafte Fürsten.",
            textZH:
              "宗教狂热煽动、基础教育普及率不足以及封建暴君恶劣教养导致的道德失范。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Angeborene biologische Grausamkeit, die den Menschen willenlos zwingt, ohne jeden Grund Blut zu vergießen.",
            textZH:
              "一种与生俱来的病理性嗜血本能，强制驱使个体在没有任何利益诉求和理由的情况下无端滥杀同类。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Hobbes leitet den Kriegszustand nicht aus pathologischer Bosheit ab, sondern rational aus der strukturellen Lage: Bei gleicher Verwundbarkeit zwingt gegenseitiges Misstrauen zur Präventivgewalt.",
        explanationZH:
          "【正解依据与文本锚点】\n霍布斯在第 6 行明确指出：‘So finden wir in der Natur des Menschen drei Hauptursachen für Streit: Erstens Konkurrenz, zweitens Misstrauen, drittens Ruhmsucht.’极为精辟的是，霍布斯并非认定人天生是嗜血恶魔，而是指出即便理性的普通人，在缺乏法律保护的丛林中，出于自保猜忌（Misstrauen）也只能被迫选择先发制人消灭潜在威胁。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（时代错位与表象归因）：霍布斯在此探讨前政治的人性原初结构，绝非现代教育学或偶发宗教历史议题；\n• 选项 C 诊断（扭曲理性自保内核）：霍布斯的人性是理性唯物主义的‘自保最大化计算机’，而非无意识精神病理学杀人狂。\n\n【时代思潮与哲学脉络】\n近代政治哲学的哥白尼式革命：霍布斯彻底抛弃了中世纪托马斯主义‘天道秩序’与古希腊‘人天生是政治动物’（zoon politikon）的温情幻想，用伽利略物理力学式的机械唯物主义拆解人性冲动。",
        klausurSatzDE:
          "Hobbes begründet den Naturzustand nicht mit irrationaler Bösartigkeit, sondern rekonstruiert ihn als rationales Dilemma: Aus Gleichheit und Ressourcenknappheit erwachsen Konkurrenz, präventives Misstrauen und Ruhmsucht als unausweichliche Gewaltursachen.",
        klausurSatzZH:
          "霍布斯对自然状态的推演绝非基于非理性的道德谴责，而是将其重构为纳什均衡式的理性困境：在能力平等与资源稀缺的结构下，求利的竞争、先发制人的猜忌自保与求荣的声誉冲动，必然构成为通往总体战争的不可抗力。",
        ehzKeyPointsDE: [
          "Präzise Nennung der drei Motive: Konkurrenz, Misstrauen, Ruhmsucht.",
          "Verständnis der strukturellen Notwendigkeit von Präventivschlägen (Gefangenendilemma).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Anthropologie 4P)：精准答出三大冲突根源（Konkurrenz, Misstrauen, Ruhmsucht）及其分别对应的目标（Gewinn, Sicherheit, Ansehen）。",
          "采分点 2 (Strukturanalyse 4P)：深刻洞见猜忌导致‘先发制人’的囚徒困境机制，点明无政府状态即系统性暴力危机。",
        ],
      },
      {
        id: "q-hobbes-2",
        dimension: "theorie",
        titleDE: "2. Differenzierung von Ius naturale und Lex naturalis",
        titleZH: "自然权利与自然法则的法哲学本质区别",
        afb: "AFB II",
        questionDE:
          "Wie unterscheidet Thomas Hobbes systematisch zwischen dem 'Ius naturale' (Naturrecht) und der 'Lex naturalis' (Naturgesetz)?",
        questionZH:
          "霍布斯如何在法理逻辑上严格区分‘自然权利’（Ius naturale）与‘自然法则’（Lex naturalis）这对核心概念？",
        options: [
          {
            id: "a",
            textDE:
              "Das Ius naturale ist die unbegrenzte Freiheit, alles zur Selbsterhaltung einzusetzen (Recht auf alles); die Lex naturalis ist ein Vernunftgebot, das Handlungen zur Selbstzerstörung verbietet und zur Friedenssuche verpflichtet.",
            textZH:
              "自然权利是个体为求生而任意使用全部力量的绝对自由（对一切事物的原始占有权）；自然法则则是理性所阐明的戒律，严禁人自残自毁，并勒令个体必须追求和平与转让权利。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Das Ius naturale gilt nur für Könige, während die Lex naturalis den einfachen Bauern die Arbeit auf den Feldern vorschreibt.",
            textZH:
              "自然权利仅仅专属于封建贵族君王，而自然法则则是强制底层农奴在田野终身劳作的宗教训令。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Es gibt keinen Unterschied; beide Begriffe bezeichnen exakt dasselbe geschriebene Verfassungsrecht moderner Staaten.",
            textZH:
              "二者完全没有任何区别，仅仅是现代主权国家成文宪法条款在德语翻译上的文字重合。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Freiheit (Ius) versus Pflicht (Lex): Das Recht erlaubt alles zur Selbsterhaltung, das Gesetz verpflichtet durch rationale Einsicht zur Friedensstiftung.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 11–12 行给出经典定义：‘Das natürliche Recht (Ius naturale) ist die Freiheit eines jeden... Ein Gesetz der Natur (Lex naturalis) aber ist eine von der Vernunft gefundene Vorschrift...’权利（Right / Ius）关乎自由（Freiheit zu tun），而法则（Law / Lex）则关乎约束与义务（Verpflichtung）。在自然权利下人人享有抢夺一切之权，导致人人自危；正是自然法则的理性算计命令大家‘放弃对一切之权’换取和平。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（庸俗阶级偏见）：霍布斯的自然状态早于任何国家体制，不存在国王与农奴的政治身份分工；\n• 选项 C 诊断（混淆自然法与实在法）：二者属于前国家的自然哲学范畴，绝非现代制定法宪法。\n\n【时代思潮与哲学脉络】\n理性主义工具化转向：霍布斯的‘理性’不再是柏拉图式注视至善理念的精神器官，而是趋利避害、计算生命存活概率的功利性计算工具（Reason as Reckoning）。",
        klausurSatzDE:
          "Systematisch scheidet Hobbes das Ius naturale als schrankenlose Handlungsfreiheit zur Selbsterhaltung (Recht auf alles) von der Lex naturalis als rationalem Pflichtgebot, welches die destruktive Freiheit zugunsten kollektiver Friedenssicherung einschränkt.",
        klausurSatzZH:
          "在系统法哲学视域下，霍布斯将自然权利严格界定为求存保命的无边界行动自由（对万物的侵占权），而将自然法则定性为理性的规范性诫令，其功能在于自我限缩破坏性自由以达成集体和平秩序。",
        ehzKeyPointsDE: [
          "Begriffsdistinktion: Freiheit (Recht/Ius) vs. Verbindlichkeit/Pflicht (Gesetz/Lex).",
          "Funktion der Lex naturalis als Brücke aus dem Naturzustand in den Staat.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Begriffsdualismus 4P)：精准对比‘自由’（Ius）与‘约束义务’（Lex）的法学逻辑差异。",
          "采分点 2 (Friedensbrücke 4P)：深刻剖析第一与第二自然法则作为通往文明主权国家过渡桥梁的机制。",
        ],
      },
      {
        id: "q-hobbes-3",
        dimension: "figuren",
        titleDE: "3. Struktur des Gesellschaftsvertrags und der Leviathan",
        titleZH: "社会契约的结构特征与利维坦的绝对主权",
        afb: "AFB II",
        questionDE:
          "Welche fundamentale Besonderheit kennzeichnet die vertragstheoretische Konstruktion der Staatsgründung bei Thomas Hobbes im Vergleich zu späteren Demokratietheorien?",
        questionZH:
          "与后世洛克或卢梭的民主契约论相比，霍布斯所构想的‘利维坦社会契约’在订约结构上具有何种极为严苛的根本特异性？",
        options: [
          {
            id: "a",
            textDE:
              "Der Vertrag wird ausschließlich zwischen den Individuen untereinander geschlossen ('horizontal'); der Souverän ist nicht Vertragspartner, sondern Drittbegünstigter und unterliegt keinerlei vertraglichen Kontrollen oder Kündigungsmöglichkeiten.",
            textZH:
              "契约纯粹是在平民个体彼此之间横向订立的（水平互约）；主权者利维坦本身绝非契约缔约方，而是权力的唯一第三方受益者，因此主权者不受契约违约审查或罢免弹劾的限制。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Das Volk wählt den König alle vier Jahre in freier und geheimer Wahl wieder ab, falls die Steuern zu hoch sind.",
            textZH:
              "人民每隔四年通过普选与无记名投票来罢免重选君主，一旦国家赋税过高便随时推翻内阁。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Der Souverän teilt seine Macht mit dem Papst in Rom und dem Verfassungsgericht in Karlsruhe.",
            textZH:
              "主权者必须严格将统治权与罗马教皇及联邦宪法法院三权分立、相互制衡。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Souverän steht legibus solutus (über den Gesetzen): Da er den Vertrag nicht schloss, kann er ihn nicht brechen. Seine einzige Verpflichtung ist die faktische Gewährleistung von Sicherheit.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 15 行的立约誓词揭示了关键秘密：‘Ich autorisiere diesen Mann... unter der Bedingung, dass du es ebenso tust.’（我授权并转让权利，条件是你也转让）。个体之间相互承诺转让权利，共同奉立一个不参与订约的主权者。既然主权者没有向人民做出任何契约承诺，人民便绝无借口指责主权者‘违约’，从而根除了任何以内乱借口推翻政府的合法性。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（嫁接现代代议民主）：霍布斯极度仇视导致内战的分权与频繁更换政府，追求不可分割的绝对主权；\n• 选项 C 诊断（时代荒谬乱入）：霍布斯坚定主张政教合一（君主即教会元首），排斥一切外来宗教权力干预。\n\n【时代思潮与哲学脉络】\n绝对主义主权论（Souveränitätslehre）：霍布斯目睹了英国国会与国王分权相争诱发的十余年惨绝人寰的内战，认定‘分权即内战之母’，唯有不可分割、不可撤销的最高强力方能压制派系野心。",
        klausurSatzDE:
          "Die Hobbes'sche Staatsgründung vollzieht sich als reiner Unterwerfungsvertrag der Bürger untereinander zugunsten eines begünstigten Dritten; da der Souverän selbst nicht kontrahierte Partei ist, agiert er legibus solutus und entzieht sich jedem bürgerlichen Kündigungs- oder Widerstandsrecht.",
        klausurSatzZH:
          "霍布斯式的建国奠基于臣民彼此之间成立的纯粹屈从互约，其利益悉数归于获益的第三方；由于主权者自身并非立约主体，因而拥有超越法律之上（legibus solutus）的绝对权能，彻底剥夺了臣民的解约权与反抗权。",
        ehzKeyPointsDE: [
          "Erklärung des Vertragsmodells (Inter-Pares-Vertrag zugunsten Dritter).",
          "Konsequenz für das Widerstandsrecht (Ausschluss des Tyrannenmordes).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Vertragsstruktur 4P)：精准阐述‘平民之间水平缔约、主权者作为非缔约第三方’的独特法权构造。",
          "采分点 2 (Legibus solutus 4P)：高水平剖析主权绝对性与排除抵抗权（Widerstandsrecht）的政治哲学意图。",
        ],
      },
      {
        id: "q-hobbes-4",
        dimension: "theorie",
        titleDE: "4. Kritische Beurteilung und Kontroverse mit Locke",
        titleZH: "利维坦理论批判：安全与自由的终极天平（霍布斯 vs. 洛克）",
        afb: "AFB III",
        questionDE:
          "Inwiefern erweist sich die Hobbes'sche Legitimation des absoluten Staates im Lichte moderner Verfassungsprinzipien (Grundgesetz Art. 1 & 20) als hochgradig problematisch?",
        questionZH:
          "在现代宪政民主与德国基本法（Art. 1 人性尊严 & Art. 20 法治国原则）的审视下，霍布斯将‘绝对安全’置于一切权利之上的理论建构存在何种深刻的内在悖论？",
        options: [
          {
            id: "a",
            textDE:
              "Indem Hobbes zugunsten reiner physischer Sicherheit auf alle bürgerlichen Freiheits-, Kontroll- und Widerstandsrechte verzichtet, tauscht er die Unsicherheit des Naturzustands gegen die permanente Willkürgefahr eines unkontrollierbaren Staatsmonstrums ein.",
            textZH:
              "霍布斯为了换取纯粹的肉体自保安全，彻底剥夺了个体全部公民自由、分权监督与反抗救济权利；这实质上是以避免丛林偶发风险为代价，将人类永恒置于不受控制的国家机器专横暴政的巨大阴影之下。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Hobbes' Modell ist identisch mit dem deutschen Grundgesetz, da auch die Bundesrepublik Deutschland von einem absolutistischen Herrscher ohne Parlament regiert wird.",
            textZH:
              "霍布斯的理论模型与德国基本法完全等同，因为联邦德国同样是由一位完全废除议会监督的专制君王统治的。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Das Modell hat keinerlei historische Bedeutung gehabt und wurde von keinem Philosophen nach 1651 jemals rezipiert.",
            textZH:
              "该模型在思想史上毫无任何影响，1651年出版后从未被包括洛克、卢梭在内的任何哲学家所讨论或批判。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Lockes berühmte Replik: Menschen wären töricht, sich vor Marder und Fuchs (Mitbürgern) zu schützen, indem sie sich von einem Löwen (absoluter Souverän) verschlingen lassen.",
        explanationZH:
          "【正解依据与文本锚点】\n洛克在《政府论》中给出了哲学史上最犀利的还击：‘人类难道会愚蠢到为了防备黄鼠狼和狐狸（同侪平民的偶发偷窃），就心甘情愿将自己送入狮子（绝对专制君主）的血盆大口之中吗？’霍布斯赋予利维坦剥夺财产、思想审查、随意处决非反抗者的无限特权。而在基本法第 1 条‘人性尊严不可侵犯’的视角下，国家绝非终极目的，国家只是保障公民基本权利与主体尊严的仆从。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（宪政常识颠倒）：德国基本法实行严格的三权分立、议会民主与 Art. 20 Abs. 4 宪法反抗权；\n• 选项 C 诊断（抹杀思想史地位）：霍布斯开创了整个近代社会契约论范式，洛克、卢梭、康德皆在其所立界标上争辩展开。\n\n【时代思潮与哲学脉络】\n从‘秩序至上’迈向‘正义与自由’：霍布斯代表了在内战废墟中寻求秩序底线的初阶近代哲学；而洛克与启蒙运动则代表了追求‘有限政府’、分权制衡与天赋人权不可剥夺的高阶宪政跃迁。",
        klausurSatzDE:
          "In kritischer Synthese erkauft Hobbes die Befriedung des Naturzustands um den verfassungsethisch unerträglichen Preis der Totalentmachtung des Individuums: Ohne rechtsstaatliche Bändigung durch Gewaltenteilung und Grundrechte pervertiert der Leviathan von einem Schutzpatron zur unberechenbaren Tyrannei.",
        klausurSatzZH:
          "在批判性综合审视中，霍布斯平息自然状态的代价，是让渡个体全部权能的宪政伦理沉痛代价：倘若缺乏分权制衡与基本人权的法治国缰绳羁绊，利维坦便极易从保卫和平的庇护神，蜕变为吞噬一切自由的专横暴虐巨兽。",
        ehzKeyPointsDE: [
          "Problematisierung der fehlenden Gewaltenteilung und des fehlenden Grundrechtsschutzes.",
          "Vergleichender Rekurs auf Lockes Konzeption der unveräußerlichen Naturrechte.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Verfassungskritik 4P)：深刻指出缺乏分权机制（Gewaltenteilung）与司法救济对公民基本权利构成的专制侵害。",
          "采分点 2 (Ideenvergleich 4P)：精准引入洛克自然权利与基本法第 1 条人性尊严，完成 AFB III 高水平辩证权衡。",
        ],
      },
    ],
  },
  // =========================================================================
  // 6. PHILOSOPHIE: Hannah Arendt — Elemente und Ursprünge totaler Herrschaft
  // =========================================================================
  {
    id: "arendt-totalitarismus",
    fach: "Philosophie",
    genre: "Sachtext",
    author: "Hannah Arendt",
    workTitleDE: "Elemente und Ursprünge totaler Herrschaft",
    workTitleZH: "《极权主义的起源》",
    sceneTitleDE: "Ideologie und Terror // Die Zerstörung der Pluralität",
    sceneTitleZH: "意识形态与恐怖垄断（极权统治对人类复数性与公共空间的摧毁）",
    versesRange: "Kapitel 13 (Auszüge)",
    epochDE: "Politische Philosophie der Moderne (1951)",
    epochZH: "现代政治哲学 / 现象学批判理论 (1951)",
    contextDE:
      "Nach der Katastrophe des Nationalsozialismus und des Stalinismus analysiert Hannah Arendt die beispiellose Monstrosität des Totalitarismus: Er ist keine bloße Neuauflage antiker Despotie, sondern ein gänzlich neues Herrschaftsmodell. Durch die Verschmelzung von allgegenwärtigem Terror mit der eisernen Logik einer Ideologie zerstört das totalitäre System die menschliche Pluralität, atomisiert die Gesellschaft in wurzellose Verlassenheit und beraubt den Einzelnen seiner fundamentalen Fähigkeit zu spontanem, politischem Handeln.",
    contextZH:
      "在纳粹大屠杀与斯大林主义人类至暗浩劫的废墟上，汉娜·阿伦特对极权主义的前所未有之恶进行了划时代的现象学剖析：极权统治绝非历史上封建暴政的简单翻版，而是一种全新的毁灭性统治范式。它通过无孔不入的总体性恐怖，与宣称掌握‘历史或自然绝对法则’的意识形态铁逻辑相结合，抹杀了个体独特性与人之复数性（Pluralität），将社会原子化为无根漂泊的极端被遗弃感（Verlassenheit），企图彻底消灭人类从事自由行动与道德判断的原初能力。",
    verses: [
      {
        lineNum: 1,
        textDE: "Totale Herrschaft unterscheidet sich von allen bisherigen Formen politischer Unterdrückung dadurch,",
        translationZH: "极权统治之所以与人类历史上过往的一切政治压迫形式有着本质区别，",
        toneCategory: "krise",
      },
      {
        lineNum: 2,
        textDE: "dass sie nicht nur die politischen Fähigkeiten der Menschen vernichtet, sondern das menschliche Wesen selbst umformt.",
        translationZH: "在于它不仅摧毁了人类从事政治参与的能力，更企图对人类的生命本质本身实施激进重塑与基因式变异。",
        stilmittel: {
          type: "Totalitäre Anthropologie (极权主义对人性的根本篡改)",
          descDE: "Die Transformation des Individuums in ein willenloses, austauschbares Rädchen im Kollektivorganismus.",
          descZH: "不仅剥夺权利，更妄图在精神与肉体上将独特生命矮化为均质可替换的生物学零件。",
        },
      },
      {
        lineNum: 3,
        textDE: "Das Wesen der totalen Herrschaft ist der Terror, der nicht mehr Mittel zu einem Zweck ist, sondern zum ständigen Prinzip wird.",
        translationZH: "极权统治的本质乃是恐怖；在此，恐怖不再是达成统治的阶段性手段，而是转化为维持极权运转的永久性本体原则。",
        vocab: {
          word: "Terror als Wesen",
          meaningDE: "Nicht bloße Einschüchterung von Gegnern, sondern lückenloses System der Vernichtung jeder Unberechenbarkeit.",
          meaningZH: "作为本质的恐怖：并非针对具体敌对分子的弹压，而是旨在彻底清除一切偶然性、自由与自发性的无死角铁笼。",
        },
      },
      {
        lineNum: 4,
        textDE: "Der Terror vollstreckt das Gesetz der Geschichte oder der Natur, indem er die Menschheit zu einem einzigen gigantischen Körper zusammenschmilzt.",
        translationZH: "恐怖自命为‘历史演进法则’或‘自然淘汰法则’的终极行刑官，企图将全人类熔铸为一个抹杀一切个性的庞大单一体。",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 5,
        textDE: "Dadurch wird die Pluralität der Menschen – die Tatsache, dass Menschen, nicht der Mensch, die Erde bewohnen – radikal vernichtet.",
        translationZH: "人类最珍贵的根本事实——即‘是复数的人们，而非抽象的独一之人，栖居于大地之上’（Pluralität）——遭到了毁灭性的粉碎。",
        stilmittel: {
          type: "Arendtscher Schlüsselbegriff: Pluralität (人之复数性)",
          descDE: "Die Einzigartigkeit eines jeden Individuums als fundamentale Bedingung für Politik und Freiheit.",
          descZH: "阿伦特政治哲学核心奠基范畴：人因各不相同而需要公共交往，复数性是政治、自由与民主存在的本体论前提。",
        },
      },
      {
        lineNum: 6,
        textDE: "Die Ideologie ist nicht einfach ein falsches Bewusstsein, sondern der Anspruch, das Welträtsel durch eine einzige Idee vollständig zu erklären.",
        translationZH: "意识形态绝非简单的虚假意识，而是一种宣称仅凭唯一的先验教条观念即可穷尽解释整个世界全部奥秘的极度狂妄。",
        vocab: {
          word: "Ideologischer Absolutheitsanspruch",
          meaningDE: "Monokausale Welterklärung (Rassenkampf, Klassenkampf), immun gegen Fakten und Widersprüche.",
          meaningZH: "一元论绝对象征解释：将复杂的历史万象强行塞入阶级或种族单一公式中，严禁任何质疑。",
        },
      },
      {
        lineNum: 7,
        textDE: "Ihr Charakteristikum ist die Emanzipation vom Faktischen: Die Wirklichkeit hat sich der logischen Folgerichtigkeit der Idee zu beugen.",
        translationZH: "它的核心特征是与客观历史经验事实彻底脱钩：活生生的现实必须无条件向教条观念那所谓的‘冷酷逻辑必然性’俯首低头。",
        toneCategory: "krise",
      },
      {
        lineNum: 8,
        textDE: "Wer 'A' sagt, muss auch 'B' und 'C' sagen – die eiserne Logik zwingt den Verstand in eine Zwangsbewegung, die kein Urteil mehr erlaubt.",
        translationZH: "‘既然说了A，就必须被迫说B和C’——这种铁的逻辑迫使人的理智陷入无法脱身的思想专政，剥夺了一切独立的自省与伦理审断。",
        stilmittel: {
          type: "Zwang der Deduktion (演绎逻辑的暴政)",
          descDE: "Die Selbstunterwerfung unter eine deduktive Gedankenkette ersetzt die eigene moralische Urteilskraft.",
          descZH: "对单一前提逻辑闭环的迷信彻底取代了直面良知的判断力（Urteilskraft），导致平庸之恶的诞生。",
        },
      },
      {
        lineNum: 9,
        textDE: "Die Tyrannei verlangte nur Gehorsam; der Totalitarismus aber verlangt die lückenlose innere Selbstaufgabe und Identifikation.",
        translationZH: "传统暴政仅仅勒令子民在外部行为上屈服顺从；而极权统治却贪婪地勒令个体献出全部内心世界，实现毫无保留的思想同质化。",
        vocab: {
          word: "Innere Gleichschaltung",
          meaningDE: "Beseitigung der Privatsphäre und des Gewissens zugunsten totaler Identifikation mit der Bewegung.",
          meaningZH: "内部心灵同质化：消灭一切私人生活领地与良心退路，强行与意识形态巨轮同频共振。",
        },
      },
      {
        lineNum: 10,
        textDE: "Der ideale Untertan totaler Herrschaft ist nicht der überzeugte Nazi oder Kommunist,",
        translationZH: "极权统治最理想的顺民与工具，绝非心怀坚定信念的狂热信徒，",
      },
      {
        lineNum: 11,
        textDE: "sondern Menschen, für die der Unterschied zwischen Fakt und Fiktion, zwischen wahr und falsch, nicht mehr existiert.",
        translationZH: "而是那些在内心深处，连‘客观事实与虚妄谎言’、‘真实与伪造’之间的界限都已彻底丧失感知与判断力的人。",
        stilmittel: {
          type: "Epistemologischer Nihilismus (认知虚无主义底线沦陷)",
          descDE: "Der Verlust des Wirklichkeitssinns macht die Masse manipulierbar für beliebige Führermythen.",
          descZH: "失去对客观真理的敬畏，使得大众沦为任由极权领袖谎言编织与摆布的麻木土壤。",
        },
      },
      {
        lineNum: 12,
        textDE: "Die soziale Grundlage des Totalitarismus ist die Verlassenheit (Loneliness) des modernen Massenmenschen.",
        translationZH: "极权统治在社会心理层面的终极温床，是现代大众社会中无家可归、原子化个体的无边‘孤独与被遗弃感’（Verlassenheit）。",
        vocab: {
          word: "Verlassenheit (Loneliness)",
          meaningDE: "Existenzieller Zustand des Völlig-von-allen-Verlassenseins und Verlusts der Zugehörigkeit zur Welt.",
          meaningZH: "被遗弃感：不仅是形单影只，更是失去了在共同世界中被确证价值的无根绝望状态。",
        },
      },
      {
        lineNum: 13,
        textDE: "Isolation ist der Verlust der politischen Handlungsmöglichkeit; Verlassenheit ist der Verlust des Vertrauens in die Welt und sich selbst.",
        translationZH: "孤立仅仅剥夺了政治行动的公域舞台；而被遗弃感则彻底摧毁了个体对世界常识与自身理性自我确证的全部信赖。",
        toneCategory: "existenz",
      },
      {
        lineNum: 14,
        textDE: "Dort, wo alle Menschen gleichgeschaltet sind, hört das Handeln auf; denn Handeln setzt Verschiedenheit voraus.",
        translationZH: "在所有人都被强制整齐划一、沦为同质齿轮之境，真正的自由‘行动’便告终结；因为行动的前提恰恰是人与人之间的独特与差异。",
      },
      {
        lineNum: 15,
        textDE: "Jedes Neugeborene aber bringt den Funken des Neuanfangs (Natalität) in die Welt,",
        translationZH: "然而，每一个来到世间的初生婴孩，都在世界中点燃了重新开启未来的原初火花（Natalität，诞生性），",
        toneCategory: "streben",
        vocab: {
          word: "Natalität (Gebürtigkeit)",
          meaningDE: "Arendts Begriff für die unzerstörbare menschliche Fähigkeit, einen radikalen Neuanfang zu wagen.",
          meaningZH: "诞生性（Natalität）：人类因‘被诞生’而拥有向死而生的崭新开端之伟力，自由的终极根基。",
        },
      },
      {
        lineNum: 16,
        textDE: "und dieser unberechenbare Ursprung der Freiheit kann von keinem totalitären System jemals vollständig erstickt werden.",
        translationZH: "而这股无法被算计掌控的自由起源伟力，是任何极权主义机器都绝无可能永久窒息泯灭的。",
        stilmittel: {
          type: "Philosophische Hoffnung & Widerstand (不可被窒息的自由尊严)",
          descDE: "Die Natalität bricht den Determinismus totalitärer Ideologien: Freiheit bleibt eine ontologische Konstante.",
          descZH: "诞生性彻底打破极权历史决定论的铁律神话：只要人类还在繁衍诞生，自由的奇迹便永不止息。",
        },
      },
    ],
    questions: [
      {
        id: "q-arendt-1",
        dimension: "argumentation",
        titleDE: "1. Wesen des Totalitarismus und Begriff des Terrors",
        titleZH: "极权主义的本质定义与总体恐怖的运转逻辑",
        afb: "AFB I",
        questionDE:
          "Worin besteht nach Hannah Arendt der kategoriale Unterschied zwischen traditionellen Tyranneien und dem modernen Totalitarismus?",
        questionZH:
          "在汉娜·阿伦特的经典分析中，传统专制暴政与二十世纪现代极权主义之间存在着何种范畴性的根本分界？",
        options: [
          {
            id: "a",
            textDE:
              "Während Tyranneien nur äußeren politischen Gehorsam erzwingen und einen privaten Rückzugsraum belassen, fordert der Totalitarismus durch permanenten Terror und Ideologie die lückenlose innere Gleichschaltung und vernichtet die Pluralität.",
            textZH:
              "传统暴政仅仅强求臣民在外部公共事务上屈服顺从，保留了私域私人生活；而极权统治则通过永恒运作的恐怖与意识形态，强求内心世界的绝对同质化，并彻底粉碎人类的复数性与独特性。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Tyranneien existierten nur in Afrika, während Totalitarismus ausschließlich ein Phänomen asiatischer Nomadenstämme war.",
            textZH:
              "传统暴政只存在于古罗马时代，而极权主义仅仅是极少数游牧部落才会出现的落后宗族习俗。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Der Totalitarismus verwendet überhaupt keine Gewalt, sondern stützt sich ausschließlich auf freiwillige Bürgerversammlungen und Volksabstimmungen.",
            textZH:
              "极权统治完全摒弃一切暴力和强制，仅仅依靠公民完全自愿参与的自由集会与民主公投维持运转。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Tyrannei zerstört das Gesetz; Totalitarismus behauptet, das höhere Gesetz der Natur (Rasse) oder Geschichte (Klasse) durch lückenlosen Terror zu vollstrecken.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 3 行与第 9 行明确区分：‘Die Tyrannei verlangte nur Gehorsam; der Totalitarismus aber verlangt die lückenlose innere Selbstaufgabe und Identifikation.’传统专制者只要老百姓不造反，并不关心臣民关起门来的私人思想；而纳粹主义与斯大林主义却利用集中营与秘密警察，不仅消灭反对派，更消灭一切潜在的怀疑与中立，企图将每个人熔铸进集体意识形态铁模之中。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（地理与历史错乱）：极权主义是 20 世纪高度现代技术、大众媒介与官僚制结合的西方现代性病理产物；\n• 选项 C 诊断（颠倒事实黑白）：恐怖恰恰是极权统治的本体核心原则，绝非自由自治。\n\n【时代思潮与哲学脉络】\n反思启蒙辩证法：阿伦特与阿多诺、霍克海默遥相呼应，揭示出高度理性的现代工业与官僚工具理性，若脱离伦理审思，可瞬间异化为高效运转的工业化杀人流水线。",
        klausurSatzDE:
          "Arendt differenziert die totale Herrschaft von traditioneller Despotie anhand ihres totalen Totalisierungsanspruchs: Indem Terror zum Dauerprinzip avanciert, erstickt das Regime nicht bloß Opposition, sondern liquidiert das menschliche Wesen als plurales Handlungssubjekt.",
        klausurSatzZH:
          "阿伦特通过全景总体化诉求将极权统治与传统专制暴政清晰切分：通过将恐怖升级为永久性运转原则，极权政权不仅铲除异见反对派，更在本体论上消解了人类作为复数性行动主体的生命本质。",
        ehzKeyPointsDE: [
          "Differenzierung zwischen äußerem Gehorsam (Tyrannei) und innerer Wesensumformung (Totalitarismus).",
          "Funktion des Terrors als konstitutives Dauerprinzip.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Differenzierung 4P)：精准对比外部服从与消灭私域内心的总体化同质化要求。",
          "采分点 2 (Terror-Analyse 4P)：深刻阐述恐怖从统治‘手段’异化为国家‘本体原则’的质变过程。",
        ],
      },
      {
        id: "q-arendt-2",
        dimension: "theorie",
        titleDE: "2. Mechanismus der Ideologie und Deduktionszwang",
        titleZH: "意识形态的封闭演绎机制与推演专政",
        afb: "AFB II",
        questionDE:
          "Welche verheerende Funktion erfüllt nach Arendt die 'eiserne Logik' totalitärer Ideologien im Denken des verführten Massenmenschen?",
        questionZH:
          "在汉娜·阿伦特的剖析中，极权意识形态那所谓的‘铁的逻辑演绎’在大众心理中发挥了何种灾难性的精神异化功能？",
        options: [
          {
            id: "a",
            textDE:
              "Sie emanzipiert sich radikal von realen Erfahrungswerten und Fakten; durch den unentrinnbaren Zwang der formalen Folgerichtigkeit ('Wer A sagt, muss B sagen') lähmt sie die moralische Urteilskraft und rechtfertigt jedes Verbrechen als historische Notwendigkeit.",
            textZH:
              "它激进脱离客观现实经验与事实真理；通过‘既然说了A就必须说B’的形式逻辑强权，剥夺了个体的良知批判与伦理判断力，将一切灭绝人性的罪行皆粉饰为历史发展的不可抗必然性。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Sie lehrt die Menschen, Gedichte von Schiller auswendig zu lernen, um die deutsche Grammatik zu verbessern.",
            textZH:
              "它指导人民背诵古典抒情诗歌，旨在帮助所有人提高修辞文雅水平与德语拼写规范。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Sie ermutigt den Bürger zum ständigen Widerspruch und zum skeptischen Hinterfragen aller staatlichen Parolen.",
            textZH:
              "它积极鼓励公民独立思考，勇于公开怀疑批判政府一切宣传标语与政策法令。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Ideologie = 'Logik einer Idee'. Sie duldet keine empirische Korrektur durch Realität, sondern unterwirft die Seele einem unbarmherzigen Deduktionszwang.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 7–8 行指出：‘Ihr Charakteristikum ist die Emanzipation vom Faktischen... die eiserne Logik zwingt den Verstand in eine Zwangsbewegung, die kein Urteil mehr erlaubt.’极权意识形态的最大魔力在于其内部完美自洽的逻辑闭环。如果相信了‘种族斗争是历史唯一真理’（前提A），那么为了实现种族纯洁就必须杀戮所谓病弱劣质者（结论B、C）。任何违背这一教条的残酷事实（如受害者的哭喊与无辜）都会被指责为‘资产阶级软弱温情’而被强行压制。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（荒谬无稽的文学矮化）：将毁灭人类生存根基的极权灾难混同为中小学语言背诵课；\n• 选项 C 诊断（彻底颠倒功能）：极权意识形态最恐惧的正是怀疑与经验反思，它以绝对信条禁锢头脑。\n\n【时代思潮与哲学脉络】\n康德批判哲学的反转：康德强调实践理性的主体自律与反思判断力（reflektierende Urteilskraft）；而极权主义则用僵死的决定论演绎法则废黜了判断力，使普通人沦为无需思考的‘执行机器’（如艾希曼审判中的‘平庸之恶’）。",
        klausurSatzDE:
          "Die totalitäre Ideologie operiert als hermetisches Deutungssystem: Durch die Emanzipation vom empirisch Faktischen erzeugt ihr deduktiver Zwang eine Denktyrannei, welche die autonome Urteilskraft suspendiert und monströse Verbrechen als wissenschaftliche Notwendigkeit legitimiert.",
        klausurSatzZH:
          "极权意识形态作为封闭自足的解释体系运转：通过与经验事实彻底脱钩，其演绎推论的强制性营造出严酷的思想暴政，从而搁置了个体自主的道德判断力，并将滔天暴行包装为不容置疑的科学与历史必然性。",
        ehzKeyPointsDE: [
          "Analyse der Entkoppelung von Fakten und logischer Folgerichtigkeit.",
          "Verbindung zur Ausschaltung der moralischen Urteilskraft (Eichmann-Problematik).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Ideologie-Mechanismus 4P)：透彻分析意识形态如何通过脱离事实的演绎闭环控制思维。",
          "采分点 2 (Urteilskraft-Verlust 4P)：精准建立从‘推演逻辑强权’到‘放弃独立良知判断’的因果论证链。",
        ],
      },
      {
        id: "q-arendt-3",
        dimension: "figuren",
        titleDE: "3. Verlassenheit als soziale Wurzel des Totalitarismus",
        titleZH: "现代原子化大众的被遗弃感与极权温床",
        afb: "AFB II",
        questionDE:
          "Warum bildet nach Hannah Arendt die psychologische Verfassung der 'Verlassenheit' (Loneliness) das entscheidende soziologische Fundament für den Aufstieg totalitärer Massenbewegungen?",
        questionZH:
          "为何在汉娜·阿伦特的社会学洞察中，现代大众‘被遗弃感’（Verlassenheit）的心理危机，成为了极权主义运动崛起的决定性温床？",
        options: [
          {
            id: "a",
            textDE:
              "Weil der in der Massengesellschaft isolierte und heimatlose Mensch das Vertrauen in die Mitwelt und die eigene Urteilskraft verloren hat; die totalitäre Bewegung bietet ihm durch ideologische Gewissheit und kollektive Scheingeborgenheit einen trügerischen Halt gegen das Nichts.",
            textZH:
              "因为在大众社会中沦为孤立原子且无家可归的个体，已彻底丧失了对公共世界与自身判断力的基本信赖；极权主义运动通过绝对教条的确凿感与集体主义虚幻归属感，为恐惧坠入虚无深渊的人们提供了自欺欺人的寄生依靠。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Weil verlassene Menschen immer über zu viel Bargeld verfügen und damit totalitäre Parteien finanzieren wollen.",
            textZH:
              "因为感到孤单的人往往手握过多闲置现金，因此迫不及待地想要通过资助激进极端政党来打发无聊时光。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Weil Einsamkeit und Verlassenheit völlig identisch mit dem bürgerlichen Familienurlaub am Meer sind.",
            textZH:
              "因为现代人的被遗弃感仅仅是指市民家庭在海边度假时偶尔感受到的片刻宁静与闲暇。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Isolation trennt von der Politik; Verlassenheit zerstört das Selbst. Der verlassene Massenmensch klammert sich an die Fiktion der Ideologie, um nicht mit seiner Sinnlosigkeit allein zu sein.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 12–13 行深刻剖析道：‘Die soziale Grundlage des Totalitarismus ist die Verlassenheit... Isolation ist der Verlust der Handlungsmöglichkeit; Verlassenheit ist der Verlust des Vertrauens in die Welt.’第一次世界大战与恶性通胀击碎了传统欧洲市民的稳定阶层坐标，千百万人沦为原子化、无处立足的无业大众。孤独使人丧失自我确证，而纳粹或斯大林的极权冲锋队与宏大叙事，正好给这些脆弱的游魂提供了‘融入历史伟大洪流’的虚假光荣。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（庸俗金钱唯物论）：被遗弃感是深刻的精神与社会存在危机，绝非富豪消遣；\n• 选项 C 诊断（可笑的日常化稀释）：混淆了积极有益的独处（Einsamkeit / Solitude）与痛苦自毁的被遗弃（Verlassenheit / Loneliness）。\n\n【时代思潮与哲学脉络】\n独处（Solitude）vs. 被遗弃（Loneliness）：阿伦特区分道：独处是自我与心灵的二人对话（Das Zwei-in-Einem），是哲思与良心的殿堂；而被遗弃则是连自我对话的能力都被剥夺，只剩与万物隔绝的彻骨寒冬。",
        klausurSatzDE:
          "Soziologisch fundiert Arendt den Totalitarismus in der Verlassenheit des modernen Massenindividuums: Aus der Entwurzelung und dem Zusammenbruch traditioneller Gemeinschaftsbindungen erwächst die fatale Bereitschaft, die autonome Existenz zugunsten der trügerischen Geborgenheit in einer totalen Ideologie zu opfern.",
        klausurSatzZH:
          "在社会学层面上，阿伦特将极权主义牢牢锚定于现代大众个体的被遗弃感：从传统共同体纽带的瓦解与精神无根漂泊中，催生出一种致命的自毁倾向——即甘愿牺牲独立的个体存在，以换取极权意识形态所许诺的虚妄集体归宿与心理慰藉。",
        ehzKeyPointsDE: [
          "Konzeptionelle Trennung von Isolation (politisch) und Verlassenheit (existenziell/sozial).",
          "Erklärung der Massenpsychologie als Vulnerabilität für totalitäre Rekrutierung.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Begriffsgenauigkeit 4P)：精准辨析政治维度的‘孤立’与生存论维度的‘被遗弃感’。",
          "采分点 2 (Massenpsychologie 4P)：深刻阐明无根大众对极权意识形态虚假安全感的心理依附机制。",
        ],
      },
      {
        id: "q-arendt-4",
        dimension: "theorie",
        titleDE: "4. Pluralität, Natalität und die Widerstandskraft der Demokratie",
        titleZH: "人之复数性、诞生性与现代自由民主防卫机制",
        afb: "AFB III",
        questionDE:
          "Inwiefern begründet Hannah Arendts philosophisches Konzept der 'Natalität' (Gebürtigkeit) und 'Pluralität' ein unverbrüchliches Fundament gegen jeden totalitären Determinismus?",
        questionZH:
          "在反击历史决定论与极权暴政的哲学深层战场上，阿伦特所提出的‘诞生性’（Natalität）与‘复数性’（Pluralität）如何构成了自由民主永不磨灭的希望灯塔？",
        options: [
          {
            id: "a",
            textDE:
              "Weil mit jeder Geburt eines neuen Menschen die unberechenbare Fähigkeit zu einem radikalen Neuanfang (Handeln) in die Welt einbricht; da Menschen verschieden sind, lässt sich die Geschichte niemals in ein starres ideologisches Zwangskorsett pressen.",
            textZH:
              "因为每一个新生命的降生，都为世界带来了一股无法被预先算计的激进开端与崭新行动潜能（Handeln）；正因为人与人是独特的复数存在，历史进程便绝无可能被永久禁锢于僵死一元的极权意识形态铁笼之中。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Weil Neugeborene sofort ein Parteibuch erhalten und damit den Staat vor allen Revolutionen bewahren.",
            textZH:
              "因为新出生的婴儿可以立刻被发放入党证书，从而确保任何激进社会变革都无法发生。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Weil Arendt damit beweisen wollte, dass menschliches Handeln sinnlos ist und die Geschichte ohnehin von Außerirdischen gelenkt wird.",
            textZH:
              "因为阿伦特企图借此证明人类一切政治行动皆毫无意义，整个宇宙历史早已被不可知的超自然神秘力量完全注定。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Der Mensch ist zur Freiheit verurteilt, weil er geboren wurde: Natalität ist der Quell der Spontaneität. Jede neue Generation birgt das Versprechen des Neubeginns gegen den Terror.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 15–16 行闪烁着崇高的哲学光芒：‘Jedes Neugeborene aber bringt den Funken des Neuanfangs (Natalität) in die Welt...’极权主义宣称已经穷尽了历史的终极法则，一切个体都只能服从宿命。而阿伦特引述奥古斯丁的名言：‘为了使开端存在，人被创造出来（Initium ut esset, creatus est homo）。’人之所以有自由，是因为人的本质是‘开端者’（Anfänger）。只要婴儿还在降生，极权就永远无法战胜自由。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（极权体制思维的投射）：将崇高的诞生性自由曲解为极权少先队的体制收编；\n• 选项 C 诊断（虚无主义与荒谬归因）：与阿伦特对政治行动自由的热烈捍卫背道而驰。\n\n【时代思潮与哲学脉络】\n防卫性民主与行动哲学：阿伦特的理论不仅深刻构成了联邦德国《基本法》‘防卫性民主’（streitbare Demokratie）与公民社会公共商谈的灵魂支柱，更在当代极权主义复苏的阴云下，指明了守护公共空间与人之尊严的永恒使命。",
        klausurSatzDE:
          "Mit den Theoremen der Pluralität und Natalität formuliert Arendt das unhintergehbare Gegengift zum Totalitarismus: Indem das Geborensein die ontologische Möglichkeit verbürgt, handelnd einen unvorhersehbaren Neuanfang zu stiften, triumphiert die Unverfügbarkeit menschlicher Freiheit über jede ideologische Zwangskonstruktion.",
        klausurSatzZH:
          "通过确立复数性与诞生性的哲学公理，阿伦特提炼出抵御极权主义不可动摇的精神解毒剂：生命的诞生性本体论地保证了人类通过自由行动开创新局的潜能，从而使得人类自由不可让渡的神圣尊严，终将战胜一切企图奴役人性的虚妄极权建构。",
        ehzKeyPointsDE: [
          "Philosophische Entfaltung der Begriffe Natalität (Neubeginn) und Pluralität (Differenz).",
          "Klausuradäquate Synthese zur Widerstandskraft offener, deliberativer Demokratien.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Natalität & Freiheit 4P)：精准提炼‘诞生性即开端之能’的哲学内涵及其对宿命论的瓦解力量。",
          "采分点 2 (Demokratieethik 4P)：高水准将复数性理念对接现代开放社会的公共讨论空间与反极权价值防线。",
        ],
      },
    ],
  },
  // =========================================================================
  // 7. SOWI: Max Weber — Wirtschaft und Gesellschaft (支配类型与官僚制)
  // =========================================================================
  {
    id: "weber-herrschaft",
    fach: "SoWi",
    genre: "Sachtext",
    author: "Max Weber",
    workTitleDE: "Wirtschaft und Gesellschaft",
    workTitleZH: "《经济与社会》",
    sceneTitleDE: "Die drei reinen Typen der legitimen Herrschaft",
    sceneTitleZH: "合法统治的三种纯粹类型（法理型、传统型与超凡魅力型）",
    versesRange: "Kap. 1, §16 & Kap. 3, §1–2",
    epochDE: "Klassische Soziologie der Moderne (1922)",
    epochZH: "现代经典政治社会学奠基 (1922)",
    contextDE:
      "Max Weber begründet die moderne Herrschafts- und Staatssoziologie: Macht ist jede Chance, den eigenen Willen auch gegen Widerstreben durchzusetzen. Herrschaft hingegen bedarf der Bereitschaft zum Gehorsam und gründet auf einem spezifischen Legitimitätsglauben. Weber unterscheidet drei reine Idealtypen legitimer Herrschaft: die rationale (legale), die traditionale und die charismatische Herrschaft.",
    contextZH:
      "马克斯·韦伯奠定了现代政治与支配社会学大厦：他将‘支配’（Herrschaft）与原始的‘权力’（Macht）严格剥离，指出稳定持久的政治秩序必然依赖于被统治者的‘合法性信仰’（Legitimitätsglaube）。韦伯抽象出三种纯粹的理想类型（Idealtypen）：法理型官僚统治（现代宪政与科层制）、传统型统治（宗法世袭与长老制）与卡里斯马超凡魅力型统治（英雄受难者与革命领袖）。",
    verses: [
      {
        lineNum: 1,
        textDE: "Macht bedeutet jede Chance, innerhalb einer sozialen Beziehung den eigenen Willen auch gegen Widerstreben durchzusetzen,",
        translationZH: "权力意味着在一段社会关系内部，哪怕遭遇抵抗也依然能够贯彻自身意志的一切机会，",
        toneCategory: "autoritaet",
        stilmittel: {
          type: "Fundamentale Begriffsdefinition (社会学权力基本定义)",
          descDE: "Macht ist soziologisch amorph: Sie kann auf physischer Gewalt, Erpressung oder Überlistung beruhen.",
          descZH: "权力具有非制度化的不定形性（amorph）：它可能源自暴力胁迫、经济勒索或奸巧欺诈，无法建立持久社会秩序。",
        },
      },
      {
        lineNum: 2,
        textDE: "gleichviel worauf diese Chance beruht. Herrschaft aber ist ein Sonderfall von Macht.",
        translationZH: "而无论这种强行推行意志的机会究竟依赖于何种粗糙基础。相比之下，‘支配’则是权力的一种特殊形态。",
      },
      {
        lineNum: 3,
        textDE: "Herrschaft soll heißen die Chance, für einen Befehl bestimmten Inhalts bei angebbaren Personen Gehorsam zu finden.",
        translationZH: "所谓支配，乃是指一项具有特定内容的命令，能够在特定人群中获得自觉顺从与服从的机会。",
        vocab: {
          word: "Herrschaft vs. Macht",
          meaningDE: "Herrschaft setzt die reale Chance voraus, dass ein Befehl als verbindlich anerkannt und befolgt wird.",
          meaningZH: "支配对比权力：支配必须具备内在服从意愿（Gehorsamspflicht）与稳定制度化预期，而非赤裸裸的强弓硬弩。",
        },
      },
      {
        lineNum: 4,
        textDE: "Jede echte Herrschaft pflegt den Glauben an ihre Legitimität zu erwecken und zu pflegen.",
        translationZH: "任何真正持久的统治系统，都必然极力唤起并悉心培植人们对其‘统治合法性’（Legitimität）的深层信仰。",
        toneCategory: "moral",
      },
      {
        lineNum: 5,
        textDE: "Je nach der Art des beanspruchten Legitimitätsglaubens ist der Typus der Herrschaft grundverschieden.",
        translationZH: "依据统治者所标榜并诉诸的合法性信仰之性质不同，统治的类型亦有着本质分野。",
      },
      {
        lineNum: 6,
        textDE: "Es gibt drei reine Typen legitimer Herrschaft: Erstens rationalen Charakters, zweitens traditionalen Charakters, drittens charismatischen Charakters.",
        translationZH: "合法统治存在三种纯粹类型：第一种是法理/理性维度的统治，第二种是传统维度的统治，第三种是超凡魅力（卡里斯马）维度的统治。",
        vocab: {
          word: "Drei Idealtypen",
          meaningDE: "Reine Gedankenkonstruktionen zur methodischen Analyse der empirischen Wirklichkeit.",
          meaningZH: "三大理想类型：韦伯用于提炼现实政治制度特征的方法论纯粹概念，现实政体多为三者的混合体。",
        },
      },
      {
        lineNum: 7,
        textDE: "Rationale Herrschaft beruht auf dem Glauben an die Legalität gesatzter Ordnungen",
        translationZH: "法理型（理性）统治奠基于人们对经由成文法定程序制定的法规制度之合法性的确信，",
        toneCategory: "streben",
      },
      {
        lineNum: 8,
        textDE: "und das Anweisungsrecht der durch sie zur Ausübung der Herrschaft Berufenen (legale Herrschaft).",
        translationZH: "以及对依法被赋予统治职权者所行使之命令权的崇高认可（现代法治国与宪政国家）。",
        stilmittel: {
          type: "Unpersönliche Sachlichkeit (非人格化客观法治原则)",
          descDE: "Man gehorcht nicht der Person des Vorgesetzten, sondern dem unpersönlichen Gesetz.",
          descZH: "公民服从的不是长官个人的私欲偏好，而是服从客观中立、人人平等的法律秩序抽象规则。",
        },
      },
      {
        lineNum: 9,
        textDE: "Der reinste Typus der legalen Herrschaft ist die bürokratische Verwaltung durch Fachbeamte.",
        translationZH: "法理型统治最纯粹、最高效的组织体现，便是由专业技术文官构成的‘科层制官僚行政’（Bürokratie）。",
        vocab: {
          word: "Bürokratie",
          meaningDE: "Präzise, unpersönliche, aktenmäßige und arbeitsteilige Verwaltung durch geschulte Spezialisten.",
          meaningZH: "官僚科层制：依靠分工、专业资历、文书案卷归档与层级节制，成为人类历史上理性效率最高的管理机器。",
        },
      },
      {
        lineNum: 10,
        textDE: "Traditionale Herrschaft beruht auf dem Alltagsglauben an die Heiligkeit von jeher geltender Traditionen",
        translationZH: "传统型统治则奠基于人们对亘古以来代代相传之习俗传统的不可侵犯的神圣日常信仰，",
        toneCategory: "existenz",
      },
      {
        lineNum: 11,
        textDE: "und die Legitimität der durch sie zur Autorität Berufenen (Patriarchalismus, Feudalismus).",
        translationZH: "以及对依据古老宗法传统而被赋予家长式世袭统治权威者的顺从（如封建君主制与宗族世袭酋长）。",
        vocab: {
          word: "Traditionale Herrschaft",
          meaningDE: "Gehorsam aus Pietät gegenüber dem Herkommen ('Weil es immer so war').",
          meaningZH: "传统型统治：因循守旧与敬祖崇古——服从的法理源自‘自古以来向来如此’的惯性权威。",
        },
      },
      {
        lineNum: 12,
        textDE: "Charismatische Herrschaft beruht auf der außeralltäglichen Hingabe an die Heiligkeit oder Heldenkraft",
        translationZH: "超凡魅力型（卡里斯马）统治，则奠基于对某一个体非凡的超常神圣性、英雄伟力，",
        toneCategory: "leidenschaft",
      },
      {
        lineNum: 13,
        textDE: "oder die Vorbildlichkeit einer Person und der durch sie offenbarten oder geschaffenen Ordnungen (Charisma).",
        translationZH: "或人格楷模特质的狂热个人崇拜与全心奉献，以及对其所宣告之新启示、新秩序的神圣归顺（如宗教先知、革命领袖、军事统帅）。",
        vocab: {
          word: "Charisma (Gnadengabe)",
          meaningDE: "Außeralltägliche persönliche Qualität, die als übermenschlich oder vorbildlich gilt.",
          meaningZH: "卡里斯马（恩赐魅力）：打破一切官僚与传统束缚的革命性狂澜力量，完全依赖于领袖本人的非凡神迹或功业确证。",
        },
      },
      {
        lineNum: 14,
        textDE: "Das Charisma ist die spezifisch revolutionäre Macht in traditionalen und bürokratischen Epochen.",
        translationZH: "超凡魅力乃是传统因循时代与死气沉沉官僚时代中最具颠覆性、破旧立新的革命性伟力。",
        stilmittel: {
          type: "Dialektischer Revolutionsfunke (历史变迁的革命火种)",
          descDE: "Charisma bricht die Regeln: 'Es steht geschrieben, ich aber sage euch...'",
          descZH: "卡里斯马是打破成规的利剑：借由‘经上固然有云，我却向你们宣告……’的领袖意志重塑历史走向。",
        },
      },
      {
        lineNum: 15,
        textDE: "Aber das Charisma kann nicht dauerhaft bestehen, ohne sich zu veralltäglichen.",
        translationZH: "然而超凡魅力绝无法长期保持狂热原初态，若要维系，它就必须无可避免地经历‘超凡魅力的日常化’（Veralltäglichung des Charismas）。",
        vocab: {
          word: "Veralltäglichung des Charismas",
          meaningDE: "Übergang von der personalen Ausnahmebeziehung in institutionalisierte Traditionalisierung oder Bürokratisierung.",
          meaningZH: "魅力日常化：当第一代革命领袖离世，其超凡权威必须转化为血缘世袭宗族（传统化）或文官组织制度（科层制），否则政权立时瓦解。",
        },
      },
      {
        lineNum: 16,
        textDE: "Moderne Demokratien bedürfen des Rechtsstaats, drohen aber im 'Gehäuse der Hörigkeit' zu erstarren.",
        translationZH: "现代民主国家固然迫切需要科层法治国以维系运转，却也时刻面临着窒息于冰冷僵死‘现代奴役铁笼’（Gehäuse der Hörigkeit）中的巨大险境。",
        toneCategory: "krise",
        stilmittel: {
          type: "Kulturpessimistische Warnmetapher (现代性官僚铁笼隐喻)",
          descDE: "Webers Warnung vor der totalen Entzauberung und Erstarrung im bürokratischen Räderwerk.",
          descZH: "韦伯对现代性的深层忧患：过度形式理性与专业官僚分工，可能彻底扼杀个体自由、责任心与灵性活力。",
        },
      },
    ],
    questions: [
      {
        id: "q-weber-1",
        dimension: "argumentation",
        titleDE: "1. Soziologische Differenzierung von Macht und Herrschaft",
        titleZH: "社会学核心基石：权力与支配的范畴分界",
        afb: "AFB I",
        questionDE:
          "Worin besteht nach Max Weber der kategoriale Unterschied zwischen 'Macht' und 'Herrschaft'?",
        questionZH:
          "在马克斯·韦伯的社会学体系中，‘权力’（Macht）与‘支配/统治’（Herrschaft）之间存在着何种决定性的范畴分界？",
        options: [
          {
            id: "a",
            textDE:
              "Macht ist jede amorphe Chance, den eigenen Willen gegen Widerstreben durchzusetzen; Herrschaft hingegen ist institutionalisiert und setzt die begründete Chance voraus, für einen Befehl spezifischen Gehorsam zu finden.",
            textZH:
              "权力是哪怕遭遇抵抗也能强行贯彻意志的任何不定形机会（包括强盗勒索）；而支配则是高度制度化的形态，必须具备一项特定命令能够获得被统治者内在自觉顺从与服从（Gehorsam）的稳定概率。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Macht besitzen ausschließlich Frauen, während Herrschaft nur von Männern ausgeübt wird.",
            textZH:
              "权力专属于女性在家庭内部行使，而支配统治则是男性在工厂车间劳动中的专利。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Macht und Herrschaft sind bloße Synonyme für das Besitzen von möglichst viel Geld auf einem Bankkonto.",
            textZH:
              "权力与支配完全是同义词，仅仅用来指代某人在瑞士银行账户中拥有多少数额的黄金储备。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Macht ist soziologisch instabil (Zwang vergeht, sobald die Waffe sinkt). Herrschaft ist dauerhaft, weil die Beherrschten den Befehl als bindend anerkennen (Legitimität).",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 1–3 行严格界定：‘Macht bedeutet jede Chance... den eigenen Willen auch gegen Widerstreben durchzusetzen... Herrschaft soll heißen die Chance, für einen Befehl... Gehorsam zu finden.’持枪抢劫者对受害者拥有瞬间的‘权力’，但绝非拥有‘支配’。因为受害者一旦脱身就会报警反抗；而国家交警的一声哨响却能让司机自觉刹车靠边，这背后正是‘服从义务’与‘合法性信仰’在发挥制度效能。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（庸俗性别偏见）：韦伯讨论的是纯粹社会关系的形式结构，绝非生物学生别划分；\n• 选项 C 诊断（狭隘经济还原论）：金钱是权力资源之一，但绝不能等同于社会学统治本身。\n\n【时代思潮与哲学脉络】\n理解社会学（Verstehende Soziologie）：韦伯强调社会行动必须包含行动者所赋予的‘主观意义’（subjektiv gemeinter Sinn）。统治之所以成立，关键在于被统治者在心中‘认为该命令是合法的’。",
        klausurSatzDE:
          "Weber scheidet Macht als soziologisch amorphe Durchsetzungschance von Herrschaft, welche sich als qualifizierte Machtform durch das Vorhandensein eines Gehorsamsapparates und den Legitimitätsglauben der Beherrschten auszeichnet.",
        klausurSatzZH:
          "韦伯将权力界定为社会学上无定形的意志强加概率，并将其与支配严格剥离：支配作为一种高级别的权力形态，其根本特质在于稳定服从机构的存在以及被统治者心中所确立的合法性信仰。",
        ehzKeyPointsDE: [
          "Präzise Definition beider Begriffe nach Weber.",
          "Herausarbeitung des Gehorsams- und Legitimitätskriteriums als Differenzierungsmerkmal.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Begriffsdefinition 4P)：精准复述韦伯对 Macht（贯彻意志的机会）与 Herrschaft（获得特定服从的机会）的标准定义。",
          "采分点 2 (Legitimitätskriterium 4P)：透彻阐明‘合法性信仰与自觉顺从’是权力转化为稳定制度化支配的唯一枢纽。",
        ],
      },
      {
        id: "q-weber-2",
        dimension: "theorie",
        titleDE: "2. Merkmale der rational-legalen Herrschaft und Bürokratie",
        titleZH: "法理型统治的制度机理与现代官僚科层制特征",
        afb: "AFB II",
        questionDE:
          "Welche Strukturmerkmale kennzeichnen nach Weber die 'rationale Herrschaft' und machen die moderne Bürokratie zur überlegensten Verwaltungsform?",
        questionZH:
          "根据韦伯的理想类型理论，哪些制度结构特征定义了‘法理型统治’，并使现代科层官僚制成为人类文明中技术上最理性的行政机器？",
        options: [
          {
            id: "a",
            textDE:
              "Unpersönliche Gesetzmäßigkeit, feste sachliche Kompetenzen, Diensthierarchie, Aktenmäßigkeit und die hauptamtliche Fachschulung der Beamten; man gehorcht dem unpersönlichen Gesetz, nicht der Person.",
            textZH:
              "非人格化的普遍成文法规、法定明确的职务管辖权、层级节制的职务等级制、严格的书面公文案卷归档（Aktenmäßigkeit）以及专业文官的专职化技术培训；公众服从的是非人格的法律规章，而非官吏个人的私欲。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Regierungsämter werden ausschließlich an die Verwandten des Herrschers vererbt, und alle Beamten arbeiten unbezahlt aus reinem Mitleid.",
            textZH:
              "所有政府官职完全世袭垄断给统治者亲戚后代，且全部官员出于对贫苦百姓的怜悯自愿不领取任何薪资。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Gesetze werden durch spontane Orakel und magische Rituale im Wald beschlossen, die jeden Tag geändert werden.",
            textZH:
              "国家法律每日由森林巫师通过神秘占卜与通灵巫术临时决定，并且朝令夕改绝无章法。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Die Bürokratie ist der Inbegriff der Zweckrationalität: Berechenbar, kontinuierlich, sachlich und frei von Willkür. Sie ist der Verwaltung durch Dilettanten technisch haushoch überlegen.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 7–9 行深入论证：‘Rationale Herrschaft beruht auf dem Glauben an die Legalität gesatzter Ordnungen... Der reinste Typus der legalen Herrschaft ist die bürokratische Verwaltung durch Fachbeamte.’与封建主凭喜怒哀乐赐恩、巫师占卜判案相比，现代科层制以精准、稳定、严格纪律与高度可预测性（Berechenbarkeit）运行，如同高精度的工业钟表，构成了工业社会大生产与现代法治国的支柱。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（宗法家产制特征）：裙带世袭是传统型统治（Patrimonialismus）的病灶，正是现代科层制所力图根除的；\n• 选项 C 诊断（原始巫术迷信）：混淆了前现代卡里斯马巫术与理性法理统治。\n\n【时代思潮与哲学脉络】\n世界的祛魅（Entzauberung der Welt）：伴随着理性化进程，一切神秘迷信的魔力皆从公共行政中被驱逐殆尽，取而代之的是冷峻精密的规则与数据。",
        klausurSatzDE:
          "Die Überlegenheit der rational-legalen Herrschaft kristallisiert sich im bürokratischen Verwaltungsstab: Durch Sachlichkeit, geschriebene Rechtsnormen, funktionale Arbeitsteilung und Aktenmäßigkeit substituiert sie willkürliche Despotie durch berechenbare Institutionenordnung.",
        klausurSatzZH:
          "法理型统治的制度优越性集中结晶于科层官僚行政系统：通过非人格的客观性、成文法规范、专业化职能分工与严密的文书归档机制，它以高度可预测的现代制度秩序彻底取代了前现代的专横暴虐。",
        ehzKeyPointsDE: [
          "Benennung der Kernmerkmale moderner Bürokratie (Hierarchie, Sachkompetenz, Aktenführung).",
          "Erklärung des Übergangs von personaler zu unpersonaler Herrschaftslegitimation.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Bürokratie-Merkmale 4P)：清晰列举现代科层官僚制的核心特征（层级制、专业化、公私分离、文卷主义）。",
          "采分点 2 (Entpersonalisierung 4P)：精准分析从‘服从领袖个人’向‘服从抽象法律条文’的历史飞跃。",
        ],
      },
      {
        id: "q-weber-3",
        dimension: "figuren",
        titleDE: "3. Charisma und das Problem der Veralltäglichung",
        titleZH: "卡里斯马权威的爆发力与其日常化困境",
        afb: "AFB II",
        questionDE:
          "Warum ist die 'charismatische Herrschaft' nach Max Weber zwar eine radikal revolutionäre Kraft, aber zugleich strukturell instabil und zur 'Veralltäglichung' verurteilt?",
        questionZH:
          "为何在韦伯的论析中，‘卡里斯马型统治’虽具有席卷一切旧秩序的激进革命性伟力，却在结构上具有致命的脆弱性，且注定难逃‘日常化’（Veralltäglichung）的命运？",
        options: [
          {
            id: "a",
            textDE:
              "Weil Charisma an die konkrete, sterbliche Person des Führers und den ständigen Erfolgsnachweis (Bewährung) gebunden ist; mit dem Tod des Führers oder dem Ausbleiben von Erfolgen muss die Bewegung entweder zerfallen oder in dauerhafte traditional-bürokratische Institutionen überführt werden.",
            textZH:
              "因为超凡魅力完全绑定于领袖肉身这一终将死亡的具象个体，并高度依赖于持续不断的战功或神迹确证（Bewährung）；一旦领袖离世或功业受挫，卡里斯马运动若不想立时作鸟兽散，就必须被迫转型为制度化的传统世袭或理性科层组织。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Weil charismatische Führer grundsätzlich keine Zähne haben und deshalb in der Politik nicht verstanden werden können.",
            textZH:
              "因为卡里斯马型领袖天生不具备演说口才，因此在现代大众政治集会中完全无法与选民沟通。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Weil die Bundesbank es gesetzlich verbietet, dass charismatische Menschen in Deutschland Parteien gründen.",
            textZH:
              "因为联邦中央银行在金融监管法律中明文禁止具有个人魅力的公民加入政治政党。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Charisma ist 'außeralltäglich'. Menschen können aber nicht ewig im Ausnahmezustand leben. Steuern müssen erhoben, Nachfolger geregelt werden – das Charisma erkaltet und wird Institution.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 13–15 行指出：‘Charismatische Herrschaft beruht auf der außeralltäglichen Hingabe... Aber das Charisma kann nicht dauerhaft bestehen, ohne sich zu veralltäglichen.’卡里斯马处于极端的‘超常状态’（außeralltäglich）。领袖活着时可以呼风唤雨，但一旦生老病死，‘谁是接班人’的问题就会引发灭顶之灾。为了生存，其随从门徒必须收税发薪、制定规则——革命的烈火由此冷却结晶为死板的日常官僚机构。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（无厘头人身矮化）：卡里斯马领袖往往具备极具煽动力的雄辩魅力；\n• 选项 C 诊断（法律常识错乱）：中央银行无权干涉政党结社自由，偷换概念。\n\n【时代思潮与哲学脉络】\n魅力与例行公事的辩证法：基督教早期耶稣的超凡魅力在他受难后，迅速通过使徒行传、主教任命与罗马教廷法典化，完成了从个人卡里斯马到‘制度卡里斯马’（Amtscharisma）的经典日常化蜕变。",
        klausurSatzDE:
          "Die immanente Aporie charismatischer Herrschaft wurzelt in ihrer Personenfixierung: Da die außeralltägliche Gnadengabe an der Endlichkeit des Führers scheitert, erzwingt das Kontinuitätsbedürfnis der Anhängerschaft die unvermeidliche 'Veralltäglichung' in legale oder traditionale Dauerstrukturen.",
        klausurSatzZH:
          "卡里斯马型统治的内在悖论植根于其激进的人格化依附：由于超凡的恩赐魅力必然受挫于领袖肉身的有限性，追随者对秩序延续性的现实诉求，便倒逼卡里斯马不可逆转地‘日常化’为法理型或传统型的持久体制结构。",
        ehzKeyPointsDE: [
          "Charakterisierung des Charismas als personale, außeralltägliche Ausnahmeform.",
          "Analyse des Nachfolgeproblems und der Mechanismen der Veralltäglichung.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Charisma-Dynamik 4P)：精准阐发卡里斯马超常性、反建制性与依赖‘功业确证’的脆弱心理机制。",
          "采分点 2 (Veralltäglichung 4P)：深刻剖析接班人危机如何不可抗拒地驱动革命政体滑向官僚科层化或宗法传统化。",
        ],
      },
      {
        id: "q-weber-4",
        dimension: "theorie",
        titleDE: "4. Kulturkritik: Das 'Gehäuse der Hörigkeit' und moderne Demokratie",
        titleZH: "现代性文化批判：官僚‘奴役铁笼’与宪政民主防线",
        afb: "AFB III",
        questionDE:
          "Inwiefern birgt Webers soziologische Diagnose des drohenden 'Gehäuses der Hörigkeit' (Bürokratisierung) eine hochaktuelle Warnung für moderne westliche Demokratien?",
        questionZH:
          "在反思现代西方民主制度困局时，马克斯·韦伯所提出的官僚‘现代奴役铁笼’（Gehäuse der Hörigkeit）警世预言，在何种意义上构成了对现代宪政体系最深刻的批判警钟？",
        options: [
          {
            id: "a",
            textDE:
              "Weil die vollendete bürokratische Zweckrationalität dazu tendiert, lebendige demokratische Willensbildung durch unhinterfragbare Sachzwänge und anonyme Verwaltungsroutine zu ersetzen; der Bürger droht vom autonomen Staatsbürger (Citoyen) zum bloßen verwalteten Objekt degradiert zu werden.",
            textZH:
              "因为极致发展的工具理性与技术官僚制，极易用所谓‘客观不可逆的冰冷客观必要性’（Sachzwänge）和冷漠的行政例行公事，全面架空甚至扼杀鲜活的公民民主意志表达；主权公民面临着从拥有政治自主权的城邦主体，退化为被官僚流水线全方位规训与支配的消极客体。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Weil Bürokratie bedeutet, dass alle Bürger gezwungen werden, jeden Tag acht Stunden in einem echten Käfig aus Stahl und Eisen zu schlafen.",
            textZH:
              "因为官僚制的字面意思是指国家强制要求所有公民每晚必须在钢铁锻造的真正物理铁笼中睡满八小时。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Weber wollte damit ausdrücken, dass es überhaupt keine Probleme mit Behörden gibt und Formulare immer Freude bereiten.",
            textZH:
              "韦伯借此仅仅是想表达政府行政部门没有任何弊端，填写政务申请表格始终能为人民带来无尽的快乐与幸福。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Das Gehäuse der Hörigkeit meint die Herrschaft der Experten ohne Geist, der Fachmenschen ohne Herz. Demokratie verkümmert, wenn Politiker nur noch verwalten statt visionär zu führen.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 16 行凝结着韦伯毕生最沉重的叹息：‘Moderne Demokratien bedürfen des Rechtsstaats, drohen aber im Gehäuse der Hörigkeit zu erstarren.’官僚制拥有不可战胜的行政效率，但也孕育着‘专职文官专政’的风险。当政客将一切政治争议皆推脱为‘专家技术报告的唯一客观选择’时，议会的政治辩论便彻底沦为空转，公民对民主制度的效能感被彻底掏空。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（可笑的字面物理化误读）：把深刻的社会学隐喻当成了动物园物理围栏；\n• 选项 C 诊断（彻底颠倒批判立场）：韦伯是极具清醒现实感的现代性批判大师，绝非盲目的官僚赞歌唱家。\n\n【时代思潮与哲学脉络】\n价值理性 vs. 工具理性：法兰克福学派（阿多诺、哈贝马斯）直接继承了韦伯的这一批判，警告大众警惕‘行政管理的世界’（verwaltete Welt）对人的主体性的异化吞噬。",
        klausurSatzDE:
          "In weitsichtiger Kulturkritik diagnostiziert Weber das bürokratische 'Gehäuse der Hörigkeit' als latente Totalitarismusgefahr der Moderne: Wenn unpersönliche Sachzwanglogik das primatpolitische Ethos verdrängt, erstarrt die rechtsstaatliche Demokratie zum technokratischen Verwaltungsregime ohne bürgerschaftliche Vitalität.",
        klausurSatzZH:
          "在极具远见的文化批判中，韦伯将科层官僚的‘奴役铁笼’诊断为现代性潜在的系统性危机：一旦非人格的‘客观必要性逻辑’彻底驱逐了政治伦理与价值决断，宪政民主体制便极易僵化蜕变为空有程序空壳、丧失公民民主生命力的纯技术官僚专政。",
        ehzKeyPointsDE: [
          "Verständnis der Metapher 'Gehäuse der Hörigkeit' (Technokratie- und Bürokratiekritik).",
          "Aktualisierung für moderne Probleme der Sachzwangpolitik und Partizipationskrise.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Metapher-Deutung 4P)：精准阐释‘奴役铁笼’隐喻背后的形式理性过度膨胀与技术官僚专政风险。",
          "采分点 2 (Demokratiebezug 4P)：高度对接现代代议民主中的公民政治冷漠、客观必要性政治（Sachzwangpolitik）与民粹反弹危机。",
        ],
      },
    ],
  },
  // =========================================================================
  // 8. SOWI: Jürgen Habermas — Strukturwandel der Öffentlichkeit
  // =========================================================================
  {
    id: "habermas-oeffentlichkeit",
    fach: "SoWi",
    genre: "Sachtext",
    author: "Jürgen Habermas",
    workTitleDE: "Strukturwandel der Öffentlichkeit",
    workTitleZH: "《公共领域的结构转型》",
    sceneTitleDE: "Bürgerliche Öffentlichkeit und Refeudalisierung",
    sceneTitleZH: "市民公共领域的理性批判功能与大众媒介时代的再封建化",
    versesRange: "§ 4 & § 19 (Auszüge)",
    epochDE: "Kritische Theorie / Diskursethik (1962)",
    epochZH: "法兰克福学派批判理论 / 商谈伦理学 (1962)",
    contextDE:
      "Jürgen Habermas analysiert Entstehung und Zerfall der bürgerlichen Öffentlichkeit: Im 18. Jahrhundert formierte sich in Salons und Kaffeehäusern ein Publikum privater Bürger, die durch rationales Räsonnement (den 'zwanglosen Zwang des besseren Arguments') die absolutistische Geheimpolitik herausforderten. Im 20. Jahrhundert mutiert diese diskursive Öffentlichkeit unter dem Einfluss von Massenmedien, Public Relations und Konsumindustrie zurück in eine passive Schau-Bühne ('Refeudalisierung der Öffentlichkeit').",
    contextZH:
      "尤尔根·哈贝马斯对近代市民公共领域的诞生与蜕变做出了划时代的病理学诊断：18世纪启蒙时代，私人个体在咖啡馆、报刊与沙龙中汇聚为公众，凭借平等理性的公开辩论（Räsonnement）和‘更好论据的无强制力量’，撕开了封建王权密室政治的黑幕，确立了民主合法性根基。然而进入20世纪，在大众传媒垄断、商业公关广告与消费主义狂潮的侵蚀下，批判性的公共讨论急剧退化为被动的政治奇观与选秀作秀，公共领域遭遇了悲剧性的‘再封建化’（Refeudalisierung）。",
    verses: [
      {
        lineNum: 1,
        textDE: "Die bürgerliche Öffentlichkeit lässt sich vorerst als die Sphäre der zum Publikum versammelten Privatleute begreifen.",
        translationZH: "市民公共领域首先可以被理解为汇聚为公众的私人个体所构成的自由交往领域。",
        toneCategory: "streben",
        stilmittel: {
          type: "Soziologische Grundlegung (公共领域经典定义)",
          descDE: "Die Trennung von Staat (öffentliche Gewalt) und bürgerlicher Gesellschaft (Privatsphäre).",
          descZH: "确立现代政治学基础架构：在国家公共权力机器与市民社会私人领域之间，诞生了一个独立的第三空间——公共舆论场。",
        },
      },
      {
        lineNum: 2,
        textDE: "Sie beanspruchten die vom Staat reglementierte Sphäre der öffentlichen Gewalt gegen diese selbst,",
        translationZH: "他们向受国家管制的公共权力领域发起抗辩，甚至将矛头直指统治机器本身，",
      },
      {
        lineNum: 3,
        textDE: "um sich mit ihr über die allgemeinen Regeln des Verkehrs in der grundlegend privatisierten Sphäre auseinanderzusetzen.",
        translationZH: "旨在就商品交换与社会再生产这一根本私域交往的普遍性规则，同国家政权展开公开辩驳与讲理交锋。",
      },
      {
        lineNum: 4,
        textDE: "Das Medium dieser Auseinandersetzung war das öffentliche Räsonnement der denkenden Privatleute.",
        translationZH: "而这场划时代思想交锋的唯一媒介，正是拥有批判思考能力的私人个体在公共空间中的理性商谈辩驳（Räsonnement）。",
        vocab: {
          word: "Öffentliches Räsonnement",
          meaningDE: "Gebrauch der Vernunft in freier Diskussion zur Überprüfung von Geltungsansprüchen.",
          meaningZH: "理性批判辩驳（Räsonnement）：超越宗族私利，基于逻辑论据和事实真相展开的公共审思与质疑过程。",
        },
      },
      {
        lineNum: 5,
        textDE: "Drei Kriterien konstituieren das Ideal der bürgerlichen Öffentlichkeit: Erstens das Absehen von Stand und Status,",
        translationZH: "三大崇高法则共同筑成了市民公共领域的规范性理想：第一是彻底悬置并无视现实中的身份等级与特权地位，",
        toneCategory: "moral",
        stilmittel: {
          type: "Normatives Postulat der Gleichheit (交往平等假定)",
          descDE: "Im Diskurs zählt nur die Kraft des Arguments, nicht Adelstitel oder Geld.",
          descZH: "在公共论辩的圆桌上，决定胜负的唯有论据本身的逻辑力量，贵族头衔与财产多寡在此被剥夺一切特权。",
        },
      },
      {
        lineNum: 6,
        textDE: "zweitens die Problematisierung bisher unhinterfragter Bereiche der staatlichen und kirchlichen Autorität,",
        translationZH: "第二是将国家与教会权威迄今为止不容置疑的特权禁区全面‘问题化’、置于理性审判台前，",
      },
      {
        lineNum: 7,
        textDE: "und drittens die prinzipielle Unabgeschlossenheit des Publikums: Jeder mündige Mensch muss Zutritt haben.",
        translationZH: "第三是受众原则上的全面开放性：任何具备心智成熟能力的个体皆享有平等准入权，不得设立排他藩篱。",
        vocab: {
          word: "Prinzipielle Zugänglichkeit",
          meaningDE: "Öffentlichkeit verliert ihren Sinn, wenn gesellschaftliche Gruppen systematisch ausgeschlossen werden.",
          meaningZH: "普遍准入原则：一旦某个社会阶层或群体被制度性排斥，公共领域便立时沦落为少数人的特权俱乐部。",
        },
      },
      {
        lineNum: 8,
        textDE: "Geltung beansprucht hier allein der eigentümlich zwanglose Zwang des besseren Arguments.",
        translationZH: "在此，享有至高合法性裁判权的，唯有‘更好论据那奇妙的无强制力量’（Der zwanglose Zwang des besseren Arguments）。",
        toneCategory: "streben",
        stilmittel: {
          type: "Habermas'sches Oxymoron (著名悖论修辞)",
          descDE: "'Zwangloser Zwang': Die rationale Überzeugungskraft eines Arguments zwingt den Verstand ohne physische Gewalt.",
          descZH: "哲学史上最震撼的修辞杰作：论据的逻辑力量没有刀枪的物理胁迫（zwanglos），却能令理性良知心悦诚服、甘愿遵从（Zwang）。",
        },
      },
      {
        lineNum: 9,
        textDE: "Im 20. Jahrhundert jedoch vollzieht sich ein tiefgreifender struktureller Wandel dieser Sphäre.",
        translationZH: "然而进入20世纪大众工业社会后，这一批判性交往领域却遭受了痛彻心扉的深层结构性畸变。",
        toneCategory: "krise",
      },
      {
        lineNum: 10,
        textDE: "Aus einem lesenden und urteilenden Publikum wird ein konsumierendes und applaudierendes Massenpublikum.",
        translationZH: "曾经以阅读经典、沉思审断为本的理性公民公众，退化蜕变为了沉溺于消费快感、只会麻木鼓掌喝彩的大众受众。",
        stilmittel: {
          type: "Antithetischer Kulturwandel (批判公众退化为消费大众)",
          descDE: "Verlust der Mündigkeit zugunsten passiver Medienberieselung und Konsumismus.",
          descZH: "深刻揭示现代传播异化：主动的理性商谈主体，被降格为被动接受媒介投喂与广告公关操弄的商业流量奴隶。",
        },
      },
      {
        lineNum: 11,
        textDE: "Die Massenmedien und die kommerzielle Werbung verwandeln den herrschaftsfreien Diskurs in eine Schau-Bühne.",
        translationZH: "大众媒体垄断寡头与商业广告公关将不受奴役的自由商谈讲坛，彻底改装为了充满视听感官刺激的商业秀场与娱乐舞台。",
      },
      {
        lineNum: 12,
        textDE: "Dieser Vorgang lässt sich treffend als 'Refeudalisierung der Öffentlichkeit' bezeichnen.",
        translationZH: "这一极其危险的历史倒退进程，可以被极其精准地定性为‘公共领域的再封建化’（Refeudalisierung der Öffentlichkeit）。",
        vocab: {
          word: "Refeudalisierung",
          meaningDE: "Wiederkehr von feudalen Repräsentationsformen: Politik als Inszenierung von Glanz und Schein statt Diskurs.",
          meaningZH: "公共领域再封建化：中世纪领主在子民面前巡游炫耀排场以换取盲从；现代政客利用公关形象、包装作秀，重现封建式的形象代表与盲从收割。",
        },
      },
      {
        lineNum: 13,
        textDE: "Politik wird nicht mehr öffentlich diskutiert, sondern vor dem Publikum inszeniert wie eine feudale Prunkentfaltung.",
        translationZH: "公共政治不再是摆在台面上让公民细致推敲论辩的理性事业，而是演变成了在公众面前如中世纪宫廷巡游般精心排练的权贵作秀表演。",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 14,
        textDE: "Public Relations und Wahlkampf-Marketing zielen nicht auf Überzeugung durch Argumente, sondern auf Akklamation und Gefühlsmanagement.",
        translationZH: "现代政治公关与选举营销的目的早已不是通过真凭实据以理服人，而是旨在诱导大众形成应激式的盲目喝彩与情感煽动控制。",
      },
      {
        lineNum: 15,
        textDE: "Dennoch bleibt die Idee der deliberativen Demokratie der unaufgebbare Kern moderner Legitimität:",
        translationZH: "即便如此，‘商谈民主/协商民主’（Deliberative Demokratie）的崇高理念，依然是现代政治合法性不可放弃的终极精神内核：",
        toneCategory: "streben",
        vocab: {
          word: "Deliberative Demokratie",
          meaningDE: "Legitimität entsteht nicht durch Mehrheitsentscheid allein, sondern durch vorherigen fairen und rationalen Diskurs.",
          meaningZH: "商谈协商民主：少数服从多数的投票只是形式，唯有在投票前经过充分、平等、透明的理性商谈辩驳，法律才具有真正的伦理正当性。",
        },
      },
      {
        lineNum: 16,
        textDE: "Nur solche Normen dürfen Geltung beanspruchen, denen alle möglicherweise Betroffenen in einem herrschaftsfreien Diskurs zustimmen könnten.",
        translationZH: "唯有那些能够在一场杜绝强权压迫、不受支配的公开商谈中，获得所有潜在利益相关者理性认同的社会法则与法律规范，方配享有神圣的效力尊严！",
        stilmittel: {
          type: "Diskursiver Universalisierungsgrundsatz (商谈伦理普遍化原则 U)",
          descDE: "Habermas' Diskursprinzip: Demokratische Legitimität wurzelt in der kommunikativen Vernunft der Bürger.",
          descZH: "法兰克福学派的宪政宣言：法律的真理性和正当性，最终源于平民百姓在理智交往与商谈中达成的无强制共识。",
        },
      },
    ],
    questions: [
      {
        id: "q-habermas-1",
        dimension: "argumentation",
        titleDE: "1. Konstitutive Merkmale der bürgerlichen Öffentlichkeit",
        titleZH: "启蒙市民公共领域的规范性理想与三大支柱",
        afb: "AFB I",
        questionDE:
          "Welche drei wesentlichen normativen Kriterien begründen nach Jürgen Habermas das historische Ideal der bürgerlichen Öffentlichkeit im 18. Jahrhundert?",
        questionZH:
          "在尤尔根·哈贝马斯对18世纪欧洲启蒙市民公共领域的历史重构中，哪三大核心规范法则构成了其对抗专制王权的理想支柱？",
        options: [
          {
            id: "a",
            textDE:
              "1. Absehen von gesellschaftlichem Status (Gleichheit im Argument), 2. Problematisierung staatlicher Monopole und bisheriger Tabus, 3. Prinzipielle Zugänglichkeit für alle mündigen Bürger.",
            textZH:
              "1. 辩论时彻底抛弃并悬置社会等级与身份地位（论据面前人人平等）；2. 将国家专制垄断与以往神圣不可侵犯的教条禁区全面置于理性审问之下；3. 原则上面向全体心智成熟的公民无门槛开放准入。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "1. Verbot von Büchern und Zeitungen, 2. Pflicht zur täglichen Lobpreisung des Kaisers, 3. Nur Millionäre dürfen sprechen.",
            textZH:
              "1. 全面查封一切报刊书籍，2. 强制公民每日集会赞颂皇帝功德，3. 唯有资产超过百万的寡头方有发言资格。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Es gab überhaupt keine Kriterien; Öffentlichkeit war identisch mit einem mittelalterlichen Viehmarkt ohne Worte.",
            textZH:
              "没有任何规范准则；所谓的公共领域与中世纪无声牲畜买卖集市毫无二致。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Das Bürgertum überwand feudale Standesschranken im Geist: Im Kaffeehaus zählte nicht das Adelsprädikat, sondern die Triftigkeit des Arguments.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 5–7 行清晰列出三大要素：‘Drei Kriterien konstituieren das Ideal der bürgerlichen Öffentlichkeit: Erstens das Absehen von Stand und Status, zweitens die Problematisierung bisher unhinterfragter Bereiche... drittens die prinzipielle Unabgeschlossenheit des Publikums.’启蒙时代资产阶级在英国伦敦咖啡馆、法国巴黎哲学沙龙中，确立了平等论辩的新规范。哪怕是平民学者，只要论点论据无懈可击，就能在理智上压倒贵族爵爷。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（封建专制密室表征）：这是公共领域出现前试图压制思想的旧制度反动行为；\n• 选项 C 诊断（抹杀历史启蒙内涵）：混淆了物质商品集市与政治批判公共领域。\n\n【时代思潮与哲学脉络】\n康德《回答这个问题：什么是启蒙？》：哈贝马斯直接承袭了康德关于‘理性的公开运用’（öffentlicher Vernunftgebrauch）的教导——启蒙即人摆脱自身招致的不成熟状态，勇敢运用自己的理智与公意对话。",
        klausurSatzDE:
          "Habermas rekonstruiert die bürgerliche Öffentlichkeit als egalitären Kommunikationsraum: Durch Statusabsehen, universelle Themenrelevanz und prinzipielle Inklusivität emanzipierte sich das bürgerliche Räsonnement von absolutistischer Herrschaftsräson.",
        klausurSatzZH:
          "哈贝马斯将市民公共领域重构为崇高的平等主义交往空间：通过悬置阶层身份、打破议题禁区与确立普遍包容性，市民阶层的理性批判论辩彻底从绝对主义封建君权的神话支配下解放出来。",
        ehzKeyPointsDE: [
          "Nennung und Erläuterung der drei Kriterien (Statusabsehen, Hinterfragung, Inklusion).",
          "Funktion des Räsonnements als Gegenentwurf zur fürstlichen Arkanpraxis.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Drei Kriterien 4P)：精准列举并阐明平等商谈的三大支柱（Statusabsehen, Tabukritik, Inklusion）。",
          "采分点 2 (Mündigkeit 4P)：透彻分析公共论辩如何终结君主密室专制（Arkanpraxis）并开创现代民主合法性。",
        ],
      },
      {
        id: "q-habermas-2",
        dimension: "theorie",
        titleDE: "2. Die Diagnose der 'Refeudalisierung der Öffentlichkeit'",
        titleZH: "‘公共领域再封建化’的深刻病理诊断",
        afb: "AFB II",
        questionDE:
          "Was versteht Jürgen Habermas unter der dramatischen Diagnose der 'Refeudalisierung der Öffentlichkeit' im 20. Jahrhundert?",
        questionZH:
          "哈贝马斯在批判20世纪大众传媒与资本主义民主异化时，所提出的‘公共领域再封建化’（Refeudalisierung der Öffentlichkeit）核心要义为何？",
        options: [
          {
            id: "a",
            textDE:
              "Die Rückverwandlung der argumentativen Öffentlichkeit in eine bloße Schau-Bühne: Durch Massenmedien, PR-Agenturen und Bild-Inszenierungen treten Politiker vor Bürgern auf wie mittelalterliche Feudalherren (Repräsentationsöffentlichkeit), um unkritischen Applaus statt rationale Debatte zu erzeugen.",
            textZH:
              "原本以理性论辩为本的公共领域被倒退蜕变回被动的作秀舞台：借由大众媒介巨头垄断、公关形象包装与视听表演，现代政客在大众面前如同中世纪封建领主巡游炫耀威仪一般，旨在谋求无思考的应激掌声与偶像崇拜，彻底抹杀了理性批判辩难。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Dass Bundeskanzler und Ministerpräsidenten wieder Kettenhemden tragen und mit Ritterschwertern im Bundestag kämpfen.",
            textZH:
              "联邦总理与各州州长重新披上中世纪锁子甲，手持骑士长剑在联邦议会大厦展开肉搏角斗。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Dass alle Zeitungen pleitegehen und die Menschen wieder per Rauchzeichen kommunizieren müssen.",
            textZH:
              "指代所有纸质报刊破产倒闭后，现代城市居民不得不被迫恢复古代烽火狼烟来传递天气预报。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Feudale Öffentlichkeit war 'Repräsentation vor dem Volk' (Herrscher zeigt Prunk). Bürgerliche Öffentlichkeit war 'Diskurs unter Gleichen'. Refeudalisierung bedeutet Rückfall in PR-Show und Scheindemokratie.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 11–13 行点中死穴：‘Die Massenmedien und die kommerzielle Werbung verwandeln den herrschaftsfreien Diskurs in eine Schau-Bühne... Dieser Vorgang lässt sich treffend als Refeudalisierung der Öffentlichkeit bezeichnen.’中世纪封建公共性是‘在子民面前展现领主光环’（Repräsentation vor dem Volk）；启蒙公共性是‘平民之间的讲理求真’；而在电视竞选与短视频时代，政客比拼的是发型、幽默人设、眼泪与营销口号——这正是现代科技武装下的封建狂欢节。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（可笑的古代实物具象化）：混淆了社会学批判概念与中世纪骑士古装剧道具；\n• 选项 C 诊断（科技通信退化论）：哈贝马斯批判的不是传播技术不足，而是传播内容被商业利益与政治公关彻底空心化。\n\n【时代思潮与哲学脉络】\n批判理论（Kritische Theorie）：阿多诺与霍克海默的‘文化工业’（Kulturindustrie）理论在哈贝马斯身上得到了政治学层面的深化，揭示大众文化如何将公民驯化为听话顺从的消费者。",
        klausurSatzDE:
          "Mit dem Diktum der 'Refeudalisierung' entlarvt Habermas die Entartung moderner Mediendemokratien: Durch professionelle PR-Inszenierung und passive Konsumentenhaltung degeneriert der emanzipatorische Bürgerdiskurs zur aristokratischen Repräsentationsbühne, welche bloße Akklamation statt diskursiver Überzeugung generiert.",
        klausurSatzZH:
          "通过提出‘再封建化’的警世名言，哈贝马斯无情揭穿了现代媒介民主的蜕变危机：在专业公关操弄作秀与被动消费主义心态的夹击下，原本具有解放意义的公民批判商谈，堕落为了新贵族的形象展示舞台，产出的唯有廉价的盲从喝彩而非理性的共识确证。",
        ehzKeyPointsDE: [
          "Präzise Begriffserklärung der 'Refeudalisierung' (Wandel von Diskurs zu Schau).",
          "Analyse der Rolle von Massenmedien, PR und Konsumkultur bei der Entpolitisierung.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Refeudalisierungsbegriff 4P)：精准阐释‘再封建化’的概念内涵——即从‘主体间平等论辩’倒退为‘权贵单向形象展示’。",
          "采分点 2 (Medienkritik 4P)：透彻剖析公关营销、视听快感消费如何造成现代公众去政治化（Entpolitisierung）与批判力萎缩。",
        ],
      },
      {
        id: "q-habermas-3",
        dimension: "theorie",
        titleDE: "3. Der 'zwanglose Zwang des besseren Arguments'",
        titleZH: "‘更好论据的无强制力量’与民主法治正当性根基",
        afb: "AFB II",
        questionDE:
          "Welche erkenntnis- und demokratietheoretische Bedeutung besitzt Habermas' berühmte Formel vom 'zwanglosen Zwang des besseren Arguments'?",
        questionZH:
          "哈贝马斯所铸就的著名哲学命题——‘更好论据的无强制力量’（Der zwanglose Zwang des besseren Arguments），在认识论与商谈民主理论中具有何等深远的基石意义？",
        options: [
          {
            id: "a",
            textDE:
              "Es bezeichnet die rein rationale Einsichtskraft eines Arguments, das frei von physischer Gewalt, sozialem Druck oder Täuschung überzeugt; Gesetze besitzen nur dann echte demokratische Legitimität, wenn sie aus einem solchen fairen, argumentativen Verständigungsprozess hervorgehen.",
            textZH:
              "它指代论据本身所蕴含的纯粹理性说服力，在完全杜绝肉体暴力、社会特权施压或欺诈操纵的环境下令人心悦诚服；法律之所以拥有超越强权的真正民主合法性，端赖于其是由所有潜在受影响者通过这种公平平等的商谈达致共识的结果。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Es bedeutet, dass derjenige Redner die Wahl gewinnt, der das teuerste Megafon kauft und alle anderen lautstark überschreit.",
            textZH:
              "它指代谁购买了最昂贵的大喇叭扬声器并在广场上把所有反对派的呼声彻底盖过，谁的论点就是无可辩驳的真理。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Es besagt, dass Polizisten vor jeder Verhaftung ein philosophisches Seminar über Immanuel Kant abhalten müssen.",
            textZH:
              "它要求防暴警察在执行紧急逮捕任务之前，必须强制在现场为嫌疑人讲授三个小时康德道德哲学。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Im Diskurs herrscht ideale Sprechsituation: Weder Geld noch Macht dürfen den Konsens erzwingen. Allein die logische Triftigkeit und empirische Wahrheit der Begründung zählen.",
        explanationZH:
          "【正解依据与文本锚点】\n文本第 8 行与第 16 行遥相呼应：‘Geltung beansprucht hier allein der eigentümlich zwanglose Zwang des besseren Arguments... Nur solche Normen dürfen Geltung beanspruchen, denen alle Betroffenen zustimmen könnten.’哈贝马斯确立了交往理性（kommunikative Rationalität）的灯塔。多数人暴政（如 51% 投票剥夺 49% 人权）绝非正义；唯有在理想言谈情境（ideale Sprechsituation）下，经过充分说理、兼顾各方正当诉求而达成的理性共识，才是法治文明的尊严所在。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（声浪暴民强权）：赤裸裸的音量暴力恰恰是哈贝马斯所全力批判的伪商谈；\n• 选项 C 诊断（漫画式荒谬嫁接）：将高层次的立法正当性规范歪曲为警务执行条令。\n\n【时代思潮与哲学脉络】\n商谈伦理学（Diskursethik）：哈贝马斯与卡尔-奥托·阿佩尔（Karl-Otto Apel）共同完成了伦理学的‘交往转向’，将康德头脑中孤立个体的‘自省定言命令’，转变为多元社会中不同背景公民之间‘平等的对话求真’。",
        klausurSatzDE:
          "Das Postulat des 'zwanglosen Zwangs des besseren Arguments' markiert das Herzstück der Diskursethik: Indem es rationale Überzeugungskraft von illegitimer Machtausübung entkoppelt, fundiert es demokratische Gesetzesgeltung nicht auf bloßer Mehrheitsgewalt, sondern auf prozeduraler Einsichtsfähigkeit autonomer Staatsbürger.",
        klausurSatzZH:
          "‘更好论据的无强制力量’构成了商谈伦理学的精髓核心：通过将理性说服力与非法的权力胁迫断然剥离，它将民主法律的效力基础不再草率建立于单纯的多数人强权之上，而是牢牢筑基于自主公民在程序正义中达致的理性洞见能力。",
        ehzKeyPointsDE: [
          "Philosophische Interpretation des Oxymorons 'zwangloser Zwang'.",
          "Abgrenzung von legitimem Diskurskonsens gegenüber strategischer Überredung/Macht.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Oxymoron-Analyse 4P)：深刻剖析‘无强制之强制’这一哲学范畴的内在张力与理性解放本质。",
          "采分点 2 (Legitimationstheorie 4P)：高水平阐发商谈共识对抵御民粹多数人暴政、捍卫宪政合法性的奠基价值。",
        ],
      },
      {
        id: "q-habermas-4",
        dimension: "theorie",
        titleDE: "4. Digitale Öffentlichkeit: Fragmentierung oder Demokratisierung?",
        titleZH: "数字互联网时代的公共领域：信息茧房、算法垄断与协商民主危机",
        afb: "AFB III",
        questionDE:
          "Wie lässt sich Habermas' Theorie der Öffentlichkeit vor dem Hintergrund digitaler Plattformen (Social Media, Filterblasen, KI-Algorithmen) im 21. Jahrhundert dialektisch beurteilen?",
        questionZH:
          "在21世纪社交媒体平台、信息茧房算法（Filterblasen）与人工智能深伪技术横行的数字时代，我们应如何辩证审视哈贝马斯公共领域理论的当代现实穿透力？",
        options: [
          {
            id: "a",
            textDE:
              "Einerseits senkt das Internet die Zugangsschranken radikal (Demokratisierungschance); andererseits führen algorithmenbasierte Aufmerksamkeitsökonomie, Echokammern und Desinformation zu einer zersplitterten Teilöffentlichkeit, die den gemeinsamen Boden für rationale Argumentation zerstört und den gesellschaftlichen Konsens gefährdet.",
            textZH:
              "一方面，互联网激进打破了传统媒体垄断门槛，赋予人人发声的民主平民化契机；但另一方面，以流量注意力为导向的商业算法、回音室信息茧房与定向谣言操弄，将整体公共领域粉碎为彼此极化撕裂的部落化微群落，摧毁了理性对话的公共常识基石，使民主共识面临瓦解风险。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Das Internet hat alle Probleme der Menschheit endgültig gelöst, sodass es im 21. Jahrhundert keinerlei politische Meinungsverschiedenheiten mehr gibt.",
            textZH:
              "互联网已经永久解决了人类历史上的一切争端与分歧，21世纪的人类社会已进入人人观点完全相同的绝对和谐大同世界。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Habermas hat gefordert, das weltweite Internet sofort abzuschalten und wieder zur Brieftaubenpost des 15. Jahrhunderts zurückzukehren.",
            textZH:
              "哈贝马斯在最新著作中严厉呼吁立即切断全球互联网光缆，勒令全人类立刻全面恢复使用15世纪飞鸽传书传递政务信息。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Habermas sprach 2021 von einer 'neuen Strukturwandlung der Öffentlichkeit': Plattformen sind keine neutralen Verleger, sondern stimulieren Affekte für Werbegewinne. Demokratie braucht gemeinsame Fakten.",
        explanationZH:
          "【正解依据与文本锚点】\n哈贝马斯在 2021 年发表《公共领域的新结构转型》（Ein neuer Strukturwandel der Öffentlichkeit），再次对时代做出惊人诊断。社交媒体虽然实现了‘全民自媒体’，但平台算法为了牟取广告暴利，专门奖励激进化言论与愤怒情绪传播，导致公共空间碎片化为互相对骂的‘回音壁’。当人们连最基本的‘事实真伪’（如疫苗、选举舞弊、气候变化）都无法达成共识时，理性商谈的底线就坍塌了。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（天真盲目的技术乌托邦）：互联网非但没有消弭政治分歧，反而在很多国家催化了前所未有的政治两极极化；\n• 选项 C 诊断（卢梭式复古倒退讽刺）：哈贝马斯始终是坚定的启蒙现代性守护者，主张用民主法律规制数字平台，绝非盲目砸毁机器的卢德主义者。\n\n【时代思潮与哲学脉络】\n防卫性民主的数字疆界：现代西方公法学者正依据商谈民主理论，推动欧盟出台《数字服务法案》（DSA）与《人工智能法案》（AI Act），旨在用宪政缰绳驯服科技巨头，守护理智公共空间的清明土壤。",
        klausurSatzDE:
          "In dialektischer Aktualisierung spiegelt die digitale Netzwerköffentlichkeit Habermas' Warnungen verschärft wider: Die algorithmische Fragmentierung in affektgeladene Echokammern droht die zivilgesellschaftliche deliberative Kommunikationsinfrastruktur zu zerreißen, sofern digitale Plattformen nicht einer strengen rechtsstaatlichen Re-Regulierung unterworfen werden.",
        klausurSatzZH:
          "在辩证的当代审视中，数字网络公共空间加剧印证了哈贝马斯的深层忧思：算法驱动的极化信息茧房正在撕裂公民社会的协商商谈基础设施；唯有将跨国数字平台置于法治国宪政框架的严格规制之下，人类方能挽救岌岌可危的理性公共领域。",
        ehzKeyPointsDE: [
          "Dialektische Abwägung: Partizipationsgewinn vs. Desinformations- und Fragmentierungsgefahr.",
          "Verknüpfung von Habermas' Diskurstheorie mit aktuellen Herausforderungen (DSA, Filterblasen).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Dialektik 4P)：辩证权衡数字门槛降低的民主赋权机遇，与注意力算法导致的信息极化回音室风险。",
          "采分点 2 (Verfassungsausblick 4P)：高水平引用欧盟平台规制或宪政法治防线，给出兼具学理厚度与时代关切的 AFB III 终审裁决。",
        ],
      },
    ],
  },

  // =========================================================================
  // 14. DEUTSCH: Franz Kafka — Die Verwandlung (现代叙事文学：异化与荒诞变形)
  // =========================================================================
  {
    id: "kafka-verwandlung",
    fach: "Deutsch",
    genre: "Epik",
    author: "Franz Kafka",
    workTitleDE: "Die Verwandlung",
    workTitleZH: "《变形记》",
    sceneTitleDE: "Kapitel 1 // Das Erwachen als ungeheures Ungeziefer",
    sceneTitleZH: "第一章：怪诞变形之晨 (劳工异化、生存焦虑与形而上荒诞)",
    versesRange: "Kapitel 1, Textanfang (Z. 1–38)",
    epochDE: "Moderne / Früher Expressionismus (1912/1915)",
    epochZH: "现代主义 / 早期表现主义与存在主义文学 (1912/1915)",
    contextDE:
      "Als Gregor Samsa eines Morgens erwacht, findet er sich im Körper eines monströsen Ungeziefers gefangen. Kafka inszeniert diesen unerklärlichen Schockmoment in einer nüchtern-präzisen, bürokratischen Diktion, die das Unfassbare als alltägliche Tatsache festhält.",
    contextZH:
      "当小职员格里高尔·萨姆沙清晨醒来，赫然发现自己被禁锢在一具巨大的甲虫肉身之中。卡夫卡拒绝提供任何神话或童话式的超自然解释，而是以惊人客观、冷峻、近乎行政公文般的平铺直叙笔调，将这一荒谬绝伦的生存绝境记录为无法逃避的日常事实。",
    verses: [
      {
        lineNum: 1,
        textDE: "Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte...",
        translationZH: "当格里高尔·萨姆沙某天清晨从不安的睡梦中醒来时……",
        toneCategory: "krise",
        vocab: {
          word: "unruhige Träume",
          meaningDE: "Psychosomatische Vorboten der existentiellen Entfremdung.",
          meaningZH: "不安的睡梦：深层潜意识中对奴役式生存状态与家庭重压的生理警讯。",
        },
      },
      {
        lineNum: 2,
        textDE: "...fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt.",
        translationZH: "……发现自己在床上变成了一只巨大的甲虫（害虫）。",
        toneCategory: "krise",
        stilmittel: {
          type: "Metapher / Chiffre des Monströsen",
          descDE: "Realisierte Metapher: Der Begriff 'Ungeziefer' objektiviert Gregors Wertlosigkeit im Produktionsprozess.",
          descZH: "实体化隐喻：'Ungeziefer'（害虫/不可献祭之秽物）将格里高尔在资本生产机器中被榨干剩余价值后的寄生废料本质具象化。",
        },
      },
      {
        lineNum: 3,
        textDE: "Er lag auf seinem panzerartig harten Rücken und sah...",
        translationZH: "他仰卧在坚如铁甲的硬壳后背上，稍微抬眼便看见……",
        toneCategory: "existenz",
        vocab: {
          word: "panzerartig",
          meaningDE: "Symbol für seelische Verpanzerung und physische Hilflosigkeit.",
          meaningZH: "铁甲般的：既象征着对外界残酷生存环境的心理硬化防御，又构成了肢体行动彻底瘫痪的实体牢笼。",
        },
      },
      {
        lineNum: 4,
        textDE: "...seinen gewölbten, braunen, von bogenförmigen Versteifungen geteilten Bauch,",
        translationZH: "……自己那褐色隆起、被弓形角质硬皮分割成节的拱形肚皮，",
        toneCategory: "existenz",
      },
      {
        lineNum: 5,
        textDE: "auf dessen Höhe sich die Bettdecke, zum gänzlichen Niedergleiten bereit, kaum noch erhalten konnte.",
        translationZH: "在这隆起的肚皮顶端，被子几乎挂不住，随时都要彻底滑落下来。",
        toneCategory: "spott",
      },
      {
        lineNum: 6,
        textDE: "Seine vielen, im Vergleich zu seinem sonstigen Umfang kläglich dünnen Beine...",
        translationZH: "跟他庞大身躯的其余部分相比，他那许多细得可怜的细腿……",
        toneCategory: "krise",
        stilmittel: {
          type: "Antithese / Groteske Diskrepanz",
          descDE: "Kontrast zwischen monströsem Panzerkörper und fragilen, zuckenden Gliedmaßen.",
          descZH: "对照/怪诞反差：庞大沉重的铁甲甲壳与羸弱颤抖、无法受控的细肢之间的荒诞失调。",
        },
      },
      {
        lineNum: 7,
        textDE: "...flimmerten ihm hilflos vor den Augen.",
        translationZH: "……在他眼前无助地晃动挣扎。",
        toneCategory: "krise",
      },
      {
        lineNum: 8,
        textDE: "»Was ist mit mir geschehen?«, dachte er. Es war kein Traum.",
        translationZH: "»我到底怎么了？« 他心里想。但这绝不是一场梦。",
        toneCategory: "existenz",
        vocab: {
          word: "Es war kein Traum",
          meaningDE: "Radikale Absage an eine fantastische Auflösung: Die Deformation ist physische Realität.",
          meaningZH: "这绝不是梦：卡夫卡在此粉碎了一切浪漫奇幻解构的幻想，将变形确立为不可逆转的物理现实与存在铁证。",
        },
      },
      {
        lineNum: 9,
        textDE: "Sein Zimmer, ein richtiges, nur etwas zu kleines Menschenzimmer, lag ruhig zwischen den vier wohlbekannten Wänden.",
        translationZH: "他的房间，一间地地道道、只不过稍微偏小的人类居室，安静地坐落在四堵熟悉的墙壁之间。",
        toneCategory: "autoritaet",
        stilmittel: {
          type: "Klaustrophobische Raumsemantik",
          descDE: "Die vier Wände markieren die bürgerliche Enge und das Gefängnis familiärer Verpflichtungen.",
          descZH: "密闭空间语义：四堵熟悉却逼仄的人类墙壁，象征着市民阶级狭隘道德规范与家庭无形债务构筑的精神囚笼。",
        },
      },
      {
        lineNum: 10,
        textDE: "Über dem Tisch hing das Bild, das er aus einer illustrierten Zeitschrift ausgeschnitten...",
        translationZH: "桌子上方挂着那张画，是他从一本画报上剪下来、装在镀金相框里的……",
        toneCategory: "sehnsucht",
      },
      {
        lineNum: 11,
        textDE: "Gregors Blick richtete sich dann zum Fenster, und das trübe Wetter...",
        translationZH: "格里高尔的目光随后转向窗外，那阴沉沉的灰暗天气……",
        toneCategory: "krise",
      },
      {
        lineNum: 12,
        textDE: "...man hörte Wassertropfen auf das Fensterblech aufschlagen – machte ihn ganz melancholisch.",
        translationZH: "……雨滴敲打着窗下铁皮的嗒嗒声——使他心头涌起一阵难以名状的忧郁。",
        toneCategory: "krise",
        stilmittel: {
          type: "Symbolik des Wetters (Depression)",
          descDE: "Tristes Regenwetter spiegelt die Monotonie und Trostlosigkeit seiner Existenz.",
          descZH: "天气隐喻（忧郁投射）：阴郁雨声与冰冷铁皮不仅是现实环境，更是他空虚、单调、被异化劳作磨灭生机的内心写照。",
        },
      },
      {
        lineNum: 13,
        textDE: "»Wie wäre es, wenn ich noch ein wenig weiterschliefe und alle Verrücktheiten vergäße«...",
        translationZH: "»要是我再睡上一会儿，把所有的疯癫怪事通通忘掉，那该有多好啊«……",
        toneCategory: "sehnsucht",
      },
      {
        lineNum: 14,
        textDE: "Aber das war gänzlich unausführbar, denn er war gewohnt, auf der rechten Seite zu schlafen...",
        translationZH: "但这完全办不到，因为他习惯向右侧睡，却因畸形身躯根本无法侧身翻转……",
        toneCategory: "spott",
      },
      {
        lineNum: 15,
        textDE: "»Ach Gott«, dachte er, »was für einen anstrengenden Beruf habe ich gewählt! Tagaus, tagein auf der Reise.«",
        translationZH: "»哎呀天哪，« 他心里想，»我究竟挑了一份多么累死累人的差事啊！长年累月四处奔波出差。«",
        toneCategory: "krise",
        vocab: {
          word: "anstrengenden Beruf",
          meaningDE: "Absurde Verdrängung: Das Verpassen des Zuges bedrückt ihn mehr als der Verlust des Menschenkörpers.",
          meaningZH: "荒谬的心理防御机制：面对肉身非人化的毁灭灾难，他最先担忧的竟仍是业务考勤与迟到受罚，揭示雇佣劳动对其灵魂的深度殖民。",
        },
      },
      {
        lineNum: 16,
        textDE: "»Der Teufel soll das alles holen!« Er fühlte ein leichtes Jucken oben auf dem Bauche...",
        translationZH: "»让魔鬼把这一切都统统抓走吧！« 此时他感到肚皮上方有一阵轻微的发痒……",
        toneCategory: "streben",
      },
    ],
    questions: [
      {
        id: "q-kafka-1",
        dimension: "wortschatz",
        afb: "AFB I",
        titleDE: "Erzählhaltung & Nüchternheit des Stils",
        titleZH: "叙事视角与冷静文体特征 (AFB I: Darstellen)",
        questionDE:
          "Welche Besonderheit kennzeichnet Kafkas Erzählperspektive und sprachliche Diktion in den ersten Sätzen von 'Die Verwandlung'?",
        questionZH:
          "卡夫卡在《变形记》开篇第一段中所采取的叙事视角（Erzählperspektive）与语言风格具有何种极具颠覆性的文学特质？",
        options: [
          {
            id: "a",
            textDE:
              "Eine personale Erzählperspektive (aus Gregors Innenwahrnehmung), gekoppelt mit einem nüchternen, fast amtlich-protokollarischen Berichtston, der die unfassbare Monstrosität der Verwandlung paradoxerweise als alltägliche Selbstverständlichkeit schildert.",
            textZH:
              "采用限制性个人叙事视角（深入格里高尔的主观内在感知），并罕见地嫁接了极度冷静、近乎司法或公文报告般的客观语调，将骇人听闻的怪物变形荒诞现象，悖论式地表述为冷冰冰的既成日常事实。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Ein pathetischer, erhabener Hymnenton voller Ausrufezeichen und mythologischer Götteranrufungen, der die Verwandlung als göttliche Belohnung feiert.",
            textZH:
              "通篇采用充满惊叹号与古希腊诸神祈祷的崇高颂歌笔调，将这一变成甲虫的变形事件热烈歌颂为神明赐予凡人的神圣奖赏。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Ein rein allwissender auktorialer Erzähler, der sich ständig mit moralischen Belehrungen und ironischen Witzen an das Lesepublikum wendet.",
            textZH:
              "采用纯粹居高临下的全知全能说教视角，在每一句话后都跳出文本，向读者展开连篇累牍的道德训诫并大讲低俗笑话。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Das Spezifische der 'Kafkaesken Diktion': Das Monströse wird nicht hysterisch skandalisiert, sondern sachlich wie ein Fahrplan oder Behördenbericht registriert.",
        explanationZH:
          "【正解依据与文本锚点】\n文学史上著名的‘卡夫卡式笔法’（Das Kafkaeske）：面对‘醒来变成巨型甲虫’这种极度骇人的超现实冲击，叙述者既没有歇斯底里的嚎啕，也没有童话式的神秘解释，而是用‘fand er sich in seinem Bett zu einem ungeheuren Ungeziefer verwandelt’这样平实得如同报告气象或公文的语调平铺直叙。正是这种‘超现实怪物事件’与‘冰冷行政官僚写实语调’之间的巨大张力，造就了卡夫卡无与伦比的荒诞感与存在震撼。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（狂飙突进/古典赞歌混淆）：卡夫卡是现代派冷峻解构大师，绝无古典主义的神性颂歌与浪漫激情；\n• 选项 C 诊断（18世纪全知启蒙小说混淆）：卡夫卡牢牢锁定在格里高尔的个人感知边界内（Personale Erzählsituation），读者与格里高尔一同陷入未知的困惑与幽闭恐慌，无任何外部旁白救场。\n\n【时代思潮与哲学脉络】\n现代主义早期的反崇高：卡夫卡宣告了古典人本主义‘人是万物尺度’的神话破产，现代人被剥夺了神性光环，在官僚流水线时代退化为冰冷无助的数据或‘害虫’。",
        klausurSatzDE:
          "Kafka bricht mit traditionellen Gattungskonventionen, indem er das Ungeheuerliche nicht phantastisch verklärt, sondern durch eine betont nüchterne, sachlich-protokollarische personale Erzählsituation als unhintergehbare Alltagswirklichkeit inszeniert.",
        klausurSatzZH:
          "卡夫卡颠覆了传统的文体成规，他没有对骇人异变进行浪漫奇幻的粉饰，而是通过高度冷静、近乎行政公文记录般的限制性人物叙事，将这场荒诞的怪物变形塑造成不容置疑且无从遁逃的冷酷现实日常。",
        ehzKeyPointsDE: [
          "Bestimmung der Erzählform: Personales Erzählen / erlebte Rede.",
          "Funktion des nüchternen Tons: Kontrastierung des Absurden mit bürokratischer Präzision.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Erzähltechnik 4P)：精准指出‘限制性人物叙事’（Personales Erzählen）及内聚焦特征。",
          "采分点 2 (Stilfunktion 4P)：深刻提炼‘冷静公文笔调’与‘荒诞超现实灾难’之间的剧烈反差审美张力。",
        ],
      },
      {
        id: "q-kafka-2",
        dimension: "motiv",
        afb: "AFB II",
        titleDE: "Entfremdung der Arbeit & Verdrängung",
        titleZH: "劳工异化与心理荒谬逃避机制 (AFB II: Analysieren)",
        questionDE:
          "Inwiefern offenbart Gregors unmittelbare Reaktion auf die körperliche Verwandlung (Z. 12–15: Klage über den Reiseberuf und Angst vor Zugverspätung) eine radikale Entfremdung des modernen Menschen?",
        questionZH:
          "格里高尔在发现肉身发生怪物畸变后的即刻反应（第12–15句：痛斥推销员差事之劳碌、唯恐上班火车晚点），如何深刻揭示了现代雇佣劳动体制对个体灵魂的极致‘异化’（Entfremdung）？",
        options: [
          {
            id: "a",
            textDE:
              "Es liegt eine groteske Verschiebung der Prioritäten vor: Statt Panik über den Verlust seiner menschlichen Existenz zu empfinden, verfällt Gregor sofort in funktionale Arbeitsangst (Verspätung, Zorn des Chefs, familiäre Schuld), was beweist, dass seine Identität restlos auf die Funktion als kapitalistisches Rädchen im Getriebe reduziert wurde.",
            textZH:
              "呈现出极其怪诞的‘焦虑重心倒错’：面对人性肉身与生命的毁灭性丧失，格里高尔并未感到应有的求生惊恐，反而立刻陷入对雇佣劳作考勤的条件反射式恐惧（害怕迟到、畏惧老板训斥、焦虑家庭生计债务）。这铁证了他的人格与自我意识已被资本主义生产机器彻底殖民剥夺，沦为毫无独立主体性的齿轮工具。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Gregor liebt seine Firma und seinen Chef so leidenschaftlich, dass er die Verwandlung nur deshalb bedauert, weil er heute keine Überstunden für die geliebte Firma machen kann.",
            textZH:
              "格里高尔对他的公司与上司怀有无比狂热的敬爱，他之所以为变成甲虫感到遗憾，仅仅是因为今天无法主动为亲爱的老板无偿加班奉献。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Es handelt sich um reine Faulheit: Gregor hat sich absichtlich in einen Käfer verwandelt, um einen Krankenschein einzureichen und einen bezahlten Strandurlaub zu erzwingen.",
            textZH:
              "这纯属职场员工的偷懒摸鱼：格里高尔是故意通过冥想法把自己变成甲虫的，目的是为了找借口开出病假条，敲诈老板给自己放带薪海滩长假。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Marx'sche Entfremdungstheorie par excellence: Gregor hat seine Arbeit verinnerlicht; das System hat ihn so konditioniert, dass die Pflicht zum Funktionieren selbst seine existenzielle Vernichtung überschattet.",
        explanationZH:
          "【正解依据与文本锚点】\n文本呈现了惊人的‘心理置换与异化压抑’：格里高尔浑身长满甲壳、细腿狂颤，按常理应当向家人或医生呼救，但他在内省独白中，第一句话竟然是‘Ach Gott, was für einen anstrengenden Beruf habe ich gewählt!’紧接着分析‘火车的转车问题、推销员业务的繁杂’。他唯恐赶不上早班车遭到公司总管的当面呵斥，唯恐全家的生计债务断供。这无可辩驳地印证了马克思在《1844年经济学哲学手稿》中的论断：在资本主义异化劳动中，劳动者在自己的劳动中不是肯定自己，而是否定自己；人在真正的人的机能中觉得自己像动物，而在动物的机能（维持机器运转）中才觉得自己像人。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（反讽倒置）：格里高尔在内心对老板充满了厌恶（‘Der Chef säße auf dem Pult und spräche von oben herab...’），他唯一的支撑是还清父亲欠下的旧债；\n• 选项 C 诊断（低级庸俗化解读）：变形是格里高尔毫无防备的悲剧，根本不存在任何蓄意逃避劳动的自欺欺人游戏。\n\n【时代思潮与哲学脉络】\n泰勒制与现代官僚社会：20世纪初工业化迅速推进，个体被高度物化（Verdinglichung）。卡夫卡在此完成了对现代工具理性压榨人性的终极文学控诉。",
        klausurSatzDE:
          "Die groteske Diskrepanz zwischen physischer Monstrosität und bürokratischer Pflichterfüllung entlarvt Gregors Verinnerlichung kapitalistischer Verwertungszwänge: Das Subjekt ist derart entfremdet, dass selbst die eigene existenzielle Auslöschung hinter der Angst vor ökonomischer Dysfunktionalität zurücktritt.",
        klausurSatzZH:
          "身体的怪诞怪物化与对职场考勤义务的执念之间的荒谬反差，深刻揭露了格里高尔对资本主义功利榨取法则的深度内化：主体已经被异化至如此地步，以至于其自身存在维度的彻底毁灭，竟然完全被‘丧失经济齿轮运转功能’的惊恐所掩盖掩蔽。",
        ehzKeyPointsDE: [
          "Analyse der Prioritätenverschiebung (funktionale Angst statt biologischer Panik).",
          "Anbindung an den Begriff der Entfremdung (Marx/Weber) und die Instrumentalisierung des Individuums.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Figurenpsychologie 4P)：精准剖析焦虑重心从‘生理形变惊恐’向‘职场功能失效恐惧’的病理学置换。",
          "采分点 2 (Theorievernetzung 4P)：深度联动异化劳动（Entfremdung）与现代工具理性铁笼概念，达成 15 NP 学理拔高。",
        ],
      },
      {
        id: "q-kafka-3",
        dimension: "handlung",
        afb: "AFB II",
        titleDE: "Raumsemantik & Familiärer Schuldzusammenhang",
        titleZH: "密闭空间语义与市民家庭债务枷锁 (AFB II: Einordnen)",
        questionDE:
          "Welche dramaturgische und metaphorische Funktion erfüllen die vier Wände von Gregors Zimmer und das Bild der Dame im Pelz (Z. 9–10) im Gesamtzusammenhang des Werks?",
        questionZH:
          "格里高尔卧室中狭小逼仄的‘四堵墙壁’以及墙上悬挂的‘裹着皮草的贵妇剪报画像’（第9–10句），在整部小说的象征母题与空间拓扑学中承载了何种深层功能？",
        options: [
          {
            id: "a",
            textDE:
              "Das Zimmer fungiert als klaustrophobischer Übergangsraum zwischen bürgerlicher Disziplinierung und animalischer Isolation, während die gerahmte 'Dame im Pelz' ein säkularisiertes Fetisch-Symbol für Gregors unterdrückte Erotik, Wohlstandsträume und seine letzte Reminiszenz an die Menschenwelt darstellt.",
            textZH:
              "这间卧室充当了市民阶级道德纪律规训与非人野兽隔绝之间幽闭窒息的‘临界过渡空间’；而装在精致镀金相框中的‘皮草贵妇像’，则构成了格里高尔被压抑的情欲、对资产阶级体面生活的残存幻想，以及他坚守不肯放弃的最后一缕‘人类属性’的拜物教图腾隐喻。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Das Bild ist eine wertvolle Original-Mona-Lisa, die Gregor am nächsten Tag auf einer Kunstauktion verkaufen will, um Milliardär zu werden.",
            textZH:
              "这张画是价值连城的达芬奇《蒙娜丽莎》真迹，格里高尔打算第二天拿去苏富比艺术拍卖会变现，一举成为亿万富翁退休享清福。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Die vier Wände beweisen, dass Gregor in Wirklichkeit ein Schlossbesitzer ist und sich nur aus Spaß als einfacher Handlungsreisender verkleidet hat.",
            textZH:
              "四堵墙壁证明格里高尔真实身份其实是一座宏伟古堡的领主，他平日里只是出于个人特殊爱好乔装打扮成推销员游戏人间体验贫民生活。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Raumsemantik bei Kafka ist stets Gefängnis-Semantik: Das Zimmer wird zur Zelle. Das Pelz-Bild wird später im Text zum verzweifelt verteidigten Kern seiner Menschlichkeit.",
        explanationZH:
          "【正解依据与文本锚点】\n卡夫卡小说中的空间符号绝非中立背景，而是精神处境的外化：\n1. 空间密闭性（Klaustrophobie）：四堵逼仄的墙壁预示着格里高尔无论变形前后，都早已被关在市民家庭与职场考勤的双重牢笼中。随着剧情推进，三扇紧闭的门将成为家庭成员对他实施放逐与隔离的冷血屏障；\n2. 皮草贵妇画像（Dame im Pelz）：这是格里高尔在无休止的机械出差中，亲手从画报剪下并为之精心镶上镀金画框的物件。它凝聚着他对美丽、温暖、情欲与尊严的渴望。在后续章节中，当母亲和妹妹试图清空他的房间、剥夺他的人性痕迹时，格里高尔不惜用甲虫胸膛紧紧贴在冰冷的玻璃画像上死命护卫，展现出对‘人之尊严’最绝望而动人的悲壮挽留。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（低级常识错误）：文本明确指出这是‘aus einer illustrierten Zeitschrift ausgeschnitten’（从画报上剪下的图），突显其廉价与悲酸；\n• 选项 C 诊断（荒谬歪曲）：格里高尔是背负父亲破产巨额债务、在沉重现实中苦苦挣扎的社会底层齿轮，绝非领主贵族。\n\n【时代思潮与哲学脉络】\n弗洛伊德精神分析与父权压制：格里高尔的生活空间被父亲的暴虐阴影牢牢笼罩。画像既是对缺失母爱与异性温存的代偿，也是弱小自我在严酷超我（父亲与老板）面前的退行避难所。",
        klausurSatzDE:
          "Die klaustrophobische Raumkonstellation determiniert Gregors Dasein als schrittweise Verdrängung und Isolierung: Während das Zimmer die familiale Zelle markiert, avanciert die Bildikone der Dame im Pelz zum ambivalenten Symbol seiner unterdrückten Libido sowie seiner letzten, krampfhaften Klammer an die bürgerliche Humanität.",
        klausurSatzZH:
          "幽闭窒息的空间拓扑格局将格里高尔的生存命运注定为一步步的排挤与隔绝：如果说卧室标志着家庭伦理规训的冰冷监牢，那么皮草贵妇的画像图腾则跃升为其被压抑的爱欲潜意识、以及他拼死依附于市民阶级残存人性尊严的最后一根救命稻草。",
        ehzKeyPointsDE: [
          "Deutung der Raumsemantik: Zimmer als bürgerliches Gefängnis und Isolationsraum.",
          "Funktion des Pelzbildes: Verdinglichte Ersatzbefriedigung und Symbol humaner Identität.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Raumdeutung 4P)：深刻阐发‘卧室四壁’作为市民家庭异化与物理隔离监牢的象征机制。",
          "采分点 2 (Motivnetz 4P)：精准捕捉‘皮草贵妇画像’作为潜意识欲望投射与人性残存防线的双重意涵。",
        ],
      },
      {
        id: "q-kafka-4",
        dimension: "theorie",
        afb: "AFB III",
        titleDE: "Existenzphilosophische & Expressionistische Beurteilung",
        titleZH: "存在主义与表现主义文学史终极评价 (AFB III: Beurteilen)",
        questionDE:
          "Inwiefern lässt sich 'Die Verwandlung' vor dem Hintergrund der expressionistischen Entfremdungskrise sowie der frühen Existenzphilosophie (Sartre, Camus) als Schlüsseltext der Moderne beurteilen?",
        questionZH:
          "结合表现主义时期的个体异化危机以及早期存在主义哲学（萨特‘他人即地狱’、加缪‘荒诞人’），我们应当如何全方位高度评价《变形记》作为现代主义文学奠基丰碑的时代穿透力？",
        options: [
          {
            id: "a",
            textDE:
              "Kafkas Novelle radikalisiert die expressionistische Zivilisationskritik zur existenziellen Grenzsituation: Die Verwandlung ist die physische Materialisierung einer bereits vollzogenen seelischen Entfremdung. Gregor erfährt die Sinnentleerung des Daseins im Sinne des Camus'schen Absurden und erlebt die bürgerliche Familie – getreu Sartres Diktum 'Die Hölle, das sind die anderen' – als scheinheilige Zweckgemeinschaft, die den Unproduktiven gnadenlos vernichtet.",
            textZH:
              "卡夫卡的中篇小说将表现主义对工业文明异化的批判激进化为哲理性的‘存在边界处境’（Grenzsituation）：身体的变形实则是现代人灵魂深处早已发生的人性异化向物质肉身的实体化显影。格里高尔直接遭遇了加缪意义上的‘无理荒谬世界’（Das Absurde）；而当他失去赚钱机能后，市民家庭暴露出虚伪残酷的功利冷血本质，精准印证了萨特‘他人即地狱’的名言，展现了现代社会对失去工具价值的无用个体实施的无情社会学生物学双重抹杀。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "'Die Verwandlung' ist ein harmloses pädagogisches Kinderbuch für das 1. Schuljahr, dessen einziger Zweck darin besteht, den Kindern biologische Insektenkunde und Körperhygiene beizubringen.",
            textZH:
              "《变形记》本质上是一本面向小学一年级儿童编写的温和昆虫科普绘本，其唯一目的就是教导小学生注意个人卫生洗手洗脸、认识常见节肢动物分类。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Kafka wollte damit beweisen, dass die Monarchie der österreichisch-ungarischen Monarchie die gerechteste Regierungsform der Weltgeschichte war und keinerlei Reformen bedurfte.",
            textZH:
              "卡夫卡创作这部作品是为了向奥匈帝国哈布斯堡皇帝表忠心，证明哈布斯堡王朝的官僚统治是人类历史上最完美的仁政天堂，不需要任何改进。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Verbindung von Expressionismus (Krise des Ich, Aufbegehren gegen den Vater) und Existenzialismus: Die körperliche Monstrosität entlarvt die Monstrosität der gesellschaftlichen Konventionen.",
        explanationZH:
          "【正解依据与文本锚点】\n《变形记》之所以是世界文学的巅峰里程碑，在于它深刻汇聚了20世纪两大哲学与文学思潮：\n1. 表现主义的‘自我危机与父权破裂’（Ich-Dissoziation & Vater-Konflikt）：表现主义文学核心主题是对机械文明剥夺人性的愤怒控诉。格里高尔的肉身畸变，恰恰是他潜意识中对残酷职场与专制父亲的绝望抗争——当他变成昆虫，他终于‘合情合理地再也不用去赶那该死的火车’；\n2. 存在主义的‘荒诞与他人地狱’（Das Absurde & L'enfer, c'est les autres）：世界毫无理由地给予个体荒谬的打击（毫无因果逻辑的变形）；而在变形之后，曾经享用他薪水供养的父母和妹妹，起初勉强维持虚假的同情，最终当他们发现格里高尔再也无法创造利润时，便毫不犹豫地扔苹果打烂他的背脊，将他活活饿死在杂物堆中，并在他死后轻快地坐电车去郊游挑女婿。这血淋淋地揭露了资产阶级亲情温情脉脉面纱下的资本算计与功利本质。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（低级降智）：将人类存在主义形而上悲剧歪曲为儿童昆虫读物；\n• 选项 C 诊断（颠倒作者背景）：卡夫卡身为布拉格工伤保险局的小职员，对奥匈帝国晚期僵死窒息的官僚机器深恶痛绝，其一生作品都在解构和讽刺国家机器的荒谬暴力。\n\n【时代思潮与哲学脉络】\n从‘异化’到‘非人化’（Dehumanisierung）：卡夫卡精准预言了20世纪极权主义与工业化屠杀中将特定人群贬低为‘害虫’（Ungeziefer）予以抹杀的骇人历史现实，具有超前而深刻的先知性批判力量。",
        klausurSatzDE:
          "In existenzphilosophischer Synthese avanciert Kafkas 'Verwandlung' zum Epochenmonument: Die physische Regression zum Insekt entlarvt die radikale Verdinglichung des Individuums in der Moderne und demonstriert mit unerbittlicher Konsequenz, dass die Würde des Menschen in einer kapitalistischen Leistungsordnung unweigerlich mit dem Verlust seiner ökonomischen Verwertbarkeit erlischt.",
        klausurSatzZH:
          "在存在主义哲学的宏阔视阈中，卡夫卡的《变形记》升华为跨越时代的丰碑：肉身向昆虫的退化不仅揭示了现代文明对个体生命的极致物化，更以冷酷到底的逻辑宣示，在唯生产力与唯效益论的资本秩序中，当一个人失去经济可榨取价值之时，其作为人的尊严与生存权利便无可挽回地走向熄灭。",
        ehzKeyPointsDE: [
          "Verbindung zu existenzialistischen Leitmotiven: Das Absurde, Entfremdung, die Hölle der Mitmenschen.",
          "Epochenbezug zum Expressionismus: Zivilisationsmüdigkeit, Dehumanisierung, radikale Subjektivitätskrise.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Existenzphilosophie 4P)：精准运用加缪‘荒谬’与萨特‘他人即地狱’哲学范畴完成小说主旨评判。",
          "采分点 2 (Kulturkritik 4P)：深入挖掘现代性资本绩效社会（Leistungsgesellschaft）中生命物化与尊严剥夺的终审反思。",
        ],
      },
    ],
  },

  // =========================================================================
  // 15. ENGLISCH: Martin Luther King Jr. — I Have a Dream (政治演说与修辞巅峰)
  // =========================================================================
  {
    id: "mlk-dream",
    fach: "Englisch",
    genre: "Sachtext",
    author: "Martin Luther King Jr.",
    workTitleDE: "I Have a Dream (Address at March on Washington)",
    workTitleZH: "《我有一个梦想》（华盛顿大游行历史性演说）",
    sceneTitleDE: "Speech Analysis // The Promissory Note & The Bank of Justice",
    sceneTitleZH: "演说修辞解剖：自由的期票与正义银行 (商业金融隐喻与四重首语排比)",
    versesRange: "Lincoln Memorial Speech (Paragraphs 1–5)",
    epochDE: "Civil Rights Movement / 1960s American Oratory",
    epochZH: "非裔美国人民权运动 / 20世纪经典政论演说修辞 (1963)",
    contextDE:
      "On August 28, 1963, Martin Luther King Jr. delivered his historic speech before 250,000 demonstrators at the Lincoln Memorial. Employing masterclass rhetorical devices—extended financial metaphors, anaphoras, and biblical imagery—he transformed civil rights into a sacred constitutional promise.",
    contextZH:
      "1963年8月28日，马丁·路德·金在林肯纪念堂前向超过25万名抗议群众发表了这篇震撼世界的演讲。他将美国建国先父的宪政承诺比作一张写给所有公民的‘期票’（promissory note），运用金融商业隐喻、磅礴的首语从复与圣经光影意象，将民权斗争升华为不可违逆的立国道德契约。",
    verses: [
      {
        lineNum: 1,
        textDE: "Five score years ago, a great American, in whose symbolic shadow we stand today, signed the Emancipation Proclamation.",
        translationZH: "一百年前（五打岁月前），一位伟大的美国人，今天我们就站在他象征性的伟岸阴影下，签署了《解放黑奴宣言》。",
        toneCategory: "autoritaet",
        stilmittel: {
          type: "Archaismus & Allusion",
          descDE: "Archaic phrasing ('Five score years ago') echoing Lincoln's Gettysburg Address ('Four score and seven years ago').",
          descZH: "拟古措辞与历史用典：'Five score years ago'（五打岁月前）精准呼应林肯葛底斯堡演说的庄严开场，奠定崇高的历史与宪法权威（Ethos）。",
        },
      },
      {
        lineNum: 2,
        textDE: "This momentous decree came as a great beacon light of hope to millions of Negro slaves...",
        translationZH: "这一具有划时代意义的法令，犹如一道巨大的希望灯塔之光，普照着千百万黑奴……",
        toneCategory: "streben",
        stilmittel: {
          type: "Metapher des Lichts",
          descDE: "'Beacon light of hope' establishes the archetype of light versus dark.",
          descZH: "光明隐喻：'希望的灯塔之光'构筑了启蒙、救赎与引导的原型意象。",
        },
      },
      {
        lineNum: 3,
        textDE: "...who had been seared in the flames of withering injustice.",
        translationZH: "……他们在摧残毁灭性的不公烈焰中备受残酷煎熬。",
        toneCategory: "krise",
        stilmittel: {
          type: "Metapher der Zerstörung",
          descDE: "'Flames of withering injustice' illustrates unbearable suffering.",
          descZH: "毁灭烈焰隐喻：将制度性的奴役压迫具象化为灼烧皮肉的恶火，极具感官冲击力（Pathos）。",
        },
      },
      {
        lineNum: 4,
        textDE: "It came as a joyous daybreak to end the long night of their captivity.",
        translationZH: "它的到来如同欢欣的破晓黎明，终结了羁绊奴役他们的漫漫长夜。",
        toneCategory: "streben",
        stilmittel: {
          type: "Antithese (Licht vs. Dunkelheit)",
          descDE: "Contrast of 'joyous daybreak' and 'long night of captivity'.",
          descZH: "光影对照：'欢欣破晓'与'漫漫囚禁长夜'形成鲜明对立，唤起出埃及记式的宗教神圣解脱感。",
        },
      },
      {
        lineNum: 5,
        textDE: "But 100 years later, the Negro still is not free.",
        translationZH: "然而一百年后的今天，黑人依然没有获得真正的自由。",
        toneCategory: "krise",
        stilmittel: {
          type: "Klimax & Thesenauftakt",
          descDE: "The blunt, sobering reality disrupts the preceding historical celebration.",
          descZH: "现实断裂突转：冷峻利落的短句粉碎了前文对历史法令的欢庆，点出百年未解的核心社会矛盾。",
        },
      },
      {
        lineNum: 6,
        textDE: "One hundred years later, the life of the Negro is still sadly crippled by the manacles of segregation...",
        translationZH: "一百年后的今天，黑人的生活依然悲惨地被种族隔离的镣铐所残害……",
        toneCategory: "krise",
        stilmittel: {
          type: "Anapher (1) & Physische Metapher",
          descDE: "First anaphora 'One hundred years later'; 'manacles of segregation' evokes physical slavery.",
          descZH: "四重首语从复（第1次）与肉体束缚隐喻：'种族隔离的镣铐'将吉姆·克劳法案的法律压迫具象化为肉体上的铁拷镣铐。",
        },
      },
      {
        lineNum: 7,
        textDE: "...and the chains of discrimination.",
        translationZH: "……以及被种族歧视的沉重锁链所死死束缚。",
        toneCategory: "krise",
      },
      {
        lineNum: 8,
        textDE: "One hundred years later, the Negro lives on a lonely island of poverty...",
        translationZH: "一百年后的今天，黑人依然孤零零地生活在贫困的凄凉孤岛之上……",
        toneCategory: "krise",
        stilmittel: {
          type: "Anapher (2) & Raum-Metapher",
          descDE: "Second anaphora; 'lonely island of poverty' highlights geographical and social segregation.",
          descZH: "首语从复（第2次）与空间地理隐喻：'贫困孤岛'揭示了黑人社区在经济结构上的残酷边缘化与空间隔离。",
        },
      },
      {
        lineNum: 9,
        textDE: "...in the midst of a vast ocean of material prosperity.",
        translationZH: "……尽管其四周环绕着整个美国物质繁华的汪洋大海。",
        toneCategory: "spott",
        stilmittel: {
          type: "Antithese (Insel vs. Ozean)",
          descDE: "Sharp contrast between extreme minority deprivation and majority affluence.",
          descZH: "尖锐对照：将少数族裔的赤贫孤岛与全美白人主流社会的富裕汪洋对立，揭示资本繁荣背后的制度性掠夺。",
        },
      },
      {
        lineNum: 10,
        textDE: "One hundred years later, the Negro is still languished in the corners of American society...",
        translationZH: "一百年后的今天，黑人依然在受难萎缩于美国社会的阴暗角落……",
        toneCategory: "krise",
        stilmittel: {
          type: "Anapher (3)",
          descDE: "Third repetition emphasizing temporal persistence of systemic injustice.",
          descZH: "首语从复（第3次）：强化百年来美国制度性不公在时间维度上的顽固停滞。",
        },
      },
      {
        lineNum: 11,
        textDE: "...and finds himself an exile in his own land. And so we've come here today to dramatize a shameful condition.",
        translationZH: "……发现自己竟然在自己的故土上沦为流亡异客。因此我们今天齐聚于此，就是要将这一可耻的现实处境戏剧化地公之于众。",
        toneCategory: "streben",
        vocab: {
          word: "exile in his own land",
          meaningDE: "Paradoxon der Entwurzelung im eigenen Heimatstaat.",
          meaningZH: "故土异客悖论：本国公民却被剥夺宪政权利，陷入双重心理放逐与异化。",
        },
      },
      {
        lineNum: 12,
        textDE: "In a sense we've come to our nation's capital to cash a check.",
        translationZH: "在某种意义上说，我们来到国家的首都，是为了兑现一张支票。",
        toneCategory: "streben",
        stilmittel: {
          type: "Erweiterte Metapher (Finanzanalogie)",
          descDE: "Introduction of the master metaphor: Translating human rights into enforceable fiscal debt.",
          descZH: "主导商业隐喻引入：将抽象的人权与宪法价值具象化为具有不可撤销法定清偿力的金融支票。",
        },
      },
      {
        lineNum: 13,
        textDE: "When the architects of our republic wrote the magnificent words of the Constitution...",
        translationZH: "当我们共和国的建筑师们写下宪法与《独立宣言》的宏伟华章时……",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 14,
        textDE: "...they were signing a promissory note to which every American was to fall heir.",
        translationZH: "……他们实际上是在签署一张所有美国人都有权作为法定继承人兑现的‘期票’（借据）。",
        toneCategory: "moral",
        vocab: {
          word: "promissory note",
          meaningDE: "Juridisch bindendes Schuldversprechen der Gründerväter.",
          meaningZH: "期票/具有法律效力的无条件付款承诺书：建国先父签署的不可抵赖的制度性欠条。",
        },
      },
      {
        lineNum: 15,
        textDE: "It is obvious today that America has defaulted on this promissory note... America has given the Negro people a bad check...",
        translationZH: "显而易见，美国今天在这张期票上违约跳票了……美国给了黑人一张退票的空头支票……",
        toneCategory: "krise",
        stilmittel: {
          type: "Metapher des 'Bad Check'",
          descDE: "'A check marked insufficient funds' indicts state hypocrisy.",
          descZH: "'资金不足的空头支票'隐喻：用极其辛辣通俗的商业欺诈常识，控诉联邦政府对少数族裔公民权利的长期虚伪毁约。",
        },
      },
      {
        lineNum: 16,
        textDE: "But we refuse to believe that the bank of justice is bankrupt! We refuse to believe that there are insufficient funds in the great vaults of opportunity!",
        translationZH: "但我们拒绝相信正义的银行已经破产！我们拒绝相信在这个国家的宏大机遇宝库中会资金不足！",
        toneCategory: "streben",
        stilmittel: {
          type: "Parallelismus & Emphatische Negation",
          descDE: "'We refuse to believe...' rejects despair and reclaims the democratic promise.",
          descZH: "平行句式与坚定重申：'我们拒绝相信……'两次重击，以不容置疑的正义信念彻底扭转悲情，激发排山倒海的斗争意志。",
        },
      },
    ],
    questions: [
      {
        id: "q-mlk-1",
        dimension: "wortschatz",
        afb: "AFB I",
        titleDE: "Extended Financial Metaphor (Promissory Note & Bad Check)",
        titleZH: "金融商业扩展隐喻的功能与机制 (AFB I: Outline & Identify)",
        questionDE:
          "Which rhetorical mechanism underlies King's use of the extended financial metaphor ('promissory note', 'cash a check', 'bad check', 'bank of justice') in paragraphs 4–5?",
        questionZH:
          "金博士在第4–5段中所展开的‘金融商业扩展隐喻’（期票、兑现支票、空头支票、正义银行）构成了何种独特的修辞机制与说服功能？",
        options: [
          {
            id: "a",
            textDE:
              "King translates abstract philosophical and constitutional concepts (inalienable human rights, equality) into a concrete, pragmatic contractual debt of everyday commercial life that every ordinary American citizen intuitively understands, thereby framing racial equality not as a benevolent charitable gift, but as an overdue legal obligation that the federal government must settle.",
            textZH:
              "金博士将抽象高深的宪政哲学概念（不可剥夺的人权、平等人人）具象化为美国日常商业文明中最熟悉的‘契约清偿债务’。这使所有普通听众都能瞬间直观理解：民权绝非统治阶级高高在上的施舍与慈善恩赐，而是联邦政府早已签字画押、如今严重逾期违约必须立即无条件兑付的法律金钱契约！",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "King was a professional stockbroker on Wall Street and wanted to convince the protesters to open new savings accounts at the Federal Reserve Bank.",
            textZH:
              "金博士在华尔街兼职股票经纪人，他发表这番演讲是为了推销新型理财产品，号召游行民众赶紧去美联储开设活期储蓄账户。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "King claimed that the US dollar should be abolished immediately and replaced by British gold pounds from the 17th century.",
            textZH:
              "金博士要求立即废除美钞流通，主张美国全境重新恢复使用17世纪的英国金镑作为唯一法定货币。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Financial metaphor as persuasive bridge: Contract law is holy in American culture. By using 'promissory note' and 'default', King uses America's own capitalist value system against segregationist practices.",
        explanationZH:
          "【正解依据与文本锚点】\n演说修辞的高级典范：在美国这个商业立国的契约社会中，‘合同与支票’具有无可撼动的神圣契约效力（Sanctity of Contracts）。金博士极其高明地没有停留于空泛的道德呼吁，而是将美国《独立宣言》和《宪法》直接定义为一张‘promissory note’（本票/借据）。签署人是国父华盛顿与杰斐逊，收款人是所有美国后代。黑人手里的宪法支票被盖上‘insufficient funds’（资金不足退票），这是直接把美国政府推上了道德与商业欺诈的被告席。任何一个自诩讲信用的美国人，都无法反驳‘欠债必须还钱、支票必须兑现’的常识铁律。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（低级庸俗化解读）：把正义的形而上修辞歪曲为金融推销；\n• 选项 C 诊断（无厘头搞笑选项）：与金博士捍卫美国宪法精神的根本立场彻底背道而驰。\n\n【时代思潮与哲学脉络】\n美国公民宗教（Civil Religion）：金博士深谙美国政治修辞传统，他将美国信条（The American Creed）与清教徒约法传统结合，使民权运动获得了宪政正统性与不可动摇的合法性。",
        klausurSatzDE:
          "By employing an extended financial conceit of the 'promissory note' and the 'bad check', King masterfully grounds abstract constitutional ideals in the sacrosanct American ethos of contractual obligation, transforming civil rights from an act of philanthropic mercy into a non-negotiable legal debt.",
        klausurSatzZH:
          "通过精湛构筑‘期票’与‘空头支票’的扩展金融隐喻，金博士将抽象的宪政理想牢牢锚定在神圣不可侵犯的美国契约伦理之中，将民权平权从统治者的居高施舍彻底重塑为不可延期抵赖的法定债务清偿。",
        ehzKeyPointsDE: [
          "Identification of the extended metaphor: Promissory note, default, bad check, bank of justice.",
          "Analysis of rhetorical effect: Making civil rights understandable via contractual culture; mobilizing ethos and legal legitimacy.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Metaphor Identification 4P)：精准识别期票、空头支票、正义银行等系列商业隐喻及其结构延展。",
          "采分点 2 (Communicative Function 4P)：深刻阐发将‘人权’置换为‘契约债务’在美国商业文化中所激发的无敌说道理据与合法性赋能。",
        ],
      },
      {
        id: "q-mlk-2",
        dimension: "stilmittel",
        afb: "AFB II",
        titleDE: "Anaphora & Incremental Emotional Crescendo",
        titleZH: "四重首语从复与层层递进的情感交响 (AFB II: Analyse)",
        questionDE:
          "How does the fourfold anaphora 'One hundred years later' (lines 5–11), combined with sensual sensory metaphors, establish rhetorical urgency and emotional resonance (Pathos)?",
        questionZH:
          "金博士连续四次使用‘One hundred years later’（一百年后的今天）这一强有力的首语从复（Anaphora），并配合感官肢体隐喻，在听众心目中激起了怎样的修辞紧迫感与情感共振（Pathos）？",
        options: [
          {
            id: "a",
            textDE:
              "The rhythmic repetition of 'One hundred years later' creates an incantatory, pulpit-like musical crescendo that hammer-beats the intolerable duration of injustice into the listener's consciousness, while vivid tactile and spatial images ('manacles of segregation', 'chains of discrimination', 'lonely island of poverty') make systemic racism physically painful and viscerally experienced.",
            textZH:
              "连续四次‘一百年后的今天’构成如同教堂布道般排山倒海的音乐节律感（Crescendo），像重锤一样将‘不公持续时间之漫长残忍’深深夯入每一位听众的心智；同时，触觉与空间隐喻（‘种族隔离的铁铐’、‘歧视的锁链’、‘繁华汪洋中的贫困孤岛’）将抽象的制度性压迫转化为让人皮开肉绽、感同身受的肉体痛楚，激发出无与伦比的同理共鸣与道德愤怒。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "The repetition proves that King had forgotten his speech notes and had to stall for time while the sound engineers fixed his microphone.",
            textZH:
              "这种重复证明金博士当时把演讲稿忘在后台了，他只是为了拖延时间等待调音师修理坏掉的麦克风而故意不断重复同一句话。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "King repeated the date because he wanted to prove that the year 1963 has no connection to the American Civil War.",
            textZH:
              "金博士重复这句话是为了证明1963年与美国南北战争和林肯解放奴隶没有任何历史因果关联。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Oratory tradition of the Black Church: The repetition builds a dramatic rhythmic momentum that moves the audience from historical nostalgia (Lincoln) to the boiling crisis of the present.",
        explanationZH:
          "【正解依据与文本锚点】\n黑人浸信会教堂布道传统的巅峰修辞（African-American Call-and-Response tradition）：\n1. 结构递进（Rhythm & Climax）：从第5句‘the Negro still is not free’破空而出，紧接着以四次‘One hundred years later’发动连续攻势。时间的一再重复，不断逼问现场白人政客与全国听众的良心：一个世纪整整过去了，承诺为何依然落空？\n2. 意象层层加码：\n   - 第1重：肉体禁锢（manacles & chains，触觉痛苦）；\n   - 第2重：阶级贫困（island of poverty in an ocean of prosperity，视觉空间对照）；\n   - 第3重：社会边缘（corners of society，幽闭绝望）；\n   - 第4重：精神放逐（an exile in his own land，政治身份异化）。\n四重排比层层剥茧，形成无法抗拒的情感海啸（Pathos）。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（对修辞大师的荒谬贬损）：首语从复是古典演说自西塞罗以来最高超的修辞武器，绝非忘词拖延；\n• 选项 C 诊断（历史常识错误）：1863年林肯签署《解放黑奴宣言》，1963年整整一百周年，金博士精准利用了这一百年祭的历史时间锚点。\n\n【时代思潮与哲学脉络】\n修辞三要素的完美结合：金博士将理性逻辑（Logos: 宪法债务）、道德威信（Ethos: 牧师与林肯继承人）与强烈共情（Pathos: 肉体枷锁与时代呐喊）熔于一炉，奠定了这篇演说无可复制的文学地位。",
        klausurSatzDE:
          "Through the incantatory cadence of the fourfold anaphora 'One hundred years later', King orchestrates an escalating crescendo of moral indignation, converting temporal distance into an acute ethical indictment that renders gradualist political compromise morally indefensible.",
        klausurSatzZH:
          "通过四重首语从复‘一百年后的今天’那宛如咒语般的跌宕韵律，金博士谱写了一曲层层递进的道德愤慨交响乐，将历史时间的遥远流逝转化为对当下体制的尖锐伦理控诉，使一切主张拖延妥协的渐进主义政治借口在道德上不攻自破。",
        ehzKeyPointsDE: [
          "Detailed functional analysis of anaphora: Cadence, emotional urgency, temporal insistence.",
          "Examination of imagery: Sensory tactile and spatial metaphors (manacles, chains, island vs. ocean).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Rhetorical Cadence 4P)：精准分析首语从复所营造的音律回荡、情感层层蓄势与道德逼问力量。",
          "采分点 2 (Imagery & Pathos 4P)：细致拆解肉体束缚与贫困孤岛等感官隐喻对受众同理心（Pathos）的强大激发机制。",
        ],
      },
      {
        id: "q-mlk-3",
        dimension: "motiv",
        afb: "AFB II",
        titleDE: "Archetypal Imagery: Light vs. Darkness & Exodus Allusion",
        titleZH: "光明与黑暗的原型对照与《出埃及记》圣经用典 (AFB II: Contextualize)",
        questionDE:
          "What is the ideological and persuasive purpose of contrasting 'beacon light of hope' / 'joyous daybreak' with 'flames of withering injustice' / 'long night of captivity' in lines 2–4?",
        questionZH:
          "在第2–4句中，将‘希望的灯塔之光’、‘欢欣的破晓黎明’与‘毁灭性不公的烈焰’、‘漫漫囚禁长夜’进行剧烈对比，具有何种意识形态与说服意图？",
        options: [
          {
            id: "a",
            textDE:
              "King invokes universal religious and mythological archetypes (light as divine truth/deliverance, darkness as sin/oppression) rooted in the biblical narrative of the Exodus, elevating the political fight against segregation to a sacred metaphysical struggle between divine justice and demonic evil, which commands unconditional moral allegiance across religious boundaries.",
            textZH:
              "金博士借用了根植于圣经《出埃及记》（Exodus）叙事中的普遍神话与宗教原型（光芒象征神圣真理与摩西出红海的救赎解脱，黑暗烈焰象征罪孽与法老奴役）。这直接将世俗政治层面反对种族隔离的街头抗争，拔高为一场神圣正义对决恶魔不公的形而上道德圣战，从而超越党派与宗派偏见，唤起全体国民无条件的道德忠诚与崇高担当。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "King was commenting on the electricity shortages in Washington D.C. and advising the city council to install stronger street lamps.",
            textZH:
              "金博士是在抱怨华盛顿特区当晚市政供电不足，诚恳建议华盛顿市议会赶紧在林肯纪念堂周围多装几座高功率LED路灯。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "The metaphors were copied directly from an ancient Egyptian weather manual and had no symbolic meaning whatsoever.",
            textZH:
              "这些隐喻是金博士前一天从一本古埃及气象学手册上照抄的降水记录，除了预测降雨外没有任何文学或象征意涵。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Biblical typologies in American rhetoric: King as the modern Moses. The contrast between night/daybreak echoes prophetic scripture (Isaiah, Amos), granting his speech transcendental moral gravity.",
        explanationZH:
          "【正解依据与文本锚点】\n原型批评与圣经神学互文（Archetypal Criticism & Biblical Allusion）：\n金博士作为浸信会牧师，深谙旧约先知文学（以赛亚书、阿摩司书）的修辞精髓。在人类潜意识中：\n- 光明（Light / Daybreak）= 生命、自由、上帝的启示与真理；\n- 黑暗与烈焰（Darkness / Flames）= 绝望、沉沦、地狱火刑与无尽苦难。\n通过将《解放黑奴宣言》比作‘joyous daybreak to end the long night’，金博士把黑人的历史苦难直接等同于以色列人在埃及四百年为奴的漫漫长夜。这种神圣叙事使原本可能引发争议的政治权利诉求，升华为任何信奉基督教伦理的美国人都不容置疑的天道正义。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（低级滑稽错误）：把文学光影隐喻降格为市政电费账单；\n• 选项 C 诊断（虚无主义荒谬选项）：完全无视金博士作为神学博士的学术深厚造诣。\n\n【时代思潮与哲学脉络】\n非暴力抵抗与神圣之爱（Agape）：金博士受甘地非暴力与基督教博爱思想启发，始终强调抗争的目的不是报复与消灭白人，而是消灭罪恶的制度，实现黑白兄弟同胞‘光明的和解’。",
        klausurSatzDE:
          "By weaving archaic biblical typologies of radiant daybreak and suffocating nocturnal captivity into his oratorical tapestry, King elevates the secular struggle for racial equality into a cosmic, providential drama of divine redemption, thereby endowing the Civil Rights Movement with transcendental spiritual authority.",
        klausurSatzZH:
          "通过将破晓曙光与窒息黑夜等源自圣经神学的原型意象编织进演说锦缎之中，金博士将世俗层面的种族平权抗争升华为一幕充满天意救赎色彩的宇宙神圣诗剧，从而赋予了非裔民权运动无可撼动的超验精神权威。",
        ehzKeyPointsDE: [
          "Identification of light/dark antithesis and archetype symbolism.",
          "Explanation of religious subtext: Biblical Exodus typology, prophetic voice, transcendental authority.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Antithetical Imagery 4P)：精准指出光明与黑暗的原型对照象征及其审美张力。",
          "采分点 2 (Theological Dimension 4P)：深刻揭示《出埃及记》神圣救赎母题如何赋予非暴力民权运动超越政见的超验道德正统性。",
        ],
      },
      {
        id: "q-mlk-4",
        dimension: "theorie",
        afb: "AFB III",
        titleDE: "Contemporary Assessment & The Unfulfilled Dream",
        titleZH: "当代多元社会终审裁决与未竟之梦 (AFB III: Evaluate & Comment)",
        questionDE:
          "To what extent can Martin Luther King Jr.'s 1963 speech be judged as both a triumphant catalyst of civil rights legislation and an unfulfilled ideal in 21st-century multicultural societies?",
        questionZH:
          "在21世纪欧美多元文化社会的坐标系下（面对种族财富鸿沟、司法系统性偏见、Black Lives Matter与极右翼民粹抬头），我们应如何辩证高度评判这篇演说的历史胜利与当代未竟挑战？",
        options: [
          {
            id: "a",
            textDE:
              "In a dialectical assessment, King's speech stands as a triumphant landmark that successfully mobilized public conscience and precipitated landmark federal legislation (Civil Rights Act 1964, Voting Rights Act 1965); however, his dream remains tragically unfulfilled today, as structural wealth gaps, systemic criminal justice disparities, voter suppression, and cultural polarization prove that de jure legal equality has not yet translated into de facto socio-economic justice.",
            textZH:
              "在辩证的现代审视中，金博士的演说是一座无可置疑的胜利丰碑：它成功唤醒了全美公众良知，并直接催生了划时代的联邦平权法案（1964年《民权法案》与1965年《选举权法案》），废除了法律层面的种族隔离；然而，在深层社会现实中，他的梦想仍远未彻底实现：惊人的种族财富鸿沟、刑事司法系统中的不成比例监禁、隐蔽的选民压制以及文化部落主义撕裂铁证表明，法律上的‘程序平等’（de jure）绝未自动转化为现实生活中的‘实质社会经济正义’（de facto）。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "The speech has lost all relevance because racism was completely erased from the planet Earth on August 29, 1963, and no discrimination has ever occurred anywhere since.",
            textZH:
              "这篇演说在今天已毫无现实意义，因为种族主义在演说发表第二天（1963年8月29日）就已经从地球上彻底灭绝，自那以后世界上再也没有发生过任何歧视事件。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "King's speech was proven completely wrong by historical scientists because all humans prefer living in strictly isolated castes without ever speaking to each other.",
            textZH:
              "金博士的演说被历史科学家证明是彻底错误的，因为全人类天生都渴望生活在严格种姓隔离的深墙大院中老死不相往来。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "AFB III Dialectics: Acknowledge historic achievements (de jure legislation, Obama presidency) while critically exposing persistent systemic inequalities (wealth, incarceration, voting rights).",
        explanationZH:
          "【正解依据与文本锚点】\n北威州高中英语会考（Abitur Klausur / Comment）最高阶评分标准（15 NP）：辩证分析（Dialectical Evaluation）：\n1. 历史成就（Thesis / Achievements）：演说凝聚了跨种族抗争同盟，打破了南方种族隔离制度的合法性外衣，促成了1964/1965联邦立法大门开启，奠定了现代民权宪政基石；\n2. 现实危机（Antithesis / Limitations & Persistence of Racism）：\n   - 经济层面：黑人家庭净资产中位数仅为白人家庭的约八分之一（支票仍有大量‘insufficient funds’）；\n   - 司法层面：不成比例的大规模监禁（Mass Incarceration，新吉姆·克劳法案）；\n   - 政治层面：最高法院废除《选举权法案》部分核心条款，多州出台严苛选民登记限制；\n3. 综合裁决（Synthesis）：金博士晚期（被暗杀前）早已将目光投向更深刻的‘穷人运动’（Poor People's Campaign）与反战和平主义。他的‘梦想’并非温情脉脉的安慰剂，而是永远刺向不公现实的锋利批判火炬。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（天真历史虚无主义）：忽视系统性种族主义与当代抗争现实；\n• 选项 C 诊断（倒退反人类论调）：彻底悖逆人类文明发展与普世人权共识。\n\n【时代思潮与哲学脉络】\n全球视野下的平权互鉴：从南非曼德拉废除种族隔离，到北爱尔兰和平进程，再到当代欧洲多元移民社会的整合辩论，金博士的演说已成为全球反对任何形式歧视的通用修辞遗产。",
        klausurSatzDE:
          "In dialectical evaluation, King's oration must be celebrated as the defining catalyst that dismantled de jure segregation in America; yet, as pervasive wealth disparities, systemic carceral biases, and renewed voter disenfranchisement demonstrate, the promissory note of genuine egalitarian justice remains an unredeemed constitutional imperative in the 21st century.",
        klausurSatzZH:
          "在辩证的时代审视下，金博士的演说理应被尊奉为摧毁美国程序性种族隔离制度的决定性催化剂；然而，正如触目惊心的贫富分化、刑事司法系统性偏见以及死灰复燃的选民压制所昭示的那样，这张承诺实质人人平等的立国期票，在21世纪的今天依然是一项未竟的宪政绝对命令。",
        ehzKeyPointsDE: [
          "Dialectical differentiation: Legal triumph (Civil Rights Act) vs. structural socio-economic deficit.",
          "Integration of contemporary references (BLM, wealth gap, voting rights, polarization) for full AFB III marks.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Dialectical Rigor 4P)：严密区分‘法律程序平等’（de jure）的里程碑胜利与‘社会经济实质正义’（de facto）的未竟赤字。",
          "采分点 2 (Contemporary Relevance 4P)：精准切入种族贫富差距、司法监禁率或选民法案等当代现实议题，展现 15 NP 高阶学理洞察。",
        ],
      },
    ],
  },

  // =========================================================================
  // 16. PHILOSOPHIE: John Stuart Mill — Utilitarismus (伦理学：功利原理与质性快乐主义)
  // =========================================================================
  {
    id: "mill-utilitarismus",
    fach: "Philosophie",
    genre: "Sachtext",
    author: "John Stuart Mill",
    workTitleDE: "Utilitarismus (Kapitel 2: Was der Utilitarismus ist)",
    workTitleZH: "《功利主义》（第二章：功利主义的含义）",
    sceneTitleDE: "Ethik // Das Nützlichkeitsprinzip und der qualitative Hedonismus",
    sceneTitleZH: "伦理学原典：功利原理与质性快乐论 (苏格拉底之猪难题与胜任裁判官论证)",
    versesRange: "Kapitel 2, Abs. 2–8",
    epochDE: "19. Jahrhundert / Klassischer englischer Utilitarismus (1861)",
    epochZH: "19世纪古典功利主义伦理学 / 英国经验主义传统 (1861)",
    contextDE:
      "Gegen den Vorwurf seiner Zeitgenossen, der Utilitarismus sei eine 'pig philosophy' (Schweinephilosophie), differenziert John Stuart Mill Benthams rein quantitativen Hedonismus: Höhere geistig-sittliche Freuden besitzen eine unvergleichlich höhere Qualität als bloße sinnliche Triebe. Ein unzufriedener Sokrates steht sittlich unendlich höher als ein zufriedengestelltes Schwein.",
    contextZH:
      "针对同时代保守批评家将功利主义诬蔑为仅追求感官享乐的‘猪的哲学’（pig philosophy），约翰·斯图尔特·密尔对杰里米·边沁的纯粹量化快乐计算进行了革命性修正：确立‘质性快乐主义’（qualitativer Hedonismus）。他坚信，人类的理智、审美与道德快乐在性质上绝对凌驾于单纯肉体兽欲之上，宁做痛苦的苏格拉底，不做快乐的肥猪。",
    verses: [
      {
        lineNum: 1,
        textDE: "Das Glaubensbekenntnis, das die Nützlichkeit oder das Prinzip des größten Glücks als Grundlage der Moral annimmt...",
        translationZH: "将‘功利’或‘最大幸福原则’作为道德基础的信条坚持认为……",
        toneCategory: "moral",
        vocab: {
          word: "Prinzip des größten Glücks",
          meaningDE: "Greatest Happiness Principle: Das höchste Gut ist das größtmögliche Glück der größtmöglichen Zahl.",
          meaningZH: "最大幸福原则：道德的终极至善在于为尽可能多的人创造尽可能大的净幸福总量。",
        },
      },
      {
        lineNum: 2,
        textDE: "...besagt, dass Handlungen insoweit moralisch richtig sind, als sie die Tendenz haben, Glück zu befördern.",
        translationZH: "……任何行为只要倾向于促进幸福，便在道德上是正确的；反之，若倾向于产生不幸，则是错误的。",
        toneCategory: "moral",
        stilmittel: {
          type: "Teleologisches Kriterium (Folgenethik)",
          descDE: "Handlungen werden ausschließlich nach ihren absehbaren Konsequenzen beurteilt, nicht nach Gesinnung.",
          descZH: "目的论/后果主义准则：行为善恶完全由其客观后果（幸福或痛苦产出）决定，与康德的纯粹善良意志动机形成尖锐对立。",
        },
      },
      {
        lineNum: 3,
        textDE: "Unter 'Glück' ist Lust und das Freisein von Unlust verstanden; unter 'Unglück' Unlust und der Fortfall von Lust.",
        translationZH: "所谓‘幸福’（Glück），指的是快乐与免除痛苦；所谓‘不幸’（Unglück），指的则是痛苦与快乐的被剥夺。",
        toneCategory: "existenz",
        vocab: {
          word: "Lust und Freisein von Unlust",
          meaningDE: "Klassische hedonistische Definition: Pleasure and the absence of pain.",
          meaningZH: "古典快乐主义定义：快乐与痛苦是人类行为唯二的终极奖惩与价值锚点。",
        },
      },
      {
        lineNum: 4,
        textDE: "Die Theorie des Lebens, auf der diese Theorie der Moralität beruht, ist: dass Lust und das Freisein von Unlust die einzigen Dinge sind, die als Endzwecke wünschenswert sind.",
        translationZH: "作为这一道德理论根基的人类生活理论认为：快乐和痛苦的免除，是世间作为终极目的（Endzwecke）唯二真正值得欲求的事物。",
        toneCategory: "moral",
      },
      {
        lineNum: 5,
        textDE: "Eine solche Lebensauffassung erregt bei vielen Menschen eine tiefe Abneigung: Sie nennen sie eine Lehre, die nur für Schweine taugt.",
        translationZH: "这样一种生活观念在许多人心中激起根深蒂固的反感：他们厌恶地斥之为一种只配给猪享用的下贱学说。",
        toneCategory: "spott",
        stilmittel: {
          type: "Antizipation des Einwands (Prolepsis)",
          descDE: "Vorwegnahme der konservativen 'pig philosophy'-Kritik zur rhetorischen Entkräftung.",
          descZH: "修辞性预先驳论（Prolepsis）：主动亮出批评者最恶毒的‘猪之哲学’攻击，从而在后续展开决定性学术反杀。",
        },
      },
      {
        lineNum: 6,
        textDE: "Wenn man ihnen dies vorwirft, antworten die Epikureer stets: Es sind nicht sie, sondern ihre Ankläger, die die menschliche Natur in einem herabwürdigenden Licht darstellen.",
        translationZH: "当受到这种攻击时，功利主义者向来如此回应：把人性描绘得如此卑鄙下贱的，恰恰不是功利主义者自己，而是那些自命清高的原告批评家！",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 7,
        textDE: "Denn der Vorwurf setzt voraus, dass die Menschen keiner anderen Freuden fähig sind als jener, deren Schweine fähig sind.",
        translationZH: "因为这个荒谬的指责暗含了一个极其侮辱人的假定：人类所能享受到的快乐，竟然丝毫不比一头猪所享受的烂泥享乐更高明！",
        toneCategory: "spott",
      },
      {
        lineNum: 8,
        textDE: "Es ist völlig vereinbar mit dem Nützlichkeitsprinzip, anzuerkennen, dass einige Arten der Freude wünschenswerter und wertvoller sind als andere.",
        translationZH: "承认某些类型的快乐在性质上比其他快乐更值得欲求、更有价值，这同功利原理是完全一致且全然兼容的！",
        toneCategory: "streben",
        vocab: {
          word: "Arten der Freude",
          meaningDE: "Bruch mit Bentham: Differenzierung zwischen geistiger und physischer Lust.",
          meaningZH: "质性快乐论分水岭：彻底决裂边沁‘图钉游戏与诗歌一样好’的粗糙平铺论，将快乐划分为高阶心智与低阶感官。",
        },
      },
      {
        lineNum: 9,
        textDE: "Es wäre absurd anzunehmen, dass bei der Beurteilung aller anderen Dinge die Qualität ebenso wie die Quantität zählt, bei den Freuden aber allein die Quantität zählen sollte.",
        translationZH: "如果说在评估世间万物时我们都会同时衡量其质量与数量，却在衡量快乐时荒谬地只看数量多寡，那是何等愚蠢可笑的偏执！",
        toneCategory: "spott",
        stilmittel: {
          type: "Analogie-Argumentation & Reductio ad absurdum",
          descDE: "Übertragung der Qualitätsdimension von materiellen Gütern auf emotionale und intellektuelle Zustände.",
          descZH: "类比归谬论证：将物质商品‘品质重于数量’的普遍公理平移至精神快乐，从而逻辑性驳倒纯数量功利论。",
        },
      },
      {
        lineNum: 10,
        textDE: "Von zwei Freuden ist diejenige wünschenswerter, die von allen oder fast allen, die beide erfahren haben, entschieden vorgezogen wird.",
        translationZH: "在两种快乐之间，如果所有（或绝大多数）对两者皆有亲身体验的人，都毫无保留地坚定优先选择其中一种，那么它就更具内在价值。",
        toneCategory: "moral",
        vocab: {
          word: "beide erfahren haben",
          meaningDE: "Kompetente Richter (Competent Judges): Erkenntnistheoretischer Schiedsspruch durch empirische Erfahrung.",
          meaningZH: "胜任的裁判官标准：唯有同时品尝过两种快乐的知情者，才拥有判定快乐等级高下的裁量权。",
        },
      },
      {
        lineNum: 11,
        textDE: "Nun ist es aber eine unbestreitbare Tatsache, dass diejenigen, die mit beiden gleichermaßen vertraut sind...",
        translationZH: "然而，一个毋庸置疑的经验事实是：那些对两种快乐都同样熟知、能够同等评价的人……",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 12,
        textDE: "...denjenigen Lebensweisen den Vorzug geben, die ihre höheren Fähigkeiten in Anspruch nehmen.",
        translationZH: "……无一例外都会断然优先选择那种能够调动其更高阶心智能力（理性、思考、审美）的生活方式！",
        toneCategory: "streben",
        vocab: {
          word: "höhere Fähigkeiten",
          meaningDE: "Intellektuelle, ästhetische und moralische Vermögen des vernunftbegabten Menschen.",
          meaningZH: "更高阶能力：理性思维、艺术审美欣赏、同情心与利他主义德性。",
        },
      },
      {
        lineNum: 13,
        textDE: "Kein kluger Mensch möchte ein Narr sein, kein gebildeter Mensch ein Unwissender, kein Mensch mit Gefühl und Gewissen ein selbstsüchtiger Schuft sein...",
        translationZH: "没有一个明智之人甘愿沦为傻瓜，没有一个受过教育之人甘愿变成白痴，没有一个有良知之人甘愿蜕化为卑劣恶棍……",
        toneCategory: "moral",
        stilmittel: {
          type: "Trikolon & Emphatische Negation",
          descDE: "Drei parallele Negationen zur Untermauerung menschlichen Selbstrespekts und Würdebewusstseins.",
          descZH: "三重三段排比与肯定性否定：通过聪明人/学者/良知者的三重对照，唤起人类不可妥协的理性尊严感。",
        },
      },
      {
        lineNum: 14,
        textDE: "...selbst wenn man sie überzeugte, dass der Narr, der Dummkopf oder der Schuft mit seinem Los zufriedener sei als sie mit dem ihrigen.",
        translationZH: "……即使有人能够向他们证明，傻瓜、蠢汉或恶棍对自己烂醉如泥命运的‘满足度’，远远超过他们在精神追求中的烦恼与焦虑！",
        toneCategory: "existenz",
      },
      {
        lineNum: 15,
        textDE: "Es ist besser, ein unzufriedener Mensch zu sein als ein zufriedengestelltes Schwein...",
        translationZH: "做一个痛苦不满足的人，远远胜过做一头吃饱喝足、心满意足的肥猪……",
        toneCategory: "streben",
        stilmittel: {
          type: "Aphoristische Antithese (Ethik-Schlüsselsatz)",
          descDE: "Zuspitzung des qualitativen Hedonismus: Unterscheidung zwischen 'Glück' (Happiness) und bloßer 'Zufriedenheit' (Contentment).",
          descZH: "格言式对照对偶（伦理学核心警句）：尖锐区分精神‘崇高幸福’（Happiness）与肉体生理‘低级满足’（Contentment）。",
        },
      },
      {
        lineNum: 16,
        textDE: "...besser ein unzufriedener Sokrates als ein zufriedener Narr. Und wenn der Narr oder das Schwein anderer Meinung sind, so rührt das daher, dass sie nur ihre eigene Seite der Frage kennen.",
        translationZH: "……宁做一个痛苦不满足的苏格拉底，也绝不做一只快乐满足的傻子。如果蠢人或猪对此持有异议，那仅仅是因为他们一辈子只了解属于他们自己的猪槽那一面而已！",
        toneCategory: "streben",
        vocab: {
          word: "nur ihre eigene Seite kennen",
          meaningDE: "Erkenntnistheoretischer Fehlschluss der Ungebildeten: Das Schwein kann den Geist nicht beurteilen.",
          meaningZH: "认识论的单向性：猪和愚者从未体验过哲思与道德的纯粹狂喜，故而其评判毫无认识论效力。",
        },
      },
    ],
    questions: [
      {
        id: "q-mill-1",
        dimension: "inhalt",
        afb: "AFB I",
        titleDE: "Nützlichkeitsprinzip & Die vier utilitaristischen Teilprinzipien",
        titleZH: "功利原理与四大核心要素 (AFB I: Darstellen)",
        questionDE:
          "Wie definiert John Stuart Mill das 'Prinzip des größten Glücks' (Nützlichkeitsprinzip) und durch welche vier konstitutiven Teilprinzipien wird der klassische Utilitarismus in der philosophischen Ethik charakterisiert?",
        questionZH:
          "约翰·斯图尔特·密尔如何界定‘最大幸福原则’（功利原理）？在哲学伦理学中，古典功利主义由哪四大不可分割的核心支柱原则（Vier Teilprinzipien）所共同奠定？",
        options: [
          {
            id: "a",
            textDE:
              "Handlungen sind moralisch richtig, wenn sie das größtmögliche Glück für die größtmögliche Zahl befördern. Konstituiert wird die Lehre durch: 1. Konsequenzenprinzip (Folgenethik), 2. Utilitätsprinzip (Nützlichkeit als Kriterium), 3. Hedonistisches Prinzip (Glück als Lust/Freisein von Schmerz) und 4. Universalistisches Prinzip (Gleichwertigkeit aller Betroffenen / 'Jeder zählt für einen').",
            textZH:
              "若行为倾向于促进最大多数人的最大幸福，则在道德上是正当的。其哲学大厦依托于四大支柱原则：1. 后果原则（Folgenprinzip/纯看客观结果），2. 功利原则（Utilitätsprinzip/以效用最大化为标尺），3. 快乐原则（Hedonistisches Prinzip/以快乐与免除痛苦为终极善），4. 普遍主义平等原则（Universalistisches Prinzip/每个人都只算作一人，无人享有特权）。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Moralisch richtig ist allein das, was der Papst in Rom oder der regierende König in London an jedem Sonntagmorgen per Dekret befiehlt, ungeachtet jeglicher Folgen für die Bevölkerung.",
            textZH:
              "道德上唯有罗马教皇或伦敦在位君主每周日早晨签署的法令才是正确的，无论这些法令对老百姓造成多么灾难性的痛苦后果。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Der Utilitarismus besagt, dass jeder Mensch das Recht hat, alle anderen Menschen rücksichtslos zu berauben, solange er selbst dabei persönliche Freude empfindet.",
            textZH:
              "功利主义主张每个人都有权肆无忌惮地洗劫掠夺他人，只要他本人在这个过程中能获得个人自私的狂欢快乐即可。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Die 4 Säulen des Utilitarismus (Standard-Lehrplan NRW): Folgen (Teleologie), Nutzen, Lust (Hedonismus) und Unparteilichkeit (Universale Gleichheit).",
        explanationZH:
          "【正解依据与文本锚点】\n北威州高中哲学会考（Klausur / Abitur）伦理学核心考点：功利主义四大支柱（Die vier utilitaristischen Kriterien）：\n1. 后果原则（Konsequenzenprinzip / Teleologie）：行为善恶不在于行为者主观是否出于善意（与康德决裂），而在于其行为产生的可预见实际效果；\n2. 效用原则（Utilitätsprinzip）：以该后果能否增加整体福祉或减少损害为唯一标准；\n3. 快乐主义原则（Hedonistisches Prinzip）：终极善（Summum bonum）不是虚无的‘理性法则’，而是实实在在的快乐与无痛苦体验；\n4. 普遍性原则（Universalistisches Prinzip / Sozialprinzip）：绝非利己主义（Egoismus）！计算时必须把所有受影响者的利益同等纳入，‘Jeder zählt als einer und keiner für mehr als einen’（任何人都不比别人更高贵）。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（神权专制伦理混淆）：功利主义是彻底启蒙理性化的世俗伦理学，坚决粉碎神权迷信；\n• 选项 C 诊断（将普遍功利歪曲为个人利己主义）：这是对功利主义最粗鄙的庸俗化误读，功利主义追求的是‘集体总福祉’而非单体掠夺。\n\n【时代思潮与哲学脉络】\n功利主义的激进进步性：在19世纪英国阶级森严的环境下，普遍性原则意味着穷人、妇女、工人的快乐与贵族公爵的快乐在天平上拥有绝对等额的权重，推动了英国议会改革法案与监狱人道化改革。",
        klausurSatzDE:
          "Der klassische Utilitarismus konstituiert sich als teleologische normative Ethik durch das Zusammenspiel vierer Teilprinzipien: Handlungen werden ausschließlich nach ihren realen Konsequenzen (Folgenprinzip), an ihrem Nutzen (Utilitätsprinzip) für das menschliche Wohlbefinden im Sinne von Lust und Schmerzvermeidung (hedonistisches Prinzip) und unter egalitärer Einbeziehung aller Betroffenen (universalistisches Prinzip) bewertet.",
        klausurSatzZH:
          "古典功利主义作为一种规范目的论伦理学，由四大支柱原则的有机协同构建而成：行为之善恶评判，完全依凭其客观现实后果（后果原则），以其对促进人类免除痛苦与享有快乐之福祉的净效用为标尺（功利原则与快乐主义原则），并对所有利益相关方予以不偏不倚的绝对平等考量（普遍性原则）。",
        ehzKeyPointsDE: [
          "Präzise Nennung und Erläuterung der vier Teilprinzipien (Konsequenz, Nutzen, Hedonismus, Universalität).",
          "Abgrenzung des Universalismus gegen Egoismus ('größtes Glück der größten Zahl').",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Kriterien 4P)：精准阐述后果、效用、快乐、普遍四大子原则及其定义内涵。",
          "采分点 2 (Universalität 4P)：深刻区分功利主义的普遍利益天平与粗鄙自私利己主义的界限。",
        ],
      },
      {
        id: "q-mill-2",
        dimension: "argumentation",
        afb: "AFB II",
        titleDE: "Qualitativer Hedonismus & 'Kompetente Richter'",
        titleZH: "质性快乐主义与‘胜任裁判官’论证机制 (AFB II: Analysieren)",
        questionDE:
          "Wie begründet Mill seine These, dass geistige Freuden qualitativ höherwertig seien als rein sinnliche Genüsse, und welche Funktion übernimmt dabei das epistemische Kriterium der 'kompetenten Richter' (Z. 8–12)?",
        questionZH:
          "密尔依据何种逻辑论据证明心智理智快乐在‘质’上绝对优越于感官肉体享乐？其中‘胜任的裁判官’（Kompetente Richter）这一认识论判准（第8–12句）承担了何种关键证明功能？",
        options: [
          {
            id: "a",
            textDE:
              "Mill bricht mit Benthams rein quantitativer Rechenlehre und postuliert Qualitätsunterschiede: Geistige Freuden (Intellekt, Kunst, moralisches Engagement) sind den körperlichen Trieben kategorial überlegen. Als objektiver Maßstab fungieren 'kompetente Richter'—Individuen, die beide Freudenformen aus eigener Anschauung erprobt haben und sich empirisch stets für die Verwirklichung ihrer höheren Anlagen entscheiden, selbst wenn dies mit größerer Schmerz- und Zweifelsanfälligkeit (Sokrates) einhergeht.",
            textZH:
              "密尔决裂了边沁单纯数人头和量化时间的‘快乐算盘’，断言快乐存在不可通约的本质阶序：心智智识与道德快乐在范畴上绝对压倒动物性肉体生理满足。其客观评判基准依托于‘胜任的裁判官’——即对高级理智快乐与低级肉体感官快乐皆有亲身体验的清醒者；经验证明，这些知情者无一例外都会毅然决然地选择更高阶的潜能实现，哪怕这种追求伴随着更多的心灵煎熬与未解疑惑（如苏格拉底），也绝不愿倒退为无知蠢汉。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Mill behauptet, dass der britische Premierminister allein qua Amt bestimmen darf, welches Buch als hochgeistig und welches Bier als qualitativ minderwertig verboten wird.",
            textZH:
              "密尔主张只有英国首相本人凭借政治特权，才有资格在官报上直接下令指定哪本书算作高雅读物、哪种啤酒算作低俗毒药予以查封禁售。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Es gibt laut Mill keinerlei Unterschied zwischen Menschen und Schweinen; wenn Schweine gern im Schlamm baden, sollten alle Universitäten geschlossen und in Schlammgruben umgewandelt werden.",
            textZH:
              "密尔认为人与野猪没有任何区别；既然野猪喜欢在泥浆里打滚，那么全人类所有大学都应该立刻关闭拆迁，就地改建为公共泥潭供全体国民滚泥巴享乐。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Differenzierung von Glück vs. Zufriedenheit: Das Schwein erfährt bloße 'Zufriedenheit' (Bedürfnisbefriedigung); der denkende Mensch strebt nach 'Glück' (Selbstverwirklichung und Würde).",
        explanationZH:
          "【正解依据与文本锚点】\n密尔对古典功利主义的最伟大拯救（Qualitativer Hedonismus）：\n边沁曾提出著名的极端量化公式：‘只要快乐量相同，玩图钉游戏（push-pin）就同读诗歌（poetry）一样好。’批评者因此指责功利主义鼓励民众沉溺于醉生梦死和低级感官刺激。\n密尔做出关键反击：\n1. 快乐的二元分层：\n   - 低级快乐（Niedere Lust）：饮食、睡眠、性欲等单纯生物学欲求满足（Zufriedenheit / Contentment）；\n   - 高级快乐（Höhere Lust）：探索真理、艺术创作、友谊、同情心、捍卫正义等高阶心智能力（Glück / Happiness）。\n2. 认识论裁判（Kompetente Richter）：如何证明高级快乐更好？不能靠形而上教条，而靠经验实证。谁体验过这两种快乐？受过文明熏陶的人既吃过美食、也体验过哲思狂喜；而愚人和野兽只了解吃喝。正是那些‘双料体验者’坚定不移的裁决，铸就了质性快乐无可辩驳的客观性。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（家长制集权审查歪曲）：密尔是《论自由》的作者，坚决捍卫言论自由，绝非政府独裁论者；\n• 选项 C 诊断（倒置讽刺）：文本第15–16句明确驳斥‘做满足的猪不如做不满足的苏格拉底’。\n\n【时代思潮与哲学脉络】\n人性尊严（Dignity）的回归：密尔在功利主义内部悄然植入了古希腊亚里士多德‘潜能实现’（Entelechie）与人本主义尊严的内核，大大增强了功利主义的道德厚度。",
        klausurSatzDE:
          "Indem Mill Benthams quantitative Nutzenkalkulation um die qualitative Dimension erweitert, rettet er den Utilitarismus vor dem Vorwurf einer 'Schweinephilosophie': Das epistemische Kriterium der 'kompetenten Richter' fundiert empirisch, dass geistig-reflexive Freuden aufgrund ihrer Verknüpfung mit menschlicher Würde einen kategorialen Vorrang vor bloßer sinnlicher Triebbefriedigung beanspruchen.",
        klausurSatzZH:
          "通过在边沁纯粹量化效用计算中注入质性维度，密尔成功解救了功利主义使其免遭‘猪的哲学’之斥难：‘胜任裁判官’这一认识论判准从经验层面坚实确立，精神反思层面的高阶快乐因其与人性尊严的深刻联结，在范畴上天然凌驾于动物性低阶感官欲望满足之上。",
        ehzKeyPointsDE: [
          "Bruch mit Bentham: Abkehr vom reinen Quantitätsprinzip.",
          "Erläuterung des Konzepts der kompetenten Richter (Erfahrung beider Lustformen als Kriterium).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Bentham vs. Mill 4P)：精准剖析从边沁‘纯量化算盘’到密尔‘质性分层’的理论进化跃迁。",
          "采分点 2 (Kompetente Richter 4P)：深刻阐发‘双料经验体验者’作为经验认识论判准的论证逻辑与效力。",
        ],
      },
      {
        id: "q-mill-3",
        dimension: "theorie",
        afb: "AFB II",
        titleDE: "Kritik & Aporien des Qualitativen Utilitarismus",
        titleZH: "质性功利主义的理论阿喀琉斯之踵与精英主义危机 (AFB II: Problematisieren)",
        questionDE:
          "Welche grundlegende theoretische Aporie (Widerspruch) werfen moderne Philosophen Mills qualitativem Utilitarismus vor, insbesondere im Hinblick auf Benthams ursprüngliches Nützlichkeitskalkül?",
        questionZH:
          "现代伦理学界与分析哲学家指责密尔的‘质性功利主义’陷入了何种难以克服的内在理论自相矛盾（Aporie）？这一修正为何在某种程度上动摇了边沁最初效用主义的理论根基？",
        options: [
          {
            id: "a",
            textDE:
              "Durch die Einführung eines qualitativen Maßstabs verlässt Mill heimlich das hedonistische Prinzip: Wenn Freude A wertvoller ist als Freude B, obwohl Freude B quantitativ intensiver empfunden wird, so entscheidet nicht mehr die 'Lust an sich' über den moralischen Wert, sondern ein externes, nicht-hedonistisches Ideal (wie Bildung, menschliche Würde oder Tugend). Damit verliert der Utilitarismus seine mathematische Berechenbarkeit und droht in einen elitären Paternalismus abzugleiten.",
            textZH:
              "通过强行引入‘质’的衡量尺度，密尔暗度陈仓地背叛了纯粹快乐主义底线：如果快乐 A 在数量强度上弱于快乐 B，却被判定为更有价值，那么决定其价值的就不再是‘快乐本身’，而是一个外在的、非功利主义的标准（如古典教养、人性尊严、美德或理性能力）。这使得功利主义丧失了边沁所引以为傲的数学客观可计算性，并面临滑向‘知识分子自命清高判定什么是高级快乐’的精英主义家长制专权（Paternalismus）危机。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Mill hat vergessen, wie man Grundrechenarten ausführt, weshalb er alle Zahlen in seinem Buch durch lateinische Gedichte ersetzte.",
            textZH:
              "密尔在写作时突然忘记了如何进行加减乘除四则运算，因此他赌气在书里用拉丁文十四行诗强行替换掉了所有数学计算公式。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Der Utilitarismus von Mill wurde verboten, weil er die Produktion von Shakespeare-Büchern in ganz Europa mit der Todesstrafe bedrohte.",
            textZH:
              "密尔的理论在当时被全欧洲查禁，因为他在书中号召欧洲各国立即对所有出版莎士比亚戏剧的印刷厂老板判处绞刑。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Das Methoden-Dilemma: Ist der Wertmaßstab noch 'Lust' oder bereits 'Würde' (Kant'scher Einschlag)? Wenn Qualität zählt, ist der Hedonismus aufgegeben; wenn Quantität zählt, bleibt der Schweine-Vorwurf bestehen.",
        explanationZH:
          "【正解依据与文本锚点】\n哲学史上对密尔最深刻的理论解剖（Das Problem des qualitativen Hedonismus）：\n哲学家们指出了密尔两难（Mills Dilemma）：\n1. 放弃快乐主义底色：如果‘读歌德的快乐’比‘喝啤酒的快乐’更高级，甚至当喝啤酒带来的爽感（量）远超读诗时，读诗仍然胜出——那么请问，支撑读诗胜出的‘那个东西’到底是什么？显然已经不再是‘快乐’本身，而是隐藏在其背后的‘理性心智发展’、‘人性尊严’或‘文化教养’！密尔实际上把康德或亚里士多德的德性价值，偷偷塞进了功利主义皮囊中；\n2. 丧失可计算性：边沁的快乐计算法（Hedonistisches Kalkül: 强度、持续时间、确定性、纯度、广度）是可以用数字相加的；一旦引入性质，不同质的快乐根本无法放在同一天平上折算（如同拿一斤苹果去减三只香蕉）；\n3. 精英主义傲慢（Paternalismus）：谁有资格当‘胜任的裁判官’？难道只有受过良好牛津剑桥教育的士绅阶层才能决定什么是‘高尚快乐’？普通工人下班喝啤酒吃炸鸡的快乐难道就活该被贬为‘低贱畜生’？这遭到了民主平权哲学的剧烈质疑。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（无厘头低俗嘲讽）：密尔是逻辑学与经济学泰斗，计算能力极强；\n• 选项 C 诊断（无端造谣）：密尔一生热爱文学与莎士比亚，视诗歌为崇高精神快乐的典范。\n\n【时代思潮与哲学脉络】\n现代偏好功利主义（Präferenzutilitarismus）：正是为了克服密尔的质性困境，彼得·辛格（Peter Singer）等当代哲学家抛弃了模糊的‘快乐’概念，转而以‘当事人的主观偏好能否得到满足’（Erfüllung von Präferenzen）作为全新衡量基石。",
        klausurSatzDE:
          "In systematischer Problemexplikation erweist sich Mills qualitativer Utilitarismus als theorieimmanente Aporie: Indem Mill eine Hierarchie der Lüste über nicht-hedonistische Kriterien (wie Vernunftbegabung und Würde) begründet, unterminiert er Benthams mathematisches Nutzenkalkül und setzt sich dem Vorwurf eines bildungsbürgerlichen Paternalismus aus.",
        klausurSatzZH:
          "在系统性的学理问题化审视中，密尔的质性功利主义暴露出理论内在难以调和的自相矛盾：密尔一旦借助非快乐主义标准（如理性能力与尊严）确立快乐等级秩序，便实质瓦解了边沁原本清晰的数学效用算盘，并使自身无可避免地陷入了市民阶级文化精英主义家长制的学理诘难。",
        ehzKeyPointsDE: [
          "Identifikation des Methodenwiderspruchs: Qualitätsurteil verlässt den reinen Hedonismus.",
          "Kritik des Paternalismus und der mangelnden mathematischen Berechenbarkeit heterogener Freuden.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Aporie-Analyse 4P)：深刻剖析‘质性评判背离纯快乐主义’向德性伦理潜移默化的逻辑断裂。",
          "采分点 2 (Paternalismus-Kritik 4P)：精准点出量化折算机制崩溃与精英主义裁判官特权带来的合法性危机。",
        ],
      },
      {
        id: "q-mill-4",
        dimension: "theorie",
        afb: "AFB III",
        titleDE: "Teleologie vs. Deontologie: Mill und Kant im 21. Jahrhundert",
        titleZH: "目的论与义务论的世纪对决：自动驾驶与现代伦理困境终审 (AFB III: Beurteilen)",
        questionDE:
          "Inwiefern lässt sich der fundamentale ethische Dissens zwischen Mills konsequenzialistischem Utilitarismus und Kants deontologischer Pflichtenethik am modernen Dilemma selbstfahrender Fahrzeuge (autonomes Fahren) fruchtbar machen und theoriegeleitet beurteilen?",
        questionZH:
          "在21世纪人工智能算法与自动驾驶（Autonomes Fahren）面对不可避免的突发车祸两难抉择时，我们应当如何理论化地辩证评判密尔的后果目的论（Teleologie）与康德的义务论伦理学（Deontologie）的尖锐对决与时代启示？",
        options: [
          {
            id: "a",
            textDE:
              "Der Utilitarismus fordert eine strikte Schadensminimierung (Opferung eines Einzelnen zur Rettung von fünf Personen), gerät aber in Konflikt mit dem verfassungsrechtlichen Schutz der Menschenwürde (Art. 1 GG), der eine Verrechnung von Menschenleben verbietet; Kants kategorischer Imperativ verbietet absolut die Instrumentalisierung des Menschen als bloßes Rechenmittel, führt in der Praxis jedoch zu moralischer Handlungslähmung. Eine zeitgemäße Ethik bedarf daher einer kantischen deontologischen Schutzgrenze für Grundrechte, kombiniert mit utilitaristischer Folgenabwägung innerhalb dieser unverletzlichen Grenzen.",
            textZH:
              "功利主义主张严格的总伤害最小化原则（牺牲1名行人转向撞墙，以拯救车内5名乘客），但这直接侵犯了德国基本法第1条所捍卫的‘人的尊严不可侵犯’（生命绝对禁止数量相抵）；而康德定言命令坚决禁止将任何人仅仅当作救人的算术工具，但在千钧一发的现实编程中却极易导致‘坐视更大惨剧发生’的行动瘫痪。因此，当代应用伦理学走向了一种辩证综合：以康德义务论确立生命不可剥夺的绝对宪政红线，而在不突破尊严底线的安全空间内，采纳功利主义的高效福祉后果优化。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Sowohl Kant als auch Mill haben gefordert, dass Autos grundsätzlich verboten werden müssen und alle Bürger des 21. Jahrhunderts verpflichtet sind, täglich 50 Kilometer zu Fuß zu wandern.",
            textZH:
              "康德与密尔在遗嘱中一致强烈要求全面禁止人类生产任何汽车，规定21世纪全体地球公民每天必须强制徒步负重行军50公里作为道德修养。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "In der modernen Welt spielen philosophische Ethiktheorien keinerlei Rolle mehr, da Softwareprogramme ausschließlich durch den Würfelwurf von Zufallsgeneratoren gesteuert werden sollten.",
            textZH:
              "在现代社会中伦理哲学早已毫无意义，自动驾驶系统的所有生死避让程序直接由车载电脑扔骰子掷随机数决定即可。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Klassische Klausur-Synthese (NRW AFB III): Konfrontation von Zweck-Mittel-Relation (Kant) mit Nutzenmaximierung (Mill). Anbindung an das Urteil des BVerfG zum Luftsicherheitsgesetz 2006 (Menschenleben dürfen nicht aufgerechnet werden).",
        explanationZH:
          "【正解依据与文本锚点】\n北威州哲学会考最高阶终审辨析（AFB III: Ethisches Urteil）：\n1. 密尔的功利主义视角（Teleologie / Konsequentialismus）：\n   - 核心裁决：若自动驾驶撞击是不可避免的物理事实，算法必须优先撞击人数少的目标，以最大化保全生命净总量。‘5条命大于1条命’是冷静理性的必然算术；\n   - 致命软肋：将无辜第三者剥夺为‘救人工具’，践踏了宪法正义（德国联邦宪法法院在 2006 年《航空安全法》判决中明确裁定：哪怕飞机被恐怖分子劫持飞向万人体育场，政府也绝无权击落客机杀死乘客，因为生命尊严绝对禁止数量相抵计算）；\n2. 康德的义务论视角（Deontologie / Kategorischer Imperativ）：\n   - 核心裁决：‘人类自为目的公式’（Menschheits-Zweck-Formel）——人永远是目的，绝不能被当作实现群体福祉的手段。主动打方向盘碾死路边守法的单个行人来拯救违规穿越马路的群体，是犯下了谋杀的绝对恶行；\n   - 现实局限：在工程与代码的紧急避险中，若完全不做任何转向干预，将导致更多无辜生命涂炭，陷入残酷的道德原教旨停摆；\n3. 高分综合评判（Synthese & Urteil）：\n   当代德国联邦交通部出台的《自动驾驶伦理准则》（Ethik-Kommission für automatisiertes Fahren）采取了折中路径：在尊严原则绝对保障的前提下（禁止按年龄、性别、种族、身体机能区别对待生命），在纯粹的物理损害限度内允许做整体伤害最小化的应急控制。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（低级滑稽反智）：荒谬虚构哲学家反对现代交通；\n• 选项 C 诊断（虚无主义逃避）：伦理算法正是当代科技伦理学与立法机关争议的最核心战场。\n\n【时代思潮与哲学脉络】\n从理论走向宪政实践：康德与密尔的争论不仅是书本哲学，更是当今欧盟与德国起草高科技法案、生命伦理学与医疗资源分配的实际司法基石。",
        klausurSatzDE:
          "Im Diskurs moderner Algorithmenethik markieren Mill und Kant zwei antagonistische, gleichwohl komplementäre Paradigmen: Während Mills Utilitarismus die pragmatische Schadensminimierung anleitet, zieht Kants deontologische Menschenwürdeformel eine unüberwindbare Grenze gegen die quantitative Aufrechnung von Menschenleben, sodass eine tragfähige Angewandte Ethik eine deontologische Grundrechtsgrenze mit utilitaristischer Optimierung synthetisieren muss.",
        klausurSatzZH:
          "在现代算法伦理的商谈场域中，密尔与康德构成了两座对立却互补的灯塔范式：密尔的功利主义为整体伤害最小化提供了务实的计算指引，而康德义务论的尊严自为目的公式则铸就了一条绝不容逾越的防线，严厉阻绝将生命置于冷血算术天平上称重；因而，成熟的应用伦理学唯有将义务论的基本权利红线与功利主义的福祉优化予以辩证综合。",
        ehzKeyPointsDE: [
          "Strukturierter Vergleich von Teleologie (Mill) und Deontologie (Kant) an einem modernen Dilemma.",
          "Reflexion auf die Unantastbarkeit der Menschenwürde (Art. 1 GG / Verbot der Aufrechnung von Leben).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Theorienvergleich 4P)：精准对比目的论（后果算盘）与义务论（责任律令）在自动驾驶两难中的冲突机理。",
          "采分点 2 (Verfassungsbezug & Urteil 4P)：高水准联动德国基本法第一条尊严条款与 2006 航空安全法判例，给出兼具学理与宪政深度的终审裁决。",
        ],
      },
    ],
  },

  // =========================================================================
  // 17. ENGLISCH: George Orwell — Nineteen Eighty-Four (反乌托邦与思想控制)
  // =========================================================================
  {
    id: "orwell-1984",
    fach: "Englisch",
    genre: "Epik",
    author: "George Orwell",
    workTitleDE: "Nineteen Eighty-Four",
    workTitleZH: "《一九八四》",
    sceneTitleDE: "Part 1, Chapter 1 // Telescreen, Big Brother & The Ministry of Truth",
    sceneTitleZH: "第一部第一章：电幕、老大哥与真理部 (全景敞视监控、新话与双重思想)",
    versesRange: "Part 1, Chapter 1 (Opening excerpt)",
    epochDE: "Dystopian Fiction / 20th Century English Novel (1949)",
    epochZH: "反乌托邦讽刺小说 / 20世纪英国经典文学 (1949)",
    contextDE:
      "In a bleak, dystopian London ruled by the totalitarian Party (Ingsoc), Winston Smith navigates a suffocating surveillance apparatus. The omnipresent telescreens, the face of Big Brother, and the paradoxical Party slogans enforce total cognitive and linguistic subjugation.",
    contextZH:
      "在被极权主义寡头政党（英社 Ingsoc）统治的阴暗反乌托邦伦敦，小职员温斯顿·史密斯在无所不在的全景监控监视器下战战兢兢地生活。无处不在的电幕、老大哥的冷酷面孔以及充满悖论的党的核心口号，对全人类的心智与语言施加了绝对剥夺与精神奴役。",
    verses: [
      {
        lineNum: 1,
        textDE: "It was a bright cold day in April, and the clocks were striking thirteen.",
        translationZH: "那是四月里一个晴朗而寒冷的日子，时钟敲响了十三下。",
        toneCategory: "krise",
        stilmittel: {
          type: "Distorted Reality / Estrangement",
          descDE: "The clock striking 'thirteen' immediately signals an unnatural, distorted reality beyond normality.",
          descZH: "陌生化现实畸变：'时钟敲响十三下'破空开篇，立即宣告了整个人类文明日常秩序的失常与被篡改。",
        },
      },
      {
        lineNum: 2,
        textDE: "Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind...",
        translationZH: "温斯顿·史密斯为了躲避寒风把下巴缩在胸前……",
        toneCategory: "krise",
      },
      {
        lineNum: 3,
        textDE: "...slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.",
        translationZH: "……快步闪进‘胜利大厦’的玻璃门，但风沙还是夹着刺鼻的尘土跟着他卷了进来。",
        toneCategory: "spott",
        stilmittel: {
          type: "Irony of Victory",
          descDE: "'Victory Mansions' is a filthy, decaying tenement; dramatic irony exposes Party propaganda.",
          descZH: "讽刺命名（反讽）：破败肮脏、充满霉味的筒子楼却被冠以‘胜利大厦’的宏伟名称，赤裸裸揭示了党宣传语言与凄惨现实的撕裂。",
        },
      },
      {
        lineNum: 4,
        textDE: "The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall.",
        translationZH: "门厅里弥漫着煮烂卷心菜和旧碎布垫子的气味。在门厅一头，一张大得不适宜在室内张贴的彩色招贴画被钉在墙上。",
        toneCategory: "krise",
      },
      {
        lineNum: 5,
        textDE: "It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features.",
        translationZH: "画面上只有一张一米多宽的巨型面孔：那是一个约莫四十五岁男人的面孔，留着浓密的黑胡子，面部线条粗犷英武。",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 6,
        textDE: "Winston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working, and at present the electric current was cut off during daylight hours.",
        translationZH: "温斯顿朝楼梯走去。试图乘电梯是毫无指望的。即使在情况最好的时候电梯也极少运行，而眼下由于白天实行电力管制，电源早被切断了。",
        toneCategory: "krise",
      },
      {
        lineNum: 7,
        textDE: "On each landing, opposite the lift-shaft, the poster with the enormous face gazed from the wall. It was one of those pictures which are so contrived that the eyes follow you about when you move.",
        translationZH: "在每一个楼梯平台正对电梯井的墙上，那张画着巨脸的招贴画都死死凝视着过往之人。那是那种经过特殊构图绘制的画像，无论你走到哪里，画中的眼睛都仿佛如影随形跟着你。",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 8,
        textDE: "BIG BROTHER IS WATCHING YOU, the caption beneath it ran.",
        translationZH: "画下方的一行大字赫然写着：老大哥正在看着你。",
        toneCategory: "autoritaet",
        vocab: {
          word: "Big Brother is watching you",
          meaningDE: "Panoptische Chiffre totaler Allgegenwart und Überwachung.",
          meaningZH: "全景敞视全天候监控密码：剥夺个人哪怕一秒钟的隐私，构筑窒息的心理戒惧。",
        },
      },
      {
        lineNum: 9,
        textDE: "Inside the flat a fruity voice was reading out a list of figures which had something to do with the production of pig-iron.",
        translationZH: "公寓房间里，一个字正腔圆的声音正在大声朗读一份关于生铁产量的统计数字清单。",
        toneCategory: "spott",
      },
      {
        lineNum: 10,
        textDE: "The voice came from an oblong metal plaque like a dulled mirror which formed part of the surface of the right-hand wall.",
        translationZH: "这声音来自一块长方形金属薄板，它像一面暗淡的镜子，嵌在右侧墙壁表面。",
        toneCategory: "krise",
        vocab: {
          word: "telescreen",
          meaningDE: "Zweiwege-Fernseher: Empfängt Propaganda und sendet simultan Audio- und Videobilder des Bürgers an die Gedankenpolizei.",
          meaningZH: "电幕（双向监控电视）：不仅是单向宣传灌输工具，更是将房间内每一个公民的呼吸动作与声音24小时不间断上传至思想警察指挥中枢的电子眼。",
        },
      },
      {
        lineNum: 11,
        textDE: "The instrument (the telescreen, it was called) could be dimmed, but there was no way of shutting it off completely.",
        translationZH: "这个仪器（被称为电幕）的音量虽然可以被调小，但绝对没有任何方法能把它彻底关掉！",
        toneCategory: "krise",
        stilmittel: {
          type: "Totalitarian Omnipresence",
          descDE: "The impossibility of turning it off embodies the absolute annihilation of the private sphere.",
          descZH: "绝对极权在场性：无法关闭的物理机制，象征着私人生活领域的彻底消亡与国家公权力的无限侵入。",
        },
      },
      {
        lineNum: 12,
        textDE: "You had to live—did live, from habit that became instinct—in the assumption that every sound you made was overheard, and, except in darkness, every movement scrutinized.",
        translationZH: "你必须生活在——而且实际上也正是从习惯演变为本能地生活在——这样一种假定之中：你发出的每一丝声音都被人偷听，除了在彻底黑暗中，你的每一个动作都受到严密审视检视。",
        toneCategory: "krise",
      },
      {
        lineNum: 13,
        textDE: "Winston kept his back turned to the telescreen. It was safer, though, as he well knew, even a back can be revealing.",
        translationZH: "温斯顿背对着电幕坐着。这样更安全些，尽管他也十分清楚，哪怕是一个背影，也能暴露一个人的反叛心思。",
        toneCategory: "krise",
        vocab: {
          word: "thoughtcrime",
          meaningDE: "Gedankendelikt: Das heiligste Verbrechen im Totalitarismus; Denken gegen die Parteilinie zieht den physischen Tod nach sich.",
          meaningZH: "思想罪：极权主义社会最高死罪；不忠于党的哪怕一刹那内在思绪闪现，便足以引来物理肉身的彻底蒸发。",
        },
      },
      {
        lineNum: 14,
        textDE: "A kilometre away the Ministry of Truth, his place of work, towered vast and white above the grimy landscape.",
        translationZH: "一公里之外，他供职的真理部（Ministry of Truth）巍峨耸立，洁白宏伟，高高凌驾于周围乌黑肮脏的废墟市容之上。",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 15,
        textDE: "This, he thought with a sort of vague distaste—this was London, chief city of Airstrip One, itself the third most populous of the provinces of Oceania.",
        translationZH: "这就是——他带着一种模糊的厌恶思索着——这就是伦敦，第一空降场的主要城市，也是大洋国人口第三大省份的首府。",
        toneCategory: "krise",
      },
      {
        lineNum: 16,
        textDE: "WAR IS PEACE // FREEDOM IS SLAVERY // IGNORANCE IS STRENGTH.",
        translationZH: "战争即和平 // 自由即奴役 // 无知即力量。",
        toneCategory: "autoritaet",
        stilmittel: {
          type: "Oxymoron / Paradox / Doublethink",
          descDE: "The ultimate paradoxes of Doublethink: Erasing logical contradictions to destroy rational critical thinking.",
          descZH: "终极矛盾反讽/双重思想口号：通过强行等同互相否定的反义词，摧毁人类语言的逻辑底线与批判性思考能力。",
        },
      },
    ],
    questions: [
      {
        id: "q-orwell-1",
        dimension: "wortschatz",
        afb: "AFB I",
        titleDE: "Surveillance Architecture & The Telescreen",
        titleZH: "全面监控装置与电幕的双向机制 (AFB I: Outline & Identify)",
        questionDE:
          "How does Orwell construct the pervasive surveillance system in Chapter 1 through the motifs of the 'telescreen' and the 'Big Brother' posters?",
        questionZH:
          "奥威尔在第一章中如何通过‘电幕’（telescreen）与‘老大哥招贴画’（Big Brother posters）两大核心意象，建构起一套窒息人性的全天候全景监控体系？",
        options: [
          {
            id: "a",
            textDE:
              "The telescreen functions as a bi-directional panoptic apparatus that continuously broadcasts propaganda while simultaneously transmitting visual and auditory data to the Thought Police, making privacy physically impossible; reinforced by the ubiquitous posters whose eyes 'follow you about', the state installs permanent paranoia directly into the citizen's subconsciousness.",
            textZH:
              "电幕充当了双向运转的全景敞视控制机器（Panopticon）：它在不间断灌输国家虚假宣传的同时，实时将公民在室内的每一声叹息与每一个微表情上传给思想警察，在物理上彻底消灭了‘私人隐私空间’；配合着那无论走到哪里视线都‘如影随形’的老大哥巨型画像，国家权力将长期的神经质戒惧直接烙印进了每一个公民的潜意识深处。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "The telescreen was an expensive video game console that Winston purchased to play online soccer with his friends on the weekends.",
            textZH:
              "电幕是温斯顿为了在周末和朋友联机踢足球游戏而自费购买的高端大屏幕索尼PlayStation游戏机。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "The posters of Big Brother were harmless tourism advertisements designed by the London city council to invite French travelers to visit British museums.",
            textZH:
              "老大哥招贴画是伦敦旅游局为了吸引法国游客来大英博物馆参观而设计的温和城市文旅宣传画，旨在促进跨国文化交流。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Panopticism according to Foucault: The citizen never knows when he is being watched, so he must assume he is watched at every split second.",
        explanationZH:
          "【正解依据与文本锚点】\n边沁与福柯‘全景敞视监狱’（Panoptismus）的终极文学演绎：\n1. 双向电幕（Telescreen）：文本第10–11句明确指出‘could be dimmed, but there was no way of shutting it off completely’。国家机器不仅强行灌输关于生铁产量的谎言数据，更关键的是它剥夺了‘关闭’的权力。任何试图逃离国家视线的举动本身就是犯罪；\n2. 心理内化（Internalized Coercion）：文本第12句写道‘did live, from habit that became instinct, in the assumption that every sound you made was overheard’。当公民无法确认自己是否正在被监视时，他只能被迫在每一个微秒中假定自己正被严密审视，从而在心中建立起一个时刻自我审查的思想警察。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（无厘头娱乐化歪曲）：把极权恐怖降格为儿童电子游戏；\n• 选项 C 诊断（低级反向解读）：完全抹杀冷战极权统治与思想控制的阴森本质。\n\n【时代思潮与哲学脉络】\n现代技术极权批判：奥威尔敏锐预言了现代电子科技与国家官僚机器结合后，可能对个体人权实施的毁灭性监控掠夺，成为当代数字隐私与算法监控资本主义的永恒警钟。",
        klausurSatzDE:
          "Orwell conceptualizes the telescreen and the Big Brother icon as an inescapable panoptic architecture: By eliminating the ontological boundary between public authority and private sanctuary, the totalitarian apparatus induces permanent self-censorship and transforms paranoia into a biological survival instinct.",
        klausurSatzZH:
          "奥威尔将电幕与老大哥图腾构想为一座无所遁逃的全景敞视控制体系：通过在本体论意义上抹平公共权力与私人庇护所之间的红线界限，极权国家机器诱发了公民不可逆转的自我思想审查，将战战兢兢的偏执戒惧异化为一种生物学本能。",
        ehzKeyPointsDE: [
          "Detailed functional analysis of the telescreen (two-way broadcast and eavesdropping).",
          "Explanation of the psychological internalization of surveillance (habit becoming instinct).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Panoptic Mechanics 4P)：精准指出电幕‘不可彻底关闭’与‘双向信息采集’的极权监控特征。",
          "采分点 2 (Psychological Subjugation 4P)：深刻阐发外部监控如何异化为公民内心深处的‘自动规训与自我思想审查本能’。",
        ],
      },
      {
        id: "q-orwell-2",
        dimension: "stilmittel",
        afb: "AFB II",
        titleDE: "The Paradoxical Party Slogans & Doublethink",
        titleZH: "党的核心悖论口号与双重思想机制 (AFB II: Analyse)",
        questionDE:
          "How do the three Party slogans 'WAR IS PEACE // FREEDOM IS SLAVERY // IGNORANCE IS STRENGTH' (line 16) embody the linguistic and psychological mechanism of 'Doublethink'?",
        questionZH:
          "大洋国执政党的三句核心口号‘战争即和平 // 自由即奴役 // 无知即力量’（第16句），如何通过语言悖论（Paradox / Oxymoron）与认知操控，淋漓尽致地体现了‘双重思想’（Doublethink）的心理奴役机制？",
        options: [
          {
            id: "a",
            textDE:
              "The slogans operate through radical semantic oxymora that violently force logically mutually exclusive concepts together; by compelling the human brain to simultaneously hold and sincerely believe contradictory propositions, the Party systematically destroys objective logic and independent critical faculty, conditioning the population to accept that objective truth is whatever the Party dictates at any given moment.",
            textZH:
              "这三句口号运用了激进的语义矛盾反讽（Oxymora），强行将逻辑上绝对互斥的对立概念焊死在一起；通过强迫人类大脑同时容纳并真诚相信两个截然矛盾的命题（双重思想），党系统性地摧毁了人类理性逻辑与独立批判思维的基石，成功驯化大众顺从一个终极规则：客观真理没有任何固定标准，党在任何给定时空里宣布什么是真理，什么就是真理！",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "The slogans are simple rhyming slogans used by London primary schools to teach six-year-old children how to read and spell short English words.",
            textZH:
              "这三句口号只是伦敦小学为了教六岁儿童认字拼写英语短单词而编写的朗朗上口的押韵童谣顺口溜。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "The Party slogans were accidentally misspelled by a sleepy sign painter and the government never found the time to fix the spelling mistakes on the Ministry of Truth.",
            textZH:
              "这三句口号是印刷厂油漆工在打瞌睡时无意写错的笔误错别字，由于真理部官员工作繁忙，一直没抽出空去纠正外墙上的涂鸦错误。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Linguistic Determinism (Sapir-Whorf Hypothesis): If the language has no words to express freedom or rebellion, rebellion becomes literally unthinkable.",
        explanationZH:
          "【正解依据与文本锚点】\n语言决定论与极权认识论（Linguistic Engineering & Epistemological Control）：\n奥威尔在这三句口号中揭示了人类历史上最阴毒的心智控制术：\n1. 语言语义消解：\n   - 战争即和平（WAR IS PEACE）：通过制造虚构的永恒对外战争，消耗国内所有剩余财富，使社会长期处于匮乏与狂热狂躁状态，从而维持国内阶级统治的绝对‘内稳态和平’；\n   - 自由即奴役（FREEDOM IS SLAVERY）：个体追求自由必将死于孤独与无助；唯有交出自我、完全臣服于党的集体不朽，才能获得力量；\n   - 无知即力量（IGNORANCE IS STRENGTH）：民众越缺乏思辨与历史记忆，统治阶级就越不可动摇；\n2. 双重思想（Doublethink）的核心定义：在头脑中同时接受两件矛盾的事物，明知其不可并存，却在思想深处完全接受二者为真。当一个政权能够让所有人相信‘2+2=5’时，它就统治了整个客观实在。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（低级幼态化解构）：将冷酷的政治哲学寓言曲解为幼儿园识字卡；\n• 选项 C 诊断（无厘头荒谬错误）：彻底抹杀口号作为国家意识形态顶层设计的政治严肃性。\n\n【时代思潮与哲学脉络】\n新话（Newspeak）与维特根斯坦：‘语言的界限就是世界的界限’。奥威尔表明，如果通过消灭词汇和逻辑，让人类根本说不出‘暴政’这个词，那么叛乱在生理上就变成‘不可被思想的’（Unthinkable）。",
        klausurSatzDE:
          "Through the jarring oxymoronic syntax of the three Party slogans, Orwell crystallizes the totalitarian phenomenon of 'Doublethink': By systematically obliterating the law of non-contradiction, the regime amputates the cognitive apparatus of the individual, replacing rational verification with uncritical ideological orthodoxies.",
        klausurSatzZH:
          "通过党的三大口号中那刺耳激烈的语义矛盾反讽句法，奥威尔高度凝练了极权主义‘双重思想’的病理本质：通过系统性肢解形式逻辑中的‘矛盾律’，统治体制切除了个体的认知思考中枢，以盲目驯从的意识形态正统彻底取代了理性的实证求真。",
        ehzKeyPointsDE: [
          "Linguistic analysis of the slogans (oxymoron, paradox, antithesis).",
          "Systematic definition of Doublethink (epistemological control and destruction of logical coherence).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Oxymoronic Rhetoric 4P)：精准指出反义词悖论句法所制造的剧烈语义冲突与权威压迫。",
          "采分点 2 (Doublethink Definition 4P)：深刻阐发‘双重思想’如何通过摧毁人类思维中的矛盾律，达成终极思想殖民。",
        ],
      },
      {
        id: "q-orwell-3",
        dimension: "handlung",
        afb: "AFB II",
        titleDE: "Decay of the Physical World vs. Party Propaganda",
        titleZH: "物质废墟的破败写实与虚伪政治狂热的反差 (AFB II: Einordnen)",
        questionDE:
          "How does the olfactory and sensory imagery of urban decay ('smelt of boiled cabbage and old rag mats', gritty dust, broken lift) contrast with the triumphant claims of Party ideology?",
        questionZH:
          "文本中充斥的‘煮烂卷心菜与旧抹布的恶臭’、呛人的粗砂尘土以及常年损坏的电梯等感官嗅觉描写，如何与党宣传机器中吹嘘的‘生产大捷与伟大胜利’构成强烈的反讽撕裂？",
        options: [
          {
            id: "a",
            textDE:
              "The visceral sensory depiction of poverty, physical filth, and systemic scarcity exposes the grotesque chasm between Party myth (glorious industrial quotas, 'Victory Mansions') and the grim reality of squalor; by grounding the reader in repulsive bodily experiences, Orwell demonstrates that totalitarian regimes thrive on perpetual material deprivation to keep the populace exhausted, demoralized, and powerless to organize dissent.",
            textZH:
              "对赤贫、脏乱与普遍物资匮乏的直观感官刻画，尖锐揭露了党意识形态神话（虚构的高昂生铁生产指标、虚伪的‘胜利大厦’）与民众凄惨生活现实之间的巨大鸿沟；通过将读者沉浸在令人作呕的肉体生存体验中，奥威尔深刻揭示了极权统治的生存法则：刻意制造长期的物质匮乏与身体疲惫，以彻底消磨大众的尊严与精力，使之无力组织任何政治反抗。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "London had just won an international prize for the most luxurious organic food city, and the smell of boiled cabbage was a delicacy enjoyed only by billionaires.",
            textZH:
              "大洋国伦敦刚刚荣获了全欧洲最奢华有机美食之都大奖，煮烂卷心菜的气味是顶级富豪才能享用的米其林三星名菜。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Winston was an amateur plumber who purposely broke the apartment's elevator so that he could get paid overtime to repair it on Monday morning.",
            textZH:
              "温斯顿业余兼职水管工，是他为了在周一早晨赚取加班修理费而故意把整栋公寓楼的电梯线路切断搞坏的。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Squalor as tool of domination: Totalitarianism does not build paradise; it rations razor blades and gin to monopolize the individual's mental bandwidth.",
        explanationZH:
          "【正解依据与文本锚点】\n反乌托邦与破败现实主义（Dystopian Squalor vs. Utopian Propaganda）：\n1. 感官反讽：大厦叫‘胜利大厦’，但走进去是‘boiled cabbage and old rag mats’（煮烂卷心菜与烂抹布味）；电梯坏了，白天断电；风沙割脸，满嘴沙子；电幕里吹嘘生铁产量翻倍，老百姓却连一把刮胡刀片都买不到；\n2. 政治经济学控制：奥威尔在第三部明确阐释了寡头集权主义的理论：如果社会物资极大丰富，大众摆脱了饥饿与劳碌，就会有闲暇读书与思考，从而发现特权阶层的多余；因此，极权统治必须通过无休止的战争和人为的短缺，让所有人每天为了找肥皂、买鞋带而筋疲力尽，从而丧失一切精神反叛的能量。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（荒谬颠倒）：将极权贫困与营养不良美化为奢华有机美食；\n• 选项 C 诊断（降维破坏）：将社会层面的体制崩溃降格为个人维修恶作剧。\n\n【时代思潮与哲学脉络】\n反思二战战后紧缩（Austerity Britain）：奥威尔以1948年战后伦敦凭票供应、煤炭短缺与废墟瓦砾为蓝本，提炼出超越时代的政治寓言。",
        klausurSatzDE:
          "The repulsive olfactory and sensory imagery of dilapidated squalor punctures the triumphalist veneer of Party rhetoric: Physical deprivation is unmasked not as an accidental administrative failure, but as a deliberate political weapon designed to exhaust the human spirit and maintain absolute subservience.",
        klausurSatzZH:
          "破败居住环境那令人作呕的嗅觉与感官意象，刺穿了党意识形态狂热宣传的虚伪外衣：物质的普遍匮乏被无可辩驳地揭露为一种精心设计的政治操控武器，其唯一目的就是耗尽人类的心力与精神尊严，维系绝对的极权顺从。",
        ehzKeyPointsDE: [
          "Analysis of sensory details (smell of cabbage, broken lift, gritty dust).",
          "Explanation of the contrast between sensory reality and totalitarian propaganda (Victory Mansions, pig-iron quotas).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Sensory Realism 4P)：精准提取煮烂卷心菜气味、损坏电梯等感官细节并剖析其美学功能。",
          "采分点 2 (Ideology vs. Reality 4P)：深刻阐发物质匮乏如何作为极权政治技术，系统性剥夺个体的反思能力。",
        ],
      },
      {
        id: "q-orwell-4",
        dimension: "theorie",
        afb: "AFB III",
        titleDE: "Contemporary Relevance: Algorithmic Surveillance & Fake News",
        titleZH: "当代数字时代终审裁决：算法监控与后真相社会 (AFB III: Evaluate & Assess)",
        questionDE:
          "To what extent can Orwell's 1949 vision of 'Nineteen Eighty-Four' be assessed as a chillingly accurate prophecy of 21st-century digital surveillance capitalism, algorithmic tracking, and 'post-truth' politics?",
        questionZH:
          "在21世纪跨国科技平台全方位数据追踪、棱镜计划监控、智能手机‘全天候数字电幕’以及‘后真相（Post-Truth）’虚假信息泛滥的数字时代，我们应如何辩证高度评估奥威尔《一九八四》的先知性穿透力与现代异变？",
        options: [
          {
            id: "a",
            textDE:
              "In a dialectical assessment, Orwell's vision proves extraordinarily prescient regarding ubiquitous electronic tracking (smartphones as pocket telescreens), the erosion of historical facts (deepfakes, revisionist disinformation), and language truncation; however, unlike Orwell's brutal state-coerced terror, modern surveillance operates primarily through seductive digital convenience and participatory surveillance capitalism (Zuboff), where citizens voluntarily surrender their autonomy in exchange for algorithms and consumer goods.",
            textZH:
              "在辩证的现代审视中，奥威尔展现出令人不寒而栗的超前先知力量：智能手机与智能音箱已成为人人随身携带的‘口袋电幕’，数据寡头实时记录每一个点击，而人工智能深伪与‘后真相’政治更是将奥威尔‘谁控制过去就控制未来’的真理部操作推向极致；然而两者的深层机制发生了剧烈变异：现代数字监控不再主要依靠残酷的国家警察暴力强迫，而是通过极具诱惑力的数字便利性、消费主义与祖博夫所揭示的‘监控资本主义’（Surveillance Capitalism）进行柔性操纵——大众是在自愿甚至欢欣鼓舞中，交出了自己的隐私、注意力与灵魂主体性。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Orwell was proven completely wrong because the year 1984 already passed four decades ago and nothing bad has ever happened in the history of computer technology since then.",
            textZH:
              "奥威尔的预言被历史证明是彻头彻尾的笑话，因为1984年早就过去四十多年了，自那以后计算机行业的发展全都是百分之百的慈善与道德圣洁，不存在任何安全或隐私隐患。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Orwell's book has zero relevance today because modern humans have completely stopped speaking languages and now communicate exclusively through medieval smoke signals.",
            textZH:
              "这部作品在今天已经毫无阅读价值，因为现代人类早已彻底废弃了所有人类语言，现代社会的几十亿网民现在每天只通过中世纪烽火狼烟进行信息交流。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Huxley vs. Orwell synthesis: In 1984, people are controlled by inflicting pain; in Brave New World, they are controlled by inflicting pleasure. The 21st century combines both.",
        explanationZH:
          "【正解依据与文本锚点】\n北威州高中英语会考（Abitur Klausur / Comment）最高阶评分标准（15 NP）：辩证分析当代性（Dialectical Assessment of Modern Surveillance）：\n1. 惊人印证（Thesis / Orwell's Prophecy Fulfilled）：\n   - 斯诺登披露的‘棱镜计划’证明国家情报网络对全球通信的无死角拦截；\n   - 智能手机的麦克风、摄像头与定位芯片，比奥威尔房间墙上的电幕还要贴身百倍；\n   - 政治选战中的算法微靶向投放（Microtargeting）与定向洗脑，完美复刻了真理部的‘现实控制’（Reality Control）；\n2. 机制质变（Antithesis / Structural Difference: Orwell vs. Zuboff & Huxley）：\n   - 奥威尔描绘的是‘硬极权’（Coercive Terror）：用肉体酷刑和饥饿逼你就范；\n   - 21世纪现实演变是‘软监控资本主义’（Surveillance Capitalism）：大众出于对算法推荐、即时聊天、点外卖和刷短视频的依赖，主动把最私密的面部数据、睡眠习惯、人际关系拱手送给科技巨头；\n3. 终审裁决（Synthesis）：\n   奥威尔与赫胥黎（《美丽新世界》）在21世纪达成了可怕的合流：人们既在奥威尔式的算法监控与后真相谣言中被规训，又在赫胥黎式的快餐娱乐与多巴胺茧房中自我麻醉。",
        klausurSatzDE:
          "In dialectical evaluation, Orwell's dystopian masterpiece retains unmatched diagnostic power in the age of Big Data and algorithmic tracking: While modern surveillance capitalism operates through voluntary seduction rather than totalitarian terror, the systematic erosion of privacy, historical truth, and linguistic depth vindicates Orwell's warning that democracy erodes whenever power monopolizes the architecture of reality.",
        klausurSatzZH:
          "在辩证的时代审视下，奥威尔的反乌托邦巨著在大数据与算法追踪时代依然保持着无可匹敌的诊断穿透力：尽管现代监控资本主义是通过柔性诱惑而非国家恐怖来施展控制，但隐私、历史真相以及语言深度的系统性侵蚀，彻底印证了奥威尔永恒的警示：一旦权力垄断了现实与真理的建构机制，民主大厦便将无可挽回地走向崩塌。",
        ehzKeyPointsDE: [
          "Dialectical comparison between Orwell's coercive vision and modern digital surveillance capitalism (Zuboff).",
          "Integration of contemporary phenomena: Post-truth, fake news, algorithmic bubble, data privacy.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Dialectical Comparison 4P)：深刻辨析奥威尔式‘硬性国家恐怖’与现代‘柔性监控资本主义’诱导机制的同异。",
          "采分点 2 (Post-Truth & Algorithms 4P)：精准切入智能手机口袋电幕、后真相假新闻与现实控制等当代议题，展现 15 NP 高阶学术视野。",
        ],
      },
    ],
  },

  // =========================================================================
  // 18. ENGLISCH: Arthur Miller — Death of a Salesman (现代美国戏剧与美国梦幻灭)
  // =========================================================================
  {
    id: "miller-salesman",
    fach: "Englisch",
    genre: "Drama",
    author: "Arthur Miller",
    workTitleDE: "Death of a Salesman",
    workTitleZH: "《推销员之死》",
    sceneTitleDE: "Requiem // At Willy's Grave: He had the wrong dreams",
    sceneTitleZH: "落幕挽歌幕：他做错了梦 (商品拜物教、消费主义与美国梦的幻灭)",
    versesRange: "Requiem (Final Scene at the Cemetery)",
    epochDE: "Modern American Drama / Social Realism (1949)",
    epochZH: "现代美国戏剧 / 社会现实主义与心理表现主义 (1949)",
    contextDE:
      "At Willy Loman's poorly attended grave, his family and neighbour Charley reflect on the deceased salesman's life. While his son Biff recognizes the tragic self-delusion of Willy's career, Charley delivers a famous eulogy defining the precarious, dream-driven existence of the salesman in modern capitalism.",
    contextZH:
      "在威利·洛曼那门庭冷落、凄凉无比的墓碑前，他的遗孀琳达、两个儿子比夫、哈皮以及邻居查利，对这位刚刚自杀身亡的普通推销员的一生展开了最后的审视。长子比夫痛心疾首地揭穿了父亲毕生虚妄自欺的美国梦幻象，而查利则发表了戏剧史上著名的悼词，道尽了资本主义商业丛林中推销员随波逐流、靠幻想勉强维生的悲剧命运。",
    verses: [
      {
        lineNum: 1,
        textDE: "CHARLEY: Nobody dast blame this man.",
        translationZH: "查利：谁也别想埋怨这个人。",
        toneCategory: "autoritaet",
      },
      {
        lineNum: 2,
        textDE: "BIFF: Why, Charley? The man didn't know who he was.",
        translationZH: "比夫：为什么，查利？这个人一辈子根本不知道他是谁！",
        toneCategory: "krise",
        vocab: {
          word: "didn't know who he was",
          meaningDE: "Tragischer Identitätsverlust: Willy verleugnete seine wahre handwerkliche Natur für den Konsumtraum.",
          meaningZH: "悲剧性身份迷失：威利本是一个热爱木工与泥土的动手者，却在消费主义大潮中被洗脑，毕生追逐虚伪体面的推销神话。",
        },
      },
      {
        lineNum: 3,
        textDE: "CHARLEY: Nobody dast blame this man. You don't understand: Willy was a salesman.",
        translationZH: "查利：谁也别想埋怨这个人。你们根本不懂：威利是个推销员。",
        toneCategory: "moral",
      },
      {
        lineNum: 4,
        textDE: "And for a salesman, there is no rock bottom to the life.",
        translationZH: "对于一个推销员来说，生活是永远踩不到坚硬基石的。",
        toneCategory: "existenz",
        stilmittel: {
          type: "Metaphor of Insecurity",
          descDE: "'No rock bottom' captures the absolute economic and psychological precarity of the salesman.",
          descZH: "无底深渊隐喻：形象揭示了推销员在残酷雇佣市场中毫无制度保障、随时坠入深渊的极端朝不保夕感。",
        },
      },
      {
        lineNum: 5,
        textDE: "He don't put a bolt to a nut, he don't tell you the law or give you medicine.",
        translationZH: "他不像技工那样把螺丝拧在螺母上，他既不能给别人定法律，也不能给病人开药方。",
        toneCategory: "existenz",
        stilmittel: {
          type: "Parallelismus der Nicht-Produktivität",
          descDE: "Charley highlights that the salesman produces no tangible physical or institutional goods.",
          descZH: "非实体生产力排比：点明推销员既不创造实在的物理产品，也不拥有专业特权，其整个生存完全悬浮在人际交易的空中楼阁之上。",
        },
      },
      {
        lineNum: 6,
        textDE: "He's a man way out there in the blue, riding on a smile and a shoeshine.",
        translationZH: "他是一个漂浮在虚无蓝天中的人，单凭着一脸微笑和一双锃亮的皮鞋在那里勉强驰骋打拼。",
        toneCategory: "spott",
        vocab: {
          word: "smile and a shoeshine",
          meaningDE: "Reine Oberflächenexistenz: Der Verkäufer verkauft nicht Waren, sondern seine eigene Persönlichkeit als Ware.",
          meaningZH: "微笑与锃亮皮鞋：推销员不是在卖商品，而是把自己的灵魂、尊严与整个人格包装成商品出售。",
        },
      },
      {
        lineNum: 7,
        textDE: "And when they start not smiling back—that's an earthquake.",
        translationZH: "而当客户们开始不再对他以微笑回报时——那便是一场地动山摇的毁灭地震！",
        toneCategory: "krise",
        stilmittel: {
          type: "Metapher des Erdbebens",
          descDE: "Loss of superficial popularity threatens the salesman's entire existential foundation.",
          descZH: "地震隐喻：虚饰的商业人际温情一旦破灭，推销员建立在他人认可之上的整个脆弱存在大厦便瞬息坍塌。",
        },
      },
      {
        lineNum: 8,
        textDE: "And then you get yourself a couple of spots on your hat, and you're finished.",
        translationZH: "接着只要你的帽子上沾上了几点污渍，你的整个人生就算彻底完蛋了。",
        toneCategory: "krise",
      },
      {
        lineNum: 9,
        textDE: "Nobody dast blame this man. A salesman is got to dream, boy. It comes with the territory.",
        translationZH: "谁也别想埋怨这个人。推销员必须去做梦，孩子。那是这个行当注定躲不开的宿命！",
        toneCategory: "moral",
        vocab: {
          word: "comes with the territory",
          meaningDE: "Struktureller Zwang: Das kapitalistische System zwingt den Verkäufer zur ständigen Selbstillusionierung.",
          meaningZH: "行当宿命/制度性强迫：资本主义神话强迫推销员必须每天向自己灌输虚假幻想，否则根本无法直面冷酷的现实。",
        },
      },
      {
        lineNum: 10,
        textDE: "BIFF: Charley, the man didn't know who he was.",
        translationZH: "比夫：查利，这个人一辈子根本不知道他是谁！",
        toneCategory: "krise",
      },
      {
        lineNum: 11,
        textDE: "HAPPY (deeply agitated): Don't say that!",
        translationZH: "哈皮（情绪激动地大叫）：别这么说！",
        toneCategory: "krise",
      },
      {
        lineNum: 12,
        textDE: "BIFF: Why don't you come with me, Happy?",
        translationZH: "比夫：你为什么不跟我一块儿去西部呢，哈皮？",
        toneCategory: "sehnsucht",
      },
      {
        lineNum: 13,
        textDE: "HAPPY: I'm not licked that easily. I'm staying right in this city, and I'm gonna beat this racket!",
        translationZH: "哈皮：我才不会那么轻易认输。我就要留在这座大城市里，我一定要把这个坑人的竞争行当给踩在脚下！",
        toneCategory: "streben",
        stilmittel: {
          type: "Tragic Repetition / Cycle of Delusion",
          descDE: "Happy inherits Willy's toxic ambition, perpetuating the catastrophic cycle of the corrupted dream.",
          descZH: "悲剧循环复现：次子哈皮盲目继承了父亲被污染的毒性野心，预示着美国梦幻灭悲剧在下一代身上的重新轮回。",
        },
      },
      {
        lineNum: 14,
        textDE: "He had a good dream. It's the only dream you can have—to come out number-one man.",
        translationZH: "他的梦想是个好梦。那是你唯一值得去拥有的梦——那就是成为万众瞩目的头号成功人士！",
        toneCategory: "streben",
      },
      {
        lineNum: 15,
        textDE: "He fought it out here, and this is where I'm gonna win it for him.",
        translationZH: "他是在这片土地上战斗到底的，我也要在这里替他把这一仗彻底赢下来！",
        toneCategory: "streben",
      },
      {
        lineNum: 16,
        textDE: "LINDA: Forgive me, dear. I can't cry. I made the last payment on the house today... there'll be nobody home. We're free and clear.",
        translationZH: "琳达：原谅我，亲爱的。我哭不出来。我今天刚刚把房子的最后一笔按揭分期给还清了……可是家里再也没有人了。我们终于无债一身轻了，我们自由了。",
        toneCategory: "krise",
        stilmittel: {
          type: "Crushing Dramatic Irony",
          descDE: "Paying off the mortgage exactly when the breadwinner is dead exposes the cruelty of capitalism.",
          descZH: "毁灭性戏剧反讽：在供养者自杀暴毙的这一天，全家终于还清了三十年房屋贷款；获得了冰冷的财产‘自由’，却失去了活生生的生命与爱。",
        },
      },
    ],
    questions: [
      {
        id: "q-salesman-1",
        dimension: "wortschatz",
        afb: "AFB I",
        titleDE: "Charley's Eulogy: The Anatomy of a Salesman",
        titleZH: "查利的悼词：现代推销员的生存解剖 (AFB I: Outline & Characterize)",
        questionDE:
          "How does Charley characterize the existential condition of the salesman in modern capitalism in his famous eulogy (lines 3–9)?",
        questionZH:
          "邻居查利在他著名的墓前悼词中（第3–9句），如何精准剖析了现代资本主义商业体系中‘推销员’这一职业的生存宿命与悲剧本质？",
        options: [
          {
            id: "a",
            textDE:
              "Charley defines the salesman not as a producer of physical goods, but as someone who must sell his own personality ('riding on a smile and a shoeshine'); because his existence relies entirely on the fleeting, unstable goodwill of others, he has 'no rock bottom' and is structurally forced to sustain himself through perpetual illusions ('a salesman is got to dream').",
            textZH:
              "查利指出推销员不从事任何实体物资生产，其本质是将自身的整个人格与尊严当作商品出售（‘单凭一脸微笑和一双锃亮皮鞋打拼’）；因为其生存完全寄托在他人瞬息万变的虚假好感之上，他在制度上‘脚下永远踩不到基石’，处于极端脆弱之中，因而被迫只能依靠无休止的自我幻想（‘推销员必须去做梦’）来维持残存的生存勇气。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Charley explains that Willy was a champion horse racer who spent his entire life competing in the Olympic equestrian games in Paris.",
            textZH:
              "查利解释说威利其实是一位奥运马术金牌骑手，他这一辈子所有的精力都在巴黎奥运会上参加盛装舞步赛马比赛。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Charley accuses Willy of being a billionaire bank robber who buried five million dollars in gold bars under the cemetery grass.",
            textZH:
              "查利愤怒控诉威利是一个盗窃银行的亿万巨贪，他在自杀前把搜刮来的五百万美元金条偷偷埋在了墓地草坪下面。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Alienation in sales: The salesman does not produce tangible objects; he commodifies his own smile. When the market rejects his smile, his self-worth instantly evaporates.",
        explanationZH:
          "【正解依据与文本锚点】\n资本主义商品拜物教与人格异化（Commodification of the Self）：\n1. 悬浮的生存（'way out there in the blue'）：技工制造螺丝，律师拥有法条，医生拥有医药，唯独推销员手里空无一物。他不仅推销商品，更在推销自己的人格魅力（‘well-liked’）；\n2. 脆弱的基石（'no rock bottom'）：由于缺乏实体生产力支撑，其社会地位完全取决于买家的情绪波动。一旦买家不再回以微笑，推销员面临的不仅是丢单，而是整个存在自我价值的彻底崩塌（‘that's an earthquake’）；\n3. 结构性做梦（'got to dream, it comes with the territory'）：查利深刻地指出，威利的浮夸吹牛绝非个体的道德缺陷，而是资本主义销售制度强加给每一个从业者的精神兴奋剂。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（无厘头荒谬错误）：将社会现实主义悲剧歪曲为骑马运动；\n• 选项 C 诊断（颠倒事实）：威利一生穷困潦倒，最后甚至要向查利每周借50美元来谎称是自己赚的提成，绝非富豪巨贪。\n\n【时代思潮与哲学脉络】\n从‘生产型资本主义’向‘消费型人格资本主义’的转型：社会学家大卫·里斯曼在《孤独的狂欢》（The Lonely Crowd）中指出，现代人从‘内向型’转变为‘他人导向型’（other-directed），威利·洛曼正是这一时代病症最深刻的文学显影。",
        klausurSatzDE:
          "Through Charley's poignant funeral oration, Miller delivers a scathing critique of consumer capitalism: The salesman is exposed as a tragically commodified being whose ontological security rests entirely on the marketability of his personality, compelling him into compulsory illusions to endure his systemic precarity.",
        klausurSatzZH:
          "通过查利悲怆的墓前悼词，米勒对消费资本主义展开了雷霆万钧的深刻批判：推销员被血淋淋地揭露为一个被彻底商品化的人格躯壳，其本体论意义上的安全感完全悬挂在自身个性迎合市场的可销售性之上，从而在制度上强迫其陷入永恒的虚妄自欺以苟延残喘。",
        ehzKeyPointsDE: [
          "Analysis of Charley's core metaphors: 'no rock bottom', 'smile and a shoeshine', 'comes with the territory'.",
          "Thematic discussion of the commodification of personality and systemic economic precarity.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Metaphorical Deconstruction 4P)：精准拆解‘无底深渊’、‘微笑与锃亮皮鞋’等核心隐喻对推销员人格商品化的解剖功能。",
          "采分点 2 (Systemic Critique 4P)：深刻阐发资本主义雇佣劳动如何结构性逼迫个体走向自我欺骗（Compulsory Delusion）。",
        ],
      },
      {
        id: "q-salesman-2",
        dimension: "figuren",
        afb: "AFB II",
        titleDE: "Biff vs. Happy: Anagnorisis vs. Perpetual Blindness",
        titleZH: "比夫的清醒觉悟 vs. 哈皮的执迷不悟 (AFB II: Analysieren)",
        questionDE:
          "In what ways do Biff's recognition ('the man didn't know who he was') and Happy's reaction (lines 13–15) present two contrasting responses to the collapse of the American Dream?",
        questionZH:
          "长子比夫的痛苦觉悟（‘这个人一辈子根本不知道他是谁’）与次子哈皮的狂躁反应（第13–15句），如何构成了面对美国梦幻灭时两种截然对立的人物心理与悲剧走向？",
        options: [
          {
            id: "a",
            textDE:
              "Biff achieves tragic enlightenment (Anagnorisis): By shedding Willy's false pretensions and embracing manual labour, he reclaims his authentic identity outside the rat race; conversely, Happy remains stubbornly blind (Hamartia), inheriting Willy's toxic delusion of becoming 'number-one man' and thereby ensuring that the cycle of capitalist exploitation and spiritual bankruptcy will devour the next generation.",
            textZH:
              "比夫达成了古典戏剧意义上的‘悲剧顿悟’（Anagnorisis）：通过坚决撕碎父亲虚伪体面的成功学面具并毅然拥抱纯朴的双手体力劳动，他在残酷的名利场竞争（Rat Race）之外重获了真实的自我认同；相反，次子哈皮则顽固地陷入悲剧性盲目（Hamartia），死死继承了威利‘出人头地做头号大人物’的毒性野心执念，从而注定了资本主义异化掠夺与精神破产将在下一代人身上再次血腥重演。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Biff decides to become the President of the United States, while Happy opens a pizza restaurant with his mother in New Jersey.",
            textZH:
              "比夫当场决定去竞选美利坚合众国总统，而哈皮则决定带着母亲去新泽西开一家意式披萨连锁快餐店。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Both brothers agree that Willy was a brilliant saint whose financial wisdom should be taught at Harvard Business School.",
            textZH:
              "两兄弟在墓前完全达成了一致，认为父亲威利是一位圣人先知，他的理财成功学思想应该作为必修课写进哈佛商学院教材。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Anagnorisis vs. tragic repetition: Biff breaks free from the lie; Happy internalizes the lie and becomes Willy 2.0.",
        explanationZH:
          "【正解依据与文本锚点】\n人物两极分化与悲剧认同（Character Contrast & Anagnorisis）：\n1. 比夫的觉醒（Biff's Awakening）：比夫在波士顿发现父亲偷情后，心目中的神像早已崩塌。他在墓前发出最透彻的宣判：‘The man didn't know who he was’。威利一生最擅长做木工、修门廊，但在毒性成功学绑架下，他鄙视双手劳作，非要在大都市里装体面绅士。比夫看穿了这个谎言，选择奔向西部农场，完成了对虚伪美国梦的悲壮放逐；\n2. 哈皮的沉沦（Happy's Blindness）：哈皮不仅拒绝正视父亲惨死的真正教训，反而被激起了近乎偏执狂的报复心（‘I'm gonna beat this racket... to come out number-one man’）。哈皮成为了‘威利二世’，全盘接盘了消费主义拜金病毒，展示了意识形态代际传染的无尽恐怖。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（低级荒诞虚构）：脱离剧本根本走向；\n• 选项 C 诊断（颠倒是非）：比夫自始至终都在悲愤地控诉父亲的自我欺骗。",
        klausurSatzDE:
          "The antithetical confrontation between Biff and Happy at the graveside epitomizes the drama's philosophical verdict: While Biff attains painful emancipation by stripping away the falsehoods of competitive materialism, Happy's defiant pledge to become 'number-one man' perpetuates the tragic neurosis of the American Dream into an unredeemed future.",
        klausurSatzZH:
          "比夫与哈皮在墓碑前的对峙，凝结了整部戏剧的终极哲学判词：如果说比夫通过坚决剥离竞争性功利主义的虚伪迷思而赢得了痛苦却真实的灵魂解放，那么哈皮执迷不悟誓做‘头号成功人士’的誓言，则将美国梦的病态执念无可挽回地延续到了永无救赎的未来轮回之中。",
        ehzKeyPointsDE: [
          "Contrasting analysis of Biff's self-discovery (Anagnorisis) and Happy's denial.",
          "Significance of the ending: Cycle of toxic ambition vs. possibility of authentic existence.",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Biff's Anagnorisis 4P)：精准指出比夫对‘真实自我’（Authenticity）的找回与对虚妄成功学的决裂。",
          "采分点 2 (Happy's Tragic Cycle 4P)：深刻阐发哈皮对威利病态执念的接盘与悲剧代际复现的结构性必然性。",
        ],
      },
      {
        id: "q-salesman-3",
        dimension: "motiv",
        afb: "AFB II",
        titleDE: "Linda's Final Words & The Irony of 'Free and Clear'",
        titleZH: "琳达的终幕独白与‘还清房贷’的毁灭性戏剧反讽 (AFB II: Interpret)",
        questionDE:
          "What is the devastating dramatic irony embedded in Linda's final line: 'I made the last payment on the house today... We're free and clear' (line 16)?",
        questionZH:
          "剧终琳达跪在墓前吐出的最后一句话：‘我今天刚刚把房子的最后一笔按揭给还清了……我们终于无债一身轻了，我们自由了’（第16句），蕴含了何种令人心碎的毁灭性戏剧反讽（Dramatic Irony）？",
        options: [
          {
            id: "a",
            textDE:
              "The irony lies in the tragic timing: Willy spent his entire adult life sacrificing his mental health and dignity to pay off a thirty-year mortgage, only to commit suicide for the insurance money on the very day the house is finally owned, leaving Linda in an empty house with no one left to live in it; this bitter paradox exposes how capitalism reduces the sacred human ideal of 'freedom' to a cold property transaction stripped of life and love.",
            textZH:
              "其反讽在于极端残酷的时间错位：威利耗尽整整一生三十年的精神健康与人性尊严，受尽屈辱按揭供楼，最终为了骗取两万美元人寿保险赔偿金而自杀暴毙；就在他下葬的同一天，房屋产权终于彻底属于他们了，但房子里却空无一人！这一凄厉的悖论残酷证明，在资本主义逻辑中，神圣的人类‘自由’被异化为一笔冷冰冰的房地产抵押清偿，当房子终于属于他们时，生命与家庭却早已荡然无存。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "Linda was celebrating because she had planned to sell the house immediately to buy a luxury yacht and travel around the Bahamas.",
            textZH:
              "琳达在墓前感到无比狂喜，因为她早就蓄谋在还清房贷的当天把房子卖掉套现，买一艘豪华游艇去巴哈马群岛环球度假。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "The bank made a mathematical error and gave Linda the house for free because the bank manager was Willy's childhood best friend.",
            textZH:
              "商业银行在结算时把算术算错了，银行行长因为是威利儿时的发小，大笔一挥直接把整套别墅无偿白送给了琳达。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Alienation of the commodity: Willy gave his life so that an empty box of bricks belongs to his widow. The house is paid, but the human being is dead.",
        explanationZH:
          "【正解依据与文本锚点】\n现代戏剧史上的最强反讽终章（The Bitter Irony of 'Free and Clear'）：\n1. 荒谬的胜利：全剧开篇，威利每天抱怨买不起电冰箱零件、还不起汽车贷款、交不起房屋分期。三十年里，他如同一头拉磨的驴子；\n2. 自由的双关嘲弄（Ambiguity of 'Free'）：\n   - 经济层面：'Free and clear'是美国房产法律术语，指‘抵押权解除、全款无负债’；\n   - 存在层面：琳达喃喃自语‘We're free... there'll be nobody home’。自由到来了，但家破人亡；威利用自己碾碎的血肉肉身换取了一座冰冷的水泥砖头空壳；\n3. 消费主义骗局的终极控诉：商品（房子）终于获得了‘清白’，而活着的人却被资本主义流水线彻底榨干吃净，完成了一场彻头彻尾的现代浮士德式血腥交易。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（对悲剧遗孀的恶意污名化）：琳达一生深爱并守护威利，其哭不出来的悲伤是深入骨髓的麻木绝望；\n• 选项 C 诊断（违背常识童话化）：资本主义金融体系冷酷无情，绝无任何白送房产的温情奇迹。\n\n【时代思潮与哲学脉络】\n马克思‘拜物教’（Warenfetischismus）的高潮印证：人与人之间的温情纽带，被彻底物化为人与物（房子、保险金）的算术对价。",
        klausurSatzDE:
          "Linda's desolate lament 'we're free and clear' functions as the play's climactic dramatic irony: By synchronizing the financial liberation from the thirty-year mortgage with the physical annihilation of the breadwinner, Miller delivers a searing indictment of a socio-economic order where property ownership is purchased at the cost of human existence itself.",
        klausurSatzZH:
          "琳达凄凉绝望的哀叹‘我们无债一身轻了，我们自由了’构成了全剧最高潮的戏剧反讽：通过将三十年房屋贷款的金融清偿与家庭顶梁柱的肉身毁灭在时间上残酷并置，米勒向现代资本主义秩序投掷了最严厉的控诉：在这样的社会中，财产产权的获得，竟然必须以牺牲人的生命本身作为血淋淋的代价！",
        ehzKeyPointsDE: [
          "Identification of dramatic irony: Paying the last mortgage payment on the day of Willy's funeral.",
          "Semantic polysemy of 'free' (financial liberation vs. existential emptiness and bereavement).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Dramatic Irony 4P)：精准指出还清三十年房贷与威利自杀下葬同一天发生的残酷错位反讽。",
          "采分点 2 (Double Meaning of 'Free' 4P)：深刻阐明‘自由’（Free）一词从经济无负债向存在虚无绝望的语义质变。",
        ],
      },
      {
        id: "q-salesman-4",
        dimension: "theorie",
        afb: "AFB III",
        titleDE: "The Corrupted American Dream & Modern Tragedy",
        titleZH: "蜕变的美国梦与现代平民悲剧的终审评价 (AFB III: Evaluate & Contextualize)",
        questionDE:
          "Inwiefern lässt sich 'Death of a Salesman' im Lichte von Millers Aufsatz 'Tragedy and the Common Man' als Paradigma der modernen bürgerlichen Tragödie und als Abrechnung mit dem korrumpierten American Dream beurteilen?",
        questionZH:
          "结合阿瑟·米勒著名文论《悲剧与普通人》（*Tragedy and the Common Man*），我们应当如何全方位高度评价《推销员之死》作为现代平民悲剧的巅峰范式，以及其对‘蜕变扭曲的美国梦’所作出的终审历史清算？",
        options: [
          {
            id: "a",
            textDE:
              "Miller revolutionizes classical dramatic theory by asserting that the common man is as apt a subject for tragedy as kings: Willy Loman's tragic flaw (Hamartia) is not excessive pride in nobility, but his fanatical willingness to lay down his life to secure his sense of personal dignity and dignity for his sons; his destruction unmasks the 'American Dream' as a predatory social myth that conflates moral human worth with ruthless capitalist popularity and material wealth, destroying anyone who fails to be marketable.",
            textZH:
              "米勒革命性地颠覆了自古希腊亚里士多德以来‘只有帝王将相才配做悲剧主角’的古典成规，提出平民百姓同样具有崇高的悲剧性：威利·洛曼的悲剧致命缺陷（Hamartia）并非贵族的傲慢，而是他为了捍卫哪怕一丝一毫不可剥夺的人人格尊严并为儿子争一口气，不惜献出自己宝贵肉身生命的悲壮执念；他的毁灭将世人崇拜的‘美国梦’无情揭露为一场掠夺性的社会虚妄神话——这个神话粗暴地将人的道德灵魂价值等同于冷血的商业知名度与金钱财富，无情碾碎任何无法在市场上被顺利兜售变现的血肉之躯。",
            isCorrect: true,
          },
          {
            id: "b",
            textDE:
              "'Death of a Salesman' is an aggressive advertisement commissioned by American insurance conglomerates to prove that committing suicide is the safest way to guarantee family wealth.",
            textZH:
              "《推销员之死》是全美大型人寿保险集团联合出资赞助拍摄的商业广告片，目的是向全美推销员证明通过车祸自杀是为家庭快速积累财富的最稳妥投资理财渠道。",
            isCorrect: false,
          },
          {
            id: "c",
            textDE:
              "Miller wrote the play to show that everyone in America who fails in business is simply physically handicapped and should be sent to military prison.",
            textZH:
              "米勒创作这部戏剧是为了证明所有在商业竞争中落败的美国人全都是智力缺陷者，主张联邦政府把所有失业推销员全部押送进军事监狱强制服苦役。",
            isCorrect: false,
          },
        ],
        explanationDE:
          "Tragedy of the Common Man: Willy is heroic because he refuses to accept passivity. He dies fighting for his dignity against an economic system that treats men like garbage.",
        explanationZH:
          "【正解依据与文本锚点】\n北威州高中英语会考最高阶学术理论评价（Arthur Miller's Poetics & AFB III）：\n1. 现代平民悲剧范式（Tragedy and the Common Man，1949）：\n   米勒在《纽约时报》发表同名文论，向亚里士多德的《诗学》发起挑战。传统悲剧主角必须是俄狄浦斯、哈姆雷特等王公贵族；米勒断言：当一个普通推销员面对剥夺其人身尊严的社会力量，拼死发起困兽之斗、拒绝默默忍受屈辱之时，他的悲剧庄严性绝不亚于任何古代君王！威利的自杀是一场被扭曲的崇高牺牲——他用生命换取两万美元保险金，试图以此‘给儿子比夫铺就通往成功的最后道路’；\n2. 蜕变美国梦的清算（The Corrupted American Dream）：\n   美国梦最初的清教徒与杰斐逊内涵是‘自由、自治与自食其力的自尊’；但在20世纪垄断资本主义的侵蚀下，美国梦彻底蜕变为‘拜金神话与外表奉承’（Be liked and you will never want）。威利至死都在相信这个谎言，成为这个谎言最悲壮的殉葬品。\n\n【干扰项逐项诊断】\n• 选项 B 诊断（极端反人类荒诞解读）：将批判资本主义掠夺的剧作歪曲为人寿保险推销广告；\n• 选项 C 诊断（倒退法西斯论调）：与米勒作为左翼人道主义剧作家的初衷彻底背道而驰。\n\n【时代思潮与哲学脉络】\n从‘物化’到‘反抗’：威利生前最震撼的一句台词是：‘You can't eat the orange and throw the peel away—a man is not a piece of fruit!’（你不能吃了橘子肉就把皮扔掉——人不是水果！）。这是世界文学史上对现代劳工被当成一次性工具抛弃的最强呐喊。",
        klausurSatzDE:
          "In dialectical theoretical synthesis, 'Death of a Salesman' establishes the benchmark for modern tragedy: By transferring the classical hero's quest for dignity onto an ordinary commercial proletarian, Miller exposes the predatory core of the American Dream, proving that an unbridled capitalist ethos inevitaby reduces the sacred worth of the human soul to a disposable factor of economic production.",
        klausurSatzZH:
          "在辩证的理论综合审视中，《推销员之死》奠定了现代平民悲剧的不朽丰碑：通过将古典悲剧英雄对尊严的抗争转嫁到一个平民商业无产者身上，米勒彻底剥开了美国梦冷血掠夺的内核，雄辩证明了失去道德缰绳的资本主义功利伦理，势必将人类灵魂的神圣价值贬低为随时可以像垃圾一样抛弃的生产消耗品。",
        ehzKeyPointsDE: [
          "Integration of Miller's poetics ('Tragedy and the Common Man'): Dignity of the ordinary citizen.",
          "Dialectical evaluation of the corrupted American Dream vs. authentic human worth (man is not a fruit).",
        ],
        ehzKeyPointsZH: [
          "采分点 1 (Tragedy of the Common Man 4P)：精准阐释米勒平民悲剧理论中‘普通人对自身不可侵犯尊严的悲壮捍卫’。",
          "采分点 2 (The Corrupted Dream Critique 4P)：深刻批判将人格与灵魂等同于商品变现的资本主义神话（人不是吃完就扔的橘子皮）。",
        ],
      },
    ],
  },
];




