"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus, X } from "lucide-react";

interface Workflow {
  id?: string;
  name: string;
  status: string;
  statusColor: string;
  description: string;
  ghostImage: string;
}

const Dashboard = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "assistant" }[]
  >([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [newWorkflowId, setNewWorkflowId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      name: "Hyper-Targeted Lead Generation from Google Maps",
      status: "active",
      statusColor: "#31de96",
      description:
        "Automatically capture and nurture leads from local businesses using Google Maps data.",
      ghostImage: "/images/saleslead.png",
    },
    {
      name: "AI-Driven Ad Campaign Wizard",
      status: "active",
      statusColor: "#31de96",
      description:
        "Boost ad performance with intelligent A/B testing and dynamic budget optimization.",
      ghostImage: "/images/ads.png",
    },
    {
      name: "Viral Social Media Content Scheduler",
      status: "active",
      statusColor: "#31de96",
      description:
        "Automate viral content posting and real-time engagement tracking across all platforms.",
      ghostImage: "/images/socialmedia.png",
    },
    {
      name: "SEO Keyword Dominance Tracker",
      status: "active",
      statusColor: "#31de96",
      description:
        "Dominate search rankings with automated keyword monitoring and content optimization.",
      ghostImage: "/images/seo.png",
    },
    {
      name: "Strategic Web Data Scraping for Competitive Edge",
      status: "active",
      statusColor: "#31de96",
      description:
        "Extract and analyze competitor data to gain strategic market insights.",
      ghostImage: "/images/webscraping.png",
    },
    {
      name: "Dynamic Real-Time Analytics Dashboard",
      status: "active",
      statusColor: "#31de96",
      description:
        "Transform data into actionable insights with automated KPI tracking and reporting.",
      ghostImage: "/images/dataanalytics.png",
    },
  ]);

  const chatboxRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Style for animations
  const animationStyles = `
    @keyframes fadeInScale {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      70% {
        opacity: 1;
        transform: scale(1.02);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes highlight {
      0% {
        box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(250, 204, 21, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(250, 204, 21, 0);
      }
    }
    
    .workflow-appear {
      animation: fadeInScale 0.6s ease-out, highlight 2s ease-in-out;
      background-color: rgba(250, 204, 21, 0.05);
    }
    
    .icon-highlight {
      animation: highlight 2s ease-in-out;
    }

    .chat-overlay {
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      0% {
        transform: translateY(20px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const newMessage = {
      text: inputValue,
      sender: "user" as const,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Show typing indicator
    setIsTyping(true);

    // Create a new workflow ID
    const newId = Date.now().toString();
    setNewWorkflowId(newId);

    // First assistant message after a realistic typing delay (3.5 seconds)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Got it! I will begin designing a competitive hiring workflow with weekly updates. I have added it to your workflows.",
          sender: "assistant" as const,
        },
      ]);

      // Add the workflow after Elliot's first message
      setWorkflows((prev) => [
        {
          id: newId,
          name: "Competitor Hiring Dashboard",
          status: "in progress",
          statusColor: "#9dff87",
          description: `Setting up automation workflow...`,
          ghostImage: "/images/webscraping.png",
        },
        ...prev,
      ]);

      // Show typing indicator for the second message after a short pause
      setTimeout(() => {
        setIsTyping(true);

        // Second message after another short delay
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              text: "I'll notify you when it is up and running.",
              sender: "assistant" as const,
            },
          ]);

          // Clear new workflow ID after 5 seconds
          setTimeout(() => {
            setNewWorkflowId(null);
          }, 5000);
        }, 1500); // 1.5 seconds typing time for the second message
      }, 800); // 0.8 second pause before typing the second message
    }, 3500); // 3.5 seconds for initial typing
  };

  const handleTextareaInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    console.log("Dashboard component mounted");
    console.log("Initial isChatOpen state:", isChatOpen);
  }, [isChatOpen]);

  // Before rendering
  if (isChatOpen) {
    console.log("Chat overlay is visible");
  }

  const handleFabClick = () => {
    console.log("FAB clicked - handler called");
    console.log("Current isChatOpen state:", isChatOpen);
    setIsChatOpen(true);
    console.log("isChatOpen state updated to true");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>{animationStyles}</style>

      <div className="container mx-auto px-4 pt-24 pb-24 flex-grow flex items-center justify-center">
        {/* Main workflows card - 1:1 aspect ratio */}
        <div className="bg-white rounded-xl shadow-sm aspect-square w-full max-w-[min(90vh,90vw)] max-h-[min(90vh,90vw)] flex flex-col relative">
          <div className="p-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="text-[#9dff87] mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </span>
              Your Ghost Team
            </h2>
            <p className="text-gray-500 text-sm">
              Active and recent automation workflows
            </p>
          </div>

          <div className="px-6 flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 gap-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id || workflow.name}
                  className={`p-3 rounded-lg border border-gray-100 hover:border-[#9dff87] transition-all flex items-start ${
                    workflow.id === newWorkflowId ? "workflow-appear" : ""
                  }`}
                >
                  <div
                    className={`mr-3 ${
                      workflow.id === newWorkflowId ? "icon-highlight" : ""
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-white overflow-hidden ${
                        workflow.status === "in progress"
                          ? "border-[#4CAF91]"
                          : "border-[#9dff87]"
                      }`}
                    >
                      <Image
                        src={workflow.ghostImage}
                        alt={`${workflow.name} Ghost`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">
                        {workflow.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          workflow.status === "active"
                            ? "bg-[#31de96]/10 text-[#31de96]"
                            : workflow.status === "in progress"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {workflow.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {workflow.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create new workflow button - inside the card */}
          <div className="px-6 pb-6 mt-3">
            {/* Remove the existing button */}
          </div>

          {/* Floating action button */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleFabClick}
              className="bg-[#31de96] hover:bg-[#31de96]/80 text-white rounded-full p-4 shadow-lg focus:outline-none"
              aria-label="Create new workflow"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat overlay */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md chat-overlay">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/images/elliot.jpg" alt="Elliot" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Elliot, your AI Automation Designer
                  </h3>
                  <p className="text-sm text-gray-500">Create a new workflow</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={chatboxRef}
              className="p-4 h-80 overflow-y-auto bg-gray-50"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <p className="text-gray-600 mb-4">
                    Describe the automation workflow you need, and I&apos;ll
                    create it for you. For example:
                  </p>
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-700 text-sm mb-2 w-full text-left">
                    &quot;Create a workflow that tracks social media mentions
                    and sends a daily report.&quot;
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-gray-700 text-sm w-full text-left">
                    &quot;I need a system to monitor competitor job postings and
                    alert me weekly.&quot;
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender === "assistant" && (
                        <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                          <AvatarImage src="/images/elliot.jpg" alt="Elliot" />
                          <AvatarFallback>E</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`px-3 py-2 rounded-lg max-w-[80%] ${
                          message.sender === "user"
                            ? "bg-gray-800 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="mb-4 flex justify-start">
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarImage src="/images/elliot.jpg" alt="Elliot" />
                        <AvatarFallback>E</AvatarFallback>
                      </Avatar>
                      <div className="px-3 py-2 rounded-lg bg-blue-100 flex items-center">
                        <div className="flex space-x-1 items-center">
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  ref={textareaRef}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9dff87] focus:border-transparent resize-none overflow-hidden"
                  placeholder="Describe the workflow you need..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onInput={handleTextareaInput}
                  rows={1}
                  style={{ minHeight: "44px", maxHeight: "120px" }}
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9dff87] hover:bg-[#9dff87]/80 py-1 px-3 h-auto text-sm text-black"
                  disabled={!inputValue.trim()}
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
