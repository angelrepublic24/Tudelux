import { verifySession } from "@/shared/auth/dal";
import { redirect } from "next/navigation";

// app/page.tsx o app/(admin)/page.tsx

export default async function Page() {
  const { user } = await verifySession();
  console.log("Hola" + user);

  if (user?.roles?.includes("admin")) {
    redirect("/admin");
  }

  if (user?.roles?.includes("sales")) {
    redirect("/sales");
  }

  if (user?.roles?.includes("distributor")) {
    redirect("/distributor");
  }

  redirect("/auth/login");
}
