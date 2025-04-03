import React, { ReactNode } from "react";
import Image from "next/image";

interface PillIconProps {
  // The icon or ReactNode to display
  icon?: ReactNode;
  // Optional image source for when using an image instead of an icon
  imageSrc?: string;
  imageAlt?: string;
  // Size variants (small for pricing, medium for departments, large for quotes)
  size?: "small" | "medium" | "large";
  // Optional variant for highlighted items
  isHighlighted?: boolean;
}

/**
 * PillIcon - A standardized pill-shaped icon component
 * Used for consistent design language across the site
 */
export function PillIcon({
  icon,
  imageSrc,
  imageAlt = "Icon",
  size = "medium",
  isHighlighted = false,
}: PillIconProps) {
  // Size configuration based on the size prop
  const sizes = {
    small: {
      container: { width: "100px", height: "50px" },
      circle: { width: "50px", height: "50px" },
      extension: { width: "50px" },
      imageSize: 24,
    },
    medium: {
      container: { width: "120px", height: "60px" },
      circle: { width: "60px", height: "60px" },
      extension: { width: "60px" },
      imageSize: 40,
    },
    large: {
      container: { width: "260px", height: "150px" },
      circle: { width: "150px", height: "150px" },
      extension: { width: "110px" },
      imageSize: 0, // Will use fill for large images
    },
  };

  const currentSize = sizes[size];

  // Simple solid color style
  const pillStyle = {
    background: isHighlighted ? "#4CAF91" : "#59c380", // Use darker green if highlighted
    width: currentSize.container.width,
    height: currentSize.container.height,
  };

  return (
    <div className="flex rounded-full overflow-hidden" style={pillStyle}>
      {/* Left circle part */}
      <div
        className="overflow-hidden flex-shrink-0"
        style={{
          width: currentSize.circle.width,
          height: currentSize.circle.height,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            borderRadius: "50%",
          }}
        >
          {imageSrc ? (
            // For images
            size === "large" ? (
              // Large images like profile photos
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
            ) : (
              // For ghost icons and other smaller images
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={currentSize.imageSize}
                height={currentSize.imageSize}
                className="object-contain"
              />
            )
          ) : (
            // For icons (Lucide or other React components)
            icon
          )}
        </div>
      </div>

      {/* Right extension to create pill shape */}
      <div style={{ width: currentSize.extension.width }}></div>
    </div>
  );
}
