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
                  : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Current block info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentBlock.emoji}</span>
          <span className="font-medium text-sm text-white drop-shadow-lg">
            {currentBlock.title}
          </span>
        </div>
        <span className="text-sm text-white/70">
          {currentQuestionInBlock + 1} de {totalQuestionsInBlock}
        </span>
      </div>

      {/* Question progress within block */}
      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${blockColors[currentBlock.color]} shadow-[0_0_10px_currentColor]`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
