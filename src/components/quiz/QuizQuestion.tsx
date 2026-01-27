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
import q6Sometimes from "@/assets/q6-sometimes.jpg";
import q6Frequent from "@/assets/q6-frequent.jpg";
import q6Leader from "@/assets/q6-leader.jpg";

// Q8 - Training vs Match
import q8Training from "@/assets/q8-training.jpg";
import q8BitTraining from "@/assets/q8-bit-training.jpg";
import q8Equal from "@/assets/q8-equal.jpg";
import q8Match from "@/assets/q8-match.jpg";

// Q10 - Weakness
import q10Physical from "@/assets/q10-physical.jpg";
import q10Confidence from "@/assets/q10-confidence.jpg";
import q10Decision from "@/assets/q10-decision.jpg";
import q10Concentration from "@/assets/q10-concentration.jpg";
import q10Unknown from "@/assets/q10-unknown.jpg";

// Q12 - Big games
import q12Freeze from "@/assets/q12-freeze.jpg";
import q12Oscillate from "@/assets/q12-oscillate.jpg";
import q12Maintain from "@/assets/q12-maintain.jpg";
import q12Rise from "@/assets/q12-rise.jpg";

// Q14 - Self belief
import q14Doubt from "@/assets/q14-doubt.jpg";
import q14Sometimes from "@/assets/q14-sometimes.jpg";
import q14Growing from "@/assets/q14-growing.jpg";
import q14Believe from "@/assets/q14-believe.jpg";

// Q16 - Family attitude
import q16Hobby from "@/assets/q16-hobby.jpg";
import q16Important from "@/assets/q16-important.jpg";
import q16Project from "@/assets/q16-project.jpg";
import q16Priority from "@/assets/q16-priority.jpg";

// Q18 - Family reaction good games
import q18Demand from "@/assets/q18-demand.jpg";
import q18Obligation from "@/assets/q18-obligation.jpg";
import q18Recognize from "@/assets/q18-recognize.jpg";
import q18Celebrate from "@/assets/q18-celebrate.jpg";

// Q20 - Screen time
import q20ScreensHigh from "@/assets/q20-screens-high.jpg";
import q20ScreensMedium from "@/assets/q20-screens-medium.jpg";
import q20ScreensBalanced from "@/assets/q20-screens-balanced.jpg";
import q20ScreensLow from "@/assets/q20-screens-low.jpg";

// Q22 - Dream
import q22Fun from "@/assets/q22-fun.jpg";
import q22Current from "@/assets/q22-current.jpg";
import q22BigClub from "@/assets/q22-bigclub.jpg";
import q22Pro from "@/assets/q22-pro.jpg";

// Q24 - Blocker
import q24Direction from "@/assets/q24-direction.jpg";
import q24Confidence from "@/assets/q24-confidence.jpg";
import q24Physical from "@/assets/q24-physical.jpg";
import q24Environment from "@/assets/q24-environment.jpg";
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
  "q6-sometimes": q6Sometimes,
  "q6-frequent": q6Frequent,
  "q6-leader": q6Leader,
  "q8-training": q8Training,
  "q8-bit-training": q8BitTraining,
  "q8-equal": q8Equal,
  "q8-match": q8Match,
  "q10-physical": q10Physical,
  "q10-confidence": q10Confidence,
  "q10-decision": q10Decision,
  "q10-concentration": q10Concentration,
  "q10-unknown": q10Unknown,
  "q12-freeze": q12Freeze,
  "q12-oscillate": q12Oscillate,
  "q12-maintain": q12Maintain,
  "q12-rise": q12Rise,
  "q14-doubt": q14Doubt,
  "q14-sometimes": q14Sometimes,
  "q14-growing": q14Growing,
  "q14-believe": q14Believe,
  "q16-hobby": q16Hobby,
  "q16-important": q16Important,
  "q16-project": q16Project,
  "q16-priority": q16Priority,
  "q18-demand": q18Demand,
  "q18-obligation": q18Obligation,
  "q18-recognize": q18Recognize,
  "q18-celebrate": q18Celebrate,
  "q20-screens-high": q20ScreensHigh,
  "q20-screens-medium": q20ScreensMedium,
  "q20-screens-balanced": q20ScreensBalanced,
  "q20-screens-low": q20ScreensLow,
  "q22-fun": q22Fun,
  "q22-current": q22Current,
  "q22-bigclub": q22BigClub,
  "q22-pro": q22Pro,
  "q24-direction": q24Direction,
  "q24-confidence": q24Confidence,
  "q24-physical": q24Physical,
  "q24-environment": q24Environment,
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
    <div className="w-full space-y-5 animate-fade-in">
      {/* Question - Centered */}
      <div className="space-y-2 text-center">
        <span className="text-xs font-bold text-cyan-400/80 uppercase tracking-[0.2em]">
          Pergunta {questionNumber}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-white leading-snug drop-shadow-lg">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      {hasImages ? (
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option, index) => {
            const isLastOdd = question.options.length % 2 === 1 && index === question.options.length - 1;
            const isSelected = selectedOption === option.value;
            return (
              <button
                key={index}
                onClick={() => onSelectOption(option.value)}
                className={cn(
                  "relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200",
                  "hover:scale-[1.02] active:scale-[0.97] group",
                  isSelected
                    ? "bg-white/15 border-cyan-400/50 ring-2 ring-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    : "bg-white/5 border-white/10 hover:border-cyan-400/30 hover:bg-white/10",
                  isLastOdd && "col-span-2 max-w-[48%] mx-auto"
                )}
              >
                {/* Glow effect on selected */}
                {isSelected && (
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur opacity-30" />
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  {option.image && optionImages[option.image] && (
                    <img 
                      src={optionImages[option.image]} 
                      alt={option.label}
                      className={cn(
                        "w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover mb-2 transition-all",
                        isSelected ? "ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "group-hover:shadow-lg opacity-90 group-hover:opacity-100"
                      )}
                    />
                  )}
                  <span className={cn(
                    "text-sm md:text-base font-bold text-center leading-tight",
                    isSelected ? "text-white" : "text-white/80"
                  )}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option.value;
            return (
              <button
                key={index}
                onClick={() => onSelectOption(option.value)}
                className={cn(
                  "relative w-full p-4 text-left rounded-xl border-2 transition-all duration-200",
                  "hover:scale-[1.01] active:scale-[0.98] group",
                  isSelected
                    ? "bg-white/15 border-cyan-400/50 ring-2 ring-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    : "bg-white/5 border-white/10 hover:border-cyan-400/30 hover:bg-white/10"
                )}
              >
                {/* Glow effect on selected */}
                {isSelected && (
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur opacity-25" />
                )}
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    isSelected 
                      ? "border-cyan-400 bg-cyan-400/20 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      : "border-white/30 group-hover:border-cyan-400/50"
                  )}>
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    )}
                  </div>
                  <span className={cn(
                    "text-base md:text-lg font-semibold",
                    isSelected ? "text-white" : "text-white/80"
                  )}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
