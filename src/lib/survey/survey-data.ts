import { SurveyData } from "./survey-types";

/**
 * The survey data for business lead qualification
 */
export const surveyData: SurveyData = {
  title: "Let's Get Started",
  description: "Tell us about your business so we can help you better",
  questions: [
    {
      id: 1,
      question: "What type of business do you run?",
      inputType: "multiple-choice",
      required: true,
      options: [
        { label: "B2B SaaS", value: "b2b-saas", key: "a" },
        { label: "Recruitment", value: "recruitment", key: "b" },
        { label: "Agency", value: "agency", key: "c" },
        { label: "Coaching", value: "coaching", key: "d" },
        { label: "Healthcare & Medical", value: "healthcare-medical", key: "e" },
        { label: "Real Estate", value: "real-estate", key: "f" },
        { label: "Transportation & Logistics", value: "transportation-logistics", key: "g" },
        { label: "Architecture & Construction", value: "architecture-construction", key: "h" },
        { label: "Other", value: "other", key: "i" },
      ],
    },
    {
      id: 2,
      question: "What does it do?",
      subtitle:
        'Three sentences or less. For instance, "I help dentists get more patients using FB ads for between $2,000 to $5,000 per month."',
      inputType: "long-text",
      required: true,
      placeholder: "Describe your business...",
    },
    {
      id: 3,
      question:
        "Are you looking for a one-time project or an ongoing monthly relationship?",
      inputType: "multiple-choice",
      required: true,
      options: [
        { label: "One-time project", value: "one-time", key: "a" },
        { label: "Ongoing monthly relationship", value: "ongoing", key: "b" },
      ],
    },
    {
      id: 4,
      question: "What would you like help with?",
      subtitle:
        "Be as detailed as possible. We'll use this to scope your needs ahead of time, so that our call is time-effective for everyone.",
      inputType: "long-text",
      required: true,
      placeholder: "Tell us what you need help with...",
    },
    {
      id: 5,
      question: "What's your current monthly revenue (USD)?",
      inputType: "multiple-choice",
      required: true,
      options: [
        { label: "Less than $10k", value: "under-10k", key: "a" },
        { label: "$10k - $25k", value: "10k-25k", key: "b" },
        { label: "$25k - $100k", value: "25k-100k", key: "c" },
        { label: "$100k - $250k", value: "100k-250k", key: "d" },
        { label: "$250k - $500k", value: "250k-500k", key: "e" },
        { label: "$500k - $1M", value: "500k-1m", key: "f" },
        { label: "$1M - $2.5M", value: "1m-2_5m", key: "g" },
        { label: "$2.5M - $5M", value: "2_5m-5m", key: "h" },
        { label: "$5M+", value: "5m-plus", key: "i" },
      ],
    },
    {
      id: 6,
      question: "What's your website URL?",
      inputType: "url",
      required: true,
      placeholder: "https://yourwebsite.com",
    },
    {
      id: 7,
      question: "What's your LinkedIn?",
      inputType: "url",
      required: true,
      placeholder: "https://linkedin.com/in/yourprofile",
    },
    {
      id: 8,
      question: "Enter your contact details",
      inputType: "contact-form",
      required: true,
    },
    {
      id: 9,
      question: "How did you hear about us?",
      inputType: "multiple-choice",
      required: true,
      options: [
        { label: "Google", value: "google", key: "a" },
        { label: "AI Search (ChatGPT, Perplexity etc.)", value: "ai-search", key: "b" },
        { label: "LinkedIn", value: "linkedin", key: "c" },
        { label: "X", value: "x", key: "d" },
        { label: "YouTube", value: "youtube", key: "e" },
        { label: "TikTok", value: "tiktok", key: "f" },
        { label: "Instagram", value: "instagram", key: "g" },
        { label: "Newsletter", value: "newsletter", key: "h" },
        { label: "From a colleague / friend", value: "colleague-friend", key: "i" },
        { label: "Other", value: "other", key: "j" },
      ],
    },
  ],
};
