import { QuizQuestion, ExpertData } from "./types";

export const EXPERT_DATA: ExpertData = {
  name: "Mayra Polliana",
  profession: "Harmonização Facial",
  address: "⚜️📍 Av. Paulista / Alameda Santos, São Paulo",
  whatsappLink: "https://api.whatsapp.com/message/MILQPSLNR23UJ1?autoload=1&app_absent=0",
  instagramLink: "https://www.instagram.com/dramayrapolliana/reels/",
  images: {
    hero: "https://i.imgur.com/yVpnZY2.png", // Main portrait of the expert
    secondary: "https://i.imgur.com/aC3z80z.png", // secondary portrait for Quem Sou Eu
  },
  socialProof: [
    "https://i.imgur.com/tEqUYmq.png",
    "https://i.imgur.com/vr43361.png",
    "https://i.imgur.com/L7LlqZq.png",
    "https://i.imgur.com/nXKrumJ.png",
    "https://i.imgur.com/Nmqpa0t.png",
    "https://i.imgur.com/kBnopmV.png",
    // ADICIONE MAIS LINKS DE ANTES/DEPOIS AQUI
  ],
  heartsGallery: [
    "https://i.imgur.com/6mzTWVC.png",
    "https://i.imgur.com/sCE1os6.png",
    "https://i.imgur.com/LOqkigs.png",
    "https://i.imgur.com/APsiDz4.png",
    // ADICIONE MAIS LINKS DA GALERIA DE CORAÇÃO AQUI
  ]
};

// Video source and adjacent descriptive copy
export const VIDEO_SECTION = {
  url: "https://i.imgur.com/C9Ya0qu.mp4", // Imgur direct MP4
  backupUrl: "https://imgur.com/C9Ya0qu",
  copy: "Descubra como a beleza pode ser realçada com técnica, sensibilidade e propósito. Resultados naturais e transformadores. Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial."
};

// High-conversion, touch-optimized Quiz Questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "O que mais te incomoda ao se olhar no espelho hoje?",
    options: [
      { text: "Aspecto de cansaço ou perda de firmeza facial", weight: "Cansaço/Firmeza" },
      { text: "Lábios finos ou com falta de contorno e volume", weight: "Lábios/Contorno" },
      { text: "Linhas de expressão na testa ou ao redor dos olhos", weight: "Rugas/Linhas" },
      { text: "Desejo de harmonizar traços de forma sutil e natural", weight: "Naturalidade Geral" }
    ]
  },
  {
    id: 2,
    question: "Qual o seu maior receio em relação à Harmonização Facial?",
    options: [
      { text: "Ficar com o rosto artificial ou caricato", weight: "Medo de Artificialidade" },
      { text: "Sentir dor intensa durante a aplicação", weight: "Medo de Dor" },
      { text: "Não entender quais produtos estão sendo injetados", weight: "Falta de Informação" },
      { text: "Nenhum, confio em um protocolo seguro e personalizado", weight: "Confiança Total" }
    ]
  },
  {
    id: 3,
    question: "Você já passou por algum procedimento injetável antes?",
    options: [
      { text: "Sim, e amei os resultados obtidos", weight: "Sim, Experiência Positiva" },
      { text: "Sim, mas os resultados não me agradaram", weight: "Sim, Experiência Negativa" },
      { text: "Não, seria a minha primeira avaliação com agulhas", weight: "Primeira Vez" }
    ]
  },
  {
    id: 4,
    question: "O que você prioriza na escolha de um profissional?",
    options: [
      { text: "Avaliação honesta e respeito à minha anatomia real", weight: "Ética e Anatomia" },
      { text: "Materiais e produtos de altíssima qualidade (Premium)", weight: "Segurança Premium" },
      { text: "Acompanhamento pós-procedimento atencioso", weight: "Suporte e Cuidado" },
      { text: "Todas as alternativas anteriores", weight: "Excelência Completa" }
    ]
  },
  {
    id: 5,
    question: "Qual o seu momento ideal para realizar esse cuidado?",
    options: [
      { text: "Gostaria de agendar minha avaliação o quanto antes", weight: "Imediato" },
      { text: "Quero tirar dúvidas e planejar para as próximas semanas", weight: "Curto Prazo" },
      { text: "Estou pesquisando para o futuro", weight: "Médio Prazo" }
    ]
  }
];

// Why Trust Me section cards
export const TRUST_DIFFERENTIALS = [
  {
    title: "Avaliação Honesta",
    description: "Eu só indico o que você realmente precisa. Respeito sua beleza natural acima de qualquer tendência.",
    icon: "Shield"
  },
  {
    title: "Atendimento Exclusivo",
    description: "Cada sessão é planejada individualmente. Sem filas, sem pressa, com foco 100% em você.",
    icon: "Sparkles"
  },
  {
    title: "Clareza e Transparência",
    description: "Explico cada etapa do tratamento, os materiais de alta performance utilizados e o pós-procedimento.",
    icon: "Heart"
  },
  {
    title: "Técnica e Segurança",
    description: "Uso exclusivo de produtos premium das melhores marcas do mercado mundial e técnicas modernas e consagradas.",
    icon: "Lock"
  }
];

// Steps on how the first consultation works
export const CONSULTATION_STEPS = [
  {
    step: "01",
    title: "Contato Inicial",
    description: "Tire suas dúvidas ou envie suas respostas do quiz diretamente no WhatsApp exclusivo de agendamento."
  },
  {
    step: "02",
    title: "Planejamento e Reserva",
    description: "Definimos o melhor dia e horário para a sua consulta na nossa elegante localização na Av. Paulista."
  },
  {
    step: "03",
    title: "Avaliação Personalizada",
    description: "Uma análise facial minuciosa para traçar o mapa da sua beleza exclusiva de forma natural."
  }
];
