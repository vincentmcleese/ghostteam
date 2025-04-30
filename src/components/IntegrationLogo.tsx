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

        if (response.ok) {
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

  if (error || !logoUrl) {
    return null;
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
