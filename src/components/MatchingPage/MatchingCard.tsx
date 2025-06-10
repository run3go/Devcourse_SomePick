import React, { useState } from "react";
import image from "../../assets/images/image 8.png";
import MatchingCardInfo from "./MatchingCardInfo";

interface MatchingCardProps {
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

  //hover 트리거용인 경우에만 group
  const outerClasses = [
    width,
    height,
    "overflow-hidden",
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
            ${blurClass}
          `}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className={`${text} text-center`}>현우님의 이상형과 100% 일치해요!</h2>
          <div className="flex-grow flex items-center justify-center">
            <div className={`${imageWidth} ${imageHeight} rounded-lg overflow-hidden`}>
              <img src={image} alt="매칭 이미지" className="w-full h-full object-cover" />
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
          <MatchingCardInfo />
        </div>
      </div>
    </div>
  );
}
