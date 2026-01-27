import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Target, TrendingUp, AlertCircle, Star, Sparkles, Award } from "lucide-react";
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

  // Find weakest area
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary-foreground/20 to-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-gradient-to-tr from-accent/20 to-primary-foreground/10 rounded-full blur-3xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Background Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src={logo} 
            alt="" 
            className="w-[90vw] max-w-xl opacity-[0.04] object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-6 overflow-y-auto relative z-10">
        <div className="max-w-lg w-full space-y-6 animate-fade-in">
          {/* Premium Logo */}
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-primary-foreground/10 rounded-full blur-2xl scale-150" />
            <img 
              src={logo} 
              alt="Joga Junto" 
              className="h-20 object-contain relative z-10"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}
            />
          </div>

          {/* Result Header Card */}
          <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-6 border border-border shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Diagnóstico Completo
              </span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${profile.bgColor} border-4 ${profile.borderColor} shadow-lg mx-auto relative`}>
              <ProfileIcon className={`w-12 h-12 ${profile.color}`} />
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-card rounded-full flex items-center justify-center border-2 border-border shadow-md">
                <Star className="w-4 h-4 text-quiz-yellow fill-quiz-yellow" />
              </div>
            </div>
            
            <div>
              <p className={`text-xl font-bold ${profile.color}`}>
                Perfil: {profile.level}
              </p>
            </div>

            {/* Overall Score Circle */}
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${overallPercentage * 3.52} 352`}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{overallPercentage}%</span>
                <span className="text-xs text-muted-foreground">Geral</span>
              </div>
            </div>
          </div>

          {/* Block Scores Card */}
          <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-5 border border-border shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Pontuação por Área</h3>
            </div>
            
            <div className="space-y-3">
              {blockScores.map(({ block, percentage }) => (
                <div key={block.id} className="bg-muted/30 rounded-xl p-3 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{block.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{block.title}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground bg-muted px-2 py-0.5 rounded-lg">{percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${blockColorMap[block.color]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights Card */}
          <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-5 border border-border shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Principais Insights</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-quiz-green/10 rounded-xl p-4 border border-quiz-green/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">💪</span>
                  <span className="font-semibold text-quiz-green text-sm">Ponto Forte</span>
                </div>
                <p className="text-sm text-foreground">
                  <strong>{strongestArea.block.title}</strong> ({strongestArea.percentage}%)
                </p>
              </div>
              
              <div className="bg-quiz-orange/10 rounded-xl p-4 border border-quiz-orange/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🎯</span>
                  <span className="font-semibold text-quiz-orange text-sm">Área de Foco</span>
                </div>
                <p className="text-sm text-foreground">
                  <strong>{weakestArea.block.title}</strong> ({weakestArea.percentage}%) — Focar nessa área pode acelerar significativamente o desenvolvimento do atleta.
                </p>
              </div>
            </div>
          </div>

          {/* Restart Button */}
          <Button 
            onClick={onRestart}
            size="lg"
            className="w-full h-14 text-base font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl shadow-2xl transition-all duration-200 active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refazer Diagnóstico
          </Button>
          
          <p className="text-center text-xs text-primary-foreground/60 pb-4">
            Powered by Joga Junto • Desenvolvimento de Atletas
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
