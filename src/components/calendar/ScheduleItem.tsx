import { formatDate } from "date-fns";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { deleteSchedule } from "../../apis/calendar";
import { useCalendarStore } from "../../stores/calendarStore";
import Alert from "../common/Alert";
import Icon from "../common/Icon";

export default function ScheduleItem({
  schedule,
  scrollToInput,
}: {
  schedule: Schedule;
  scrollToInput: () => void;
}) {
  const { setTitle, setMemo, setId, setTargetDate, removeSchedule } =
    useCalendarStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleUpdateschedule = async () => {
    const formattedDate = formatDate(new Date(schedule.date), "yyyy-M-dd");
    setId(schedule.id);
    setTargetDate(formattedDate);
    setTitle(schedule.title);
    setMemo(schedule.memo || "");
    scrollToInput();
  };

  return (
    <>
      <li
        onClick={handleUpdateschedule}
        className={twMerge(
          "hover:text-black relative px-3 py-2 flex items-center group hover:bg-[var(--primary-pink)] rounded-[10px] cursor-pointer",
          "dark:hover:bg-[var(--primary-pink-tone)] h-[56px]"
        )}
      >
        <div className="flex items-center">
          <div className="mr-5 group-hover:animate-bounce">
            <Icon width="16px" height="16px" left="-416px" top="-694px" />
          </div>
        </div>
        <div className="flex flex-col pr-4">
          <span className="inline-block grow-1 dark:text-[var(--dark-gray-200)] text-black">
            {schedule.title}
          </span>
          {schedule.memo && (
            <span className="text-xs text-[var(--gray-50)] pl-3 dark:text-[var(--dark-gray-500)] ">
              {schedule.memo}
            </span>
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsAlertOpen(true);
          }}
          className="hidden group-hover:block absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer py-2 px-2"
        >
          <Icon width="12px" height="13px" left="-624px" top="-729px" />
        </div>
      </li>
      {isAlertOpen && (
        <Alert
          title="정말 삭제하시겠습니까"
          isOk="네"
          isNotOk="취소"
          onClick={() => {
            deleteSchedule(schedule.id);
            removeSchedule(schedule.id);
          }}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
}
