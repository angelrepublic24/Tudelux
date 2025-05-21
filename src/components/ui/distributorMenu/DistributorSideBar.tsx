'use client';

import Link from 'next/link';
import {
  IoSettingsOutline,
  IoTicketOutline
} from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { AiOutlineProduct, AiOutlineShop } from 'react-icons/ai';
import { FaWarehouse } from 'react-icons/fa6';
import { MdOutlineRequestQuote, MdHomeRepairService } from 'react-icons/md';


export const DistributorSideBar = () => {
  return (
<nav className="fixed left-0 top-0 w-[280px] h-screen bg-white z-50 shadow-xl p-5">
      <h2 className="text-xl font-bold text-[#ff5100] mb-10">Admin Panel</h2>

      <div className="flex flex-col gap-5">
        <SidebarLink href="/admin/products" icon={<AiOutlineProduct  size={20} />} label="Products" />
        <SidebarLink href="/admin/quotes" icon={<MdOutlineRequestQuote size={20} />} label="Quotes" />
        <SidebarLink href="/admin/installations" icon={<MdHomeRepairService size={20} />} label="Installations" />
        <SidebarLink href="/admin/customers" icon={<HiOutlineUsers size={20} />} label="Customers" />
        <SidebarLink href="/admin/orders" icon={<IoTicketOutline size={20} />} label="Orders" />
        {/* <SidebarLink href="/admin/settings" icon={<IoSettingsOutline size={20} />} label="Settings" /> */}
      </div>
    </nav>
  );
};

const SidebarLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
  >
    {icon}
    <span className="text-base font-medium">{label}</span>
  </Link>
);
