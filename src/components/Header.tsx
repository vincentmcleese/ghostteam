"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <Link
          href="/"
          className="text-2xl text-foreground flex items-center space-x-1"
        >
          <Image
            src="/images/greenghost.png"
            alt="GhostTeam Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-[Chunko] tracking-wide flex flex-row items-center leading-none text-3xl">
            <span className="flex items-center">GHOST</span>
            <span className="text-[#59c380] flex items-center">TEAM</span>
            <span className="flex items-center">.ai</span>
          </span>
        </Link>

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

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-gray-900 transition-colors text-lg"
          >
            How It Works
          </Link>
          <Button asChild size="lg">
            <Link href="#book-call">Book a Call</Link>
          </Button>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link
              href="#features"
              className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-gray-600 hover:text-gray-900 transition-colors text-lg"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Button asChild className="w-full mt-3" size="lg">
              <Link href="#book-call" onClick={() => setIsOpen(false)}>
                Book a Call
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
