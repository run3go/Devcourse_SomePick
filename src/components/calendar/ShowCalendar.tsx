import { twMerge } from "tailwind-merge";

export default function ShowCalendar() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const today = 4;
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[650px] flex justify-between items-center mt-[40px] mb-[40px]">
        <div className="w-[33px] h-[33px] bg-[var(--primary-pink)]"></div>
        <div>
          <span className="text-lg mr-[14px] text-[var(--primary-pink-point)]">
            2025
          </span>
          <span className="text-[32px]">06</span>
        </div>
        <div className="w-[33px] h-[33px] bg-[var(--primary-pink)]"></div>
      </div>
      <div className="w-full text-[20px]">
        <div className="w-full">
          <div className="flex h-[30px] text-[16px]">
            <div className="w-[14.28%] text-[var(--primary-pink-point)] text-center">
              Sun
            </div>
            <div className="w-[14.28%] text-center">Mon</div>
            <div className="w-[14.28%] text-center">Tue</div>
            <div className="w-[14.28%] text-center">Wed</div>
            <div className="w-[14.28%] text-center">Thu</div>
            <div className="w-[14.28%] text-center">Fri</div>
            <div className="w-[14.28%] text-center">Sat</div>
          </div>
          <div className="days-wrap flex flex-wrap">
            {days.map((day) => (
              <div key={day} className="w-[14.28%] h-20 text-center">
                <span
                  className={twMerge(
                    "day-text relative py-1 px-[6px] pb-[8px] cursor-pointer leading-[1] inline-block gray-circle-bg",
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
