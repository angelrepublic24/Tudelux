
import { CartSideBar } from "@/shared/components/ui/cartSideBar/CartSideBar";
import { ShopTopMenu } from "@/shared/components/ui/shop-topMenu/shopTopMenu";
import { Sidebar } from "@/shared/components/ui/sidebar/sidebar";
import ToastNotification from "@/shared/components/ui/toastNotification/ToastNotification";
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
      <ToastNotification />
    </main>
  );
}
