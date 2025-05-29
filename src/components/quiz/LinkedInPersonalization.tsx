"use client";

import React from "react";
import PersonalizationCard from "./PersonalizationCard";

interface LinkedInPersonalizationProps {
  linkedInId: string;
}

/**
 * Client component that handles LinkedIn personalization
 * Only used on the main quiz page since we now redirect to results
 */
const LinkedInPersonalization: React.FC<LinkedInPersonalizationProps> = ({
  linkedInId,
}) => {
  return <PersonalizationCard linkedInId={linkedInId} />;
};

export default LinkedInPersonalization;
