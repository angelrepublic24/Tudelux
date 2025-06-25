import { verifySession } from "@/shared/auth/dal";
import { AdminSideBar } from "@/shared/components/ui/Roles/AdminMenu/AdminSideBar";
import { AdminTopBar } from "@/shared/components/ui/Roles/AdminMenu/AdminTopBar";
import { redirect } from "next/navigation";

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

      <AdminTopBar user={user} />
      <div className="flex-1 overflow-auto ">
        <div className="ml-[70px]">
          <main className="pt-16">{children}</main>
        </div>
      </div>
    </div>
  );
}
