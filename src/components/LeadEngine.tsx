import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface StepProps {
  title: string;
  description: string;
  icon: string;
  number: number;
}

const steps: StepProps[] = [
  {
    title: "Targeted Outreach Surge",
    description:
      "AI-driven, multi-touch campaigns (LinkedIn, email, SMS, whatsapp) reach decision-makers with value-packed messages that cut through noise.",
    icon: "/images/seo.png",
    number: 1,
  },
  {
    title: "Authority Magnet",
    description:
      "Insightful content and lead magnets position you as the go-to partner and capture contact details on autopilot.",
    icon: "/images/saleslead.png",
    number: 2,
  },
  {
    title: "Smart Qualify & Book",
    description:
      "Dynamic form + instant lead-scoring route high-intent prospects straight to your calendar.",
    icon: "/images/socialmedia.png",
    number: 3,
  },
  {
    title: "Show-Up & Nurture",
    description:
      "Automated reminders slash no-shows; light nurture keeps 'not-yet' leads warm until they're ready.",
    icon: "/images/webscraping.png",
    number: 4,
  },
  {
    title: "You Close, Revenue Grows",
    description:
      "Each call lands in your recruiters' calendars pre-qualified and primed—so they can do what they do best: seal the deal.",
    icon: "/images/ads.png",
    number: 5,
  },
];

const LeadEngine: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            We Build an AI Lead Engine That Fills Your Calendar with
            Ready-to-Close Calls.
          </h2>
          <div className="space-y-6 text-lg text-gray-600">
            <p>
              We blend precision outreach with authority-building
              content—delivered in the channels your buyers already trust. Our
              tech pinpoints ideal prospects, warms them up, books the call, and
              chases the no-shows—so your team can focus on closing.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            How the Self-Scaling Growth Engine Works
          </h3>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {steps.map((step) => (
              <Card
                key={step.number}
                className="flex-1 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="p-6 relative">
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-center">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-center">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadEngine;
