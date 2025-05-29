"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PersonalizationCardProps {
  linkedInId?: string;
}

interface LinkedInProfile {
  firstName: string;
  profileImage: string;
  headline?: string;
}

/**
 * Displays a personalized card for the user based on their LinkedIn profile
 */
const PersonalizationCard: React.FC<PersonalizationCardProps> = ({
  linkedInId,
}) => {
  // States for animation and loading
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [profileImage, setProfileImage] = useState(
    "/images/recruiter/profile-placeholder.png"
  );

  // Fetch LinkedIn profile data if ID is provided
  useEffect(() => {
    const fetchLinkedInProfile = async () => {
      if (!linkedInId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/linkedin?id=${linkedInId}`);

        if (response.ok) {
          const data: LinkedInProfile = await response.json();
          setFirstName(data.firstName || "");
          setProfileImage(
            data.profileImage || "/images/recruiter/profile-placeholder.png"
          );
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch LinkedIn profile:", errorData);
          setError("Could not retrieve profile data");
          // Still show the card with generic greeting
          setFirstName("");
        }
      } catch (error) {
        console.error("Error fetching LinkedIn profile:", error);
        setError("An error occurred while loading your profile");
        // Still show the card with generic greeting
        setFirstName("");
      } finally {
        setIsLoading(false);
      }
    };

    // Show the card with a slight delay for a nice entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    // Fetch profile data if LinkedIn ID is provided
    if (linkedInId) {
      fetchLinkedInProfile();
    }

    return () => clearTimeout(timer);
  }, [linkedInId]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto mb-8 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-500",
        "opacity-0 transform translate-y-4",
        isVisible && "opacity-100 translate-y-0"
      )}
    >
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <p className="text-blue-800 font-medium text-center">
          67% of recruiters are exploring AI tools
        </p>
      </div>

      <div className="p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4">
        {/* LinkedIn profile section */}
        <div className="flex items-center flex-shrink-0">
          <div className="relative">
            {/* Profile image with loading state */}
            <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 relative">
              {isLoading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              )}
            </div>

            {/* LinkedIn logo badge */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
              <svg
                className="w-5 h-5 text-[#0077B5]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V10H9V17ZM7.694 8.717C6.923 8.717 6.408 8.203 6.408 7.517C6.408 6.831 6.922 6.317 7.779 6.317C8.55 6.317 9.065 6.831 9.065 7.517C9.065 8.203 8.551 8.717 7.694 8.717ZM18 17H15.558V13.174C15.558 12.116 14.907 11.872 14.663 11.872C14.419 11.872 13.605 12.035 13.605 13.174C13.605 13.337 13.605 17 13.605 17H11.082V10H13.605V10.977C13.93 10.407 14.581 10 15.802 10C17.023 10 18 10.977 18 13.174V17Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Welcome message */}
        <div>
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-40 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          ) : (
            <>
              <p className="text-gray-800 mb-1">
                <span className="font-semibold">
                  Welcome{firstName ? `, ${firstName}` : ""}!
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                This assessment is designed to help you understand how
                you&apos;re stacking up inside the recruitment space in the age
                of AI.
              </p>
              {error && (
                <p className="text-xs text-amber-600 mt-1">Note: {error}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalizationCard;
