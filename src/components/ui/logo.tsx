import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  // Size variants for different contexts
  size?: "small" | "medium" | "large";
  // Whether to render as a link to home
  asLink?: boolean;
  // Optional className for additional styling
  className?: string;
  // Direction of text - vertical layout for footer, horizontal for header
  textDirection?: "horizontal" | "vertical";
}

/**
 * Logo - A standardized logo component for consistent branding
 * Used throughout the application in header, footer, etc.
 */
export function Logo({
  size = "medium",
  asLink = true,
  className = "",
  textDirection = "horizontal",
}: LogoProps) {
  // Size configuration for different contexts
  const sizes = {
    small: {
      container: "space-x-1",
      image: { width: 25, height: 25 },
      text: "text-xl",
    },
    medium: {
      container: "space-x-1",
      image: { width: 40, height: 40 },
      text: "text-2xl",
    },
    large: {
      container: "space-x-2",
      image: { width: 50, height: 50 },
      text: "text-3xl",
    },
  };

  const currentSize = sizes[size];

  // Apply className to the container span for color inheritance
  const textClasses = cn(
    "font-[Chunko] tracking-wide leading-none",
    currentSize.text
    // className is applied by the wrapper (Link or div) below
  );

  // The actual logo markup
  const logoContent = (
    <>
      <Image
        src="/images/greenghost.png"
        alt="GhostTeam Logo"
        width={currentSize.image.width}
        height={currentSize.image.height}
        className="object-contain"
      />

      {textDirection === "horizontal" ? (
        // Horizontal layout - everything in one line
        <span
          className={cn(
            textClasses,
            "flex flex-row items-center justify-center"
          )}
        >
          <span className="flex items-center">GHOST</span>
          <span className="flex items-center ml-1">TEAM</span>
        </span>
      ) : (
        // Vertical layout - GHOST on first line, TEAM on second line
        <span
          className={cn(
            textClasses,
            "flex flex-col justify-center items-center"
          )}
        >
          <span className="flex items-center">GHOST</span>
          <span className="flex items-center">
            <span>TEAM</span>
          </span>
        </span>
      )}
    </>
  );

  // Reverted to original conditional rendering
  return asLink ? (
    <Link
      href="/"
      className={cn(
        "text-foreground flex items-center",
        currentSize.container,
        className
      )}
    >
      {logoContent}
    </Link>
  ) : (
    <div
      className={cn(
        "text-foreground flex items-center",
        currentSize.container,
        className
      )}
    >
      {logoContent}
    </div>
  );
}
