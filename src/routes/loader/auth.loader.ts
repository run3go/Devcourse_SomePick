import { redirect } from "react-router";
import { checkHasProfile } from "../../apis/auth";
import { useAuthStore } from "../../stores/authStore";
import supabase from "../../utils/supabase";

export const fetchUserData = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const setLogin = useAuthStore.getState().setLogin;
    const setSession = useAuthStore.getState().setSession;
    setLogin(session);
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "USER_UPDATED") {
        if (session) {
          setSession(session);
        }
      }
    });
    const data = await checkHasProfile(session.user.id);
    if (!data?.nickname) {
      return redirect("/auth/signup");
    }
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
