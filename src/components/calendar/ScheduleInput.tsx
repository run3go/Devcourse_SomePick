import { twMerge } from "tailwind-merge";
import Button from "../common/Button";

export default function ScheduleInput() {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-[27px] h-[453px] mt-[80px] px-[77px] py-[35px]",
        "border border-[var(--primary-pink)]"
      )}
    >
      <h2 className="text-[26px] text-[var(--primary-pink-point)]">
        선택된 날짜 - 6월 19일
      </h2>
      <input
        type="text"
        placeholder="제목"
        className={twMerge(
          "bg-white border-b border-[var(--primary-pink)] py-[23px] px-[34px] focus:outline-0",
          "text-xl text-[var(--gray-50)]"
        )}
      />
      <textarea
        name="text"
        id="memo"
        placeholder="메모"
        className={twMerge(
          "bg-white h-[233px] py-[23px] px-[34px] focus:outline-0",
          "text-xl text-[var(--gray-50)] resize-none"
        )}
      />
      {/* 이후에 버튼 컴포넌트 추가 */}
      <Button className="self-end mt-[15px] px-12 py-4 rounded-[50px]">
        일정 추가하기
      </Button>
    </div>
  );
}
