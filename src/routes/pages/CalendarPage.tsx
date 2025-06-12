import { useEffect, useOptimistic, useTransition } from "react";
import { useLoaderData } from "react-router";
import Calendar from "../../components/calendar/Calendar";
import MeetDate from "../../components/calendar/MeetDate";
import ScheduleInput from "../../components/calendar/ScheduleInput";
import ShowScheduleList from "../../components/calendar/showScheduleList";
import { useCalendarStore } from "../../stores/calendarStore";

export default function CalendarPage() {
  const { couple, schedules: data }: { couple: Couple; schedules: Schedule[] } =
    useLoaderData();

  const schedules = useCalendarStore((state) => state.schedules);
  const { setSchedules, setTargetDate } = useCalendarStore();

  const [optimisticSchedules, addOptimisticSchedule] = useOptimistic(
    schedules,
    (currentSchedules, newSchedule: Schedule) => [
      ...currentSchedules,
      newSchedule,
    ]
  );
  const [isPending, startTransiton] = useTransition();

  useEffect(() => {
    setSchedules(data);
    setTargetDate("");
  }, [setTargetDate, setSchedules, data]);
  return (
    <main className="flex justify-center mt-[30px]">
      <div className="w-[1366px]">
        <div className="flex h-[794px] gap-6">
          <div className="flex flex-col gap-6 w-[257px]">
            <MeetDate couple={couple} />
            <ShowScheduleList
              schedules={optimisticSchedules}
              isPending={isPending}
            />
          </div>

          <Calendar optimisticSchedules={optimisticSchedules} />
        </div>
        <ScheduleInput
          addOptimisticSchedule={addOptimisticSchedule}
          startTransiton={startTransiton}
        />
      </div>
    </main>
  );
}
