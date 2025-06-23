"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
} from "react";
import { CommunityApplicationContextValue, CommunityApplicationState } from "./community-application-types";
import {
  communityApplicationReducer,
  initialCommunityApplicationState as defaultInitialState,
} from "./community-application-reducer";
import { communityApplicationData } from "./community-application-data";

// Create context with default value
const CommunityApplicationContext = createContext<CommunityApplicationContextValue | undefined>(undefined);

// Provider props
interface CommunityApplicationProviderProps {
  children: ReactNode;
  initialState?: CommunityApplicationState;
}

/**
 * Community Application Context Provider
 */
export const CommunityApplicationProvider: React.FC<CommunityApplicationProviderProps> = ({
  children,
  initialState,
}) => {
  const [state, dispatch] = useReducer(
    communityApplicationReducer,
    initialState || defaultInitialState
  );

  // Derived values
  const totalQuestions = communityApplicationData.questions.length;
  const currentProgress = state.currentQuestion + 1;

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<CommunityApplicationContextValue>(
    () => ({
      state,
      dispatch,
      applicationData: communityApplicationData,
      totalQuestions,
      currentProgress,
    }),
    [state, totalQuestions, currentProgress]
  );

  return (
    <CommunityApplicationContext.Provider value={contextValue}>
      {children}
    </CommunityApplicationContext.Provider>
  );
};

/**
 * Custom hook to use the community application context
 */
export const useCommunityApplication = (): CommunityApplicationContextValue => {
  const context = useContext(CommunityApplicationContext);

  if (context === undefined) {
    throw new Error("useCommunityApplication must be used within a CommunityApplicationProvider");
  }

  return context;
};