"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SurveyOption as SurveyOptionType } from "@/lib/survey/survey-types";

interface SurveyOptionProps {
  option: SurveyOptionType;
  isSelected: boolean;
  onSelect: (value: string) => void;
  index: number;
}

/**
 * Single survey option/answer for multiple choice questions
 */
const SurveyOption: React.FC<SurveyOptionProps> = ({
  option,
  isSelected,
  onSelect,
  index,
}) => {
  const handleClick = () => {
    onSelect(option.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(option.value);
    }
  };

  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      className={cn(
        "w-full p-4 mb-3 border rounded-lg transition-all cursor-pointer group",
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
      data-value={option.value}
    >
      <div className="flex items-center justify-between">
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
          <div className="text-base font-medium">{option.label}</div>
        </div>

        {/* Keyboard shortcut indicator */}
        <div
          className={cn(
            "px-2 py-1 text-xs font-mono rounded border transition-colors",
            isSelected
              ? "bg-blue-100 text-blue-800 border-blue-300"
              : "bg-gray-100 text-gray-600 border-gray-300 group-hover:bg-blue-100 group-hover:text-blue-800 group-hover:border-blue-300"
          )}
        >
          {option.key.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default SurveyOption;
