export interface QuizOption {
  label: string;
  value: number;
  image?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  isMultiSelect?: boolean;
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
        id: 3,
        question: "Onde o atleta está inserido atualmente?",
        options: [
          { label: "Escolinha de futebol", value: 1 },
          { label: "Projeto social", value: 2 },
          { label: "Base não federada", value: 3 },
          { label: "Clube que disputa federação", value: 4 },
          { label: "Nível profissional", value: 5 },
        ],
      },
      {
        id: 4,
        question: "Há quanto tempo o atleta treina futebol de forma estruturada?",
        options: [
          { label: "Menos de 1 ano", value: 1 },
          { label: "1 a 2 anos", value: 2 },
          { label: "3 a 4 anos", value: 3 },
          { label: "5 anos ou mais", value: 4 },
        ],
      },
      {
        id: 5,
        question: "Qual é a frequência semanal de treinos do atleta?",
        options: [
          { label: "1 a 2 vezes por semana", value: 1 },
          { label: "3 vezes por semana", value: 2 },
          { label: "4 a 5 vezes por semana", value: 3 },
          { label: "Todos os dias", value: 4 },
        ],
      },
      {
        id: 6,
        question: "Qual o nível de competições que o atleta já participou?",
        options: [
          { label: "Nunca participou", value: 1 },
          { label: "Competições de escolinha", value: 2 },
          { label: "Competições de base", value: 3 },
          { label: "Competições federadas", value: 4 },
          { label: "Competições em nível profissional", value: 5 },
        ],
      },
      {
        id: 101,
        question: "Qual função tática ele cumpre HOJE dentro da posição?",
        options: [
          { label: "Ainda não tem função clara", value: 1 },
          { label: "Função genérica da posição", value: 2 },
          { label: "Função definida, mas oscila", value: 3 },
          { label: "Função clara e bem executada (ex.: volante construtor, extremo de amplitude)", value: 4 },
        ],
      },
      {
        id: 102,
        question: "Ele entende qual é a 'função dentro da função' que o treinador pede?",
        options: [
          { label: "Não entende", value: 1 },
          { label: "Entende parcialmente", value: 2 },
          { label: "Entende, mas erra na execução", value: 3 },
          { label: "Entende e executa bem", value: 4 },
        ],
      },
      {
        id: 103,
        question: "Histórico de lesões do atleta:",
        options: [
          { label: "Lesão grave recente / recorrente", value: 1 },
          { label: "Lesões leves frequentes", value: 2 },
          { label: "Já teve, mas recuperou bem", value: 3 },
          { label: "Nunca teve lesão relevante", value: 4 },
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
        id: 7,
        question: "Durante o jogo, como o atleta se comporta na maioria das vezes?",
        options: [
          { label: "Joga com segurança e evita riscos", value: 1 },
          { label: "Arrisca em alguns momentos", value: 2 },
          { label: "Busca participar bastante do jogo", value: 3 },
          { label: "Assume protagonismo", value: 4 },
          { label: "Chama a responsabilidade em momentos importantes", value: 5 },
        ],
      },
      {
        id: 8,
        question: "Como o atleta reage após cometer um erro em campo?",
        options: [
          { label: "Se abala e se retrai", value: 1 },
          { label: "Fica inseguro por um tempo", value: 2 },
          { label: "Segue jogando normalmente", value: 3 },
          { label: "Usa o erro como motivação", value: 4 },
        ],
      },
      {
        id: 9,
        question: "Onde o atleta apresenta melhor desempenho?",
        options: [
          { label: "Muito melhor no treino", value: 1 },
          { label: "Um pouco melhor no treino", value: 2 },
          { label: "Igual nos dois", value: 3 },
          { label: "Melhor no jogo", value: 4 },
        ],
      },
      {
        id: 10,
        question: "Quais fatores mais estão limitando o desempenho do atleta hoje?",
        isMultiSelect: true,
        options: [
          { label: "Condicionamento físico", value: 1 },
          { label: "Falta de confiança", value: 2 },
          { label: "Medo de errar", value: 3 },
          { label: "Dificuldade na tomada de decisão", value: 4 },
          { label: "Falta de concentração", value: 5 },
          { label: "Oscilação emocional", value: 6 },
          { label: "Falta de orientação/treinamento adequado", value: 7 },
          { label: "Não está claro ainda", value: 0 },
        ],
      },
      {
        id: 201,
        question: "Como ele lê o jogo quando NÃO está com a bola?",
        options: [
          { label: "Reage atrasado, sempre corre atrás", value: 1 },
          { label: "Reage no tempo certo, mas não antecipa", value: 2 },
          { label: "Antecipa em algumas jogadas", value: 3 },
          { label: "Antecipa constantemente, lê o jogo à frente", value: 4 },
        ],
      },
      {
        id: 202,
        question: "Velocidade de decisão com a bola:",
        options: [
          { label: "Demora muito, perde a jogada", value: 1 },
          { label: "Decide, mas hesita bastante", value: 2 },
          { label: "Decide rápido na maioria das vezes", value: 3 },
          { label: "Decide rápido e com qualidade", value: 4 },
        ],
      },
      {
        id: 203,
        question: "Em qual fase do jogo ele MAIS trava?",
        options: [
          { label: "Saída de bola / construção", value: 1 },
          { label: "Criação / passe decisivo", value: 2 },
          { label: "1x1 / finalização", value: 3 },
          { label: "Pressão / recomposição defensiva", value: 4 },
          { label: "Não trava em fase específica", value: 5 },
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
        question: "Como o atleta se comporta em ambientes competitivos?",
        isMultiSelect: true,
        options: [
          { label: "Evita jogos difíceis", value: 1 },
          { label: "Sente muita pressão", value: 2 },
          { label: "Oscila bastante", value: 3 },
          { label: "Compete normalmente", value: 4 },
          { label: "Gosta de competir", value: 5 },
          { label: "Cresce em jogos importantes", value: 6 },
          { label: "Se destaca sob pressão", value: 7 },
        ],
      },
      {
        id: 12,
        question: "O atleta gosta de competir?",
        options: [
          { label: "Evita competir", value: 1 },
          { label: "Compete, mas sente desconforto", value: 2 },
          { label: "Gosta, mas oscila", value: 3 },
          { label: "Gosta de competir", value: 4 },
          { label: "Se sente motivado e cresce em competição", value: 5 },
        ],
      },
      {
        id: 301,
        question: "O que mais derruba o atleta emocionalmente?",
        isMultiSelect: true,
        options: [
          { label: "Cobrança da família", value: 1 },
          { label: "Cobrança do treinador", value: 2 },
          { label: "Comparação com outros atletas", value: 3 },
          { label: "Erros próprios em campo", value: 4 },
          { label: "Não ser titular / pouco minutos", value: 5 },
          { label: "Nada o derruba significativamente", value: 6 },
        ],
      },
      {
        id: 302,
        question: "Em jogos grandes (decisões, finais, observadores), ele:",
        options: [
          { label: "Trava, joga muito abaixo", value: 1 },
          { label: "Fica nervoso e oscila", value: 2 },
          { label: "Mantém o nível normal", value: 3 },
          { label: "Cresce e joga acima da média", value: 4 },
        ],
      },
      {
        id: 303,
        question: "Sobre medo de errar e busca por aprovação:",
        options: [
          { label: "Joga preso, com medo constante de errar", value: 1 },
          { label: "Busca muito aprovação dos outros", value: 2 },
          { label: "Tem momentos de insegurança", value: 3 },
          { label: "Joga livre, confia nas próprias decisões", value: 4 },
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
          { label: "Hobby", value: 1, image: "q16-hobby" },
          { label: "Algo importante, mas sem conversa", value: 2, image: "q16-important" },
          { label: "Projeto em construção", value: 3, image: "q16-project" },
          { label: "Prioridade clara", value: 4, image: "q16-priority" },
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
          { label: "Cobra mais ainda", value: 1, image: "q18-demand" },
          { label: "Age como se fosse obrigação", value: 2, image: "q18-obligation" },
          { label: "Reconhece o esforço", value: 3, image: "q18-recognize" },
          { label: "Celebra evolução e atitude", value: 4, image: "q18-celebrate" },
        ],
      },
      {
        id: 401,
        question: "A família cobra principalmente:",
        options: [
          { label: "Resultado/rendimento (gols, vitórias)", value: 1 },
          { label: "Mistura entre resultado e esforço", value: 2 },
          { label: "Processo e evolução", value: 3 },
          { label: "Não cobra, apenas apoia", value: 4 },
        ],
      },
      {
        id: 402,
        question: "Nível de envolvimento da família na rotina do atleta:",
        options: [
          { label: "Envolvida demais (sufoca)", value: 1 },
          { label: "Pouco envolvida (distante)", value: 2 },
          { label: "Equilibrada na maior parte do tempo", value: 3 },
          { label: "Presente, organizada e equilibrada", value: 4 },
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
          { label: "Mais de 5h", value: 1, image: "q20-screens-high" },
          { label: "3–4h", value: 2, image: "q20-screens-medium" },
          { label: "1–2h", value: 3, image: "q20-screens-balanced" },
          { label: "Menos de 1h", value: 4, image: "q20-screens-low" },
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
      {
        id: 501,
        question: "Musculação / preparo físico complementar:",
        options: [
          { label: "Não faz", value: 1 },
          { label: "Faz esporadicamente", value: 2 },
          { label: "1 a 2 vezes por semana", value: 3 },
          { label: "3 ou mais vezes por semana com orientação", value: 4 },
        ],
      },
      {
        id: 502,
        question: "Trabalho preventivo (mobilidade, fisioterapia, alongamento):",
        options: [
          { label: "Nunca faz", value: 1 },
          { label: "Só quando sente dor", value: 2 },
          { label: "Faz com alguma frequência", value: 3 },
          { label: "Rotina preventiva consistente", value: 4 },
        ],
      },
      {
        id: 503,
        question: "Limitação física mais clara hoje:",
        options: [
          { label: "Velocidade / explosão", value: 1 },
          { label: "Resistência / fôlego", value: 2 },
          { label: "Força / contato físico", value: 3 },
          { label: "Sem limitação física relevante", value: 4 },
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
          { label: "Jogar por diversão", value: 1, image: "q22-fun" },
          { label: "Ser bom no time atual", value: 2, image: "q22-current" },
          { label: "Chegar a um clube grande", value: 3, image: "q22-bigclub" },
          { label: "Ser profissional", value: 4, image: "q22-pro" },
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
          { label: "Falta de direção", value: 1, image: "q24-direction" },
          { label: "Falta de confiança", value: 2, image: "q24-confidence" },
          { label: "Falta de preparo físico", value: 3, image: "q24-physical" },
          { label: "Ambiente confuso", value: 4, image: "q24-environment" },
          { label: "Tudo um pouco", value: 0, image: "q24-all" },
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
      {
        id: 601,
        question: "Meta clara para os próximos 90 dias:",
        options: [
          { label: "Ainda não temos meta definida", value: 1 },
          { label: "Meta vaga, sem detalhes", value: 2 },
          { label: "Meta clara, mas sem plano", value: 3 },
          { label: "Meta clara com plano de ação", value: 4 },
        ],
      },
      {
        id: 602,
        question: "Qual hábito/comportamento mais segura a evolução dele HOJE?",
        options: [
          { label: "Excesso de telas / pouco descanso", value: 1 },
          { label: "Falta de disciplina nos treinos extras", value: 2 },
          { label: "Insegurança / autocobrança excessiva", value: 3 },
          { label: "Falta de orientação técnica/tática", value: 4 },
          { label: "Nenhum hábito relevante segura", value: 5 },
        ],
      },
      {
        id: 603,
        question: "Como o treinador atual se comunica com ele?",
        options: [
          { label: "Duro / autoritário", value: 1 },
          { label: "Pouco se comunica", value: 2 },
          { label: "Técnico e objetivo", value: 3 },
          { label: "Equilibrado: técnico + emocional", value: 4 },
        ],
      },
    ],
  },
];

export const getTotalQuestions = (): number => {
  return quizBlocks.reduce((acc, block) => acc + block.questions.length, 0);
};
