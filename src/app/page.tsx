"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Companies from "@/components/Companies";
import AutomationFeatures from "@/components/AutomationFeatures";
import PricingSection from "@/components/PricingSection";
import { Logo } from "@/components/ui/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />

      {/* Main content starts below header (with padding for fixed header) */}
      <div className="w-full pt-16">
        <Hero />
        <Companies />
        <HowItWorks />
        <AutomationFeatures />
        <PricingSection />

        {/* CTA Section */}
        <section
          className="py-20 bg-primary text-primary-foreground"
          id="book-call"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to automate your workflows?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book a call with our team to discuss how we can automate your
              business processes and save you time.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold"
              asChild
            >
              <Link
                href="https://calendar.app.google/fgShTwvhRPzf9VKZ6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Call
              </Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <Logo
                  size="medium"
                  textDirection="vertical"
                  className="text-gray-900"
                />
                <p className="text-gray-600 mt-2">
                  Empowering human genius with automation
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
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
}
