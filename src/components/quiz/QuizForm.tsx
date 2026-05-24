import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuizFormProps {
  onComplete: (data: any) => void;
}

const QuizForm = ({ onComplete }: QuizFormProps) => {
  const [athleteName, setAthleteName] = useState("");
  const [athleteAge, setAthleteAge] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentWhatsapp, setParentWhatsapp] = useState("");
  const [preferredFoot, setPreferredFoot] = useState("");
  const [position, setPosition] = useState("");
  const [surface, setSurface] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const maskPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const isFormValid =
    athleteName.trim().length > 2 &&
    athleteAge &&
    parentName.trim().length > 2 &&
    parentWhatsapp.replace(/\D/g, '').length >= 10 &&
    preferredFoot &&
    position &&
    surface &&
    heightCm &&
    weightKg;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onComplete({
        athleteName,
        athleteAge,
        parentName,
        parentWhatsapp,
        preferredFoot,
        position,
        surface,
        heightCm,
        weightKg,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 md:px-5 py-[30px] md:py-[40px] relative z-10 animate-fade-in w-full max-w-[520px] mx-auto safe-area-bottom">
      
      <h1 className="text-center text-[42px] md:text-[58px] font-[900] uppercase text-[#f4c542] leading-[1] mb-6 tracking-wide drop-shadow-lg w-full">
        INFORMAÇÕES DO ATLETA
      </h1>

      <p className="text-center text-white text-[18px] md:text-[22px] font-bold leading-[1.4] mb-10 w-full">
        Preencha os dados abaixo para gerar um<br className="hidden md:block" />
        diagnóstico preciso e personalizado
      </p>

      {/* Card Form */}
      <div className="w-full bg-[#232323]/72 border border-white/10 backdrop-blur-[12px] rounded-[24px] md:rounded-[30px] p-[22px] md:p-[34px] shadow-[0_0_40px_rgba(0,0,0,0.5),_inset_0_0_40px_rgba(255,255,255,0.02)]">
        <form onSubmit={handleSubmit} className="w-full">
          
          {/* Athlete Name */}
          <div className="mb-7">
            <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
              Nome completo do atleta
            </label>
            <input 
              type="text" 
              value={athleteName}
              onChange={(e) => setAthleteName(e.target.value)}
              placeholder="Digite o nome completo do atleta"
              className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-white px-6 text-[16px] md:text-[20px] outline-none placeholder:text-white/35 focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] transition-all duration-200"
              required
            />
          </div>

          {/* Athlete Age */}
          <div className="mb-7 flex flex-col relative z-50">
            <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
              Idade do atleta
            </label>
            <Select value={athleteAge} onValueChange={setAthleteAge}>
              <SelectTrigger className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-left text-white px-6 text-[16px] md:text-[20px] outline-none transition-all focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] !ring-offset-0 !ring-transparent">
                <SelectValue placeholder="Selecione a idade" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1115] border-white/10 text-white shadow-xl max-h-60 rounded-xl">
                {Array.from({ length: 13 }, (_, i) => i + 7).map((age) => (
                  <SelectItem key={age} value={age.toString()} className="focus:bg-gold/20 focus:text-gold-100">
                    {age} Anos
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Parent Name */}
          <div className="mb-7">
            <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
              Nome do responsável
            </label>
            <input 
              type="text" 
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Nome do responsável"
              className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-white px-6 text-[16px] md:text-[20px] outline-none placeholder:text-white/35 focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] transition-all duration-200"
              required
            />
          </div>

          {/* Parent WhatsApp */}
          <div className="mb-7">
            <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
              WhatsApp do responsável
            </label>
            <input 
              type="text" 
              value={parentWhatsapp}
              onChange={(e) => setParentWhatsapp(maskPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              maxLength={15}
              className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-white px-6 text-[16px] md:text-[20px] outline-none placeholder:text-white/35 focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] transition-all duration-200"
              required
            />
          </div>

          {/* Preferred Foot */}
          <div className="mb-7 flex flex-col relative z-40">
            <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
              Pé predominante
            </label>
            <Select value={preferredFoot} onValueChange={setPreferredFoot}>
              <SelectTrigger className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-left text-white px-6 text-[16px] md:text-[20px] outline-none transition-all focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] !ring-offset-0 !ring-transparent">
                <SelectValue placeholder="Selecione o pé predominante" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1115] border-white/10 text-white shadow-xl rounded-xl">
                <SelectItem value="Direito" className="focus:bg-gold/20 focus:text-gold-100">Direito</SelectItem>
                <SelectItem value="Esquerdo" className="focus:bg-gold/20 focus:text-gold-100">Esquerdo</SelectItem>
                <SelectItem value="Ambos" className="focus:bg-gold/20 focus:text-gold-100">Ambos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Position */}
          <div className="mb-7 flex flex-col relative z-30">
            <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
              Posição que joga
            </label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-left text-white px-6 text-[16px] md:text-[20px] outline-none transition-all focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] !ring-offset-0 !ring-transparent">
                <SelectValue placeholder="Selecione a posição" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1115] border-white/10 text-white shadow-xl rounded-xl max-h-60">
                <SelectItem value="Goleiro" className="focus:bg-gold/20 focus:text-gold-100">Goleiro</SelectItem>
                <SelectItem value="Zagueiro" className="focus:bg-gold/20 focus:text-gold-100">Zagueiro</SelectItem>
                <SelectItem value="Lateral" className="focus:bg-gold/20 focus:text-gold-100">Lateral</SelectItem>
                <SelectItem value="Volante" className="focus:bg-gold/20 focus:text-gold-100">Volante</SelectItem>
                <SelectItem value="Meia" className="focus:bg-gold/20 focus:text-gold-100">Meia</SelectItem>
                <SelectItem value="Extremo / Ponta" className="focus:bg-gold/20 focus:text-gold-100">Extremo / Ponta</SelectItem>
                <SelectItem value="Atacante" className="focus:bg-gold/20 focus:text-gold-100">Atacante</SelectItem>
                <SelectItem value="Pivô (Futsal)" className="focus:bg-gold/20 focus:text-gold-100">Pivô (Futsal)</SelectItem>
                <SelectItem value="Fixo (Futsal)" className="focus:bg-gold/20 focus:text-gold-100">Fixo (Futsal)</SelectItem>
                <SelectItem value="Ala (Futsal)" className="focus:bg-gold/20 focus:text-gold-100">Ala (Futsal)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Surface */}
          <div className="mb-7 flex flex-col relative z-20">
            <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
              Em qual piso o atleta joga?
            </label>
            <Select value={surface} onValueChange={setSurface}>
              <SelectTrigger className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-left text-white px-6 text-[16px] md:text-[20px] outline-none transition-all focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] !ring-offset-0 !ring-transparent">
                <SelectValue placeholder="Selecione o piso" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1115] border-white/10 text-white shadow-xl rounded-xl">
                <SelectItem value="Só Campo" className="focus:bg-gold/20 focus:text-gold-100">Só Campo</SelectItem>
                <SelectItem value="Só Futsal" className="focus:bg-gold/20 focus:text-gold-100">Só Futsal</SelectItem>
                <SelectItem value="Campo e Futsal" className="focus:bg-gold/20 focus:text-gold-100">Campo e Futsal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Height & Weight */}
          <div className="flex gap-5 mb-7">
            <div className="flex-1 min-w-0">
              <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
                Altura (cm)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="Ex: 165"
                min={80}
                max={230}
                className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-white px-6 text-[16px] md:text-[20px] outline-none placeholder:text-white/35 focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] transition-all duration-200"
                required
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-white text-[16px] md:text-[20px] font-bold mb-[14px]">
                Peso (kg)
              </label>
              <input
                type="number"
                inputMode="numeric"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="Ex: 58"
                min={20}
                max={150}
                className="w-full h-[60px] md:h-[72px] rounded-[18px] md:rounded-[22px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] text-white px-6 text-[16px] md:text-[20px] outline-none placeholder:text-white/35 focus:border-[#f4c542] focus:shadow-[0_0_0_3px_rgba(244,197,66,0.15)] transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={!isFormValid}
            className="w-full h-[66px] md:h-[78px] border-none rounded-[18px] md:rounded-[22px] bg-gradient-to-r from-[#efe7aa] to-[#d8aa22] text-[#2b2200] text-[22px] md:text-[26px] font-[800] cursor-pointer mt-2.5 shadow-[0_0_25px_rgba(255,215,0,0.45),_0_0_60px_rgba(255,215,0,0.15)] transition-all duration-250 hover:-translate-y-[2px] hover:brightness-[1.03] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            Continuar Diagnóstico →
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
