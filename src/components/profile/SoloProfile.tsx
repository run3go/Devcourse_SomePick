import Button from "../common/Button";
import Icon from "../common/Icon";
import ProfileCard from "./ProfileCard";

export default function SoloProfile({
  soloProfile,
  isMyProfile,
}: {
  soloProfile: ProfileData;
  isMyProfile: boolean;
}) {
  const { description, main_image, sub_image, nickname } = soloProfile;

  return (
    <div className="w-full bg-[#FFFBFB] p-9 pb-[60px] mb-[30px]">
      <div className="w-full text-center">
        <h2 className="font-bold text-2xl">
          {/* 나의 프로필일 경우 */}
          {/* My Profile */}
          <span className="text-[var(--primary-pink-tone)]">{nickname}</span>
          님의 Profile
        </h2>
      </div>
      <div className="flex justify-around">
        <div className="mt-16 flex gap-[32px] items-end">
          <ProfileCard image={main_image} isMain />
          <ProfileCard image={sub_image} />
        </div>
        <div className="flex flex-col gap-[70px] justify-center w-100">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-evenly gap-[29px] mt-[38px] font-semibold text-xl">
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <span className="group-hover:text-black">팔로워</span>
                <span className="text-[var(--primary-pink-tone)] group-hover:text-[var(--primary-pink-point)]">
                  19
                </span>
              </div>
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <span className="group-hover:text-black">팔로잉</span>
                <span className="text-[var(--primary-pink-tone)] group-hover:text-[var(--primary-pink-point)]">
                  2
                </span>
              </div>
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <span className="group-hover:text-black">게시글</span>
                <span className="text-[var(--primary-pink-tone)] group-hover:text-[var(--primary-pink-point)]">
                  9
                </span>
              </div>
            </div>
            {isMyProfile && (
              <div className="flex gap-7 mt-[22px]">
                <Button className="w-[177px] h-[38px] gap-2">
                  <Icon width="24px" height="23px" left="-67px" top="-398px" />
                  <span className="inline-block leading-[1]">팔로우하기</span>
                </Button>
                <Button className="w-[177px] h-[38px] gap-2">
                  <Icon width="23px" height="21px" left="-99px" top="-399px" />
                  <span className="inline-block leading-[1]">하트 보내기</span>
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[18px]">
            <div className="flex items-center gap-2">
              <Icon width="10px" height="9px" left="-49px" top="-405px" />
              <span className="font-semibold text-[var(--primary-pink-tone)]">
                한줄 소개
              </span>
            </div>
            <div className="py-3 pl-5 w-full border-3 border-[var(--gray-200)] rounded-[20px] bg-white">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
