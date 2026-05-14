import logo from "@/assets/craque-em-contrução1.png";
import { Button } from "@/components/ui/button";
import { Play, Target, Users, TrendingUp, Sparkles } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
}

const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-between px-6 py-8 bg-[#050B14] relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

      {/* VR Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs with glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-gold/20 via-gold-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-gradient-to-tr from-gold-400/10 to-gold-700/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-gold/15 to-gold-600/10 rounded-full blur-3xl" />
        
        {/* Grid overlay - VR style */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-gold/10 via-transparent to-transparent rounded-full" />
        
        {/* Large centered logo watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img 
            src={logo} 
            alt="" 
            className="w-[90vw] max-w-lg opacity-[0.03] object-contain"
          />
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold/50 rounded-full animate-bounce shadow-[0_0_10px_rgba(212,175,55,0.8)]" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-gold-400/40 rounded-full animate-bounce shadow-[0_0_15px_rgba(212,175,55,0.6)]" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gold-300/40 rounded-full animate-bounce shadow-[0_0_10px_rgba(212,175,55,0.6)]" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full text-center space-y-8 relative z-10">
        {/* Premium Logo with Glow */}
        <div className="relative flex justify-center mb-4 group">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold-600 rounded-full blur-3xl scale-150 opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
          <img 
            src={logo} 
            alt="Craque em Construção" 
            className="h-28 md:h-36 lg:h-40 object-contain relative z-10 animate-fade-in"
            style={{ filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.3)) drop-shadow(0 0 80px rgba(212,175,55,0.1))' }}
          />
        </div>

        {/* Title with Premium Typography */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] md:tracking-[0.3em] text-gold-300 uppercase">
              Avaliação baseada em critérios reais do futebol de base
            </span>
            <Sparkles className="w-5 h-5 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] px-2">
            Descubra o que está travando a evolução do atleta
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-md mx-auto leading-relaxed px-4">
            A maioria dos atletas não evolui por erros que ninguém mostra. Esse diagnóstico revela exatamente onde está o problema.
          </p>
        </div>

        {/* Premium Feature Cards - Holographic */}
        <div className="flex justify-center gap-2 md:gap-3 py-4 animate-fade-in w-full px-2" style={{ animationDelay: '0.2s' }}>
          {[
            { icon: Target, value: "Raio-X completo", label: "Diagnóstico técnico do nível atual" },
            { icon: Users, value: "6 áreas", label: "Críticas selecionadas" },
            { icon: TrendingUp, value: "Plano de evolução", label: "Orientações práticas em PDF" }
          ].map((item, index) => (
            <div key={index} className="relative group flex-1">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-gold to-gold-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative flex flex-col items-center gap-2 px-2 md:px-5 py-4 h-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl rounded-2xl border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:scale-[1.03] transition-transform duration-200">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gold/30 to-gold-600/20 flex items-center justify-center border border-gold/30">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                </div>
                <span className="text-xs md:text-sm font-bold text-white drop-shadow-lg text-center leading-tight">{item.value}</span>
                <span className="text-[10px] md:text-xs text-gold-100/70 text-center leading-tight">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA Section */}
      <div className="w-full max-w-md space-y-5 flex flex-col items-center relative z-10 animate-fade-in pb-4" style={{ animationDelay: '0.3s' }}>
        <div className="relative group w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300 animate-pulse" />
          <Button 
            onClick={onStart}
            size="lg"
            className="relative w-full h-16 text-lg font-bold bg-gradient-to-r from-gold-400 via-gold to-gold-600 text-black hover:opacity-95 hover:text-black hover:scale-[1.02] rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 active:scale-[0.98] border-0"
          >
            <Play className="w-6 h-6 mr-3 fill-current" />
            <span>Fazer Diagnóstico Agora</span>
          </Button>
        </div>
        
        {/* Microcopy & Pain Trigger */}
        <div className="space-y-3 w-full">
          {" "}
          <div className="bg-red-900/10 border border-red-500/10 rounded-lg py-2 px-4 shadow-[inset_0_0_15px_rgba(255,0,0,0.03)] backdrop-blur-sm">
             <p className="text-xs md:text-sm text-center text-red-100/70 font-medium italic">
                "Mais de 70% dos atletas travam por falta de direção — veja se esse é o caso."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
