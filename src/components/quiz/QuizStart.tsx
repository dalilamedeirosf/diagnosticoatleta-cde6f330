import logo from "@/assets/logo-joga-junto.png";
import { Button } from "@/components/ui/button";
import { Play, Target, Users, TrendingUp, Sparkles } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
}

const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-between px-6 py-8 bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#020617_50%,_#000000_100%)] relative overflow-hidden">
      {/* VR Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs with glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/30 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-gradient-to-tr from-violet-600/30 to-fuchsia-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-emerald-500/20 to-cyan-500/15 rounded-full blur-3xl" />
        
        {/* Grid overlay - VR style */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }} />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full" />
        
        {/* Large centered logo watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src={logo} 
            alt="" 
            className="w-[90vw] max-w-lg opacity-[0.03] object-contain"
          />
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce shadow-[0_0_10px_rgba(6,182,212,0.8)]" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-violet-400/40 rounded-full animate-bounce shadow-[0_0_15px_rgba(139,92,246,0.6)]" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-emerald-400/40 rounded-full animate-bounce shadow-[0_0_10px_rgba(52,211,153,0.6)]" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full text-center space-y-8 relative z-10">
        {/* Premium Logo with Glow */}
        <div className="relative flex justify-center mb-4 group">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl scale-150 opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
          <img 
            src={logo} 
            alt="Joga Junto" 
            className="h-28 md:h-36 lg:h-40 object-contain relative z-10 animate-fade-in"
            style={{ filter: 'drop-shadow(0 0 40px rgba(6,182,212,0.5)) drop-shadow(0 0 80px rgba(59,130,246,0.3))' }}
          />
        </div>

        {/* Title with Premium Typography */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-xs font-semibold tracking-[0.3em] text-cyan-300/80 uppercase">
              Avaliação Profissional
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Diagnóstico do Atleta
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xs mx-auto leading-relaxed">
            Descubra o nível atual e receba orientações personalizadas para evolução
          </p>
        </div>

        {/* Premium Feature Cards - Holographic */}
        <div className="flex justify-center gap-3 py-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {[
            { icon: Target, value: "25", label: "Perguntas" },
            { icon: Users, value: "6", label: "Áreas" },
            { icon: TrendingUp, value: "PDF", label: "Resultado" }
          ].map((item, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-violet-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative flex flex-col items-center gap-2 px-5 py-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:scale-105 transition-transform duration-200">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                </div>
                <span className="text-sm font-bold text-white drop-shadow-lg">{item.value}</span>
                <span className="text-xs text-white/50">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA Section */}
      <div className="w-full max-w-md space-y-4 relative z-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
          <Button 
            onClick={onStart}
            size="lg"
            className="relative w-full h-16 text-lg font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white hover:opacity-90 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 active:scale-[0.98] border-0"
          >
            <Play className="w-6 h-6 mr-3 fill-current" />
            <span>Iniciar Diagnóstico</span>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4 text-white/50">
          <span className="flex items-center gap-1.5 text-sm">
            <span className="text-base">⏱️</span> 5-7 min
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
          <span className="flex items-center gap-1.5 text-sm">
            <span className="text-base">📊</span> Gratuito
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
          <span className="flex items-center gap-1.5 text-sm">
            <span className="text-base">🎯</span> Preciso
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
