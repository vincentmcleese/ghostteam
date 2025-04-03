"use client";

import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";

interface Department {
  title: string;
  imageSrc: string;
  tasks: string[];
}

const AutomationFeatures = () => {
  const departments: Department[] = [
    {
      title: "Operations",
      imageSrc: "/images/operations.png",
      tasks: [
        "Project management automation",
        "Document processing & workflow",
        "Inventory management systems",
        "Process documentation",
        "Team coordination & task routing",
      ],
    },
    {
      title: "Sales",
      imageSrc: "/images/sales.png",
      tasks: [
        "Lead qualification & prioritization",
        "CRM updates & maintenance",
        "Automated follow-up sequences",
        "Sales call summaries & action items",
        "Proposal & contract generation",
      ],
    },
    {
      title: "Marketing",
      imageSrc: "/images/marketing.png",
      tasks: [
        "Content creation & distribution",
        "Social media management",
        "Email campaign automation",
        "Performance reporting & analytics",
        "Competitor research & monitoring",
      ],
    },
    {
      title: "Finance",
      imageSrc: "/images/finance.png",
      tasks: [
        "Invoice processing & reconciliation",
        "Expense report automation",
        "Financial data visualization",
        "Budget tracking & forecasting",
        "Accounts payable/receivable workflows",
      ],
    },
    {
      title: "Research",
      imageSrc: "/images/research.png",
      tasks: [
        "Market & industry analysis",
        "Data collection & synthesis",
        "Literature review & summarization",
        "Survey creation & distribution",
        "Trend identification & reporting",
      ],
    },
    {
      title: "Customer Support",
      imageSrc: "/images/customersupport.png",
      tasks: [
        "Ticket triage & routing",
        "Automated response generation",
        "Knowledge base maintenance",
        "Customer satisfaction tracking",
        "Support analytics & insights",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Your GhostTeam
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            AI-powered specialists that work behind the scenes to automate your
            most time-consuming tasks. Each ghost is designed to handle specific
            functions across your organization:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gray-50 rounded-full p-3 mr-4">
                  <Image
                    src={department.imageSrc}
                    alt={`${department.title} Icon`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {department.title} Ghost
                </h3>
              </div>

              <ul className="space-y-3 flex-grow">
                {department.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-[#59c380] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutomationFeatures;
