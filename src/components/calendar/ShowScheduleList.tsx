import { formatDate, isSameDay } from "date-fns";
import { useCalendarStore } from "../../stores/calendarStore";
import { compareDate } from "../../utils/date";
import LoadingSpinner from "../common/LoadingSpinner";
import ScheduleItem from "./ScheduleItem";

export default function ShowScheduleList({
  schedules,
  isPending,
}: {
  schedules: Schedule[];
  isPending: boolean;
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
  return (
    <div className="flex flex-col px-4 py-7 h-[565px] border border-[var(--primary-pink)]">
      <h2 className="text-center font-semibold text-xl text-[var(--primary-pink-point)] border-b pb-[10px] mb-[18px]">
        {targetDate === "" ? "다음 일정" : "현재 일정"}
      </h2>
      <h3 className="text-xl font-bold border-l-8 border-[var(--primary-pink)] pl-5">
        {targetDate ? (
          <span>{formatDate(targetDate, "M월 dd일")}</span>
        ) : (
          upcomingDate && <span>{formatDate(upcomingDate, "M월 dd일")}</span>
        )}
      </h3>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <ul className="flex flex-col gap-4 mt-5">
          {targetDate
            ? targetDateSchedules.map((schedule) => (
                <ScheduleItem key={schedule.id} schedule={schedule} />
              ))
            : upcomingSchedules.map((schedule) => (
                <ScheduleItem key={schedule.id} schedule={schedule} />
              ))}
        </ul>
      )}
    </div>
  );
}
