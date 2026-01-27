import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Target, TrendingUp, AlertCircle, Award, Star, Zap } from "lucide-react";
import { quizBlocks } from "@/data/quizQuestions";

interface QuizResultProps {
  answers: Record<number, number>;
  onRestart: () => void;
}

const QuizResult = ({ answers, onRestart }: QuizResultProps) => {
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
    <div className="h-[100dvh] flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/40 to-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-500/20 to-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-l from-emerald-500/10 to-transparent rounded-full blur-2xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Background Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={logo} alt="" className="w-[80vw] max-w-md opacity-[0.03] object-contain" />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10 px-4 py-5 safe-area-top safe-area-bottom">
        <div className="max-w-lg mx-auto space-y-4 animate-fade-in">
          
          {/* Header Card - Premium Glass Effect */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] animate-[shimmer_3s_ease-in-out_infinite]" />
            
            <div className="flex items-center gap-4 relative z-10">
              {/* Logo with glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
                <img src={logo} alt="Joga Junto" className="h-14 object-contain relative z-10 drop-shadow-lg" />
              </div>
              
              {/* Score Circle - Premium */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="none" className="text-white/10" />
                  <circle cx="40" cy="40" r="34" stroke="url(#scoreGradient)" strokeWidth="6" fill="none"
                    strokeDasharray={`${overallPercentage * 2.136} 213.6`} strokeLinecap="round" 
                    className="drop-shadow-lg transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white drop-shadow-lg">{overallPercentage}%</span>
                </div>
              </div>
              
              {/* Profile Level */}
              <div className="flex-1">
                <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Diagnóstico</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${profile.bgGradient} flex items-center justify-center shadow-lg ${profile.glowColor}`}>
                    <ProfileIcon className={`w-4 h-4 ${profile.color}`} />
                  </div>
                  <span className={`font-bold text-sm ${profile.color}`}>{profile.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block Scores - Premium Grid */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-sm text-white">Pontuação por Área</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {blockScores.map(({ block, percentage }) => (
                <div key={block.id} className="relative bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300">
                  {/* Progress bar background */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${blockColorMap[block.color].gradient} opacity-10`}
                    style={{ width: `${percentage}%` }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{block.emoji}</span>
                        <span className="text-xs font-semibold text-white/80 truncate max-w-[70px]">{block.title.split(' ')[0]}</span>
                      </div>
                      <span className={`text-xs font-black text-white bg-gradient-to-r ${blockColorMap[block.color].gradient} bg-clip-text text-transparent`}>{percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${blockColorMap[block.color].gradient} shadow-lg transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights - Premium Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-3 border border-emerald-400/30 shadow-lg shadow-emerald-500/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-400/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="font-bold text-emerald-400 text-xs">Ponto Forte</span>
                </div>
                <p className="text-xs text-white/80 font-medium leading-tight">{strongestArea.block.title.split('(')[0].trim()}</p>
                <p className="text-xl font-black text-emerald-400 mt-1">{strongestArea.percentage}%</p>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-xl rounded-2xl p-3 border border-orange-400/30 shadow-lg shadow-orange-500/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-400/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/30 flex items-center justify-center">
                    <Target className="w-3 h-3 text-orange-400" />
                  </div>
                  <span className="font-bold text-orange-400 text-xs">Área de Foco</span>
                </div>
                <p className="text-xs text-white/80 font-medium leading-tight">{weakestArea.block.title.split('(')[0].trim()}</p>
                <p className="text-xl font-black text-orange-400 mt-1">{weakestArea.percentage}%</p>
              </div>
            </div>
          </div>

          {/* Recommendation - Premium */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400/30 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Focar em <strong className="text-white font-semibold">{weakestArea.block.title}</strong> pode acelerar significativamente o desenvolvimento do atleta.
              </p>
            </div>
          </div>

          {/* Restart Button - Premium */}
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full h-14 text-base font-bold bg-gradient-to-r from-primary via-primary to-accent text-white hover:opacity-90 rounded-2xl shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <RefreshCw className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Refazer Diagnóstico</span>
          </Button>
          
          <p className="text-center text-xs text-white/30 pb-2">
            Powered by Joga Junto • Desenvolvimento de Atletas
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
