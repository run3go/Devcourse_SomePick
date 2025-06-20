import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../../stores/authStore";
import type { Database } from "../../types/supabase";
import MatchingCardInfo from "./MatchingCardInfo";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

interface MatchingCardProps {
  profile: Profiles;
  disableActionButton?: boolean;
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
  disableActionButton,
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
  const ideal_types = session?.user.user_metadata?.ideal_types ?? "";
  const idealArray = ideal_types
    .split(",")
    .map((t: string) => t.trim())
    .filter(Boolean);

  const matched =
    idealArray.length && profile.keywords
      ? idealArray.filter((type: string) => profile.keywords!.includes(type))
      : [];

  const matchPercent =
    idealArray.length > 0
      ? Math.round((matched.length / idealArray.length) * 100)
      : 0;

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
    <div
      style={{ perspective: "1000px" }}
      className={twMerge(outerClasses, "select-none")}
      onClick={handleClick}
    >
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
          <h2 className={`${text} text-center mb-3`}>
            <strong className="text-[var(--primary-pink-point)]">
              {profile.nickname}
            </strong>
            님은 이상형과 {matchPercent}% 일치해요!
          </h2>
          <div
            className={twMerge(
              "flex-grow flex items-center justify-center",
              height === "h-[450px]" && "max-h-[366px]",
              height === "h-full" && "max-h-[704px]"
            )}
          >
            <div
              className={`${imageWidth} ${imageHeight} rounded-lg overflow-hidden`}
            >
              <img
                draggable={false}
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
          <MatchingCardInfo
            profile={profile}
            disableActionButton={disableActionButton}
          />
        </div>
      </div>
    </div>
  );
}
