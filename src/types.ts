export interface AnswerOption {
  text: string;
  weight: string; // contextual feedback or scoring
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: AnswerOption[];
}

export interface UserResponse {
  questionId: number;
  questionText: string;
  selectedAnswer: string;
}

export interface ExpertData {
  name: string;
  profession: string;
  address: string;
  whatsappLink: string;
  instagramLink: string;
  images: {
    hero: string;
    secondary: string;
  };
  socialProof: string[];
  heartsGallery: string[];
}
