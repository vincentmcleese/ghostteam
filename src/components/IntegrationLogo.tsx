"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface IntegrationLogoProps {
  name: string;
  size?: number;
}

const IntegrationLogo: React.FC<IntegrationLogoProps> = ({
  name,
  size = 48,
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        // Format the company name for the API
        const formattedName = name.toLowerCase().replace(/\s+/g, "-");
        const response = await fetch(
          `https://logo.clearbit.com/${formattedName}.com?size=${size}`
        );

        if (response.ok && response.url) {
          setLogoUrl(response.url);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    };

    fetchLogo();
  }, [name, size]);

  // If logo loading failed, display a fallback with the tool name
  if (error || !logoUrl) {
    return (
      <div
        className="flex items-center justify-center w-full h-full bg-gray-50 rounded-md"
        style={{ width: size, height: size }}
      >
        <div className="text-center text-sm font-medium text-gray-700 p-1">
          {name}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="object-contain"
        unoptimized
      />
    </div>
  );
};

export default IntegrationLogo;
