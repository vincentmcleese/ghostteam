"use client";

import React from "react";
import { useQuiz } from "@/lib/quiz/quiz-context";
import { QuizQuestion as QuizQuestionType } from "@/lib/quiz/quiz-types";
import QuizOption from "./QuizOption";

/**
 * Displays the current quiz question and options
 */
const QuizQuestion: React.FC = () => {
  const { state, dispatch, quizData } = useQuiz();
  const { currentQuestion, answers } = state;

  // Get the current question data
  const question: QuizQuestionType = quizData.questions[currentQuestion];

  // If no question is found, return empty state
  if (!question) {
    return null;
  }

  const selectedAnswer = answers[question.id];

  const handleAnswer = (score: string) => {
    dispatch({
      type: "ANSWER_QUESTION",
      payload: { questionId: question.id, answer: score },
    });
  };

  const handleBack = () => {
    dispatch({ type: "PREVIOUS_QUESTION" });
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 md:p-8">
      {/* Question category */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          {question.category}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
        {question.question}
      </h2>

      <div className="space-y-2">
        {question.options.map((option, index) => (
          <QuizOption
            key={`${question.id}-${option.score}`}
            option={option}
            isSelected={selectedAnswer === option.score}
            onSelect={handleAnswer}
            index={index}
          />
        ))}
      </div>

      {/* Back button (only if not on first question) */}
      {currentQuestion > 0 && (
        <button
          className="mt-6 text-blue-600 hover:text-blue-800 transition-colors"
          onClick={handleBack}
          type="button"
        >
          &larr; Previous question
        </button>
      )}
    </div>
  );
};

export default QuizQuestion;
