import { verifySession } from "@/auth/dal";
import { AdminSideBar } from "@/components/ui/AdminMenu/AdminSideBar";
import { AdminTopBar } from "@/components/ui/AdminMenu/AdminTopBar";
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

      <div className="flex-1 overflow-auto pl-[280px]">
        <AdminTopBar user={user} />

        <main className="pt-16">{children}</main>
      </div>
    </div>
  );
}
