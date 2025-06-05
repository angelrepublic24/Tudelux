'use client'
import { useUIStore } from '@/shared/store/ui/ui-store'
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline, IoSearchOutline, IoSettingsOutline, IoTicketOutline } from 'react-icons/io5'
import { AiOutlineProduct } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";



export const Sidebar = () => {
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
    const closeMenu = useUIStore(state => state.closeSideMenu);
    const openMenu = useUIStore(state => state.openSideMenu);


    const [startX, setStartX] = useState<number | null>(null);
    const threshold = 50;

    const handleTouchStart = (e: TouchEvent) => {
        if(e.touches[0].clientX < 30){
            setStartX(e.touches[0].clientX)
        }
    }

    const handleTouchMove = (e: TouchEvent) => {
        if(startX !== null) {
            const currentX = e.touches[0].clientX;
            const diffX = currentX - startX;

            if (diffX > threshold) {
                openMenu();
                setStartX(null); 
            }
        }
    }
     const handleTouchEnd = () => {
    setStartX(null);
  };

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startX]);
  return (
    <div>
        {isSideMenuOpen &&
            <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
        }

        {isSideMenuOpen &&
            <div
            onClick={closeMenu}
             className='fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur fade-in' />
        }

        <nav className={
            clsx("fixed p-5 left-0 top-0 w-[400px] h-screen bg-white z-100 shadow-2xl transform transition-all duration-300 hide-scroll", 
                {
                    '-translate-x-full': !isSideMenuOpen
                }
            )
        }>
            <IoCloseCircleOutline size={50} className='absolute top-5 right-5 cursor-pointer' onClick={closeMenu} />
            

            <Link href={'#'} className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <HiOutlineUsers size={20}/>
                <span className='ml-3 text-xl'>Customers</span>
            </Link>
            <Link href={'#'} className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <AiOutlineProduct size={20} />
                <span className='ml-3 text-xl'>Products</span>
            </Link>

            <Link href={'#'} className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoTicketOutline size={20} />
                <span className='ml-3 text-xl'>Orders</span>
            </Link>
            <Link href={'#'} className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
                <IoSettingsOutline size={20} />
                <span className='ml-3 text-xl'>Settings</span>
            </Link>
        </nav>
    </div>
  )
}
