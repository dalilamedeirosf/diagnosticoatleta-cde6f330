import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Target, TrendingUp, AlertCircle, Award } from "lucide-react";
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
    if (overallPercentage >= 80) return { level: "Excelente", icon: Trophy, color: "text-quiz-green", bgColor: "bg-quiz-green/20", borderColor: "border-quiz-green/50" };
    if (overallPercentage >= 60) return { level: "Bom", icon: TrendingUp, color: "text-quiz-blue", bgColor: "bg-quiz-blue/20", borderColor: "border-quiz-blue/50" };
    if (overallPercentage >= 40) return { level: "Em Desenvolvimento", icon: Target, color: "text-quiz-yellow", bgColor: "bg-quiz-yellow/20", borderColor: "border-quiz-yellow/50" };
    return { level: "Precisa de Atenção", icon: AlertCircle, color: "text-quiz-orange", bgColor: "bg-quiz-orange/20", borderColor: "border-quiz-orange/50" };
  };

  const profile = getProfileLevel();
  const ProfileIcon = profile.icon;

  // Find weakest and strongest areas
  const weakestArea = [...blockScores].sort((a, b) => a.percentage - b.percentage)[0];
  const strongestArea = [...blockScores].sort((a, b) => b.percentage - a.percentage)[0];

  const blockColorMap: Record<string, string> = {
    green: "bg-quiz-green",
    yellow: "bg-quiz-yellow",
    blue: "bg-quiz-blue",
    purple: "bg-quiz-purple",
    orange: "bg-quiz-orange",
    red: "bg-quiz-red",
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary-foreground/20 to-accent/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-[400px] h-[400px] bg-gradient-to-tr from-accent/20 to-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={logo} alt="" className="w-[70vw] max-w-sm opacity-[0.04] object-contain" />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto relative z-10 px-4 py-4 safe-area-top safe-area-bottom">
        <div className="max-w-lg mx-auto space-y-4">
          
          {/* Header with Logo and Score */}
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-4 border border-border shadow-xl">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <img src={logo} alt="Joga Junto" className="h-12 object-contain" />
              
              {/* Score Circle */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="none" className="text-muted" />
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="5" fill="none"
                    strokeDasharray={`${overallPercentage * 1.76} 176`} strokeLinecap="round" className="text-primary transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{overallPercentage}%</span>
                </div>
              </div>
              
              {/* Profile Level */}
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Diagnóstico</p>
                <div className="flex items-center gap-2">
                  <ProfileIcon className={`w-5 h-5 ${profile.color}`} />
                  <span className={`font-bold ${profile.color}`}>{profile.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block Scores - Compact Grid */}
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-4 border border-border shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-foreground">Pontuação por Área</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {blockScores.map(({ block, percentage }) => (
                <div key={block.id} className="bg-muted/30 rounded-xl p-2.5 border border-border/50">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{block.emoji}</span>
                      <span className="text-xs font-medium text-foreground truncate max-w-[80px]">{block.title.split(' ')[0]}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground">{percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${blockColorMap[block.color]}`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights - Compact */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-quiz-green/15 backdrop-blur-xl rounded-2xl p-3 border border-quiz-green/30">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">💪</span>
                <span className="font-semibold text-quiz-green text-xs">Ponto Forte</span>
              </div>
              <p className="text-xs text-foreground font-medium">{strongestArea.block.title.split('(')[0].trim()}</p>
              <p className="text-lg font-bold text-quiz-green">{strongestArea.percentage}%</p>
            </div>
            
            <div className="bg-quiz-orange/15 backdrop-blur-xl rounded-2xl p-3 border border-quiz-orange/30">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">🎯</span>
                <span className="font-semibold text-quiz-orange text-xs">Área de Foco</span>
              </div>
              <p className="text-xs text-foreground font-medium">{weakestArea.block.title.split('(')[0].trim()}</p>
              <p className="text-lg font-bold text-quiz-orange">{weakestArea.percentage}%</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-4 border border-border shadow-xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-base mr-1">💡</span>
              Focar em <strong className="text-foreground">{weakestArea.block.title}</strong> pode acelerar significativamente o desenvolvimento do atleta.
            </p>
          </div>

          {/* Restart Button */}
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full h-12 text-base font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl shadow-xl transition-all active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refazer Diagnóstico
          </Button>
          
          <p className="text-center text-xs text-primary-foreground/50 pb-2">
            Powered by Joga Junto
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
