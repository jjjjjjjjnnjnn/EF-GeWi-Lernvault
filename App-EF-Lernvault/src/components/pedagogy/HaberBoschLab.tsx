// HaberBoschLab — G3 Socratic-Lab: 哈伯法合成氨活塞与分子微观碰撞动力学实验舱
// 具备 60FPS 实时弹性碰撞粒子引擎、物理活塞受力联动、器壁撞击率与勒夏特列减弱扰动验证
import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface Particle {
  id: number;
  type: "N2" | "H2" | "NH3";
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface SocraticStep {
  id: number;
  qDE: string;
  qZH: string;
  options: { id: string; de: string; zh: string }[];
  correctId: string;
  explainDE: string;
  explainZH: string;
  actionDE: string;
  actionZH: string;
  targetP?: number;
  targetT?: number;
  targetEdukt?: number;
}

const STEPS: SocraticStep[] = [
  {
    id: 0,
    qDE: "Schritt 1: Warum weicht das Gleichgewicht bei Zugabe von N₂ nach rechts aus?",
    qZH: "第一步：注入更多 N₂ 原料时，平衡为何必定朝生成 NH₃ 的方向移动？",
    options: [
      { id: "a", de: "Stoßtheorie: Höhere N₂-Dichte steigert v_hin schlagartig über v_rück", zh: "碰撞理论：N₂ 粒子密度骤增，使正反应有效碰撞频次 v_hin 瞬间压过逆反应 v_rück" },
      { id: "b", de: "Die Gleichgewichtskonstante K vergrößert sich durch Stoffzugabe", zh: "平衡常数 K 因为原料加入而变大" },
      { id: "c", de: "N₂ senkt den Druck im Behälter und zieht Produkte an", zh: "N₂ 降低了容器内壁的撞击压强" },
    ],
    correctId: "a",
    explainDE: "Richtig! Nach dem Massenwirkungsgesetz gilt v_hin = k · [N₂] · [H₂]³. Durch Zugabe von N₂ steigt die Stoßhäufigkeit. Das System weicht dem Zwang aus, indem es N₂ verbraucht.",
    explainZH: "完全正确！依据质量作用定律，正反应速率与浓度乘积成正比。增注 N₂ 提高了反应物分子间的碰撞几率，体系通过加快正向反应来‘减弱’原料积压的外加扰动。",
    actionDE: "Tipp: Schiebe den Regler [N₂] hoch und beobachte die Zunahme der NH₃-Cluster.",
    actionZH: "体验操作：调高 [N₂] 原料浓度滑杆，观察腔体内 NH₃ 分子集群的生成。",
    targetEdukt: 85,
  },
  {
    id: 1,
    qDE: "Schritt 2: Druck steigt (Kolben komprimiert) — warum gewinnt die NH₃-Seite?",
    qZH: "第二步：下压活塞压缩气体，为什么 2 NH₃ 侧必定在受迫状态下胜出？",
    options: [
      { id: "a", de: "Volumenentlastung: 4 mol Eduktgas werden zu nur 2 mol Produktgas komprimiert", zh: "体积解压原理：4 个原料气体分子转变为仅 2 个产物分子，从根源上缓解壁面碰撞压强" },
      { id: "b", de: "NH₃-Moleküle wiegen mehr und fallen durch Schwerkraft nach unten", zh: "NH₃ 分子重力更大，自动沉入气缸底部" },
      { id: "c", de: "Katalysatoren funktionieren ausschließlich bei hohem mechanischen Druck", zh: "催化剂仅在高压机械力下才会产生活性" },
    ],
    correctId: "a",
    explainDE: "Hervorragend! p·V = n·R·T. 4 Mol Gasteilchen (1 N₂ + 3 H₂) üben doppelt so viele Stöße aus wie 2 Mol NH₃. Bei hohem Druck weicht das System aus, indem es die Teilchenzahl n halbiert!",
    explainZH: "原理透彻！理想气体定律表明，气体对器壁施加的机械压强完全取决于单位体积内的粒子撞击频率。4 个气体分子转化为 2 个分子，粒子总数减半，使体系有效缓解了下压活塞带来的受迫应力！",
    actionDE: "Tipp: Ziehe den Druckregler auf 85 bar — der Kolben senkt sich und die Dichte steigt.",
    actionZH: "体验操作：将压强推至 85 bar，活塞将实质下压，观察分子在受限空间中更剧烈地聚合成 NH₃。",
    targetP: 85,
  },
  {
    id: 2,
    qDE: "Schritt 3: Temperatur steigt (exotherm, ΔH < 0) — wie reagiert das System?",
    qZH: "第三步：升温加热（放热反应，ΔH = -92 kJ/mol）——体系将如何避抗热能？",
    options: [
      { id: "a", de: "Die NH₃-Ausbeute fällt: Wärme ist quasi ein Produkt, das System kühlt durch endothermen Zerfall", zh: "NH₃ 产率大幅下降：反应热等同于产物，体系被迫启动吸热逆反应以吸收多余热量" },
      { id: "b", de: "Die NH₃-Ausbeute steigt, da heißere Moleküle grundsätzlich mehr Produkte bilden", zh: "NH₃ 产率提高，因为更热的分子活性更强" },
      { id: "c", de: "Nur die Reaktionszeit sinkt, das Gleichgewicht K bleibt absolut unverändert", zh: "仅仅反应变快，平衡常数与产物比例丝毫不会改变" },
    ],
    correctId: "a",
    explainDE: "Exakt! N₂ + 3 H₂ ⇌ 2 NH₃ + 92 kJ. Exotherme Reaktionen hassen Hitze. Durch Temperaturerhöhung wird K kleiner. Das System weicht dem thermischen Zwang durch die endotherme Rückreaktion aus.",
    explainZH: "精准命中！合成氨为放热反应。升温等于从外部强行灌入能量，体系本能地向吸热方向（逆反应分解为 N₂ 和 H₂）移动来吸收多余热量，因而高温反而严重压低了平衡产率！",
    actionDE: "Tipp: Erhöhe die Temperatur auf 550 °C — sieh die Bunsenbrennerflamme und den Zerfall.",
    actionZH: "体验操作：将温度调高至 550 °C，观察底部火焰变强、分子剧烈晃动分解，NH₃ 产率暴跌。",
    targetT: 550,
  },
  {
    id: 3,
    qDE: "Schritt 4: Klausur-Präzision — Wie lautet der vollständige Abitur-Dreiklang?",
    qZH: "第四步：考场规范得分表达——在德国高中会考中如何完整套用勒夏特列三段论？",
    options: [
      { id: "a", de: "1. Zwang benennen (p, T, c) → 2. Ausweichrichtung begründen (Stöße/Teilchen) → 3. Stoffausbeute folgern", zh: "1. 定性扰动类型（压强/温度/浓度）→ 2. 阐述避抗机制（分子数与吸放热）→ 3. 给出平衡产率结论" },
      { id: "b", de: "Immer behaupten, dass Katalysatoren das Gleichgewicht nach rechts verschieben", zh: "一律写催化剂能够促使反应平衡偏向生成物一侧" },
      { id: "c", de: "Nur die Formel aufschreiben, ohne mikroskopische Teilchenbegründung", zh: "仅默写化学反应方程式，不需要任何微观粒子碰撞解释" },
    ],
    correctId: "a",
    explainDE: "Volle Punktzahl im Abitur! Korrektoren fordern exakt diesen Dreiklang: Zwang (Störung) → Systemreaktion (Mechanismus) → Konsequenz für die Gleichgewichtslage.",
    explainZH: "考场满分典范！德国高考评分标准严格要求三段式论证：明确外加受迫源（Zwang）→ 论证微观避抗路径（Ausweichen）→ 导出宏观物质产率（Ausbeute）。",
    actionDE: "Klausursatz fertig: Du beherrschst das mikroskopische Prinzip!",
    actionZH: "考场句型掌握完毕：你已完全洞悉勒夏特列原理的微观本质！",
  },
];

export function HaberBoschLab({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState<boolean[]>([false, false, false, false]);

  const [pressure, setPressure] = useState<number>(35);
  const [temperature, setTemperature] = useState<number>(380);
  const [eduktRatio, setEduktRatio] = useState<number>(55);
  const [collisionHits, setCollisionHits] = useState<number>(0);

  const cur = Math.min(stepIdx, STEPS.length - 1);
  const step = STEPS[cur];
  const correct = picked === step.correctId;

  const yieldPct = Math.round(
    Math.max(
      6,
      Math.min(
        95,
        18 + (pressure / 100) * 44 - ((temperature - 200) / 400) * 36 + (eduktRatio / 100) * 32
      )
    )
  );

  const targetPistonY = 32 + (1 - pressure / 100) * 65;
  const [pistonY, setPistonY] = useState<number>(targetPistonY);
  const totalParticleCount = 32;
  const targetNH3 = Math.round((yieldPct / 100) * totalParticleCount);

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const hitCounterRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const pistonYRef = useRef<number>(targetPistonY);
  useEffect(() => {
    pistonYRef.current = pistonY;
  }, [pistonY]);

  const tempRef = useRef<number>(temperature);
  useEffect(() => {
    tempRef.current = temperature;
  }, [temperature]);

  useEffect(() => {
    const list: Particle[] = [];
    for (let i = 0; i < totalParticleCount; i++) {
      const isNH3 = i < targetNH3;
      const isN2 = !isNH3 && i % 4 === 0;
      list.push({
        id: i,
        type: isNH3 ? "NH3" : isN2 ? "N2" : "H2",
        x: 65 + Math.random() * 280,
        y: 110 + Math.random() * 65,
        vx: (Math.random() - 0.5) * 4.2,
        vy: (Math.random() - 0.5) * 4.2,
      });
    }
    particlesRef.current = list;
  }, []);

  useEffect(() => {
    let active = true;
    const updatePiston = () => {
      setPistonY((prev) => {
        const diff = targetPistonY - prev;
        if (Math.abs(diff) < 0.2) return targetPistonY;
        return prev + diff * 0.25;
      });
      if (active) requestAnimationFrame(updatePiston);
    };
    const req = requestAnimationFrame(updatePiston);
    return () => {
      active = false;
      cancelAnimationFrame(req);
    };
  }, [targetPistonY]);

  useEffect(() => {
    const list = particlesRef.current;
    if (!list.length) return;
    const curNH3Count = list.filter((p) => p.type === "NH3").length;
    if (curNH3Count < targetNH3) {
      const toConvert = list.find((p) => p.type !== "NH3");
      if (toConvert) toConvert.type = "NH3";
    } else if (curNH3Count > targetNH3) {
      const toConvert = list.find((p) => p.type === "NH3");
      if (toConvert) toConvert.type = Math.random() > 0.3 ? "H2" : "N2";
    }
  }, [targetNH3]);

  // 60FPS 丝滑 Canvas 渲染与连续碰撞积分循环
  useEffect(() => {
    let lastTime = performance.now();
    let collisionTimer = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;
      const currentTemp = tempRef.current;
      const curPiston = pistonYRef.current;
      const speedScale = 1.4 + ((currentTemp - 200) / 400) * 2.2;
      const minX = 62;
      const maxX = 358;
      const minY = curPiston + 18;
      const maxY = 186;

      let hits = 0;
      const list = particlesRef.current;

      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        p.x += p.vx * speedScale * (dt * 60);
        p.y += p.vy * speedScale * (dt * 60);

        if (p.x <= minX) {
          p.x = minX;
          p.vx = Math.abs(p.vx);
          hits++;
        } else if (p.x >= maxX) {
          p.x = maxX;
          p.vx = -Math.abs(p.vx);
          hits++;
        }

        if (p.y <= minY) {
          p.y = minY;
          p.vy = Math.abs(p.vy);
          hits += 2;
        } else if (p.y >= maxY) {
          p.y = maxY;
          p.vy = -Math.abs(p.vy);
          hits++;
        }
      }

      // Canvas 2D 原生 60FPS 绘制
      const cvs = canvasRef.current;
      if (cvs) {
        const ctx = cvs.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, 420, 220);

          for (let i = 0; i < list.length; i++) {
            const p = list[i];
            if (p.type === "NH3") {
              // 产物 NH3: 墨绿色核心 + 三个微小轻绿氢原子
              ctx.fillStyle = "#047857";
              ctx.beginPath();
              ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = "#10b981";
              ctx.beginPath();
              ctx.arc(p.x - 2.8, p.y + 2.8, 1.6, 0, Math.PI * 2);
              ctx.arc(p.x + 2.8, p.y + 2.8, 1.6, 0, Math.PI * 2);
              ctx.arc(p.x, p.y - 3.2, 1.6, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.type === "N2") {
              // 原料 N2: 钴蓝色双原子哑铃
              ctx.fillStyle = "#2563eb";
              ctx.beginPath();
              ctx.arc(p.x - 2.4, p.y, 3, 0, Math.PI * 2);
              ctx.arc(p.x + 2.4, p.y, 3, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // 原料 H2: 雅灰小双原子哑铃
              ctx.fillStyle = "#64748b";
              ctx.beginPath();
              ctx.arc(p.x - 1.6, p.y, 2, 0, Math.PI * 2);
              ctx.arc(p.x + 1.6, p.y, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      hitCounterRef.current += hits;
      collisionTimer += dt;
      if (collisionTimer >= 0.2) {
        setCollisionHits(Math.round(hitCounterRef.current * 5));
        hitCounterRef.current = 0;
        collisionTimer = 0;
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const pick = (id: string) => {
    setPicked(id);
    if (id === step.correctId) {
      setDone((d) => d.map((v, i) => (i === cur ? true : v)));
    }
  };

  const next = () => {
    setPicked(null);
    if (cur < STEPS.length - 1) {
      const nextIdx = cur + 1;
      setStepIdx(nextIdx);
      const s = STEPS[nextIdx];
      if (s.targetP !== undefined) setPressure(s.targetP);
      if (s.targetT !== undefined) setTemperature(s.targetT);
      if (s.targetEdukt !== undefined) setEduktRatio(s.targetEdukt);
    }
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* 左侧 58% 动态反应舱 */}
      <section className="flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:w-[58%]">
        <div className="mb-3 flex items-center justify-between border-b border-[var(--line)] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--ink)]" />
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--ink)]">
              {de ? "Haber-Bosch Kolbenreaktor // Kinetik" : "哈伯法活塞动力学反应舱"}
            </h4>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[var(--gray)]">
              {collisionHits} Stöße/s
            </span>
            <span className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] px-2 py-0.5 font-semibold text-[var(--ink)]">
              {yieldPct}% NH₃
            </span>
          </div>
        </div>

        <div className="mb-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2 text-center text-xs">
          <MathHtml
            code="N_2(g) + 3H_2(g) \rightleftharpoons 2NH_3(g) \quad \Delta H = -92{,}4\,\text{kJ/mol}"
            display={false}
            cacheKey="prod-haber-eq"
          />
        </div>

        {/* 动态反应舱视窗：底层 SVG 结构 + 顶层 Canvas 60FPS 分子动力学 */}
        <div className="relative overflow-hidden rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-2">
          <svg viewBox="0 0 420 220" className="h-52 w-full select-none font-mono">
            {/* 背景毫米刻度线 */}
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="52" y1={y} x2="368" y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="text-[var(--line)] opacity-60" />
            ))}

            {/* 石英气缸主体 */}
            <rect x="52" y="15" width="316" height="180" rx="4" fill="currentColor" stroke="currentColor" strokeWidth={1.5} className="text-[var(--surface)] text-[var(--line)]" />
            {/* 压缩腔气体微光 */}
            <rect x="54" y={pistonY + 16} width="312" height={Math.max(0, 193 - (pistonY + 16))} fill="currentColor" className="text-[var(--accent)] opacity-5" />

            {/* 活塞连杆与活塞头 */}
            <rect x="198" y="0" width="24" height={pistonY} fill="currentColor" stroke="currentColor" strokeWidth={1} className="text-[var(--gray)] text-[var(--line)]" />
            <rect x="54" y={pistonY} width="312" height="16" rx="2" fill="currentColor" stroke="currentColor" strokeWidth={1} className="text-[var(--ink)] text-[var(--gray)]" />
            <line x1="54" y1={pistonY + 8} x2="366" y2={pistonY + 8} stroke="currentColor" strokeWidth={1.2} className="text-[var(--paper)]" />

            {/* 精密机械压力表 */}
            <g transform="translate(388, 60)">
              <circle cx="0" cy="0" r="16" fill="currentColor" stroke="currentColor" strokeWidth={1.2} className="text-[var(--surface)] text-[var(--gray)]" />
              <line
                x1="0"
                y1="0"
                x2={11 * Math.cos(-2.2 + (pressure / 100) * 4.4)}
                y2={11 * Math.sin(-2.2 + (pressure / 100) * 4.4)}
                stroke="#b91c1c"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="0" cy="0" r="2" fill="currentColor" className="text-[var(--ink)]" />
              <text x="0" y="24" textAnchor="middle" fill="currentColor" fontSize="8" className="text-[var(--gray)]">
                {pressure} bar
              </text>
            </g>

            {/* 加热温控源 */}
            <g transform="translate(210, 202)">
              <ellipse cx="0" cy="4" rx="42" ry="3" fill="currentColor" className="text-[var(--line)]" />
              {temperature > 220 && (
                <path
                  d={`M -25 4 Q -12 ${-2 - (temperature - 200) / 28} 0 ${-6 - (temperature - 200) / 22} Q 12 ${-2 - (temperature - 200) / 28} 25 4 Z`}
                  fill={temperature > 460 ? "#c2410c" : "#2563eb"}
                  opacity="0.8"
                />
              )}
            </g>
          </svg>

          {/* 顶层透明 60FPS Canvas 渲染层 */}
          <canvas
            ref={canvasRef}
            width={420}
            height={220}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        </div>

        {/* 调节滑杆组：统一学术灰色系 */}
        <div className="mt-4 grid grid-cols-3 gap-2.5 text-xs font-mono">
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5">
            <div className="flex justify-between">
              <span className="text-[var(--gray)]">{de ? "Druck P" : "压强 P"}</span>
              <span className="font-bold text-[var(--ink)]">{pressure} bar</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
              className="mt-2 h-1 w-full cursor-pointer appearance-none rounded bg-[var(--line)] accent-[var(--ink)]"
            />
          </div>
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5">
            <div className="flex justify-between">
              <span className="text-[var(--gray)]">{de ? "Temp. T" : "温度 T"}</span>
              <span className="font-bold text-[var(--ink)]">{temperature} °C</span>
            </div>
            <input
              type="range"
              min={200}
              max={600}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="mt-2 h-1 w-full cursor-pointer appearance-none rounded bg-[var(--line)] accent-[var(--ink)]"
            />
          </div>
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5">
            <div className="flex justify-between">
              <span className="text-[var(--gray)]">{de ? "Edukt [N₂]" : "原料配比"}</span>
              <span className="font-bold text-[var(--ink)]">{eduktRatio}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={eduktRatio}
              onChange={(e) => setEduktRatio(Number(e.target.value))}
              className="mt-2 h-1 w-full cursor-pointer appearance-none rounded bg-[var(--line)] accent-[var(--ink)]"
            />
          </div>
        </div>
      </section>

      {/* 右侧 42% 苏格拉底追问流 */}
      <section className="flex flex-col justify-between rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:w-[42%]">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-mono text-[var(--gray)]">
            <span>{de ? `Frage ${cur + 1} von 4` : `苏格拉底追问 ${cur + 1} / 4`}</span>
            <div className="flex items-center gap-1">
              {done.map((d, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-3 rounded-full transition-colors ${
                    d
                      ? "bg-[var(--success)]"
                      : i === cur
                      ? "bg-[var(--ink)]"
                      : "bg-[var(--line)]"
                  }`}
                />
              ))}
            </div>
          </div>
          <h4 className="text-sm font-medium text-[var(--ink)] leading-snug">
            {de ? step.qDE : step.qZH}
          </h4>

          <div className="mt-4 space-y-2">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => pick(opt.id)}
                className={`w-full rounded border p-2.5 text-left text-xs transition ${
                  picked === opt.id
                    ? opt.id === step.correctId
                      ? "border-emerald-600 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-medium"
                      : "border-rose-600 bg-rose-500/10 text-rose-900 dark:text-rose-300"
                    : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                }`}
              >
                <span className="font-mono font-bold">{opt.id.toUpperCase()}. </span>
                <span>{de ? opt.de : opt.zh}</span>
              </button>
            ))}
          </div>

          {correct && (
            <div className="mt-4 rounded border border-emerald-600/30 bg-emerald-500/10 p-3 text-xs text-emerald-950 dark:text-emerald-200">
              <p className="font-semibold">{de ? "Korrekt!" : "论证严谨正确！"}</p>
              <p className="mt-1 leading-relaxed text-[var(--ink)]">{de ? step.explainDE : step.explainZH}</p>
              {cur < STEPS.length - 1 && (
                <button
                  onClick={next}
                  className="mt-3 rounded border border-[var(--ink)] bg-[var(--ink)] px-3 py-1.5 text-xs font-medium text-[var(--paper)] hover:opacity-90"
                >
                  {de ? "Nächste Frage" : "进入下一步追问 →"}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
