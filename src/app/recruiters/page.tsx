"use client";

import React from "react";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

const recruitersData = {
  industry: {
    name: "Recruiters",
    heroTitle:
      "<span class='underline'>Self-scale leads</span> with AI powered funnels for <span class='underline'>recruiters</span>.",
    heroSubtitle: "Like having a full growth team at your fingertips",
    description:
      "Our AI-powered platform helps recruiters save time and improve hiring quality by automating candidate screening and matching.",
    heroImage: "/images/hero.png",
    painPoints: [
      {
        title: "Time-Consuming Screening",
        description:
          "Manual resume screening takes hours and is prone to human bias.",
      },
      {
        title: "Missed Opportunities",
        description:
          "Great candidates get overlooked due to overwhelming applicant volume.",
      },
      {
        title: "Inconsistent Evaluation",
        description:
          "Different recruiters evaluate candidates differently, leading to inconsistent hiring decisions.",
      },
    ],
    solutions: [
      {
        title: "Automated Screening",
        description:
          "Our AI instantly screens resumes and matches candidates to job requirements.",
        icon: "/icons/screening.svg",
      },
      {
        title: "Bias-Free Evaluation",
        description:
          "AI-powered evaluation removes unconscious bias from the screening process.",
        icon: "/icons/bias-free.svg",
      },
      {
        title: "Smart Matching",
        description:
          "Advanced algorithms match candidates to roles based on skills, experience, and culture fit.",
        icon: "/icons/matching.svg",
      },
    ],
    integrations: {
      title: "Seamless Integration",
      description: "Works with your existing ATS and HR tools",
      tools: [
        "Sourcewhale",
        "LinkedIn Recruiter",
        "Bullhorn",
        "Workable",
        "Greenhouse",
        "Lever",
        "JobAdder",
        "Recruitee",
        "Teamtailor",
        "Recruiterflow",
        "Recruiterbox",
        "SmartRecruiters",
        "Zoho Recruit",
        "Recruiter.com",
        "RecruiterCRM",
        "Recruiterly",
        "Workday",
        "BambooHR",
      ],
    },
    cta: {
      title: "Ready to Transform Your Hiring Process?",
      description:
        "Start screening candidates faster and more effectively today.",
      buttonText: "Get Started",
    },
  },
};

const RecruitersPage = () => {
  return <IndustryPageTemplate {...recruitersData} />;
};

export default RecruitersPage;
