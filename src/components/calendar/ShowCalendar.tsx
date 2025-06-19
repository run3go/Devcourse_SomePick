import { twMerge } from "tailwind-merge";
import Icon from "../common/Icon";
export default function ShowCalendar() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const today = [19, 24, 10];
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[580px] flex justify-between items-center mt-[20px] mb-[30px]">
        <div className="pl-[10px]">
          <Icon width="22px" height="29px" left="-208px" top="-394px" />
        </div>
        <div>
          <span className="text-lg mr-[14px] text-[var(--primary-pink-point)]">
            2025
          </span>
          <span className="text-[32px] dark:text-[var(--dark-gray-700)]">
            06
          </span>
        </div>
        <div className="pr-[25px]">
          <Icon width="22px" height="29px" left="-265px" top="-395px" />
        </div>
      </div>
      <div className="w-full text-[20px]">
        <div className="w-full pl-12">
          <div className="flex h-[30px] text-[16px]">
            <div className="w-[14.28%] text-[var(--primary-pink-point)]">
              Sun
            </div>
            <div className="w-[14.28%] dark:text-[var(--dark-gray-700)]">
              Mon
            </div>
            <div className="w-[14.28%] dark:text-[var(--dark-gray-700)]">
              Tue
            </div>
            <div className="w-[14.28%] dark:text-[var(--dark-gray-700)]">
              Wed
            </div>
            <div className="w-[14.28%] dark:text-[var(--dark-gray-700)]">
              Thu
            </div>
            <div className="w-[14.28%] dark:text-[var(--dark-gray-700)]">
              Fri
            </div>
            <div className="w-[14.28%] dark:text-[var(--dark-gray-700)]">
              Sat
            </div>
          </div>
          <div className="days-wrap flex flex-wrap">
            {days.map((day) => (
              <div
                key={day}
                className={twMerge(
                  "group relative basis-1/7 text-[#bdbdbd] border-t-3 rounded-lg border-t-transparent h-18",
                  "dark:text-[var(--gray-700)]",
                  day === today[0] && "border-t-[var(--primary-pink-point)]",
                  day === today[0] && "bg-[#ffebf0]"
                )}
              >
                <div className="relative p-2 w-full h-[30px] text-xl leading-[1]">
                  <span
                    className={twMerge(
                      "inline-block",
                      day === today[0] &&
                        "text-[#E870A2] font-bold dark:text-[#E870A2]"
                    )}
                  >
                    {day}
                  </span>
                </div>
                <ul className="flex flex-col gap-[3px] text-[13px] pl-2 pt-1">
                  {day === 19 && (
                    <li className="font-[inter] overflow-hidden text-ellipsis text-nowrap pl-[10px] pr-[3px] bg-[#E870A2] inline-block w-18 rounded-[5px] text-white">
                      데이트
                    </li>
                  )}
                  {day === 10 && (
                    <li className="font-[inter] overflow-hidden text-ellipsis text-nowrap pl-[10px] pr-[3px] bg-[#E870A2] inline-block w-18 rounded-[5px] text-white">
                      1주년
                    </li>
                  )}
                  {day === 24 && (
                    <li className="font-[inter] overflow-hidden text-ellipsis text-nowrap pl-[10px] pr-[3px] bg-[#E870A2] inline-block w-18 rounded-[5px] text-white">
                      부산여행
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
