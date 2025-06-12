import Icon from "../common/Icon";

export default function UpcomingSchedule({ schedule }: { schedule: Schedule }) {
  return (
    <li className="flex flex-col">
      <div className="flex items-center">
        <Icon
          width="10px"
          height="9px"
          left="-49px"
          top="-405px"
          className="mr-5"
        />
        <span className="inline-block grow-1 text-lg">{schedule.title}</span>
        <Icon
          width="14px"
          height="4px"
          left="-511px"
          top="-768px"
          className="cursor-pointer"
        />
      </div>
      {schedule.memo && (
        <span className="text-sm text-[var(--gray-50)] ml-[35px]">
          {schedule.memo}
        </span>
      )}
    </li>
  );
}
