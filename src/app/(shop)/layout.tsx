import { CartSideBar } from "@/components/ui/carSideBar/CartSideBar";
import { ShopTopMenu } from "@/components/ui/shop-topMenu/shopTopMenu";
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ShopTopMenu />
      <Sidebar />
      <CartSideBar />

      <div className="">{children}</div>
    </main>
  );
}
