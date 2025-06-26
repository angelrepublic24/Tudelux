"use client";

import { useState } from "react";
import { AlignJustify, ChevronDown, User } from "lucide-react";
import { ShopDropdown } from "./shopDropDown";
import { IoCartOutline } from "react-icons/io5";
import { useUIStore } from "@/shared/store/ui/ui-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { mainMenuItems } from "./MenuContent";
import { Button } from "@/components/ui/button";

export function ShopTopMenu() {
  const openCart = useUIStore((s) => s.toggleCart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerBg = isHome ? "bg-[#ff5100]" : "bg-[#f3f4f6]";

  return (
    <>
      <header className={`${headerBg} h-20 relative z-50`}>
        <div className="max-w-8xl mx-auto px-4 py-4 flex justify-between items-center h-20">
          {/* Burger Button (mobile) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`xl:hidden ${isHome ? "text-white" : "text-[#ff5100]"}`}
          >
            <AlignJustify size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            {isHome ? (
              <Image
                src="https://tudelu.com/hubfs/logo-white.svg"
                alt="Tudelu"
                className="h-8"
                width={150}
                height={50}
              />
            ) : (
              <Image
                src="/logo-orange.svg"
                alt="Tudelu"
                className="h-8"
                width={150}
                height={50}
              />
            )}
          </Link>

          {/* Login + Cart (mobile) */}
          <div className="xl:hidden flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/auth/login")}
              className={`${isHome ? "text-white" : "text-[#ff5100]"}`}
              aria-label="Login"
            >
              <User size={22} />
            </button>

            <button onClick={openCart} aria-label="Cart">
              <IoCartOutline
                size={22}
                color={`${isHome ? "#ffffff" : "#ff5100"}`}
              />
            </button>
          </div>

          {/* Navigation (Desktop) */}
          <nav
            className={`hidden xl:flex space-x-8 items-center ${
              isHome ? "text-white" : "text-black"
            }`}
          >
            <span className="text-base font-medium leading-[20px]">
              Our Divisions:
            </span>

            {mainMenuItems.map((item, idx) => {
              if (item.type === "separator") {
                return (
                  <div
                    key={`sep-${idx}`}
                    className="w-[1px] h-8 bg-black rounded-xl"
                  />
                );
              }

              return (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`text-base font-medium transition flex items-center leading-[20px] hover:underline ${
                      isHome ? "decoration-[#ece83a]" : "decoration-[#ff5100]"
                    } underline-offset-4`}
                  >
                    {item.label}
                    {item.content && <ChevronDown size={20} className="ml-1" />}
                  </Link>

                  {item.content && (
                    <div className="absolute top-10 z-50 left-1/2 transform -translate-x-1/2 w-[340px] bg-white rounded-xl shadow-xl p-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 -z-10"></div>
                      <p className="text-base text-[#ff5100] font-semibold mb-2">
                        {item.content.title}
                      </p>
                      <div className="gap-4 space-y-4 text-sm text-gray-700">
                        {item.content.description.map((desc, i) => (
                          <p key={i}>{desc}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Cart & Dropdown (Desktop) */}
          <nav className="hidden xl:flex space-x-4">
            <Button
              variant="ghost"
              onClick={openCart}
              className="hover:bg-white/10"
            >
              <IoCartOutline
                className="h-5 w-5"
                color={`${isHome ? "#ffffff" : "#000000"}`}
              />
            </Button>
            <ShopDropdown isHome={isHome} />
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 px-6 py-6 overflow-y-auto transition-transform duration-300 ease-in-out">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-bold text-[#ff5100]">Menu</p>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close"
              className="text-gray-500 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex flex-col gap-3 text-[17px] font-medium text-gray-800">
            <Link
              href="/canopies"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-[#ff5100]/10 transition"
            >
              Canopies
            </Link>
            <Link
              href="/partition-walls"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-[#ff5100]/10 transition"
            >
              Partition Walls
            </Link>
            <Link
              href="/pergolas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-[#ff5100]/10 transition"
            >
              Pergolas
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-[#ff5100]/10 transition"
            >
              About
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-[#ff5100]/10 transition"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-[#ff5100]/10 transition"
            >
              Contact
            </Link>
            <Link
              href="/request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-[#ff5100]/10 transition"
            >
              Request Quote
            </Link>
            <Link
              href="/auth/register/distributor"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-md hover:bg-[#ff5100]/10 transition"
            >
              Become a Distributor
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
