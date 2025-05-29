// Learn more: https://jestjs.io/docs/configuration#setupfilesafterenv-array

// Add testing library extended matchers
import "@testing-library/jest-dom";

// Mock Next.js routing
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => "",
}));

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_SITE_URL: "https://www.ghostteam.ai",
};

// Reset all mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
