'use client';

import Link from 'next/link';
import {
  IoSettingsOutline,
  IoNotificationsOutline,
  IoKeyOutline,
} from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdSecurity, MdOutlineGroup, MdOutlineIntegrationInstructions } from 'react-icons/md';
import { BiCog } from 'react-icons/bi';

export const SettingSideBar = () => {
  return (
    <aside className="group fixed left-0 top-0 h-screen w-[70px] hover:w-[280px] transition-all duration-300 ease-in-out bg-[#2d3e50] z-50 shadow-xl p-4 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-[#ff5100] text-xl font-bold hidden group-hover:block transition-all duration-200">Settings</span>
        <span className="text-[#ff5100] text-2xl block group-hover:hidden">S</span>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        <SidebarLink href="/admin/settings/account" icon={<IoSettingsOutline size={22} color='white' />} label="Account Settings" />
        <SidebarLink href="/admin/settings/users" icon={<HiOutlineUsers size={22} color='white' />} label="Users & Roles" />
        <SidebarLink href="/admin/settings/teams" icon={<MdOutlineGroup size={22} color='white' />} label="Teams" />
        <SidebarLink href="/admin/settings/notifications" icon={<IoNotificationsOutline size={22} color='white' />} label="Notifications" />
        <SidebarLink href="/admin/settings/security" icon={<MdSecurity size={22} color='white' />} label="Security" />
        <SidebarLink href="/admin/settings/logs" icon={<BiCog size={22} color='white' />} label="Audit Logs" />
        <SidebarLink href="/admin/settings/api" icon={<IoKeyOutline size={22} color='white' />} label="API Keys" />
        <SidebarLink href="/admin/settings/integrations" icon={<MdOutlineIntegrationInstructions size={22} color='white' />} label="Integrations" />
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
  <Link
    href={href}
    className="flex items-center gap-4 p-2 rounded-md border border-transparent hover:border-[#ff5100] transition-colors"
  >
    <div className="min-w-[24px]">{icon}</div>
    <span className="text-base font-light text-gray-100 hidden group-hover:block transition-all duration-200">
      {label}
    </span>
  </Link>
);
