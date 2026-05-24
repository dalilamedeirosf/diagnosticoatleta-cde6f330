import logo from "@/assets/craque-em-contrução1.png";
import { Sparkles, Target, UserCog, TrendingUp } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
}

const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <div className="min-h-[100dvh] w-full bg-[#050B14] relative overflow-x-hidden overflow-y-auto font-sans">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

      {/* VR Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-gold/20 via-gold-600/10 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-gradient-to-tr from-gold-400/10 to-gold-700/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-gold/15 to-gold-600/10 rounded-full blur-3xl" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
        
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }} />
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-gold/10 via-transparent to-transparent rounded-full" />
        
        {/* Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={logo} alt="" className="w-[90vw] max-w-[600px] opacity-[0.03] object-contain" />
        </div>

        {/* Particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold/50 rounded-full animate-bounce shadow-[0_0_10px_rgba(212,175,55,0.8)]" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-gold-400/40 rounded-full animate-bounce shadow-[0_0_15px_rgba(212,175,55,0.6)]" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gold-300/40 rounded-full animate-bounce shadow-[0_0_10px_rgba(212,175,55,0.6)]" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
      </div>

      {/* === CONTEÚDO PRINCIPAL === */}
      <div className="min-h-[100dvh] w-full flex flex-col items-center px-[5%] md:px-6 lg:px-8 py-6 md:py-8 relative z-10">
        
        {/* TOPO: Logo + Tagline */}
        <div className="flex flex-col items-center w-full max-w-[700px] mb-[4vh] md:mb-8">
          {/* Logo - responsiva com clamp */}
          <div className="relative flex justify-center mb-3 md:mb-4 group cursor-pointer">
            <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-[40px] opacity-[0.05] transition-opacity duration-700 group-hover:opacity-[0.3]" />
            <img 
              src={logo} 
              alt="Escudo dourado com a letra C estilizada e o texto CRAQUE EM CONSTRUÇÃO" 
              className="relative z-10 transition-transform duration-500 group-hover:scale-105"
              style={{ 
                width: 'clamp(70px, 22vw, 144px)',
                filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))' 
              }}
            />
          </div>
          {/* Subtítulo Dourado */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="flex items-center justify-center gap-1.5 lg:gap-3 w-full">
              <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" style={{ color: '#d4af37' }} />
              <span className="font-bold tracking-[0.12em] md:tracking-[0.2em] uppercase" style={{ color: '#d4af37', fontSize: 'clamp(9px, 2.8vw, 12px)' }}>
                Avaliação baseada em critérios reais do
              </span>
              <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" style={{ color: '#d4af37' }} />
            </div>
            <span className="font-bold tracking-[0.18em] md:tracking-[0.2em] uppercase mt-1" style={{ color: '#d4af37', fontSize: 'clamp(9px, 2.8vw, 12px)' }}>
              Futebol de base
            </span>
          </div>
        </div>

        {/* MEIO: Título + Descrição + Cards */}
        <div className="flex flex-col items-center w-full max-w-[700px] flex-1">
          
          {/* H1 - Título Principal */}
          <h1 className="text-center font-bold mb-2 md:mb-4 drop-shadow-xl w-full uppercase tracking-wide leading-none" style={{ color: '#ffffff', fontSize: 'clamp(22px, 7vw, 38px)' }}>
            RAIO-X DO ATLETA
          </h1>

          {/* H2 - Subtítulo */}
          <h2 className="text-center font-bold mb-[3vh] md:mb-5 w-full tracking-tight" style={{ color: '#ffffff', fontSize: 'clamp(16px, 5vw, 34px)', lineHeight: '1.3' }}>
            Descubra em qual momento do processo seu filho atleta se encontra
          </h2>

          {/* Parágrafo */}
          <p className="text-center mb-[3vh] md:mb-8 max-w-[600px] px-1 md:px-0" style={{ color: '#b3b3b3', fontSize: 'clamp(11px, 3.3vw, 15px)', lineHeight: '1.5' }}>
            Seu filho treina, joga e sonha em crescer no futebol. Mas será que você sabe exatamente o que está ajudando ou travando a evolução dele? Com o Raio-X do Atleta, você recebe um diagnóstico baseado em critérios reais do futebol de base e entende quais pontos precisam ser ajustados para o seu filho evoluir.
          </p>

          {/* Cards - 1 coluna mobile, 3 colunas desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3 lg:gap-4 w-[92%] md:w-full mx-auto mb-[3vh] md:mb-8">
            {[
              { icon: Target, title: "RAIO-X COMPLETO", desc: "Entenda o nível atual do seu filho atleta." },
              { icon: UserCog, title: "6 ÁREAS AVALIADAS", desc: "Técnica, físico, mentalidade, comportamento, rotina e competitividade." },
              { icon: TrendingUp, title: "PLANO DE EVOLUÇÃO", desc: "Receba orientações práticas para melhorar o processo." }
            ].map((item, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-[#d4af37] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative bg-[#1C1A14]/90 border border-[#d4af37]/40 rounded-xl p-4 md:p-4 lg:p-5 flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0 shadow-[0_0_15px_rgba(212,175,55,0.1)] backdrop-blur-sm group-hover:bg-gradient-to-b group-hover:from-[#d4af37]/40 group-hover:to-[#927320]/20 group-hover:border-[#d4af37] transition-all duration-500">
                  
                  <div className="rounded-xl border border-[#d4af37]/50 flex items-center justify-center shrink-0 md:mb-3 bg-[#d4af37]/10 group-hover:bg-[#d4af37]/30 transition-colors duration-500" style={{ width: 'clamp(40px, 10vw, 48px)', height: 'clamp(40px, 10vw, 48px)' }}>
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: '#d4af37' }} />
                  </div>
                  
                  <div className="flex flex-col md:items-center">
                    <h3 className="font-bold uppercase leading-tight mb-1 group-hover:text-white transition-colors duration-500" style={{ color: '#ffffff', fontSize: 'clamp(11px, 3.2vw, 13px)' }}>
                      {item.title}
                    </h3>
                    <p className="leading-relaxed group-hover:text-white transition-colors duration-500" style={{ color: '#b3b3b3', fontSize: 'clamp(10px, 3vw, 12px)' }}>
                      {item.desc}
                    </p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FUNDO: Botão + Frase */}
        <div className="flex flex-col items-center w-[92%] md:w-full max-w-[700px] gap-3 mt-auto mb-2">
          {/* CTA Button */}
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300 animate-pulse" />
            <button 
              onClick={onStart}
              className="relative w-full rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_30px_rgba(212,175,55,0.3)]"
              style={{ 
                background: 'linear-gradient(135deg, #f0d97a, #c9952e, #b58e2f)',
                height: 'clamp(48px, 8vh, 64px)'
              }}
            >
              <svg width="18" height="18" className="w-5 h-5 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3L19 12L5 21V3Z" />
              </svg>
              <span className="font-extrabold uppercase tracking-wider" style={{ color: '#000000', fontSize: 'clamp(11px, 3.2vw, 16px)' }}>
                FAZER O RAIO-X DO MEU FILHO AGORA
              </span>
            </button>
          </div>

          {/* Frase Impacto */}
          <div 
            className="w-full rounded-2xl py-3 md:py-4 lg:py-5 px-4 md:px-5 shadow-[0_0_25px_rgba(0,0,0,0.5)] border-[1.5px] backdrop-blur-md"
            style={{ backgroundColor: '#300c12', borderColor: '#4a151e' }}
          >
            <p className="text-center font-medium leading-relaxed" style={{ color: '#ffffff', fontSize: 'clamp(10px, 3vw, 15px)' }}>
              "Talento sem direção vira tentativa. Talento com{' '}
              <span className="font-bold" style={{ color: '#f8a5b2' }}>diagnóstico vira processo.</span>"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizStart;
