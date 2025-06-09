import { create } from "zustand";
import { persist } from "zustand/middleware";


type AuthType = {
  userId: number | null;
  user_name: string | null;
  user_lName: string | null;
  email: string | null;
  roles: string[];
  setUser: (
    id: number,
    name: string,
    lName: string,
    email: string,
    roles: string[],
  ) => void;
};

export const useAuth = create<AuthType>()(
  persist(
    (set) => ({
      userId: null,
      user_name: null,
      user_lName: null,
      email: null,
      roles: [],
      setUser: (id, name, lName, email, roles) =>
        set({ userId: id, user_name: name, user_lName: lName, email, roles}),
    }),
    {
      name: "auth-store",
    }
  )
);