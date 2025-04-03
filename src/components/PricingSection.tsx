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

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  popular?: boolean;
}

const PricingSection = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$200",
      description:
        "Perfect for small teams just getting started with automation.",
      features: [
        "1 workflow automation",
        "Standard support",
        "Up to 100 runs per month",
        "Basic analytics",
        "Email integration",
      ],
      buttonText: "Get Started",
      buttonLink: "#book-call",
    },
    {
      name: "Pro",
      price: "$500",
      description: "Designed for growing teams with multiple automation needs.",
      features: [
        "3 workflow automations",
        "Priority support",
        "Up to 500 runs per month",
        "Advanced analytics",
        "Email + Slack integration",
        "Custom triggers",
      ],
      buttonText: "Book a Call",
      buttonLink: "#book-call",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with complex automation requirements.",
      features: [
        "Unlimited workflow automations",
        "Dedicated support",
        "Unlimited runs",
        "Custom analytics dashboard",
        "Full API access",
        "Custom integrations",
        "SLA guarantees",
      ],
      buttonText: "Contact Us",
      buttonLink: "#book-call",
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transparent Pricing for Every Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your automation needs. All plans include
            a 7-day satisfaction guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`flex flex-col h-full border-2 ${
                tier.popular
                  ? "border-primary shadow-lg relative"
                  : "border-gray-200"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && (
                    <span className="text-gray-500 ml-2">/month</span>
                  )}
                </div>
                <CardDescription className="mt-4">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    tier.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                  size="lg"
                  asChild
                >
                  <Link href={tier.buttonLink}>{tier.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Need a custom solution?{" "}
            <Link href="#book-call" className="text-primary font-medium">
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
