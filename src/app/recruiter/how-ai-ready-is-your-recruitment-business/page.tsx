"use client";

import QuizContainer from "@/components/quiz/QuizContainer";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How AI-Ready is Your Recruitment Business?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take our 5-minute quiz to discover your AI maturity level and get
            personalized recommendations to transform your recruitment process.
          </p>
        </div>
        <QuizContainer />
      </div>
    </main>
  );
}
