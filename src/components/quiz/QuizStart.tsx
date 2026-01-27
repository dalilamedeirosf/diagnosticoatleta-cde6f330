import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { Play, Target, Users, TrendingUp } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
}

const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-between px-6 py-8 bg-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src={logo} 
            alt="" 
            className="w-[80vw] max-w-sm opacity-[0.05] object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full text-center space-y-6 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img 
            src={logo} 
            alt="Joga Junto" 
            className="h-20 md:h-24 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground drop-shadow-sm">
            Diagnóstico do Atleta
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/80">
            Descubra o nível atual e receba orientações personalizadas
          </p>
        </div>

        {/* Features - Compact horizontal */}
        <div className="flex justify-center gap-3 py-2">
          <div className="flex flex-col items-center gap-1.5 px-4 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
            <Target className="w-6 h-6 text-primary-foreground" />
            <span className="text-xs font-semibold text-primary-foreground">25 Perguntas</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 px-4 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
            <Users className="w-6 h-6 text-primary-foreground" />
            <span className="text-xs font-semibold text-primary-foreground">6 Áreas</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 px-4 py-3 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
            <span className="text-xs font-semibold text-primary-foreground">Resultado</span>
          </div>
        </div>
      </div>

      {/* CTA Section - Fixed at bottom */}
      <div className="w-full max-w-md space-y-3 relative z-10">
        <Button 
          onClick={onStart}
          size="lg"
          className="w-full h-14 text-lg font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl shadow-2xl transition-all duration-200 active:scale-[0.98]"
        >
          <Play className="w-5 h-5 mr-2 fill-current" />
          Iniciar Diagnóstico
        </Button>
        <p className="text-xs text-primary-foreground/60 text-center">
          ⏱️ Tempo estimado: 5-7 minutos
        </p>
      </div>
    </div>
  );
};

export default QuizStart;
