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
];

