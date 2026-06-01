import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { quizBlocks, getTotalQuestions } from "@/data/quizQuestions";
import QuizStart from "./QuizStart";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import QuizForm from "./QuizForm";
import QuizTestimonials from "./QuizTestimonials";
import logo from "@/assets/craque-em-contrução1.png";

type QuizState = "start" | "form" | "questions" | "testimonials" | "result";

const QuizContainer = () => {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | number[]>>({});
  const [formData, setFormData] = useState<any>(null);
  const answerTimestampsRef = useRef<Record<number, string>>({});
  const submittedRef = useRef(false);

  const totalQuestions = getTotalQuestions();
  const currentBlock = quizBlocks[currentBlockIndex];
  const currentQuestion = currentBlock?.questions[currentQuestionIndex];

  const handleStart = () => {
    setQuizState("form");
  };

  const handleFormComplete = (leadData: any) => {
    setFormData(leadData);
    setQuizState("questions");
  };

  const handleSelectOption = (value: number) => {
    if (!currentQuestion) return;
    const now = new Date().toISOString();
    answerTimestampsRef.current[currentQuestion.id] = now;
    if (currentQuestion.isMultiSelect) {
      setAnswers((prev) => {
        const currentAns = prev[currentQuestion.id];
        const arr = Array.isArray(currentAns) ? currentAns : [];
        if (arr.includes(value)) {
          return { ...prev, [currentQuestion.id]: arr.filter(v => v !== value) };
        } else {
          return { ...prev, [currentQuestion.id]: [...arr, value] };
        }
      });
    } else {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: value,
      }));
    }
  };

  const sendDiagnosticToWebhook = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    try {
      const respostas: Array<{ pergunta: string; resposta: string; createdAt: string; updatedAt: string }> = [];
      const submittedAt = new Date().toISOString();
      // Dados do formulário inicial entram como respostas
      const formEntries: Array<[string, string]> = [
        ["Nome completo do atleta", formData?.athleteName ?? ""],
        ["Idade do atleta", formData?.athleteAge ? `${formData.athleteAge} Anos` : ""],
        ["Nome do responsável", formData?.parentName ?? ""],
        ["WhatsApp do responsável", formData?.parentWhatsapp ?? ""],
        ["Pé predominante", formData?.preferredFoot ?? ""],
        ["Posição que joga", formData?.position ?? ""],
        ["Em qual piso o atleta joga?", formData?.surface ?? ""],
        ["Altura (cm)", formData?.heightCm ?? ""],
        ["Peso (kg)", formData?.weightKg ?? ""],
      ];
      for (const [pergunta, resposta] of formEntries) {
        respostas.push({ pergunta, resposta, createdAt: submittedAt, updatedAt: submittedAt });
      }
      // Todas as perguntas do quiz (mesmo as não respondidas)
      for (const block of quizBlocks) {
        for (const q of block.questions) {
          const ans = answers[q.id];
          const ts = answerTimestampsRef.current[q.id] || submittedAt;
          const labelOf = (v: number) => q.options.find(o => o.value === v)?.label ?? String(v);
          let respostaStr = "";
          if (ans !== undefined) {
            respostaStr = Array.isArray(ans) ? ans.map(labelOf).join(", ") : labelOf(ans as number);
          }
          respostas.push({
            pergunta: `[Bloco ${block.id} - ${block.title}] ${q.question}`,
            resposta: respostaStr || "Não respondido",
            createdAt: ts,
            updatedAt: ts,
          });
        }
      }
      const payload = {
        event: "final",
        quizId: "diagnostico-do-atleta",
        submittedAt,
        nomeAtleta: formData?.athleteName ?? "",
        nomeResponsavel: formData?.parentName ?? "",
        idadeAtleta: formData?.athleteAge ? `${formData.athleteAge} Anos` : "",
        whatsapp: formData?.parentWhatsapp ?? "",
        pePredominante: formData?.preferredFoot ?? "",
        posicao: formData?.position ?? "",
        piso: formData?.surface ?? "",
        alturaCm: formData?.heightCm ?? "",
        pesoKg: formData?.weightKg ?? "",
        totalRespostas: respostas.length,
        respostas,
        resultado: { geral: null, areas: {} },
        page: { url: typeof window !== "undefined" ? window.location.href : "" },
      };
      await fetch("https://nwook.atendaia.com/webhook/Diagnostico-do-Atleta", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
    } catch (err) {
      console.error("Falha ao enviar diagnóstico:", err);
    }
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
      sendDiagnosticToWebhook();
      setQuizState("testimonials");
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
    setFormData(null);
    answerTimestampsRef.current = {};
    submittedRef.current = false;
  };

  const isFirstQuestion = currentBlockIndex === 0 && currentQuestionIndex === 0;
  const hasSelectedOption = currentQuestion && (
    Array.isArray(answers[currentQuestion.id]) 
      ? (answers[currentQuestion.id] as number[]).length > 0 
      : answers[currentQuestion.id] !== undefined
  );

  // Calculate global question number
  const globalQuestionNumber = quizBlocks
    .slice(0, currentBlockIndex)
    .reduce((acc, block) => acc + block.questions.length, 0) + currentQuestionIndex + 1;

  if (quizState === "start") {
    return <QuizStart onStart={handleStart} />;
  }

  if (quizState === "testimonials") {
    return <QuizTestimonials onContinue={() => setQuizState("result")} />;
  }

  if (quizState === "result") {
    return <QuizResult answers={answers} athleteName={formData?.athleteName || "Atleta"} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-[#050B14] relative overflow-x-hidden overflow-y-auto">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

      {/* Subtle Navy Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light/20 via-transparent to-black pointer-events-none" />

      {/* VR Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-gradient-to-b from-gold/15 via-gold-600/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-gold-500/10 to-gold-700/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-gold/10 to-gold-600/5 rounded-full blur-3xl" />
        
        {/* Grid overlay - VR style */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }} />
        
        {/* Logo watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src={logo} 
            alt="" 
            className="w-[50vw] max-w-xs opacity-[0.02] object-contain"
          />
        </div>
      </div>

      {quizState === "form" ? (
        <QuizForm onComplete={handleFormComplete} />
      ) : (
        <>
          {/* Header - Glass effect */}
          <header className="flex-shrink-0 z-10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border-b border-gold/10 px-4 py-2 safe-area-top">
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
          <div className="absolute -inset-1 bg-gradient-to-br from-gold/15 via-gold-600/10 to-gold-800/15 rounded-3xl blur-xl opacity-50" />
          
          <div className="relative bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl rounded-2xl p-5 shadow-[0_0_60px_rgba(212,175,55,0.05)] border border-white/10 max-h-full overflow-y-auto">
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
      <footer className="flex-shrink-0 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-sm border-t border-gold/10 px-4 py-2 z-10 safe-area-bottom">
        <div className="max-w-md mx-auto flex gap-3">
          <div className="relative flex-1">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-400/20 to-slate-500/20 rounded-xl blur opacity-40" />
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={isFirstQuestion}
              className="relative w-full h-12 text-base font-semibold rounded-xl bg-navy/80 border border-gold/20 text-white hover:bg-navy-light/80 hover:text-gold-100 backdrop-blur-sm disabled:opacity-30 [-webkit-appearance:none] [color:white_!important]"
            >
              <ChevronLeft className="w-5 h-5 mr-1 text-white" />
              Voltar
            </Button>
          </div>
          <div className="relative flex-1 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
            <Button
              onClick={handleNext}
              disabled={!hasSelectedOption}
              className="relative w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-gold-400 via-gold to-gold-600 text-black hover:opacity-95 hover:text-black transition-all active:scale-[0.98] disabled:opacity-50 border-0"
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
        </>
      )}
    </div>
  );
};

export default QuizContainer;
