"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { NavBarHome } from "@/components/NavBarHomePage";

export const HeaderSwitcher = () => {
  const pathname = usePathname();

  const useHomeHeader = pathname === "/";

  if (useHomeHeader) {
    return (
      <>
        <NavBarHome />
      </>
    );
  }
  return (
    <>
      <NavBar />
    </>
  );
};
