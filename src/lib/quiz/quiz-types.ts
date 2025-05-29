/**
 * Types for the AI Maturity Quiz
 */

// Option in a quiz question
export interface QuizOption {
  label: string;
  score: "A" | "B" | "C";
  heading: string;
}

// Question in the quiz
export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  category: string;
}

// Quiz result category
export interface QuizResult {
  title: string;
  description: string;
  imagePath: string;
}

// Complete quiz data structure
export interface QuizData {
  title: string;
  description: string;
  questions: QuizQuestion[];
  results: Record<string, QuizResult>;
}

// LinkedIn profile information
export interface LinkedInProfile {
  firstName?: string;
  profileImage?: string;
  headline?: string;
}

// Quiz state
export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  isComplete: boolean;
  resultCategory?: string;
  averageScore?: number;
  scoreDistribution?: number[];
  linkedInProfile?: LinkedInProfile;
}

// Quiz actions
export type QuizAction =
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | {
      type: "ANSWER_QUESTION";
      payload: { questionId: number; answer: string };
    }
  | { type: "CALCULATE_RESULT" }
  | { type: "RESET_QUIZ" }
  | { type: "SET_LINKEDIN_PROFILE"; payload: LinkedInProfile };

// Quiz context value
export interface QuizContextValue {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  quizData: QuizData;
  totalQuestions: number;
  currentProgress: number;
}
