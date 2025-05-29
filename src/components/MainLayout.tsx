"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AlertBanner from "@/components/AlertBanner";
import Header from "@/components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Hide banner on quiz pages
  const shouldShowBanner = !pathname.includes("/recruiter/ai-maturity-quiz");

  const [isBannerVisible, setIsBannerVisible] = useState(shouldShowBanner);

  const handleCloseBanner = () => {
    setIsBannerVisible(false);
  };

  // Calculate dynamic padding based on banner visibility
  // Header height (h-20) = 5rem
  // Banner height (py-2) approx = 2.5rem
  const mainPaddingTop = isBannerVisible ? "pt-30" : "pt-20"; // pt-30 = 7.5rem, pt-20 = 5rem

  return (
    <div className="relative">
      <AlertBanner isVisible={isBannerVisible} onClose={handleCloseBanner} />
      <Header isBannerVisible={isBannerVisible} />
      <main
        className={`${mainPaddingTop} transition-all duration-300 ease-in-out`}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
