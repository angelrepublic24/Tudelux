import { verifySession } from "@/shared/auth/dal";
import { BusinessDevSideBar } from "@/shared/components/ui/Roles/businessDeveloper/businessDev-sidebar";
import { BusinessDevTopBar } from "@/shared/components/ui/Roles/businessDeveloper/businessDev-top-menu";
import { DistributorSideBar } from "@/shared/components/ui/Roles/distributorMenu/DistributorSideBar";
import { DistributorTopBar } from "@/shared/components/ui/Roles/distributorMenu/DistributorTopBar";
import { SalesSideBar } from "@/shared/components/ui/Roles/Sales/sales-sidebar";
import { SalesTopBar } from "@/shared/components/ui/Roles/Sales/sales-top-menu";
import { redirect } from "next/navigation";
import { BusinessDevWrapper } from "./businessdev-wrapper";

export default async function DistributorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();

  if (!user.roles.includes("business_dev")) {
    redirect("auth/login");
  }

  return (
    <div className="flex h-screen">
      <BusinessDevSideBar />

      <div className="flex-1 overflow-auto ">
        <BusinessDevTopBar user={user} />
        <BusinessDevWrapper>{children}</BusinessDevWrapper>
      </div>
    </div>
  );
}
