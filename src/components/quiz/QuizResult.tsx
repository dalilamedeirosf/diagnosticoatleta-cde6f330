import { useEffect } from "react";
import confetti from "canvas-confetti";
import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Target, TrendingUp, AlertCircle, Award, Star, Zap } from "lucide-react";
import { quizBlocks } from "@/data/quizQuestions";

interface QuizResultProps {
  answers: Record<number, number>;
  onRestart: () => void;
}

const QuizResult = ({ answers, onRestart }: QuizResultProps) => {
  // Fire confetti on mount
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

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
      return acc + (answers[q.id] || 0);
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
    if (overallPercentage >= 80) return { level: "Excelente", icon: Trophy, color: "text-emerald-400", bgGradient: "from-emerald-500/30 to-emerald-600/20", borderColor: "border-emerald-400/50", glowColor: "shadow-emerald-500/30" };
    if (overallPercentage >= 60) return { level: "Bom", icon: TrendingUp, color: "text-sky-400", bgGradient: "from-sky-500/30 to-sky-600/20", borderColor: "border-sky-400/50", glowColor: "shadow-sky-500/30" };
    if (overallPercentage >= 40) return { level: "Em Desenvolvimento", icon: Target, color: "text-amber-400", bgGradient: "from-amber-500/30 to-amber-600/20", borderColor: "border-amber-400/50", glowColor: "shadow-amber-500/30" };
    return { level: "Precisa de Atenção", icon: AlertCircle, color: "text-orange-400", bgGradient: "from-orange-500/30 to-orange-600/20", borderColor: "border-orange-400/50", glowColor: "shadow-orange-500/30" };
  };

  const profile = getProfileLevel();
  const ProfileIcon = profile.icon;

  // Find weakest and strongest areas
  const weakestArea = [...blockScores].sort((a, b) => a.percentage - b.percentage)[0];
  const strongestArea = [...blockScores].sort((a, b) => b.percentage - a.percentage)[0];

  const blockColorMap: Record<string, { bg: string; gradient: string }> = {
    green: { bg: "bg-emerald-500", gradient: "from-emerald-400 to-emerald-600" },
    yellow: { bg: "bg-amber-500", gradient: "from-amber-400 to-amber-600" },
    blue: { bg: "bg-sky-500", gradient: "from-sky-400 to-sky-600" },
    purple: { bg: "bg-violet-500", gradient: "from-violet-400 to-violet-600" },
    orange: { bg: "bg-orange-500", gradient: "from-orange-400 to-orange-600" },
    red: { bg: "bg-rose-500", gradient: "from-rose-400 to-rose-600" },
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#020617_50%,_#000000_100%)] relative overflow-hidden">
      {/* VR Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs with glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/30 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-violet-600/40 to-fuchsia-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-emerald-500/30 to-cyan-500/20 rounded-full blur-3xl" />
        
        {/* Grid overlay - VR style */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }} />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full" />
        
        {/* Logo watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={logo} alt="" className="w-[60vw] max-w-xs opacity-[0.02] object-contain" />
        </div>
      </div>

      {/* Full Screen Content */}
      <div className="flex-1 flex flex-col relative z-10 px-4 py-6 safe-area-top safe-area-bottom">
        <div className="max-w-lg mx-auto w-full flex-1 flex flex-col justify-between animate-fade-in">
          
          {/* Header - Premium Glass */}
          <div className="relative group">
            {/* Glow behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-violet-500/50 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            
            <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl p-5 border border-white/20 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
              <div className="flex items-center gap-4">
                <img src={logo} alt="Joga Junto" className="h-14 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                
                {/* Score Circle - Neon effect */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-40 animate-pulse" />
                  <svg className="w-full h-full transform -rotate-90 relative z-10">
                    <defs>
                      <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
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
                    <span className="text-2xl font-black text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">{overallPercentage}%</span>
                  </div>
                </div>
                
                {/* Profile */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-cyan-300/70 uppercase tracking-[0.2em] font-medium">Diagnóstico</p>
                  <div className="flex items-center gap-2 mt-1">
                    <ProfileIcon className={`w-5 h-5 ${profile.color} drop-shadow-[0_0_8px_currentColor]`} />
                    <span className={`font-bold text-lg ${profile.color} drop-shadow-[0_0_10px_currentColor]`}>{profile.level}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block Scores Grid - Holographic */}
          <div className="relative my-4 flex-1 flex flex-col">
            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/30 via-transparent to-violet-500/30 rounded-3xl blur-xl opacity-30" />
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <h3 className="font-bold text-sm text-white tracking-wide">Pontuação por Área</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 flex-1">
                {blockScores.map(({ block, percentage }) => (
                  <div key={block.id} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${blockColorMap[block.color].gradient} rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity`} />
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 rounded-xl p-3 flex flex-col border border-white/15 transition-all hover:scale-[1.02] hover:border-white/25 shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{block.emoji}</span>
                        <span className="text-xs font-semibold text-white/90 leading-tight flex-1">{block.title.split('(')[0].trim()}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-auto">
                        <div className="flex-1 bg-black/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${blockColorMap[block.color].gradient} shadow-[0_0_10px_currentColor]`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className={`text-sm font-black bg-gradient-to-r ${blockColorMap[block.color].gradient} bg-clip-text text-transparent drop-shadow-lg`}>{percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights - Neon Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-emerald-950/80 backdrop-blur-xl rounded-xl p-4 border border-emerald-400/40">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="font-bold text-emerald-400 text-xs tracking-wide">Ponto Forte</span>
                </div>
                <p className="text-xs text-emerald-100/70 mb-1">{strongestArea.block.title.split('(')[0].trim()}</p>
                <p className="text-2xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]">{strongestArea.percentage}%</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-orange-950/80 backdrop-blur-xl rounded-xl p-4 border border-orange-400/40">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                  <span className="font-bold text-orange-400 text-xs tracking-wide">Área de Foco</span>
                </div>
                <p className="text-xs text-orange-100/70 mb-1">{weakestArea.block.title.split('(')[0].trim()}</p>
                <p className="text-2xl font-black text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]">{weakestArea.percentage}%</p>
              </div>
            </div>
          </div>

          {/* Recommendation - Holographic */}
          <div className="relative mb-4">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded-xl blur opacity-20" />
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-amber-400/20">
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-400 flex-shrink-0 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                <p className="text-sm text-white/80 leading-relaxed">
                  Focar em <strong className="text-amber-300">{weakestArea.block.title}</strong> pode acelerar o desenvolvimento.
                </p>
              </div>
            </div>
          </div>

          {/* Restart Button - Premium Neon */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
            <Button 
              onClick={onRestart}
              size="lg"
              className="relative w-full h-14 text-base font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white hover:opacity-90 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all active:scale-[0.98] border-0"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refazer Diagnóstico
            </Button>
          </div>
          
          <p className="text-center text-xs text-cyan-400/40 mt-3 tracking-wider">
            Powered by Joga Junto
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
