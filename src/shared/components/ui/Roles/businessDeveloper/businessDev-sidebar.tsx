"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IoFolderOpenOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import {
  MdOutlineRequestQuote,
  MdHomeRepairService,
} from "react-icons/md";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebarStore } from "@/shared/store/ui/ui-sidebar-store";

const items = [
  {
    label: "Dashboard",
    href: "/business-developer",
    icon: <RxDashboard size={22} />,
  },
  {
    label: "Customers",
    href: "/business-developer/customers",
    icon: <HiOutlineUsers size={22} />,
  },
  {
    label: "Quotes",
    href: "/business-developer/quotes",
    icon: <MdOutlineRequestQuote size={22} />,
  },
  {
    label: "Installation Jobs",
    href: "/business-developer/installations",
    icon: <MdHomeRepairService size={22} />,
  },
  {
    label: "Orders",
    href: "/business-developer/orders",
    icon: <IoTicketOutline size={22} />,
  },
  {
    label: "File Library",
    href: "/business-developer/library",
    icon: <IoFolderOpenOutline size={22} />,
  },
];

export const BusinessDevSideBar = () => {
 const expanded = useSidebarStore((s) => s.expanded);
 const toggle = useSidebarStore((s) => s.toggle);  
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gray-50 z-50 shadow-xl py-6 px-4 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        expanded ? "w-[280px]" : "w-[72px]"
      }`}
    >
      {/* Logo */}
      <div>
        <div className="text-[#ff5100] font-bold text-lg mb-10 text-center">
          {expanded ? "Tudelu" : "T"}
        </div>

        {/* Items */}
        <div className="flex flex-col gap-6 w-full items-start">
          {items.map((item) => (
            <SidebarIcon
              key={item.href}
              {...item}
              expanded={expanded}
              isHovered={hovered === item.label}
              onHover={() => setHovered(item.label)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>

      {/* Toggle button */}
      <button
        className={`text-gray-600 hover:text-[#ff5100] w-full mt-4 flex ${
          expanded ? "justify-end" : "justify-center"
        }`}
        onClick={() => toggle()}
      >
        {expanded ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
      </button>
    </aside>
  );
};

const SidebarIcon = ({
  href,
  icon,
  label,
  expanded,
  isHovered,
  onHover,
  onLeave,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  return (
    <div
      className={`relative w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer ${
        expanded ? "justify-start" : "justify-center"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link href={href} className="flex items-center gap-3 w-full">
        <div>{icon}</div>
        <span
          className={`text-sm font-medium transition-all duration-300 ${
            expanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
          }`}
        >
          {label}
        </span>

        {/* Tooltip */}
        {!expanded && isHovered && (
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded shadow z-50 whitespace-nowrap">
            {label}
          </span>
        )}
      </Link>
    </div>
  );
};
