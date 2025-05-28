"use client";

import {
  BuildingOffice2Icon,
  UserIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const iconMap = {
  UserIcon,
  BuildingOffice2Icon,
};

export type Tab = {
  name: string;
  href: string;
  icon: keyof typeof iconMap; // 👈 ahora es 'UserIcon' | 'BuildingOffice2Icon'
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileTabs({ tabs }: { tabs: Tab[] }) {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = tabs.find((tab) => tab.href === pathname) ?? tabs[0];

  return (
    <div className="mb-5">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-[#ff5100] focus:ring-[#ff5100]"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            router.push(e.target.value)
          }
          value={currentTab.href}
        >
          {tabs.map((tab) => (
            <option value={tab.href} key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = iconMap[tab.icon]; // 👈 Aquí se obtiene el componente dinámicamente
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    pathname === tab.href
                      ? "border-[#ff5100] text-[#ff5100]"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                >
                  <Icon
                    className={classNames(
                      pathname === tab.href
                        ? "text-[#ff5100]"
                        : "text-gray-400 group-hover:text-gray-500",
                      "-ml-0.5 mr-2 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
