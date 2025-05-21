'use client';

import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';

export const DistributorTopBar = () => {
  return (
    <header className="fixed top-0 left-[280px] right-0 h-16 bg-white shadow-md px-6 flex items-center justify-between z-40">
      {/* Logo o título */}
      <div className="text-xl font-semibold text-[#ff5100]">
        Admin Dashboard
      </div>

      {/* Área derecha */}
      <div className="flex items-center gap-6">
        {/* Notificaciones */}
        <button className="relative">
          <IoNotificationsOutline size={24} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </button>

        {/* Configuración */}
        <button>
          <IoSettingsOutline size={22} />
        </button>

        {/* Usuario */}
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle size={28} />
          <span className="hidden md:inline text-sm font-medium">Angel</span>
        </div>
      </div>
    </header>
  );
};
