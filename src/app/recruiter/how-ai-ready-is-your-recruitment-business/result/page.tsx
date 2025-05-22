"use client";

import { useSearchParams } from "next/navigation";
import { results } from "@/lib/quiz/config";
import { useState, Suspense } from "react";
import Image from "next/image";

function ResultContent() {
  const searchParams = useSearchParams();
  const resultType = searchParams.get("type") || "Hustler";
  const result = results[resultType];

  const [formData, setFormData] = useState({ firstName: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          resultType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending email:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send email. Please try again."
      );
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
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-12 mb-8 bg-white rounded-xl shadow-sm">
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 md:w-96 md:h-96 mb-8 md:mb-12">
                <Image
                  src={`/images/recruiter/${
                    resultType.toLowerCase() === "hustler"
                      ? "manualhustler"
                      : resultType.toLowerCase() === "optimizer"
                        ? "curiousoptimizer"
                        : "systemoperator"
                  }.png`}
                  alt={result.title}
                  width={384}
                  height={384}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {result.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-12">
                  {result.description}
                </p>
              </div>
              <div className="w-full max-w-2xl">
                <div className="space-y-6 mb-12">
                  <h2 className="text-2xl font-semibold text-center">
                    Your Next Steps:
                  </h2>
                  <ul className="space-y-4">
                    {result.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-3 text-xl">•</span>
                        <span className="text-lg">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {!isSubmitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border-2 border-primary/20 shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                      <div className="w-full h-full bg-primary/10 rounded-full animate-pulse"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
                      🎁 Claim Your Personalized AI Recruiting Toolkit
                    </h2>
                    <p className="text-center text-sm text-primary/80 font-medium mb-8">
                      Limited time offer - Get your custom toolkit now!
                    </p>
                    {error && (
                      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium mb-4">
                            Based on your result, we&apos;ll send you a tailored
                            resource packed with:
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-primary">
                              <span className="text-lg">✅</span>
                              <span className="font-semibold">
                                Checklists for AI implementation
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-primary">
                              <span className="text-lg">✅</span>
                              <span className="font-semibold">
                                5 Ready-to-use Templates
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-primary">
                              <span className="text-lg">✅</span>
                              <span className="font-semibold">
                                Quick-start guides
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 md:mt-0 md:flex-1">
                          <div className="relative h-36 md:h-44">
                            <div className="absolute left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-full max-w-[160px] flex justify-center perspective-1000">
                              <div className="relative w-full">
                                <Image
                                  src="/images/recruiter/page1.png"
                                  alt="Toolkit Preview Page 1"
                                  width={160}
                                  height={226}
                                  className="rounded-lg shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-300"
                                  style={{ objectFit: "contain" }}
                                />
                                <Image
                                  src="/images/recruiter/page2.png"
                                  alt="Toolkit Preview Page 2"
                                  width={160}
                                  height={226}
                                  className="rounded-lg shadow-xl absolute top-0 -right-16 transform rotate-12 hover:rotate-0 transition-transform duration-300"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary/20 mt-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8">
                        <div className="w-full h-full bg-primary/20 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🎯</span>
                        <div>
                          <span className="font-bold text-primary">BONUS:</span>
                          <span className="font-semibold">
                            {" "}
                            Access to our Slack community
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Get free support in setting up your templates from
                            our expert community
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 relative z-10">
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
                        className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
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
                        className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                      />
                      <button
                        type="submit"
                        className="w-full px-6 py-4 bg-primary text-white rounded-lg font-bold text-lg shadow-lg hover:bg-primary/90 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Me the Toolkit 🚀"
                        )}
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
