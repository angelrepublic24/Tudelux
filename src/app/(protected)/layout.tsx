import { verifySession } from "@/shared/auth/dal";
import ClientWrapper from "@/shared/components/ui/ClientWrapper/ClientWrapper";
import { ReactNode } from "react";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = await verifySession(); // Redirige a login si no está autenticado

  return (
    <ClientWrapper user={user}>
      <main className="min-h-screen">
        {children}
      </main>
    </ClientWrapper>
  );
}