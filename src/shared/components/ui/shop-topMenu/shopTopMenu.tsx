'use client'

import { ChevronDown } from "lucide-react"
import { ShopDropdown } from "./shopDropDown"


export function ShopTopMenu() {
  return (
    <header className="bg-[#ff5100] h-28 relative z-50">
      <div className="max-w-8xl mx-auto px-8 lg:px-4 py-4 flex justify-between xl:justify-around items-center h-28">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="https://tudelu.com/hubfs/logo-white.svg" alt="Tudelu" className="h-8" />
        </a>

        {/* Navigation */}
        <nav className="hidden xl:flex space-x-8 items-center">
          <span className="text-white text-lg font-medium">Our Divisions: </span>

          {/* Canopies */}
          <div className="relative group">
            <a href="#" className="text-white text-base font-medium transition flex items-center">Canopies <ChevronDown size={20}/></a>
            <div className="absolute top-10 z-50 left-1/2 transform -translate-x-1/2 w-[340px] bg-white rounded-xl shadow-xl p-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 -z-10"></div>
              <p className="text-base text-[#ff5100] font-semibold mb-2">Tudelu Canopies</p>
              <div className="gap-4 space-y-4 text-sm text-gray-700">
                <p>Canopies are the perfect way to make an initial impression that is as unique as your personal style combining form and function for any building.</p>
                <p>Choose between 6” or 8” extruded frames, customizable color options and base styles to take the guesswork out of design</p>
                <p>Completely customizable options to fit your aesthetic from residential to commercial and more</p>
                <p>Built and branded by commercial, but delicate enough for residential design.</p>
              </div>
            </div>
          </div>

          {/* Partition Walls */}
          <div className="relative group">
            <a href="#" className="text-white text-base font-medium transition flex items-center">Partition Walls  <ChevronDown size={20}/></a>
            <div className="absolute z-50 top-10 left-1/2 transform -translate-x-1/2 w-[340px] bg-white rounded-xl shadow-xl p-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 -z-10"></div>
              <p className="text-base text-[#ff5100] font-semibold mb-2">Tudelu Partitions</p>
              <div className="gap-4 space-y-4 text-sm text-gray-700">
                <p>Partitions are the perfect way to take back your space, cutting out distractions to give your space the ability to adapt to your needs</p>
                <p>Motorized retractable wall with double-sided decorative finish</p>
                <p>Heavy, sturdy vinyl and a 6" wall thickness create a 48 STC sound barrier</p>
                <p>Ideal for residential, commercial, and military installations</p>
              </div>
            </div>
          </div>

          {/* Pergolas */}
          <div className="relative group">
            <a href="#" className="text-white text-base font-medium transition flex items-center">Pergolas <ChevronDown size={20} /></a>
            <div className="absolute top-10 z-50 left-1/2 transform -translate-x-1/2 w-[340px] bg-white rounded-xl shadow-xl p-6 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 -z-10"></div>
              <p className="text-sm text-[#ff5100] font-semibold mb-2">Tudelu Pergolas</p>
              <div className="gap-4 space-y-4 text-sm text-gray-700">
                <p>Fully customizable, super sleek, and built to flex with your needs.</p>
                <p>Fully customizable from design to draining, lighting and air control.</p>
                <p>Give the look and feel of many materials with the long term stability of metal.</p>
                <p>Turn any location into your personal paradise, residential, commercial and more.</p>
              </div>
            </div>
          </div>

          <div className="w-[2px] h-8 bg-black"></div>
          <a href="/about" className="text-white text-base font-medium transition">About</a>
          <a href="/resources" className="text-white text-base font-medium transition">Resources</a>
          <a href="/installations" className="text-white text-base font-medium transition">Installations</a>
          <a href="/contact" className="text-white text-base font-medium transition">Contact</a>
        </nav>

        {/* Start Design Button with Modal */}
        <nav className="hidden xl:flex space-x-8">
          <ShopDropdown />
        </nav>

        {/* Mobile burger */}
        <div id="burger-button" className="xl:hidden flex flex-col space-y-1 cursor-pointer">
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </div>
      </div>
    </header>
  )
}