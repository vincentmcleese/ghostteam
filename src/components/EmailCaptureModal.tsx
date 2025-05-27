"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  slackInviteLink: string;
}

export default function EmailCaptureModal({
  isOpen,
  onClose,
  slackInviteLink,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Validate email
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save email to localStorage
      localStorage.setItem("communityEmail", email);
      if (firstName) localStorage.setItem("communityFirstName", firstName);

      // Send email to backend API
      const response = await fetch("/api/community-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slack-invite-link": slackInviteLink,
        },
        body: JSON.stringify({ email, firstName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit email");
      }

      // Redirect to Slack invite link
      window.open(slackInviteLink, "_blank");

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error submitting email:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Join Our Slack Community
          </DialogTitle>
          <DialogDescription>
            Enter your details to get access to our AI automation community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/slack-logo-white.png"
                alt="Slack"
                width={24}
                height={24}
                className="bg-[#4A154B] p-1 rounded"
              />
              <span className="font-medium">Ghost Team AI Community</span>
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <p className="text-xs text-gray-500">
              We&apos;ll send you occasional updates about the community and AI
              automation best practices.
            </p>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="w-full bg-[#4A154B] hover:bg-[#611f64] text-white flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Image
                    src="/images/slack-logo-white.png"
                    alt="Slack"
                    width={20}
                    height={20}
                    className="mr-1"
                  />
                  Go to Slack
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
