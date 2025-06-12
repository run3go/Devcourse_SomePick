import { formatDate, getDate, getMonth } from "date-fns";
import { useOptimistic, useState, useTransition } from "react";
import { useLoaderData } from "react-router";
import Calendar from "../../components/calendar/Calendar";
import MeetDate from "../../components/calendar/MeetDate";
import ScheduleInput from "../../components/calendar/ScheduleInput";
import UpcomingSchedule from "../../components/calendar/UpcomingSchedule";
import { useCalendarStore } from "../../stores/calendarStore";
import { compareDate } from "../../utils/date";

export default function CalendarPage() {
  const { couple, schedules }: { couple: Couple; schedules: Schedule[] } =
    useLoaderData();

  const { schedules: ee } = useCalendarStore();
  const [targetDate, setTargetDate] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const selectDate = (date: string) => {
    setTargetDate(date);
  };

  const [optimisticSchedlues, addOptimisticSchedule] = useOptimistic(
    schedules,
    (currentSchedules, newSchedule: Schedule) => [
      ...currentSchedules,
      newSchedule,
    ]
  );
  console.log(ee);
  const [isPending, startTransiton] = useTransition();

  const upcomingSchedules = optimisticSchedlues
    .sort((a, b) => compareDate(new Date(b.date), new Date(a.date)))
    .filter((schedule) => schedule.date === optimisticSchedlues[0].date);
  const upcomingDate = new Date(upcomingSchedules[0].date);
  return (
    <main className="flex justify-center mb-[150px] mt-[30px]">
      <div className="w-[1366px]">
        <div className="flex h-[794px] gap-6">
          <div className="flex flex-col gap-6 w-[257px]">
            <MeetDate couple={couple} />
            <div className="flex flex-col px-4 py-7 h-[565px] border border-[var(--primary-pink)]">
              <h2 className="text-center font-semibold text-xl text-[var(--primary-pink-point)] border-b pb-[10px] mb-[18px]">
                다음 일정
              </h2>
              <h3 className="text-xl font-bold border-l-8 border-[var(--primary-pink)] pl-5">
                {getMonth(upcomingDate) + 1}월 {getDate(upcomingDate)}일
              </h3>
              <ul className="flex flex-col gap-4 mt-5">
                {upcomingSchedules.map((schedule) => (
                  <UpcomingSchedule key={schedule.id} schedule={schedule} />
                ))}
              </ul>
            </div>
          </div>

          <Calendar
            schedules={schedules}
            targetDate={targetDate}
            selectDate={selectDate}
            optimisticSchedlues={optimisticSchedlues}
          />
        </div>
        <ScheduleInput
          targetDate={targetDate}
          addOptimisticSchedule={addOptimisticSchedule}
          startTransiton={startTransiton}
        />
      </div>
    </main>
  );
}
