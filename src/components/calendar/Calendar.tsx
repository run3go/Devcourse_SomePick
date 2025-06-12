import {
  addMonths,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { weeks } from "../../constants/data/calendar";
import Icon from "../common/Icon";

export default function Calendar({
  schedules,
  targetDate,
  selectDate,
}: {
  schedules: Schedule[];
  targetDate: string;
  selectDate: (date: string) => void;
}) {
  const [date, setDate] = useState(new Date());
  const year = getYear(date);
  const month = getMonth(date);
  const day = getDate(date);
  const firstDay = getDay(new Date(year, month, 1));
  const days = getDaysInMonth(new Date(year, month));
  const dayArray = Array.from(
    { length: days + firstDay },
    (_, index) => index + 1 - firstDay
  );

  const thisYear = getYear(new Date());
  const thisMonth = getMonth(new Date());

  const prevMonth = () => {
    setDate((date) => subMonths(date, 1));
  };
  const nextMonth = () => {
    setDate((date) => addMonths(date, 1));
  };
  const [targetYear, targetMonth, targetDay] = targetDate
    .split("-")
    .map(Number);
  return (
    <div className="flex justify-center pl-[62px] py-[20px] flex-grow shadow-[0_2px_8px_0_rgba(0,0,0,0.4)] rounded-[30px]">
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
            <span className="text-xl mr-[14px] text-[var(--primary-pink-point)]">
              {year}
            </span>
            <span className="text-[40px]">
              {month.toString().length === 1 ? "0" + (month + 1) : month + 1}
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
        <div className="w-full text-[30px]">
          <div className="w-full">
            <div className="flex h-[50px] text-xl">
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
                <div key={item} className="basis-1/7 h-25">
                  <div
                    className={twMerge("pb-[14px] leading-[1] inline-block")}
                  >
                    <div
                      className={twMerge(
                        "relative w-[55px] h-[22px] text-center text-2xl"
                      )}
                    >
                      {item < 1 ? null : (
                        <span
                          onClick={() =>
                            selectDate([year, month + 1, item].join("-"))
                          }
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
                  {item === 31 && (
                    <ul className="flex flex-col gap-[3px] text-[13px] pt-[2px] mt-[3px]">
                      <li className="font-[inter] overflow-hidden text-ellipsis text-nowrap pl-[13px] bg-[var(--primary-pink-tone)] inline-block w-20 rounded-[5px] text-white">
                        은우랑 데이트
                      </li>
                      <li className="font-[inter] overflow-hidden text-ellipsis text-nowrap pl-[13px] bg-[var(--primary-pink-tone)] inline-block w-20 rounded-[5px] text-white">
                        부산 가기
                      </li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
