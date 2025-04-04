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
import { Check, Zap, Rocket } from "lucide-react";
import Link from "next/link";
import { PillIcon } from "@/components/ui/pill-icon";

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
  popular?: boolean;
}

const PricingSection = () => {
  const plans: PricingPlan[] = [
    {
      icon: <Zap className="h-6 w-6 text-[#59c380]" />,
      name: "Automation Partner",
      description: "For teams who want scalable AI workflows",
      price: "$4,900",
      features: [
        {
          text: "10 agent & automation requests/month",
        },
        {
          text: "1 dedicated automation specialist",
        },
        {
          text: "Slack support",
        },
        {
          text: "Dashboard access (track all automations)",
        },
        {
          text: "Weekly 45-min strategy call",
        },
        {
          text: "No contract, cancel any time",
        },
      ],
      ctaText: "Start now",
    },
    {
      icon: <Rocket className="h-6 w-6 text-[#59c380]" />,
      name: "Fractional COO",
      description: "For high-growth businesses needing full ops leadership",
      price: "$7,900",
      features: [
        {
          text: "Everything in Automation Partner, plus:",
        },
        {
          text: "Unlimited automation requests",
        },
        {
          text: "Scaled technical team to support more development",
        },
        {
          text: "Custom AI agents (built for your unique workflows)",
        },
        {
          text: "Priority AI agent and automation development",
        },
        {
          text: "Custom analytics & reporting",
        },
      ],
      ctaText: "Start now",
      popular: true,
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent pricing. Cancel any time.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your automation needs. All plans include
            a 7-day satisfaction guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col h-full border-2 ${
                plan.popular
                  ? "border-primary shadow-lg relative"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <PillIcon
                      icon={plan.icon}
                      size="small"
                      isHighlighted={plan.popular}
                    />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                </div>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <CardDescription className="mt-4">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-800 hover:bg-gray-700"
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
            Need a custom solution?{" "}
            <Link
              href="https://calendar.app.google/fgShTwvhRPzf9VKZ6"
              className="text-primary font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact our sales team
            </Link>{" "}
            for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
