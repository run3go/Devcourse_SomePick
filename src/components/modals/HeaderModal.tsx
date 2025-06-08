import { twMerge } from "tailwind-merge";

export default function HeaderModal() {
  return (
    <ul className="flex flex-col text-[var(--sub-gray-color)] absolute top-[40px] w-[130px] h-[104px] border border-[var(--sub-pink-color)] rounded-[20px] bg-white">
      <li
        className={twMerge(
          "basis-1/3 flex justify-center items-center border-b border-[var(--sub-pink-color)]",
          "rounded-t-[20px] hover:text-black cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-(color:--hover-pink-color)"
        )}
      >
        마이 페이지
      </li>
      <li
        className={twMerge(
          "basis-1/3 flex justify-center items-center border-b border-[var(--sub-pink-color)]",
          "hover:text-black cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-(color:--hover-pink-color)"
        )}
      >
        로그아웃
      </li>
      <li
        className={twMerge(
          "basis-1/3 flex justify-center items-center",
          "rounded-b-[20px] hover:text-black cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-(color:--hover-pink-color)"
        )}
      >
        다크모드
      </li>
    </ul>
  );
}
