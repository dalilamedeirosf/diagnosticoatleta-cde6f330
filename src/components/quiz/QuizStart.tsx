import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { Play, Target, Users, TrendingUp } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
}

const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 animate-fade-in">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src={logo} 
            alt="Joga Junto" 
            className="h-24 md:h-32 object-contain animate-bounce-subtle"
          />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Diagnóstico do Atleta
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubra o nível atual do seu atleta e receba orientações personalizadas
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border">
            <Target className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-foreground">25 Perguntas</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border">
            <Users className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-foreground">6 Áreas</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium text-foreground">Resultado</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onStart}
          size="lg"
          className="w-full md:w-auto px-12 py-6 text-lg font-semibold bg-primary hover:bg-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
        >
          <Play className="w-5 h-5 mr-2" />
          Iniciar Diagnóstico
        </Button>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground">
          Tempo estimado: 5-7 minutos
        </p>
      </div>
    </div>
  );
};

export default QuizStart;
