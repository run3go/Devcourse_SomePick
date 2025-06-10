import { twMerge } from "tailwind-merge";
import { weeks } from "../../constants/data/calendar";
import Icon from "../common/Icon";

export default function Calendar() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const today = 4;
  return (
    <div className="w-[820px]">
      <div className="flex justify-between items-center mb-[40px] w-[735px]">
        <Icon
          width="22px"
          height="29px"
          left="-208px"
          top="-394px"
          className="hover:cursor-pointer"
        />
        <div>
          <span className="text-xl mr-[14px] text-[var(--primary-pink-point)]">
            2025
          </span>
          <span className="text-[40px]">06</span>
        </div>
        <Icon
          width="22px"
          height="29px"
          left="-265px"
          top="-395px"
          className="hover:cursor-pointer"
        />
      </div>
      <div className="w-full text-[30px]">
        <div className="w-full">
          <div className="flex h-[60px] text-xl">
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
            {days.map((day) => (
              <div key={day} className="basis-1/7 h-27">
                <div
                  className={twMerge(
                    "pb-[14px] cursor-pointer leading-[1] inline-block"
                  )}
                >
                  <div
                    className={twMerge(
                      "relative w-[55px] h-[22px] text-center gray-circle-bg",
                      today === day && "circle-bg"
                    )}
                  >
                    {day}
                  </div>
                </div>
                {day === 3 && (
                  <ul className="flex flex-col gap-[3px] text-[15px] pt-[2px] mt-[2px]">
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
  );
}
