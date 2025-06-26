"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IoSettingsOutline,
  IoNotificationsOutline,
  IoKeyOutline,
  IoArrowBackOutline,
} from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import {
  MdSecurity,
  MdOutlineGroup,
  MdOutlineIntegrationInstructions,
} from "react-icons/md";
import { BiCog } from "react-icons/bi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  { href: "/admin/settings/account", icon: <IoSettingsOutline size={22} color="white" />, label: "Account Settings" },
  { href: "/admin/settings/users", icon: <HiOutlineUsers size={22} color="white" />, label: "Users & Roles" },
  { href: "/admin/settings/teams", icon: <MdOutlineGroup size={22} color="white" />, label: "Teams" },
  { href: "/admin/settings/notifications", icon: <IoNotificationsOutline size={22} color="white" />, label: "Notifications" },
  { href: "/admin/settings/security", icon: <MdSecurity size={22} color="white" />, label: "Security" },
  { href: "/admin/settings/logs", icon: <BiCog size={22} color="white" />, label: "Audit Logs" },
  { href: "/admin/settings/api", icon: <IoKeyOutline size={22} color="white" />, label: "API Keys" },
  { href: "/admin/settings/integrations", icon: <MdOutlineIntegrationInstructions size={22} color="white" />, label: "Integrations" },
];

export const SettingSideBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#2d3e50] z-50 shadow-xl p-4 flex flex-col justify-between transition-[width] duration-300 ease-in-out ${
        expanded ? "w-[12vw]" : "w-[70px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-start">
        <span className="text-[#ff5100] text-2xl font-bold">
          {expanded ? "Settings" : "S"}
        </span>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 mt-6">
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

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-600">
        <SidebarLink
          href="/admin"
          icon={<IoArrowBackOutline size={22} color="white" />}
          label="Back to Dashboard"
          expanded={expanded}
          isHovered={hovered === "Back to Dashboard"}
          onHover={() => setHovered("Back to Dashboard")}
          onLeave={() => setHovered(null)}
        />

        {/* Toggle Button */}
        <button
          className={`mt-4 text-white hover:text-[#ff5100] w-full flex ${
            expanded ? "justify-end" : "justify-center"
          }`}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </aside>
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
}) => {
  return (
    <div
      className={`relative flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#ff5100]/20 transition-all cursor-pointer ${
        expanded ? "justify-start" : "justify-center"
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link href={href} className="flex items-center gap-4 w-full">
        <div>{icon}</div>
        <span
          className={`text-white text-sm whitespace-nowrap transition-all duration-300 ${
            expanded ? "opacity-100 max-w-[140px]" : "opacity-0 max-w-0"
          }`}
        >
          {label}
        </span>

        {/* Tooltip when collapsed */}
        {!expanded && isHovered && (
          <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded z-50 shadow whitespace-nowrap">
            {label}
          </span>
        )}
      </Link>
    </div>
  );
};
