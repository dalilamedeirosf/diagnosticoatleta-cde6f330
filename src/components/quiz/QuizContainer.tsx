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
    <div className="h-[100dvh] flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#0c4a6e_40%,_#0369a1_100%)]">
      {/* VR Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-gradient-to-b from-cyan-400/30 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-violet-500/20 to-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-emerald-500/20 to-blue-400/10 rounded-full blur-3xl" />
        
        {/* Grid overlay - VR style */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
        
        {/* Logo watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src={logo} 
            alt="" 
            className="w-[50vw] max-w-xs opacity-[0.03] object-contain"
          />
        </div>
      </div>

      {/* Header - Compact with glass effect */}
      <header className="flex-shrink-0 z-10 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm border-b border-cyan-400/10 px-4 py-2 safe-area-top">
        <div className="max-w-md mx-auto">
          <QuizProgress 
            currentBlockIndex={currentBlockIndex}
            currentQuestionInBlock={currentQuestionIndex}
            totalQuestionsInBlock={currentBlock.questions.length}
          />
        </div>
      </header>

      {/* Question Content - Premium Glass Card */}
      <main className="flex-1 flex items-center justify-center px-3 py-2 relative z-10 min-h-0">
        <div className="relative max-w-lg w-full max-h-full">
          {/* Card glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-violet-500/30 rounded-3xl blur-xl opacity-50" />
          
          <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-2xl rounded-2xl p-5 shadow-[0_0_60px_rgba(6,182,212,0.15)] border border-white/50 max-h-full overflow-y-auto">
            <QuizQuestion 
              key={currentQuestion.id}
              question={currentQuestion}
              blockColor={currentBlock.color}
              selectedOption={answers[currentQuestion.id] ?? null}
              onSelectOption={handleSelectOption}
              questionNumber={globalQuestionNumber}
            />
          </div>
        </div>
      </main>

      {/* Navigation - Premium glass footer */}
      <footer className="flex-shrink-0 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm border-t border-cyan-400/10 px-4 py-2 z-10 safe-area-bottom">
        <div className="max-w-md mx-auto flex gap-3">
          <div className="relative flex-1">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isFirstQuestion}
              className="w-full h-12 text-base font-semibold rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Voltar
            </Button>
          </div>
          <div className="relative flex-1 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            <Button
              onClick={handleNext}
              disabled={!hasSelectedOption}
              className="relative w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-white to-cyan-50 text-sky-700 hover:opacity-95 transition-all active:scale-[0.98] disabled:opacity-50 border-0"
            >
              {currentBlockIndex === quizBlocks.length - 1 && 
               currentQuestionIndex === currentBlock.questions.length - 1 
                ? "Ver Resultado" 
                : "Próxima"}
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuizContainer;
