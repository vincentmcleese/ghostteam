"use client";

import React from "react";
import HeroVisual from "./HeroVisual";
import CallToActionButton from "../ui/CallToActionButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1.5px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Reduced top padding on mobile */}
      <div className="container mx-auto px-6 pt-12 pb-24 md:px-4 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          <div className="flex-1 space-y-6 order-last md:order-none">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="underline decoration-primary decoration-4 underline-offset-4">
                Subscribe
              </span>{" "}
              to your full-stack{" "}
              <span className="underline decoration-primary decoration-4 underline-offset-4">
                growth
              </span>{" "}
              team
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              A full marketing team at your fingertips for a fraction of the
              cost. Discover the power of agentic powered growth.
            </p>
            {/* Stack buttons vertically on mobile, horizontally on md+ */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Wrapper for CallToAction to control width */}
              <div className="w-full md:w-auto">
                <CallToActionButton />
              </div>
              {/* Apply width directly to the standard Button */}
              <Button variant="outline" asChild className="w-full md:w-auto">
                <Link
                  href="https://x.com/elliot_garreffa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about agentic growth
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-auto order-first md:order-none">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
