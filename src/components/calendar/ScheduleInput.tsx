import { addDays, getYear } from "date-fns";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { createSchedule } from "../../apis/calendar";
import { useCalendarStore } from "../../stores/calendarStore";
import Button from "../common/Button";

export default function ScheduleInput({
  targetDate,
  addOptimisticSchedule,
  startTransiton,
}: {
  targetDate: string;
  addOptimisticSchedule: (action: Schedule) => void;
  startTransiton: React.TransitionStartFunction;
}) {
  const { couple }: { couple: Couple } = useLoaderData();
  const [targetYear, targetMonth, targetDay] = targetDate.split("-");
  const thisYear = getYear(new Date()).toString();

  const title = useCalendarStore((state) => state.title);
  const memo = useCalendarStore((state) => state.memo);
  const { setTitle, setMemo, addSchedule } = useCalendarStore();

  const handleSubmit = () => {
    startTransiton(async () => {
      const opti: Schedule = {
        created_at: new Date().toString(),
        couple_id: couple.id,
        id: -1,
        date: targetDate,
        title,
        memo,
      };
      addOptimisticSchedule(opti);
      const date = new Date(addDays(targetDate, 1));
      const schedule = await createSchedule(couple.id, date, title, memo);
      if (schedule) {
        addSchedule(schedule);
        setTitle("");
        setMemo("");
      } else {
        toast.error("일정 등록에 실패했습니다");
      }
    });
  };
  return (
    <div
      className={twMerge(
        "flex flex-col gap-[27px] h-[453px] mt-[80px] px-[77px] py-[35px]",
        "border border-[var(--primary-pink)]"
      )}
    >
      <h2 className="text-[26px] text-[var(--primary-pink-point)]">
        선택된 날짜 - {thisYear !== targetYear && `${targetYear}년`}{" "}
        {targetMonth}월 {targetDay}일
      </h2>
      <input
        type="text"
        placeholder="제목"
        className={twMerge(
          "bg-white border-b border-[var(--primary-pink)] py-[23px] px-[34px] focus:outline-0",
          "text-xl text-[var(--gray-50)]"
        )}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="text"
        id="memo"
        placeholder="메모"
        className={twMerge(
          "bg-white h-[233px] py-[23px] px-[34px] focus:outline-0",
          "text-xl text-[var(--gray-50)] resize-none"
        )}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      {/* 이후에 버튼 컴포넌트 추가 */}
      <Button
        onClick={handleSubmit}
        className="self-end mt-[15px] px-12 py-4 rounded-[50px]"
      >
        일정 추가하기
      </Button>
    </div>
  );
}
