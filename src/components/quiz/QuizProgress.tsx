"use client";

import React from "react";
import { useQuiz } from "@/lib/quiz/quiz-context";
import { cn } from "@/lib/utils";

/**
 * Quiz progress indicator showing the current question and total number of questions
 */
const QuizProgress: React.FC = () => {
  const { currentProgress, totalQuestions, state } = useQuiz();
  const { isComplete } = state;

  // Calculate progress percentage
  // Only show 100% when quiz is complete, otherwise cap at slightly less
  const progressPercentage = isComplete
    ? 100
    : Math.min(((currentProgress - 1) / totalQuestions) * 100, 95);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm font-medium text-gray-500 mb-1">
        <span>
          Question {currentProgress} of {totalQuestions}
        </span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-in-out",
            progressPercentage < 33
              ? "bg-blue-500"
              : progressPercentage < 66
                ? "bg-green-500"
                : "bg-purple-500"
          )}
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>

      {/* Steps indicators */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full",
              index < currentProgress - 1 || isComplete
                ? "bg-blue-600"
                : index === currentProgress - 1
                  ? "bg-blue-400"
                  : "bg-gray-300"
            )}
            aria-hidden="true"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default QuizProgress;
