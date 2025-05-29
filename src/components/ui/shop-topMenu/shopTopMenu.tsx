"use client";
import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store/ui/ui-store";
import { useCartStore } from "@/store/useCartStore";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline, IoMenuOutline } from "react-icons/io5";

export const ShopTopMenu = () => {
  const openMenu = useUIStore((state) => state.openSideMenu);
  const toggleCart = useUIStore((state) => state.toggleCart);

  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="flex px-5 justify-between items-center w-full  bg-[#ff5100]">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            <Image
              src={"/Tudelux.png"}
              alt="Tudelux"
              height={200}
              width={200}
              className="w-32 h-24"
            />
          </span>
        </Link>
      </div>

      {/* Center menu  */}
      <div className="hidden sm:block text-white ">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:text-[#ece83a]"
          href={`/products/men`}
        >
          Products
        </Link>
        {/* <Link
          className="m-2 p-2 rounded-md transition-all hover:text-[#ece83a]"
          href={`/category/women`}
        >
          Women
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:text-[#ece83a]"
          href={`/category/kid`}
        >
          Kids
        </Link> */}
      </div>

      <div className="flex items-center">
        <Popover className="relative">
          <PopoverButton
            as="div"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaUserCircle size={28} />
            {/* <span className="hidden md:inline text-sm font-medium">{user.name}</span> */}
          </PopoverButton>

          <PopoverPanel className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md ring-1 ring-gray-200 z-50 p-3 space-y-2">
            <p className="text-sm text-gray-700">Welcome</p>
            <Link href="/auth/login" className="block hover:text-[#ff5100]">
              Login
            </Link>
            {/* <Link href="/auth/login" className="block hover:text-[#ff5100]">
              Create
            </Link> */}
          </PopoverPanel>
        </Popover>
        <button className="mx-2" onClick={toggleCart}>
          <div className="relative">
            {totalItems > 0 && (
              <span className="absolute px-1 text-xs rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItems}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </button>

        <button
          className="m-2 px-2 rounded-md transition-all hover:bg-gray-100"
          onClick={openMenu}
        >
          <IoMenuOutline />
        </button>
      </div>
    </nav>
  );
};
