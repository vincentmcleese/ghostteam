"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

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
    testimonials: {
      quote: string;
      author: string;
      role: string;
      company: string;
    }[];
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
    roiCalculator?: {
      title: string;
      description: string;
      calculator: {
        timeSaved: string;
        costReduction: string;
        revenueIncrease: string;
      };
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
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {industry.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                {industry.heroSubtitle}
              </p>
              <Button size="lg" asChild>
                <Link
                  href="https://kufzvnot.forms.app/ghostteam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {industry.cta.buttonText}
                </Link>
              </Button>
            </div>
            <div className="flex-1">
              <Image
                src={industry.heroImage}
                alt={`${industry.name} automation`}
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Challenges in {industry.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.painPoints.map((point, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Ghost Team Solves These Challenges
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.solutions.map((solution, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={solution.icon}
                      alt={solution.title}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                    <h3 className="text-xl font-semibold">{solution.title}</h3>
                  </div>
                  <p className="text-gray-600">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      {industry.roiCalculator && (
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              {industry.roiCalculator.title}
            </h2>
            <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
              {industry.roiCalculator.description}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 bg-white/10">
                <CardContent>
                  <h3 className="text-2xl font-bold mb-2">Time Saved</h3>
                  <p className="text-lg">
                    {industry.roiCalculator.calculator.timeSaved}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/10">
                <CardContent>
                  <h3 className="text-2xl font-bold mb-2">Cost Reduction</h3>
                  <p className="text-lg">
                    {industry.roiCalculator.calculator.costReduction}
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 bg-white/10">
                <CardContent>
                  <h3 className="text-2xl font-bold mb-2">Revenue Impact</h3>
                  <p className="text-lg">
                    {industry.roiCalculator.calculator.revenueIncrease}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories from {industry.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {industry.testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <blockquote className="text-lg italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="text-gray-600">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p>{testimonial.role}</p>
                    <p>{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      {industry.integrations && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              {industry.integrations.title}
            </h2>
            <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
              {industry.integrations.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {industry.integrations.tools.map((tool, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="flex items-center justify-center h-20">
                    <p className="text-center font-medium">{tool}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{industry.cta.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {industry.cta.description}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100"
            asChild
          >
            <Link
              href="https://kufzvnot.forms.app/ghostteam"
              target="_blank"
              rel="noopener noreferrer"
            >
              {industry.cta.buttonText}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default IndustryPageTemplate;
