"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PersonalizationCard from "@/components/quiz/PersonalizationCard";

export default function TestLinkedIn() {
  const [linkedInId, setLinkedInId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (linkedInId) {
      // Redirect to the quiz page with the LinkedIn ID as a parameter
      router.push(
        `/recruiter/ai-maturity-quiz?utm_linkedin=${encodeURIComponent(linkedInId)}`
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-3xl py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          LinkedIn Personalization Test
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="linkedInId"
                className="block text-gray-700 font-medium mb-2"
              >
                Enter LinkedIn ID (e.g., johndoe, janedoe123)
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300">
                  linkedin.com/in/
                </span>
                <input
                  type="text"
                  id="linkedInId"
                  value={linkedInId}
                  onChange={(e) => setLinkedInId(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="LinkedIn ID"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              disabled={!linkedInId}
            >
              Go to Quiz with Personalization
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Preview Personalization Card
          </h2>
          {linkedInId ? (
            <PersonalizationCard linkedInId={linkedInId} />
          ) : (
            <p className="text-gray-500 italic">
              Enter a LinkedIn ID above to preview the personalization card
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
