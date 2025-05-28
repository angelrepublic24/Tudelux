import { verifySession } from "@/auth/dal";
import { AdminSideBar } from "@/components/ui/AdminMenu/AdminSideBar";
import { AdminTopBar } from "@/components/ui/AdminMenu/AdminTopBar";
import { DistributorSideBar } from "@/components/ui/distributorMenu/DistributorSideBar";
import { DistributorTopBar } from "@/components/ui/distributorMenu/DistributorTopBar";
import { redirect } from "next/navigation";

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

      <div className="flex-1 overflow-auto pl-[280px]">
        <DistributorTopBar user={user} />

        <main className="pt-16 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
