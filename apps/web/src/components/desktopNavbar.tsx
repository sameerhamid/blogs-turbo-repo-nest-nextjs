"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;
const DesktopNavbar = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathName = usePathname();
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrollDown = scrollPosition > 10;
  const isHome = pathName === "/";

  return (
    <nav
      className={cn(
        "hidden fixed w-full transition-colors z-50 top-0 md:block text-white",
        {
          "bg-white text-gray-700 shadow-md": isScrollDown || !isHome,
        }
      )}
    >
      <div className="flex items-center px-8 py-4 ">{props.children}</div>
      <hr className="border-b border-gray-100 opacity-25" />
    </nav>
  );
};

export default DesktopNavbar;
