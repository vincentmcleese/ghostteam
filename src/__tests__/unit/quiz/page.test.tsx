import { render, screen } from "@testing-library/react";
import QuizPage from "@/app/recruiter/ai-maturity-quiz/page";
import ResultPage from "@/app/recruiter/ai-maturity-quiz/result/page";
import "@testing-library/jest-dom";

// Mock the dependencies
jest.mock("@/components/quiz/QuizContainer", () => ({
  __esModule: true,
  default: () => <div data-testid="quiz-container">Quiz Container</div>,
}));

jest.mock("@/components/quiz/QuizResults", () => ({
  __esModule: true,
  default: () => <div data-testid="quiz-results">Quiz Results</div>,
}));

jest.mock("@/components/quiz/LinkedInPersonalization", () => ({
  __esModule: true,
  default: ({ linkedInId }: { linkedInId: string }) => (
    <div data-testid="linkedin-personalization">LinkedIn ID: {linkedInId}</div>
  ),
}));

jest.mock("@/lib/quiz/quiz-context", () => ({
  __esModule: true,
  QuizProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="quiz-provider">{children}</div>
  ),
}));

describe("Quiz Pages with searchParams as Promises", () => {
  // Helper function to create a promise that resolves to searchParams
  const createSearchParamsPromise = (params: Record<string, string>) => {
    return Promise.resolve(params);
  };

  test("QuizPage handles LinkedIn ID from searchParams", async () => {
    // Mock searchParams as a Promise
    const searchParams = createSearchParamsPromise({ l: "test-linkedin-id" });

    // Render the component with the mocked props
    const { container } = render(await QuizPage({ searchParams }));

    // Check if LinkedIn personalization is shown with the correct ID
    expect(screen.getByTestId("linkedin-personalization")).toHaveTextContent(
      "LinkedIn ID: test-linkedin-id"
    );

    // Check if the quiz container is rendered
    expect(screen.getByTestId("quiz-container")).toBeInTheDocument();
  });

  test("QuizPage handles utm_linkedin parameter", async () => {
    // Mock searchParams as a Promise with utm_linkedin
    const searchParams = createSearchParamsPromise({
      utm_linkedin: "utm-linkedin-id",
    });

    // Render the component with the mocked props
    const { container } = render(await QuizPage({ searchParams }));

    // Check if LinkedIn personalization is shown with the correct ID
    expect(screen.getByTestId("linkedin-personalization")).toHaveTextContent(
      "LinkedIn ID: utm-linkedin-id"
    );
  });

  test("QuizPage without LinkedIn ID still renders properly", async () => {
    // Mock empty searchParams
    const searchParams = createSearchParamsPromise({});

    // Render the component with the mocked props
    const { container } = render(await QuizPage({ searchParams }));

    // LinkedIn personalization should not be rendered
    expect(
      screen.queryByTestId("linkedin-personalization")
    ).not.toBeInTheDocument();

    // Quiz container should still be rendered
    expect(screen.getByTestId("quiz-container")).toBeInTheDocument();
  });

  test("ResultPage handles category from searchParams", async () => {
    // Mock searchParams with category
    const searchParams = createSearchParamsPromise({
      category: "B",
      hasProfile: "true",
    });

    // Render the component with the mocked props
    const { container } = render(await ResultPage({ searchParams }));

    // Check if quiz results are rendered
    expect(screen.getByTestId("quiz-results")).toBeInTheDocument();

    // Check if the quiz provider is rendered
    expect(screen.getByTestId("quiz-provider")).toBeInTheDocument();
  });

  test("ResultPage with default category still renders properly", async () => {
    // Mock empty searchParams
    const searchParams = createSearchParamsPromise({});

    // Render the component with the mocked props
    const { container } = render(await ResultPage({ searchParams }));

    // Quiz results should still be rendered
    expect(screen.getByTestId("quiz-results")).toBeInTheDocument();
  });
});
