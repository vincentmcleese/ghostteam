import { Metadata } from "next";
import {
  questions as quizQuestions,
  results as quizResults,
} from "./quiz/config";

// Base site information
const siteName = "Ghost Team AI";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ghostteam.ai";

interface GenerateMetadataParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
  structuredData?: object;
}

/**
 * Generates consistent metadata for the entire website
 */
export function generateMetadata({
  title,
  description,
  path,
  ogImage = "/images/og-image.png",
  noIndex = false,
  keywords = [],
  structuredData,
}: GenerateMetadataParams): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | ${siteName}`;

  // Construct metadata object following Next.js 13+ format
  const metadata: Metadata = {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: description,
      url: url,
      siteName: siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
      images: [ogImage],
    },
  };

  // Handle robots directives for pages that shouldn't be indexed
  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  // Add structured data if provided - using script tag format for compatibility
  if (structuredData) {
    metadata.other = {
      "structured-data": JSON.stringify(structuredData),
    };
  }

  return metadata;
}

/**
 * Generates structured data for FAQ pages (like quizzes)
 */
export function generateFAQStructuredData(
  questions: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generates structured data for articles and blog posts
 */
export function generateArticleStructuredData({
  title,
  description,
  imageUrl,
  authorName,
  publishDate,
  modifiedDate,
  url,
}: {
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  publishDate: string;
  modifiedDate?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    url: url,
  };
}

/**
 * Generates structured data for a quiz
 */
export function generateQuizStructuredData() {
  // Convert quiz questions to FAQ format for structured data
  const faqQuestions = quizQuestions.map((q) => ({
    question: q.text,
    answer: q.options.map((opt) => opt.text).join(" | "),
  }));

  return generateFAQStructuredData(faqQuestions);
}

/**
 * Generates metadata specifically for the AI Readiness Quiz
 */
export function generateQuizMetadata(): Metadata {
  const title = "How AI-Ready is Your Recruitment Business?";
  const description =
    "Take our 5-minute quiz to discover your AI maturity level and get personalized recommendations to transform your recruitment process.";
  const path = "/recruiter/how-ai-ready-is-your-recruitment-business";
  const keywords = [
    "AI readiness quiz",
    "recruitment AI",
    "recruitment technology",
    "AI maturity assessment",
    "recruitment automation",
    "AI for recruiters",
    "recruitment business technology",
  ];

  return generateMetadata({
    title,
    description,
    path,
    keywords,
    structuredData: generateQuizStructuredData(),
    ogImage: "/images/recruiter/quiz-og-image.png", // Create a specific OG image for the quiz
  });
}

/**
 * Generates metadata specifically for the AI Readiness Quiz Result page
 */
export function generateQuizResultMetadata(resultType?: string): Metadata {
  // Default result type if none specified
  const type = resultType || "Hustler";
  const result = quizResults[type];

  const title = `${result.title} - AI Readiness Quiz Results`;
  const description = `Your AI readiness assessment: ${result.description} Get personalized recommendations for your recruitment business.`;
  const path = `/recruiter/how-ai-ready-is-your-recruitment-business/result?type=${type}`;
  const keywords = [
    "AI readiness results",
    "recruitment AI assessment",
    "AI maturity level",
    type,
    result.title,
    "recruitment technology",
    "AI recommendations",
  ];

  return generateMetadata({
    title,
    description,
    path,
    keywords,
    ogImage: `/images/recruiter/${type.toLowerCase()}-result-og.png`, // Create result-specific OG images
  });
}
