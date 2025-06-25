import { verifySession } from "@/shared/auth/dal";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user } = await verifySession();

  if (user?.roles?.includes("admin")) return redirect("/admin");
  if (user?.roles?.includes("sales")) return redirect("/sales");
  if (user?.roles?.includes("distributor")) return redirect("/distributor");
  if (user?.roles?.includes("business_dev")) return redirect("/business-developer");


  return redirect("/auth/login");
}
