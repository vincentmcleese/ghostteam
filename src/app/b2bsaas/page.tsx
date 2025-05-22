"use client";

import React from "react";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

const b2bSaasData = {
  industry: {
    name: "B2B SaaS",
    heroTitle:
      "<span class='underline'>200% more inbound leads</span> with AI powered funnels for <span class='underline'>SaaS</span>.",
    heroSubtitle: "Like having a full growth team at your fingertips",
    description:
      "Our AI-powered platform helps B2B SaaS companies generate more qualified leads and accelerate sales cycles through intelligent automation.",
    heroImage: "/images/hero.png",
    painPoints: [
      {
        title: "Long Sales Cycles",
        description:
          "Complex B2B sales processes taking months to close, with multiple stakeholders involved.",
      },
      {
        title: "Lead Quality Issues",
        description:
          "Struggling to identify and prioritize high-intent prospects from your pipeline.",
      },
      {
        title: "Resource-Intensive Demo Process",
        description:
          "Manual scheduling, qualification, and follow-up consuming sales team bandwidth.",
      },
      {
        title: "Content Personalization",
        description:
          "Difficulty creating targeted content for different buyer personas and stages.",
      },
      {
        title: "Pipeline Velocity",
        description:
          "Deals getting stuck in pipeline stages due to manual follow-up processes.",
      },
    ],
    solutions: [
      {
        title: "Intelligent Lead Scoring",
        description:
          "AI analyzes prospect behavior and engagement to prioritize high-intent leads.",
        icon: "/icons/scoring.svg",
      },
      {
        title: "Automated Multi-Channel Outreach",
        description:
          "Personalized sequences across email, LinkedIn, and other channels to nurture prospects.",
        icon: "/icons/outreach.svg",
      },
      {
        title: "Smart Demo Scheduling",
        description:
          "Automated qualification and scheduling system to optimize sales team time.",
        icon: "/icons/demo.svg",
      },
    ],
    integrations: {
      title: "Works With Your Tech Stack",
      description: "Seamlessly integrates with your favorite B2B SaaS tools",
      tools: [
        "HubSpot",
        "Salesforce",
        "Outreach",
        "SalesLoft",
        "LinkedIn Sales Navigator",
        "Zoom",
        "Calendly",
        "Slack",
        "Notion",
        "Asana",
        "Intercom",
        "Drift",
        "Segment",
        "Zapier",
        "Clearbit",
        "ZoomInfo",
        "Apollo",
        "6sense",
      ],
    },
    cta: {
      title: "Ready to Accelerate Your Sales Pipeline?",
      description:
        "Start converting more leads into demos and demos into deals.",
      buttonText: "Get Started",
    },
  },
};

const B2BSaaSPage = () => {
  return <IndustryPageTemplate {...b2bSaasData} />;
};

export default B2BSaaSPage;
