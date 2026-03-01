"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * PageContainer conditionally applies the default page container styles
 * except for the magic page, which should span the full width.
 */
export default function PageContainer({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Remove default container wrapper for the magic page
  if (pathname === "/magic") {
    return <>{children}</>;
  }
  return <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">{children}</div>;
}
