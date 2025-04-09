import React from "react";

interface HeroHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroHeading: React.FC<HeroHeadingProps> = ({
  children,
  className = "",
}) => {
  return <h1 className={`text-[#9dff87] ${className}`}>{children}</h1>;
};
