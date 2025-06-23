import { verifySession } from "@/shared/auth/dal";
import { DistributorSideBar } from "@/shared/components/ui/distributorMenu/DistributorSideBar";
import { DistributorTopBar } from "@/shared/components/ui/distributorMenu/DistributorTopBar";
import { SalesSideBar } from "@/shared/components/ui/Sales/sales-sidebar";
import { SalesTopBar } from "@/shared/components/ui/Sales/sales-top-menu";
import { redirect } from "next/navigation";

export default async function DistributorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();

  if (!user.roles.includes("sales")) {
    redirect("auth/login");
  }

  return (
    <div className="flex h-screen">
      <SalesSideBar />

      <div className="flex-1 overflow-auto ">
        <SalesTopBar user={user} />
        <div className="ml-[70px]">
          <main className="pt-16 px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
