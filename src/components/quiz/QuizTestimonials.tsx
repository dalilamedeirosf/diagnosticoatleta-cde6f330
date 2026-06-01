import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import logo from "@/assets/craque-em-contrução1.png";

import depoVini from "@/assets/depo-vini.jpg";
import depoCaio from "@/assets/depo-caio.jpg";
import depoDavi from "@/assets/depo-davi.jpg";
import depoNickollas from "@/assets/depo-nickollas.jpg";
import depoLorenzo from "@/assets/depo-lorenzo.jpg";

interface QuizTestimonialsProps {
  onContinue: () => void;
}

const QuizTestimonials = ({ onContinue }: QuizTestimonialsProps) => {
  const images = [
    { src: depoVini, alt: "Vini Jr" },
    { src: depoCaio, alt: "Caio Breno" },
    { src: depoDavi, alt: "Davi" },
    { src: depoNickollas, alt: "Nickollas" },
    { src: depoLorenzo, alt: "Lorenzo Cunha" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-[#050B14] relative overflow-x-hidden overflow-y-auto px-4 py-6">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

      {/* Subtle Navy Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light/20 via-transparent to-black pointer-events-none" />

      {/* VR Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-gradient-to-b from-gold/15 via-gold-600/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-gold-500/10 to-gold-700/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-gold/10 to-gold-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md mx-auto w-full flex flex-col gap-6 relative z-10 my-auto animate-fade-in">
        {/* Logo / Header */}
        <div className="flex justify-between items-center">
          <img src={logo} alt="Craque em Construção" className="h-10 object-contain" />
          <div className="flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-full px-3 py-1">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="text-[10px] text-gold font-bold tracking-wider uppercase">Casos de Sucesso</span>
          </div>
        </div>

        {/* Text Section */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 to-gold-600/20 rounded-2xl blur-md opacity-45" />
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl text-center">
            <h2 className="text-base sm:text-lg font-black text-white leading-relaxed tracking-wide">
              Você sabia que o Moacyr Pereira está há mais de 15 anos atuando diretamente na formação de atletas?
            </h2>
            <p className="text-xs sm:text-sm text-gold/90 font-bold mt-3 uppercase tracking-wider">
              Veja alguns dos seus resultados:
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative w-full aspect-square max-w-[340px] group flex items-center justify-center">
            {/* Card Shadow/Glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-transparent to-gold-800/20 rounded-2xl blur-lg opacity-60" />

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Active Image */}
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-black/40">
              <img
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                className="w-full h-full object-cover select-none animate-scale-up"
              />
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-gold w-4" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity animate-pulse" />
          <Button
            onClick={onContinue}
            size="lg"
            className="relative w-full h-14 text-base font-bold bg-gradient-to-r from-gold-400 via-gold to-gold-600 text-black hover:opacity-95 hover:text-black rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all active:scale-[0.98] border-0"
          >
            Ver Meu Resultado
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizTestimonials;
