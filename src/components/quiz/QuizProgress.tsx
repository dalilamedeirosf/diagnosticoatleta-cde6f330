import { quizBlocks, QuizBlock } from "@/data/quizQuestions";

interface QuizProgressProps {
  currentBlockIndex: number;
  currentQuestionInBlock: number;
  totalQuestionsInBlock: number;
}

import { Sparkles } from "lucide-react";

const blockColors = {
  active: "bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]",
  completed: "bg-gold-600 opacity-80",
  inactive: "bg-white/10"
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
      <div className="flex gap-2">
        {quizBlocks.map((block, index) => (
          <div
            key={block.id}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              index < currentBlockIndex 
                ? blockColors.completed
                : index === currentBlockIndex 
                  ? blockColors.active
                  : blockColors.inactive
            }`}
          />
        ))}
      </div>

      {/* Current block info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          <span className="font-semibold text-sm text-gold-100 drop-shadow-lg tracking-wide uppercase">
            {currentBlock.title}
          </span>
        </div>
        <span className="text-sm text-white/70">
          {currentQuestionInBlock + 1} de {totalQuestionsInBlock}
        </span>
      </div>

      <div className="w-full bg-white/5 border border-white/5 rounded-full h-1.5 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-gold-600 via-gold to-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
