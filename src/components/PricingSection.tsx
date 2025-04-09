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
  popular?: boolean;
}

const PricingSection = () => {
  const plans: PricingPlan[] = [
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
      description: "Comprehensive growth and automation services",
      price: "$5,000",
      features: [
        {
          text: "Unlimited agent & automation requests/month",
        },
        {
          text: "1 dedicated automation specialist",
        },
        {
          text: "Custom AI agents built for your workflows",
        },
        {
          text: "Priority development & implementation",
        },
        {
          text: "Weekly 45-min strategy call",
        },
        {
          text: "Custom analytics & reporting",
        },
        {
          text: "Slack support",
        },
        {
          text: "Dashboard access (track all automations)",
        },
        {
          text: "No contract, cancel any time",
        },
      ],
      ctaText: "Apply Now (2/4 spots filled)",
      popular: true,
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Limited Availability
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We only work with 4 clients at a time to ensure the highest quality
            service and attention. Currently accepting applications for 2
            remaining spots.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="border-2 border-primary shadow-lg relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white text-sm font-bold py-1 px-4 rounded-full">
                  2 Spots Remaining
                </span>
              </div>

              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-16 h-16 rounded-lg border-2 border-primary flex items-center justify-center">
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

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-black"
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
