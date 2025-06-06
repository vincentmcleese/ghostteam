import { SurveyState, SurveyAction } from "./survey-types";
import { surveyData } from "./survey-data";

// Initial state
export const initialState: SurveyState = {
  currentQuestion: 0,
  answers: {},
  isComplete: false,
  isSubmitting: false,
};

/**
 * Survey reducer to handle state updates
 */
export const surveyReducer = (
  state: SurveyState,
  action: SurveyAction
): SurveyState => {
  switch (action.type) {
    case "NEXT_QUESTION":
      // Don't go beyond total questions
      if (state.currentQuestion >= surveyData.questions.length - 1) {
        return { ...state, isComplete: true };
      }
      return {
        ...state,
        currentQuestion: Math.min(
          state.currentQuestion + 1,
          surveyData.questions.length
        ),
      };

    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0),
        isComplete: false,
      };

    case "ANSWER_QUESTION":
      const newAnswers = {
        ...state.answers,
        [action.payload.questionId]: action.payload.answer,
      };

      // Auto-advance to next question for non-contact-form questions
      const currentQ = surveyData.questions[state.currentQuestion];
      const shouldAutoAdvance = currentQ.inputType === "multiple-choice";

      if (
        shouldAutoAdvance &&
        state.currentQuestion < surveyData.questions.length - 1
      ) {
        return {
          ...state,
          answers: newAnswers,
          currentQuestion: state.currentQuestion + 1,
        };
      } else if (state.currentQuestion >= surveyData.questions.length - 1) {
        return {
          ...state,
          answers: newAnswers,
          isComplete: true,
        };
      }

      return {
        ...state,
        answers: newAnswers,
      };

    case "SUBMIT_START":
      return {
        ...state,
        isSubmitting: true,
        submitError: undefined,
      };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        isComplete: true,
      };

    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      };

    case "RESET_SURVEY":
      return initialState;

    default:
      return state;
  }
};
