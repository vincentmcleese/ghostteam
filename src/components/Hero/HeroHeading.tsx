"use client";

import React from "react";

interface HeroHeadingProps {
  firstLine: string;
  brandName: string;
  tagline: string;
  className?: string;
}

const HeroHeading = ({
  firstLine,
  brandName,
  tagline,
  className = "",
}: HeroHeadingProps) => {
  return (
    <>
      {/* Desktop Heading - Only visible on desktop */}
      <div className={`hidden md:block ${className}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-wide mb-6 uppercase">
          <div className="whitespace-nowrap">
            <span>{firstLine}</span>
          </div>
          <div className="font-[Chunko] tracking-wide whitespace-nowrap text-5xl sm:text-6xl md:text-7xl mt-6">
            <span className="text-primary">{brandName}</span>
            <br />
            <span className="text-[#59c380]">{tagline}</span>
          </div>
        </h1>
      </div>

      {/* Mobile Heading - Only visible on mobile */}
      <div className="md:hidden">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-wide mb-6 uppercase text-center">
          <div className="whitespace-nowrap">
            <span>{firstLine}</span>
          </div>
          <div className="font-[Chunko] tracking-wide text-3xl sm:text-5xl whitespace-nowrap mt-5">
            <span className="text-primary">{brandName}</span>
            <br />
            <span className="text-[#59c380]">{tagline}</span>
          </div>
        </h1>
      </div>
    </>
  );
};

export default HeroHeading;
