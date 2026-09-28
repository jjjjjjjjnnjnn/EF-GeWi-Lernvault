// Labor & Interaktive MINT/GeWi Simulationen Registry
// Getrennt von Labor.tsx für sauberes Vite Fast-Refresh (HMR).

export type LaborSimId =
  | "skate"
  | "pendulum"
  | "projectile"
  | "buoyancy"
  | "coulomb"
  | "spring"
  | "circuit"
  | "optics"
  | "gas"
  | "states-matter"
  | "under-pressure"
  | "diffusion"
  | "photoelectric"
  | "rutherford"
  | "hydrogen-atom"
  | "blackbody"
  | "molecule-shape"
  | "concentration"
  | "probability"
  | "membrane"
  | "neuron"
  | "vector"
  | "kinematik"
  | "schiefe-ebene"
  | "collision"
  | "lever"
  | "hooke"
  | "friction"
  | "titration"
  | "gleichgewicht"
  | "osmose"
  | "tangent"
  | "box"
  | "markt"
  | "gini"
  | "balance"
  | "wave"
  | "optics-lens"
  | "charges-fields"
  | "faraday"
  | "wave-string"
  | "orbit";

export interface SimEntry {
  id: LaborSimId;
  fach: "Physik" | "Chemie" | "Bio" | "Mathe" | "SoWi" | "Philosophie";
  titleDE: string;
  titleZH: string;
  descDE: string;
  descZH: string;
  formula: string;
  tags: string[];
}

export const SIMULATION_REGISTRY: SimEntry[] = [
  {
    id: "skate",
    fach: "Physik",
    titleDE: "Energie-Skaterpark (Labor)",
    titleZH: "能量滑板场与机械能守恒 (Labor)",
    descDE: "U-Bahn/Rampe, potentielle/kinetische/thermische Energie, Reibungsdämpfung und dynamisches Kreisdiagramm.",
    descZH: "U型半管与斜坡滑道、动能/重力势能/内能实时转化饼图与柱状图、摩擦阻尼与机械能守恒定律。",
    formula: "E_{\\text{ges}} = E_{\\text{pot}} + E_{\\text{kin}} + E_{\\text{therm}} = \\text{konst.}",
    tags: ["Mechanik", "Energie", "Skater", "Reibung", "Labor"],
  },
  {
    id: "pendulum",
    fach: "Physik",
    titleDE: "Pendel-Labor & Schwingungsdauer (Labor)",
    titleZH: "单摆实验室与重力周期 (Labor)",
    descDE: "Exakte nichtlineare Pendelgleichung, Fadenlänge L, Photogate-Zeitmessung und Massenunabhängigkeit.",
    descZH: "精确非线性摆动微分方程、摆长 L 调控、光电门周期计时器与单摆周期与质量无关性验证。",
    formula: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
    tags: ["Mechanik", "Pendel", "Gravitation", "Periode", "Labor"],
  },
  {
    id: "projectile",
    fach: "Physik",
    titleDE: "Wurfbewegung & Ballistik (Labor)",
    titleZH: "抛体运动与弹道射程 (Labor)",
    descDE: "Kanonenabschuss, Flugbahn-Trajektorie, Scheitelhöhe, Luftwiderstand und Zieltreffer-Simulation.",
    descZH: "大炮发射仰角调控、二次空气阻力模型、抛物线轨迹拟合、最大射高与地面靶标精准命中判定。",
    formula: "x(t) = v_0\\cos\\theta\\cdot t \\quad y(t) = h_0 + v_0\\sin\\theta\\cdot t - \\frac{1}{2}gt^2",
    tags: ["Mechanik", "Kinematik", "Ballistik", "Wurf", "Labor"],
  },
  {
    id: "buoyancy",
    fach: "Physik",
    titleDE: "Dichte & Auftrieb / Archimedes (Labor)",
    titleZH: "密度与阿基米德浮力定律 (Labor)",
    descDE: "Eintauchtiefe, verdrängtes Flüssigkeitsvolumen, Auftriebskraft F_A vs. Gewichtskraft F_G und Waagenmessung.",
    descZH: "物体浸入深度、排开液体体积实时测量、浮力 F_A 与重力 F_G 矢量对比、浮沉条件与底部秤重。",
    formula: "F_A = \\rho_{\\text{Fluid}} \\cdot V_{\\text{sub}} \\cdot g",
    tags: ["Mechanik", "Hydrostatik", "Dichte", "Auftrieb", "Archimedes", "Labor"],
  },
  {
    id: "coulomb",
    fach: "Physik",
    titleDE: "Coulomb-Gesetz & Elektrostatik (Labor)",
    titleZH: "库仑定律与静电力反平方律 (Labor)",
    descDE: "Zwei Punktladungen auf Lineal, anziehende/abstoßende Kräfte, Vektoren und Abstandsgesetz F ~ 1/r².",
    descZH: "刻度尺双点电荷移动、库仑力大小科学计数法显示、同号相斥异号相吸力矢量与 1/r² 反平方律。",
    formula: "F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}",
    tags: ["Elektrizität", "Coulomb", "Kraft", "Ladung", "Labor"],
  },
  {
    id: "spring",
    fach: "Physik",
    titleDE: "Masse-Feder-System & Schwingungslabor",
    titleZH: "弹簧振子与简谐振动实验室",
    descDE: "Harmonische Schwingung, Federkonstante D, Periodendauer T und Energieerhaltung (E_kin, E_spann).",
    descZH: "简谐振动、弹簧劲度系数 D、固有周期 T 与机械能守恒（动能与弹性势能转化）。",
    formula: "T = 2\\pi\\sqrt{\\frac{m}{D}}",
    tags: ["Mechanik", "Schwingung", "Energie", "Feder"],
  },
  {
    id: "circuit",
    fach: "Physik",
    titleDE: "Virtueller Stromkreis & Ohmsches Gesetz",
    titleZH: "直流电路与欧姆定律实验室",
    descDE: "Elektronenfluss-Animation, Spannung U, Widerstand R, Stromstärke I und Glühlampenleistung.",
    descZH: "真实电子流定向移动动画、电压 U、电阻 R、电流强度 I 与白炽灯发光功率。",
    formula: "I = \\frac{U}{R} \\quad P = U \\cdot I",
    tags: ["Elektrizität", "Strom", "Spannung", "Widerstand"],
  },
  {
    id: "optics",
    fach: "Physik",
    titleDE: "Brechungsgesetz von Snellius & Totalreflexion",
    titleZH: "几何光学折射与全反射实验室",
    descDE: "Laserstrahl an Grenzflächen, Brechungsindizes n₁/n₂, Einfallslot und Grenzwinkel der Totalreflexion.",
    descZH: "激光束介质界面折射反射光路、折射率 n₁/n₂、法线与全反射临界角。",
    formula: "n_1 \\sin\\alpha = n_2 \\sin\\beta",
    tags: ["Optik", "Licht", "Brechung", "Laser"],
  },
  {
    id: "kinematik",
    fach: "Physik",
    titleDE: "Kinematik-Labor & Bewegungsgesetze",
    titleZH: "匀变速运动与自由落体实验室",
    descDE: "Orts-, Geschwindigkeits- und Beschleunigungsdiagramme (s-t, v-t, a-t) für freies Fallen.",
    descZH: "位移-时间 s(t)、速度-时间 v(t) 与加速度-时间 a(t) 运动学规律与抛体曲线。",
    formula: "s(t) = \\frac{1}{2}at^2 + v_0 t",
    tags: ["Mechanik", "Kinematik", "Freier Fall", "Geschwindigkeit"],
  },
  {
    id: "schiefe-ebene",
    fach: "Physik",
    titleDE: "Schiefe Ebene & Kräftezerlegung",
    titleZH: "斜面力学分解与摩擦力实验室",
    descDE: "Kräftezerlegung am Hang: Hangabtriebskraft F_H, Normalkraft F_N und Haft-/Gleitreibungsgrenze.",
    descZH: "斜面受力分析：下滑分力 F_H、支持正压力 F_N 与静/动摩擦临界滑移条件。",
    formula: "F_{\\parallel} = mg\\sin\\alpha \\quad F_{\\perp} = mg\\cos\\alpha",
    tags: ["Mechanik", "Kräfte", "Reibung", "Hang", "Labor"],
  },
  {
    id: "collision",
    fach: "Physik",
    titleDE: "Stoß-Labor & Impulserhaltung (Labor)",
    titleZH: "二维弹性碰撞与动量守恒实验室",
    descDE: "Zwei Wagen auf Luftkissenbahn: Massen, Geschwindigkeiten, Impuls- und Energieerhaltung beim elastischen Stoß.",
    descZH: "气垫导轨双车碰撞：质量与初速调控、动量与动能守恒监视、质心系观察。",
    formula: "\\vec{p}_1 + \\vec{p}_2 = \\vec{p}'_1 + \\vec{p}'_2",
    tags: ["Mechanik", "Stoß", "Impuls", "Energie", "Labor"],
  },
  {
    id: "lever",
    fach: "Physik",
    titleDE: "Drehmoment & Hebel-Gleichgewicht (Labor)",
    titleZH: "杠杆力矩平衡实验室",
    descDE: "Massen und Hebelarme beidseits der Drehachse: Drehmomentbilanz ΣM = 0 und Gleichgewichtsanzeige.",
    descZH: "支点两侧砝码质量与力臂调控：力矩平衡 ΣM = 0 与横梁平衡指示。",
    formula: "\\sum M = \\sum (F_i \\cdot l_i) = 0",
    tags: ["Mechanik", "Drehmoment", "Hebel", "Gleichgewicht", "Labor"],
  },
  {
    id: "hooke",
    fach: "Physik",
    titleDE: "Hookesches Gesetz & Feder-Kombination (Labor)",
    titleZH: "胡克定律与弹簧串并联实验室",
    descDE: "Federsteifigkeit k, Kraft-Verlängerungs-Diagramm, Reihen- und Parallelschaltung von Federn.",
    descZH: "劲度系数 k、力-伸长直线图、弹簧串并联等效刚度与弹性势能。",
    formula: "F = -k \\cdot \\Delta x",
    tags: ["Mechanik", "Feder", "Elastizität", "Energie", "Labor"],
  },
  {
    id: "friction",
    fach: "Physik",
    titleDE: "Haft- & Gleitreibung (Labor)",
    titleZH: "静摩擦与动摩擦过渡实验室",
    descDE: "Angreifende Kraft vs. Haftreibungsgrenze, Übergang zur Gleitreibung und Dissipationswärme.",
    descZH: "拉力与最大静摩临界、滑动过渡突降、摩擦耗散热累积与 F_R-F 图。",
    formula: "F_R \\le \\mu_s N \\quad F_{Gleit} = \\mu_k N",
    tags: ["Mechanik", "Reibung", "Dissipation", "Labor"],
  },
  {
    id: "wave",
    fach: "Physik",
    titleDE: "Welleninterferenz & Doppelspalt (Labor)",
    titleZH: "波动干涉与杨氏双缝实验",
    descDE: "Zweiquellen-Interferenz, Wellenlänge λ, Spaltabstand d, Schirmabstand L und Intensitätsmuster.",
    descZH: "双点波源干涉场 60FPS 动态波前演化、波长 λ、双缝间距 d、干涉条纹间距与屏上光强分布曲线。",
    formula: "\\Delta y = \\frac{L \\cdot \\lambda}{d}",
    tags: ["Optik", "Wellen", "Interferenz", "Doppelspalt", "Labor"],
  },
  {
    id: "optics-lens",
    fach: "Physik",
    titleDE: "Dünne Linsen & Linsenabbildung (Labor)",
    titleZH: "凸透镜成像与三特殊光线实验室",
    descDE: "Brennweite f, Gegenstandsweite g, drei Hauptstrahlen, reelles/virtuelles Bild und Vergrößerung.",
    descZH: "焦距物距调控、三条特殊光线作图、实像虚像判定与放大率读数。",
    formula: "\\frac{1}{f} = \\frac{1}{g} + \\frac{1}{b}",
    tags: ["Optik", "Linse", "Abbildung", "Strahlen", "Labor"],
  },
  {
    id: "charges-fields",
    fach: "Physik",
    titleDE: "Ladungen & Feldlinien (Labor)",
    titleZH: "点电荷电场线与等势线实验室",
    descDE: "Punktladungen verschieben, Feldlinien-Tracing, Äquipotenziallinien und Sondenmessung von E und V.",
    descZH: "点电荷拖拽布场、电场线追踪、等势线与探针场强电势测量。",
    formula: "\\vec{E} = \\frac{\\vec{F}}{q}",
    tags: ["Elektrizität", "Feld", "Potenzial", "Labor"],
  },
  {
    id: "faraday",
    fach: "Physik",
    titleDE: "Elektromagnetische Induktion (Labor)",
    titleZH: "法拉第电磁感应实验室",
    descDE: "Magnet durch Spule, Flusskurve Φ(t), induzierte Spannung, Lampenhelligkeit und Lenz-Regel.",
    descZH: "磁铁穿线圈、磁通曲线、感应电动势极性大小、灯泡亮度与楞次定律。",
    formula: "\\mathcal{E} = -\\frac{d\\Phi}{dt}",
    tags: ["Elektromagnetismus", "Induktion", "Lenz", "Labor"],
  },
  {
    id: "wave-string",
    fach: "Physik",
    titleDE: "Seilwellen & Resonanz (Labor)",
    titleZH: "绳波传播与驻波谐振实验室",
    descDE: "Spannung T, Massenbelegung μ, Anregungsfrequenz f, festes/loses Ende und Resonanzbedingung.",
    descZH: "张力线密度频率调控、固定自由端反射、节点腹点标记与谐振判据。",
    formula: "v = \\sqrt{\\frac{T}{\\mu}} \\quad f_n = \\frac{nv}{2L}",
    tags: ["Wellen", "Resonanz", "Schwingung", "Labor"],
  },
  {
    id: "orbit",
    fach: "Physik",
    titleDE: "Gravitations- & Orbitallabor (Labor)",
    titleZH: "天体引力与开普勒轨道实验室 (Labor)",
    descDE: "Zentralgestirn, Umlaufbahnen, Keplersche Gesetze, Kreisbahn- und Fluchtgeschwindigkeit.",
    descZH: "开普勒三大行星运动定律、引力反平方场数值积分、初速度矢量调控、圆轨道与双曲线逃逸速度。",
    formula: "F = G\\frac{M \\cdot m}{r^2} \\quad v_k = \\sqrt{\\frac{GM}{r}}",
    tags: ["Astrophysik", "Gravitation", "Kepler", "Orbit", "Labor"],
  },
  {
    id: "titration",
    fach: "Chemie",
    titleDE: "pH-Skala & Säure-Base-Titration",
    titleZH: "酸碱溶液与 pH 滴定实验室",
    descDE: "Büretten-Titration, Indikatorfarben (Bromthymolblau, Phenolphthalein) und Äquivalenzpunkt.",
    descZH: "滴定管酸碱中和计量、指示剂变色梯级与化学计量等当点曲线。",
    formula: "\\text{pH} = -\\log_{10}[H_3O^+]",
    tags: ["Säure", "Base", "pH", "Titration", "Indikator"],
  },
  {
    id: "gleichgewicht",
    fach: "Chemie",
    titleDE: "Chemisches Gleichgewicht & Le Chatelier",
    titleZH: "化学平衡与勒夏特列原理实验室",
    descDE: "Druck- und Temperaturverschiebung, Gaskompressor und Reaktionsquotient Q vs. K_c.",
    descZH: "压力活塞加压、吸放热温度干扰与勒夏特列分子碰撞动态平衡转移。",
    formula: "K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}",
    tags: ["Gleichgewicht", "Thermodynamik", "Le Chatelier", "Kinetik"],
  },
  {
    id: "gas",
    fach: "Chemie",
    titleDE: "Ideales Gasgesetz & Teilchenbewegung (Labor)",
    titleZH: "理想气体状态方程与分子热运动实验室",
    descDE: "Movable Piston, manometrischer Druck p, absolute Temperatur T (Kelvin) und Boyle-Mariotte.",
    descZH: "活塞容积压缩、压力表测压、开尔文温度与波义耳-马略特气体定律。",
    formula: "p \\cdot V = n \\cdot R \\cdot T",
    tags: ["Thermodynamik", "Gase", "Druck", "Temperatur", "Labor"],
  },
  {
    id: "states-matter",
    fach: "Chemie",
    titleDE: "Aggregatzustände & Phasenübergang (Labor)",
    titleZH: "物质三态与熔沸相变实验室",
    descDE: "Teilchenmodell fest/flüssig/gasförmig, Schmelz- und Siedepunkt, latente Wärme und Heizkurve.",
    descZH: "三态粒子模型、熔沸点平台、潜热与加热冷却曲线。",
    formula: "Q = m \\cdot c \\cdot \\Delta T \\quad Q = m \\cdot L",
    tags: ["Thermodynamik", "Phasen", "Teilchen", "Labor"],
  },
  {
    id: "under-pressure",
    fach: "Physik",
    titleDE: "Hydrostatischer Druck & U-Rohr (Labor)",
    titleZH: "液体内部压强与连通器实验室",
    descDE: "Tiefensonde, Flüssigkeitsdichte, U-Rohr-Vergleich und Druck-Tiefe-Kennlinie p(h).",
    descZH: "深度探针拖拽、液体密度选择、U 型管对比与压强深度直线图。",
    formula: "p(h) = p_0 + \\rho g h",
    tags: ["Hydrostatik", "Druck", "Labor"],
  },
  {
    id: "diffusion",
    fach: "Chemie",
    titleDE: "Teilchendiffusion & Fick-Gesetz (Labor)",
    titleZH: "粒子扩散与浓度平衡实验室",
    descDE: "Konzentrationsgradient, Teilchenmasse, Temperatur und Konzentrations-Zeit-Kurve bis zum Gleichgewicht.",
    descZH: "浓度梯度、分子质量、温度影响与浓度时间平衡曲线。",
    formula: "J \\propto -\\Delta c",
    tags: ["Teilchen", "Diffusion", "Gleichgewicht", "Labor"],
  },
  {
    id: "photoelectric",
    fach: "Physik",
    titleDE: "Photoeffekt & Gegenfeldmethode (Labor)",
    titleZH: "光电效应与截止电压实验室",
    descDE: "Lichtfrequenz, Kathodenmaterial, Grenzfrequenz, Gegenspannung und Kennlinie des Photostroms.",
    descZH: "光频率强度、阴极材料、极限频率、截止电压与光电流特性曲线。",
    formula: "E_{\\text{kin,max}} = h\\nu - W_A",
    tags: ["Quanten", "Photon", "Labor"],
  },
  {
    id: "rutherford",
    fach: "Physik",
    titleDE: "Rutherford-Streuung & Kernmodell (Labor)",
    titleZH: "卢瑟福散射与核式结构实验室",
    descDE: "Alpha-Teilchen, Stoßparameter, Coulomb-Abstoßung, Streuwinkel und Folgerung zum Kernmodell.",
    descZH: "α 粒子瞄准距离能量、库仑排斥轨道、散射角与核式结构结论。",
    formula: "\\theta = 2\\arctan\\frac{K}{2Eb}",
    tags: ["Atom", "Kern", "Streuung", "Labor"],
  },
  {
    id: "hydrogen-atom",
    fach: "Physik",
    titleDE: "Bohr-Wasserstoffatom & Spektrallinien (Labor)",
    titleZH: "玻尔氢原子能级跃迁实验室",
    descDE: "Energieniveaus, Übergänge, Photonenenergie, Balmer-Serie und Absorptions-/Emissionsspektren.",
    descZH: "能级阶梯、跃迁选线、光子能量波长、巴尔末系与吸收发射光谱。",
    formula: "\\Delta E = h\\nu = E_n - E_m",
    tags: ["Atom", "Quanten", "Spektrum", "Labor"],
  },
  {
    id: "blackbody",
    fach: "Physik",
    titleDE: "Schwarzkörperstrahlung & Planck-Kurve (Labor)",
    titleZH: "黑体辐射谱与维恩位移实验室",
    descDE: "Temperatur, Planck-Kurve, Wiensches Verschiebungsgesetz und Stefan-Boltzmann-Leistung.",
    descZH: "温度调控、普朗克曲线、维恩位移峰值与辐射总功率。",
    formula: "\\lambda_{\\max}T = b",
    tags: ["Quanten", "Strahlung", "Thermodynamik", "Labor"],
  },
  {
    id: "molecule-shape",
    fach: "Chemie",
    titleDE: "VSEPR Molekülgeometrie (Labor)",
    titleZH: "价层电子对互斥构型实验室",
    descDE: "AXE-Klassen, Bindungswinkel, freie Elektronenpaare und Drehansicht der Moleküle.",
    descZH: "AXE 构型切换、键角实测、孤对压缩与分子旋转视图。",
    formula: "\\text{AX}_m\\text{E}_n",
    tags: ["Moleküle", "VSEPR", "Geometrie", "Labor"],
  },
  {
    id: "concentration",
    fach: "Chemie",
    titleDE: "Molarität & Lambert-Beer-Gesetz (Labor)",
    titleZH: "溶液浓度与比尔定律实验室",
    descDE: "Konzentration, Schichtdicke, Extinktionskoeffizient und Kalibriergerade des Photometers.",
    descZH: "浓度光程系数调控、透射颜色、吸光度校准直线与检测器读数。",
    formula: "A = \\varepsilon \\cdot c \\cdot d",
    tags: ["Lösungen", "Spektroskopie", "Labor"],
  },
  {
    id: "probability",
    fach: "Mathe",
    titleDE: "Galton-Brett & Normalverteilung (Labor)",
    titleZH: "高尔顿板与正态分布实验室",
    descDE: "Nagelschichten, Kugelzahl, Binomial-Histogramm, Normal-Anpassung und Gesetz der großen Zahlen.",
    descZH: "钉层球数调控、二项直方图、正态拟合曲线与大数定律收敛。",
    formula: "P(k) = \\binom{n}{k} p^k (1-p)^{n-k}",
    tags: ["Stochastik", "Verteilung", "Labor"],
  },
  {
    id: "membrane",
    fach: "Bio",
    titleDE: "Membrantransport & ATP-Pumpe (Labor)",
    titleZH: "细胞膜转运与钠钾泵实验室",
    descDE: "Doppellipidschicht, Kanal vs. Pumpe, Sättigungskinetik und ATP-Verbrauch.",
    descZH: "磷脂双层、通道与泵切换、饱和动力学曲线与 ATP 消耗计数。",
    formula: "v = \\frac{V_{\\max} \\cdot S}{K_m + S}",
    tags: ["Zellbiologie", "Membran", "Transport", "Labor"],
  },
  {
    id: "neuron",
    fach: "Bio",
    titleDE: "Aktionspotenzial & Ionenkanäle (Labor)",
    titleZH: "神经元动作电位实验室",
    descDE: "Reizstärke, Schwelle, Na+/K+-Kanaldynamik, vier Phasen und Refraktärzeit.",
    descZH: "刺激强度阈值、钠钾通道时序、四相标注与不应期阻断。",
    formula: "C_M\\frac{dV}{dt} = -\\sum I_{\\text{ion}} + I_{\\text{ext}}",
    tags: ["Neurobiologie", "Potenzial", "Labor"],
  },
  {
    id: "osmose",
    fach: "Bio",
    titleDE: "Osmose, Turgor & Plasmolyse-Labor",
    titleZH: "细胞渗透压与质壁分离微观实验室",
    descDE: "Semipermeable Biomembran, Konzentrationsgradient, Vakuolenvolumen und Hämolyse.",
    descZH: "选择透过性半透膜、细胞内外溶质浓度梯度、原生质体脱壁与红细胞溶血。",
    formula: "\\Psi = \\Psi_s + \\Psi_p",
    tags: ["Zellbiologie", "Membran", "Wasserpotenzial", "Plasmolyse"],
  },
  {
    id: "tangent",
    fach: "Mathe",
    titleDE: "Differential- & Tangenten-Simulator",
    titleZH: "导数切线极限逼近沙盒",
    descDE: "Sekantensteigung Δy/Δx im Grenzübergang h → 0 zur Tangentensteigung f'(x).",
    descZH: "割线斜率在 Δx→0 极限逼近瞬间切线斜率 f'(x) 的几何微分直观。",
    formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    tags: ["Analysis", "Ableitung", "Grenzwert", "Tangente"],
  },
  {
    id: "vector",
    fach: "Mathe",
    titleDE: "Vektor-Addition & Kräfte-Parallelogramm",
    titleZH: "二维向量加法与力学平行四边形",
    descDE: "Vektorkomponenten in 2D, Resultierende c = a + b, Betrag und Skalarprodukt.",
    descZH: "二维向量直角坐标分量、平行四边形定则合向量 c = a + b 与向量点积。",
    formula: "\\vec{c} = \\vec{a} + \\vec{b}",
    tags: ["Lineare Algebra", "Vektoren", "Kräfte", "Geometrie"],
  },
  {
    id: "box",
    fach: "Mathe",
    titleDE: "Box-Optimizer (Extremwert-Probleme)",
    titleZH: "长方体容积极值优化沙盒",
    descDE: "Eckenausschnitt x optimieren für maximales Volumen V(x) mit erster und zweiter Ableitung.",
    descZH: "角部切块 x 动态优化最大容积 V(x)，一阶导数为零与二阶导数判别极值。",
    formula: "V'(x) = 0 \\quad V''(x) < 0",
    tags: ["Analysis", "Extremwert", "Optimierung", "Volumen"],
  },
  {
    id: "markt",
    fach: "SoWi",
    titleDE: "Markt-Mechanismus & Wohlfahrts-Simulator",
    titleZH: "供求曲线与市场价格机制沙盘",
    descDE: "Angebot und Nachfrage, Marktpreisbildung, Mindest-/Höchstpreise und Konsumentenrente.",
    descZH: "供求曲线平移、市场出清均衡价 P*、价格干预与消费者/生产者剩余。",
    formula: "Q_S(P) = Q_D(P)",
    tags: ["Wirtschaft", "Markt", "Preis", "Wohlfahrt"],
  },
  {
    id: "gini",
    fach: "SoWi",
    titleDE: "Gini-Koeffizient & Lorenz-Kurve",
    titleZH: "基尼系数与洛伦茨收入分配沙盒",
    descDE: "Einkommens- und Vermögensverteilung, Lorenz-Kurve und Ungleichheitsmaße.",
    descZH: "5大阶层财富分配调节、洛伦茨曲线积分与社会不平等基尼系数判定。",
    formula: "G = \\frac{A}{A + B}",
    tags: ["Soziologie", "Verteilung", "Gini", "Ungleichheit"],
  },
  {
    id: "balance",
    fach: "Philosophie",
    titleDE: "Dialektische Urteils-Waage",
    titleZH: "辩证事实裁决与伦理价值天平",
    descDE: "Sachurteil vs. Werturteil: Abwägen von Pro- und Contra-Argumenten nach Kant & Utilitarismus.",
    descZH: "事实裁决（有效性）与价值裁决（合法性/伦理尊严）多维论据配重与定论推导。",
    formula: "\\text{Urteil} = f(\\text{Sachkriterien}, \\text{Wertkriterien})",
    tags: ["Ethik", "Philosophie", "Urteilsbildung", "Klausur"],
  },
];
