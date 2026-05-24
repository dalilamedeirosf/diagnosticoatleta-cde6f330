import logo from "@/assets/craque-em-contrução1.png";
import { Sparkles, Target, UserCog, TrendingUp } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
}

const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <div className="h-[100dvh] w-full bg-[#050B14] relative overflow-hidden font-sans">
      <div className="h-full w-full flex flex-col items-center justify-center py-2 px-2 md:py-8 md:px-4">
        {/* Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

      {/* VR Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs with glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-gold/20 via-gold-600/10 to-transparent rounded-full blur-3xl opacity-50" />
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
            className="w-[90vw] max-w-[600px] opacity-[0.03] object-contain"
          />
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold/50 rounded-full animate-bounce shadow-[0_0_10px_rgba(212,175,55,0.8)]" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-gold-400/40 rounded-full animate-bounce shadow-[0_0_15px_rgba(212,175,55,0.6)]" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gold-300/40 rounded-full animate-bounce shadow-[0_0_10px_rgba(212,175,55,0.6)]" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
      </div>

      <div className="relative z-10 w-full max-w-[700px] flex flex-col items-center py-4">
        
        {/* Top Logo */}
        <div className="relative flex justify-center mb-3 sm:mb-4 lg:mb-5 group cursor-pointer mt-1 sm:mt-0">
          <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[40px] opacity-[0.05] transition-opacity duration-700 group-hover:opacity-[0.3]" />
          <img 
            src={logo} 
            alt="Escudo dourado com a letra C estilizada e o texto CRAQUE EM CONSTRUÇÃO" 
            className="w-16 md:w-28 lg:w-32 relative z-10 transition-transform duration-500 group-hover:scale-105"
            style={{ filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.3))' }}
          />
        </div>

        {/* Tagline Topo */}
        <div className="flex flex-col items-center mb-3 sm:mb-4 text-center w-full">
          <div className="flex items-center justify-center gap-1.5 lg:gap-3 w-full">
            <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 shrink-0" style={{ color: '#d4af37' }} />
            <span 
              className="text-[8px] md:text-[9px] lg:text-[11px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-center"
              style={{ color: '#d4af37' }}
            >
              Avaliação baseada em critérios reais do
            </span>
            <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 shrink-0" style={{ color: '#d4af37' }} />
          </div>
          <span 
            className="text-[8px] md:text-[9px] lg:text-[11px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase mt-0.5 md:mt-1 text-center"
            style={{ color: '#d4af37' }}
          >
            Futebol de base
          </span>
        </div>

        {/* Title */}
        <h1 className="text-center font-bold mb-3 sm:mb-3 lg:mb-4 flex flex-col gap-1 drop-shadow-xl w-full" style={{ color: '#ffffff' }}>
          <span className="text-[20px] md:text-2xl lg:text-3xl uppercase tracking-wide leading-none">
            RAIO-X DO ATLETA
          </span>
          <span className="text-[16px] md:text-[24px] lg:text-[34px] leading-tight tracking-tight">
            Descubra em qual momento<br className="hidden md:block"/> processo seu filho atleta se encontra
          </span>
        </h1>

        {/* Description */}
        <p 
          className="text-center text-[11px] md:text-[11px] lg:text-[13px] leading-tight md:leading-relaxed mb-4 sm:mb-5 lg:mb-6 max-w-[650px] px-1 md:px-0"
          style={{ color: '#b3b3b3' }}
        >
          Seu filho treina, joga e sonha em crescer no futebol. Mas será que você sabe exatamente o que está ajudando ou travando a evolução dele? Com o Raio-X do Atleta, você recebe um diagnóstico baseado em critérios reais do futebol de base e entende quais pontos precisam ser ajustados para o seu filho evoluir.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4 w-full mb-4 md:mb-5 lg:mb-6 px-1 md:px-0">
          {[
            { icon: Target, title: "Raio-X\nCompleto", desc: "Entenda o nivel\natual do seu filho." },
            { icon: UserCog, title: "6 Áreas\nAvaliadas", desc: "Técnica, físico,\nmentalidade e mais." },
            { icon: TrendingUp, title: "Plano de\nEvolução", desc: "Orientações\npráticas para\nmelhorar." }
          ].map((item, index) => (
            <div key={index} className="relative group cursor-pointer h-full">
              <div className="absolute -inset-1 bg-[#d4af37] rounded-xl md:rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="relative bg-[#1C1A14]/90 border border-[#d4af37]/40 rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center text-center shadow-[0_0_15px_rgba(212,175,55,0.1)] backdrop-blur-sm group-hover:bg-gradient-to-b group-hover:from-[#d4af37]/40 group-hover:to-[#927320]/20 group-hover:border-[#d4af37] transition-all duration-500 h-full">
                
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl border border-[#d4af37]/50 flex items-center justify-center mb-2 md:mb-3 lg:mb-4 bg-[#d4af37]/10 group-hover:bg-[#d4af37]/30 transition-colors duration-500">
                  <item.icon className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: '#d4af37' }} />
                </div>
                
                <h3 className="font-bold text-[9px] md:text-[10px] lg:text-[12px] uppercase leading-tight mb-1 md:mb-2 whitespace-pre-line group-hover:text-white transition-colors duration-500" style={{ color: '#ffffff' }}>
                  {item.title}
                </h3>
                
                <p className="text-[8px] md:text-[9px] lg:text-[11px] leading-tight whitespace-pre-line group-hover:text-white transition-colors duration-500" style={{ color: '#b3b3b3' }}>
                  {item.desc}
                </p>
                
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="relative group w-full mb-3 md:mb-5 px-1 md:px-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-xl md:rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300 animate-pulse" />
          <button 
            onClick={onStart}
            className="relative w-full h-[48px] md:h-[56px] lg:h-[64px] rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(to right, #ebd582, #b58e2f)' }}
          >
            <svg width="18" height="18" className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" />
            </svg>
            <span 
              className="font-bold text-[11px] md:text-[13px] lg:text-[16px] uppercase tracking-wide"
              style={{ color: '#000000' }}
            >
              FAZER O RAIO-X DO MEU FILHO AGORA
            </span>
          </button>
        </div>

        {/* Box Frase Impacto */}
        <div 
          className="w-full rounded-xl md:rounded-2xl py-3 md:py-4 lg:py-5 px-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] border-[1.5px] backdrop-blur-md self-center"
          style={{ backgroundColor: '#300c12', borderColor: '#4a151e' }}
        >
          <p className="text-center text-[10px] md:text-[13px] lg:text-[15px] font-medium leading-snug md:leading-[1.6]" style={{ color: '#ffffff' }}>
            "Talento sem direção vira tentativa. Talento com <br className="hidden md:block" />
            <span className="font-bold" style={{ color: '#f8a5b2' }}>diagnóstico vira processo.</span>"
          </p>
        </div>

        </div>

      </div>
    </div>
  );
};

export default QuizStart;
