import { formatDate, isSameDay } from "date-fns";
import { twMerge } from "tailwind-merge";
import { useCalendarStore } from "../../stores/calendarStore";
import { compareDate } from "../../utils/date";
import LoadingSpinner from "../common/LoadingSpinner";
import ScheduleItem from "./ScheduleItem";

export default function ShowScheduleList({
  schedules,
  isPending,
  scrollToInput,
}: {
  schedules: Schedule[];
  isPending: boolean;
  scrollToInput: () => void;
}) {
  const targetDate = useCalendarStore((state) => state.targetDate);

  const upcomingSchedules = [...schedules]
    .sort((a, b) => compareDate(new Date(b.date), new Date(a.date)))
    .filter(
      (schedule) =>
        Math.trunc(compareDate(new Date(schedule.date), new Date())) <
        1000 * 60 * 60 * 24
    )
    .filter((schedule, _, arr) => schedule.date === arr[0].date);
  let upcomingDate: Date | null = null;

  if (upcomingSchedules.length > 0) {
    upcomingDate = new Date(upcomingSchedules[0].date);
  }

  const targetDateSchedules = schedules.filter((schedule) => {
    const dateA = new Date(schedule.date);
    const dateB = new Date(targetDate);
    return isSameDay(dateA, dateB);
  });

  const today = formatDate(new Date(), "yyyy-M-dd");
  return (
    <div
      className={twMerge(
        "flex flex-col px-4 py-7 h-[565px] border border-[var(--primary-pink)]",
        "dark:bg-[var(--dark-bg-secondary)] rounded-[30px]"
      )}
    >
      <h2 className="text-center font-semibold text-xl text-[var(--primary-pink-point)] border-b border-[var(--primary-pink)] pb-[10px] mb-[18px]">
        {targetDate === today ? "다음 일정" : "선택 일정"}
      </h2>
      <h3
        className={twMerge(
          "text-xl font-bold border-l-8 border-[var(--primary-pink)] pl-5",
          "dark:text-[var(--dark-gray-200)]"
        )}
      >
        {targetDate === today ? (
          upcomingDate && <span>{formatDate(upcomingDate, "M월 dd일")}</span>
        ) : (
          <span>{formatDate(targetDate, "M월 dd일")}</span>
        )}
      </h3>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <ul className="flex flex-col gap-4 mt-5">
          {targetDate === today
            ? upcomingSchedules.map((schedule) => (
                <ScheduleItem
                  key={schedule.id}
                  schedule={schedule}
                  scrollToInput={scrollToInput}
                />
              ))
            : targetDateSchedules.map((schedule) => (
                <ScheduleItem
                  key={schedule.id}
                  schedule={schedule}
                  scrollToInput={scrollToInput}
                />
              ))}
        </ul>
      )}
    </div>
  );
}
