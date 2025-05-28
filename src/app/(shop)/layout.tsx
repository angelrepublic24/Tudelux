import { CartSideBar } from "@/components/ui/carSideBar/CartSideBar";
import { ShopTopMenu } from "@/components/ui/shop-topMenu/shopTopMenu";
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import ToastNotification from "@/components/ui/toastNotification/ToastNotification";
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

      <div className="container  mx-auto px-4 sm:px-6 lg:px-12">{children}</div>
      <ToastNotification />
    </main>
  );
}
