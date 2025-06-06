"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSurvey } from "@/lib/survey/survey-context";
import SurveyProgress from "./SurveyProgress";
import SurveyQuestion from "./SurveyQuestion";
import { surveyData } from "@/lib/survey/survey-data";
import { saveSurveyResult } from "@/lib/survey/saveSurveyResult";

/**
 * Main container for the survey
 */
const SurveyContainer: React.FC = () => {
  const { state, dispatch } = useSurvey();
  const { currentQuestion, isComplete, answers, isSubmitting, submitError } =
    state;
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Handle survey completion and submission
  useEffect(() => {
    const handleSubmission = async () => {
      if (isComplete && !hasSubmitted && !isSubmitting) {
        setHasSubmitted(true);
        dispatch({ type: "SUBMIT_START" });

        try {
          const { success, error } = await saveSurveyResult(answers);

          if (success) {
            dispatch({ type: "SUBMIT_SUCCESS" });
            // Redirect to confirmation page after a brief delay
            setTimeout(() => {
              router.push("/begin/confirmation");
            }, 1000);
          } else {
            dispatch({
              type: "SUBMIT_ERROR",
              payload: "Failed to submit your responses. Please try again.",
            });
            setHasSubmitted(false);
          }
        } catch (err) {
          console.error("Error submitting survey:", err);
          dispatch({
            type: "SUBMIT_ERROR",
            payload: "An unexpected error occurred. Please try again.",
          });
          setHasSubmitted(false);
        }
      }
    };

    handleSubmission();
  }, [isComplete, hasSubmitted, isSubmitting, answers, dispatch, router]);

  // Show loading state while submitting
  if (isSubmitting) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">
            Submitting Your Responses...
          </h2>
          <p className="text-gray-600">
            We're saving your information and preparing your personalized
            response.
          </p>
        </div>
      </div>
    );
  }

  // Show success state
  if (isComplete && !isSubmitting && !submitError) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-green-600">Thank You!</h2>
          <p className="text-gray-600">
            Your responses have been submitted successfully. Redirecting you
            now...
          </p>
        </div>
      </div>
    );
  }

  // Show error message if submission failed
  if (submitError) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="text-gray-700">{submitError}</p>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              dispatch({ type: "SUBMIT_ERROR", payload: "" });
              setHasSubmitted(false);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show current question
  return (
    <div className="max-w-3xl mx-auto">
      <SurveyProgress />
      <div className="mt-8">
        <SurveyQuestion />
      </div>
    </div>
  );
};

export default SurveyContainer;
