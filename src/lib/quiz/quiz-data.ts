import { QuizData } from "./quiz-types";

/**
 * The quiz data
 */
export const quizData: QuizData = {
  title: "AI Forward Recruiter",
  description:
    "Discover your AI adoption level compared to over 100 industry peers",
  questions: [
    {
      id: 1,
      question: "How do you currently source candidates?",
      category: "Sourcing",
      options: [
        {
          label: "Mostly manual LinkedIn searches and InMails",
          score: "A",
          heading: "Manual",
        },
        {
          label:
            "I use search tools like LinkedIn Recruiter and sometimes test automation tools",
          score: "B",
          heading: "AI Optimizing",
        },
        {
          label:
            "I have AI-powered sourcing or scraping tools that run in the background",
          score: "C",
          heading: "Agent Scaling",
        },
      ],
    },
    {
      id: 2,
      question: "How do you handle outbound outreach to candidates or clients?",
      category: "Outreach",
      options: [
        {
          label: "I write and send most messages myself, one by one",
          score: "A",
          heading: "Manual",
        },
        {
          label: "I use templates or semi-automated campaigns",
          score: "B",
          heading: "AI Optimizing",
        },
        {
          label:
            "I run multi-step outreach workflows that auto-personalize based on profile data",
          score: "C",
          heading: "Agent Scaling",
        },
      ],
    },
    {
      id: 3,
      question:
        "What's your process for CV formatting and candidate presentation?",
      category: "Presentation",
      options: [
        {
          label: "I manually format CVs in Word or PDF",
          score: "A",
          heading: "Manual",
        },
        {
          label: "I use tools like Canva or PDF Filler to speed things up",
          score: "B",
          heading: "AI Optimizing",
        },
        {
          label:
            "I use AI tools that automatically format and standardize CVs into consistent templates",
          score: "C",
          heading: "Agent Scaling",
        },
      ],
    },
    {
      id: 4,
      question:
        "When a new AI tool hits the market, what's your typical reaction?",
      category: "Adoption",
      options: [
        {
          label: "I bookmark it but rarely try it",
          score: "A",
          heading: "Manual",
        },
        {
          label: "I test it out and try to find use cases",
          score: "B",
          heading: "AI Optimizing",
        },
        {
          label:
            "I evaluate new tools monthly and slot them into existing workflows if they save time",
          score: "C",
          heading: "Agent Scaling",
        },
      ],
    },
    {
      id: 5,
      question:
        "How much of your time is spent on high-value activities like engaging with candidates or clients?",
      category: "Efficiency",
      options: [
        {
          label:
            "Less than 30% – most of my time goes to admin or repetitive tasks",
          score: "A",
          heading: "Manual",
        },
        {
          label:
            "Around 30–60% – I'm balancing manual work and direct engagement",
          score: "B",
          heading: "AI Optimizing",
        },
        {
          label:
            "Over 60% – most low-value tasks are handled by automations or support systems",
          score: "C",
          heading: "Agent Scaling",
        },
      ],
    },
    {
      id: 6,
      question:
        "How do you follow up with candidates or clients after the first message?",
      category: "Follow-up",
      options: [
        {
          label: "I try to remember manually or set calendar reminders",
          score: "A",
          heading: "Manual",
        },
        {
          label: "I use a CRM with reminders or basic workflows",
          score: "B",
          heading: "AI Optimizing",
        },
        {
          label:
            "I've built automated sequences with triggers based on replies or time delays",
          score: "C",
          heading: "Agent Scaling",
        },
      ],
    },
    {
      id: 7,
      question: "How do you track and visualize your recruitment metrics?",
      category: "Analytics",
      options: [
        {
          label: "Mostly gut feeling or basic notes",
          score: "A",
          heading: "Manual",
        },
        {
          label: "I update some numbers manually in spreadsheets or a CRM",
          score: "B",
          heading: "AI Optimizing",
        },
        {
          label:
            "I use dashboards (e.g., in Tableau, Power BI, or Notion) that auto-pull and visualize key funnel metrics",
          score: "C",
          heading: "Agent Scaling",
        },
      ],
    },
    {
      id: 8,
      question:
        "Do you use ChatGPT or similar AI tools in your daily workflow?",
      category: "AI Usage",
      options: [
        {
          label: "Rarely or only for fun",
          score: "A",
          heading: "Manual",
        },
        {
          label: "I use it for writing job ads or brainstorming",
          score: "B",
          heading: "AI Optimizing",
        },
        {
          label: "It's integrated into how I write, ideate, or analyze data",
          score: "C",
          heading: "Agent Scaling",
        },
      ],
    },
  ],
  results: {
    A: {
      title: "Manual Hustler",
      description:
        "You're working hard and manually driving every part of your workflow. AI could help you unlock more time, reduce burnout, and improve your results without losing your personal touch.",
      imagePath: "/images/recruiter/manualhustler.png",
    },
    B: {
      title: "Curious Optimizer",
      description:
        "You're testing tools and tweaking your workflow. You're close to a breakthrough — with the right systems and integrations, you can start scaling sustainably.",
      imagePath: "/images/recruiter/curiousoptimizer.png",
    },
    C: {
      title: "System Scaler",
      description:
        "You've built workflows that do the heavy lifting. You think in systems, leverage AI, and focus on high-value activities. Now it's about doubling down and optimizing for growth.",
      imagePath: "/images/recruiter/systemoperator.png",
    },
  },
};

/**
 * Calculate the result category based on the answers
 */
export const calculateResultCategory = (
  answers: Record<number, string>
): string => {
  // Count occurrences of each score
  const counts = { A: 0, B: 0, C: 0 };

  Object.values(answers).forEach((score) => {
    counts[score as keyof typeof counts]++;
  });

  // Find the most frequent score (or first in case of tie)
  if (counts.A >= counts.B && counts.A >= counts.C) return "A";
  if (counts.B >= counts.A && counts.B >= counts.C) return "B";
  return "C";
};

/**
 * Calculate average score (1 for A, 2 for B, 3 for C)
 */
export const calculateAverageScore = (
  answers: Record<number, string>
): number => {
  const scoreMap = { A: 1, B: 2, C: 3 };
  const scores = Object.values(answers).map(
    (score) => scoreMap[score as keyof typeof scoreMap]
  );

  const sum = scores.reduce((total, score) => total + score, 0);
  return sum / scores.length;
};

/**
 * Generate a distribution of scores for visualization
 */
export const generateScoreDistribution = (averageScore: number): number[] => {
  // Create a normal distribution around the average score
  // This is a simplification - in a real app we might use actual user data

  // Range from 1.0 to 3.0 with steps of 0.1
  const range = Array.from({ length: 21 }, (_, i) => 1 + i * 0.1);

  // Create a normal distribution with peak at averageScore
  const distribution = range.map((value) => {
    const distance = Math.abs(value - averageScore);
    // Normal-ish distribution (simplified)
    return Math.max(0, 10 * Math.exp(-distance * 1.5));
  });

  return distribution;
};
