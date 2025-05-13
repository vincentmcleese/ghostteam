"use client";

import { Question } from "@/lib/quiz/config";

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: number, value: string) => void;
  onBack: () => void;
  showBack: boolean;
  selectedAnswer?: string;
}

const QuestionCard = ({
  question,
  onAnswer,
  onBack,
  showBack,
  selectedAnswer,
}: QuestionCardProps) => {
  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        {question.text}
      </h2>
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswer(question.id, option.value)}
            className={`w-full p-4 text-left rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              selectedAnswer === option.value
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50"
            }`}
            tabIndex={0}
            aria-label={option.text}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onAnswer(question.id, option.value);
              }
            }}
          >
            <span className="font-medium">{option.text}</span>
          </button>
        ))}
      </div>
      {showBack && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onBack}
            className="w-full md:w-auto px-4 py-2 border rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
            tabIndex={0}
            aria-label="Go back to previous question"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onBack();
              }
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
