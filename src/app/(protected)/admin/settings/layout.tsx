import { verifySession } from "@/shared/auth/dal";
import { SettingSideBar } from "@/shared/components/ui/Settings/SettingsSideBar";
import { SettingTopMenu } from "@/shared/components/ui/Settings/SettingsTopMenu";
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
    <div className="h-screen">
      {/* Sidebar (fixed) */}
      <SettingSideBar />

      {/* Content wrapper (pushes content to the right) */}
      <div className="ml-[70px]">
        {/* Top menu (fixed on top of content wrapper) */}
        <div className="fixed top-0 left-[70px] right-0 z-50 h-16 bg-[#1f2c3a]">
          <SettingTopMenu user={user} />
        </div>

        {/* Main content */}
        <main className="pt-16 px-6">{children}</main>
      </div>
    </div>
  );
}
