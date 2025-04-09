import React from "react";
import { Logo } from "../ui/logo";
import CallToActionButton from "../ui/CallToActionButton";

const Header = () => {
  return (
    <header className="w-full py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />
          <CallToActionButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
