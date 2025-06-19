import { useNavigate } from "react-router";
import useFadeIn from "../common/useFadeIn";

export default function NearFooter() {
  const fadeIn = useFadeIn();
  const navigate = useNavigate();
  return (
    <>
      <div
        {...fadeIn}
        className="flex flex-col text-center items-center mt-[300px] mb-[300px]"
      >
        <p className="text-[28px] text-[var(--gray-500)] dark:text-[var(--dark-gray-500)]">
          설레는 시작을 기다리는
          <span className="text-[var(--primary-pink)] font-bold">솔로</span>부터
          <br />
          사랑을 더 특별하게 만들고 싶은
          <span className="text-[var(--primary-pink)] font-bold">
            커플
          </span>까지 <br />
        </p>
        <p className="text-[40px] dark:text-[var(--dark-gray-700)]">
          사랑의 모든 순간,
          <span className="text-[var(--primary-pink-tone)] font-bold">
            썸픽
          </span>
          에서 시작해요!
        </p>
        <button
          onClick={() => navigate("/auth/login")}
          className="mt-[40px] border bg-[var(--primary-pink)] text-white hover:bg-[var(--primary-pink-tone)] hover:shadow-lg transition
            duration-300 ease-in-out text-[24px] cursor-pointer shadow-[var(--primary-pink)] border-[var(--primary-pink)] rounded-[20px] w-[300px] h-[70px]"
        >
          <span className="font-bold">썸픽</span> 회원가입하러 가기
        </button>
      </div>
    </>
  );
}
