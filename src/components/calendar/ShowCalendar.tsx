import { twMerge } from "tailwind-merge";
import Icon from "../common/Icon";
export default function ShowCalendar() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const today = 19;
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[650px] flex justify-between items-center mt-[40px] mb-[40px]">
        <div className="pl-[10px]">
          <Icon
            width="22px"
            height="29px"
            left="-208px"
            top="-394px"
            className="hover:cursor-pointer"
          />
        </div>
        <div>
          <span className="text-lg mr-[14px] text-[var(--primary-pink-point)]">
            2025
          </span>
          <span className="text-[32px] dark:text-[var(--dark-gray-700)]">
            06
          </span>
        </div>
        <div className="pr-[10px]">
          <Icon
            width="22px"
            height="29px"
            left="-265px"
            top="-395px"
            className="hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full text-[20px]">
        <div className="w-full">
          <div className="flex h-[30px] text-[16px]">
            <div className="w-[14.28%] text-[var(--primary-pink-point)] text-center">
              Sun
            </div>
            <div className="w-[14.28%] text-center dark:text-[var(--dark-gray-700)]">
              Mon
            </div>
            <div className="w-[14.28%] text-center dark:text-[var(--dark-gray-700)]">
              Tue
            </div>
            <div className="w-[14.28%] text-center dark:text-[var(--dark-gray-700)]">
              Wed
            </div>
            <div className="w-[14.28%] text-center dark:text-[var(--dark-gray-700)]">
              Thu
            </div>
            <div className="w-[14.28%] text-center dark:text-[var(--dark-gray-700)]">
              Fri
            </div>
            <div className="w-[14.28%] text-center dark:text-[var(--dark-gray-700)]">
              Sat
            </div>
          </div>
          <div className="days-wrap flex flex-wrap">
            {days.map((day) => (
              <div
                key={day}
                className="w-[14.28%] h-20 text-center dark:text-[var(--dark-gray-700)]"
              >
                <span
                  className={twMerge(
                    "day-text relative p-1 leading-[1] inline-block",
                    today === day && "circle-bg"
                  )}
                >
                  {day}
                </span>
                {day === 23 && (
                  <ul className="flex flex-col gap-[3px] text-[15px] ">
                    <li className="text-ellipsis text-nowrap pl-[10px] bg-[var(--primary-pink-tone)] inline-block w-[70px] rounded-[5px] text-white">
                      데이트
                    </li>
                  </ul>
                )}
                {day === 10 && (
                  <ul className="flex flex-col gap-[3px] text-[15px] ">
                    <li className="text-ellipsis text-nowrap pl-[10px] bg-[var(--primary-pink-tone)] inline-block w-[70px] rounded-[5px] text-white">
                      부산 여행
                    </li>
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
