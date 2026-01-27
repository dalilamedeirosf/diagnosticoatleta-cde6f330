import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { Play, Target, Users, TrendingUp, Sparkles } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
}

const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-between px-6 py-8 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary-foreground/20 to-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-gradient-to-tr from-accent/20 to-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary-foreground/5 rounded-full blur-2xl" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Large centered logo watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src={logo} 
            alt="" 
            className="w-[90vw] max-w-lg opacity-[0.06] object-contain"
          />
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary-foreground/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-primary-foreground/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary-foreground/25 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full text-center space-y-8 relative z-10">
        {/* Premium Logo with Glow */}
        <div className="relative flex justify-center mb-4">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-primary-foreground/20 rounded-full blur-3xl scale-150" />
          <img 
            src={logo} 
            alt="Joga Junto" 
            className="h-28 md:h-36 lg:h-40 object-contain drop-shadow-2xl relative z-10 animate-fade-in"
            style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.3))' }}
          />
        </div>

        {/* Title with Premium Typography */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-foreground/80" />
            <span className="text-xs font-semibold tracking-[0.3em] text-primary-foreground/70 uppercase">
              Avaliação Profissional
            </span>
            <Sparkles className="w-5 h-5 text-primary-foreground/80" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground drop-shadow-lg tracking-tight">
            Diagnóstico do Atleta
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/85 max-w-xs mx-auto leading-relaxed">
            Descubra o nível atual e receba orientações personalizadas para evolução
          </p>
        </div>

        {/* Premium Feature Cards */}
        <div className="flex justify-center gap-3 py-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col items-center gap-2 px-5 py-4 bg-gradient-to-br from-primary-foreground/15 to-primary-foreground/5 backdrop-blur-md rounded-2xl border border-primary-foreground/25 shadow-lg hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-primary-foreground">25</span>
            <span className="text-xs text-primary-foreground/70">Perguntas</span>
          </div>
          <div className="flex flex-col items-center gap-2 px-5 py-4 bg-gradient-to-br from-primary-foreground/15 to-primary-foreground/5 backdrop-blur-md rounded-2xl border border-primary-foreground/25 shadow-lg hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-primary-foreground">6</span>
            <span className="text-xs text-primary-foreground/70">Áreas</span>
          </div>
          <div className="flex flex-col items-center gap-2 px-5 py-4 bg-gradient-to-br from-primary-foreground/15 to-primary-foreground/5 backdrop-blur-md rounded-2xl border border-primary-foreground/25 shadow-lg hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-primary-foreground">PDF</span>
            <span className="text-xs text-primary-foreground/70">Resultado</span>
          </div>
        </div>
      </div>

      {/* Premium CTA Section */}
      <div className="w-full max-w-md space-y-4 relative z-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Button 
          onClick={onStart}
          size="lg"
          className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary-foreground via-primary-foreground to-primary-foreground/95 text-primary hover:opacity-95 rounded-2xl shadow-2xl transition-all duration-300 active:scale-[0.98] group relative overflow-hidden"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Play className="w-6 h-6 mr-3 fill-current relative z-10" />
          <span className="relative z-10">Iniciar Diagnóstico</span>
        </Button>
        <div className="flex items-center justify-center gap-4 text-primary-foreground/60">
          <span className="flex items-center gap-1.5 text-sm">
            <span className="text-base">⏱️</span> 5-7 min
          </span>
          <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
          <span className="flex items-center gap-1.5 text-sm">
            <span className="text-base">📊</span> Gratuito
          </span>
          <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
          <span className="flex items-center gap-1.5 text-sm">
            <span className="text-base">🎯</span> Preciso
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
