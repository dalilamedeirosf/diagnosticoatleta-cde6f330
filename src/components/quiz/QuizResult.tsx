import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trophy, Target, TrendingUp, AlertCircle } from "lucide-react";
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
    if (overallPercentage >= 80) return { level: "Excelente", icon: Trophy, color: "text-quiz-green" };
    if (overallPercentage >= 60) return { level: "Bom", icon: TrendingUp, color: "text-quiz-blue" };
    if (overallPercentage >= 40) return { level: "Em Desenvolvimento", icon: Target, color: "text-quiz-yellow" };
    return { level: "Precisa de Atenção", icon: AlertCircle, color: "text-quiz-orange" };
  };

  const profile = getProfileLevel();
  const ProfileIcon = profile.icon;

  // Find weakest area
  const weakestArea = [...blockScores].sort((a, b) => a.percentage - b.percentage)[0];

  const blockColorMap: Record<string, string> = {
    green: "bg-quiz-green",
    yellow: "bg-quiz-yellow",
    blue: "bg-quiz-blue",
    purple: "bg-quiz-purple",
    orange: "bg-quiz-orange",
    red: "bg-quiz-red",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fade-in relative overflow-hidden">
      {/* Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img 
          src={logo} 
          alt="" 
          className="w-[80vw] max-w-xl opacity-[0.04] object-contain"
        />
      </div>

      <div className="max-w-lg w-full space-y-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src={logo} 
            alt="Joga Junto" 
            className="h-16 object-contain"
          />
        </div>

        {/* Result Header */}
        <div className="text-center space-y-4">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-card border-4 border-primary shadow-lg`}>
            <ProfileIcon className={`w-10 h-10 ${profile.color}`} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Diagnóstico Completo!
            </h1>
            <p className={`text-xl font-semibold mt-2 ${profile.color}`}>
              Perfil: {profile.level}
            </p>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-primary">{overallPercentage}%</div>
            <p className="text-muted-foreground mt-1">Pontuação Geral</p>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        {/* Block Scores */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Pontuação por Área</h3>
          {blockScores.map(({ block, percentage }) => (
            <div key={block.id} className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{block.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{block.title}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${blockColorMap[block.color]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Key Insight */}
        <div className="bg-secondary/50 rounded-xl p-5 border border-border">
          <h4 className="font-semibold text-foreground mb-2">💡 Principal Insight</h4>
          <p className="text-muted-foreground text-sm">
            A área que mais precisa de atenção é <strong className="text-foreground">{weakestArea.block.title}</strong> ({weakestArea.percentage}%). 
            Focar nessa área pode acelerar significativamente o desenvolvimento do atleta.
          </p>
        </div>

        {/* Restart Button */}
        <Button 
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refazer Diagnóstico
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
