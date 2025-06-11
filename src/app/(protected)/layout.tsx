import { verifySession } from "@/shared/auth/dal";
import ClientWrapper from "@/shared/components/ui/ClientWrapper/ClientWrapper";
import ToastNotification from "@/shared/components/ui/toastNotification/ToastNotification";
import { ReactNode } from "react";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = await verifySession(); // Redirige a login si no está autenticado
  console.log(user);

  return (
    <ClientWrapper user={user}>
      <main className="min-h-screen">
        {children}
      </main>
      <ToastNotification/>
    </ClientWrapper>
  );
}