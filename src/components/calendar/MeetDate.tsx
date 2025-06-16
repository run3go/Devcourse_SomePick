import { formatDate } from "date-fns";
import { Korean } from "flatpickr/dist/l10n/ko";
import "flatpickr/dist/themes/confetti.css";
import { useEffect, useState } from "react";
import { default as Flatpickr } from "react-flatpickr";
import { twMerge } from "tailwind-merge";
import { updateMeetDate } from "../../apis/calendar";
import { useAuthStore } from "../../stores/authStore";
import Button from "../common/Button";

export default function MeetDate({ couple }: { couple: Couple }) {
  const { session } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetDate, setMeetDate] = useState(new Date());

  const updateDate = async () => {
    await updateMeetDate(couple.id, meetDate);
    setIsModalOpen(false);
  };

  const calcPeriod = () => {
    if (!meetDate) return 0;
    const start = meetDate.getTime();
    const end = new Date().getTime();
    return Math.floor((end - start) / (1000 * 60 * 60 * 24));
  };

  const partnerInfo =
    session?.user.id === couple.user1.id ? couple.user2 : couple.user1;
  const today = formatDate(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    if (couple.meet_date) {
      setMeetDate(new Date(couple.meet_date));
    }
  }, [setMeetDate, couple]);
  return (
    <div
      className={twMerge(
        "flex flex-col h-[203px] items-center border-y-5 border-[var(--primary-pink)] py-9",
        "dark:text-[var(--dark-gray-200)]"
      )}
    >
      {isModalOpen ? (
        <>
          <span className="mb-[26px]">
            <strong className="text-[var(--primary-pink-tone)]">
              {partnerInfo.nickname}
            </strong>
            님과 첫 만남, 언제였나요?
          </span>
          <Flatpickr
            placeholder={today}
            className={twMerge(
              "py-1 border border-[var(--primary-pink-point)] mb-4 rounded-full text-sm",
              "focus:outline-[var(--primary-pink-tone)] text-center"
            )}
            options={{ maxDate: "today", locale: Korean }}
            onChange={([selected]) => setMeetDate(selected)}
            value={meetDate}
          />
          <Button onClick={updateDate} className="px-6 py-[2px] rounded-[5px] ">
            저장
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-medium pb-2">TODAY</h2>
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
