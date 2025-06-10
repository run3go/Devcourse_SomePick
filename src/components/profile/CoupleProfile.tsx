import profileImage2 from "../../assets/images/profile_image2.png";
import Button from "../common/Button";
import Icon from "../common/Icon";
import ProfileCard from "./ProfileCard";

export default function CoupleProfile({
  coupleProfile,
  isMyProfile,
}: {
  coupleProfile: ProfileData;
  isMyProfile: boolean;
}) {
  const { main_image, nickname, partner_nickname } = coupleProfile;
  return (
    <div className="w-full bg-[#FFFBFB] p-9 pb-[60px]">
      <div className="w-full text-center">
        <h2 className="font-bold text-2xl">
          {isMyProfile ? (
            "My Profile"
          ) : (
            <>
              <span className="text-[var(--primary-pink-tone)]">
                {nickname}
              </span>
              님의 Profile
            </>
          )}
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-8 flex gap-[45px]">
          <ProfileCard nickname={nickname} image={main_image} isCouple />
          <Icon
            width="76px"
            height="70px"
            left="-330px"
            top="-449px"
            className="self-center"
          />
          <ProfileCard
            nickname={partner_nickname!}
            image={profileImage2}
            isPartner
            isCouple
          />
        </div>
        <div className="flex flex-col gap-[70px] justify-center">
          <div className="flex flex-col items-center w-75">
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
            <div className="flex gap-7 mt-[22px]">
              {isMyProfile && (
                <Button className="w-[300px] h-[38px] gap-2">
                  <Icon width="24px" height="23px" left="-67px" top="-398px" />
                  <span className="inline-block leading-[1]">팔로우하기</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
