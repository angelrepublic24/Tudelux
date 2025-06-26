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

export const DistributorSideBar = () => {
  const expanded = useSidebarStore((s) => s.expanded);
  const toggle = useSidebarStore((s) => s.toggle);
  const [hovered, setHovered] = useState<string | null>(null);

  const base = "/distributor";

  const items = [
    { href: `${base}`, icon: <RxDashboard size={20} />, label: "Dashboard" },
    {
      href: `${base}/quotes`,
      icon: <MdOutlineRequestQuote size={20} />,
      label: "Quotes",
    },
    {
      href: `${base}/installations`,
      icon: <MdHomeRepairService size={20} />,
      label: "Installation Jobs",
    },
    {
      href: `${base}/customers`,
      icon: <HiOutlineUsers size={20} />,
      label: "Customers",
    },
    {
      href: `${base}/library`,
      icon: <IoFolderOpenOutline size={20} />,
      label: "File Library",
    },
    {
      href: `${base}/orders`,
      icon: <IoTicketOutline size={20} />,
      label: "Orders",
    },
  ];

  return (
    <nav
      className={`fixed left-0 top-0 h-screen bg-white z-50 shadow-xl p-5 flex flex-col justify-between transition-[width] duration-300 ease-in-out ${
        expanded ? "w-[280px]" : "w-[72px]"
      }`}
    >
      <div>
        <h2 className="text-xl text-center font-bold text-[#ff5100] mb-10">
          {expanded ? "Tudelu" : "T"}
        </h2>

        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <SidebarLink
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

      {/* Toggle Button */}
      <button
        className={`text-gray-600 hover:text-[#ff5100] w-full mt-4 flex ${
          expanded ? "justify-end" : "justify-center"
        }`}
        onClick={() => toggle()}
      >
        {expanded ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
      </button>
    </nav>
  );
};

const SidebarLink = ({
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
}) => (
  <div
    className={`relative flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer ${
      expanded ? "justify-start" : "justify-center"
    }`}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <Link href={href} className="flex items-center gap-3 w-full">
      <div>{icon}</div>
      <span
        className={`text-base font-medium transition-all duration-300 ${
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
