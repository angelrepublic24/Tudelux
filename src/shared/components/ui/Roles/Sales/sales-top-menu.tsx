'use client';

import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from 'next/link';
import { User } from '@/modules/auth/schemas/auth.schema';
import { logout } from '@/modules/auth/api/AuthApi';

export const SalesTopBar = ({user}: {user: User}) => {
    const base = "/sales";

  return (
    <header className="fixed top-0 w-full h-16 bg-gray-50 shadow-md px-6 flex items-center justify-end z-40">
      <div className="flex items-center gap-6">
        <button className="relative">
          <IoNotificationsOutline size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </button>

        <button>
          <IoSettingsOutline size={22} />
        </button>

        {/* Usuario con menú flotante */}
        <Popover className="relative">
          <PopoverButton as="div" className="flex items-center gap-2 cursor-pointer">
            <FaUserCircle size={28} />
            <span className="hidden md:inline text-sm font-medium">{user.name} {user.lName}</span>
          </PopoverButton>

          <PopoverPanel className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md ring-1 ring-gray-200 z-50 p-3 space-y-2">
            <p className="text-sm text-gray-700">Hello, {user.name}</p>
            <Link href={`${base}/profile/settings`} className="block hover:text-[#ff5100]">
              Profile
            </Link>
            <button
              onClick={async () => await logout()}
              className="text-left w-full hover:text-red-600"
            >
              Log out
            </button>
          </PopoverPanel>
        </Popover>
      </div>
    </header>
  );
};
