"use client";

import React from "react";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

const fractionalCFOData = {
  industry: {
    name: "Fractional CFOs",
    heroTitle:
      "<span class='underline'>Self-scale leads</span> with AI powered funnels for <span class='underline'>fractional CFOs</span>.",
    heroSubtitle: "Like having a full finance team at your fingertips",
    description:
      "Our AI-powered platform helps fractional CFOs save time and improve financial results by automating financial analysis and client management.",
    heroImage: "/images/hero.png",
    painPoints: [
      {
        title: "Time-Consuming Financial Analysis",
        description:
          "Manual financial analysis and reporting takes hours and is prone to errors.",
      },
      {
        title: "Missed Opportunities",
        description:
          "Valuable financial insights get overlooked due to overwhelming workload.",
      },
      {
        title: "Inconsistent Reporting",
        description:
          "Different clients receive different levels of analysis and reporting.",
      },
    ],
    solutions: [
      {
        title: "Automated Financial Analysis",
        description:
          "Our AI instantly analyzes financial data and generates insights across all clients.",
        icon: "/icons/screening.svg",
      },
      {
        title: "Standardized Reporting",
        description:
          "AI-powered reporting maintains consistent quality across all clients.",
        icon: "/icons/bias-free.svg",
      },
      {
        title: "Smart Client Management",
        description:
          "Advanced algorithms prioritize tasks and optimize client engagement.",
        icon: "/icons/matching.svg",
      },
    ],
    integrations: {
      title: "Seamless Integration",
      description: "Works with your existing financial tools",
      tools: [
        "QuickBooks",
        "Xero",
        "NetSuite",
        "Sage",
        "Microsoft Dynamics",
        "FreshBooks",
        "Wave",
        "Zoho Books",
        "Bill.com",
        "Expensify",
        "Stripe",
        "Plaid",
        "Gusto",
        "ADP",
        "Paychex",
        "Zapier",
        "Slack",
        "Notion",
        "Asana",
        "Trello",
      ],
    },
    cta: {
      title: "Ready to Transform Your Financial Advisory Process?",
      description:
        "Start analyzing financial data faster and more effectively today.",
      buttonText: "Get Started",
    },
  },
};

const FractionalCFOPage = () => {
  return <IndustryPageTemplate {...fractionalCFOData} />;
};

export default FractionalCFOPage;
