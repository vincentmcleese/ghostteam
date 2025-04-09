"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  videoSrc: string;
  fallbackImageSrc: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

const VideoPlayer = ({
  videoSrc,
  fallbackImageSrc,
  width,
  height,
  alt,
  className = "",
}: VideoPlayerProps) => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video is visible even if loading takes time
  useEffect(() => {
    console.log("Video component mounted, setting up");

    // Try to play the video manually after it's loaded
    if (videoRef.current) {
      console.log("Video ref exists, attempting to play");

      // Add more event listeners to track video state
      videoRef.current.addEventListener("loadedmetadata", () => {
        console.log("Video metadata loaded");
      });

      videoRef.current.addEventListener("playing", () => {
        console.log("Video is playing");
        setIsLoading(false);
      });

      // Try to play the video
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playback started successfully");
          })
          .catch((error) => {
            console.error("Error playing video:", error);
            setVideoError(true);
          });
      }
    }

    // Force the loading state to false after a timeout as a fallback
    const timeout = setTimeout(() => {
      console.log("Timeout reached, forcing loading state to false");
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Video element */}
      <div className={`w-full ${videoError ? "hidden" : "block"}`}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          width={width}
          height={height}
          className={`w-full h-auto rounded-xl shadow-md transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{
            objectFit: "contain",
            maxWidth: "100%",
            width: "100%",
            height: "auto",
            maxHeight: "none",
            borderRadius: "12px",
          }}
          onCanPlay={() => {
            console.log("Video can play");
            setIsLoading(false);
          }}
          onError={(e) => {
            console.error("Video error:", e);
            setVideoError(true);
            setIsLoading(false);
          }}
          onLoadedData={() => {
            console.log("Video data loaded");
            setIsLoading(false);
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Fallback image that's shown when video fails to load */}
      <div className={`${videoError ? "block" : "hidden"}`}>
        <Image
          src={fallbackImageSrc}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover rounded-xl"
          quality={100}
          priority
          unoptimized
          style={{
            borderRadius: "12px",
            maxWidth: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
