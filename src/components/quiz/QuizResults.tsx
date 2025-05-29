"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useQuiz } from "@/lib/quiz/quiz-context";
import BenchmarkVisual from "./BenchmarkVisual";
import { Button } from "@/components/ui/button";

/**
 * Displays the quiz results focused on the benchmark visualization
 */
const QuizResults: React.FC = () => {
  const { state, quizData } = useQuiz();
  const { resultCategory, averageScore, scoreDistribution } = state;

  // Always call hooks at the top level
  useEffect(() => {
    if (resultCategory) {
      // Analytics tracking could go here
      console.log("Quiz result viewed:", resultCategory);
    }
  }, [resultCategory]);

  // If no result category, we can't show results
  if (!resultCategory || !averageScore || !scoreDistribution) {
    return null;
  }

  // We can safely access quizData after checking resultCategory exists
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = quizData.results[resultCategory];

  const handleOpenModal = () => {
    // In the future, this could open a modal
    // For now, redirect to the community page
    window.open("/community", "_blank");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Main results container */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Your AI Forward Recruiter Results
        </h1>

        {/* Benchmark visualization - the focal point */}
        <BenchmarkVisual
          userScore={averageScore}
          distribution={scoreDistribution}
        />
      </div>

      {/* Slack community CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-center">
            100+ recruiters have joined the Ghost Team AI recruitment community
          </h2>
          <p className="mb-6 text-indigo-100 text-center max-w-3xl">
            Implement top quick win implementations and connect with other
            recruitment professionals leveraging AI
          </p>

          {/* High ROI AI Value Flows with Checkmarks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
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
              <span className="text-white">
                Warm outreach to network based on fundraise events from
                Crunchbase
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
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
              <span className="text-white">
                Automated candidate qualification based on LinkedIn profiles
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
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
              <span className="text-white">
                AI-powered interview question generation for specific roles
              </span>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-full p-1 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
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
              <span className="text-white">
                Personalized outreach templates that scale with AI
              </span>
            </div>
          </div>

          {/* CTA Button - Styled like community page */}
          <Button
            size="lg"
            className="mt-2 bg-[#4A154B] hover:bg-[#611f64] text-white px-8 py-6 h-auto text-lg flex items-center gap-2"
            onClick={handleOpenModal}
          >
            <Image
              src="/images/slack-logo-white.png"
              alt="Slack Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Request to join community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
