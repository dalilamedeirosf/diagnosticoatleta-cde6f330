import { QuizQuestion as QuizQuestionType, QuizBlock } from "@/data/quizQuestions";
import { cn } from "@/lib/utils";

// Age images
import age10 from "@/assets/age-10.jpg";
import age12 from "@/assets/age-12.jpg";
import age14 from "@/assets/age-14.jpg";
import age16 from "@/assets/age-16.jpg";
import age17 from "@/assets/age-17.jpg";

// Training frequency images
import train12x from "@/assets/train-1-2x.jpg";
import train3x from "@/assets/train-3x.jpg";
import train45x from "@/assets/train-4-5x.jpg";
import trainDaily from "@/assets/train-daily.jpg";

// Place images
import placeSchool from "@/assets/place-school.jpg";
import placeLocal from "@/assets/place-local.jpg";
import placeStructured from "@/assets/place-structured.jpg";
import placeAcademy from "@/assets/place-academy.jpg";

const optionImages: Record<string, string> = {
  "age-10": age10,
  "age-12": age12,
  "age-14": age14,
  "age-16": age16,
  "age-17": age17,
  "train-1-2x": train12x,
  "train-3x": train3x,
  "train-4-5x": train45x,
  "train-daily": trainDaily,
  "place-school": placeSchool,
  "place-local": placeLocal,
  "place-structured": placeStructured,
  "place-academy": placeAcademy,
};

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
  const hasImages = question.options.some(opt => opt.image && optionImages[opt.image]);

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
      {hasImages ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectOption(option.value)}
              className={cn(
                "flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200",
                "hover:scale-[1.02] active:scale-[0.98]",
                selectedOption === option.value
                  ? `${styles.bg} ${styles.border} ring-2 ${styles.ring}`
                  : "bg-card border-border hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              {option.image && optionImages[option.image] && (
                <img 
                  src={optionImages[option.image]} 
                  alt={option.label}
                  className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-background shadow-md"
                />
              )}
              <span className={cn(
                "text-sm font-medium text-center",
                selectedOption === option.value 
                  ? "text-foreground" 
                  : "text-foreground/80"
              )}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default QuizQuestion;
