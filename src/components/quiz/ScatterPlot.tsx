"use client";

import React, { useEffect, useRef } from "react";
import { useQuiz } from "@/lib/quiz/quiz-context";

interface ScatterPlotProps {
  userScore: number;
  distribution: number[];
}

/**
 * Creates a visual representation of the user's score compared to peers
 * with a modern design and LinkedIn profile integration
 */
const ScatterPlot: React.FC<ScatterPlotProps> = ({
  userScore,
  distribution,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = useQuiz();
  const { linkedInProfile } = state;

  // Set up the scatter plot visualization
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Get the device pixel ratio
    const dpr = window.devicePixelRatio || 1;

    // Set canvas dimensions accounting for device pixel ratio
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale context for device pixel ratio
    context.scale(dpr, dpr);

    // Clear the canvas
    context.clearRect(0, 0, rect.width, rect.height);

    // Calculate pixel positions
    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const plotWidth = width - padding * 2;
    const plotHeight = height - padding * 2;

    // Draw background with subtle gradient
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#fcfcfc");
    gradient.addColorStop(1, "#f8fafc");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    // Draw sections and labels
    const sectionWidth = plotWidth / 3;

    // Modern section colors with subtle gradients
    const drawSection = (
      index: number,
      color1: string,
      color2: string,
      label: string
    ) => {
      const x = padding + index * sectionWidth;

      // Create gradient for section
      const sectionGradient = context.createLinearGradient(
        x,
        padding,
        x,
        padding + plotHeight
      );
      sectionGradient.addColorStop(0, color1);
      sectionGradient.addColorStop(1, color2);

      context.fillStyle = sectionGradient;
      context.fillRect(x, padding, sectionWidth, plotHeight);

      // Add subtle border
      context.strokeStyle = "rgba(0,0,0,0.05)";
      context.lineWidth = 1;
      context.strokeRect(x, padding, sectionWidth, plotHeight);

      // Draw section label with shadow for better readability
      context.fillStyle = "#334155"; // Tailwind slate-700
      context.font = "bold 12px sans-serif";
      context.textAlign = "center";
      context.shadowColor = "rgba(255,255,255,0.8)";
      context.shadowBlur = 2;
      context.fillText(label, x + sectionWidth / 2, height - 10);
      context.shadowBlur = 0;
    };

    // Draw sections with modern gradients
    drawSection(
      0,
      "rgba(255,237,213,0.5)",
      "rgba(255,237,213,0.8)",
      "Manual Hustler"
    );
    drawSection(
      1,
      "rgba(236,252,203,0.5)",
      "rgba(236,252,203,0.8)",
      "Curious Optimizer"
    );
    drawSection(
      2,
      "rgba(219,234,254,0.5)",
      "rgba(219,234,254,0.8)",
      "System Scaler"
    );

    // Draw grid lines
    const drawGrid = () => {
      context.beginPath();
      context.strokeStyle = "rgba(203,213,225,0.4)"; // Lighter grid lines
      context.lineWidth = 1;

      // Horizontal grid lines
      for (let y = padding; y <= padding + plotHeight; y += plotHeight / 4) {
        context.moveTo(padding, y);
        context.lineTo(padding + plotWidth, y);
      }

      // Vertical grid lines
      for (let x = padding; x <= padding + plotWidth; x += sectionWidth) {
        context.moveTo(x, padding);
        context.lineTo(x, padding + plotHeight);
      }

      context.stroke();
    };

    drawGrid();

    // Draw distribution points
    if (distribution && distribution.length > 0) {
      // Map the distribution values to x positions
      const distributionRange = 3 - 1; // Max - Min score
      const pointsPerSection = distribution.length / distributionRange;

      distribution.forEach((value, index) => {
        const scoreValue = 1 + index / pointsPerSection;
        const xPos =
          padding + ((scoreValue - 1) / distributionRange) * plotWidth;

        // Draw each point in the distribution
        for (let i = 0; i < Math.ceil(value * 0.8); i++) {
          // Reduced density
          // Randomize y position slightly for visual distribution
          const yPos = padding + plotHeight / 2 + (Math.random() * 40 - 20);

          context.beginPath();
          context.arc(xPos, yPos, 2 + Math.random(), 0, Math.PI * 2);
          context.fillStyle = "rgba(148, 163, 184, 0.3)"; // Lighter points
          context.fill();
        }
      });
    }

    // Draw user score marker
    if (userScore) {
      const distributionRange = 3 - 1; // Max - Min score
      const xPos = padding + ((userScore - 1) / distributionRange) * plotWidth;
      const yPos = padding + plotHeight / 2;

      // Outer glow
      const drawGlow = (radius: number, color: string, alpha: number) => {
        context.beginPath();
        context.arc(xPos, yPos, radius, 0, Math.PI * 2);
        context.fillStyle = color
          .replace(")", `, ${alpha})`)
          .replace("rgb", "rgba");
        context.fill();
      };

      // Create a pulsing animation effect by layering circles
      for (let i = 4; i >= 0; i--) {
        drawGlow(20 - i * 2, "#3b82f6", 0.1 - i * 0.015);
      }

      // Draw LinkedIn profile image if available
      if (linkedInProfile?.profileImage) {
        // Create a circular clipping path
        context.save();
        context.beginPath();
        context.arc(xPos, yPos, 16, 0, Math.PI * 2);
        context.clip();

        // Draw profile image placeholder while loading
        context.fillStyle = "#dbeafe";
        context.fill();

        // Load and draw the profile image
        const img = new Image();
        img.onload = () => {
          // Draw the image centered in the circle
          context.drawImage(img, xPos - 16, yPos - 16, 32, 32);

          // Add a border
          context.strokeStyle = "white";
          context.lineWidth = 2;
          context.beginPath();
          context.arc(xPos, yPos, 16, 0, Math.PI * 2);
          context.stroke();

          context.restore();
        };
        img.onerror = () => {
          // If image fails to load, fallback to a regular marker
          context.restore();
          drawRegularMarker();
        };
        img.src = linkedInProfile.profileImage;
      } else {
        drawRegularMarker();
      }

      function drawRegularMarker() {
        if (!context) return;

        // Outer ring
        context.beginPath();
        context.arc(xPos, yPos, 8, 0, Math.PI * 2);
        context.fillStyle = "#3b82f6"; // Tailwind blue-500
        context.fill();

        // Inner point
        context.beginPath();
        context.arc(xPos, yPos, 4, 0, Math.PI * 2);
        context.fillStyle = "#ffffff";
        context.fill();
      }

      // Draw user name if available
      if (linkedInProfile?.firstName) {
        context.fillStyle = "#1e3a8a"; // Tailwind blue-900
        context.font = "bold 14px sans-serif";
        context.textAlign = "center";
        context.fillText(
          `${linkedInProfile.firstName}'s Score`,
          xPos,
          yPos - 28
        );
      } else {
        // "Your Score" label
        context.fillStyle = "#1e3a8a"; // Tailwind blue-900
        context.font = "bold 14px sans-serif";
        context.textAlign = "center";
        context.fillText("Your Score", xPos, yPos - 28);
      }
    }

    // Draw axis with shadow
    context.beginPath();
    context.shadowColor = "rgba(0,0,0,0.1)";
    context.shadowBlur = 2;
    context.shadowOffsetY = 1;
    context.moveTo(padding, padding + plotHeight / 2);
    context.lineTo(width - padding, padding + plotHeight / 2);
    context.strokeStyle = "#cbd5e1"; // Tailwind slate-300
    context.lineWidth = 2;
    context.stroke();
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;
  }, [userScore, distribution, linkedInProfile]);

  return (
    <div className="w-full mt-8">
      <h3 className="text-lg font-semibold text-center mb-4">
        Your AI Readiness Score
      </h3>
      <div className="w-full relative bg-white rounded-lg shadow-sm p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-[280px]"
          role="img"
          aria-label="Scatter plot showing your score distribution compared to peers"
        />
      </div>
    </div>
  );
};

export default ScatterPlot;
