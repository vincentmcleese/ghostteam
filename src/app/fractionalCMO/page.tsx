"use client";

import React from "react";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

const fractionalCMOData = {
  industry: {
    name: "Fractional CMOs",
    heroTitle:
      "<span class='underline'>Self-scale leads</span> with AI powered funnels for <span class='underline'>fractional CMOs</span>.",
    heroSubtitle: "Like having a full growth team at your fingertips",
    description:
      "Our AI-powered platform helps fractional CMOs save time and improve marketing results by automating content creation and campaign management.",
    heroImage: "/images/hero.png",
    painPoints: [
      {
        title: "Time-Consuming Content Creation",
        description:
          "Manual content creation takes hours and is prone to inconsistency.",
      },
      {
        title: "Missed Opportunities",
        description:
          "Great marketing opportunities get overlooked due to overwhelming workload.",
      },
      {
        title: "Inconsistent Brand Voice",
        description:
          "Different team members create content differently, leading to inconsistent brand messaging.",
      },
    ],
    solutions: [
      {
        title: "Automated Content Creation",
        description:
          "Our AI instantly creates and optimizes content across all channels.",
        icon: "/icons/screening.svg",
      },
      {
        title: "Brand Voice Consistency",
        description:
          "AI-powered content maintains consistent brand voice across all channels.",
        icon: "/icons/bias-free.svg",
      },
      {
        title: "Smart Campaign Management",
        description:
          "Advanced algorithms optimize campaigns based on performance data.",
        icon: "/icons/matching.svg",
      },
    ],
    integrations: {
      title: "Seamless Integration",
      description: "Works with your existing marketing tools",
      tools: [
        "HubSpot",
        "Mailchimp",
        "Google Analytics",
        "Google Ads",
        "Meta Ads",
        "LinkedIn Ads",
        "Twitter Ads",
        "Buffer",
        "Hootsuite",
        "Canva",
        "WordPress",
        "Shopify",
        "WooCommerce",
        "Zapier",
        "Slack",
        "Notion",
        "Asana",
        "Trello",
      ],
    },
    cta: {
      title: "Ready to Transform Your Marketing Process?",
      description: "Start creating content faster and more effectively today.",
      buttonText: "Get Started",
    },
  },
};

const FractionalCMOPage = () => {
  return <IndustryPageTemplate {...fractionalCMOData} />;
};

export default FractionalCMOPage;
