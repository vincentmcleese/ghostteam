import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CallToActionButton = () => (
  <div className="relative group">
    <Button
      className="flex items-center bg-black hover:bg-gray-800 text-white shadow-md px-4"
      asChild
    >
      <Link
        href="https://kufzvnot.forms.app/ghostteam"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full gap-3"
      >
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          <Image
            src="/images/ghost_whitest_transparent.png"
            alt="Ghost Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <span className="flex-grow text-center font-medium">
          Let&apos;s talk
        </span>
        <div className="bg-white w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0">
          <ArrowUpRight
            className="w-5 h-5 text-primary transition-transform duration-150 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.5}
          />
        </div>
      </Link>
    </Button>
    <div className="absolute top-full left-0 mt-2 transform scale-0 group-hover:scale-100 transition-transform duration-200 bg-white p-3 rounded-lg shadow-lg text-sm text-gray-600 flex items-center gap-2 max-w-xs z-10">
      <Image
        src="/images/elliot.jpg"
        alt="Elliot - AI Growth Designer"
        width={32}
        height={32}
        className="rounded-full flex-shrink-0"
      />
      <span>Free 30 minute chat with Elliot, AI growth designer.</span>
    </div>
  </div>
);

export default CallToActionButton;
