"use client";

import React from "react";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

const RecruitersPage = () => {
  const industryData = {
    name: "Recruiters",
    description: "AI-powered automation for recruitment and staffing agencies",
    heroTitle: "Transform Your Recruitment Process with AI",
    heroSubtitle:
      "Automate candidate sourcing, screening, and engagement while reducing time-to-hire by 50%. Achieve 3-7x ROI on your automation investment.",
    heroImage: "/images/recruiters-hero.jpg",
    painPoints: [
      {
        title: "High Volume Communication",
        description: "Overwhelmed with candidate outreach and follow-ups",
      },
      {
        title: "Inefficient Screening",
        description:
          "Time-consuming manual resume screening and candidate evaluation",
      },
      {
        title: "Scheduling Bottlenecks",
        description:
          "Complex interview coordination across multiple stakeholders",
      },
      {
        title: "Candidate Engagement",
        description:
          "Difficulty maintaining consistent communication with candidates",
      },
      {
        title: "Data Management",
        description: "Manual entry and tracking of candidate information",
      },
      {
        title: "Compliance Challenges",
        description: "Ensuring consistent documentation and compliance",
      },
    ],
    solutions: [
      {
        title: "Automated Candidate Pipeline",
        description: "AI-powered sourcing and screening of candidates",
        icon: "/images/candidate-pipeline.png",
      },
      {
        title: "Smart Outreach System",
        description: "Personalized, automated candidate communication",
        icon: "/images/smart-outreach.png",
      },
      {
        title: "Interview Scheduling AI",
        description: "Automated interview coordination and calendar management",
        icon: "/images/interview-scheduling.png",
      },
      {
        title: "Candidate Engagement Bot",
        description: "24/7 automated candidate support and updates",
        icon: "/images/engagement-bot.png",
      },
      {
        title: "Data Automation",
        description: "Automated data entry and tracking systems",
        icon: "/images/data-automation.png",
      },
      {
        title: "Compliance Automation",
        description: "Automated documentation and compliance tracking",
        icon: "/images/compliance-automation.png",
      },
    ],
    testimonials: [
      {
        quote:
          "Ghost Team's automation has reduced our time-to-hire by 60% and increased our placement rate by 40%. The AI-powered screening system has been a game-changer for our team.",
        author: "Sarah Johnson",
        role: "Recruitment Director",
        company: "TechTalent Solutions",
      },
      {
        quote:
          "We've been able to handle 3x more candidates with the same team size thanks to the automated systems. The ROI has been incredible.",
        author: "Michael Chen",
        role: "Founder",
        company: "Elite Staffing Partners",
      },
    ],
    roiCalculator: {
      title: "Calculate Your Potential ROI",
      description: "See how much you could save with AI automation",
      calculator: {
        timeSaved: "20-25 hours per week",
        costReduction: "40-50% reduction in operational costs",
        revenueIncrease: "3-7x return on automation investment",
      },
    },
    integrations: {
      title: "Seamless Integration with Your Tools",
      description: "Works with your existing tech stack",
      tools: [
        "LinkedIn Recruiter",
        "Greenhouse",
        "Lever",
        "Workday",
        "Bullhorn",
        "Jobvite",
        "Calendly",
        "Zoom",
        "Slack",
        "Microsoft Teams",
        "Google Workspace",
        "Outlook",
      ],
    },
    cta: {
      title: "Ready to Transform Your Recruitment Process?",
      description:
        "Join leading recruitment agencies who are using AI to streamline their operations and increase placements. Schedule a demo to see how we can help you automate your recruitment process.",
      buttonText: "Schedule a Demo",
    },
  };

  return <IndustryPageTemplate industry={industryData} />;
};

export default RecruitersPage;
