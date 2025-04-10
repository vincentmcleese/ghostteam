"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  icon: React.ReactNode;
  name: string;
  description: string;
  price: string;
  features: PlanFeature[];
  ctaText: string;
  borderColor?: string;
  popular?: boolean;
}

const PricingSection = () => {
  const plans: PricingPlan[] = [
    {
      icon: (
        <Image
          src="/images/ghost_white_transparent.png"
          alt="Ghost Logo White"
          width={64}
          height={64}
          className="object-contain"
        />
      ),
      name: "Rapid Growth Team",
      description: "Essential automations to kickstart growth.",
      price: "$5,000",
      features: [
        { text: "10 automations" },
        { text: "1 dedicated automation specialist" },
        { text: "Custom AI agents built for your workflows" },
        { text: "Dashboard access (track all automations)" },
        { text: "No contract, cancel any time" },
      ],
      ctaText: "Get Started",
      borderColor: "border-muted-foreground",
    },
    {
      icon: (
        <Image
          src="/images/greenghost.png"
          alt="Green Ghost"
          width={64}
          height={64}
          className="object-contain"
        />
      ),
      name: "Full Service Growth Team",
      description: "Comprehensive automation and strategic support.",
      price: "$7,000",
      features: [
        { text: "Unlimited agent & automation requests/month" },
        { text: "1 dedicated automation specialist" },
        { text: "Custom AI agents built for your workflows" },
        { text: "Priority development & implementation" },
        { text: "Weekly 45-min strategy call" },
        { text: "Custom analytics & reporting" },
        { text: "Slack support" },
        { text: "Dashboard access (track all automations)" },
        { text: "No contract, cancel any time" },
      ],
      ctaText: "Book a Strategy Call",
      borderColor: "border-primary",
      popular: true,
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Growth Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your automation needs and growth
            goals. Both plans offer flexible, no-contract terms.
          </p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative flex flex-col border-2 ${
                plan.borderColor || "border-border"
              } shadow-lg w-full md:w-1/2`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full whitespace-nowrap">
                    Limited Spots Available
                  </span>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div
                      className={`w-16 h-16 rounded-lg border-2 ${
                        plan.borderColor || "border-border"
                      } flex items-center justify-center`}
                    >
                      {plan.icon}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-1">{plan.name}</CardTitle>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check
                        className={`h-5 w-5 ${
                          plan.borderColor === "border-primary"
                            ? "text-primary"
                            : "text-muted-foreground"
                        } mr-2 flex-shrink-0 mt-0.5`}
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.borderColor === "border-primary"
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-black hover:bg-gray-800 text-white"
                  }`}
                  size="lg"
                  asChild
                >
                  <Link
                    href="https://calendar.app.google/fgShTwvhRPzf9VKZ6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.ctaText}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Questions about our service?{" "}
            <Link
              href="https://calendar.app.google/fgShTwvhRPzf9VKZ6"
              className="text-primary font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a call
            </Link>{" "}
            to learn more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
