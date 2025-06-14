import firstCouple from "../../assets/images/taro.png";
import { useAuthStore } from "../../stores/authStore";

export default function FortuneInfo() {
  const user = useAuthStore((state) => state.session?.user.user_metadata);
  const userName = user?.nickname;
  const isCouple = user?.status;

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
          <p className="font-bold text-[28px]">
            <span className="text-[var(--primary-pink)]">{userName}</span>님,
            오늘의 운세가 준비되었어요!
          </p>
          <br />
          <p className="font-bold text-[20px] text-[var(--gray-500)]">
            셋 중 하나의 카드를 클릭해보세요.
          </p>
        </div>
      </div>
    </>
  );
}
