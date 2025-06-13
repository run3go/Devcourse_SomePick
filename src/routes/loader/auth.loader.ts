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

// 로그인한 사용자만 접근 가능한 페이지
export const requireAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }
};

// 비로그인만 접근 가능한 페이지
export const requireNoAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }
};
