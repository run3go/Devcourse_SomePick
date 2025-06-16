import firstCouple from "../../assets/images/taro.png";
import { useAuthStore } from "../../stores/authstore";

interface Props {
  isTodayChecked: boolean;
}
export default function FortuneInfo({ isTodayChecked }: Props) {
  const user = useAuthStore((state) => state.session?.user.user_metadata);
  const userName = user?.nickname;

  return (
    <>
      <div className="flex flex-col items-center">
        <div>
          <img
            src={firstCouple}
            alt="타로 커플"
            className="w-[300px] h-[200px]"
          />
        </div>
        <div className="text-center mt-4">
          <p className="font-bold text-[28px] dark:text-[var(--dark-gray-700)]">
            <span className="text-[var(--primary-pink)]">{userName}</span>님,
          </p>
          {isTodayChecked ? (
            <>
              <p className="mt-2 font-bold text-[28px] dark:text-[var(--dark-gray-700)] text-[var(--gray-700)]">
                오늘의 운세를 이미 확인했어요!
              </p>
            </>
          ) : (
            <>
              <p className="font-bold text-[28px] dark:text-[var(--dark-gray-700)] text-[var(--gray-700)]">
                오늘의 운세가 준비되었어요! <br />{" "}
              </p>
              <p className="font-bold text-[28px] dark:text-[var(--dark-gray-700)] text-[var(--gray-500)]">
                셋 중 하나의 카드를 클릭해보세요.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
