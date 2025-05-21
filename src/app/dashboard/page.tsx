import { verifySession } from "@/auth/dal";
import { redirect } from "next/navigation";

export default async function () {
  const { user } = await verifySession();
  console.log(user);

  if (user.roles.includes("admin")) {
    redirect("/admin");
  }

  if (user.roles.includes("seller")) {
    redirect("/seller/dashboard");
  }

  if (user.roles.includes("distributor")) {
    redirect("/distributor/dashboard");
  }

  redirect("/auth/login");
}
