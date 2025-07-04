import { useState } from "react";
import { useNavigate } from "react-router";
import { sendHeart } from "../../apis/matching";
import { notifyHeart } from "../../apis/notification";
import type { Database } from "../../types/supabase";
import Button from "../common/Button";
import Icon from "../common/Icon";
import {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
} from "../common/ShowToast";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

interface MatchingCardInfoProps {
  profile: Profiles;
  disableActionButton?: boolean; // 추가
}

export default function MatchingCardInfo({
  profile,
  disableActionButton,
}: MatchingCardInfoProps) {
  const navigate = useNavigate();
  const [isAlreadySent, setIsAlreadySent] = useState(false);

  const keywords =
    profile.keywords && profile.keywords.length > 0
      ? profile.keywords
      : ["키워드 정보가 없습니다."];

  const interests =
    profile.interests && profile.interests.length > 0
      ? profile.interests
      : ["관심사 정보가 없습니다."];

  const keywordsToShow = keywords.slice(0, 4);
  const interestsToShow = interests.slice(0, 4);

  const handleSendHeart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const alreadySent = await sendHeart(profile.id);
    if (alreadySent === true) {
      showWarnToast("이미 하트를 보낸 상대입니다.");
      setIsAlreadySent(alreadySent);
    } else if (alreadySent === false) {
      showSuccessToast("하트를 성공적으로 보냈습니다!");
      setIsAlreadySent(!alreadySent);
      await notifyHeart(profile.id);
    } else {
      showErrorToast("하트를 보내는 중 문제가 발생했습니다.");
    }
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 프로필 보기 로직
    navigate(`/profile/${profile.id}`);
  };

  return (
    <div className="w-[600px] h-[800px] rounded-[20px] overflow-hidden shadow-md">
      {/* 상단 */}
      <div className="w-full h-[400px] bg-[#F6F6F6] flex flex-col items-center justify-center space-y-4 dark:bg-[#a8a8a8] dark:textwi">
        {/* 프로필이미지 */}
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
          <img
            draggable={false}
            src={profile.sub_image!}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
          {/* 한줄소개 */}
        </div>
        <p className="text-[24px] text-center dark:text-white">
          {profile.description}
        </p>
      </div>

      {/* 하단 */}
      <div className="w-full h-[400px] bg-white flex flex-col items-center justify-center gap-[40px] dark:bg-[#4B4B4B]">
        <h2 className="text-[32px] text-[#FFC7ED] font-semibold">
          {profile.nickname}
        </h2>
        <div className="flex gap-[30px]">
          {/* 하트 보내기 버튼 */}
          <Button
            className="w-[200px] h-[60px] text-[20px] text-[#FFFFFF] gap-2"
            onClick={handleSendHeart}
            disabled={disableActionButton || isAlreadySent}
          >
            <Icon width="26px" height="24px" left="-564px" top="-227px" />
            <span className="inline-block leading-[1]">
              {isAlreadySent ? "연결 대기중.." : "하트보내기"}
            </span>
          </Button>

          {/* 프로필 보기 버튼 */}
          <Button
            className="w-[200px] h-[60px] text-[20px] text-[#FFFFFF] gap-2"
            onClick={handleViewProfile}
            disabled={disableActionButton}
          >
            <Icon width="22px" height="28px" left="-621px" top="-224px" />
            <span className="inline-block leading-[1]">프로필 보기</span>
          </Button>
        </div>
        {/* 정보 */}
        <div className="text-[20px] text-[#969696] flex gap-11 dark:text-neutral-300">
          <span>만{profile.age}세</span>
          <span>{profile.height}cm</span>
          <span>{profile.location}</span>
          <span>{profile.job}</span>
        </div>
        {/* 키워드 */}
        <div className="w-[600px] flex flex-col items-center space-y-3">
          <ul className="flex flex-wrap justify-center gap-[10px]">
            {keywordsToShow.map((keyword, idx) => (
              <li
                key={`${keyword}-${idx}`}
                className="px-[13px] py-[5px] border border-[var(--primary-pink)] rounded-[50px]"
              >
                <span className="text-[17px] text-black dark:text-white">
                  {keyword}
                </span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-[10px]">
            {interestsToShow.map((interest, idx) => (
              <li
                key={`${interest}-${idx}`}
                className="px-[13px] py-[5px] border border-[var(--primary-pink)] rounded-[50px]"
              >
                <span className="text-[17px] text-black dark:text-white">
                  {interest}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
