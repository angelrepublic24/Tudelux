'use client'
import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store/ui/ui-store";
import Image from "next/image";
import Link from "next/link";
import { IoCarOutline, IoCartOutline, IoMenuOutline, IoSearchOutline } from "react-icons/io5";

export const ShopTopMenu = () => {
  const openMenu = useUIStore(state => state.openSideMenu)
  return (
    <nav className="flex px-5 justify-between items-center w-full  bg-[#ff5100]">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            <Image src={'/Tudelux.png'}  alt="Tudelux" height={200} width={200} className="w-32 h-24"/>
          </span>
        </Link>
      </div>

      {/* Center menu  */}
      <div className="hidden sm:block text-white ">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:text-[#ece83a]"
          href={`/category/men`}
        >
          Products
        </Link>
        <Link
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
        </Link>
      </div>

      <div className="flex items-center">
        <Link className="mx-2" href={`/search`}>
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link className="mx-2" href={`/cart`}>
          <div className="relative">
            <span className="absolute px-1 text-xs rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">3</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button className="m-2 px-2 rounded-md transition-all hover:bg-gray-100" onClick={openMenu}>
            <IoMenuOutline />
        </button>
      </div>
    </nav>
  );
};