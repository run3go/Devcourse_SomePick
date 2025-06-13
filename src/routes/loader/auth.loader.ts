import { redirect } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import supabase from "../../utils/supabase";

export const fetchUserData = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const setLogin = useAuthStore.getState().setLogin;
    setLogin(session);
  }
};

export const requireAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/auth/login");
  }
};

export const requireNoAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }
};

export const requireNoInfo = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.user_metadata.nickname) {
    return redirect("/");
  }
};
