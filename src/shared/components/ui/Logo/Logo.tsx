import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      src="/logo-white.svg"
      alt="Tudelu Logo"
      width={0}
      height={0}
      priority
      className="w-1/2 lg:w-full"
    />
  );
}