import { useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "../../utils/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
      if (error) {
        console.error(error);
      }
    };
    handleAuth();
  }, [navigate]);

  return null;
}
