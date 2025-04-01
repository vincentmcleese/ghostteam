"use client";

import React from "react";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
import styles from "@/app/styles.module.css";

interface HeroVisualProps {
  statsImageSrc: string;
  videoSrc: string;
  fallbackImageSrc: string;
  className?: string;
}

const HeroVisual = ({
  statsImageSrc,
  videoSrc,
  fallbackImageSrc,
  className = "",
}: HeroVisualProps) => {
  return (
    <div
      className={`md:flex-1 mt-8 md:mt-0 flex justify-center md:justify-end ${className}`}
    >
      <div
        style={{ margin: "16px", padding: "4px" }}
        className="w-full max-w-[700px] shadow-xl overflow-hidden relative rounded-xl"
      >
        {/* Container with gradient background */}
        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
          {/* Custom gradient background */}
          <div className={styles.background}></div>

          {/* Container for content with balanced margins */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="flex flex-col items-center gap-4 p-4">
              {/* Dashboard stats image */}
              <div className="w-full max-w-[650px] rounded-md overflow-hidden shadow-lg">
                <Image
                  src={statsImageSrc}
                  alt="Dashboard Statistics"
                  width={1854}
                  height={252}
                  className="w-full object-contain rounded-md"
                  quality={100}
                  priority
                  unoptimized
                />
              </div>

              {/* Video container */}
              <div className="w-full max-w-[650px]">
                <VideoPlayer
                  videoSrc={videoSrc}
                  fallbackImageSrc={fallbackImageSrc}
                  width={1736}
                  height={1488}
                  alt="AI Automation Visualization"
                />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl z-40"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/10 rounded-full blur-xl z-40"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
