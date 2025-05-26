"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import CallToActionButton from "@/components/ui/CallToActionButton";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  isBannerVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ isBannerVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleIndustries = () => {
    setIsIndustriesOpen(!isIndustriesOpen);
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
            <div className="relative">
              <button
                onClick={toggleIndustries}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-lg"
              >
                Industries
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isIndustriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    href="/fractionalCMO"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsIndustriesOpen(false)}
                  >
                    Fractional CMO
                  </Link>
                  <Link
                    href="/fractionalCFO"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsIndustriesOpen(false)}
                  >
                    Fractional CFO
                  </Link>
                  <Link
                    href="/recruiters"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsIndustriesOpen(false)}
                  >
                    Recruiters
                  </Link>
                  <Link
                    href="/b2bsaas"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsIndustriesOpen(false)}
                  >
                    B2B SaaS
                  </Link>
                </div>
              )}
            </div>
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
              href="/community"
              className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
            >
              Community
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
            <div className="space-y-2">
              <button
                onClick={toggleIndustries}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-lg w-full"
              >
                Industries
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isIndustriesOpen && (
                <div className="pl-4 space-y-2">
                  <Link
                    href="/fractionalCMO"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                    onClick={() => {
                      setIsIndustriesOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Fractional CMO
                  </Link>
                  <Link
                    href="/fractionalCFO"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                    onClick={() => {
                      setIsIndustriesOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Fractional CFO
                  </Link>
                  <Link
                    href="/recruiters"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                    onClick={() => {
                      setIsIndustriesOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Recruiters
                  </Link>
                  <Link
                    href="/b2bsaas"
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
                    onClick={() => {
                      setIsIndustriesOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    B2B SaaS
                  </Link>
                </div>
              )}
            </div>
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
              href="/community"
              className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              Community
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
