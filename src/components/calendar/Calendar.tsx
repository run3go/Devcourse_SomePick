import { twMerge } from "tailwind-merge";

export default function Calendar() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const today = 4;
  return (
    <div className="w-[820px]">
      <div className="flex justify-between items-center mb-[40px] w-[735px]">
        <div className="w-[33px] h-[33px] bg-[var(--primary-pink)]"></div>
        <div>
          <span className="text-xl mr-[14px] text-[var(--primary-pink-point)]">
            2025
          </span>
          <span className="text-[40px]">06</span>
        </div>
        <div className="w-[33px] h-[33px] bg-[var(--primary-pink)]"></div>
      </div>
      <div className="w-full text-[36px]">
        <div className="w-full">
          <div className="flex h-[90px] text-xl">
            <div className="basis-1/7 text-[var(--primary-pink-point)]">
              Sun
            </div>
            <div className="basis-1/7">Mon</div>
            <div className="basis-1/7">Tue</div>
            <div className="basis-1/7">Wed</div>
            <div className="basis-1/7">Thu</div>
            <div className="basis-1/7">Fri</div>
            <div className="basis-1/7">Sat</div>
          </div>
          <div className="days-wrap flex flex-wrap">
            {days.map((day) => (
              <div key={day} className="basis-1/7 h-25">
                <span
                  className={twMerge(
                    "day-text relative py-2 px-[10px] pb-[14px] cursor-pointer leading-[1] inline-block gray-circle-bg",
                    today === day && "circle-bg"
                  )}
                >
                  {day}
                </span>
                {day === 10 && (
                  <ul className="flex flex-col gap-[3px] text-[15px] pt-[2px]">
                    <li className="overflow-hidden text-ellipsis text-nowrap pl-[13px] bg-[var(--primary-pink-tone)] inline-block w-20 rounded-[5px] text-white">
                      은우랑 데이트
                    </li>
                    <li className="overflow-hidden text-ellipsis text-nowrap pl-[13px] bg-[var(--primary-pink-tone)] inline-block w-20 rounded-[5px] text-white">
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
