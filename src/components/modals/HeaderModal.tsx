import { twMerge } from "tailwind-merge";

import type { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { logoutUser } from "../../apis/auth";
import { useAuthStore } from "../../stores/authStore";

interface HeaderModalPropds {
  onClose: () => void;
}

export default function HeaderModal({ onClose }: HeaderModalPropds) {
  const setLogout = useAuthStore((state) => state.setLogout);
  const session = useAuthStore<Session | null>((state) => state.session);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setLogout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleMyProfile = () => {
    if (session?.user.id) {
      navigate(`/profile/${session.user.id}`);
      onClose();
    }
  };
  return (
    <>
      <ul className="flex flex-col text-[var(--gray-50)] dark:text-[var(--dark-gray-700)] absolute top-[50px] w-[130px] h-[80px] border border-[var(--primary-pink)] rounded-[20px] bg-[var(--white)] dark:bg-[var(--dark-bg-primary)]">
        <li
          onClick={handleMyProfile}
          className={twMerge(
            "basis-1/2 flex justify-center items-center border-b border-[var(--primary-pink)]",
            "rounded-t-[20px] hover:text-black dark:hover:text-[var(--dark-gray-100)] cursor-pointer hover:shadow-[inset_0_0_3px_rgba(0,0,0,0.5)] hover:shadow-(color:--primary-pink-tone)"
          )}
        >
          마이 페이지
        </li>
        <li
          onClick={handleLogout}
          className={twMerge(
            "basis-1/2 flex justify-center items-center border-b border-[var(--primary-pink)]",
            "hover:text-black cursor-pointer rounded-b-[20px] dark:hover:text-[var(--dark-gray-100)] hover:shadow-[inset_0_0_3px_rgba(0,0,0,0.5)] hover:shadow-(color:--primary-pink-tone)"
          )}
        >
          로그아웃
        </li>
      </ul>
    </>
  );
}
