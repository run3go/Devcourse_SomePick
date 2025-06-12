import { useState } from "react";
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
  const { setTitle, setMemo, setTargetDate, removeSchedule } =
    useCalendarStore();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleUpdateschedule = async () => {
    console.log("scroll");
    setTargetDate(schedule.date);
    setTitle(schedule.title);
    setMemo(schedule.memo || "");
    scrollToInput();
  };

  return (
    <>
      <li
        onClick={handleUpdateschedule}
        className="hover:text-black relative px-3 py-2 flex group hover:bg-[var(--primary-pink)] rounded-[10px] cursor-pointer"
      >
        <div className="flex items-center">
          <div className="mr-5 group-hover:animate-bounce">
            <Icon width="16px" height="16px" left="-416px" top="-694px" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="inline-block grow-1">{schedule.title}</span>
          {schedule.memo && (
            <span className="text-xs text-[var(--gray-50)] pl-3">
              {schedule.memo}
            </span>
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log("삭제 버튼 클릭");
            setIsAlertOpen(true);
          }}
          className="hidden group-hover:block absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer py-2 px-2"
        >
          <Icon
            width="12px"
            height="13px"
            left="-624px"
            top="-729px"
            className=""
          />
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
