import React, { useState } from "react";
import MatchingCardInfo from "./MatchingCardInfo";
import type { Database } from "../../types/supabase";
import { useAuthStore } from "../../stores/authstore";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

interface MatchingCardProps {
  profile: Profiles;
  blurClass?: string;
  disableFlip?: boolean;
  flipOnHover?: boolean;
  width?: string;
  height?: string;
  imageWidth?: string;
  imageHeight?: string;
  text?: string;
  onClick?: () => void;
}

export default function MatchingCard({
  profile,
  blurClass = "",
  disableFlip = false,
  flipOnHover = false,
  width = "w-[600px]",
  height = "h-[800px]",
  imageWidth = "w-[500px]",
  imageHeight = "h-[624px]",
  text = "text-[24px]",
  onClick,
}: MatchingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const session = useAuthStore((state) => state.session);
  const ideal_types = session!.user.user_metadata?.ideal_types;
  const idealArray = ideal_types
    .split(",")
    .map((t: string) => t.trim())
    .filter(Boolean);

  const matched = idealArray.filter((type: string) => profile.keywords!.includes(type));

  const matchPercent =
    idealArray.length > 0 ? Math.round((matched.length / idealArray.length) * 100) : 0;

  const outerClasses = [
    width,
    height,
    "overflow-hidden",
    "cursor-pointer",
    flipOnHover && !disableFlip ? "group" : "",
  ].join(" ");

  // 회전 클래스
  const innerClasses = [
    "w-full h-full relative transform transition-transform duration-500",
    // hover flip
    flipOnHover && !disableFlip ? "group-hover:rotate-y-180" : "",
    // click flip
    !flipOnHover && !disableFlip && isFlipped ? "rotate-y-180" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // 클릭 핸들러
  const handleClick = () => {
    if (disableFlip && onClick) {
      onClick();
    } else if (!disableFlip && !flipOnHover) {
      setIsFlipped((f) => !f);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div style={{ perspective: "1000px" }} className={outerClasses} onClick={handleClick}>
      <div className={innerClasses} style={{ transformStyle: "preserve-3d" }}>
        {/* 앞면 */}
        <div
          className={`
            absolute inset-0 
            rounded-[20px] bg-[#F6F6F6] shadow-md flex flex-col p-6
           dark:bg-[#4B4B4B] dark:text-white
            ${blurClass}
          `}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className={`${text} text-center`}>
            {profile.nickname}님은 이상형과 {matchPercent}% 일치해요!
          </h2>
          <div className="flex-grow flex items-center justify-center">
            <div className={`${imageWidth} ${imageHeight} rounded-lg overflow-hidden`}>
              <img
                src={profile.main_image!}
                alt="매칭 이미지"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 뒷면 */}
        <div
          className="absolute inset-0"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <MatchingCardInfo profile={profile} />
        </div>
      </div>
    </div>
  );
}
