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

      {/* Full Screen Content */}
      <div className="flex-1 flex flex-col relative z-10 px-4 py-6 safe-area-top safe-area-bottom">
        <div className="max-w-lg mx-auto w-full flex-1 flex flex-col justify-between animate-fade-in">
          
          {/* Header */}
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Joga Junto" className="h-14 object-contain drop-shadow-lg" />
              
              {/* Score Circle */}
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
                    strokeDasharray={`${overallPercentage * 2.136} 213.6`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black text-white">{overallPercentage}%</span>
                </div>
              </div>
              
              {/* Profile */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Diagnóstico</p>
                <div className="flex items-center gap-2 mt-1">
                  <ProfileIcon className={`w-5 h-5 ${profile.color}`} />
                  <span className={`font-bold text-lg ${profile.color}`}>{profile.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block Scores Grid - Expanded */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 flex-1 my-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-sm text-white">Pontuação por Área</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3 flex-1">
              {blockScores.map(({ block, percentage }) => (
                <div key={block.id} className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center border border-white/10">
                  <span className="text-2xl mb-2">{block.emoji}</span>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${blockColorMap[block.color].gradient}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-white mt-2">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-emerald-500/20 backdrop-blur rounded-xl p-4 border border-emerald-400/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-emerald-400 text-xs">Ponto Forte</span>
              </div>
              <p className="text-xs text-white/70 mb-1">{strongestArea.block.title.split('(')[0].trim()}</p>
              <p className="text-2xl font-black text-emerald-400">{strongestArea.percentage}%</p>
            </div>
            
            <div className="bg-orange-500/20 backdrop-blur rounded-xl p-4 border border-orange-400/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-orange-400 text-xs">Área de Foco</span>
              </div>
              <p className="text-xs text-white/70 mb-1">{weakestArea.block.title.split('(')[0].trim()}</p>
              <p className="text-2xl font-black text-orange-400">{weakestArea.percentage}%</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 mb-4">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-sm text-white/80 leading-relaxed">
                Focar em <strong className="text-white">{weakestArea.block.title}</strong> pode acelerar o desenvolvimento.
              </p>
            </div>
          </div>

          {/* Restart Button */}
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full h-14 text-base font-bold bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 rounded-xl shadow-xl transition-all active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refazer Diagnóstico
          </Button>
          
          <p className="text-center text-xs text-white/30 mt-3">
            Powered by Joga Junto
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
