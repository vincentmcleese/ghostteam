export interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    value: "A" | "B" | "C";
  }[];
}

export interface QuizResult {
  type: "Hustler" | "Optimizer" | "Scaler";
  color: string;
  title: string;
  description: string;
  nextSteps: string[];
  leadMagnet: {
    title: string;
    description: string;
    url: string;
  };
}

export const questions: Question[] = [
  {
    id: 1,
    text: "When it comes to outreach and follow-up, you…",
    options: [
      {
        id: "1A",
        text: "Sweat through every step manually — no shortcuts yet.",
        value: "A",
      },
      {
        id: "1B",
        text: "Use a few tools, but still spend too much time on repetitive tasks.",
        value: "B",
      },
      {
        id: "1C",
        text: "Have started automating, but crave even more efficiency.",
        value: "C",
      },
    ],
  },
  {
    id: 2,
    text: "How do you feel about adopting new recruiting tech?",
    options: [
      {
        id: "2A",
        text: "Tech makes me nervous — I stick to what I know.",
        value: "A",
      },
      {
        id: "2B",
        text: "I'll try new tools if they come highly recommended.",
        value: "B",
      },
      {
        id: "2C",
        text: "I'm always testing new tools — innovation is my edge.",
        value: "C",
      },
    ],
  },
  {
    id: 3,
    text: "What's your current workload situation?",
    options: [
      {
        id: "3A",
        text: "I'm juggling so much, I barely have time to breathe.",
        value: "A",
      },
      {
        id: "3B",
        text: "Busy, but I can carve out time for improvements.",
        value: "B",
      },
      {
        id: "3C",
        text: "I've built in breathing room — I'm ready to scale up.",
        value: "C",
      },
    ],
  },
  {
    id: 4,
    text: "Which statement matches your mindset?",
    options: [
      {
        id: "4A",
        text: "If it ain't broke, don't fix it.",
        value: "A",
      },
      {
        id: "4B",
        text: "I know I could work smarter, but where do I start?",
        value: "B",
      },
      {
        id: "4C",
        text: "I want to build systems so my business runs itself.",
        value: "C",
      },
    ],
  },
  {
    id: 5,
    text: "What's driving you right now?",
    options: [
      {
        id: "5A",
        text: "Keeping clients happy and staying afloat.",
        value: "A",
      },
      {
        id: "5B",
        text: "Streamlining my workflow for sanity and speed.",
        value: "B",
      },
      {
        id: "5C",
        text: "Growing my business — without burning out.",
        value: "C",
      },
    ],
  },
];

export const results: Record<string, QuizResult> = {
  Hustler: {
    type: "Hustler",
    color: "#FF5733",
    title: "Manual Hustler",
    description: "You're the engine behind everything, but it's exhausting.",
    nextSteps: [
      "Start with simple automations (LinkedIn follow-ups, email sequences)",
      "Use AI to repurpose job ads and speed up content creation",
    ],
    leadMagnet: {
      title: "3 Quick Wins with AI for Busy Recruiters",
      description: "Get started with AI automation in your recruitment process",
      url: "/downloads/hustler.pdf",
    },
  },
  Optimizer: {
    type: "Optimizer",
    color: "#FFC300",
    title: "Curious Optimizer",
    description: "You're eager for efficiency, just need the right roadmap.",
    nextSteps: [
      "Pinpoint bottlenecks with a workflow audit",
      "Experiment with AI tools for screening, messaging, and scheduling",
    ],
    leadMagnet: {
      title: "AI Automation Toolkit for Recruiters",
      description: "Comprehensive guide to AI tools and automation strategies",
      url: "/downloads/optimizer.pdf",
    },
  },
  Scaler: {
    type: "Scaler",
    color: "#28A745",
    title: "Systems Scaler",
    description: "You're ready to build a recruiting machine powered by AI.",
    nextSteps: [
      "Map out end-to-end automations (sourcing, outreach, CRM)",
      "Build a 'talent funnel' with AI-powered content",
    ],
    leadMagnet: {
      title: "Advanced AI Recruiting Playbook",
      description:
        "Strategic guide to building an AI-powered recruitment system",
      url: "/downloads/scaler.pdf",
    },
  },
};
