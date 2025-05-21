import { AdminSideBar } from "@/components/ui/AdminMenu/AdminSideBar";
import { AdminTopBar } from "@/components/ui/AdminMenu/AdminTopBar";
import { DistributorSideBar } from "@/components/ui/distributorMenu/DistributorSideBar";
import { DistributorTopBar } from "@/components/ui/distributorMenu/DistributorTopBar";

export default function DistributorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <DistributorSideBar />

      <div className="flex-1 overflow-auto pl-[280px]">
        <DistributorTopBar />

        <main className="pt-16 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
