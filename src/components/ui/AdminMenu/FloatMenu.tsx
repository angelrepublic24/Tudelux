'use client'

import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import { User } from '@/schemas'
import { logout } from '@/api/AuthApi' // asegúrate que esté importado

export default function FloatMenu({ user }: { user: User }) {
  return (
    <Popover className="relative">
      <PopoverButton as="div" className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
        <FaUserCircle size={28} />
        <span className="hidden md:inline text-sm font-medium">{user.name}</span>
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute right-0 z-10 mt-2 w-56 bg-white p-4 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-black/5 rounded-xl">
          <p className="text-center">Hello: {user.name}</p>
          <Link href="/admin/profile/settings" className="block p-2 hover:text-purple-950">
            Profile
          </Link>
          <Link href="/admin" className="block p-2 hover:text-purple-950">
            Budgets
          </Link>
          <button
            className="block w-full text-left p-2 hover:text-purple-950"
            onClick={async () => await logout()}
          >
            Log out
          </button>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}
