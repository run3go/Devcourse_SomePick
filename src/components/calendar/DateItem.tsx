import { getDate, getMonth, getYear } from "date-fns";
import { twMerge } from "tailwind-merge";
import { useCalendarStore } from "../../stores/calendarStore";

export default function DateItem({
  item,
  date,
  schedules,
}: {
  item: number;
  date: Date;
  schedules: Schedule[];
}) {
  const targetDate = useCalendarStore((state) => state.targetDate);
  const setTargetDate = useCalendarStore((state) => state.setTargetDate);
  const [targetYear, targetMonth, targetDay] = targetDate
    .split("-")
    .map(Number);
  const thisYear = getYear(new Date());
  const thisMonth = getMonth(new Date());
  const year = getYear(date);
  const month = getMonth(date);
  const day = getDate(date);
  return (
    <div key={item} className="basis-1/7 h-25">
      <div className={twMerge("pb-[14px] leading-[1] inline-block")}>
        <div
          className={twMerge("relative w-[55px] h-[22px] text-center text-2xl")}
        >
          {item < 1 ? null : (
            <span
              onClick={() => setTargetDate([year, month + 1, item].join("-"))}
              className={twMerge(
                day === item &&
                  thisMonth === month &&
                  thisYear === year &&
                  "circle-bg",
                "gray-circle-bg cursor-pointer",
                targetDay === item &&
                  targetMonth === month + 1 &&
                  targetYear === year &&
                  "gray-circle__active"
              )}
            >
              {item}
            </span>
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-[3px] text-[13px] pt-[2px] mt-[3px]">
        {schedules &&
          schedules
            .map((schedule) => (
              <li
                key={schedule.id}
                className="font-[inter] overflow-hidden text-ellipsis text-nowrap pl-[13px] bg-[var(--primary-pink-tone)] inline-block w-20 rounded-[5px] text-white"
              >
                {schedule.title}
              </li>
            ))
            .slice(0, 2)}
      </ul>
    </div>
  );
}
