"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import CallToActionButton from "@/components/ui/CallToActionButton";

export default function FreeAiGrowthCoursePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/ai-course-waitlist-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join waitlist");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <div className="relative isolate py-6 sm:py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl px-6 text-center"
        >
          {/* Hero Section */}
          <div className="mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <Image
                src="/images/greenghost.png"
                alt="Ghost Team Mascot"
                width={64}
                height={64}
                className="h-12 w-12 rounded-xl bg-white drop-shadow-md sm:h-16 sm:w-16"
                priority
              />
              
              <h1 className="text-foreground font-bold text-3xl tracking-wide sm:text-5xl lg:text-6xl leading-relaxed">
                <span className="from-primary bg-gradient-to-r to-teal-400 bg-clip-text text-transparent block">
                  Build AI systems and scale on social platforms
                </span>
                <span className="bg-black text-white px-2 py-1 rounded inline-block mt-4">
                  for $0.00
                </span>
              </h1>
              
              <p className="text-foreground font-semibold text-xl sm:text-2xl max-w-2xl mt-6">
                by learning automation that actually ships and content that actually converts
              </p>
              
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mt-6">
                This complete playbook shows the exact AI workflows and growth tactics we used to get 60+ calls booked every 30 days and 8M+ impressions across LinkedIn & TikTok 🚀
              </p>

              {/* Pill Features */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {[
                  "AI agent automations",
                  "LinkedIn growth hacks",
                  "TikTok viral framework",
                  "n8n workflows",
                  "Converting followers to customers",
                  "Scale without a team"
                ].map((feature) => (
                  <span
                    key={feature}
                    className="px-4 py-2 bg-primary/10 text-black rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form or Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md mx-auto"
          >
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  You're on the list!
                </h3>
                <p className="text-green-700 mb-2">
                  We'll email you as soon as the course is ready.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-left block text-sm font-medium mb-2"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full text-base font-semibold"
                >
                  {isSubmitting ? "Submitting..." : "Be first to access →"}
                </Button>
              </form>
            )}

            <div className="border-t border-border pt-6 mt-6 flex flex-col items-center gap-4 text-center">
              <Image
                src="/images/greenghost.png"
                alt="Ghost Logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <p className="text-foreground font-semibold">
                Learn how AI & Automation can help you grow faster
              </p>
              <CallToActionButton />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}