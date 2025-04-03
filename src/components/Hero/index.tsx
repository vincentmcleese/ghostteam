"use client";

import React from "react";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

const Hero = () => {
  return (
    <section className="bg-white w-full">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Main flex container with responsive gap */}
        <div className="text-center md:text-left md:flex md:items-center md:justify-between md:gap-8">
          <HeroContent
            firstLine="YOU THINK IT."
            brandName="GHOSTTEAM"
            tagline="WILL DO IT."
            subheading={
              <>
                <strong>5x your productivity</strong> by onboarding our expert
                AI workflow designers.
              </>
            }
            ctaText="Book a Call"
            ctaLink="https://calendar.app.google/fgShTwvhRPzf9VKZ6"
          />

          <HeroVisual
            statsImageSrc="/images/dashboardstats.png"
            videoSrc="/videos/dashboard.mp4"
            fallbackImageSrc="/images/dashboard.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
