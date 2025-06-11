import { twMerge } from "tailwind-merge";
import Icon from "../common/Icon";

export default function ProfileCard({
  nickname,
  image,
  isPartner = false,
  isCouple = false,
  isMain = false,
  isEdited = false,
}: {
  nickname?: string;
  image: string | null;
  isPartner?: boolean;
  isCouple?: boolean;
  isMain?: boolean;
  isEdited?: boolean;
}) {
  if (image) {
    return (
      <div
        className={twMerge(
          "group relative p-[15px] flex flex-col justify-center items-center shadow-[0_2px_7px_0_rgba(0,0,0,0.25)] rounded-2xl",
          isCouple &&
            "hover:scale-102 transition-all duration-300 hover:shadow-[0_10px_10px_0_rgba(0,0,0,0.25)]"
        )}
      >
        {isMain && (
          <Icon
            width="37px"
            height="78px"
            left="-164px"
            top="-449px"
            className="absolute top-0 left-6 z-10"
          />
        )}
        <img
          draggable="false"
          className={twMerge(
            "w-[236px] h-[294px] rounded-2xl object-cover",
            !isMain && "w-[190px] h-[239px]",
            (isCouple || isEdited) && "w-[300px] h-[373px]"
          )}
          src={image}
          alt={isMain || isCouple ? "메인 이미지" : "서브 이미지"}
        />
        {isEdited && (
          <div className="group absolute flex justify-center items-center w-[300px] h-[373px] rounded-2xl object-cover cursor-pointer hover:bg-[rgba(0,0,0,0.5)]">
            <div className="hidden group-hover:flex justify-center items-center w-[75px] h-[75px] bg-[#EAEAEA] rounded-full">
              <Icon width="44px" height="44px" left="-136px" top="-387px" />
            </div>
          </div>
        )}
        {isCouple && (
          <span className="text-lg mt-[15px]">
            <strong
              className={twMerge(
                isPartner && "text-[var(--primary-pink-point)]"
              )}
            >
              {nickname}
            </strong>
            님
          </span>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative p-[18px] flex flex-col justify-center items-center w-[330px] shadow-[0_2px_7px_0_rgba(0,0,0,0.25)] rounded-2xl">
        {isMain && (
          <Icon
            width="37px"
            height="78px"
            left="-164px"
            top="-449px"
            className="absolute top-0 left-6"
          />
        )}
        <div
          className={twMerge(
            "flex justify-center items-center w-[300px] h-[373px] rounded-2xl object-cover bg-[#EAEAEA] cursor-pointer",
            "hover:bg-[#cfcfcf]"
          )}
        >
          <Icon width="44px" height="44px" left="-136px" top="-387px" />
        </div>
      </div>
    );
  }
}
