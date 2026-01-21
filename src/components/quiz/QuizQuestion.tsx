import { QuizQuestion as QuizQuestionType, QuizBlock } from "@/data/quizQuestions";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  blockColor: QuizBlock['color'];
  selectedOption: number | null;
  onSelectOption: (value: number) => void;
  questionNumber: number;
}

const colorStyles: Record<QuizBlock['color'], { ring: string; bg: string; border: string }> = {
  green: { 
    ring: "ring-quiz-green", 
    bg: "bg-quiz-green/10", 
    border: "border-quiz-green" 
  },
  yellow: { 
    ring: "ring-quiz-yellow", 
    bg: "bg-quiz-yellow/10", 
    border: "border-quiz-yellow" 
  },
  blue: { 
    ring: "ring-quiz-blue", 
    bg: "bg-quiz-blue/10", 
    border: "border-quiz-blue" 
  },
  purple: { 
    ring: "ring-quiz-purple", 
    bg: "bg-quiz-purple/10", 
    border: "border-quiz-purple" 
  },
  orange: { 
    ring: "ring-quiz-orange", 
    bg: "bg-quiz-orange/10", 
    border: "border-quiz-orange" 
  },
  red: { 
    ring: "ring-quiz-red", 
    bg: "bg-quiz-red/10", 
    border: "border-quiz-red" 
  },
};

const QuizQuestion = ({ 
  question, 
  blockColor, 
  selectedOption, 
  onSelectOption,
  questionNumber 
}: QuizQuestionProps) => {
  const styles = colorStyles[blockColor];

  return (
    <div className="w-full space-y-6 animate-slide-in">
      {/* Question */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-muted-foreground">
          Pergunta {questionNumber}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(option.value)}
            className={cn(
              "w-full p-4 md:p-5 text-left rounded-xl border-2 transition-all duration-200",
              "hover:scale-[1.02] active:scale-[0.98]",
              selectedOption === option.value
                ? `${styles.bg} ${styles.border} ring-2 ${styles.ring}`
                : "bg-card border-border hover:border-primary/50 hover:bg-secondary/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                selectedOption === option.value 
                  ? styles.border
                  : "border-muted-foreground/30"
              )}>
                {selectedOption === option.value && (
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    blockColor === 'green' && "bg-quiz-green",
                    blockColor === 'yellow' && "bg-quiz-yellow",
                    blockColor === 'blue' && "bg-quiz-blue",
                    blockColor === 'purple' && "bg-quiz-purple",
                    blockColor === 'orange' && "bg-quiz-orange",
                    blockColor === 'red' && "bg-quiz-red",
                  )} />
                )}
              </div>
              <span className={cn(
                "text-base font-medium",
                selectedOption === option.value 
                  ? "text-foreground" 
                  : "text-foreground/80"
              )}>
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
