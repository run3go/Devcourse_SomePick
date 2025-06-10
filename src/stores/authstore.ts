import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type AuthStore = {
  isLoggedIn: boolean;
  session: Session | null;

  setLogin: (userData: Session) => void;
  setLogout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    immer((set) => ({
      isLoggedIn: false,
      session: null,
      setLogin: (userData) =>
        set((state) => {
          state.isLoggedIn = true;
          state.session = userData;
        }),
      setLogout: () =>
        set((state) => {
          state.isLoggedIn = false;
          state.session = null;
        }),
    }))
  )
);
