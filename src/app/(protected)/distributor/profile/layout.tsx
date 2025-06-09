
import ProfileTabs, { Tab } from "@/modules/auth/components/profile/ProfileTabs";
import ToastNotification from "@/shared/components/ui/toastNotification/ToastNotification";

const distributorTabs: Tab[] = [
  { name: "Profile", href: "/distributor/profile/settings", icon: "UserIcon" },
  { name: "Company", href: "/distributor/profile/company", icon: "BuildingOffice2Icon" },
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