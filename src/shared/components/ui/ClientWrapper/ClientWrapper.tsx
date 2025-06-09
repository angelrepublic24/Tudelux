"use client";
import { useAuth } from "@/shared/store/ui/useAuth";
import { useEffect } from "react";

type Props = {
  user: Partial<{
    id: number;
    name: string;
    lName: string;
    email: string;
    roles: string[];
  }>;
  children: React.ReactNode;
};

export default function ClientWrapper({ user, children }: Props) {
  const setUser = useAuth((s) => s.setUser);
  const currentUserId = useAuth((s) => s.userId)

  useEffect(() => {
    if (user.id !== currentUserId) {
      setUser(user.id, user.name, user.lName, user.email, user.roles,);
    }
  }, [user]);

  return <>{children}</>;
}
