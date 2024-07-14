export interface Question {
  id: number;
  type:
    | "single-choice"
    | "multiple-choice"
    | "true-false"
    | "drag-and-drop"
    | "text-input";
  question: string;
  options?: string[];
  answer: string | boolean | string[];
}

export interface Answer {
  id: number;
  question: string;
  answer: string | string[] | boolean;
}

export interface OverviewAnswers {
  id: number;
  question: string;
  answer: string | string[] | boolean;
  isCorrect: boolean;
  isAnswered?: boolean;
}
