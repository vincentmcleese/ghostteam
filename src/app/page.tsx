"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./styles.module.css";
import Header from "@/components/Header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen relative overflow-hidden pt-16">
        <div className={styles.background}></div>
        <div className="w-full h-[calc(100vh-64px)] max-w-7xl mx-auto relative z-10 px-4 py-6 flex items-center justify-center">
          <Card className="w-full h-[calc(100%-32px)] shadow-xl flex flex-col bg-card/85 backdrop-blur-sm">
            <CardContent className="text-center flex-grow flex flex-col md:flex-row p-6">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-6 md:px-10 mb-10 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
                  Automate Everything
                </h2>
                <p className="text-muted-foreground mb-8 text-center md:text-left">
                  Transform your business processes with our intelligent
                  automation platform. Save time, reduce errors, and boost
                  productivity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="px-8">
                    Book a Call
                  </Button>
                  <Link href="/dashboard" passHref>
                    <Button variant="outline" size="lg" className="px-8">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <Image
                    src="/images/dashboardstats.png"
                    alt="Dashboard Statistics"
                    width={1736}
                    height={500}
                    className="w-full max-w-[868px] rounded-xl mb-6"
                    priority
                  />
                  <DashboardVideo />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

// Dashboard video component with image fallback
function DashboardVideo() {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video is visible even if loading takes time
  useEffect(() => {
    // Force the loading state to false after a timeout as a fallback
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200/50 w-full max-w-[868px] aspect-[1736/1488]">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm z-10">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Fallback Image (always present, hidden when video plays) */}
      <div
        className={`absolute inset-0 ${
          !videoError ? "transition-opacity duration-500" : ""
        }`}
        style={{ opacity: videoError || isLoading ? 1 : 0 }}
      >
        <Image
          src="/images/dashboard.png"
          alt="20hours Dashboard Demo"
          width={1736}
          height={1488}
          className="object-cover w-full h-full"
          priority
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Video (with transparency transition) */}
      <div
        className={`absolute inset-0 ${
          !isLoading ? "transition-opacity duration-500" : ""
        }`}
        style={{ opacity: !isLoading && !videoError ? 1 : 0 }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
          onCanPlay={() => setIsLoading(false)}
          onLoadedData={() => setIsLoading(false)}
        >
          <source src="/videos/dashboard.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
