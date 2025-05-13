"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/quiz/config";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";

const QuizContainer = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const result = calculateResult({ ...answers, [questionId]: value });
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
