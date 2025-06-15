import { getDate, getDay, getMonth, getYear } from "date-fns";
import { twMerge } from "tailwind-merge";
import { useCalendarStore } from "../../stores/calendarStore";

export default function DateItem({
  item,
  date,
  showScrollBtn,
  schedules,
}: {
  item: number;
  date: Date;
  showScrollBtn: () => void;
  schedules: Schedule[];
}) {
  const targetDate = useCalendarStore((state) => state.targetDate);
  const setTargetDate = useCalendarStore((state) => state.setTargetDate);

  const [targetYear, targetMonth, targetDay] = targetDate
    .split("-")
    .map(Number);

  const thisYear = getYear(new Date());
  const thisMonth = getMonth(new Date());
  const thisDay = getDay(new Date());

  const year = getYear(date);
  const month = getMonth(date);
  const day = getDate(date);

  const selectDate = () => {
    showScrollBtn();
    setTargetDate([year, month + 1, item].join("-"));
  };

  const today = day === item && thisMonth === month && thisYear === year;
  const selectedDate =
    targetDay === item && targetMonth === month + 1 && targetYear === year;

  return (
    <div
      onClick={selectDate}
      key={item}
      className={twMerge(
        "group relative basis-1/7 text-[#bdbdbd] border-t-3 rounded-lg border-t-transparent hover:rounded-lg h-25 hover:bg-[var(--gray-200)] cursor-pointer",
        today && "border-t-[var(--primary-pink-point)]",
        selectedDate && "bg-[#ffebf0] hover:bg-[#ffebf0]"
      )}
    >
      {schedules.length > 2 && (
        <span
          className={twMerge(
            "absolute top-[10px] right-[10px] text-sm font-bold text-[var(--primary-pink-tone)]",
            selectedDate && "text-[#E870A2]"
          )}
        >
          +{schedules.length - 2}
        </span>
      )}
      <div className={twMerge("leading-[1] inline-block")}>
        <div
          className={twMerge(
            "relative w-[55px] h-[24.5px] text-center text-2xl"
          )}
        >
          {item < 1 ? null : (
            <span
              className={twMerge(
                today &&
                  (thisDay === 0
                    ? "text-[var(--primary-pink-tone)] font-bold"
                    : "text-[var(--gray-700)] font-bold"),
                selectedDate && "text-[#E870A2] font-bold"
              )}
            >
              {item}
            </span>
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-[3px] text-[13px] px-3">
        {schedules &&
          schedules
            .map((schedule) => (
              <li
                key={schedule.id}
                className={twMerge(
                  "font-[inter] overflow-hidden text-ellipsis text-nowrap py-[1px] pl-[10px] pr-[3px] bg-[var(--primary-pink-tone)] inline-block w-23 rounded-[5px] text-white",
                  selectedDate && "bg-[#E870A2]"
                )}
              >
                {schedule.title}
              </li>
            ))
            .slice(0, 2)}
      </ul>
    </div>
  );
}
