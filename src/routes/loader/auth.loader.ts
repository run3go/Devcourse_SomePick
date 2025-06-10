import { useAuthStore } from "../../stores/authstore";
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
