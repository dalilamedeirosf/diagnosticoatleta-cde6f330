import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, Phone, MapPin, Calendar, Heart } from "lucide-react";
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
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 animate-fade-in w-full py-8 md:py-12 safe-area-bottom">
      <div className="w-full max-w-lg space-y-6">
        
        {/* Texts */}
        <div className="space-y-3 text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg uppercase" style={{ color: '#e5c158' }}>
            Informações do Atleta
          </h2>
          <p className="text-lg md:text-xl font-bold text-white tracking-wide max-w-md mx-auto">
            Preencha os dados abaixo para gerar um diagnóstico preciso e personalizado
          </p>
        </div>

        {/* Form panel */}
        <div className="relative">
          {/* Card glow behind */}
          <div className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-gold-600/10 to-gold-800/20 rounded-3xl blur-xl opacity-50" />
          
          <form 
            onSubmit={handleSubmit}
            className="relative bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl rounded-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(212,175,55,0.05)] border border-white/10 space-y-5"
          >
            
            {/* Athlete Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/90 ml-1">Nome completo do atleta</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <input 
                  type="text" 
                  value={athleteName}
                  onChange={(e) => setAthleteName(e.target.value)}
                  placeholder="Digite o nome completo do atleta"
                  className="relative w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold/50 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Athlete Age */}
            <div className="space-y-1.5 flex flex-col relative z-50">
              <label className="text-sm font-medium text-white/90 ml-1">Idade do atleta</label>
              <div className="relative group w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative">
                  <Select value={athleteAge} onValueChange={setAthleteAge}>
                    <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-left text-white focus:ring-0 focus:border-gold/50 rounded-xl shadow-inner outline-none px-4 !ring-offset-0 !ring-transparent">
                      <SelectValue placeholder="Selecione a idade" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1426] border-white/10 text-white shadow-xl max-h-60 rounded-xl">
                      {Array.from({ length: 13 }, (_, i) => i + 7).map((age) => (
                        <SelectItem key={age} value={age.toString()} className="focus:bg-gold/20 focus:text-gold-100">
                          {age} Anos
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Parent Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/90 ml-1">Nome do responsável</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <input 
                  type="text" 
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Nome do responsável"
                  className="relative w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold/50 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Parent WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-white/90 ml-1">WhatsApp do responsável</label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <input 
                  type="text" 
                  value={parentWhatsapp}
                  onChange={(e) => setParentWhatsapp(maskPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className="relative w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold/50 transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            {/* Preferred Foot */}
            <div className="space-y-1.5 flex flex-col relative z-40">
              <label className="text-sm font-medium text-white/90 ml-1">Pé predominante</label>
              <div className="relative group w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative">
                  <Select value={preferredFoot} onValueChange={setPreferredFoot}>
                    <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-left text-white focus:ring-0 focus:border-gold/50 rounded-xl shadow-inner outline-none px-4 !ring-offset-0 !ring-transparent">
                      <SelectValue placeholder="Selecione o pé predominante" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1426] border-white/10 text-white shadow-xl rounded-xl">
                      <SelectItem value="Direito" className="focus:bg-gold/20 focus:text-gold-100">Direito</SelectItem>
                      <SelectItem value="Esquerdo" className="focus:bg-gold/20 focus:text-gold-100">Esquerdo</SelectItem>
                      <SelectItem value="Ambos" className="focus:bg-gold/20 focus:text-gold-100">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Position */}
            <div className="space-y-1.5 flex flex-col relative z-30">
              <label className="text-sm font-medium text-white/90 ml-1">Posição que joga</label>
              <div className="relative group w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative">
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-left text-white focus:ring-0 focus:border-gold/50 rounded-xl shadow-inner outline-none px-4 !ring-offset-0 !ring-transparent">
                      <SelectValue placeholder="Selecione a posição" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1426] border-white/10 text-white shadow-xl rounded-xl max-h-60">
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
              </div>
            </div>

            {/* Surface */}
            <div className="space-y-1.5 flex flex-col relative z-20">
              <label className="text-sm font-medium text-white/90 ml-1">Em qual piso o atleta joga?</label>
              <div className="relative group w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative">
                  <Select value={surface} onValueChange={setSurface}>
                    <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-left text-white focus:ring-0 focus:border-gold/50 rounded-xl shadow-inner outline-none px-4 !ring-offset-0 !ring-transparent">
                      <SelectValue placeholder="Selecione o piso" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1426] border-white/10 text-white shadow-xl rounded-xl">
                      <SelectItem value="Só Campo" className="focus:bg-gold/20 focus:text-gold-100">Só Campo</SelectItem>
                      <SelectItem value="Só Futsal" className="focus:bg-gold/20 focus:text-gold-100">Só Futsal</SelectItem>
                      <SelectItem value="Campo e Futsal" className="focus:bg-gold/20 focus:text-gold-100">Campo e Futsal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Height & Weight */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/90 ml-1">Altura (cm)</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <input
                    type="number"
                    inputMode="numeric"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="Ex: 165"
                    min={80}
                    max={230}
                    className="relative w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold/50 transition-all shadow-inner"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white/90 ml-1">Peso (kg)</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-600/50 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <input
                    type="number"
                    inputMode="numeric"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="Ex: 58"
                    min={20}
                    max={150}
                    className="relative w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold/50 transition-all shadow-inner"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 pb-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold to-gold-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                <Button 
                  type="submit"
                  disabled={!isFormValid}
                  className="relative w-full h-14 text-base font-bold bg-gradient-to-r from-gold-400 via-gold to-gold-600 text-black hover:opacity-90 hover:text-black rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all active:scale-[0.98] border-0 disabled:opacity-50 [-webkit-appearance:none]"
                >
                  Continuar Diagnóstico
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
