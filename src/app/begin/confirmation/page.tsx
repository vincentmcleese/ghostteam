"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/elliot-ghostteam/30min";

/**
 * Confirmation page after survey submission
 */
export default function ConfirmationPage() {
  const [countdown, setCountdown] = useState(3);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1 && !redirected) {
          setRedirected(true);
          window.open(CALENDLY_URL, "_blank");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [redirected]);

  const handleGoToCalendly = () => {
    window.open(CALENDLY_URL, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success checkmark */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
            Success!
          </h1>

          {/* Message */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            You're now being redirected to Calendly to book a call.
          </p>

          {/* Countdown and redirect info */}
          {countdown > 0 && !redirected && (
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-lg text-gray-700">
                  Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}
                  ...
                </span>
              </div>
              <p className="text-gray-600">
                A new window will open with Calendly to schedule your call with
                Elliot.
              </p>
            </div>
          )}

          {redirected && (
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <p className="text-gray-600 mb-2">
                ✅ Calendly should have opened in a new window.
              </p>
              <p className="text-sm text-gray-500">
                If it didn't open automatically, use the button below.
              </p>
            </div>
          )}

          {/* Direct Calendly Button */}
          <div className="space-y-4">
            <Button
              onClick={handleGoToCalendly}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Go to Calendly Directly
            </Button>

            <p className="text-sm text-gray-500">
              Book your free 30-minute chat with Elliot, AI growth designer
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
