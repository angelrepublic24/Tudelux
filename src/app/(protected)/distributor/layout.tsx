import { verifySession } from "@/shared/auth/dal";
import { DistributorSideBar } from "@/shared/components/ui/Roles/distributorMenu/DistributorSideBar";
import { DistributorTopBar } from "@/shared/components/ui/Roles/distributorMenu/DistributorTopBar";
import { redirect } from "next/navigation";
import { DistributorWrapper } from "./distributor-wrapper";

export default async function DistributorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {user} = await verifySession()

  if(!user.roles.includes("distributor")){
    redirect('auth/login')
  }

  return (
    <div className="flex h-screen">
      <DistributorSideBar />

      <div className="flex-1 overflow-auto">
        <DistributorTopBar user={user} />
        <DistributorWrapper>{children}</DistributorWrapper>
      </div>
    </div>
  );
}
