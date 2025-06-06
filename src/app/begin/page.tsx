import { Suspense } from "react";
import { Metadata } from "next";
import SurveyContainer from "@/components/survey/SurveyContainer";
import { SurveyProvider } from "@/lib/survey/survey-context";
import { surveyData } from "@/lib/survey/survey-data";

// Define the metadata
export const metadata: Metadata = {
  title: surveyData.title,
  description: surveyData.description,
  openGraph: {
    title: surveyData.title,
    description: surveyData.description,
    type: "website",
  },
};

// Survey intro component
const SurveyIntro = () => {
  return (
    <div className="max-w-3xl mx-auto mb-12 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">
        {surveyData.title}
      </h1>
      <p className="text-xl text-gray-600 mb-8">{surveyData.description}</p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <strong>💡 Pro tip:</strong> Use keyboard shortcuts! Press the letter
        keys (A, B, C...) for multiple choice, or Enter to continue.
      </div>
    </div>
  );
};

// Loading skeleton
const SurveyLoadingSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
      <div className="w-full rounded-xl shadow-sm p-6 bg-white">
        <div className="w-3/4 h-8 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Main Survey Page (/begin)
 */
export default function SurveyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <SurveyIntro />
        <Suspense fallback={<SurveyLoadingSkeleton />}>
          <SurveyProvider>
            <SurveyContainer />
          </SurveyProvider>
        </Suspense>
      </div>
    </main>
  );
}
