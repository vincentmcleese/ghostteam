"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuiz } from "@/lib/quiz/quiz-context";
import BenchmarkVisual from "./BenchmarkVisual";
import { Button } from "@/components/ui/button";

/**
 * Displays the quiz results focused on the benchmark visualization
 */
const QuizResults: React.FC = () => {
  const { state, quizData } = useQuiz();
  const { resultCategory, averageScore, scoreDistribution } = state;

  useEffect(() => {
    if (resultCategory) {
      // Analytics tracking could go here
      console.log("Quiz result viewed:", resultCategory);
    }
  }, [resultCategory]);

  // If no result category, we can't show results (or quiz data not loaded)
  if (
    !resultCategory ||
    !averageScore ||
    !scoreDistribution ||
    !quizData.results[resultCategory]
  ) {
    // console.log("Missing data for results page:", {resultCategory, averageScore, scoreDistribution, quizDataResults: quizData.results[resultCategory]});
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Loading Results...</h2>
          <p className="text-gray-600">
            Please wait while we prepare your assessment results.
          </p>
        </div>
      </div>
    );
  }

  const result = quizData.results[resultCategory]; // Now safe to access

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Main results container */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Your AI Forward Recruiter Results
        </h1>

        {/* Benchmark visualization - the focal point */}
        <BenchmarkVisual
          userScore={averageScore} // averageScore is already calculated and available
          distribution={scoreDistribution} // scoreDistribution is also available
        />
      </div>

      {/* Slack community CTA */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg mb-8">
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
            Join the leading AI powered recruitment community
          </h2>

          {/* Avatar Group */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4 text-center font-medium">
              Join 100+ peers thinking about agentic automations
            </p>

            <div className="flex justify-center">
              <div className="flex -space-x-3 mr-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-purple-400 flex items-center justify-center text-white font-semibold">
                  MK
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-400 flex items-center justify-center text-white font-semibold">
                  RW
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-400 flex items-center justify-center text-white font-semibold">
                  TP
                </div>
              </div>
              <div className="flex items-center justify-center bg-gray-100 rounded-full px-3 py-1">
                <span className="text-sm font-medium text-gray-600">
                  +97 more
                </span>
              </div>
            </div>
          </div>

          {/* Checkmark List */}
          <div className="w-full max-w-xl mb-6">
            <div className="flex items-start mb-4">
              <div className="bg-primary rounded-full p-1 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700">
                Examples of AI system workflows being used by real recruiters
              </span>
            </div>
            <div className="flex items-start mb-4">
              <div className="bg-primary rounded-full p-1 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700">
                Stay up to date on what is possible
              </span>
            </div>
            <div className="flex items-start">
              <div className="bg-primary rounded-full p-1 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700">
                Ask questions and get help setting up workflows
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="mt-2 bg-[#4A154B] hover:bg-[#611f64] text-white px-8 py-6 h-auto text-lg flex items-center gap-2"
            asChild
          >
            <Link href="https://form.typeform.com/to/MdIRE7CS">
              <Image
                src="/images/slack-logo-white.png"
                alt="Slack Logo"
                width={24}
                height={24}
                className="mr-2"
              />
              Apply to join
            </Link>
          </Button>

          {/* Slack Screenshot */}
          <div className="mt-8 w-full">
            <Image
              src="/images/joinslack.png"
              alt="Ghost Team Slack Community"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
