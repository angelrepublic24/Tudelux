"use client";

import { useSidebarStore } from "@/shared/store/ui/ui-sidebar-store";
import React from "react";

export const BusinessDevWrapper = ({ children }: { children: React.ReactNode }) => {
  const expanded = useSidebarStore((s) => s.expanded);

  return (
    <div
      className={`transition-all duration-300 ${
        expanded ? "ml-44" : "ml-[72px]"
      }`}
    >
      <main className="pt-16 px-6">{children}</main>
    </div>
  );
};
