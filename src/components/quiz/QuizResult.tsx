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
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/40 to-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-500/20 to-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={logo} alt="" className="w-[70vw] max-w-sm opacity-[0.03] object-contain" />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10 px-4 py-4 safe-area-top safe-area-bottom">
        <div className="max-w-md mx-auto space-y-3 animate-fade-in">
          
          {/* Header - Compact */}
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Joga Junto" className="h-10 object-contain drop-shadow-lg" />
              
              {/* Score Circle */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                  <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="none" className="text-white/10" />
                  <circle cx="32" cy="32" r="26" stroke="url(#scoreGradient)" strokeWidth="5" fill="none"
                    strokeDasharray={`${overallPercentage * 1.634} 163.4`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-black text-white">{overallPercentage}%</span>
                </div>
              </div>
              
              {/* Profile */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Diagnóstico</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <ProfileIcon className={`w-4 h-4 ${profile.color}`} />
                  <span className={`font-bold text-sm ${profile.color} truncate`}>{profile.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block Scores Grid */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-xs text-white">Pontuação por Área</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5">
              {blockScores.map(({ block, percentage }) => (
                <div key={block.id} className="bg-white/5 rounded-lg p-2 text-center">
                  <span className="text-lg">{block.emoji}</span>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-1 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${blockColorMap[block.color].gradient}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-white/80 mt-1 block">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights - Compact */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-500/20 backdrop-blur rounded-xl p-2.5 border border-emerald-400/30">
              <div className="flex items-center gap-1 mb-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span className="font-bold text-emerald-400 text-[10px]">Ponto Forte</span>
              </div>
              <p className="text-[10px] text-white/70 truncate">{strongestArea.block.title.split('(')[0].trim()}</p>
              <p className="text-lg font-black text-emerald-400">{strongestArea.percentage}%</p>
            </div>
            
            <div className="bg-orange-500/20 backdrop-blur rounded-xl p-2.5 border border-orange-400/30">
              <div className="flex items-center gap-1 mb-1">
                <Target className="w-3 h-3 text-orange-400" />
                <span className="font-bold text-orange-400 text-[10px]">Área de Foco</span>
              </div>
              <p className="text-[10px] text-white/70 truncate">{weakestArea.block.title.split('(')[0].trim()}</p>
              <p className="text-lg font-black text-orange-400">{weakestArea.percentage}%</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/70 leading-relaxed">
                Focar em <strong className="text-white">{weakestArea.block.title}</strong> pode acelerar o desenvolvimento.
              </p>
            </div>
          </div>

          {/* Restart Button */}
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full h-12 text-sm font-bold bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 rounded-xl shadow-xl transition-all active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refazer Diagnóstico
          </Button>
          
          <p className="text-center text-[10px] text-white/30 pb-1">
            Powered by Joga Junto
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
