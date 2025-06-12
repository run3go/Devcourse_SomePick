import { formatDate } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { updateMeetDate } from "../../apis/calendar";
import { useAuthStore } from "../../stores/authStore";
import { compareDate } from "../../utils/date";
import Button from "../common/Button";

export default function MeetDate({ couple }: { couple: Couple }) {
  const { session } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetDate, setMeetDate] = useState(couple.meet_date);
  const [value, setValue] = useState<string>(couple.meet_date || "");
  const updateDate = async () => {
    if (value === "") {
      setIsModalOpen(false);
      return;
    }
    const meetDate = new Date(value);
    const today = new Date();
    if (compareDate(meetDate, today) < 0) {
      toast.error("오늘 이전의 날짜만 입력 가능합니다");
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
  const partnerInfo =
    session?.user.id === couple.user1.id ? couple.user2 : couple.user1;
  const today = formatDate(new Date(), "yyyy-MM-dd");
  return (
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
          <Button className="px-6 py-[2px] rounded-[5px] " onClick={updateDate}>
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
              "hover:animate-pulse",
              !calcPeriod() && "animate-pulse"
            )}
          >
            D+{calcPeriod()}
          </span>
        </>
      )}
    </div>
  );
}
