"use client";

import React from "react";
import { useCommunityApplication } from "@/lib/community/community-application-context";

/**
 * Community application progress indicator
 */
const CommunityApplicationProgress: React.FC = () => {
  const { state, totalQuestions } = useCommunityApplication();
  const { currentQuestion } = state;

  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Progress text */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span>{Math.round(progressPercentage)}% complete</span>
      </div>
    </div>
  );
};

export default CommunityApplicationProgress;