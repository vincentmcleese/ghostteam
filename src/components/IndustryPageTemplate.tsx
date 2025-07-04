"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Companies from "@/components/Companies";
import LeadEngine from "@/components/LeadEngine";
import ComparisonSection from "@/components/ComparisonSection";
import PricingSection from "@/components/PricingSection";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/ui/logo";
import CallToActionButton from "@/components/ui/CallToActionButton";
import IntegrationLogo from "./IntegrationLogo";

interface IndustryPageTemplateProps {
  industry: {
    name: string;
    description: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    painPoints: {
      title: string;
      description: string;
    }[];
    solutions: {
      title: string;
      description: string;
      icon: string;
    }[];
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
    integrations?: {
      title: string;
      description: string;
      tools: string[];
    };
  };
}

const IndustryPageTemplate: React.FC<IndustryPageTemplateProps> = ({
  industry,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1.5px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container mx-auto px-6 pt-12 pb-24 md:px-4 md:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6">
              <div className="flex-1 space-y-6 order-last md:order-none md:max-w-[50%]">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight [&_.underline]:decoration-primary [&_.underline]:decoration-4 [&_.underline]:underline-offset-4">
                  {industry.heroTitle ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: industry.heroTitle }}
                    />
                  ) : (
                    <>
                      200% more inbound leads with AI powered funnels for{" "}
                      <span className="underline">
                        {industry.name.toLowerCase().includes("cmo")
                          ? "fractional CMOs"
                          : industry.name.toLowerCase().includes("cfo")
                            ? "fractional CFOs"
                            : industry.name.toLowerCase().includes("recruiter")
                              ? "recruiters"
                              : "businesses"}
                      </span>
                    </>
                  )}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                  {industry.heroSubtitle ||
                    "Like a full growth team working for you 24/7"}
                </p>
                <div className="w-fit">
                  <CallToActionButton />
                </div>
                <p className="text-lg text-gray-600 max-w-2xl">
                  And get your free audit funnel. See how we can double your
                  inbound leads in 90 days or less
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center order-first md:order-none">
                <div className="relative w-full">
                  <Image
                    src={industry.heroImage}
                    alt={`${industry.name} automation`}
                    width={600}
                    height={500}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
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
                  &ldquo;Every{" "}
                  {industry.name.toLowerCase().includes("cmo")
                    ? "marketer"
                    : industry.name.toLowerCase().includes("cfo")
                      ? "CFO"
                      : industry.name.toLowerCase().includes("recruiter")
                        ? "recruitment agency"
                        : "business"}{" "}
                  will get a &lsquo;ghost team.&rsquo; &mdash;run by one human
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

        {/* Result Highlight Section */}
        <section className="w-full bg-primary text-primary-foreground py-8">
          <div className="container mx-auto px-6 md:px-4">
            <p className="text-xl md:text-2xl font-medium text-center">
              Result: A steady stream of pre-qualified calls and a direct
              increase in revenue - no extra headcount required.
            </p>
          </div>
        </section>

        {/* Companies Section */}
        <Companies />

        {/* Lead Engine Section */}
        <LeadEngine />

        {/* Comparison Section */}
        <ComparisonSection />

        {/* Pricing Section */}
        {/* <PricingSection /> */}

        {/* Integrations Section */}
        {industry.integrations && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-4">
                {industry.integrations.title}
              </h2>
              <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
                {industry.integrations.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
                {industry.integrations.tools
                  .filter((tool) => {
                    // Check if the tool name is in our list of known valid logos
                    const validLogos = [
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
                      "HubSpot",
                      "Mailchimp",
                      // Added missing logos:
                      "Salesforce",
                      "Outreach",
                      "SalesLoft",
                      "LinkedIn Sales Navigator",
                      "Zoom",
                      "Calendly",
                      "Intercom",
                      "Drift",
                      "Segment",
                      "Clearbit",
                      "ZoomInfo",
                      "Apollo",
                      "6sense",
                      "Google Workspace",
                      "ClickUp",
                      "Discord",
                      "WhatsApp",
                      "LinkedIn",
                      "Instagram",
                    ];
                    return validLogos.includes(tool);
                  })
                  .map((tool, index) => (
                    <Card
                      key={index}
                      className="p-4 hover:shadow-md transition-shadow bg-white"
                    >
                      <CardContent className="flex flex-col items-center justify-center h-24 gap-2">
                        <div className="w-16 h-16 flex items-center justify-center">
                          <IntegrationLogo name={tool} size={64} />
                        </div>
                        <span className="text-xs text-center font-medium text-gray-600">
                          {tool}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section
          className="py-20 bg-primary text-primary-foreground relative"
          id="book-call"
        >
          <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6">
            <Image
              src="/images/ghost_whitest_transparent.png"
              alt="Ghost"
              width={100}
              height={100}
              className="object-contain"
            />
            <h2 className="text-4xl font-bold mb-4">{industry.cta.title}</h2>
            <p className="text-xl mb-6 max-w-2xl">{industry.cta.description}</p>
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold text-black"
              asChild
            >
              <Link href="/begin?utm_source=website">Book a Call</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 w-full md:w-auto flex flex-col items-center md:items-start">
                <Logo
                  size="medium"
                  textDirection="horizontal"
                  className="text-gray-900"
                />
                <p className="text-gray-600 mt-2 text-center md:text-left">
                  Empowering human genius with automation
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start md:items-center">
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900"
                >
                  How It Works
                </Link>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Terms
                </Link>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="text-center text-gray-500 text-sm flex items-center justify-center">
              <Logo
                size="small"
                asLink={false}
                textDirection="horizontal"
                className="text-gray-500"
              />
              <span className="ml-2">
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default IndustryPageTemplate;
