"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useQuiz } from "@/lib/quiz/quiz-context";
import { QuizQuestion } from "@/lib/quiz/quiz-types";
import { cn } from "@/lib/utils";

interface BenchmarkVisualProps {
  userScore: number;
  distribution: number[];
}

// Category data with visuals
const categories = [
  {
    id: "A",
    name: "Manual Hustler",
    color: "#FFA07A", // Light salmon
    icon: "👨‍💻", // Worker emoji
    description:
      "Primarily using traditional methods with minimal AI integration",
  },
  {
    id: "B",
    name: "Curious Optimizer",
    color: "#98FB98", // Pale green
    icon: "🔍", // Magnifying glass emoji
    description:
      "Actively exploring and adopting AI tools to enhance processes",
  },
  {
    id: "C",
    name: "System Scaler",
    color: "#87CEFA", // Light sky blue
    icon: "🚀", // Rocket emoji
    description:
      "Leveraging AI systems strategically for transformative outcomes",
  },
];

// Type for distribution object
type CategoryDistribution = {
  A: number;
  B: number;
  C: number;
};

/**
 * A benchmark visualization showing user's position compared to peers
 * with category filtering capabilities
 */
const BenchmarkVisual: React.FC<BenchmarkVisualProps> = ({
  // We receive these props but use values from context instead
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userScore,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  distribution,
}) => {
  const { state, quizData } = useQuiz();
  const { linkedInProfile, answers, resultCategory } = state;

  // State for filter selection
  const [selectedFilter, setSelectedFilter] = useState<string>("overall");

  // Calculate percentage distributions for visualization
  const calculateDistribution = (): CategoryDistribution => {
    // Default mock distribution (could be replaced with actual data)
    const defaultDistribution: CategoryDistribution = {
      A: 45, // 45% Manual Hustlers
      B: 35, // 35% Curious Optimizers
      C: 20, // 20% System Scalers
    };

    // If we're looking at overall, return default distribution
    if (selectedFilter === "overall") {
      return defaultDistribution;
    }

    // If we're filtering by a specific question
    const questionId = parseInt(selectedFilter.replace("question-", ""));
    const question = quizData.questions.find((q) => q.id === questionId);

    if (!question) return defaultDistribution;

    // Generate distribution based on the question category
    // This is mock data - in a real application, you'd use actual response data
    const questionCategory = question.category;

    // Different mock distributions based on question category
    const categoryDistributions: Record<string, CategoryDistribution> = {
      Sourcing: { A: 50, B: 30, C: 20 },
      Outreach: { A: 40, B: 40, C: 20 },
      Screening: { A: 45, B: 35, C: 20 },
      Interviewing: { A: 60, B: 25, C: 15 },
      Onboarding: { A: 55, B: 30, C: 15 },
      Analytics: { A: 35, B: 35, C: 30 },
      // Add more categories as needed
    };

    return categoryDistributions[questionCategory] || defaultDistribution;
  };

  // Get the current distribution based on the filter
  const currentDistribution = calculateDistribution();

  // Determine the user's category
  const getUserCategory = (): "A" | "B" | "C" => {
    if (selectedFilter === "overall") {
      return (resultCategory as "A" | "B" | "C") || "B"; // Default to B if no result
    }

    // If filtering by question, get the user's answer for that question
    const questionId = parseInt(selectedFilter.replace("question-", ""));
    return (answers[questionId] as "A" | "B" | "C") || "B"; // Default to B if no answer
  };

  const userCategory = getUserCategory();

  return (
    <div className="w-full">
      {/* Filter controls */}
      <div className="mb-6">
        <label
          htmlFor="category-filter"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          View results by:
        </label>
        <select
          id="category-filter"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="overall">Overall Results</option>
          <optgroup label="By Question">
            {quizData.questions.map((question: QuizQuestion) => (
              <option key={question.id} value={`question-${question.id}`}>
                {question.category}:{" "}
                {question.question.length > 50
                  ? `${question.question.substring(0, 50)}...`
                  : question.question}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Benchmark visualization */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => {
            const percentage =
              currentDistribution[category.id as keyof CategoryDistribution];
            const isUserCategory = userCategory === category.id;

            return (
              <div
                key={category.id}
                className={cn(
                  "relative p-4 rounded-lg border-2 transition-all",
                  isUserCategory
                    ? "border-gray-400 shadow-md"
                    : "border-gray-200"
                )}
                style={{
                  backgroundColor: `${category.color}20`, // 20% opacity
                  borderColor: isUserCategory ? category.color : "#e5e7eb",
                  boxShadow: isUserCategory
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    : "none",
                }}
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">{category.icon}</span>
                  <h4 className="font-semibold">{category.name}</h4>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>

                {/* Percentage bar */}
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-1000 ease-in-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: category.color,
                    }}
                  >
                    <span className="text-xs font-semibold text-white">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  {percentage}% of recruiters
                </div>

                {/* User indicator */}
                {isUserCategory && (
                  <div className="absolute top-3 right-3 flex items-center">
                    {linkedInProfile?.profileImage &&
                    linkedInProfile.firstName ? (
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                          <Image
                            src={linkedInProfile.profileImage}
                            alt="Your profile"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5 shadow-sm">
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
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-xs shadow-md">
                        You
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation text */}
        <div className="mt-6 text-sm text-gray-600 border-t border-gray-200 pt-4">
          <p className="mb-2">
            <strong>What this means:</strong>{" "}
            {selectedFilter === "overall"
              ? "This shows your overall AI maturity compared to other recruiters."
              : "This shows how your approach compares to others for this specific activity."}
          </p>
          {userCategory === "A" && (
            <p>
              You&apos;re currently taking a hands-on approach with limited AI
              assistance. Consider exploring how AI tools can enhance your
              workflow.
            </p>
          )}
          {userCategory === "B" && (
            <p>
              You&apos;re actively exploring AI tools to optimize your
              processes. Keep experimenting with new AI capabilities to find the
              right balance.
            </p>
          )}
          {userCategory === "C" && (
            <p>
              You&apos;re leveraging AI strategically for transformative
              outcomes. Continue to refine your systems and share your knowledge
              with others.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BenchmarkVisual;
