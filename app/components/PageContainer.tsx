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
  return <div className="container mx-auto px-8 py-8">{children}</div>;
}
