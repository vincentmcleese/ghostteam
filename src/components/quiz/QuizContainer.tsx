"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/quiz/config";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Image from "next/image";

const QuizContainer = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleAnswer = async (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Final question answered
      setIsCalculating(true);

      // Calculate result
      const result = calculateResult({ ...answers, [questionId]: value });

      // Artificial delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to results
      router.push(
        `/recruiter/how-ai-ready-is-your-recruitment-business/result?type=${result}`
      );
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateResult = (answers: Record<number, string>) => {
    const counts = { A: 0, B: 0, C: 0 };
    Object.values(answers).forEach((value) => {
      counts[value as keyof typeof counts]++;
    });
    if (counts.A >= counts.B && counts.A >= counts.C) return "Hustler";
    if (counts.B >= counts.A && counts.B >= counts.C) return "Optimizer";
    return "Scaler";
  };

  if (isCalculating) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
        <div className="relative w-32 h-32 animate-pulse">
          <Image
            src="/images/ghost_white_transparent.png"
            alt="Ghost Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
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

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar current={currentQuestion + 1} total={questions.length} />
      <div className="mt-8">
        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          onBack={handleBack}
          showBack={currentQuestion > 0}
          selectedAnswer={answers[questions[currentQuestion].id]}
        />
      </div>
    </div>
  );
};

export default QuizContainer;
