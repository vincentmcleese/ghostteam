"use client";

import React from "react";
import VideoPlayer from "./VideoPlayer"; // Assuming VideoPlayer is in the same directory or imported correctly

const HeroVisual = () => {
  return (
    <div className="flex-1 flex justify-center md:justify-end">
      {/* Applied styling from popular pricing card */}
      <div className="relative w-full max-w-lg rounded-xl overflow-hidden border-2 border-primary shadow-lg">
        <VideoPlayer
          videoSrc="/videos/demovideo.mp4"
          fallbackImageSrc="/images/dashboard.png"
          width={800} // Keep original aspect ratio if possible
          height={600}
          alt="Dashboard Preview"
        />
      </div>
    </div>
  );
};

export default HeroVisual;
