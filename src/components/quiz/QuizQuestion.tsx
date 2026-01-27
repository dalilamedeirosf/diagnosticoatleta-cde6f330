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

// Q6 - Risk taking
import q6Safe from "@/assets/q6-safe.jpg";
import q6Leader from "@/assets/q6-leader.jpg";

// Q8 - Training vs Match
import q8Training from "@/assets/q8-training.jpg";
import q8Match from "@/assets/q8-match.jpg";

// Q10 - Weakness
import q10Physical from "@/assets/q10-physical.jpg";
import q10Confidence from "@/assets/q10-confidence.jpg";

// Q12 - Big games
import q12Freeze from "@/assets/q12-freeze.jpg";
import q12Rise from "@/assets/q12-rise.jpg";

// Q14 - Self belief
import q14Doubt from "@/assets/q14-doubt.jpg";
import q14Believe from "@/assets/q14-believe.jpg";

// Q16 - Family attitude
import q16Hobby from "@/assets/q16-hobby.jpg";
import q16Priority from "@/assets/q16-priority.jpg";

// Q18 - Family reaction good games
import q18Demand from "@/assets/q18-demand.jpg";
import q18Celebrate from "@/assets/q18-celebrate.jpg";

// Q20 - Screen time
import q20ScreensHigh from "@/assets/q20-screens-high.jpg";
import q20ScreensLow from "@/assets/q20-screens-low.jpg";

// Q22 - Dream
import q22Fun from "@/assets/q22-fun.jpg";
import q22Pro from "@/assets/q22-pro.jpg";

// Q24 - Blocker
import q24Direction from "@/assets/q24-direction.jpg";
import q24All from "@/assets/q24-all.jpg";

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
  "q6-safe": q6Safe,
  "q6-leader": q6Leader,
  "q8-training": q8Training,
  "q8-match": q8Match,
  "q10-physical": q10Physical,
  "q10-confidence": q10Confidence,
  "q12-freeze": q12Freeze,
  "q12-rise": q12Rise,
  "q14-doubt": q14Doubt,
  "q14-believe": q14Believe,
  "q16-hobby": q16Hobby,
  "q16-priority": q16Priority,
  "q18-demand": q18Demand,
  "q18-celebrate": q18Celebrate,
  "q20-screens-high": q20ScreensHigh,
  "q20-screens-low": q20ScreensLow,
  "q22-fun": q22Fun,
  "q22-pro": q22Pro,
  "q24-direction": q24Direction,
  "q24-all": q24All,
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
    <div className="w-full space-y-5 animate-slide-in">
      {/* Question - Centered */}
      <div className="space-y-2 text-center">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Pergunta {questionNumber}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      {hasImages ? (
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => {
            const isLastOdd = question.options.length % 2 === 1 && index === question.options.length - 1;
            return (
              <button
                key={index}
                onClick={() => onSelectOption(option.value)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-150",
                  "hover:scale-[1.03] active:scale-[0.97] shadow-sm hover:shadow-lg",
                  selectedOption === option.value
                    ? `${styles.bg} ${styles.border} ring-2 ${styles.ring} shadow-lg`
                    : "bg-card border-border hover:border-primary/50 hover:bg-secondary/30",
                  isLastOdd && "col-span-2 max-w-[48%] mx-auto"
                )}
              >
                {option.image && optionImages[option.image] && (
                  <img 
                    src={optionImages[option.image]} 
                    alt={option.label}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover mb-2 border-2 border-background shadow-md"
                  />
                )}
                <span className={cn(
                  "text-sm md:text-base font-semibold text-center leading-tight",
                  selectedOption === option.value 
                    ? "text-foreground" 
                    : "text-foreground/80"
                )}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectOption(option.value)}
              className={cn(
                "w-full p-4 text-left rounded-xl border-2 transition-all duration-150",
                "hover:scale-[1.01] active:scale-[0.98] shadow-sm hover:shadow-md",
                selectedOption === option.value
                  ? `${styles.bg} ${styles.border} ring-2 ${styles.ring} shadow-lg`
                  : "bg-card border-border hover:border-primary/50 hover:bg-secondary/30"
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
