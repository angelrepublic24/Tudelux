"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IoFolderOpenOutline,
  IoSettingsOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineProduct, AiOutlineShop } from "react-icons/ai";
import { FaWarehouse } from "react-icons/fa6";
import { MdOutlineHandshake, MdOutlineRequestQuote, MdHomeRepairService } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebarStore } from "@/shared/store/ui/ui-sidebar-store";

const items = [
  { label: "Dashboard", href: "/sales", icon: <RxDashboard size={22} /> },
  { label: "Quotes", href: "/sales/quotes", icon: <MdOutlineRequestQuote size={22} /> },
  { label: "Deals", href: "/sales/deals", icon: <MdOutlineHandshake size={22} /> },
  { label: "Installation Jobs", href: "/sales/installations", icon: <MdHomeRepairService size={22} /> },
  { label: "Orders", href: "/sales/orders", icon: <IoTicketOutline size={22} /> },
  { label: "Customers", href: "/sales/customers", icon: <HiOutlineUsers size={22} /> },
  { label: "File Library", href: "/sales/library", icon: <IoFolderOpenOutline size={22} /> },
];

export const SalesSideBar = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  // const [expanded, setExpanded] = useState(false);
  const expanded = useSidebarStore((s) => s.expanded);
const toggle = useSidebarStore((s) => s.toggle);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gray-50 flex flex-col justify-between items-start py-6 z-50 
      transition-[width] duration-300 ease-in-out ${expanded ? "w-44" : "w-[72px]"}`}
    >
      <div className="w-full flex flex-col items-center gap-10">
        <div className="text-[#ff5100] font-bold text-2xl">
          {expanded ? "Tudelu" : "T"}
        </div>

        <div className="flex flex-col gap-6 w-full">
          {items.map((item) => (
            <SidebarIcon
              key={item.href}
              {...item}
              isHovered={hovered === item.label}
              expanded={expanded}
              onHover={() => setHovered(item.label)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className={`mb-4 text-gray-700 hover:text-[#ff5100] w-full px-2 flex transition ${
          expanded ? "justify-end" : "justify-center"
        }`}
        onClick={() => toggle()}
      >
        {expanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </aside>
  );
};

const SidebarIcon = ({
  href,
  icon,
  label,
  isHovered,
  onHover,
  onLeave,
  expanded,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  expanded: boolean;
}) => {
  return (
    <div
      className={`relative flex items-center gap-2 transition-all duration-200 px-4 ${
        expanded ? "justify-start" : "justify-center"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link href={href} className="flex items-center gap-4 relative">
        <span>{icon}</span>

        {/* Label (visible only if expanded) */}
        <span
          className={`text-black text-sm whitespace-nowrap overflow-hidden transition-all duration-300
            ${expanded ? "opacity-100 max-w-[140px]" : "opacity-0 max-w-0"}`}
        >
          {label}
        </span>

        {/* Tooltip on hover when not expanded */}
        {!expanded && isHovered && (
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded shadow transition-opacity duration-300 whitespace-nowrap z-50">
            {label}
          </span>
        )}
      </Link>
    </div>
  );
};
