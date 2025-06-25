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
import { MdOutlineHandshake } from "react-icons/md";

import { RxDashboard } from "react-icons/rx";
import { MdOutlineRequestQuote, MdHomeRepairService } from "react-icons/md";
import { cn } from "@/lib/utils"; // opcional si usas clsx o una función para unir clases

const items = [
  { label: "Dashboard", href: "/sales", icon: <RxDashboard size={22} /> },
  {
    label: "Quotes",
    href: "/sales/quotes",
    icon: <MdOutlineRequestQuote size={22} />,
  },
  {
    label: "Deals",
    href: "/sales/deals",
    icon: <MdOutlineHandshake size={22} />,
  },
  {
    label: "Installation Jobs",
    href: "/sales/installations",
    icon: <MdHomeRepairService size={22} />,
  },
  {
    label: "Orders",
    href: "/sales/orders",
    icon: <IoTicketOutline size={22} />,
  },
  {
    label: "Customers",
    href: "/sales/customers",
    icon: <HiOutlineUsers size={22} />,
  },
  {
    label: "File Library",
    href: "/sales/library",
    icon: <IoFolderOpenOutline size={22} />,
  },
];

export const SalesSideBar = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="fixed left-0 top-0 w-[72px] h-screen bg-gray-50 flex flex-col items-center py-6 z-50">
      <div className="text-[#ff5100] font-bold text-lg mb-10">T</div>

      <div className="flex flex-col gap-6 w-full items-center">
        {items.map((item) => (
          <SidebarIcon
            key={item.href}
            {...item}
            isHovered={hovered === item.label}
            onHover={() => setHovered(item.label)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>
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
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  return (
    <div
      className="relative w-full flex justify-center"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link
        href={href}
        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
      >
        {icon}
      </Link>
      {isHovered && (
        <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-50 shadow">
          {label}
        </div>
      )}
    </div>
  );
};
