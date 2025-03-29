"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

interface Workflow {
  id?: string;
  name: string;
  status: string;
  statusColor: string;
  description: string;
  icon: React.ReactNode;
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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "SEO/Marketing",
      status: "active",
      statusColor: "green",
      description: "Content generation and optimization",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      name: "Sales/CRM",
      status: "active",
      statusColor: "green",
      description: "Lead tracking and follow-ups",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: "Media and News",
      status: "active",
      statusColor: "green",
      description: "Content monitoring and aggregation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      name: "Customer Research",
      status: "active",
      statusColor: "green",
      description: "Market trends and feedback analysis",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      name: "HR and Hiring",
      status: "active",
      statusColor: "green",
      description: "Resume screening and candidate matching",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      name: "Administration",
      status: "active",
      statusColor: "green",
      description: "Process automation and reporting",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
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

    // Simulate response after a delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "Got it, working on it now",
          sender: "assistant",
        },
      ]);

      // Add new workflow after an additional 1 second delay
      setTimeout(() => {
        const newWorkflowId = `workflow-${Date.now()}`;
        setNewWorkflowId(newWorkflowId);

        setWorkflows((prev) => [
          {
            id: newWorkflowId,
            name: "Competitive hiring dashboard",
            status: "creating",
            statusColor: "yellow",
            description: "Competitor hiring analysis and monthly reporting",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            ),
          },
          ...prev,
        ]);

        // Remove the highlight after animation completes
        setTimeout(() => {
          setNewWorkflowId(null);
        }, 3000);
      }, 1000);
    }, 2000);
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-resize textarea as content grows
  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Reset textarea height when cleared
  useEffect(() => {
    if (textareaRef.current && inputValue === "") {
      textareaRef.current.style.height = "40px";
    }
  }, [inputValue]);

  return (
    <>
      <style jsx>{animationStyles}</style>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                20hours Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your automated workflows
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button variant="outline" className="hidden md:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                View All
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Workflow
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Workflows
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {workflows.filter((w) => w.status === "active").length}
                  </h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tasks Completed
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">348</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Time Saved
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    126 hrs
                  </h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-xl font-semibold">Your Workflows</h2>
              <p className="text-sm text-gray-500 mt-1">
                Monitor and manage your active automation workflows
              </p>
            </div>

            {/* Workflows List */}
            <div className="divide-y divide-gray-100">
              {workflows.map((workflow, index) => (
                <div
                  key={workflow.id || index}
                  className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    workflow.id === newWorkflowId ? "workflow-appear" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`${
                        workflow.status === "creating"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      } p-3 rounded-lg mr-4 ${
                        workflow.id === newWorkflowId ? "icon-highlight" : ""
                      }`}
                    >
                      {workflow.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {workflow.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {workflow.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          workflow.statusColor === "green"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {workflow.status}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-500">
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
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chatbox */}
          <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-100 p-6 fixed bottom-6 right-6 w-full max-w-xl z-20">
            <div
              ref={chatboxRef}
              className="max-h-[300px] overflow-y-auto mb-5 space-y-4"
            >
              {/* Default message */}
              <div className="flex items-start">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src="/images/elliot.jpg" alt="Elliot" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </AvatarFallback>
                </Avatar>
                <div className="bg-blue-100 rounded-lg p-4 max-w-[85%]">
                  <p className="text-blue-800 text-base">
                    What would you like to do?
                  </p>
                </div>
              </div>

              {/* User messages */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    message.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.sender === "assistant" && (
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src="/images/elliot.jpg" alt="Elliot" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-4 max-w-[85%] ${
                      message.sender === "user"
                        ? "bg-slate-700 text-white ml-auto"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <p className="text-base">{message.text}</p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-12 w-12 ml-4">
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        You
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/images/elliot.jpg" alt="Elliot" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-blue-100 rounded-lg p-4 max-w-[85%]">
                    <div className="flex space-x-2">
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
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <textarea
                ref={textareaRef}
                placeholder="Type your message..."
                className="flex-grow text-base px-4 py-2 resize-none overflow-hidden rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onInput={handleTextareaInput}
                style={{ height: "40px", maxHeight: "160px" }}
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary hover:bg-primary/90 h-10 w-10 flex items-center justify-center"
              >
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
