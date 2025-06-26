import { verifySession } from "@/shared/auth/dal";
import { AdminSideBar } from "@/shared/components/ui/Roles/AdminMenu/AdminSideBar";
import { AdminTopBar } from "@/shared/components/ui/Roles/AdminMenu/AdminTopBar";
import { redirect } from "next/navigation";
import { AdminWrapper } from "./admin-wrapper";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();
  if (!user.roles.includes("admin")) {
    redirect("/auth/login");
  }
  return (
    <div className="flex h-screen">
      <AdminSideBar />

      <div className="flex-1 overflow-auto">
        <AdminTopBar user={user} />
        <AdminWrapper>{children}</AdminWrapper>
      </div>
    </div>
  );
}
