"use client";

import React from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";

const ComparisonSection = () => {
  const ghostAdvantages = [
    {
      title: "Qualified Marketing Leads",
      description:
        "High-intent prospects engage with your content and convert.",
    },
    {
      title: "More Conversions, Higher Revenue",
      description:
        "Automated nurturing drives consistent sales without the hustle.",
    },
    {
      title: "Marketers Creating, Not Managing",
      description:
        "Your team focuses on strategy and creativity, not endless content creation.",
    },
    {
      title: "24/7 Content Engine",
      description:
        "Always-on content creation keeps your pipeline full—even while you sleep.",
    },
  ];

  const humanLimitations = [
    {
      title: "Cold, Low-Intent Audiences",
      description: "Content falls flat—or gets lost in the noise.",
    },
    {
      title: "Hours Lost to Manual Creation",
      description: "Team burns time creating content instead of strategizing.",
    },
    {
      title: "Empty Content Calendar",
      description: "Struggling to maintain consistent content across channels.",
    },
    {
      title: "Stop-Start Growth",
      description:
        "Content pipeline stalls whenever the team is off the clock.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="font-[Chunko] tracking-wide">GHOST TEAM</span> vs.
          The Grind
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Ghost Team Side */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-4">
                {[
                  "/images/saleslead.png",
                  "/images/ads.png",
                  "/images/socialmedia.png",
                  "/images/seo.png",
                ].map((src, index) => (
                  <div
                    key={index}
                    className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-white"
                  >
                    <Image
                      src={src}
                      alt="Ghost Team Member"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-bold">Ghost Team</h3>
            </div>

            <div className="space-y-6">
              {ghostAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#9dff87] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{advantage.title}</h4>
                    <p className="text-gray-600 text-sm">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traditional Team Member Side */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Additional Team Member</h3>
            </div>

            <div className="space-y-6">
              {humanLimitations.map((limitation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{limitation.title}</h4>
                    <p className="text-gray-600 text-sm">
                      {limitation.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
