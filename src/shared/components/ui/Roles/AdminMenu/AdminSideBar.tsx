'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  IoTicketOutline,
} from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { AiOutlineProduct, AiOutlineShop } from 'react-icons/ai';
import { FaWarehouse } from 'react-icons/fa6';
import {
  MdOutlineRequestQuote,
  MdHomeRepairService,
  MdSupportAgent,
  MdOutlineHandshake,
} from 'react-icons/md';
import { Component } from 'lucide-react';

const items = [
  { label: 'Products', href: '/admin/products', icon: <AiOutlineProduct size={22} color='black' /> },
  { label: 'Materials', href: '/admin/materials', icon: <Component size={22} color='black'  /> },
  {label: "Deals",href: "/admin/deals",icon: <MdOutlineHandshake size={22} color='black'  />},
  { label: 'Quotes', href: '/admin/quotes', icon: <MdOutlineRequestQuote size={22} color='black'  /> },
  { label: 'Installations', href: '/admin/installations', icon: <MdHomeRepairService size={22} color='black'  /> },
  { label: 'Sales', href: '/admin/sales', icon: <AiOutlineShop size={22} color='black'  /> },
  { label: 'Distributors', href: '/admin/distributors', icon: <FaWarehouse size={22} color='black'  /> },
  { label: 'Customers', href: '/admin/customers', icon: <HiOutlineUsers size={22} color='black'  /> },
  { label: 'Orders', href: '/admin/orders', icon: <IoTicketOutline size={22} color='black'  /> },
  { label: 'AI Agent', href: '/admin/ai-agent-chat', icon: <MdSupportAgent size={22} color='black'  /> },
];

export const AdminSideBar = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside className="fixed left-0 top-0 w-[72px] h-screen bg-gray-50 flex flex-col items-center py-6 z-50">
      <div className="text-[#ff5100] font-bold text-2xl mb-10">A</div>

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
        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-700 transition-colors"
      >
        <div className="text-white">{icon}</div>
      </Link>
      {isHovered && (
        <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow-md whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </div>
  );
};
