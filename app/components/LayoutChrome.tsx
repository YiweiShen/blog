"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function LayoutChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/magic") {
    return null;
  }

  return <>{children}</>;
}
