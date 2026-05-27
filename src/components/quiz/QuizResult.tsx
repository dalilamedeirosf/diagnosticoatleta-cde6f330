import { useEffect } from "react";
import confetti from "canvas-confetti";
import logo from "@/assets/craque-em-contrução1.png";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Target, TrendingUp, AlertCircle, Award, Star, Zap } from "lucide-react";
import { quizBlocks } from "@/data/quizQuestions";

interface QuizResultProps {
  answers: Record<number, number | number[]>;
  onRestart: () => void;
}

const QuizResult = ({ answers, onRestart }: QuizResultProps) => {
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
        <div className="min-h-full px-5 py-6 safe-area-top safe-area-bottom flex flex-col">
          <div className="max-w-lg mx-auto w-full flex flex-col gap-4 animate-fade-in flex-1">
            
            {/* Header - Premium Glass */}
            <div className="relative group">
              {/* Glow behind card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/40 via-gold/40 to-gold-600/40 rounded-3xl blur-xl opacity-50" />
              
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/20 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
                <div className="flex items-center gap-4">
                  {/* Score Circle - Neon effect */}
                  <div className="relative w-16 h-16 flex-shrink-0">
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
                      <span className="text-xl font-black text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">{overallPercentage}%</span>
                    </div>
                  </div>
                  
                  {/* Profile */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gold/80 uppercase tracking-[0.2em] font-semibold">Diagnóstico Completo</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <ProfileIcon className={`w-6 h-6 flex-shrink-0 ${profile.color} drop-shadow-[0_0_8px_currentColor]`} />
                      <span className={`font-bold text-lg ${profile.color} drop-shadow-[0_0_10px_currentColor]`}>{profile.level}</span>
                    </div>
                  </div>
                  
                  {/* Logo small */}
                  <img src={logo} alt="Craque em Construção" className="h-10 object-contain opacity-90 drop-shadow-md" />
                </div>
              </div>
                        {/* Block Scores Grid - Holographic */}
            <div className="relative flex-1">
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 via-transparent to-gold-600/30 rounded-3xl blur-xl opacity-30" />
              
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  <h3 className="font-bold text-sm text-white tracking-wide">Pontuação por Área</h3>
                </div>
                
                {/* Global Gradients for Radial Charts */}
                <svg className="absolute w-0 h-0 pointer-events-none">
                  <defs>
                    <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                    <linearGradient id="grad-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                    <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0EA5E9" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                    <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                    <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#FB923C" />
                    </linearGradient>
                    <linearGradient id="grad-red" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="100%" stopColor="#F87171" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="grid grid-cols-2 gap-3">
                  {blockScores.map(({ block, percentage }) => (
                    <div key={block.id} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${blockColorMap[block.color].gradient} rounded-xl blur-lg opacity-25`} />
                      <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 flex flex-col justify-between items-center text-center border border-white/15 shadow-lg min-h-[145px] hover:scale-[1.02] transition-transform">
                        
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">{block.emoji}</span>
                          <span className="text-xs font-bold text-white/95 leading-tight tracking-wide">{getShortTitle(block.title)}</span>
                        </div>
                        
                        {/* Radial Progress Chart */}
                        <div className="relative w-14 h-14 mt-1.5 flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                            <circle 
                              cx="20" 
                              cy="20" 
                              r="16" 
                              stroke="rgba(255,255,255,0.06)" 
                              strokeWidth="3.5" 
                              fill="none" 
                            />
                            <circle 
                              cx="20" 
                              cy="20" 
                              r="16" 
                              stroke={`url(#grad-${block.color})`}
                              strokeWidth="3.5" 
                              fill="none"
                              strokeDasharray={`${percentage * 1.0053} 100.53`} 
                              strokeLinecap="round" 
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[11px] font-black text-white">{percentage}%</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>       </div>

            {/* Insights - Neon Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl blur opacity-30" />
                <div className="relative bg-emerald-950/80 backdrop-blur-xl rounded-xl p-3 border border-emerald-400/40">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-emerald-400 text-xs tracking-wide">Ponto Forte</span>
                  </div>
                  <p className="text-xs text-emerald-100/80 font-medium">{strongestArea.block.emoji} {getShortTitle(strongestArea.block.title)}</p>
                  <p className="text-xl font-black text-emerald-400">{strongestArea.percentage}%</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl blur opacity-30" />
                <div className="relative bg-orange-950/80 backdrop-blur-xl rounded-xl p-3 border border-orange-400/40">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-orange-400 text-xs tracking-wide">Área de Foco</span>
                  </div>
                  <p className="text-xs text-orange-100/80 font-medium">{weakestArea.block.emoji} {getShortTitle(weakestArea.block.title)}</p>
                  <p className="text-xl font-black text-orange-400">{weakestArea.percentage}%</p>
                </div>
              </div>
            </div>

            {/* Recommendation - Holographic */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded-xl blur opacity-20" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-3 border border-amber-400/20">
                <div className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white/85 leading-relaxed font-medium">
                    Focar em <strong className="text-amber-300">{getShortTitle(weakestArea.block.title)}</strong> pode acelerar o desenvolvimento.
                  </p>
                </div>
              </div>
            </div>

            {/* Restart Button - Premium Neon */}
            <div className="relative group mt-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
              <Button 
                onClick={onRestart}
                size="lg"
                className="relative w-full h-14 text-base font-bold bg-gradient-to-r from-gold-400 via-gold to-gold-600 text-black hover:opacity-90 hover:text-black rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all active:scale-[0.98] border-0 [-webkit-appearance:none]"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refazer Diagnóstico
              </Button>
            </div>
            
            <p className="text-center text-xs text-gold/50 tracking-widest py-3 font-medium">
              Powered by Craque em Construção
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
