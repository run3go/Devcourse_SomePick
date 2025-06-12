import { useState } from "react";
import { useCalendarStore } from "../../stores/calendarStore";
import Icon from "../common/Icon";
import MoreMenu from "../common/MoreMenu";

export default function ScheduleItem({ schedule }: { schedule: Schedule }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTitle, setMemo, setTargetDate } = useCalendarStore();
  const handleUpdateschedule = async () => {
    setTargetDate(schedule.date);
    setTitle(schedule.title);
    setMemo(schedule.memo || "");
    setIsMenuOpen(false);
  };
  return (
    <li className="relative px-3 py-1 flex flex-col group">
      <div className="flex items-center">
        <Icon
          width="10px"
          height="9px"
          left="-49px"
          top="-405px"
          className="mr-5"
        />
        <span className="inline-block grow-1 text-lg">{schedule.title}</span>
      </div>
      <div
        onClick={() => setIsMenuOpen(true)}
        className="absolute right-3 bottom-1/2 cursor-pointer py-2 px-2"
      >
        <Icon width="14px" height="4px" left="-511px" top="-768px" />
      </div>
      {schedule.memo && (
        <span className="text-sm text-[var(--gray-50)] ml-[35px]">
          {schedule.memo}
        </span>
      )}
      {isMenuOpen && (
        <MoreMenu
          id={schedule.id}
          closeMenu={() => setIsMenuOpen(false)}
          type="schedule"
          onClick={handleUpdateschedule}
        />
      )}
    </li>
  );
}
