"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Companies from "@/components/Companies";
import AutomationFeatures from "@/components/AutomationFeatures";
import ComparisonSection from "@/components/ComparisonSection";
import PricingSection from "@/components/PricingSection";
import { Logo } from "@/components/ui/logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Main content starts below header (with padding applied by layout) */}
      <div className="w-full">
        <Hero />
        <Companies />
        <HowItWorks />
        <AutomationFeatures />
        <ComparisonSection />
        <PricingSection />

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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to automate your workflows?
            </h2>
            <p className="text-xl mb-6 max-w-2xl">
              Book a call with our team to discuss how we can automate your
              business processes and save you time.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold text-black"
              asChild
            >
              <Link
                href="https://kufzvnot.forms.app/ghostteam"
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
}
