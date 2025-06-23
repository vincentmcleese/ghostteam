/**
 * Types for the Community Application
 */

// Option in a community application question (for multiple choice)
export interface CommunityApplicationOption {
  label: string;
  value: string;
  key: string; // keyboard shortcut key
}

// Different input types for community application questions
export type CommunityApplicationInputType =
  | "multiple-choice"
  | "multiple-select"
  | "short-text"
  | "long-text"
  | "url"
  | "contact-form";

// Community application question structure
export interface CommunityApplicationQuestion {
  id: number;
  question: string;
  subtitle?: string;
  inputType: CommunityApplicationInputType;
  required: boolean;
  options?: CommunityApplicationOption[]; // Only for multiple choice/select
  placeholder?: string; // For text inputs
}

// Contact form fields for community application
export interface CommunityContactDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  hearAboutUs: string;
  hearAboutUsOther?: string;
}

// Community application answers can be string, string array, or ContactDetails
export type CommunityApplicationAnswer = string | string[] | CommunityContactDetails;

// Community application state
export interface CommunityApplicationState {
  currentQuestion: number;
  answers: Record<number, CommunityApplicationAnswer>;
  isComplete: boolean;
  isSubmitting: boolean;
  submitError?: string;
}

// Community application actions
export type CommunityApplicationAction =
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | {
      type: "ANSWER_QUESTION";
      payload: { questionId: number; answer: CommunityApplicationAnswer };
    }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "RESET_APPLICATION" };

// Complete community application data structure
export interface CommunityApplicationData {
  title: string;
  description: string;
  questions: CommunityApplicationQuestion[];
}

// Community application context value
export interface CommunityApplicationContextValue {
  state: CommunityApplicationState;
  dispatch: React.Dispatch<CommunityApplicationAction>;
  applicationData: CommunityApplicationData;
  totalQuestions: number;
  currentProgress: number;
}

// Database community applicant record
export interface CommunityApplicantRecord {
  businessType: string;
  businessDescription: string;
  monthlyRevenue: string;
  aiExperience: string;
  communityGoals: string[];
  aiChallenge: string;
  websiteUrl: string;
  linkedinUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  hearAboutUs: string;
  hearAboutUsOther?: string;
}