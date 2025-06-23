import { CommunityApplicationData } from "./community-application-types";

/**
 * The community application data for AI automation community
 */
export const communityApplicationData: CommunityApplicationData = {
  title: "Join Our AI Automation Community",
  description: "Tell us about yourself and your business so we can ensure you're a great fit for our community",
  questions: [
    {
      id: 1,
      question: "What type of business do you run?",
      inputType: "multiple-choice",
      required: true,
      options: [
        { label: "Coaching", value: "coaching", key: "a" },
        { label: "Agency", value: "agency", key: "b" },
        { label: "B2B SaaS", value: "b2b-saas", key: "c" },
        { label: "Other", value: "other", key: "d" },
      ],
    },
    {
      id: 2,
      question: "What does it do?",
      subtitle: "Briefly describe your business and what it does",
      inputType: "short-text",
      required: true,
      placeholder: "Describe your business...",
    },
    {
      id: 3,
      question: "What's your current monthly revenue (USD)?",
      inputType: "multiple-choice",
      required: true,
      options: [
        { label: "Less than $10k", value: "under-10k", key: "a" },
        { label: "$10k - $25k", value: "10k-25k", key: "b" },
        { label: "$25k - $100k", value: "25k-100k", key: "c" },
        { label: "$100k+", value: "100k-plus", key: "d" },
      ],
    },
    {
      id: 4,
      question: "What's your current experience with AI automation?",
      inputType: "multiple-choice",
      required: true,
      options: [
        { label: "Some experience - used basic AI tools", value: "some-experience", key: "a" },
        { label: "Intermediate - built some automations", value: "intermediate", key: "b" },
        { label: "Advanced - regularly implement AI workflows", value: "advanced", key: "c" },
      ],
    },
    {
      id: 5,
      question: "What do you want to get out of this community?",
      subtitle: "Select all that apply",
      inputType: "multiple-select",
      required: true,
      options: [
        { label: "Learn AI automation", value: "learn-ai-automation", key: "a" },
        { label: "Access templates", value: "access-templates", key: "b" },
        { label: "Network with founders & others in my industry", value: "network-founders", key: "c" },
        { label: "Get expert support", value: "expert-support", key: "d" },
        { label: "Share my knowledge", value: "share-knowledge", key: "e" },
        { label: "Scale my business", value: "scale-business", key: "f" },
      ],
    },
    {
      id: 6,
      question: "What's your biggest challenge with AI automation right now?",
      inputType: "long-text",
      required: true,
      placeholder: "Tell us about your biggest AI automation challenge...",
    },
    {
      id: 7,
      question: "What's your website URL?",
      inputType: "url",
      required: true,
      placeholder: "https://yourwebsite.com",
    },
    {
      id: 8,
      question: "What's your LinkedIn?",
      inputType: "url",
      required: true,
      placeholder: "https://linkedin.com/in/yourprofile",
    },
    {
      id: 9,
      question: "Enter your contact details",
      inputType: "contact-form",
      required: true,
    },
  ],
};