import { quizReducer, initialState } from "@/lib/quiz/quiz-reducer";
import { QuizState, QuizAction } from "@/lib/quiz/quiz-types";

describe("Quiz Reducer", () => {
  test("should return the initial state", () => {
    // @ts-expect-error - We're intentionally not providing an action
    const newState = quizReducer(initialState, {});

    expect(newState).toEqual(initialState);
  });

  test("should handle ANSWER_QUESTION action", () => {
    const action: QuizAction = {
      type: "ANSWER_QUESTION",
      payload: { questionId: 1, answer: "A" },
    };

    const newState = quizReducer(initialState, action);

    expect(newState.answers).toEqual({ 1: "A" });
    expect(newState.currentQuestion).toBe(1);
  });

  test("should handle multiple ANSWER_QUESTION actions", () => {
    const firstAction: QuizAction = {
      type: "ANSWER_QUESTION",
      payload: { questionId: 1, answer: "A" },
    };

    const secondAction: QuizAction = {
      type: "ANSWER_QUESTION",
      payload: { questionId: 2, answer: "B" },
    };

    let state = quizReducer(initialState, firstAction);
    state = quizReducer(state, secondAction);

    expect(state.answers).toEqual({ 1: "A", 2: "B" });
    expect(state.currentQuestion).toBe(2);
  });

  test("should handle PREVIOUS_QUESTION action", () => {
    // First, set up a state with current question = 2
    const initialStateWithQuestion: QuizState = {
      ...initialState,
      currentQuestion: 2,
    };

    const action: QuizAction = { type: "PREVIOUS_QUESTION" };

    const newState = quizReducer(initialStateWithQuestion, action);

    expect(newState.currentQuestion).toBe(1);
  });

  test("should not go below 0 with PREVIOUS_QUESTION action", () => {
    const action: QuizAction = { type: "PREVIOUS_QUESTION" };

    const newState = quizReducer(initialState, action);

    expect(newState.currentQuestion).toBe(0);
  });

  test("should handle RESET_QUIZ action", () => {
    // Set up a non-initial state
    const nonInitialState: QuizState = {
      currentQuestion: 3,
      answers: { 1: "A", 2: "B", 3: "C" },
      isComplete: true,
    };

    const action: QuizAction = { type: "RESET_QUIZ" };

    const newState = quizReducer(nonInitialState, action);

    expect(newState).toEqual(initialState);
  });

  test("should handle CALCULATE_RESULT action with answers", () => {
    // Set up a state with answers
    const stateWithAnswers: QuizState = {
      ...initialState,
      answers: { 1: "A", 2: "B", 3: "C", 4: "A", 5: "A" },
    };

    const action: QuizAction = { type: "CALCULATE_RESULT" };

    const newState = quizReducer(stateWithAnswers, action);

    // The logic here depends on our score calculation, but let's check the basics
    expect(newState.isComplete).toBe(true);
    expect(newState.resultCategory).toBeDefined();
    expect(newState.averageScore).toBeDefined();
    expect(newState.scoreDistribution).toBeDefined();
    expect(newState.resultCategory).toBe("A"); // Based on our mock data
  });

  test("should not calculate results without answers", () => {
    const action: QuizAction = { type: "CALCULATE_RESULT" };

    const newState = quizReducer(initialState, action);

    // No changes should occur
    expect(newState).toEqual(initialState);
  });
});
