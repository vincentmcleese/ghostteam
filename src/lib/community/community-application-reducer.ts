import { CommunityApplicationState, CommunityApplicationAction } from "./community-application-types";
import { communityApplicationData } from "./community-application-data";

// Initial state
export const initialCommunityApplicationState: CommunityApplicationState = {
  currentQuestion: 0,
  answers: {},
  isComplete: false,
  isSubmitting: false,
};

/**
 * Community application reducer to handle state updates
 */
export const communityApplicationReducer = (
  state: CommunityApplicationState,
  action: CommunityApplicationAction
): CommunityApplicationState => {
  switch (action.type) {
    case "NEXT_QUESTION":
      // Don't go beyond total questions
      if (state.currentQuestion >= communityApplicationData.questions.length - 1) {
        return { ...state, isComplete: true };
      }
      return {
        ...state,
        currentQuestion: Math.min(
          state.currentQuestion + 1,
          communityApplicationData.questions.length
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

      // Auto-advance to next question for single-select multiple choice questions
      const currentQ = communityApplicationData.questions[state.currentQuestion];
      const shouldAutoAdvance = currentQ.inputType === "multiple-choice";

      if (
        shouldAutoAdvance &&
        state.currentQuestion < communityApplicationData.questions.length - 1
      ) {
        return {
          ...state,
          answers: newAnswers,
          currentQuestion: state.currentQuestion + 1,
        };
      } else if (state.currentQuestion >= communityApplicationData.questions.length - 1) {
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

    case "RESET_APPLICATION":
      return initialCommunityApplicationState;

    default:
      return state;
  }
};