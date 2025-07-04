import {
  addMonths,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  setMonth,
  setYear,
  subMonths,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { weeks } from "../../constants/data/calendar";
import Button from "../common/Button";
import Icon from "../common/Icon";
import DateItem from "./DateItem";

export default function Calendar({
  optimisticSchedules,
  showScrollBtn,
}: {
  optimisticSchedules: Schedule[];
  showScrollBtn: () => void;
}) {
  const [date, setDate] = useState(new Date());
  const year = getYear(date);
  const month = getMonth(date);
  const firstDay = getDay(new Date(year, month, 1));
  const thisYear = getYear(new Date());
  const thisMonth = getMonth(new Date());
  const days = getDaysInMonth(new Date(year, month));
  const dayArray = Array.from(
    { length: days + firstDay },
    (_, index) => index + 1 - firstDay
  );

  const prevMonth = () => {
    setDate((date) => subMonths(date, 1));
  };
  const nextMonth = () => {
    setDate((date) => addMonths(date, 1));
  };

  const setThisMonth = () => {
    setDate((date) => {
      const year = setYear(date, thisYear);
      const month = setMonth(year, thisMonth);
      return month;
    });
  };
  console.log(month !== thisMonth);
  return (
    <div className="relative overflow-x-hidden flex justify-center pl-[62px] py-[20px] flex-grow shadow-[0_2px_8px_0_rgba(0,0,0,0.4)] rounded-[30px] dark:border dark:border-[var(--dark-white)]">
      <div className="w-[820px]">
        <div className="flex justify-between items-center mb-[30px] w-[735px] ml-[10px]">
          <Icon
            width="22px"
            height="29px"
            left="-208px"
            top="-394px"
            className="cursor-pointer"
            onClick={prevMonth}
          />
          <div>
            {(month !== thisMonth || year !== thisYear) && (
              <Button
                onClick={setThisMonth}
                className="w-25 py-1 absolute text-sm right-[30%] top-13 -translate-y-1/2"
              >
                이번 달로 이동
              </Button>
            )}
            <span className="text-xl mr-[14px] text-[var(--primary-pink-point)]">
              {year}
            </span>
            <span className="text-[40px] dark:text-[var(--dark-gray-200)]">
              {month + 1 < 10 ? "0" + (month + 1) : month + 1}
            </span>
          </div>
          <Icon
            width="22px"
            height="29px"
            left="-265px"
            top="-395px"
            className="cursor-pointer"
            onClick={nextMonth}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div>
            <div className="w-full text-[30px]">
              <div className="w-full">
                <div className="flex h-[50px] text-xl dark:text-[var(--dark-gray-200)]">
                  {weeks.map((week, index) => (
                    <div
                      key={week}
                      className={twMerge(
                        "basis-1/7",
                        !index && "text-[var(--primary-pink-point)]"
                      )}
                    >
                      <div className="w-[55px] text-center">{week}</div>
                    </div>
                  ))}
                </div>
                <div className="days-wrap flex flex-wrap">
                  {dayArray.map((item) => (
                    <DateItem
                      key={item}
                      item={item}
                      date={date}
                      showScrollBtn={showScrollBtn}
                      schedules={optimisticSchedules.filter(
                        (schedule) =>
                          schedule.date ===
                          `${year}-${
                            month + 1 < 10 ? "0" + (month + 1) : month + 1
                          }-${item < 10 ? "0" + item : item}`
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
