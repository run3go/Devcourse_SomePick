import { addDays, getYear } from "date-fns";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { createSchedule } from "../../apis/calendar";
import { notifySchedule } from "../../apis/notification";
import { useAuthStore } from "../../stores/authStore";
import { useCalendarStore } from "../../stores/calendarStore";
import Button from "../common/Button";

export default function ScheduleInput({
  addOptimisticSchedule,
  startTransiton,
  scrollRef,
}: {
  addOptimisticSchedule: (action: Schedule) => void;
  startTransiton: React.TransitionStartFunction;
  scrollRef: React.RefObject<HTMLInputElement | null>;
}) {
  const targetDate = useCalendarStore((state) => state.targetDate);
  const { couple }: { couple: Couple } = useLoaderData();
  const [targetYear, targetMonth, targetDay] = targetDate.split("-");
  const thisYear = getYear(new Date()).toString();

  const id = useCalendarStore((state) => state.id);
  const title = useCalendarStore((state) => state.title);
  const memo = useCalendarStore((state) => state.memo);
  const { setTitle, setMemo, setId, addSchedule, updateSchedule } =
    useCalendarStore();

  const session = useAuthStore((state) => state.session);

  const partnerInfo =
    session?.user.id === couple.user1.id ? couple.user2 : couple.user1;

  const handleSubmit = () => {
    if (!title.trim().length) {
      toast.warn("제목을 입력해주세요");
      return;
    }
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
      const schedule = await createSchedule(couple.id, date, title, memo, id);
      if (schedule) {
        if (id) {
          updateSchedule(schedule);
        } else {
          addSchedule(schedule);
          await notifySchedule(partnerInfo.id);
        }
        setTitle("");
        setMemo("");
        setId(0);
        scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error("일정 등록에 실패했습니다");
      }
    });
  };
  if (targetDate)
    return (
      <div
        ref={scrollRef}
        className={twMerge(
          "flex flex-col gap-[27px] h-[453px] mt-[80px] px-[77px] py-[35px] rounded-[30px]",
          "border border-[var(--primary-pink)] mb-[150px] dark:bg-[var(--dark-bg-secondary)]"
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
            "text-xl text-[var(--gray-50)] dark:bg-[var(--dark-bg-secondary)]",
            "dark:placeholder:text-[var(--dark-gray-500)] dark:text-[var(--gray-200)]",
            "dark:border-0"
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
            "text-xl text-[var(--gray-50)] resize-none dark:bg-[var(--dark-bg-secondary)]",
            "dark:placeholder:text-[var(--dark-gray-500)] dark:text-[var(--gray-200)]"
          )}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        {/* 이후에 버튼 컴포넌트 추가 */}
        <Button
          onClick={handleSubmit}
          className="self-end mt-[15px] px-12 py-4 rounded-[50px]"
        >
          {id ? "일정 수정하기 " : "일정 추가하기"}
        </Button>
      </div>
    );
}
