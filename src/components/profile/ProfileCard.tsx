import { twMerge } from "tailwind-merge";

export default function ProfileCard({
  nickname,
  image,
  isPartner,
}: {
  nickname?: string;
  image: string;
  isPartner?: boolean;
}) {
  return (
    <div className="relative p-[18px] flex flex-col justify-center items-center w-[330px] shadow-[0_2px_7px_0_rgba(0,0,0,0.25)] rounded-2xl">
      {/* 솔로이고, 메인 이미지일 경우 */}
      {/* <Icon
        width="37px"
        height="78px"
        left="-164px"
        top="-449px"
        className="absolute top-0 left-6"
      /> */}
      <img
        className="w-[300px] h-[373px] rounded-2xl object-cover"
        src={image}
        alt=""
      />
      <span className="text-xl mt-[15px]">
        <strong
          className={twMerge(isPartner && "text-[var(--main-pink-color)]")}
        >
          {nickname}
        </strong>
        님
      </span>
    </div>
  );
}
