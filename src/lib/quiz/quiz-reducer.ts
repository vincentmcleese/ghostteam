import { QuizState, QuizAction } from "./quiz-types";
import {
  calculateResultCategory,
  calculateAverageScore,
  generateScoreDistribution,
} from "./quiz-data";

/**
 * Initial state for the quiz
 */
export const initialState: QuizState = {
  currentQuestion: 0,
  answers: {},
  isComplete: false,
};

/**
 * Reducer for quiz state management
 */
export const quizReducer = (
  state: QuizState,
  action: QuizAction
): QuizState => {
  switch (action.type) {
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };

    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestion: Math.max(0, state.currentQuestion - 1),
      };

    case "ANSWER_QUESTION":
      const { questionId, answer } = action.payload;
      return {
        ...state,
        answers: {
          ...state.answers,
          [questionId]: answer,
        },
        // Automatically advance to next question
        currentQuestion: state.currentQuestion + 1,
      };

    case "CALCULATE_RESULT":
      const resultCategory = calculateResultCategory(state.answers);
      const averageScore = calculateAverageScore(state.answers);
      const scoreDistribution = generateScoreDistribution(averageScore);

      return {
        ...state,
        isComplete: true,
        resultCategory,
        averageScore,
        scoreDistribution,
      };

    case "RESET_QUIZ":
      return initialState;

    case "SET_LINKEDIN_PROFILE":
      return {
        ...state,
        linkedInProfile: action.payload,
      };

    default:
      return state;
  }
};
