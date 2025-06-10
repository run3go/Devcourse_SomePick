import image from "../../assets/images/image 8.png";
import MatchingCardInfo from "./MatchingCardInfo";

interface MatchingCardProps {
  blurClass?: string;
  disableFlip?: boolean; // ← 추가
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
  width = "w-[600px]",
  height = "h-[800px]",
  imageWidth = "w-[500px]",
  imageHeight = "h-[624px]",
  text = "text-[24px]",
  onClick,
}: MatchingCardProps) {
  const outerClasses = [width, height, "overflow-hidden", !disableFlip ? "group" : ""].join(" ");

  const innerClasses = [
    "w-full h-full",
    "relative transform transition-transform duration-500",
    !disableFlip ? "group-hover:rotate-y-180" : "",
  ].join(" ");

  return (
    <div style={{ perspective: "1000px" }} className={outerClasses} onClick={onClick}>
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
