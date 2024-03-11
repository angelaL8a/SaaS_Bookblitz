import { cn } from "@/lib/utils";
import React, { HTMLAttributeAnchorTarget } from "react";

const Header = () => {
  return (
    <header className="h-[100px] flex gap-10 items-center justify-center">
      <HeaderButton>User Comments</HeaderButton>

      <HeaderButton>Short Tutorials</HeaderButton>

      <HeaderButton>FAQs</HeaderButton>

      <HeaderButton
        href="https://sereinteam.vercel.app"
        target="_blank"
        className="bg-gradient-to-b from-[rgba(212,146,255,0.79)] to-[rgba(212,146,255,0.79)] text-[#F5F5F5]"
      >
        Start Now!
      </HeaderButton>
    </header>
  );
};

const HeaderButton = ({
  children,
  className,
  href,
  target,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
}) => {
  return (
    <a
      href={href}
      target={target}
      className={cn(
        "bg-[#FBFBFB] px-10 py-2 rounded-xl header_btn_shadow",
        className
      )}
    >
      {children}
    </a>
  );
};

export default Header;
