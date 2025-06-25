"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FloatingVideoPlayer } from "@/components/FloatingVideoPlayer";
import CallToActionButton from "@/components/ui/CallToActionButton";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          linkedinUrl,
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
      <FloatingVideoPlayer />
      <div className="relative isolate py-6 sm:py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          {/* Hero Section */}
          <div className="mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.05,
                type: "spring",
                stiffness: 80,
              }}
              className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4"
            >
              <Image
                src="/images/speedyghost.png"
                alt="Ghost Team Mascot"
                width={64}
                height={64}
                className="h-12 w-12 rounded-xl bg-white drop-shadow-md sm:h-16 sm:w-16"
                priority
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <span
                  className="text-foreground/80 text-lg font-normal sm:text-xl lg:text-2xl"
                  style={{ letterSpacing: "0.5em" }}
                >
                  launch your
                </span>
                <h1 className="text-foreground font-[Chunko] text-3xl tracking-wide sm:text-5xl lg:text-6xl">
                  <span className="from-primary bg-gradient-to-r to-teal-400 bg-clip-text text-transparent">
                    GHOST
                  </span>
                  TEAM
                </h1>
              </motion.div>
            </motion.div>
          </div>

          {/* Waitlist Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl p-4 sm:p-8 mb-8 shadow-sm">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="bg-emerald-100 rounded-full p-2 sm:p-3">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-3 sm:mb-4 text-center">
                Cohort 1 registration is now full
              </h2>
              <p className="text-base sm:text-lg text-emerald-700 text-center leading-relaxed">
                <span className="block font-semibold text-emerald-800">
                  300 maximum reached.
                </span>
                <span className="block mt-2 font-medium">
                  Space is available for cohort 2. Join our exclusive waitlist
                  to receive priority access when we re-open soon.
                </span>
              </p>
            </div>

            <p className="text-muted-foreground text-lg sm:text-xl mb-8">
              With just a prompt, create any AI Agent or Automation in n8n
            </p>
          </motion.div>

          {/* Form or Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  You're on the list!
                </h3>
                <p className="text-green-700 mb-6">
                  We'll notify you as soon as Cohort 2 opens. Keep an eye on
                  your inbox!
                </p>
                <div className="border-t border-green-200 pt-6">
                  <p className="text-sm text-green-600 mb-4">
                    Want to connect with the community while you wait?
                  </p>
                  <Button
                    onClick={() =>
                      window.open("https://discord.gg/pfKVnH3P", "_blank")
                    }
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                    </svg>
                    Join Discord Community
                  </Button>
                </div>
              </div>
            ) : (
              <>
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

                    <div>
                      <Label
                        htmlFor="linkedin"
                        className="text-left block text-sm font-medium mb-2"
                      >
                        LinkedIn URL *
                      </Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
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
                    <Image
                      src="/images/ghost_whitest_transparent.png"
                      alt="Ghost Logo"
                      width={28}
                      height={28}
                      className="mr-2 h-7 w-7"
                    />
                    {isSubmitting
                      ? "Joining Waitlist..."
                      : "Join Cohort 2 Waitlist"}
                  </Button>
                </form>

                <div className="border-t border-border pt-6 mt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Want to connect with the community?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      window.open("https://discord.gg/pfKVnH3P", "_blank")
                    }
                    className="w-full border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
                    </svg>
                    Join Discord Community
                  </Button>
                </div>

                <div className="bg-primary text-white rounded-lg p-6 mt-6 flex flex-col items-center gap-4 text-center">
                  <Image
                    src="/images/ghost_whitest_transparent.png"
                    alt="Ghost Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <p className="font-semibold">
                    Learn how AI & Automation can help you grow faster
                  </p>
                  <CallToActionButton />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
