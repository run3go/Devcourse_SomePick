import profileImage from "../../assets/images/profile_image.png";
import profileImage2 from "../../assets/images/profile_image2.png";
import Button from "../common/Button";
import Icon from "../common/Icon";
import ProfileCard from "./ProfileCard";

export default function CoupleProfile() {
  return (
    <div className="w-full bg-[#FFFBFB] p-9 pb-[60px] mb-[30px]">
      <div className="w-full text-center">
        <h2 className="font-bold text-2xl">
          {/* 나의 프로필일 경우 */}
          {/* My Profile */}
          <span className="text-[var(--primary-pink-tone)]">차은우</span>
          님의 Profile
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="mt-8 flex gap-[45px]">
          <ProfileCard nickname="차은우" image={profileImage} isCouple />
          <Icon
            width="76px"
            height="70px"
            left="-330px"
            top="-449px"
            className="self-center"
          />
          <ProfileCard
            nickname="고윤정"
            image={profileImage2}
            isPartner
            isCouple
          />
        </div>
        <div className="flex flex-col gap-[70px] justify-center">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-around gap-[29px] mt-[38px] font-semibold text-xl">
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <span className="group-hover:text-black">팔로워</span>
                <span className="text-[var(--primary-pink-tone)]">19</span>
              </div>
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <span className="group-hover:text-black">팔로잉</span>
                <span className="text-[var(--primary-pink-tone)]">2</span>
              </div>
              <div className="group flex flex-col items-center gap-2 cursor-pointer">
                <span className="group-hover:text-black">게시글</span>
                <span className="text-[var(--primary-pink-tone)]">9</span>
              </div>
            </div>
            <div className="flex gap-7 mt-[22px]">
              <Button className="w-[300px] h-[38px] gap-2">
                <Icon width="24px" height="23px" left="-67px" top="-398px" />
                <span className="inline-block leading-[1]">팔로우하기</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
