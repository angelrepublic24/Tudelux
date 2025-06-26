import { verifySession } from "@/shared/auth/dal";
import { DistributorSideBar } from "@/shared/components/ui/Roles/distributorMenu/DistributorSideBar";
import { DistributorTopBar } from "@/shared/components/ui/Roles/distributorMenu/DistributorTopBar";
import { SalesSideBar } from "@/shared/components/ui/Roles/Sales/sales-sidebar";
import { SalesTopBar } from "@/shared/components/ui/Roles/Sales/sales-top-menu";
import { redirect } from "next/navigation";
import { SalesWrapper } from "./sales-wrapper";

export default async function SalesLayout({
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

      {/* Contenedor principal donde el client wrapper irá */}
      <div className="flex-1 overflow-auto">
        <SalesTopBar user={user} />
        <SalesWrapper>{children}</SalesWrapper>
      </div>
    </div>
  );
}
