"use client";

import React from "react";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

const CoachesPage = () => {
  const industryData = {
    name: "Coaches",
    description: "AI-powered automation for coaches and coaching businesses",
    heroTitle: "Scale Your Coaching Business with AI",
    heroSubtitle:
      "Automate client management, scheduling, and content creation while focusing on what matters most - your clients. Achieve 2-6x ROI on your automation investment.",
    heroImage: "/images/coaches-hero.jpg",
    painPoints: [
      {
        title: "Time-Intensive Scaling",
        description:
          "Struggling to scale beyond 1:1 coaching while maintaining personal touch",
      },
      {
        title: "High Customer Acquisition Cost",
        description: "Spending $1,000+ to acquire each new client",
      },
      {
        title: "Manual Client Management",
        description: "Overwhelmed with client communication and follow-ups",
      },
      {
        title: "Content Creation Bottlenecks",
        description:
          "Struggling to create consistent, engaging content at scale",
      },
      {
        title: "Program Delivery Complexity",
        description: "Manual distribution of coaching materials and resources",
      },
      {
        title: "Progress Tracking Overhead",
        description:
          "Difficulty monitoring client progress and outcomes efficiently",
      },
    ],
    solutions: [
      {
        title: "AI-Powered Client Onboarding",
        description:
          "Automated client intake, scheduling, and personalized welcome sequences",
        icon: "/images/client-onboarding.png",
      },
      {
        title: "Smart Content Multiplier",
        description:
          "AI-assisted content creation and repurposing across platforms",
        icon: "/images/content-multiplier.png",
      },
      {
        title: "Automated Payment Collection",
        description: "Streamlined invoicing and payment follow-up systems",
        icon: "/images/payment-automation.png",
      },
      {
        title: "Community Management AI",
        description: "Automated community engagement and member support",
        icon: "/images/community-management.png",
      },
      {
        title: "Lead Nurturing Automation",
        description: "Personalized follow-ups and engagement sequences",
        icon: "/images/lead-nurturing.png",
      },
      {
        title: "AI Coach Assistant",
        description: "FAQ chatbot trained on your content and expertise",
        icon: "/images/ai-coach.png",
      },
    ],
    testimonials: [
      {
        quote:
          "Ghost Team has helped me scale my coaching business by 300% while maintaining the personal touch my clients love. The automated systems have given me back 15 hours per week to focus on high-value activities.",
        author: "Emily Rodriguez",
        role: "Executive Coach",
        company: "Leadership Growth Co.",
      },
      {
        quote:
          "The automated scheduling and follow-up system has transformed how I manage my coaching practice. I've been able to take on 50% more clients without increasing my working hours.",
        author: "David Thompson",
        role: "Life Coach",
        company: "Transformative Coaching",
      },
    ],
    roiCalculator: {
      title: "Calculate Your Potential ROI",
      description: "See how much you could save with AI automation",
      calculator: {
        timeSaved: "15-20 hours per week",
        costReduction: "30-40% reduction in operational costs",
        revenueIncrease: "2-6x return on automation investment",
      },
    },
    integrations: {
      title: "Seamless Integration with Your Tools",
      description: "Works with your existing tech stack",
      tools: [
        "Calendly",
        "Stripe",
        "Zoom",
        "Slack",
        "Notion",
        "Google Workspace",
        "Mailchimp",
        "ClickUp",
        "Discord",
        "WhatsApp",
        "LinkedIn",
        "Instagram",
      ],
    },
    cta: {
      title: "Ready to Scale Your Coaching Business?",
      description:
        "Join successful coaches who are using AI to grow their impact and income. Schedule a demo to see how we can help you automate your coaching business.",
      buttonText: "Schedule a Demo",
    },
  };

  return <IndustryPageTemplate industry={industryData} />;
};

export default CoachesPage;
