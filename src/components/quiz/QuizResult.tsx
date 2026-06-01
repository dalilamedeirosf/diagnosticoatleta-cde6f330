import { useEffect } from "react";
import confetti from "canvas-confetti";
import logo from "@/assets/craque-em-contrução1.png";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Target, TrendingUp, AlertCircle, Star, Zap, Bookmark } from "lucide-react";
import { quizBlocks } from "@/data/quizQuestions";

interface QuizResultProps {
  answers: Record<number, number | number[]>;
  athleteName: string;
  onRestart: () => void;
}

const CHECKOUT_URL = "https://pay.hotmart.com/D106090076A";

const blockHexColors: Record<string, string> = {
  green: "#10B981",
  yellow: "#F59E0B",
  blue: "#0EA5E9",
  purple: "#8B5CF6",
  orange: "#F97316",
  red: "#EF4444",
};

const blockColors: Record<string, { main: string; text: string; bg: string; gradient: string }> = {
  green: { main: "#10B981", text: "text-emerald-400", bg: "bg-emerald-500", gradient: "from-emerald-400 to-emerald-600" },
  yellow: { main: "#F59E0B", text: "text-amber-400", bg: "bg-amber-500", gradient: "from-amber-400 to-amber-600" },
  blue: { main: "#0EA5E9", text: "text-sky-400", bg: "bg-sky-500", gradient: "from-sky-400 to-sky-600" },
  purple: { main: "#8B5CF6", text: "text-violet-400", bg: "bg-violet-500", gradient: "from-violet-400 to-violet-600" },
  orange: { main: "#F97316", text: "text-orange-400", bg: "bg-orange-500", gradient: "from-orange-400 to-orange-600" },
  red: { main: "#EF4444", text: "text-rose-400", bg: "bg-rose-500", gradient: "from-rose-400 to-rose-600" },
};

const Sparkline = ({ values, color, id }: { values: number[]; color: string; id: string }) => {
  if (values.length === 0) return null;
  const width = 100;
  const height = 24;
  const paddingX = 4;
  const paddingY = 4;
  const chartWidth = width - 2 * paddingX;
  const chartHeight = height - 2 * paddingY;

  const points = values.map((val, i) => {
    const x = paddingX + (i / (values.length - 1)) * chartWidth;
    const y = height - paddingY - (val / 100) * chartHeight;
    return { x, y };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const fillD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  return (
    <svg className="w-full h-8 overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sparklineGlow-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* Fill Area */}
      <path d={fillD} fill={`url(#sparklineGlow-${id})`} />
      {/* Stroke Line */}
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="1.8" fill={color} stroke="#050B14" strokeWidth="0.5" />
      ))}
    </svg>
  );
};

const RadarChart = ({ scores }: { scores: { title: string; percentage: number; color: string }[] }) => {
  const cx = 80;
  const cy = 80;
  const r = 46;
  const axesCount = 6;

  // Angles for the 6 axes: Perfil, Performance, Familia, Objetivos, Rotina, Mentalidade
  const angles = Array.from({ length: axesCount }, (_, i) => -Math.PI / 2 + (i * Math.PI) / 3);

  // Map scores to the standard ordering matching the image starting from top clockwise:
  // 1. Perfil
  // 2. Performance
  // 3. Família
  // 4. Objetivos
  // 5. Rotina
  // 6. Mentalidade
  const orderedKeys = ["Perfil", "Performance", "Família", "Objetivos", "Rotina", "Mentalidade"];
  
  const orderedScores = orderedKeys.map((key) => {
    const matched = scores.find((s) => s.title.toLowerCase().includes(key.toLowerCase().split('(')[0].trim().toLowerCase()));
    return matched || { title: key, percentage: 50, color: "green" };
  });

  // Generate background rings (5 levels: 20%, 40%, 60%, 80%, 100%)
  const rings = [1, 2, 3, 4, 5].map((level) => {
    const radius = (level / 5) * r;
    return angles.map((angle) => {
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  });

  // User polygon points
  const userPoints = orderedScores.map((score, i) => {
    const radius = (score.percentage / 100) * r;
    const x = cx + radius * Math.cos(angles[i]);
    const y = cy + radius * Math.sin(angles[i]);
    return { x, y, color: blockHexColors[score.color] || "#D4AF37" };
  });

  const userPolygonPointsStr = userPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // Labels positioning offsets for cx=80, cy=80, r=46
  const labelOffsets = [
    { x: cx, y: cy - r - 8, anchor: "middle" }, // Perfil
    { x: cx + (r + 10) * Math.cos(angles[1]), y: cy + (r + 10) * Math.sin(angles[1]) + 3, anchor: "start" }, // Performance
    { x: cx + (r + 10) * Math.cos(angles[2]), y: cy + (r + 10) * Math.sin(angles[2]) + 4, anchor: "start" }, // Familia
    { x: cx, y: cy + r + 13, anchor: "middle" }, // Objetivos
    { x: cx + (r + 10) * Math.cos(angles[4]), y: cy + (r + 10) * Math.sin(angles[4]) + 4, anchor: "end" }, // Rotina
    { x: cx + (r + 10) * Math.cos(angles[5]), y: cy + (r + 10) * Math.sin(angles[5]) + 3, anchor: "end" }, // Mentalidade
  ];

  return (
    <div className="relative w-[170px] h-[170px] mx-auto flex-shrink-0 flex items-center justify-center">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 160 160">
        <defs>
          <radialGradient id="radarRadialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* Outer Glow */}
        <circle cx={cx} cy={cy} r={r} fill="url(#radarRadialGlow)" />

        {/* Grid Rings */}
        {rings.map((ringPoints, idx) => (
          <polygon
            key={idx}
            points={ringPoints}
            fill="none"
            stroke="rgba(212, 175, 55, 0.18)"
            strokeWidth="0.8"
          />
        ))}

        {/* Center Grid Lines */}
        {angles.map((angle, idx) => {
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(212, 175, 55, 0.18)"
              strokeWidth="0.8"
              strokeDasharray="2,2"
            />
          );
        })}

        {/* User Data Area */}
        <polygon
          points={userPolygonPointsStr}
          fill="rgba(212, 175, 55, 0.2)"
          stroke="#D4AF37"
          strokeWidth="1.5"
          className="drop-shadow-[0_0_5px_rgba(212,175,55,0.35)]"
        />

        {/* User Data Dots */}
        {userPoints.map((p, idx) => (
          <circle
            key={idx}
            cx={p.x}
            cy={p.y}
            r="2.8"
            fill={p.color}
            stroke="#050B14"
            strokeWidth="0.6"
            className="drop-shadow-[0_0_3px_currentColor]"
          />
        ))}

        {/* Axis Labels */}
        {labelOffsets.map((offset, idx) => (
          <text
            key={idx}
            x={offset.x}
            y={offset.y}
            textAnchor={offset.anchor}
            className="text-[9.5px] font-extrabold fill-white/95 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
          >
            {orderedKeys[idx]}
          </text>
        ))}
      </svg>
    </div>
  );
};

const getRecommendationText = (blockTitle: string) => {
  const title = blockTitle.toLowerCase();
  if (title.includes("perfil")) return "Aprimorar a estrutura inicial do Perfil pode desbloquear novos níveis de desenvolvimento.";
  if (title.includes("performance") || title.includes("jogo")) return "Potencializar a Performance em campo pode desbloquear novos níveis de desenvolvimento.";
  if (title.includes("mentalidade") || title.includes("competitividade")) return "Fortalecer a Mentalidade competitiva pode desbloquear novos níveis de desenvolvimento.";
  if (title.includes("familiar") || title.includes("família")) return "Reforçar os laços e o suporte em Família pode desbloquear novos níveis de desenvolvimento.";
  if (title.includes("rotina") || title.includes("suporte")) return "Ajustar a Rotina e os hábitos de suporte pode desbloquear novos níveis de desenvolvimento.";
  if (title.includes("direção") || title.includes("objetivo")) return "Alinhar a Direção e os Objetivos do atleta pode desbloquear novos níveis de desenvolvimento.";
  return `Focar em ${blockTitle} pode acelerar o desenvolvimento.`;
};

const generatePersuasiveText = (athleteName: string, overallScore: number) => {
  return `Como responsável pelo atleta ${athleteName}, você acaba de dar um passo fundamental para o futuro dele no futebol. 🚀 Os gráficos e o radar acima mostram uma visão geral e clara sobre o momento atual do atleta na base (com um resultado geral de ${overallScore}%), mas a verdade é que existem detalhes fundamentais sobre o desempenho dele que não aparecem de forma simples nos números. 📊

Seu filho possui pontos fortes ocultos e potenciais de evolução que precisam ser trabalhados com precisão. Da mesma forma, existem pequenos bloqueios silenciosos na mentalidade, rotina ou leitura de jogo que podem travar a transição dele para grandes clubes se não forem corrigidos a tempo. 🧠⚡

Cada comportamento em campo e detalhe de suporte familiar fazem a diferença. Queremos te mostrar exatamente o que está limitando ou impulsionando o desenvolvimento do ${athleteName}. Para acelerar essa evolução e prepará-lo de verdade, é indispensável analisar as entrelinhas e agir com um plano direcionado. 📈🎯`;
};

const QuizResult = ({ answers, athleteName, onRestart }: QuizResultProps) => {
  // Fire confetti on mount
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#D4AF37', '#B08A27', '#FDFDF3', '#FFFFFF', '#CA8A04'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: colors,
    });

    frame();
  }, []);

  // Calculate scores per block
  const blockScores = quizBlocks.map((block) => {
    const blockQuestions = block.questions;
    const maxPossible = blockQuestions.reduce((acc, q) => {
      const maxOption = Math.max(...q.options.map(o => o.value));
      return acc + maxOption;
    }, 0);
    
    const actual = blockQuestions.reduce((acc, q) => {
      const ans = answers[q.id];
      if (Array.isArray(ans)) {
        return acc + ans.reduce((s, v) => s + v, 0);
      }
      return acc + (ans || 0);
    }, 0);
    
    return {
      block,
      score: actual,
      maxScore: maxPossible,
      percentage: maxPossible > 0 ? Math.round((actual / maxPossible) * 100) : 0,
    };
  });

  // Calculate overall score
  const totalScore = blockScores.reduce((acc, b) => acc + b.score, 0);
  const maxTotalScore = blockScores.reduce((acc, b) => acc + b.maxScore, 0);
  const overallPercentage = Math.round((totalScore / maxTotalScore) * 100);

  // Determine profile level
  const getProfileLevel = () => {
    if (overallPercentage >= 80) return { level: "Avançado", icon: Trophy, color: "text-amber-400" };
    if (overallPercentage >= 60) return { level: "Bom", icon: TrendingUp, color: "text-sky-400" };
    if (overallPercentage >= 40) return { level: "Em Desenvolvimento", icon: Target, color: "text-amber-400" };
    return { level: "Precisa de Atenção", icon: AlertCircle, color: "text-orange-400" };
  };

  const profile = getProfileLevel();
  const ProfileIcon = profile.icon;

  // Find weakest and strongest areas
  const weakestArea = [...blockScores].sort((a, b) => a.percentage - b.percentage)[0];
  const strongestArea = [...blockScores].sort((a, b) => b.percentage - a.percentage)[0];

  // Shortened titles for mobile display
  const shortTitles: Record<string, string> = {
    "Perfil do Atleta": "Perfil",
    "Jogo e Performance": "Performance",
    "Mentalidade e Competitividade": "Mentalidade",
    "Ambiente Familiar": "Família",
    "Rotina e Suporte": "Rotina",
    "Direção e Objetivo": "Objetivos"
  };

  const getShortTitle = (title: string) => shortTitles[title.split('(')[0].trim()] || title.split('(')[0].trim();

  return (
    <div className="h-[100dvh] flex flex-col bg-[#050B14] relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

      {/* Subtle Navy Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light/20 via-transparent to-black pointer-events-none" />

      {/* VR Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs with glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-gold/20 via-gold-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-gold-500/20 to-gold-700/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-gold/15 to-gold-600/10 rounded-full blur-3xl" />
        
        {/* Grid overlay - VR style */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
        
        {/* Logo watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={logo} alt="" className="w-[60vw] max-w-xs opacity-[0.02] object-contain" />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 [-webkit-overflow-scrolling:touch]">
        <div className="min-h-full px-4 py-5 safe-area-top safe-area-bottom flex flex-col">
          <div className="max-w-lg mx-auto w-full flex flex-col gap-4 animate-fade-in flex-1">
            
            {/* Header - Premium Glass */}
            <div className="relative group">
              {/* Glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/40 via-gold/40 to-gold-600/40 rounded-3xl blur-xl opacity-50" />
              
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/20 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
                <div className="flex items-center justify-between gap-4">
                  {/* Profile Details (Left) */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-gold/80 uppercase tracking-[0.2em] font-semibold">Exemplo de Diagnóstico Completo</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <ProfileIcon className={`w-5 h-5 flex-shrink-0 ${profile.color} drop-shadow-[0_0_8px_currentColor]`} />
                      <span className={`font-black text-lg ${profile.color} drop-shadow-[0_0_10px_currentColor]`}>{profile.level}</span>
                    </div>
                  </div>
                  
                  {/* Score Circle - Neon effect (Right) */}
                  <div className="relative w-14 h-14 flex-shrink-0">
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full blur-lg opacity-40 animate-pulse" />
                    <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 80 80">
                      <defs>
                        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FDE047" />
                          <stop offset="50%" stopColor="#D4AF37" />
                          <stop offset="100%" stopColor="#B08A27" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                      <circle cx="40" cy="40" r="34" stroke="url(#neonGradient)" strokeWidth="6" fill="none"
                        strokeDasharray={`${overallPercentage * 2.136} 213.6`} strokeLinecap="round" filter="url(#glow)" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base font-black text-white drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">{overallPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Block Scores Grid - Holographic */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 via-transparent to-gold-600/30 rounded-3xl blur-xl opacity-30" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-2 mb-3">
                  <Bookmark className="w-5 h-5 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  <h3 className="font-bold text-sm text-white tracking-wide">Pontuação por Área</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {blockScores.map(({ block, percentage }) => {
                    // Compute values for sparkline
                    const blockQuestions = block.questions;
                    const values = blockQuestions.map((q) => {
                      const ans = answers[q.id];
                      const maxOption = Math.max(...q.options.map(o => o.value));
                      const minOption = Math.min(...q.options.map(o => o.value));
                      
                      let actual = 0;
                      if (Array.isArray(ans)) {
                        actual = ans.reduce((s, v) => s + v, 0);
                      } else {
                        actual = ans || 0;
                      }
                      
                      const range = maxOption - minOption;
                      if (range <= 0) return 50;
                      if (ans === undefined) return 50;
                      
                      const pct = Math.round(((actual - minOption) / range) * 100);
                      return Math.max(0, Math.min(100, pct));
                    });

                    return (
                      <div key={block.id} className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-br ${blockColors[block.color].gradient} rounded-xl blur-lg opacity-10`} />
                        <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 flex flex-col justify-between border border-white/15 shadow-lg min-h-[85px] hover:scale-[1.02] transition-transform">
                          
                          {/* Title and Color Circle Dot */}
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${blockColors[block.color].bg} shadow-[0_0_6px_currentColor]`} />
                            <span className="text-[11px] font-bold text-white/95 leading-tight tracking-wide">{getShortTitle(block.title)}</span>
                          </div>
                          
                          {/* Graph Sparkline and Percentage Value */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <Sparkline values={values} color={blockHexColors[block.color]} id={block.id.toString()} />
                            </div>
                            <span className={`text-sm font-black ${blockColors[block.color].text} shrink-0`}>
                              {percentage}%
                            </span>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Visão Geral do Perfil (Radar) - Glass Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-transparent to-gold-600/20 rounded-3xl blur-xl opacity-30" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-5 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <h4 className="text-[10px] font-black text-gold/90 tracking-[0.15em] text-center uppercase mb-4">
                  Visão Geral do Perfil (Radar)
                </h4>

                {/* Row: Ponto Forte, Radar Chart, Área de Foco */}
                <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
                  {/* Ponto Forte Card (Left) */}
                  <div className="flex-1 max-w-[125px] sm:max-w-[135px] relative group shrink-0">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl blur opacity-35" />
                    <div className="relative bg-emerald-950/90 backdrop-blur-xl rounded-xl p-3 border border-emerald-400/40 text-left min-h-[105px] flex flex-col justify-between shadow-lg">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-extrabold text-emerald-400 text-[10px] tracking-wider uppercase shrink-0">Ponto Forte</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`w-2 h-2 rounded-full ${blockColors[strongestArea.block.color].bg} shadow-[0_0_6px_currentColor]`} />
                          <p className="text-xs text-white font-extrabold leading-tight truncate">
                            {getShortTitle(strongestArea.block.title)}
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-black text-emerald-400 leading-none mt-2 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]">
                        {strongestArea.percentage}%
                      </p>
                    </div>
                  </div>

                  {/* Radar Chart (Center) */}
                  <div className="flex-shrink-0">
                    <RadarChart scores={blockScores.map(b => ({ title: b.block.title, percentage: b.percentage, color: b.block.color }))} />
                  </div>

                  {/* Área de Foco Card (Right) */}
                  <div className="flex-1 max-w-[125px] sm:max-w-[135px] relative group shrink-0">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl blur opacity-35" />
                    <div className="relative bg-orange-950/90 backdrop-blur-xl rounded-xl p-3 border border-orange-400/40 text-left min-h-[105px] flex flex-col justify-between shadow-lg">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Target className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                          <span className="font-extrabold text-orange-400 text-[10px] tracking-wider uppercase shrink-0">Área de Foco</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`w-2 h-2 rounded-full ${blockColors[weakestArea.block.color].bg} shadow-[0_0_6px_currentColor]`} />
                          <p className="text-xs text-white font-extrabold leading-tight truncate">
                            {getShortTitle(weakestArea.block.title)}
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-black text-orange-400 leading-none mt-2 drop-shadow-[0_0_6px_rgba(249,115,22,0.4)]">
                        {weakestArea.percentage}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation - Holographic */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-amber-500/30 rounded-xl blur opacity-20" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-3.5 border border-amber-400/20 shadow-md">
                <div className="flex items-start gap-2.5">
                  <Star className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                  <p className="text-xs text-white/90 leading-relaxed font-semibold text-left">
                    {getRecommendationText(weakestArea.block.title)}
                  </p>
                </div>
              </div>
            </div>

            {/* Persuasive Text Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/10 to-gold-600/10 rounded-2xl blur-md opacity-30" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-white/10 text-white/90 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-semibold shadow-xl text-left">
                {generatePersuasiveText(athleteName, overallPercentage)}
              </div>
            </div>

            {/* Comparison & Benefits Section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-transparent to-gold-600/20 rounded-2xl blur-xl opacity-20" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-5 border border-white/15 shadow-xl flex flex-col gap-4">
                {/* What is NOT shown */}
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-orange-400 flex items-center gap-1.5 mb-2.5 uppercase tracking-wide">
                    <span>⚠️</span> O que este diagnóstico gratuito NÃO mostra sobre {athleteName}:
                  </h4>
                  <ul className="flex flex-col gap-2 pl-2">
                    <li className="text-[11px] sm:text-xs text-white/85 flex items-start gap-2 font-semibold">
                      <span className="text-orange-400 shrink-0 mt-0.5">•</span>
                      <span>Os fatores específicos que podem estar limitando sua evolução esportiva.</span>
                    </li>
                    <li className="text-[11px] sm:text-xs text-white/85 flex items-start gap-2 font-semibold">
                      <span className="text-orange-400 shrink-0 mt-0.5">•</span>
                      <span>Os comportamentos identificados em cada área avaliada.</span>
                    </li>
                    <li className="text-[11px] sm:text-xs text-white/85 flex items-start gap-2 font-semibold">
                      <span className="text-orange-400 shrink-0 mt-0.5">•</span>
                      <span>Os pontos fortes que podem ser potencializados com maior intensidade.</span>
                    </li>
                  </ul>
                </div>

                {/* Horizontal Divider */}
                <div className="h-px bg-white/10 w-full" />

                {/* What the complete report shows */}
                <div className="text-left">
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1.5 mb-3 uppercase tracking-wide">
                    <span>🔎</span> Receba o Relatório Completo Personalizado:
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      "Diagnóstico detalhado de cada área avaliada",
                      "Principais talentos e potencialidades identificadas",
                      "Pontos de atenção e possíveis bloqueios de desempenho",
                      "Análise comportamental e perfil esportivo do atleta",
                      "Avaliação da mentalidade competitiva"
                    ].map((benefit, idx) => (
                      <li key={idx} className="text-[11px] sm:text-xs text-white/90 flex items-center gap-2 font-semibold">
                        <span className="text-emerald-400 shrink-0">✅</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-gold/80 italic mt-3 font-bold tracking-wider uppercase pl-6">
                    E muito mais...
                  </p>
                </div>
              </div>
            </div>

            {/* Offer Card & Checkout CTA */}
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-2xl blur-lg opacity-40 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-5 border border-[#d4af37]/45 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col gap-4 text-center">
                
                <div className="flex items-start gap-2.5 text-left bg-black/40 rounded-xl p-3.5 border border-white/5">
                  <span className="text-xl shrink-0">📱</span>
                  <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed font-bold">
                    Relatório elaborado manualmente por nossa equipe e entregue diretamente no WhatsApp em até 3 horas.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-black">Investimento</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gold text-lg shrink-0">💰</span>
                    <span className="text-2xl font-black text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">5x de R$ 12,62</span>
                  </div>
                </div>

                {/* Buy Button */}
                <div className="relative group mt-1">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
                  <Button 
                    onClick={() => window.open(CHECKOUT_URL, "_blank")}
                    size="lg"
                    className="relative w-full h-14 text-[10px] sm:text-xs font-black bg-gradient-to-r from-gold-400 via-gold to-gold-600 text-black hover:opacity-95 hover:text-black rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all active:scale-[0.98] border-0 flex items-center justify-center gap-2 uppercase tracking-wide"
                  >
                    <span>🚀</span> Quero o Relatório Completo do Atleta por 5x de 12,62
                  </Button>
                </div>

              </div>
            </div>
            
            {/* Footer */}
            <div className="flex flex-col items-center gap-1 py-1">
              <p className="text-center text-[10px] text-gold/50 tracking-widest font-semibold">
                Powered by Craque em Construção
              </p>
              <p className="text-center text-[8px] text-white/30 italic">
                *Este é um exemplo de simulação de dados para fins de demonstração.*
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
