import { formatDate } from "date-fns";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { twMerge } from "tailwind-merge";
import { updateMeetDate } from "../../apis/calendar";
import Calendar from "../../components/calendar/Calendar";
import ScheduleInput from "../../components/calendar/ScheduleInput";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import { useAuthStore } from "../../stores/authstore";

export default function CalendarPage() {
  const { session } = useAuthStore();
  const { couple, schedules }: { couple: Couple; schedules: Schedule[] } =
    useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<string>(couple.meet_date || "");
  const [meetDate, setMeetDate] = useState(couple.meet_date);
  const [targetDate, setTargetDate] = useState(
    formatDate(new Date(), "yyyy-MM-dd")
  );

  const updateDate = async () => {
    if (value === "") {
      setIsModalOpen(false);
      return;
    }
    setMeetDate(value);
    await updateMeetDate(couple.id, new Date(value));
    setIsModalOpen(false);
  };

  const calcPeriod = () => {
    if (!meetDate) return 0;
    const start = new Date(meetDate).getTime();
    const end = new Date().getTime();
    return Math.floor((end - start) / (1000 * 60 * 60 * 24));
  };

  const selectDate = (date: string) => {
    setTargetDate(date);
  };

  const partnerInfo =
    session?.user.id === couple.user1.id ? couple.user2 : couple.user1;
  const today = formatDate(new Date(), "yyyy-MM-dd");

  return (
    <main className="flex justify-center mb-[150px] mt-[30px]">
      <div className="w-[1366px]">
        <div className="flex h-[794px] gap-6">
          <div className="flex flex-col gap-6 w-[257px]">
            <div className="flex flex-col h-[203px] items-center border-y-5 border-[var(--primary-pink)] py-9">
              {isModalOpen ? (
                <>
                  <span className="mb-[26px]">
                    <strong className="text-[var(--primary-pink-tone)]">
                      {partnerInfo.nickname}
                    </strong>
                    님과 첫 만남, 언제였나요?
                  </span>
                  <input
                    type="text"
                    className={twMerge(
                      "px-3 py-1 border border-[var(--primary-pink)] mb-4 rounded-full text-sm",
                      "focus:outline-[var(--primary-pink-tone)]"
                    )}
                    placeholder={today}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Button
                    className="px-6 py-[2px] rounded-[5px] "
                    onClick={updateDate}
                  >
                    저장
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-medium">TODAY</h2>
                  <span className="text-xl">
                    <strong className="font-semibold text-[var(--primary-pink-tone)]">
                      {partnerInfo.nickname}
                    </strong>
                    님과
                  </span>
                  <span
                    onClick={() => setIsModalOpen(true)}
                    className={twMerge(
                      "cursor-pointer text-[40px] font-bold text-[var(--primary-pink-point)]",
                      !calcPeriod() && "animate-pulse"
                    )}
                  >
                    D+{calcPeriod()}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col px-4 py-7 h-[565px] border border-[var(--primary-pink)]">
              <h2 className="text-center font-semibold text-xl text-[var(--primary-pink-point)] border-b pb-[10px] mb-[18px]">
                다음 일정
              </h2>
              <h3 className="text-xl font-bold border-l-8 border-[var(--primary-pink)] pl-5">
                6월 10일
              </h3>
              <ul className="flex flex-col gap-4 mt-5">
                <li className="flex items-center justify-between flex-wrap">
                  <Icon
                    width="10px"
                    height="9px"
                    left="-49px"
                    top="-405px"
                    className="mr-5"
                  />
                  <span className="inline-block grow-1 text-xl">
                    은우랑 데이트
                  </span>
                  <Icon
                    width="14px"
                    height="4px"
                    left="-511px"
                    top="-768px"
                    className="cursor-pointer"
                  />
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <Icon
                    width="10px"
                    height="9px"
                    left="-49px"
                    top="-405px"
                    className="mr-5"
                  />
                  <span className="inline-block grow-1 text-xl">부산 가기</span>
                  <Icon
                    width="14px"
                    height="4px"
                    left="-511px"
                    top="-768px"
                    className="cursor-pointer"
                  />
                  <span className="text-sm text-[var(--gray-50)] ml-[35px]">
                    해운대 꼭 가기!
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <Calendar
            schedules={schedules}
            targetDate={targetDate}
            selectDate={selectDate}
          />
        </div>
        <ScheduleInput targetDate={targetDate} />
      </div>
    </main>
  );
}
