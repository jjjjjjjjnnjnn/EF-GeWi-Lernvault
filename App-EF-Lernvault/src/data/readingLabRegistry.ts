// readingLabRegistry.ts — 文科学术原典精读与六维会考解剖工坊核心数据中心
// 专为北威州高中会考（Gymnasiale Oberstufe: EF / Q1 Klausur Aufgabentyp 1A / Textanalyse）设计
// 涵盖：德语文学 (Deutsch) · 哲学原典 (Philosophie) · 社会科学 (SoWi) · 英语文学与演讲 (Englisch)

export interface VerseOrLineItem {
  lineNum: number;
  textDE: string;
  translationZH: string;
  commentDE?: string;
  commentZH?: string;
  stilmittel?: { type: string; descDE: string; descZH: string };
  vocab?: { word: string; meaningDE: string; meaningZH: string };
  toneCategory?: "krise" | "spott" | "streben" | "autoritaet" | "moral" | "existenz";
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
];
