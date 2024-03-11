import React from "react";
import { cn } from "../utils";

const Header = () => {
  return (
    <header className="h-[100px] flex gap-10 items-center justify-center">
      <HeaderButton>User Comments</HeaderButton>

      <HeaderButton>Short Tutorials</HeaderButton>

      <HeaderButton>FAQs</HeaderButton>

      <HeaderButton className="bg-gradient-to-b from-[rgba(212,146,255,0.79)] to-[rgba(212,146,255,0.79)] text-[#F5F5F5]">
        Start Now!
      </HeaderButton>
    </header>
  );
};

const HeaderButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button className={cn("bg-[#FBFBFB] px-10 py-2 rounded-xl", className)}>
      {children}
    </button>
  );
};

export default Header;
