import { quizBlocks, QuizBlock } from "@/data/quizQuestions";

interface QuizProgressProps {
  currentBlockIndex: number;
  currentQuestionInBlock: number;
  totalQuestionsInBlock: number;
}

const blockColors: Record<QuizBlock['color'], string> = {
  green: "bg-quiz-green",
  yellow: "bg-quiz-yellow",
  blue: "bg-quiz-blue",
  purple: "bg-quiz-purple",
  orange: "bg-quiz-orange",
  red: "bg-quiz-red",
};

const QuizProgress = ({ 
  currentBlockIndex, 
  currentQuestionInBlock, 
  totalQuestionsInBlock 
}: QuizProgressProps) => {
  const currentBlock = quizBlocks[currentBlockIndex];
  const progressPercentage = ((currentQuestionInBlock + 1) / totalQuestionsInBlock) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Block indicators */}
      <div className="flex gap-1.5">
        {quizBlocks.map((block, index) => (
          <div
            key={block.id}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index < currentBlockIndex 
                ? blockColors[block.color]
                : index === currentBlockIndex 
                  ? blockColors[block.color] + " opacity-80"
                  : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Current block info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentBlock.emoji}</span>
          <span className="font-medium text-sm text-foreground">
            {currentBlock.title}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentQuestionInBlock + 1} de {totalQuestionsInBlock}
        </span>
      </div>

      {/* Question progress within block */}
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${blockColors[currentBlock.color]}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
