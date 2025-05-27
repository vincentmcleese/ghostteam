"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EmailCaptureModal from "@/components/EmailCaptureModal";

const CommunityPage = () => {
  const [slackInviteLink, setSlackInviteLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch the current Slack invite link from localStorage or API
    const storedLink = localStorage.getItem("slackInviteLink");
    // Default link in case none is set yet
    setSlackInviteLink(
      storedLink ||
        "https://join.slack.com/t/ghostteamai/shared_invite/your-default-link"
    );
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1.5px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container mx-auto px-6 md:px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Join Our <span className="text-primary">AI Automation</span>{" "}
                Community
              </h1>

              {/* Avatar Group Section - Moved above screenshot */}
              <div className="mt-6 mb-8">
                <p className="text-gray-700 mb-4 text-center font-medium">
                  Join 100+ founders sharing their agentic AI workflow
                  automations
                </p>

                <div className="flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
                  {/* Featured Members */}
                  <div className="flex flex-wrap justify-center gap-6">
                    {/* Elliot */}
                    <a
                      href="https://www.linkedin.com/in/elliotgarreffa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center hover:opacity-90 transition-opacity"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 mb-2">
                        <Image
                          src="/images/avatars/elliot.jpg"
                          alt="Elliot"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) parent.innerHTML = "EG";
                          }}
                        />
                      </div>
                      <span className="font-medium text-sm">Elliot</span>
                      <span className="text-xs text-gray-500">
                        Founder Ghostteam
                      </span>
                    </a>

                    {/* Sal */}
                    <a
                      href="https://www.linkedin.com/in/sal-mohammed-89811860/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center hover:opacity-90 transition-opacity"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 mb-2">
                        <Image
                          src="/images/avatars/sal.jpeg"
                          alt="Sal"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) parent.innerHTML = "SM";
                          }}
                        />
                      </div>
                      <span className="font-medium text-sm">Sal</span>
                      <span className="text-xs text-gray-500">
                        Co-founder LangSync
                      </span>
                    </a>

                    {/* Ben - Replacing Richie */}
                    <a
                      href="https://www.linkedin.com/in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center hover:opacity-90 transition-opacity"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 mb-2">
                        <Image
                          src="/images/avatars/ben.jpeg"
                          alt="Ben"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) parent.innerHTML = "BJ";
                          }}
                        />
                      </div>
                      <span className="font-medium text-sm">Ben</span>
                      <span className="text-xs text-gray-500">
                        Co-Founder at Canary Labs
                      </span>
                    </a>

                    {/* Albina */}
                    <a
                      href="https://www.linkedin.com/in/albinastimac/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center hover:opacity-90 transition-opacity"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 mb-2">
                        <Image
                          src="/images/avatars/albina.jpeg"
                          alt="Albina"
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) parent.innerHTML = "AS";
                          }}
                        />
                      </div>
                      <span className="font-medium text-sm">Albina</span>
                      <span className="text-xs text-gray-500">
                        Service lead at Farfetch
                      </span>
                    </a>
                  </div>

                  {/* Remaining Members Group */}
                  <div className="flex items-center mt-4">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-purple-400 flex items-center justify-center text-white font-semibold">
                        MK
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-400 flex items-center justify-center text-white font-semibold">
                        RW
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-400 flex items-center justify-center text-white font-semibold">
                        TP
                      </div>
                    </div>
                    <div className="ml-1 flex items-center justify-center bg-gray-100 rounded-full px-3 py-1">
                      <span className="text-sm font-medium text-gray-600">
                        +95 more
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button - Replaced with button that opens modal */}
              <div className="flex justify-center mb-8">
                <Button
                  size="lg"
                  className="mt-4 bg-[#4A154B] hover:bg-[#611f64] text-white px-8 py-6 h-auto text-lg flex items-center gap-2"
                  onClick={handleOpenModal}
                >
                  <Image
                    src="/images/slack-logo-white.png"
                    alt="Slack Logo"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Join Our Slack Community
                </Button>
              </div>

              <div className="mt-8 mb-8">
                <div className="w-full">
                  <Image
                    src="/images/joinslack.png"
                    alt="Ghost Team Slack Community"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 md:px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why Join Our Community?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Free Expert Support</h3>
                <p className="text-gray-600">
                  Get direct access to automation experts who can help
                  troubleshoot your workflows and answer your AI questions.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Knowledge Sharing</h3>
                <p className="text-gray-600">
                  Exchange ideas and insights with entrepreneurs who are
                  leveraging AI to grow their businesses and save time.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">
                  Ready-to-Use Templates
                </h3>
                <p className="text-gray-600">
                  Access hundreds of AI automation templates you can immediately
                  implement in your business.
                </p>
              </div>
            </div>

            <div className="mt-16"></div>
          </div>
        </section>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        slackInviteLink={slackInviteLink}
      />
    </main>
  );
};

export default CommunityPage;
