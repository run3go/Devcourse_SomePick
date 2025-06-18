import { useNavigate } from "react-router";
import Button from "../common/Button";

type InfoProps = {
  profileImg?: string;
  name?: string;
  age?: string;
  message?: string | null;
  items?: string[];
  keyword?: string[] | null;
  interest?: string[] | null;
  userId?: string;
};

export default function ChatCard({
  profileImg,
  name,
  age,
  message,
  items,
  keyword,
  interest,
  userId,
}: InfoProps) {
  const navigate = useNavigate();

  // 태그에서 키워드 출력
  const keywords: string[] =
    keyword && keyword.length > 0
      ? keyword.slice(0, 4)
      : ["키워드 정보가 없습니다."];

  // 태그에서 관심사 출력
  const interests: string[] =
    interest && interest.length > 0
      ? interest.slice(0, 3)
      : ["키워드 정보가 없습니다."];

  return (
    <>
      <div className="flex gap-6 my-10 items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <img
            src={profileImg}
            className="w-[200px] h-[200px] rounded-full object-cover object-center"
          />
          <Button
            className="w-28 h-6 text-[10px] dark:text-[var(--dark-black)]"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            프로필 보기
          </Button>
        </div>
        <div className="w-[310px] h-full rounded-2xl py-3.5 px-[18px]">
          <div className="flex flex-col gap-4 px-3 justify-center items-start">
            <div className="flex gap-1.5 items-end">
              <span className="text-[18px] font-bold">{name}</span>
              <span className="text-[10px] font-bold text-[var(--gray-500)]/80 dark:text-[var(--gray-300)]">
                {age}
              </span>
            </div>
            <span className="text-[11px]">{message}</span>
          </div>
          <hr className="border-[var(--primary-pink)] w-[248px] my-4" />
          <div className="px-5 justify-between flex text-[14px] text-[var(--gray-500)] font-bold dark:text-[var(--gray-300)]">
            {items?.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
          <div className="my-5 flex flex-col gap-2.5 w-full">
            <ul className="flex flex-wrap justify-center gap-y-2.5 gap-x-1">
              {keywords.map((keyword, idx) => (
                <li
                  key={`${keyword}-${idx}`}
                  className="px-3.5 py-1 border border-[var(--primary-pink)] rounded-[50px] flex items-center"
                >
                  <span className="text-[12px] text-[var(--gray-50)]">
                    {keyword}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap justify-center gap-2">
              {interests.map((interest, idx) => (
                <li
                  key={`${interest}-${idx}`}
                  className="px-3.5 py-1 border border-[var(--primary-pink)] rounded-[50px] flex items-center"
                >
                  <span className="text-[12px] text-[var(--gray-50)]">
                    {interest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
