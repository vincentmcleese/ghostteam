import { Suspense } from "react";
import { Metadata } from "next";
import { quizData } from "@/lib/quiz/quiz-data";
import { QuizProvider } from "@/lib/quiz/quiz-context";
import QuizResults from "@/components/quiz/QuizResults";
import {
  getQuizResultBySession,
  getQuizResultByLinkedinId,
} from "@/lib/quiz/getQuizResult";

// Dynamic metadata for the result page
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category || "A";
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
  let sessionId = "";
  let linkedinId = "";
  let savedResults = null;

  // Get category if it exists and is a string
  if (typeof resolvedParams.category === "string") {
    category = resolvedParams.category;
  }

  // Check for hasProfile flag
  if (resolvedParams.hasProfile === "true") {
    hasProfile = true;
  }

  // Check for LinkedIn ID
  if (typeof resolvedParams.linkedinId === "string") {
    linkedinId = resolvedParams.linkedinId;
  }

  // Try to fetch saved results using available identifiers
  // First check for session ID
  if (typeof resolvedParams.session === "string") {
    sessionId = resolvedParams.session;

    try {
      const { success, data } = await getQuizResultBySession(sessionId);

      if (success && data) {
        savedResults = data;
        // Update category from saved results
        category = data.result_category;

        // Check if we have LinkedIn data
        if (data.linkedin_data && data.linkedin_data.profileImage) {
          hasProfile = true;
        }
      }
    } catch (error) {
      console.error("Error fetching saved quiz results by session:", error);
    }
  }

  // If we couldn't find by session ID, try LinkedIn ID if available
  if (!savedResults && linkedinId) {
    try {
      const { success, data } = await getQuizResultByLinkedinId(linkedinId);

      if (success && data) {
        savedResults = data;
        // Update category from saved results
        category = data.result_category;

        // We know we have LinkedIn data since we found by LinkedIn ID
        hasProfile = true;
      }
    } catch (error) {
      console.error("Error fetching saved quiz results by LinkedIn ID:", error);
    }
  }

  // Create initial state - use saved data if available
  const initialState = {
    currentQuestion: quizData.questions.length,
    answers:
      savedResults?.answers ||
      quizData.questions.reduce(
        (acc, q) => {
          acc[q.id] = category;
          return acc;
        },
        {} as Record<number, string>
      ),
    isComplete: true,
    resultCategory: category,
    averageScore:
      savedResults?.score ||
      (category === "A" ? 1.2 : category === "B" ? 2 : 2.8),
    scoreDistribution: [
      0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    // Use LinkedIn profile from saved results if available
    linkedInProfile:
      savedResults?.linkedin_data ||
      (hasProfile
        ? {
            profileImage: "/images/recruiter/profile-placeholder.png",
            firstName: "User",
          }
        : undefined),
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
