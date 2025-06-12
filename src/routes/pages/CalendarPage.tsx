import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import { useLoaderData } from "react-router";
import Calendar from "../../components/calendar/Calendar";
import MeetDate from "../../components/calendar/MeetDate";
import ScheduleInput from "../../components/calendar/ScheduleInput";
import ShowScheduleList from "../../components/calendar/ShowScheduleList";
import Icon from "../../components/common/Icon";
import { useCalendarStore } from "../../stores/calendarStore";

export default function CalendarPage() {
  const { couple, schedules: data }: { couple: Couple; schedules: Schedule[] } =
    useLoaderData();

  const schedules = useCalendarStore((state) => state.schedules);
  const { setSchedules, setTargetDate } = useCalendarStore();
  const scrollRef = useRef<HTMLInputElement | null>(null);
  const [isScrollBtnShow, setIsScrollBtnShow] = useState(false);

  const scrollToInput = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showScrollBtn = () => {
    setIsScrollBtnShow(true);
  };

  const scrollEvent = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setIsScrollBtnShow(false);
    }
  };

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
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [setTargetDate, setSchedules, data]);
  return (
    <main className="flex justify-center mt-[30px]">
      <div className="w-[1366px] relative">
        <div className="flex h-[794px] gap-6">
          <div className="flex flex-col gap-6 w-[257px]">
            <MeetDate couple={couple} />
            <ShowScheduleList
              schedules={optimisticSchedules}
              isPending={isPending}
              scrollToInput={scrollToInput}
            />
          </div>

          <Calendar
            optimisticSchedules={optimisticSchedules}
            showScrollBtn={showScrollBtn}
          />
        </div>
        <ScheduleInput
          addOptimisticSchedule={addOptimisticSchedule}
          startTransiton={startTransiton}
          scrollRef={scrollRef}
        />
        {isScrollBtnShow && (
          <Icon
            width="55px"
            height="55px"
            left="-462px"
            top="-463px"
            className="fixed left-1/2 -translate-x-1/2 bottom-10 motion-safe:animate-bounce cursor-pointer"
            onClick={() => {
              setIsScrollBtnShow(false);
              scrollToInput();
            }}
          />
        )}
      </div>
    </main>
  );
}
