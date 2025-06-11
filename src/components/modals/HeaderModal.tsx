import { twMerge } from "tailwind-merge";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../stores/authstore";
import type { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router";

interface HeaderModalPropds {
  onClose: () => void;
}
export default function HeaderModal({ onClose }: HeaderModalPropds) {
  const setLogout = useAuthStore((state) => state.setLogout);
  const session = useAuthStore<Session | null>((state) => state.session);
  // console.log("안녕", session?.user.id);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setLogout();
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
      <ul className="flex flex-col text-[var(--gray-50)] absolute top-[50px] w-[130px] h-[104px] border border-[var(--primary-pink)] rounded-[20px] bg-white">
        <li
          onClick={handleMyProfile}
          className={twMerge(
            "basis-1/3 flex justify-center items-center border-b border-[var(--primary-pink)]",
            "rounded-t-[20px] hover:text-black cursor-pointer hover:shadow-[inset_0_0_3px_rgba(0,0,0,0.5)] hover:shadow-(color:--primary-pink-tone)"
          )}
        >
          마이 페이지
        </li>
        <li
          onClick={handleLogout}
          className={twMerge(
            "basis-1/3 flex justify-center items-center border-b border-[var(--primary-pink)]",
            "hover:text-black cursor-pointer hover:shadow-[inset_0_0_3px_rgba(0,0,0,0.5)] hover:shadow-(color:--primary-pink-tone)"
          )}
        >
          로그아웃
        </li>
        <li
          className={twMerge(
            "basis-1/3 flex justify-center items-center",
            "rounded-b-[20px] hover:text-black cursor-pointer hover:shadow-[inset_0_0_3px_rgba(0,0,0,0.5)] hover:shadow-(color:--primary-pink-tone)"
          )}
        >
          다크모드
        </li>
      </ul>
    </>
  );
}
