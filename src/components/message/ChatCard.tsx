import { useNavigate } from "react-router";
import Button from "../common/Button";

interface InfoProps {
  profileImg?: string;
  name?: string;
  age?: string;
  message?: string | null;
  items?: string[];
  userId?: string;
}

export default function ChatCard({
  profileImg,
  name,
  age,
  message,
  items,
  userId,
}: InfoProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-10 my-15 items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <img
            src={profileImg}
            className="w-[200px] h-[200px] rounded-full object-cover object-center"
          />
          <Button
            className="w-28 h-6 text-[10px]"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            프로필 보기
          </Button>
        </div>
        <div className="w-[284px] h-full rounded-2xl py-3.5 px-[18px]">
          <div className="flex flex-col gap-4 px-3 justify-center items-start">
            <div className="flex gap-1.5 items-end">
              <span className="text-[18px] font-bold">{name}</span>
              <span className="text-[10px] font-bold text-[var(--gray-500)]/80">
                {age}
              </span>
            </div>
            <span className="text-[11px]">{message}</span>
          </div>
          <hr className="border-[var(--primary-pink)] w-[248px] my-4" />
          <div className="px-5 justify-between flex text-[14px] text-[var(--gray-500)] font-bold">
            {items.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
          <div className="my-5 flex flex-col gap-3.5">
            <ul className="flex gap-4 w-full justify-center">
              <li className="px-3.5 py-1 flex items-center border border-[var(--primary-pink)] rounded-[50px]">
                <span className="inline-block text-[var(--gray-50)] leading-[1] text-[12px]">
                  잘생김
                </span>
              </li>
              <li className="px-3.5 py-1 flex items-center border border-[var(--primary-pink)] rounded-[50px]">
                <span className="inline-block text-[var(--gray-50)] leading-[1] text-[12px]">
                  듬직한
                </span>
              </li>
              <li className="px-3.5 py-1 flex items-center border border-[var(--primary-pink)] rounded-[50px]">
                <span className="inline-block text-[var(--gray-50)] leading-[1] text-[12px]">
                  감성적인
                </span>
              </li>
            </ul>
            <ul className="flex gap-4 w-full justify-center">
              <li className="px-3.5 py-1 flex items-center border border-[var(--primary-pink)] rounded-[50px]">
                <span className="inline-block text-[var(--gray-50)] leading-[1] text-[12px]">
                  잘생김
                </span>
              </li>
              <li className="px-3.5 py-1 flex items-center border border-[var(--primary-pink)] rounded-[50px]">
                <span className="inline-block text-[var(--gray-50)] leading-[1] text-[12px]">
                  듬직한
                </span>
              </li>
              <li className="px-3.5 py-1 flex items-center border border-[var(--primary-pink)] rounded-[50px]">
                <span className="inline-block text-[var(--gray-50)] leading-[1] text-[12px]">
                  감성적인
                </span>
              </li>
            </ul>
            <ul className="flex gap-4 w-full justify-center">
              <li className="px-3.5 py-1 flex items-center border border-[var(--primary-pink)] rounded-[50px]">
                <span className="inline-block text-[var(--gray-50)] leading-[1] text-[12px]">
                  잘생김
                </span>
              </li>
              <li className="px-3.5 py-1 flex items-center border border-[var(--primary-pink)] rounded-[50px]">
                <span className="inline-block text-[var(--gray-50)] leading-[1] text-[12px]">
                  듬직한
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
