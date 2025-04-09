"use client";

import React from "react";
import Image from "next/image";

interface TestimonialImageProps {
  src: string;
  alt: string;
  size?: "medium" | "large";
}

const TestimonialImage = ({
  src,
  alt,
  size = "medium",
}: TestimonialImageProps) => {
  const dimensions = {
    medium: {
      container: "w-20 h-20",
      image: "w-20 h-20",
    },
    large: {
      container: "w-32 h-32",
      image: "w-32 h-32",
    },
  }[size];

  return (
    <div className={`relative ${dimensions.container}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transform rotate-6" />
      <div className="absolute inset-0 bg-white rounded-2xl shadow-sm" />
      <Image
        src={src}
        alt={alt}
        width={size === "large" ? 128 : 80}
        height={size === "large" ? 128 : 80}
        className={`${dimensions.image} rounded-2xl relative z-10 object-cover`}
      />
    </div>
  );
};

export default TestimonialImage;
