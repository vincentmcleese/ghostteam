"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

const AutomationFeatures = () => {
  const features: Feature[] = [
    {
      title: "Email & Outreach Automation",
      description:
        "Automate follow-ups, newsletters, and personalized outreach campaigns that feel human.",
    },
    {
      title: "Data Processing & Analysis",
      description:
        "Transform messy data into actionable insights with automated cleaning, analysis, and visualization.",
    },
    {
      title: "Content Creation & Distribution",
      description:
        "Generate and distribute content across multiple platforms with AI-powered workflows.",
    },
    {
      title: "Customer Support Automation",
      description:
        "Resolve common issues automatically and route complex ones to the right team members.",
    },
    {
      title: "Social Media Management",
      description:
        "Schedule, post, and engage across platforms without manual intervention.",
    },
    {
      title: "CRM & Lead Management",
      description:
        "Capture, qualify, and nurture leads through automated sequences that convert.",
    },
    {
      title: "Reporting & Analytics",
      description:
        "Get insights delivered to your inbox with automated data collection and visualization.",
    },
    {
      title: "Document Processing",
      description:
        "Extract data from invoices, receipts, and documents and route it to the right systems.",
    },
  ];

  return (
    <section className="py-16 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What We Can Automate
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            You bring the genius. We automate the rest. Focus on what you do
            best while our AI-powered workflows handle these tasks and more:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <CheckCircle2 className="h-6 w-6 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationFeatures;
