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
      title: "Sales & Lead Generation",
      imageSrc: "/images/saleslead.png",
      tasks: [
        "Lead qualification & prioritization",
        "CRM updates & maintenance",
        "Automated follow-up sequences",
        "Sales call summaries & action items",
        "Proposal & contract generation",
      ],
    },
    {
      title: "Ads",
      imageSrc: "/images/ads.png",
      tasks: [
        "PPC campaign management",
        "Ad copy generation & testing",
        "Performance optimization",
        "Budget allocation & monitoring",
        "Cross-platform ad deployment",
      ],
    },
    {
      title: "Content & Social Media",
      imageSrc: "/images/socialmedia.png",
      tasks: [
        "Content creation & distribution",
        "Social media management",
        "Email campaign automation",
        "Community engagement",
        "Content calendar planning",
      ],
    },
    {
      title: "SEO",
      imageSrc: "/images/seo.png",
      tasks: [
        "Keyword research & analysis",
        "On-page optimization",
        "Content gap identification",
        "Backlink monitoring",
        "Ranking & traffic reporting",
      ],
    },
    {
      title: "Web Scraping",
      imageSrc: "/images/webscraping.png",
      tasks: [
        "Data extraction & processing",
        "Competitor monitoring",
        "Price tracking & comparison",
        "Content aggregation",
        "Automated research gathering",
      ],
    },
    {
      title: "Analytics & Reporting",
      imageSrc: "/images/dataanalytics.png",
      tasks: [
        "Performance dashboard creation",
        "Data visualization & insights",
        "Automated report generation",
        "KPI tracking & alerting",
        "Cross-channel analytics",
      ],
    },
  ];

  return (
    <>
      <section className="py-20 relative overflow-hidden bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/greg.jpeg"
                  alt="Greg Isenberg"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:flex-1 text-left">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-6">
                &ldquo;Every business will get a &lsquo;ghost team.&rsquo;
                Automated bookkeepers, sales agents, marketers—run by one human
                and 5 bots.&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="h-1 w-16 bg-[#31DE96]"></div>
                </div>
                <cite className="text-xl font-bold text-gray-900 not-italic">
                  Greg Isenberg
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Your{" "}
              <span className="font-[Chunko] tracking-wide">GHOSTTEAM</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AI-powered specialists that work behind the scenes to automate
              your most time-consuming tasks. Each ghost is designed to handle
              specific functions across your organization:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="w-24 h-24 flex items-center justify-center">
                      <Image
                        src={department.imageSrc}
                        alt={department.title}
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {department.title} Ghost
                  </h3>
                </div>

                <ul className="space-y-3 flex-grow">
                  {department.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start">
                      <Check className="h-5 h-5 text-[#31DE96] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AutomationFeatures;
