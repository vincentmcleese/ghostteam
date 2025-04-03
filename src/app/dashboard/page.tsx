"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { PillIcon } from "@/components/ui/pill-icon";

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
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      name: "Document Processing",
      status: "active",
      statusColor: "green",
      description: "PDF parsing and data extraction",
      ghostImage: "/images/operations.png",
    },
    {
      name: "SEO/Marketing",
      status: "active",
      statusColor: "green",
      description: "Content generation and optimization",
      ghostImage: "/images/marketing.png",
    },
    {
      name: "Sales/CRM",
      status: "active",
      statusColor: "green",
      description: "Lead tracking and follow-ups",
      ghostImage: "/images/sales.png",
    },
    {
      name: "Media and News",
      status: "active",
      statusColor: "green",
      description: "Content monitoring and aggregation",
      ghostImage: "/images/marketing.png",
    },
    {
      name: "Customer Research",
      status: "active",
      statusColor: "green",
      description: "Market trends and feedback analysis",
      ghostImage: "/images/research.png",
    },
    {
      name: "HR and Hiring",
      status: "active",
      statusColor: "green",
      description: "Resume screening and candidate matching",
      ghostImage: "/images/customersupport.png",
    },
    {
      name: "Administration",
      status: "active",
      statusColor: "green",
      description: "Process automation and reporting",
      ghostImage: "/images/finance.png",
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
          name: "Competitor Hiring",
          status: "in progress",
          statusColor: "orange",
          description: `Setting up automation workflow...`,
          ghostImage: "/images/research.png",
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>{animationStyles}</style>
      <Header />

      <div className="container mx-auto px-4 pt-20 pb-12 flex-grow">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar with workflows */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-[#59c380] mr-2">
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
                Your Workflows
              </h2>
              <p className="text-gray-500 mb-4 text-sm">
                Active and recent automation workflows
              </p>

              <div className="space-y-3">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id || workflow.name}
                    className={`p-3 rounded-lg border border-gray-100 hover:border-[#59c380] transition-all flex items-start ${
                      workflow.id === newWorkflowId ? "workflow-appear" : ""
                    }`}
                  >
                    <div
                      className={`mr-3 ${
                        workflow.id === newWorkflowId ? "icon-highlight" : ""
                      }`}
                    >
                      <PillIcon
                        imageSrc={workflow.ghostImage}
                        size="small"
                        isHighlighted={workflow.status === "in progress"}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">
                          {workflow.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            workflow.status === "active"
                              ? "bg-green-100 text-green-800"
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

              <Button
                className="w-full mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200"
                variant="outline"
              >
                View All Workflows
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-[#59c380] mr-2">
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </span>
                Create New Workflow
              </h2>

              <div
                ref={chatboxRef}
                className="bg-gray-50 rounded-lg p-4 mb-4 h-96 overflow-y-auto"
              >
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="mb-3 p-3 bg-gray-100 rounded-full">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/images/elliot.jpg" alt="Elliot" />
                        <AvatarFallback>E</AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      Elliot, your AI Automation specialist
                    </h3>
                    <p className="text-gray-500 max-w-md">
                      Describe the automation workflow you need, and I&apos;ll
                      create it for you. For example: &quot;Create a workflow
                      that tracks social media mentions and sends a daily
                      report.&quot;
                    </p>
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
                          <Avatar className="h-12 w-12 mr-3 flex-shrink-0">
                            <AvatarImage
                              src="/images/elliot.jpg"
                              alt="Elliot"
                            />
                            <AvatarFallback>E</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`px-4 py-3 rounded-lg max-w-[80%] ${
                            message.sender === "user"
                              ? "bg-[#59c380] text-white"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {message.sender === "assistant" && (
                            <span>
                              <span className="font-bold">Elliot: </span>
                              {message.text}
                            </span>
                          )}
                          {message.sender === "user" && message.text}
                        </div>
                        {message.sender === "user" && (
                          <Avatar className="h-12 w-12 ml-3 flex-shrink-0">
                            <AvatarFallback className="bg-gray-200 text-gray-700">
                              You
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="mb-4 flex justify-start">
                        <Avatar className="h-12 w-12 mr-3 flex-shrink-0">
                          <AvatarImage src="/images/elliot.jpg" alt="Elliot" />
                          <AvatarFallback>E</AvatarFallback>
                        </Avatar>
                        <div className="px-4 py-3 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center min-h-[40px]">
                          <div className="flex space-x-2 items-center">
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

              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  ref={textareaRef}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#59c380] focus:border-transparent resize-none overflow-hidden"
                  placeholder="Describe the workflow you need..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onInput={handleTextareaInput}
                  rows={1}
                  style={{ minHeight: "44px", maxHeight: "150px" }}
                />
                <Button
                  type="submit"
                  className="absolute right-2.5 bottom-2.5 bg-[#59c380] hover:bg-[#4ca36b]"
                  disabled={!inputValue.trim()}
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
