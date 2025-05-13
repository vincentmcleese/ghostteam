"use client";

import { useSearchParams } from "next/navigation";
import { results } from "@/lib/quiz/config";
import { useState, Suspense } from "react";

function ResultContent() {
  const searchParams = useSearchParams();
  const resultType = searchParams.get("type") || "Hustler";
  const result = results[resultType];

  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-8 max-w-2xl w-full mx-4 bg-white rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold text-center mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-center text-gray-600">
            We couldn&apos;t find your quiz results. Please try taking the quiz
            again.
          </p>
          <div className="mt-6 text-center">
            <button
              onClick={() =>
                (window.location.href =
                  "/recruiter/how-ai-ready-is-your-recruitment-business")
              }
              className="px-4 py-2 border rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 md:p-8 mb-8 bg-white rounded-xl shadow-sm">
            <div
              className="w-16 h-16 rounded-full mb-6"
              style={{ backgroundColor: result.color }}
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {result.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{result.description}</p>
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold">Your Next Steps:</h2>
              <ul className="space-y-2">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                  🎁 Claim Your Personalized AI Recruiting Toolkit
                </h2>
                <p className="text-gray-600 mb-6">
                  Based on your result, we&apos;ll send you a tailored resource
                  packed with:
                  <br />
                  ✅ Checklists
                  <br />
                  ✅ Templates
                  <br />
                  ✅ Quick-start guides
                  <br />
                  ...to help you work smarter starting today.
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="First Name (optional)"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="email"
                    placeholder="Email (required)"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Me the Toolkit"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Thank You! 🎉</h2>
                <p className="text-gray-600 mb-6">
                  Your personalized toolkit is on its way to your inbox.
                </p>
                <button
                  onClick={() =>
                    (window.location.href =
                      "/recruiter/how-ai-ready-is-your-recruitment-business")
                  }
                  className="px-4 py-2 border rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  Take Quiz Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
