"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { QuizContextValue, QuizState, LinkedInProfile } from "./quiz-types";
import {
  quizReducer,
  initialState as defaultInitialState,
} from "./quiz-reducer";
import { quizData } from "./quiz-data";

// Create context with default value
const QuizContext = createContext<QuizContextValue | undefined>(undefined);

// Provider props
interface QuizProviderProps {
  children: ReactNode;
  linkedInId?: string;
  initialState?: QuizState;
}

/**
 * Quiz Context Provider
 */
export const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
  linkedInId,
  initialState,
}) => {
  const [state, dispatch] = useReducer(
    quizReducer,
    initialState || defaultInitialState
  );

  // Fetch LinkedIn profile data if ID is available
  useEffect(() => {
    const fetchLinkedInProfile = async () => {
      if (!linkedInId) return;

      try {
        const response = await fetch(`/api/linkedin?id=${linkedInId}`);

        if (response.ok) {
          const data: LinkedInProfile = await response.json();
          dispatch({
            type: "SET_LINKEDIN_PROFILE",
            payload: {
              firstName: data.firstName,
              profileImage: data.profileImage,
              headline: data.headline,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching LinkedIn profile for quiz:", error);
      }
    };

    fetchLinkedInProfile();
  }, [linkedInId]);

  // Derived values
  const totalQuestions = quizData.questions.length;
  const currentProgress = state.currentQuestion + 1;

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<QuizContextValue>(
    () => ({
      state,
      dispatch,
      quizData,
      totalQuestions,
      currentProgress,
    }),
    [state, totalQuestions, currentProgress]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

/**
 * Custom hook to use the quiz context
 */
export const useQuiz = (): QuizContextValue => {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }

  return context;
};
