import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { quizBlocks, getTotalQuestions } from "@/data/quizQuestions";
import QuizStart from "./QuizStart";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import logo from "@/assets/logo-joga-junto.png";

type QuizState = "start" | "questions" | "result";

const QuizContainer = () => {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const totalQuestions = getTotalQuestions();
  const currentBlock = quizBlocks[currentBlockIndex];
  const currentQuestion = currentBlock?.questions[currentQuestionIndex];

  const handleStart = () => {
    setQuizState("questions");
  };

  const handleSelectOption = (value: number) => {
    if (!currentQuestion) return;
    
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    // Check if there are more questions in current block
    if (currentQuestionIndex < currentBlock.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } 
    // Check if there are more blocks
    else if (currentBlockIndex < quizBlocks.length - 1) {
      setCurrentBlockIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } 
    // Quiz completed
    else {
      setQuizState("result");
    }
  };

  const handleBack = () => {
    // Check if we can go back in current block
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } 
    // Check if we can go to previous block
    else if (currentBlockIndex > 0) {
      const previousBlock = quizBlocks[currentBlockIndex - 1];
      setCurrentBlockIndex((prev) => prev - 1);
      setCurrentQuestionIndex(previousBlock.questions.length - 1);
    }
  };

  const handleRestart = () => {
    setQuizState("start");
    setCurrentBlockIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const isFirstQuestion = currentBlockIndex === 0 && currentQuestionIndex === 0;
  const hasSelectedOption = currentQuestion && answers[currentQuestion.id] !== undefined;

  // Calculate global question number
  const globalQuestionNumber = quizBlocks
    .slice(0, currentBlockIndex)
    .reduce((acc, block) => acc + block.questions.length, 0) + currentQuestionIndex + 1;

  if (quizState === "start") {
    return <QuizStart onStart={handleStart} />;
  }

  if (quizState === "result") {
    return <QuizResult answers={answers} onRestart={handleRestart} />;
  }

  return (
    <div className="h-[100dvh] flex flex-col relative overflow-hidden bg-primary">
      {/* Background Logo - centered and subtle */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img 
          src={logo} 
          alt="" 
          className="w-[60vw] max-w-xs opacity-[0.05] object-contain"
        />
      </div>

      {/* Header - Compact */}
      <header className="flex-shrink-0 z-10 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10 px-4 py-2 safe-area-top">
        <div className="max-w-md mx-auto">
          <QuizProgress 
            currentBlockIndex={currentBlockIndex}
            currentQuestionInBlock={currentQuestionIndex}
            totalQuestionsInBlock={currentBlock.questions.length}
          />
        </div>
      </header>

      {/* Question Content - Centered, no scroll */}
      <main className="flex-1 flex items-center justify-center px-4 py-3 relative z-10 min-h-0">
        <div className="max-w-md w-full bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-border max-h-full overflow-y-auto">
          <QuizQuestion 
            key={currentQuestion.id}
            question={currentQuestion}
            blockColor={currentBlock.color}
            selectedOption={answers[currentQuestion.id] ?? null}
            onSelectOption={handleSelectOption}
            questionNumber={globalQuestionNumber}
          />
        </div>
      </main>

      {/* Navigation - Fixed bottom */}
      <footer className="flex-shrink-0 bg-primary/95 backdrop-blur-sm border-t border-primary-foreground/10 px-4 py-2 z-10 safe-area-bottom">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isFirstQuestion}
            className="flex-1 h-12 text-base font-semibold rounded-xl bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={!hasSelectedOption}
            className="flex-1 h-12 text-base font-semibold rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {currentBlockIndex === quizBlocks.length - 1 && 
             currentQuestionIndex === currentBlock.questions.length - 1 
              ? "Ver Resultado" 
              : "Próxima"}
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default QuizContainer;
