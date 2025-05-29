import { Suspense } from "react";
import { Metadata } from "next";
import { quizData } from "@/lib/quiz/quiz-data";
import { QuizProvider } from "@/lib/quiz/quiz-context";
import QuizResults from "@/components/quiz/QuizResults";

// Dynamic metadata for the result page
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string };
}): Promise<Metadata> {
  const category = searchParams.category || "A";
  const result = quizData.results[category];

  return {
    title: `${result.title} - AI Forward Recruiter Results`,
    description: `Your AI adoption level: ${result.description}`,
    openGraph: {
      title: `${result.title} - AI Forward Recruiter Results`,
      description: `Your AI adoption level: ${result.description}`,
      images: [{ url: result.imagePath }],
    },
  };
}

// Loading skeleton for the result page
function ResultSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-12 mb-8 bg-white rounded-xl shadow-sm animate-pulse">
            <div className="flex flex-col items-center">
              {/* Title skeleton */}
              <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>

              {/* Benchmark visualization skeleton */}
              <div className="w-full space-y-6">
                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>

              {/* CTA skeleton */}
              <div className="mt-8 h-32 bg-gray-200 rounded-xl w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/**
 * Result page component
 */
export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Await searchParams before accessing its properties
  const resolvedParams = await searchParams;

  // Safely extract parameters
  let category = "A"; // Default category
  let hasProfile = false;

  // Get category if it exists and is a string
  if (typeof resolvedParams.category === "string") {
    category = resolvedParams.category;
  }

  // Check for hasProfile flag
  if (resolvedParams.hasProfile === "true") {
    hasProfile = true;
  }

  // Create initial mock state
  const initialState = {
    currentQuestion: quizData.questions.length,
    answers: quizData.questions.reduce(
      (acc, q) => {
        acc[q.id] = category;
        return acc;
      },
      {} as Record<number, string>
    ),
    isComplete: true,
    resultCategory: category,
    averageScore: category === "A" ? 1.2 : category === "B" ? 2 : 2.8,
    scoreDistribution: [
      0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    // Only include LinkedIn profile flag if the user had one during the quiz
    linkedInProfile: hasProfile
      ? {
          profileImage: "/images/recruiter/profile-placeholder.png",
          firstName: "User",
        }
      : undefined,
  };

  return (
    <Suspense fallback={<ResultSkeleton />}>
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <QuizProvider initialState={initialState}>
            <QuizResults />
          </QuizProvider>
        </div>
      </main>
    </Suspense>
  );
}
