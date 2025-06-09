import profileImage from "../../assets/images/profile_image.png";
import Button from "../common/Button";

export default function FollowModal() {
  return (
    <div className="fixed top-[calc(50%-354px)] z-100 bg-white p-6 flex flex-col w-[400px] h-[708px] shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] rounded-[10px]">
      <span className="text-center text-lg pb-[10px] w-full border-b border-[var(--primary-pink)]">
        팔로워
      </span>
      <ul className="flex flex-col">
        <li className="flex justify-between mt-5 pb-[10px] items-center border-b border-[var(--primary-pink)]">
          <div className="flex items-center gap-5">
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-[45px] h-[45px] rounded-full"
            />
            <span className="">사용자1</span>
          </div>
          <Button className="w-[94px] h-[33px]">팔로우</Button>
        </li>
        <li className="flex justify-between mt-5 pb-[10px] items-center border-b border-[var(--primary-pink)]">
          <div className="flex items-center gap-5">
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-[45px] h-[45px] rounded-full"
            />
            <span className="">사용자1</span>
          </div>
          <Button disabled className="w-[94px] h-[33px]">
            팔로우
          </Button>
        </li>
        <li className="flex justify-between mt-5 pb-[10px] items-center border-b border-[var(--primary-pink)]">
          <div className="flex items-center gap-5">
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-[45px] h-[45px] rounded-full"
            />
            <span className="">사용자1</span>
          </div>
          <Button className="w-[94px] h-[33px]">팔로우</Button>
        </li>
      </ul>
    </div>
  );
}
