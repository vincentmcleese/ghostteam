"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz/quiz-context";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import { quizData } from "@/lib/quiz/quiz-data";

/**
 * Main container for the quiz
 */
const QuizContainer: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const { currentQuestion, isComplete, resultCategory } = state;
  const router = useRouter();

  // If the current question is beyond the total questions, calculate results
  useEffect(() => {
    if (currentQuestion >= quizData.questions.length && !isComplete) {
      dispatch({ type: "CALCULATE_RESULT" });
    }
  }, [currentQuestion, isComplete, dispatch]);

  // Redirect to results page when calculation is complete
  useEffect(() => {
    if (isComplete && resultCategory) {
      // In the future, this is where you would save to database
      // Then redirect with the unique ID from the database

      // For now, redirect with the category as parameter
      // Also pass LinkedIn ID if available
      const linkedInProfile = state.linkedInProfile;
      const url = new URL(
        `/recruiter/ai-maturity-quiz/result`,
        window.location.origin
      );

      // Add parameters
      url.searchParams.set("category", resultCategory);

      // Pass the LinkedIn ID if we have it
      if (linkedInProfile?.profileImage) {
        url.searchParams.set("hasProfile", "true");
      }

      router.push(url.pathname + url.search);
    }
  }, [isComplete, resultCategory, router, state.linkedInProfile]);

  // Show loading state while calculating
  if (currentQuestion >= quizData.questions.length && !isComplete) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">
            Analyzing Your Responses...
          </h2>
          <p className="text-gray-600">
            We&apos;re preparing your personalized AI readiness assessment
          </p>
        </div>
      </div>
    );
  }

  // Show current question (results will be shown on the dedicated page)
  return (
    <div className="max-w-2xl mx-auto">
      <QuizProgress />
      <div className="mt-8">
        <QuizQuestion />
      </div>
    </div>
  );
};

export default QuizContainer;
