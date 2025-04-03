"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroHeading from "./HeroHeading";

interface HeroContentProps {
  firstLine: string;
  brandName: string;
  tagline: string;
  subheading: React.ReactNode;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

const HeroContent = ({
  firstLine,
  brandName,
  tagline,
  subheading,
  ctaText,
  ctaLink,
  className = "",
}: HeroContentProps) => {
  return (
    <div className={`md:flex-1 md:max-w-2xl mb-12 md:mb-0 ${className}`}>
      <HeroHeading
        firstLine={firstLine}
        brandName={brandName}
        tagline={tagline}
      />

      <p className="text-lg md:text-xl text-muted-foreground mb-8 md:max-w-2xl text-center md:text-left">
        {subheading}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start relative">
        <Button
          size="lg"
          className="w-full sm:w-auto px-8 bg-primary hover:bg-primary/90"
          asChild
        >
          <Link
            href={ctaLink}
            target={ctaLink.startsWith("http") ? "_blank" : undefined}
            rel={ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {ctaText}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroContent;
