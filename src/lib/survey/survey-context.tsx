"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { SurveyContextValue, SurveyState } from "./survey-types";
import {
  surveyReducer,
  initialState as defaultInitialState,
} from "./survey-reducer";
import { surveyData } from "./survey-data";

// Create context with default value
const SurveyContext = createContext<SurveyContextValue | undefined>(undefined);

// Provider props
interface SurveyProviderProps {
  children: ReactNode;
  initialState?: SurveyState;
}

/**
 * Survey Context Provider
 */
export const SurveyProvider: React.FC<SurveyProviderProps> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(
    surveyReducer,
    initialState || defaultInitialState
  );

  // Derived values
  const totalQuestions = surveyData.questions.length;
  const currentProgress = state.currentQuestion + 1;

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<SurveyContextValue>(
    () => ({
      state,
      dispatch,
      surveyData,
      totalQuestions,
      currentProgress,
    }),
    [state, totalQuestions, currentProgress]
  );

  return (
    <SurveyContext.Provider value={contextValue}>
      {children}
    </SurveyContext.Provider>
  );
};

/**
 * Custom hook to use the survey context
 */
export const useSurvey = (): SurveyContextValue => {
  const context = useContext(SurveyContext);

  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }

  return context;
};
