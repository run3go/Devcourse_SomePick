import { twMerge } from "tailwind-merge";

export default function HeaderModal() {
  return (
    <ul className="flex flex-col text-[var(--gray-50)] absolute top-[50px] w-[130px] h-[104px] border border-[var(--primary-pink)] rounded-[20px] bg-white">
      <li
        className={twMerge(
          "basis-1/3 flex justify-center items-center border-b border-[var(--primary-pink)]",
          "rounded-t-[20px] hover:text-black cursor-pointer hover:shadow-[inset_0_0_3px_rgba(0,0,0,0.5)] hover:shadow-(color:--primary-pink-tone)"
        )}
      >
        마이 페이지
      </li>
      <li
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
  );
}
