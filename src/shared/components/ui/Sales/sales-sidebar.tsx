'use client';

import Link from 'next/link';
import {
  IoFolderOpenOutline,
  IoSettingsOutline,
  IoTicketOutline
} from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { AiOutlineProduct, AiOutlineShop } from 'react-icons/ai';
import { FaWarehouse } from 'react-icons/fa6';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineRequestQuote, MdHomeRepairService } from 'react-icons/md';


export const SalesSideBar = () => {
  const base = "/sales";
  return (
<nav className="fixed left-0 top-0 w-[280px] h-screen bg-white z-50 shadow-xl p-5">
      <h2 className="text-xl text-center font-bold text-[#ff5100] mb-10">Tudelu</h2>

     <div className="flex flex-col gap-5">
        <SidebarLink href={`${base}`} icon={<RxDashboard size={20} />} label="Dashboard" />
        <SidebarLink href={`${base}/quotes`} icon={<MdOutlineRequestQuote size={20} />} label="Quotes" />
        <SidebarLink href={`${base}/installations`} icon={<MdHomeRepairService size={20} />} label="Installation Jobs" />
        <SidebarLink href={`${base}/customers`} icon={<HiOutlineUsers size={20} />} label="Customers" />
        <SidebarLink href={`${base}/library`} icon={<IoFolderOpenOutline size={20} />} label="File Library" />
        <SidebarLink href={`${base}/orders`} icon={<IoTicketOutline size={20} />} label="Orders" />
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
