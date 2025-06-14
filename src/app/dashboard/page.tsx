import { verifySession } from "@/shared/auth/dal";
import { redirect } from "next/navigation";

// app/page.tsx o app/(admin)/page.tsx

export default async function Page() {
  try {
    const { user } = await verifySession();

    if (user?.roles?.includes("admin")) {
      redirect("/admin");
    }

    if (user?.roles?.includes("sales")) {
      redirect("/sales");
    }

    if (user?.roles?.includes("distributor")) {
      redirect("/distributor");
    }

    // No tiene roles válidos
    redirect("/auth/login");
  } catch (error) {
    // 🔥 Aquí se atrapan errores del verifySession (como token inválido)
    redirect("/auth/login");
  }
}