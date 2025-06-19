import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type AuthStore = {
  isLogin: boolean;
  session: Session | null;
  setSession: (session: Session) => void;
  setLogin: (userData: Session) => void;
  setLogout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    immer((set) => ({
      isLogin: false,
      session: null,
      setSession: (session) =>
        set((state) => {
          state.session = session;
        }),
      setLogin: (userData: Session) =>
        set((state) => {
          state.isLogin = true;
          state.session = userData;
        }),
      setLogout: () =>
        set((state) => {
          state.isLogin = false;
          state.session = null;
        }),
    }))
  )
);
