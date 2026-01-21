export interface QuizOption {
  label: string;
  value: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizBlock {
  id: number;
  title: string;
  color: 'green' | 'yellow' | 'blue' | 'purple' | 'orange' | 'red';
  emoji: string;
  questions: QuizQuestion[];
}

export const quizBlocks: QuizBlock[] = [
  {
    id: 1,
    title: "Perfil do Atleta (Base)",
    color: "green",
    emoji: "🟢",
    questions: [
      {
        id: 1,
        question: "Idade do atleta",
        options: [
          { label: "Até 10 anos", value: 1 },
          { label: "11–12 anos", value: 2 },
          { label: "13–14 anos", value: 3 },
          { label: "15–16 anos", value: 4 },
          { label: "17+", value: 5 },
        ],
      },
      {
        id: 2,
        question: "Há quanto tempo ele joga futebol de forma organizada?",
        options: [
          { label: "Menos de 1 ano", value: 1 },
          { label: "1–2 anos", value: 2 },
          { label: "3–4 anos", value: 3 },
          { label: "5 anos ou mais", value: 4 },
        ],
      },
      {
        id: 3,
        question: "Atualmente ele treina:",
        options: [
          { label: "1–2x por semana", value: 1 },
          { label: "3x por semana", value: 2 },
          { label: "4–5x por semana", value: 3 },
          { label: "Todos os dias", value: 4 },
        ],
      },
      {
        id: 4,
        question: "Onde ele joga hoje?",
        options: [
          { label: "Escola / projeto social", value: 1 },
          { label: "Clube pequeno / local", value: 2 },
          { label: "Clube estruturado", value: 3 },
          { label: "Clube de base tradicional", value: 4 },
        ],
      },
      {
        id: 5,
        question: "Já participou de competições oficiais?",
        options: [
          { label: "Nunca", value: 1 },
          { label: "Poucas vezes", value: 2 },
          { label: "Frequente (campeonatos regulares)", value: 3 },
          { label: "Competições de alto nível", value: 4 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Jogo e Performance",
    color: "yellow",
    emoji: "🟡",
    questions: [
      {
        id: 6,
        question: "Em jogos, o atleta costuma:",
        options: [
          { label: "Jogar seguro, quase não arrisca", value: 1 },
          { label: "Arriscar às vezes", value: 2 },
          { label: "Arriscar com frequência", value: 3 },
          { label: "Chamar a responsabilidade", value: 4 },
        ],
      },
      {
        id: 7,
        question: "Quando erra uma jogada, ele geralmente:",
        options: [
          { label: "Se desanima e some do jogo", value: 1 },
          { label: "Fica inseguro por alguns minutos", value: 2 },
          { label: "Segue jogando normal", value: 3 },
          { label: "Usa o erro como motivação", value: 4 },
        ],
      },
      {
        id: 8,
        question: "Comparando treino e jogo, ele rende melhor:",
        options: [
          { label: "Muito melhor no treino", value: 1 },
          { label: "Um pouco melhor no treino", value: 2 },
          { label: "Igual", value: 3 },
          { label: "Melhor no jogo", value: 4 },
        ],
      },
      {
        id: 9,
        question: "Em termos físicos, durante a partida ele:",
        options: [
          { label: "Cansa rápido", value: 1 },
          { label: "Cai muito no segundo tempo", value: 2 },
          { label: "Mantém o ritmo razoável", value: 3 },
          { label: "Sustenta intensidade até o fim", value: 4 },
        ],
      },
      {
        id: 10,
        question: "Hoje, o maior ponto fraco dentro de campo é:",
        options: [
          { label: "Condicionamento físico", value: 1 },
          { label: "Confiança / coragem", value: 2 },
          { label: "Tomada de decisão", value: 3 },
          { label: "Concentração", value: 4 },
          { label: "Não sei dizer", value: 0 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Mentalidade e Competitividade",
    color: "blue",
    emoji: "🔵",
    questions: [
      {
        id: 11,
        question: "O atleta gosta de competir?",
        options: [
          { label: "Evita jogos decisivos", value: 1 },
          { label: "Compete, mas sente muita pressão", value: 2 },
          { label: "Gosta, mas oscila", value: 3 },
          { label: "Se sente vivo competindo", value: 4 },
        ],
      },
      {
        id: 12,
        question: "Em jogos importantes, ele costuma:",
        options: [
          { label: "Travar", value: 1 },
          { label: "Oscilar bastante", value: 2 },
          { label: "Manter o nível", value: 3 },
          { label: "Crescer", value: 4 },
        ],
      },
      {
        id: 13,
        question: "Como ele reage a críticas do treinador?",
        options: [
          { label: "Leva para o lado pessoal", value: 1 },
          { label: "Fica na defensiva", value: 2 },
          { label: "Escuta e tenta ajustar", value: 3 },
          { label: "Usa para evoluir rápido", value: 4 },
        ],
      },
      {
        id: 14,
        question: "O atleta acredita no próprio potencial?",
        options: [
          { label: "Não", value: 1 },
          { label: "Às vezes", value: 2 },
          { label: "Sim, mas ainda com dúvidas", value: 3 },
          { label: "Sim, claramente", value: 4 },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Ambiente Familiar",
    color: "purple",
    emoji: "🟣",
    questions: [
      {
        id: 15,
        question: "Quem acompanha mais de perto a rotina do atleta?",
        options: [
          { label: "Ninguém", value: 1 },
          { label: "Um dos pais", value: 2 },
          { label: "Ambos os pais", value: 3 },
          { label: "Pais + outro responsável", value: 4 },
        ],
      },
      {
        id: 16,
        question: "Em casa, o futebol é tratado como:",
        options: [
          { label: "Hobby", value: 1 },
          { label: "Algo importante, mas sem conversa", value: 2 },
          { label: "Projeto em construção", value: 3 },
          { label: "Prioridade clara", value: 4 },
        ],
      },
      {
        id: 17,
        question: "Após jogos ruins, a família costuma:",
        options: [
          { label: "Cobrar bastante", value: 1 },
          { label: "Ficar em silêncio", value: 2 },
          { label: "Conversar com cuidado", value: 3 },
          { label: "Ajudar a tirar aprendizados", value: 4 },
        ],
      },
      {
        id: 18,
        question: "Após jogos bons, a família:",
        options: [
          { label: "Cobra mais ainda", value: 1 },
          { label: "Age como se fosse obrigação", value: 2 },
          { label: "Reconhece o esforço", value: 3 },
          { label: "Celebra evolução e atitude", value: 4 },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Rotina e Suporte",
    color: "orange",
    emoji: "🟠",
    questions: [
      {
        id: 19,
        question: "Quantas horas de sono, em média, ele dorme por noite?",
        options: [
          { label: "Menos de 7h", value: 1 },
          { label: "7h", value: 2 },
          { label: "8h", value: 3 },
          { label: "9h ou mais", value: 4 },
        ],
      },
      {
        id: 20,
        question: "Tempo médio de telas por dia (celular/videogame):",
        options: [
          { label: "Mais de 5h", value: 1 },
          { label: "3–4h", value: 2 },
          { label: "1–2h", value: 3 },
          { label: "Menos de 1h", value: 4 },
        ],
      },
      {
        id: 21,
        question: "A alimentação do atleta é:",
        options: [
          { label: "Totalmente livre", value: 1 },
          { label: "Um pouco controlada", value: 2 },
          { label: "Bem orientada", value: 3 },
          { label: "Planejada para performance", value: 4 },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Direção e Objetivo",
    color: "red",
    emoji: "🔴",
    questions: [
      {
        id: 22,
        question: "O maior sonho do atleta no futebol é:",
        options: [
          { label: "Jogar por diversão", value: 1 },
          { label: "Ser bom no time atual", value: 2 },
          { label: "Chegar a um clube grande", value: 3 },
          { label: "Ser profissional", value: 4 },
        ],
      },
      {
        id: 23,
        question: "Os pais acreditam que esse sonho é:",
        options: [
          { label: "Irreal", value: 1 },
          { label: "Difícil, mas possível", value: 2 },
          { label: "Possível com orientação", value: 3 },
          { label: "Totalmente alcançável", value: 4 },
        ],
      },
      {
        id: 24,
        question: "Hoje, o maior travamento do atleta é:",
        options: [
          { label: "Falta de direção", value: 1 },
          { label: "Falta de confiança", value: 2 },
          { label: "Falta de preparo físico", value: 3 },
          { label: "Ambiente confuso", value: 4 },
          { label: "Tudo um pouco", value: 0 },
        ],
      },
      {
        id: 25,
        question: "Quanto vocês estão dispostos a se dedicar para destravar esse processo?",
        options: [
          { label: "Pouco, só orientações gerais", value: 1 },
          { label: "Ajustes básicos", value: 2 },
          { label: "Mudanças reais na rotina", value: 3 },
          { label: "Compromisso total com acompanhamento", value: 4 },
        ],
      },
    ],
  },
];

export const getTotalQuestions = (): number => {
  return quizBlocks.reduce((acc, block) => acc + block.questions.length, 0);
};
