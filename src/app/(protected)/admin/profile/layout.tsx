
import ProfileTabs, { Tab } from "@/modules/auth/components/profile/ProfileTabs";
import ToastNotification from "@/shared/components/ui/toastNotification/ToastNotification";
import { BuildingOffice2Icon, UserIcon } from "@heroicons/react/20/solid";


const distributorTabs: Tab[] = [
  { name: "Profile", href: "/admin/profile/settings", icon: "UserIcon" },
  { name: "Company", href: "/admin/profile/company", icon: "BuildingOffice2Icon" },
];

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <ProfileTabs tabs={distributorTabs} />
        {children}
        <ToastNotification />
    </>
  );
}