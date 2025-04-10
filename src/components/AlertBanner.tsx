"use client";

import React from "react";
import { X } from "lucide-react";

interface AlertBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-primary text-primary-foreground fixed top-0 left-0 z-[60]">
      <div className="container relative mx-auto px-4 py-2 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="text-lg">🚀</span>
          <span className="text-sm font-medium">
            Scale your growth with your Ghost Team working 24/7
          </span>
        </div>
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
