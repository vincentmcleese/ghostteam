"use client";

import React from "react";
import { Check, Clock, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WorkflowStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}

const HowItWorks = () => {
  const steps: WorkflowStep[] = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Onboard in minutes",
      description:
        "Share your needs in a 60 minute call—your first automation will be live within hours.",
      step: 1,
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Add projects",
      description:
        "Use our self-directed dashboard to request automations, track progress, or let us manage tasks for you.",
      step: 2,
    },
    {
      icon: <Check className="h-6 w-6 text-primary" />,
      title: "Weekly support",
      description:
        "Get optional 45-minute weekly consultations for strategy and updates.",
      step: 3,
    },
  ];

  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined process gets your automation projects up and running
            quickly while you focus on what matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {step.icon}
                  </div>
                </div>
                <div className="mb-2 text-sm font-medium text-primary">
                  STEP {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
