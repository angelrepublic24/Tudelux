'use client';

import Link from 'next/link';
import {
  IoSettingsOutline,
  IoNotificationsOutline,
  IoKeyOutline,
  IoArrowBackOutline,
} from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import {
  MdSecurity,
  MdOutlineGroup,
  MdOutlineIntegrationInstructions,
} from 'react-icons/md';
import { BiCog } from 'react-icons/bi';

export const SettingSideBar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[70px] bg-[#2d3e50] z-50 shadow-xl p-4 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-center">
        <span className="text-[#ff5100] text-2xl font-bold">S</span>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        <SidebarLink href="/admin/settings/account" icon={<IoSettingsOutline size={22} color="white" />} label="Account Settings" />
        <SidebarLink href="/admin/settings/users" icon={<HiOutlineUsers size={22} color="white" />} label="Users & Roles" />
        <SidebarLink href="/admin/settings/teams" icon={<MdOutlineGroup size={22} color="white" />} label="Teams" />
        <SidebarLink href="/admin/settings/notifications" icon={<IoNotificationsOutline size={22} color="white" />} label="Notifications" />
        <SidebarLink href="/admin/settings/security" icon={<MdSecurity size={22} color="white" />} label="Security" />
        <SidebarLink href="/admin/settings/logs" icon={<BiCog size={22} color="white" />} label="Audit Logs" />
        <SidebarLink href="/admin/settings/api" icon={<IoKeyOutline size={22} color="white" />} label="API Keys" />
        <SidebarLink href="/admin/settings/integrations" icon={<MdOutlineIntegrationInstructions size={22} color="white" />} label="Integrations" />
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-600">
        <SidebarLink href="/admin" icon={<IoArrowBackOutline size={22} color="white" />} label="Back to Dashboard" />
      </div>
    </aside>
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
  <Link href={href} className="relative group flex items-center justify-center p-3 rounded-md hover:bg-[#ff5100]/20 transition-colors">
    <div>{icon}</div>
    {/* Tooltip label */}
    <span className="absolute left-full ml-2 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity z-50">
      {label}
    </span>
  </Link>
);
