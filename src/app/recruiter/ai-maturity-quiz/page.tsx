import { Suspense } from "react";
import { Metadata } from "next";
import QuizContainer from "@/components/quiz/QuizContainer";
import { QuizProvider } from "@/lib/quiz/quiz-context";
import { quizData } from "@/lib/quiz/quiz-data";
import LinkedInPersonalization from "@/components/quiz/LinkedInPersonalization";

// Define the metadata
export const metadata: Metadata = {
  title: quizData.title,
  description: quizData.description,
  openGraph: {
    title: quizData.title,
    description: quizData.description,
    type: "website",
  },
};

// Quiz intro component
const QuizIntro = () => {
  return (
    <div className="max-w-3xl mx-auto mb-12 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">{quizData.title}</h1>
      <p className="text-xl text-gray-600 mb-8">{quizData.description}</p>
    </div>
  );
};

// Loading skeleton
const QuizLoadingSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
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
 * Main Quiz Page
 */
export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Await searchParams before accessing its properties
  const resolvedParams = await searchParams;

  // Safely extract LinkedIn ID
  let linkedInId: string | undefined;

  // Get ID from either l or utm_linkedin parameter
  if (typeof resolvedParams.l === "string") {
    linkedInId = resolvedParams.l;
  } else if (typeof resolvedParams.utm_linkedin === "string") {
    linkedInId = resolvedParams.utm_linkedin;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Only show LinkedIn personalization on the quiz page */}
        {linkedInId && <LinkedInPersonalization linkedInId={linkedInId} />}

        <QuizIntro />
        <Suspense fallback={<QuizLoadingSkeleton />}>
          <QuizProvider linkedInId={linkedInId}>
            <QuizContainer />
          </QuizProvider>
        </Suspense>
      </div>
    </main>
  );
}
