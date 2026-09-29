// FaustLectureTheatre — 德语文学巨著《浮士德 I》互动微课动画剧场
// 契合 presentation.html 沉浸分幕式叙事理念与 Tufte 学术出版物排版规范：
// 核心议题：浮士德悲剧：无限求知探索（Titanismus） 对阵 道德毁人罪责（Gretchentragödie）
// 严格对齐北威州高中德语高考必考核心篇目（Goethe: Faust I, KLP NRW Abitur）

import { useState } from "react";
import type { Lang } from "../../i18n";
import { LectureTheatre, type LectureScene } from "./LectureTheatre";

// ============================================================================
// 第一幕：学者危机与认识论绝望 (Die Gelehrtenkrise)
// ============================================================================
function Scene1GelehrteStage({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [activeSphere, setActiveSphere] = useState<"buecher" | "erdgeist" | "glocken">("buecher");

  return (
    <div className="flex flex-col justify-between gap-4 font-mono select-none">
      {/* 顶部三态演进切换器 */}
      <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-3">
        <span className="text-xs font-bold text-[var(--ink)]">
          {de ? "Fausts Seelenzustand im Studierzimmer:" : "浮士德哥特书斋心境演变:"}
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveSphere("buecher")}
            className={`px-2 py-0.5 border rounded cursor-pointer transition ${
              activeSphere === "buecher"
                ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] border-[var(--line)]"
            }`}
          >
            {de ? "1. Bücher-Krise" : "1. 书斋知识绝望"}
          </button>
          <button
            type="button"
            onClick={() => setActiveSphere("erdgeist")}
            className={`px-2 py-0.5 border rounded cursor-pointer transition ${
              activeSphere === "erdgeist"
                ? "bg-rose-900 text-white border-rose-900"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] border-[var(--line)]"
            }`}
          >
            {de ? "2. Erdgeist-Zurückweisung" : "2. 地灵冰冷拒绝"}
          </button>
          <button
            type="button"
            onClick={() => setActiveSphere("glocken")}
            className={`px-2 py-0.5 border rounded cursor-pointer transition ${
              activeSphere === "glocken"
                ? "bg-emerald-900 text-white border-emerald-900"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] border-[var(--line)]"
            }`}
          >
            {de ? "3. Osterglocken" : "3. 复活节钟声救赎"}
          </button>
        </div>
      </div>

      {/* 主画布图解 */}
      <div className="rounded border border-[var(--line)] bg-[var(--paper)] p-4 min-h-[220px] flex flex-col justify-between">
        {activeSphere === "buecher" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif italic text-sm text-[var(--ink)]">
                „Habe nun, ach! Philosophie, Juristerei und Medizin, und leider auch Theologie durchaus studiert...“
              </span>
              <span className="text-[10px] font-mono text-rose-800 bg-rose-50 px-1.5 py-0.5 border border-rose-200">
                Erkenntnisgrenze
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2">
              <div className="p-2 border border-[var(--line)] bg-[var(--surface)]">
                <div className="font-bold text-[var(--ink)]">Philosophie</div>
                <div className="text-[10px] text-[var(--gray)] mt-1">{de ? "Reine Abstraktion" : "空洞的思辨"}</div>
              </div>
              <div className="p-2 border border-[var(--line)] bg-[var(--surface)]">
                <div className="font-bold text-[var(--ink)]">Juristerei</div>
                <div className="text-[10px] text-[var(--gray)] mt-1">{de ? "Tote Gesetze" : "僵死的教条"}</div>
              </div>
              <div className="p-2 border border-[var(--line)] bg-[var(--surface)]">
                <div className="font-bold text-[var(--ink)]">Medizin</div>
                <div className="text-[10px] text-[var(--gray)] mt-1">{de ? "Machtlos vs. Tod" : "无力抗拒瘟疫"}</div>
              </div>
              <div className="p-2 border border-[var(--line)] bg-[var(--surface)]">
                <div className="font-bold text-[var(--ink)]">Theologie</div>
                <div className="text-[10px] text-[var(--gray)] mt-1">{de ? "Keine Offenbarung" : "失落的信德"}</div>
              </div>
            </div>
            <div className="text-[11px] text-[var(--gray)] border-t border-[var(--line)]/50 pt-2">
              {de
                ? "↳ Erkenntnis: Wissenschaft liefert nur Worte, kein innerstes Lebensgesetz („dass ich erkenne, was die Welt im Innersten zusammenhält“)."
                : "↳ 核心洞察：四大经院学科只能提供死字句，无法让浮士德洞悉‘宇宙万物由何种内在核心所维系’。"}
            </div>
          </div>
        )}

        {activeSphere === "erdgeist" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-rose-900">
              <span className="font-serif italic text-sm">
                „Du gleichst dem Geist, den du begreifst, nicht mir!“
              </span>
              <span className="text-[10px] font-mono text-rose-800 bg-rose-50 px-1.5 py-0.5 border border-rose-200">
                Hybris & Scheitern
              </span>
            </div>
            <p className="text-xs text-[var(--ink)] leading-relaxed">
              {de
                ? "Faust beschwört den Erdgeist und wähnt sich als Göttergleicher (Titanismus). Der Erdgeist stößt ihn vernichtend zurück: Der endliche Mensch kann die gewaltige Lebensschöpfung nicht fassen."
                : "浮士德试图以狂飙突进的‘泰坦巨人精神’（Titanismus）与宇宙地灵平起平坐，却遭到毁灭性鄙夷：有限的人类肉身根本无法承受宏大的宇宙生命力。"}
            </p>
            <div className="rounded border border-rose-300 bg-rose-50/70 p-2 text-xs text-rose-950 font-bold">
              {de ? "Folge: Faust greift zur Giftphiole (Suizidversuch als Ausbruch)" : "后果：万念俱灰，浮士德举起毒药瓶试图自尽以强行突破肉身桎梏"}
            </div>
          </div>
        )}

        {activeSphere === "glocken" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-emerald-900">
              <span className="font-serif italic text-sm">
                „Die Träne quillt, die Erde hat mich wieder!“
              </span>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                Katharsis & Rettung
              </span>
            </div>
            <p className="text-xs text-[var(--ink)] leading-relaxed">
              {de
                ? "Die Glocken des Ostermorgens und die Chorgesänge rufen Kindheitserinnerungen an die Unschuld wach. Nicht der christliche Glaube, sondern die irdische Emotionalität entreißt Faust dem Selbstmord."
                : "复活节清晨的钟声与天使合唱唤醒了童年记忆中的纯真温情。并非出于神圣宗教信仰，而是源于对‘凡间尘世情感’的眷恋，将毒药瓶从唇边夺下。"}
            </p>
            <div className="rounded border border-emerald-300 bg-emerald-50/70 p-2 text-xs text-emerald-950 font-bold">
              {de ? "Überleitung: Faust kehrt zurück ins irdische Leben — bereit für Mephisto" : "转折：重回尘世的浮士德，正敞开灵魂等待靡菲斯特的致命敲门"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 第二幕：恶魔契约与无限赌局 (Der Teufelspakt & die Wette)
// ============================================================================
function Scene2PaktStage({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [signed, setSigned] = useState(false);

  return (
    <div className="flex flex-col justify-between gap-4 font-mono select-none">
      {/* 核心赌注条款 */}
      <div className="rounded border border-[var(--line)] bg-[var(--paper)] p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2">
          <span className="font-serif font-bold text-sm text-[var(--ink)]">
            {de ? "Die Pakt-Bedingung (Vers 1699–1706)" : "恶魔赌约绝命条款（第1699-1706行）"}
          </span>
          <span className="text-[10px] text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5">
            Wette um die Seele
          </span>
        </div>

        <div className="bg-[var(--surface)] p-3 border border-[var(--line)] font-serif italic text-xs leading-relaxed text-[var(--ink)]">
          „Werd ich zum Augenblicke sagen:<br />
          <strong>Verweile doch! du bist so schön!</strong><br />
          Dann magst du mich in Fesseln schlagen,<br />
          Dann will ich gern zugrunde gehn!“
        </div>

        {/* 双灵魂两极张力解构 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-2.5 border border-blue-200 bg-blue-50/60 rounded text-xs">
            <div className="font-bold text-blue-900 mb-1">Trieb 1: Geistiges Streben</div>
            <div className="text-[11px] text-blue-950 leading-tight">
              {de
                ? "Unendlicher Drang nach Erkenntnis, Erfahrung und Welterfassung (Titanismus)."
                : "向上探索：对宇宙终极奥秘与崇高境界的不倦求索（泰坦精神）。"}
            </div>
          </div>
          <div className="p-2.5 border border-rose-200 bg-rose-50/60 rounded text-xs">
            <div className="font-bold text-rose-900 mb-1">Trieb 2: Sinnliche Gier</div>
            <div className="text-[11px] text-rose-950 leading-tight">
              {de
                ? "Haften an der Welt mit klammernden Organen, Rausch und Verführung (Mephisto)."
                : "向下沉沦：狂暴的感官欲望、肉欲宣泄与恶魔诱惑。"}
            </div>
          </div>
        </div>

        {/* 契约签名交互 */}
        <div className="pt-2 flex items-center justify-between border-t border-[var(--line)]/50">
          <span className="text-xs text-[var(--gray)]">
            {de ? "Pakt mit Blut besiegelt:" : "羊皮纸血字契约:"}
          </span>
          <button
            type="button"
            onClick={() => setSigned(!signed)}
            className={`px-3 py-1 text-xs border rounded font-mono font-bold transition cursor-pointer ${
              signed
                ? "bg-rose-900 text-white border-rose-900"
                : "bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border-[var(--line)]"
            }`}
          >
            {signed
              ? (de ? "✓ Blutpakt unterzeichnet" : "✓ 已用鲜血签约 (Blut ist ein besondrer Saft)")
              : (de ? "Blut-Unterschrift leisten ✍" : "按手印血书立约 ✍")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 第三幕：格蕾琴诱惑与道德防线瓦解 (Die Verführung Gretchens)
// ============================================================================
function Scene3VerfuehrungStage({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [step, setStep] = useState<number>(1);

  return (
    <div className="flex flex-col justify-between gap-4 font-mono select-none">
      {/* 诱惑四阶梯步进器 */}
      <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-3 text-xs">
        <span className="font-bold text-[var(--ink)]">
          {de ? "Die Verführungskette:" : "靡菲斯特操弄的诱惑链条:"}
        </span>
        <div className="flex items-center gap-1 font-mono text-[11px]">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setStep(num)}
              className={`w-6 h-6 border rounded cursor-pointer ${
                step === num
                  ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold"
                  : "bg-[var(--paper-subtle)] text-[var(--gray)] border-[var(--line)]"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded border border-[var(--line)] bg-[var(--paper)] p-4 min-h-[200px]">
        {step === 1 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[var(--ink)]">
                {de ? "1. Hexenküche (Verjüngungstrunk)" : "1. 魔女之室：返老还童魔药"}
              </span>
              <span className="text-[10px] text-amber-900 bg-amber-50 px-1.5 py-0.5 border border-amber-200">
                Sinnliche Transformation
              </span>
            </div>
            <p className="text-xs text-[var(--gray)] leading-relaxed">
              {de
                ? "Faust trinkt den Verjüngungstrank. Mephisto prophezeit zynisch: „Du siehst, mit diesem Trank im Leibe, bald Helenen in jedem Weibe.“ Der asketische Gelehrte wird zum triebgesteuerten Verführer."
                : "浮士德饮下魔药脱胎换骨。恶魔嘲弄道：‘只要这药力在体内流淌，你定会把每个女子都看成绝代佳人海伦。’苦修学者蜕变为欲望野兽。"}
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[var(--ink)]">
                {de ? "2. Begegnung auf der Straße (Distanzüberschreitung)" : "2. 街头拦路：越界的狂妄搭讪"}
              </span>
              <span className="text-[10px] text-rose-900 bg-rose-50 px-1.5 py-0.5 border border-rose-200">
                Übergriffigkeit
              </span>
            </div>
            <div className="bg-[var(--surface)] p-2.5 border border-[var(--line)] font-serif italic text-xs leading-relaxed">
              Faust: „Mein schönes Fräulein, darf ich wagen, meinen Arm und Schutz Ihr anzutragen?“<br />
              Gretchen: „Bin weder Fräulein, weder schön, kann ungeleitet nach Hause gehn.“
            </div>
            <p className="text-xs text-[var(--gray)]">
              {de
                ? "Gretchen weist Fausts höfische Anbiederung instinktiv zurück — sie entlarvt seine falsche Schmeichelei."
                : "格蕾琴本能识破了浮士德宫廷式虚伪逢迎，坚决回绝，守护了小市民阶层的朴素体面。"}
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[var(--ink)]">
                {de ? "3. Das Schmuckkästchen (Infiltration der Unschuld)" : "3. 首饰盒暗入闺房：虚荣心破防"}
              </span>
              <span className="text-[10px] text-purple-900 bg-purple-50 px-1.5 py-0.5 border border-purple-200">
                Verführung durch Luxus
              </span>
            </div>
            <p className="text-xs text-[var(--gray)] leading-relaxed">
              {de
                ? "Mephisto schmuggelt ein kostbares Schmuckkästchen in Gretchens Schrank. Das arme Bürgermädchen legt die Juwelen vor dem Spiegel an („Am Golde hängt, zum Golde drängt doch alles“). Die soziale Schranke beginnt zu bröckeln."
                : "恶魔将华贵首饰盒偷偷置入格蕾琴衣柜。贫苦市民少女在镜前戴上璀璨金玉，赞叹‘万物皆系于金银’。门第壁垒在虚荣冲动下瓦解。"}
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[var(--ink)]">
                {de ? "4. Die Gretchenfrage (Religions-Kluft)" : "4. 格蕾琴之问：灵魂信仰的根本鸿沟"}
              </span>
              <span className="text-[10px] text-blue-900 bg-blue-50 px-1.5 py-0.5 border border-blue-200">
                Zentrales KLP-Motiv
              </span>
            </div>
            <div className="bg-[var(--surface)] p-2.5 border border-[var(--line)] font-serif italic text-xs leading-relaxed text-[var(--ink)]">
              „Nun sag, wie hast du's mit der Religion? Du bist ein herzlich guter Mann, allein ich glaub, du hältst nicht viel davon.“
            </div>
            <p className="text-xs text-[var(--gray)]">
              {de
                ? "Faust weicht pantheistisch aus („Gefühl ist alles; Name ist Schall und Rauch“). Gretchen spürt das Böse: „Es ist dem Menschen an der Stirn geschrieben, dass er nicht mag eine Seele lieben.“"
                : "浮士德用泛神论‘感觉就是一切’含糊其辞；格蕾琴直觉感知其背后的恶魔同伙，灵魂鸿沟不可逾越。"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 第四幕：悲剧连锁与血腥罪责 (Die Kaskade der Zerstörung)
// ============================================================================
function Scene4KatastropheStage({ lang }: { lang: Lang }) {
  const de = lang === "de";

  return (
    <div className="flex flex-col justify-between gap-4 font-mono select-none">
      <div className="rounded border border-rose-300 bg-rose-50/50 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-rose-200 pb-2">
          <span className="font-bold text-xs text-rose-950">
            {de ? "Die vier Stufen der Gretchentragödie (Die Opfer des Strebens)" : "格蕾琴悲剧的四重血泪连锁（求索的惨重代价）"}
          </span>
          <span className="text-[10px] text-rose-800 bg-white border border-rose-300 px-2 py-0.5">
            4 Fache Schuld
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 border border-rose-200 bg-white rounded">
            <div className="font-bold text-rose-950">1. Tod der Mutter (Schlaftrunk)</div>
            <div className="text-[11px] text-[var(--gray)] mt-1">
              {de
                ? "Um ungestört zu sein, reicht Gretchen ihrer Mutter einen Trank von Faust — die Mutter erwacht nie mehr."
                : "母亲猝死：为行私会，格蕾琴喂母饮下浮士德配制的安眠药水，致母暴毙。"}
            </div>
          </div>
          <div className="p-2.5 border border-rose-200 bg-white rounded">
            <div className="font-bold text-rose-950">2. Brudermord (Valentin)</div>
            <div className="text-[11px] text-[var(--gray)] mt-1">
              {de
                ? "Gretchens Bruder verteidigt ihre Ehre. Faust ersticht ihn feige mit Mephistos teuflischer Führung."
                : "手足相残：兄长瓦伦廷为妹妹名誉拔剑决斗，被浮士德在恶魔幻术暗算下卑劣刺死。"}
            </div>
          </div>
          <div className="p-2.5 border border-rose-200 bg-white rounded">
            <div className="font-bold text-rose-950">3. Verstoßung & Dom-Qual</div>
            <div className="text-[11px] text-[var(--gray)] mt-1">
              {de
                ? "Gretchen wird von der Gesellschaft als 'Hure' geächtet. Im Dom quält der Böse Geist ihr Gewissen."
                : "被逐绝境：未婚先孕受尽街坊唾骂；大教堂内在哀歌声中被恶灵折磨至近乎崩溃。"}
            </div>
          </div>
          <div className="p-2.5 border border-rose-200 bg-white rounded">
            <div className="font-bold text-rose-950">4. Kindsmord im Wahnsinn</div>
            <div className="text-[11px] text-[var(--gray)] mt-1">
              {de
                ? "Im Delirium ertränkt Gretchen ihr neugeborenes Kind im Weiher — sie wird zum Tode verurteilt."
                : "杀婴绝境：精神彻底错乱下溺杀初生婴儿，沦为死囚，被判处极刑断头台。"}
            </div>
          </div>
        </div>

        <div className="p-2 bg-white/80 border border-rose-200 text-[11px] text-rose-950">
          <strong>Klausur-Erkenntnis:</strong> Fausts Titanismus bleibt nicht privat — seine unbändige Selbstenfaltung vernichtet die sozial schwächere Frau in der patriarchalen Ständegesellschaft.
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 第五幕：死牢救赎与终极道德天平 (Der Kerker: Rettung vs. Verdammung)
// ============================================================================
function Scene5KerkerStage({ lang }: { lang: Lang }) {
  const de = lang === "de";

  return (
    <div className="flex flex-col justify-between gap-4 font-mono select-none">
      <div className="rounded border border-[var(--line)] bg-[var(--paper)] p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2">
          <span className="font-serif font-bold text-sm text-[var(--ink)]">
            {de ? "Die Kerker-Szene: Die Doppel-Stimme (Gericht vs. Gnade)" : "死牢之夜：双重终审之声（判决与恩典）"}
          </span>
          <span className="text-[10px] text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5">
            Abitur-Synthese
          </span>
        </div>

        {/* 恶魔与上天的终极对峙 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 border border-rose-300 bg-rose-50/70 rounded">
            <div className="text-xs font-bold text-rose-900">Mephisto (Irdisches Strafrecht):</div>
            <div className="font-serif italic text-base text-rose-950 my-1">
              „Sie ist gerichtet!“
            </div>
            <div className="text-[11px] text-rose-900/80">
              {de
                ? "Für die weltliche Ordnung und den Teufel ist Gretchen schuldig des Kindsmordes und dem Henker verfallen."
                : "就世俗法律与恶魔而言：罪证确凿，杀婴当诛，肉身与灵魂皆入地狱。"}
            </div>
          </div>

          <div className="p-3 border border-emerald-300 bg-emerald-50/70 rounded">
            <div className="text-xs font-bold text-emerald-900">Stimme von oben (Göttliche Gnade):</div>
            <div className="font-serif italic text-base text-emerald-950 my-1">
              „Ist gerettet!“
            </div>
            <div className="text-[11px] text-emerald-900/80">
              {de
                ? "Weil sie die Flucht mit Mephisto ablehnt und sich Gott anheimgibt, empfängt Gretchen Erlösung."
                : "因拒绝恶魔同流合污、坦然承受世俗罪责交托上帝，灵魂获得崇高神圣救赎。"}
            </div>
          </div>
        </div>

        {/* 歌德论证双轨终审天平 */}
        <div className="border-t border-[var(--line)]/60 pt-3">
          <div className="text-xs font-bold text-[var(--ink)] mb-1.5">
            {de ? "Dialektik der Faust-Tragödie für die Abitur-Klausur:" : "德国高考作文终极双轨辩证总成:"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 border border-[var(--line)] bg-[var(--surface)]">
              <strong>1. Streben (Faust):</strong> „Wer immer strebend sich bemüht, den können wir erlösen.“ Der Drang nach Transzendenz ist tragisch, aber von Gott im Prolog gebilligt.
            </div>
            <div className="p-2 border border-[var(--line)] bg-[var(--surface)]">
              <strong>2. Schuld (Gretchen):</strong> Das Streben heiligt nicht die Mittel. Fausts Egoismus hinterlässt Trümmer; die moralische Schuld bleibt unauslöschbar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 五幕完整剧情定义 (LectureScene Config)
// ============================================================================
const FAUST_SCENES: LectureScene[] = [
  {
    id: "faust-s1",
    titleDE: "1. Gelehrtenkrise & Erkenntnisdrang",
    titleZH: "第一幕：学者危机与求知欲望绝望",
    narrationDE: "Faust scheitert an den Grenzen menschlicher Wissenschaft. Weder Philosophie noch Theologie stillen seinen Durst nach dem 'innersten Zusammenhalt der Welt'.",
    narrationZH: "书斋中的浮士德陷入学术绝望，传统经院哲学无法触及宇宙终极真理，狂飙突进的巨人精神在冰冷现实前几乎走向自戕。",
    badgeDE: "Akt I: Studierzimmer",
    badgeZH: "第一幕：哥特书斋",
    renderStage: (_p, _play, lang) => <Scene1GelehrteStage lang={lang} />,
    checkpoint: {
      questionDE: "Warum scheitert Fausts Beschwörung des Erdgeistes im Studierzimmer?",
      questionZH: "浮士德在书斋中召唤‘地灵’（Erdgeist），为何遭到地灵的毁灭性蔑视与拒绝？",
      options: [
        {
          id: "a",
          textDE: "Weil der endliche Mensch dem gewaltigen schöpferischen Weltgeist wesensmäßig nicht ebenbürtig ist.",
          textZH: "因为有限肉身的凡人，在本质上根本无法与庞大而生生不息的宇宙造化之灵平起平坐。",
        },
        {
          id: "b",
          textDE: "Weil Mephisto die Beschwörungsformel sabotiert hat.",
          textZH: "因为靡菲斯特在暗中破坏了浮士德的魔法召唤符文咒语。",
        },
        {
          id: "c",
          textDE: "Weil Faust noch kein Blutopfer dargebracht hat.",
          textZH: "因为浮士德当时尚未给地灵献上牲畜与鲜血祭品。",
        },
      ],
      correctId: "a",
      explainDE: "Der Erdgeist schleudert Faust entgegen: 'Du gleichst dem Geist, den du begreifst, nicht mir!'. Faust muss seine menschliche Begrenztheit schmerzhaft erkennen.",
      explainZH: "地灵嘲弄道：‘你只配与你所能理解的精灵相仿佛，绝配不上我！’沉重粉碎了浮士德妄图与造物主并肩的泰坦傲慢（Hybris）。",
    },
  },
  {
    id: "faust-s2",
    titleDE: "2. Der Pakt mit Mephisto",
    titleZH: "第二幕：恶魔契约与生命赌注",
    narrationDE: "Kein klassischer Pakt, sondern eine existenzielle Wette: Nur wenn Faust rastet und sich vollkommen im Augenblick sättigt, verliert er seine Seele.",
    narrationZH: "不同于传统出卖灵魂的平庸契约，这是一场关于‘人生永恒进取’的赌局：只要浮士德沉沦满足于任何片刻安逸，灵魂方归恶魔。",
    badgeDE: "Akt II: Pakt & Wette",
    badgeZH: "第二幕：恶魔立约",
    renderStage: (_p, _play, lang) => <Scene2PaktStage lang={lang} />,
    checkpoint: {
      questionDE: "Unter welcher präzisen Bedingung verliert Faust laut Pakt seine Seele an Mephisto?",
      questionZH: "根据赌约，浮士德在何种极其精确的条件下才会将灵魂输给靡菲斯特？",
      options: [
        {
          id: "a",
          textDE: "Sobald er vor einem Augenblick verweilt und sich satt und wunschlos glücklich erklärt.",
          textZH: "一旦浮士德停下求索脚步，对某一瞬间心满意足并说道‘停一停吧，你真美丽！’",
        },
        {
          id: "b",
          textDE: "Sobald er 24 Jahre lang irdische Genüsse und Jugend ausgekostet hat.",
          textZH: "只要浮士德享受尘世荣华富贵与青春年华达到 24 年整。",
        },
        {
          id: "c",
          textDE: "Sobald er eine Todsünde gegen die christliche Kirche begeht.",
          textZH: "只要浮士德触犯了罗马教会认定的任何一条不可饶恕的绝罚大罪。",
        },
      ],
      correctId: "a",
      explainDE: "Vers 1699: 'Werd ich zum Augenblicke sagen: Verweile doch! du bist so schön! Dann magst du mich in Fesseln schlagen...'. Rastlosigkeit ist Fausts Wesenskern.",
      explainZH: "第1699行名言确立：永不驻足、永不自满正是浮士德精神（Das Faustische）的核心灵魂，停止求知探索才是终极死亡。",
    },
  },
  {
    id: "faust-s3",
    titleDE: "3. Die Verführung Gretchens",
    titleZH: "第三幕：格蕾琴的诱惑与信仰鸿沟",
    narrationDE: "Aus der philosophischen Sinnkrise wird eine bürgerliche Tragödie. Mit Mephistos Schmuck und Verführungskunst wird Gretchens Unschuld untergraben.",
    narrationZH: "宏大的哲学求道悲剧转入市民阶层的爱情深渊。借助金银首饰与靡菲斯特的阴谋，纯洁虔诚的格蕾琴步步被推向堕落。",
    badgeDE: "Akt III: Gretchenfrage",
    badgeZH: "第三幕：格蕾琴之问",
    renderStage: (_p, _play, lang) => <Scene3VerfuehrungStage lang={lang} />,
    checkpoint: {
      questionDE: "Was offenbart die berühmte 'Gretchenfrage' über das Verhältnis zwischen Faust und Gretchen?",
      questionZH: "闻名文学史的‘格蕾琴之问’（你对宗教持何态度？）暴露了二人之间怎样的深层鸿沟？",
      options: [
        {
          id: "a",
          textDE: "Den unüberbrückbaren Konflikt zwischen traditionell-kirchlicher Frömmigkeit und pantheistischer Religionsauflösung.",
          textZH: "小市民传统虔诚教义 与 知识精英泛神论/虚无主义之间不可弥合的精神鸿沟。",
        },
        {
          id: "b",
          textDE: "Dass Gretchen Faust wegen seiner geringen Bildung ablehnt.",
          textZH: "格蕾琴因浮士德缺乏学术修养与学士文凭而心存鄙视。",
        },
        {
          id: "c",
          textDE: "Dass Mephisto ein protestantischer Pastor werden möchte.",
          textZH: "靡菲斯特意图篡夺教会神职成为新教牧师。",
        },
      ],
      correctId: "a",
      explainDE: "Gretchen vertraut auf Beichte und Kirche; Faust löst Gott in subjektives 'Gefühl' auf. Gretchen spürt intuitiv die dämonische Entwurzelung Fausts.",
      explainZH: "格蕾琴笃信洗礼与天主诫命，浮士德却将神消解为随性流淌的主观‘情绪体验’，这一鸿沟预示了后续道德灾难的不可避免。",
    },
  },
  {
    id: "faust-s4",
    titleDE: "4. Die Kaskade der Zerstörung",
    titleZH: "第四幕：悲剧连锁与血腥罪责",
    narrationDE: "Fausts Drang nach Verwirklichung fordert unschuldige Menschenleben: Der Tod der Mutter, der Mord an Valentin und Gretchens Wahnsinn nach dem Kindsmord.",
    narrationZH: "浮士德自我实现的代价极其血腥：母亲暴毙、瓦伦廷决斗被刺死、格蕾琴绝望杀婴，狂飙突进的主体性彻底沦为毁人性命的共谋。",
    badgeDE: "Akt IV: Katastrophe",
    badgeZH: "第四幕：血腥灾难",
    renderStage: (_p, _play, lang) => <Scene4KatastropheStage lang={lang} />,
    checkpoint: {
      questionDE: "Inwiefern ist Faust für Gretchens Verurteilung als Kindsmörderin moralisch mitverantwortlich?",
      questionZH: "浮士德在何种意义上对格蕾琴被判处死刑的‘杀婴重罪’负有不可推卸的道德罪责？",
      options: [
        {
          id: "a",
          textDE: "Er hat sie verführt, geschwängert und im entscheidenden Moment der Not für den Rausch der Walpurgisnacht feige verlassen.",
          textZH: "他诱奸使之受孕，却在母子面临世俗绝境的关键时刻，逃之夭夭前往荒山参与瓦尔普吉斯之夜纵欲狂欢。",
        },
        {
          id: "b",
          textDE: "Er hat das Neugeborene persönlich eigenhändig im Weiher ertränkt.",
          textZH: "浮士德本人亲手在深夜把新生婴儿扔进池塘溺杀。",
        },
        {
          id: "c",
          textDE: "Er hat Gretchen vor dem Richter im Namen des Staates offiziell denunziert.",
          textZH: "浮士德为了保全自己的学者声誉，主动向法庭检举揭发了格蕾琴。",
        },
      ],
      correctId: "a",
      explainDE: "Faust flieht nach dem Brudermord und lässt die schwangere Gretchen gesellschaftlich geächtet zurück. Seine Hybris zerstört ihre bürgerliche Existenz.",
      explainZH: "浮士德刺杀兄长后只身潜逃，任由弱女子受尽封建世俗排挤践踏，其狂暴自我追求完全建筑在对弱者生命的践踏之上。",
    },
  },
  {
    id: "faust-s5",
    titleDE: "5. Der Kerker: Rettung vs. Verdammung",
    titleZH: "第五幕：死牢救赎与终极道德裁决",
    narrationDE: "Gretchen weigert sich, mit Mephisto zu fliehen. Ihr Bekenntnis zur irdischen Schuld bringt ihr göttliche Gnade — Faust bleibt zerrissen zurück.",
    narrationZH: "死牢破开之际，格蕾琴拒绝随恶魔私奔苟活，坦然承受世俗裁判与上帝审判。‘她得救了！’神圣之声终结了第一部悲剧。",
    badgeDE: "Akt V: Erlösung",
    badgeZH: "第五幕：死牢恩典",
    renderStage: (_p, _play, lang) => <Scene5KerkerStage lang={lang} />,
    checkpoint: {
      questionDE: "Warum ruft die Stimme von oben am Ende 'Ist gerettet!', obwohl Mephisto 'Sie ist gerichtet!' verkündet?",
      questionZH: "剧末靡菲斯特狂呼‘她被判罪了！’，为何上天之声却庄严宣告‘她得救了！’？",
      options: [
        {
          id: "a",
          textDE: "Weil Gretchen die teuflische Flucht ausschlägt, ihre Tat bereut und sich demütig dem Gottesgericht übergibt.",
          textZH: "因为格蕾琴毅然拒绝恶魔的搭救苟活，彻底悔悟罪愆，将自己谦卑交托给至高的天主公义审判。",
        },
        {
          id: "b",
          textDE: "Weil Faust die Wächter bestochen und das Todesurteil gefälscht hat.",
          textZH: "因为浮士德重金买通了看守并伪造了帝国无罪赦免令。",
        },
        {
          id: "c",
          textDE: "Weil der Kaiser rechtzeitig ein Gnadendekret unterzeichnete.",
          textZH: "因为皇帝在最后关头签署了全城死囚的大赦特权文书。",
        },
      ],
      correctId: "a",
      explainDE: "Gretchen sagt sich von Faust und Mephisto los ('Heinrich! Mir graut's vor dir!'). Ihre Bereitschaft zur Sühne transzendiert das weltliche Blutgericht.",
      explainZH: "格蕾琴最后惊呼‘亨利！我惧怕你！’毅然与恶魔斩断羁绊，以受难之身完成了神圣道德救赎，成为全剧崇高的道德标杆。",
    },
  },
];

export function FaustLectureTheatre({ lang }: { lang: Lang }) {
  return (
    <LectureTheatre
      lang={lang}
      subject="Deutsch / Pflichtlektüre Abitur NRW"
      courseTitleDE="Faust I: Gelehrtentragödie & Gretchentragödie"
      courseTitleZH="歌德《浮士德》悲剧解剖：无限求知探索 对阵 道德毁人罪责"
      courseDescDE="Goethes Meisterwerk im Spannungsfeld zwischen wissenschaftlichem Erkenntnisdrang (Gelehrtentragödie) und existenzieller Schuld (Gretchentragödie) nach den Anforderungen des NRW Abiturs."
      courseDescZH="歌德德国文学巅峰之作：聚焦学者危机（Titanismus）与格蕾琴悲剧的伦理审判，全景拆解高中德语会考核心考点。"
      scenes={FAUST_SCENES}
    />
  );
}
