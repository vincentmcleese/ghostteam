"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import CallToActionButton from "@/components/ui/CallToActionButton";

interface HeaderProps {
  isBannerVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ isBannerVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const headerTopClass = isBannerVisible ? "top-[2.5rem]" : "top-0";

  return (
    <header
      className={`fixed ${headerTopClass} w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Logo size="large" />

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-gray-500 hover:text-gray-600"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop navigation - centered */}
        <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
          <div className="flex items-center space-x-8">
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
            >
              How it works
            </Link>
            <Link
              href="#automations"
              className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
            >
              AI automations
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
            >
              Pricing
            </Link>
          </div>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <CallToActionButton />
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link
              href="#how-it-works"
              className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="#automations"
              className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              AI automations
            </Link>
            <Link
              href="#pricing"
              className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <CallToActionButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
