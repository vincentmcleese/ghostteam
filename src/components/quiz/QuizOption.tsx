"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { QuizOption as QuizOptionType } from "@/lib/quiz/quiz-types";

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (score: string) => void;
  index: number;
}

/**
 * Single quiz option/answer
 */
const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  index,
}) => {
  const handleClick = () => {
    onSelect(option.score);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(option.score);
    }
  };

  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;

  // Map score to color for the heading badge
  const headingColorMap = {
    A: "bg-red-100 text-red-800",
    B: "bg-yellow-100 text-yellow-800",
    C: "bg-green-100 text-green-800",
    D: "bg-gray-100 text-gray-800",
  };

  const headingColor =
    headingColorMap[option.score as keyof typeof headingColorMap];

  return (
    <div
      className={cn(
        "w-full p-4 mb-3 border rounded-lg transition-all cursor-pointer",
        "hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        "animate-fadeIn",
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-gray-200 bg-white"
      )}
      style={{ animationDelay }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={option.label}
      data-score={option.score}
    >
      <div className="flex flex-col">
        <div className="mb-2">
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              headingColor
            )}
          >
            {option.heading}
          </span>
        </div>
        <div className="flex items-center">
          <div
            className={cn(
              "w-5 h-5 mr-3 rounded-full border flex items-center justify-center flex-shrink-0",
              isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
            )}
          >
            {isSelected && (
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="text-base">{option.label}</div>
        </div>
      </div>
    </div>
  );
};

export default QuizOption;
