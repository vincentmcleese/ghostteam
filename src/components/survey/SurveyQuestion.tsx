"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSurvey } from "@/lib/survey/survey-context";
import {
  SurveyQuestion as SurveyQuestionType,
  ContactDetails,
} from "@/lib/survey/survey-types";
import SurveyOption from "./SurveyOption";
import { cn } from "@/lib/utils";

/**
 * Main survey question component that handles all input types
 */
const SurveyQuestion: React.FC = () => {
  const { state, dispatch, surveyData } = useSurvey();
  const { currentQuestion, answers } = state;
  const [textValue, setTextValue] = useState("");
  const [contactForm, setContactForm] = useState<ContactDetails>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get the current question data
  const question: SurveyQuestionType = surveyData.questions[currentQuestion];

  // Helper to check if this is the 'How did you hear about us?' question
  const isHearAboutUsQuestion = question.question === "How did you hear about us?";

  // Update local state when question changes
  useEffect(() => {
    const currentAnswer = answers[question?.id];
    if (
      question?.inputType === "contact-form" &&
      typeof currentAnswer === "object"
    ) {
      setContactForm(currentAnswer as ContactDetails);
    } else if (typeof currentAnswer === "string") {
      setTextValue(currentAnswer);
    } else {
      setTextValue("");
      setContactForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      });
    }
  }, [currentQuestion, question?.id, answers]);

  // Auto-focus text inputs
  useEffect(() => {
    if (question?.inputType === "long-text" && textareaRef.current) {
      textareaRef.current.focus();
    } else if (
      (question?.inputType === "short-text" || question?.inputType === "url") &&
      inputRef.current
    ) {
      inputRef.current.focus();
    }
  }, [currentQuestion, question?.inputType]);

  const handleAnswer = useCallback(
    (value: string) => {
      dispatch({
        type: "ANSWER_QUESTION",
        payload: { questionId: question.id, answer: value },
      });
    },
    [dispatch, question.id]
  );

  const handleTextSubmit = useCallback(() => {
    if (textValue.trim()) {
      let finalValue = textValue.trim();

      // For URL inputs, ensure https:// prefix
      if (question.inputType === "url") {
        if (
          !finalValue.startsWith("http://") &&
          !finalValue.startsWith("https://")
        ) {
          finalValue = "https://" + finalValue;
        }
      }

      dispatch({
        type: "ANSWER_QUESTION",
        payload: { questionId: question.id, answer: finalValue },
      });
      if (currentQuestion < surveyData.questions.length - 1) {
        dispatch({ type: "NEXT_QUESTION" });
      }
    }
  }, [
    textValue,
    dispatch,
    question.id,
    question.inputType,
    currentQuestion,
    surveyData.questions.length,
  ]);

  const handleContactSubmit = useCallback(() => {
    const isValid =
      contactForm.firstName &&
      contactForm.lastName &&
      contactForm.phone &&
      contactForm.email;

    if (isValid) {
      dispatch({
        type: "ANSWER_QUESTION",
        payload: { questionId: question.id, answer: contactForm },
      });
    }
  }, [contactForm, dispatch, question.id]);

  const handleNext = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" });
  }, [dispatch]);

  const handleBack = useCallback(() => {
    dispatch({ type: "PREVIOUS_QUESTION" });
  }, [dispatch]);

  const normalizeUrl = useCallback((url: string) => {
    let cleanUrl = url.trim();
    // Remove multiple https:// if user pastes it
    if (
      cleanUrl.startsWith("https://https://") ||
      cleanUrl.startsWith("http://https://")
    ) {
      cleanUrl = cleanUrl.replace(/^https?:\/\//, "");
    }
    return cleanUrl;
  }, []);

  const validateUrl = useCallback((url: string) => {
    try {
      let testUrl = url;
      if (!testUrl.startsWith("http://") && !testUrl.startsWith("https://")) {
        testUrl = "https://" + testUrl;
      }
      new URL(testUrl);
      return true;
    } catch {
      return false;
    }
  }, []);

  const isTextValid = useCallback(() => {
    if (question.inputType === "url") {
      return textValue.trim() && validateUrl(textValue.trim());
    }
    return textValue.trim().length > 0;
  }, [question.inputType, textValue, validateUrl]);

  const isContactValid = useCallback(() => {
    return (
      contactForm.firstName &&
      contactForm.lastName &&
      contactForm.phone &&
      contactForm.email
    );
  }, [contactForm]);

  // Keyboard shortcuts for multiple choice
  useEffect(() => {
    if (question?.inputType !== "multiple-choice") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      const option = question.options?.find((opt) => opt.key === key);

      if (option) {
        e.preventDefault();
        handleAnswer(option.value);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selectedAnswer = answers[question.id];
        if (selectedAnswer) {
          handleNext();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [question, answers, handleAnswer, handleNext]);

  // Handle Enter key for ALL text inputs (short-text, url, long-text)
  useEffect(() => {
    if (
      question?.inputType === "short-text" ||
      question?.inputType === "url" ||
      question?.inputType === "long-text"
    ) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Only trigger on active input/textarea
        if (e.target === inputRef.current || e.target === textareaRef.current) {
          if (e.key === "Enter" && textValue.trim()) {
            e.preventDefault();
            handleTextSubmit();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [question?.inputType, textValue, handleTextSubmit]);

  // Helper type guard for 'other' answer object
  function isOtherAnswer(val: unknown): val is { value: string; otherText?: string } {
    return typeof val === 'object' && val !== null && 'value' in val;
  }

  if (!question) {
    return null;
  }

  const selectedAnswer = answers[question.id];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6 md:p-8 min-h-[400px]">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
        {question.question}
      </h2>

      {question.subtitle && (
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          {question.subtitle}
        </p>
      )}

      {/* Multiple Choice */}
      {question.inputType === "multiple-choice" && (
        <>
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <SurveyOption
                key={`${question.id}-${option.value}`}
                option={option}
                isSelected={isHearAboutUsQuestion
                  ? (isOtherAnswer(selectedAnswer) && selectedAnswer.value === option.value) || selectedAnswer === option.value
                  : selectedAnswer === option.value}
                onSelect={(value) => {
                  if (isHearAboutUsQuestion && value === "other") {
                    handleAnswer({ value: "other", otherText: "" } as any);
                  } else if (isHearAboutUsQuestion) {
                    handleAnswer({ value } as any);
                  } else {
                    handleAnswer(value);
                  }
                }}
                index={index}
              />
            ))}
          </div>
          {/* Show input if 'Other' is selected */}
          {isHearAboutUsQuestion && isOtherAnswer(selectedAnswer) && selectedAnswer.value === "other" && (
            <div className="mt-4">
              <input
                type="text"
                value={selectedAnswer.otherText || ""}
                onChange={e => handleAnswer({ value: "other", otherText: e.target.value } as any)}
                placeholder="Please specify..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
          )}
        </>
      )}

      {/* Short Text */}
      {question.inputType === "short-text" && (
        <div className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={handleTextSubmit}
              disabled={!isTextValid()}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-colors",
                isTextValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              Continue ↵
            </button>
            <span className="text-sm text-gray-500">
              Press Enter to continue
            </span>
          </div>
        </div>
      )}

      {/* Long Text */}
      {question.inputType === "long-text" && (
        <div className="space-y-4">
          <textarea
            ref={textareaRef}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-vertical"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={handleTextSubmit}
              disabled={!isTextValid()}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-colors",
                isTextValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              Continue ↵
            </button>
            <span className="text-sm text-gray-500">
              Press Enter to continue
            </span>
          </div>
        </div>
      )}

      {/* URL Input */}
      {question.inputType === "url" && (
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-4 text-gray-500 text-lg pointer-events-none">
              https://
            </span>
            <input
              ref={inputRef}
              type="text"
              value={normalizeUrl(textValue)}
              onChange={(e) => setTextValue(normalizeUrl(e.target.value))}
              placeholder="yourwebsite.com"
              className="w-full p-4 pl-24 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          {textValue && !validateUrl(textValue) && (
            <p className="text-red-500 text-sm">
              Please enter a valid website URL
            </p>
          )}
          <div className="flex items-center gap-4">
            <button
              onClick={handleTextSubmit}
              disabled={!isTextValid()}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-colors",
                isTextValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              Continue ↵
            </button>
            <span className="text-sm text-gray-500">
              Press Enter to continue
            </span>
          </div>
        </div>
      )}

      {/* Contact Form */}
      {question.inputType === "contact-form" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={contactForm.firstName}
              onChange={(e) =>
                setContactForm({ ...contactForm, firstName: e.target.value })
              }
              placeholder="First Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <input
              type="text"
              value={contactForm.lastName}
              onChange={(e) =>
                setContactForm({ ...contactForm, lastName: e.target.value })
              }
              placeholder="Last Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          <input
            type="tel"
            value={contactForm.phone}
            onChange={(e) =>
              setContactForm({ ...contactForm, phone: e.target.value })
            }
            placeholder="Phone Number"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <input
            type="email"
            value={contactForm.email}
            onChange={(e) =>
              setContactForm({ ...contactForm, email: e.target.value })
            }
            placeholder="Email Address"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <button
            onClick={() => {
              if (isContactValid()) {
                dispatch({
                  type: "ANSWER_QUESTION",
                  payload: { questionId: question.id, answer: contactForm },
                });
                dispatch({ type: "NEXT_QUESTION" });
              }
            }}
            disabled={!isContactValid()}
            className={cn(
              "px-6 py-3 rounded-lg font-medium transition-colors w-full",
              isContactValid()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
          >
            Continue ↵
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        {currentQuestion > 0 && (
          <button
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            onClick={handleBack}
            type="button"
          >
            ← Back
          </button>
        )}

        {question.inputType === "multiple-choice" && (
          isHearAboutUsQuestion
            ? ((isOtherAnswer(selectedAnswer) && selectedAnswer.value === "other" && selectedAnswer.otherText && selectedAnswer.otherText.trim()) || (isOtherAnswer(selectedAnswer) && selectedAnswer.value && selectedAnswer.value !== "other"))
            : (typeof selectedAnswer === "string" && selectedAnswer)
        ) && (
            <button
              className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={handleNext}
              type="button"
            >
              Continue ↵
            </button>
          )}
      </div>
    </div>
  );
};

export default SurveyQuestion;
