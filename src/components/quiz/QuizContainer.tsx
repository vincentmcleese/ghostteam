"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quiz/quiz-context";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";
import { quizData } from "@/lib/quiz/quiz-data";
import { saveQuizResult } from "@/lib/quiz/saveQuizResult";
import { v4 as uuidv4 } from "uuid";

/**
 * Main container for the quiz
 */
const QuizContainer: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const {
    currentQuestion,
    isComplete,
    resultCategory,
    answers,
    linkedInProfile,
  } = state;
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If the current question is beyond the total questions, calculate results
  useEffect(() => {
    if (currentQuestion >= quizData.questions.length && !isComplete) {
      dispatch({ type: "CALCULATE_RESULT" });
    }
  }, [currentQuestion, isComplete, dispatch]);

  // Save results to database and redirect to results page when calculation is complete
  useEffect(() => {
    const saveAndRedirect = async () => {
      if (isComplete && resultCategory && !isSaving) {
        try {
          setIsSaving(true);

          // Generate a unique session ID if we don't already have one
          // In a real app, you might use cookies or localStorage to persist this
          const sessionId = localStorage.getItem("quiz_session_id") || uuidv4();
          localStorage.setItem("quiz_session_id", sessionId);

          // Calculate score based on answers (simple average for demo)
          const scoreValues = Object.values(answers).map((value) => {
            switch (value) {
              case "A":
                return 1;
              case "B":
                return 2;
              case "C":
                return 3;
              default:
                return 0;
            }
          });

          const averageScore =
            scoreValues.length > 0
              ? scoreValues.reduce<number>((sum, val) => sum + val, 0) /
                scoreValues.length
              : 0;

          // Extract LinkedIn data
          const linkedinId = linkedInProfile?.id || null;
          const linkedinUrl = linkedInProfile?.profileUrl || null;

          // Create a structured LinkedIn data object with all available information
          const linkedinData = linkedInProfile
            ? {
                // Basic profile info
                id: linkedInProfile.id,
                firstName: linkedInProfile.firstName,
                lastName: linkedInProfile.lastName || null,
                profileUrl:
                  linkedInProfile.profileUrl || linkedInProfile.url || null,
                profileImage: linkedInProfile.profileImage,

                // Additional data if available
                headline: linkedInProfile.headline,
                location: linkedInProfile.location,
                company: linkedInProfile.company,
                position: linkedInProfile.position,

                // Save the original API response if available
                apiResponse: linkedInProfile.apiResponse || null,

                // Metadata about when this data was captured
                capturedAt: new Date().toISOString(),
              }
            : null;

          // Save to Supabase
          const { success, error } = await saveQuizResult({
            quizId: "00000000-0000-0000-0000-000000000001",
            sessionId,
            linkedinId,
            linkedinUrl,
            linkedinData,
            resultCategory,
            score: averageScore,
            answers: answers,
          });

          if (!success) {
            console.error("Failed to save quiz result:", error);
            setError("Failed to save your quiz results. Please try again.");
            setIsSaving(false);
            return;
          }

          // Prepare URL for redirect
          const url = new URL(
            `/recruiter/ai-maturity-quiz/result`,
            window.location.origin
          );

          // Add parameters
          url.searchParams.set("category", resultCategory);
          url.searchParams.set("session", sessionId);

          // Pass the LinkedIn ID if we have it
          if (linkedInProfile?.id) {
            url.searchParams.set("linkedinId", linkedInProfile.id);
            url.searchParams.set("hasProfile", "true");
          }

          // Redirect to results page
          router.push(url.pathname + url.search);
        } catch (err) {
          console.error("Error saving quiz result:", err);
          setError("An unexpected error occurred. Please try again.");
          setIsSaving(false);
        }
      }
    };

    saveAndRedirect();
  }, [isComplete, resultCategory, router, linkedInProfile, answers, isSaving]);

  // Show loading state while calculating or saving
  if (
    (currentQuestion >= quizData.questions.length && !isComplete) ||
    isSaving
  ) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">
            {isSaving
              ? "Saving Your Results..."
              : "Analyzing Your Responses..."}
          </h2>
          <p className="text-gray-600">
            {isSaving
              ? "We're saving your personalized AI readiness assessment"
              : "We're preparing your personalized AI readiness assessment"}
          </p>
        </div>
      </div>
    );
  }

  // Show error message if saving failed
  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="text-gray-700">{error}</p>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              setError(null);
              setIsSaving(false);
            }}
          >
            Try Again
          </button>
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
