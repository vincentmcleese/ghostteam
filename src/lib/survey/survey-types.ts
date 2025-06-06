/**
 * Types for the Business Survey
 */

// Option in a survey question (for multiple choice)
export interface SurveyOption {
  label: string;
  value: string;
  key: string; // keyboard shortcut key
}

// Different input types for survey questions
export type SurveyInputType =
  | "multiple-choice"
  | "short-text"
  | "long-text"
  | "url"
  | "contact-form";

// Survey question structure
export interface SurveyQuestion {
  id: number;
  question: string;
  subtitle?: string;
  inputType: SurveyInputType;
  required: boolean;
  options?: SurveyOption[]; // Only for multiple choice
  placeholder?: string; // For text inputs
}

// Contact form fields
export interface ContactDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

// Survey answers can be string or ContactDetails
export type SurveyAnswer = string | ContactDetails;

// Survey state
export interface SurveyState {
  currentQuestion: number;
  answers: Record<number, SurveyAnswer>;
  isComplete: boolean;
  isSubmitting: boolean;
  submitError?: string;
}

// Survey actions
export type SurveyAction =
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | {
      type: "ANSWER_QUESTION";
      payload: { questionId: number; answer: SurveyAnswer };
    }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "RESET_SURVEY" };

// Complete survey data structure
export interface SurveyData {
  title: string;
  description: string;
  questions: SurveyQuestion[];
}

// Survey context value
export interface SurveyContextValue {
  state: SurveyState;
  dispatch: React.Dispatch<SurveyAction>;
  surveyData: SurveyData;
  totalQuestions: number;
  currentProgress: number;
}

// Database lead record
export interface LeadRecord {
  businessType: string;
  businessDescription: string;
  projectType: string;
  helpNeeded: string;
  monthlyRevenue: string;
  websiteUrl: string;
  linkedinUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
