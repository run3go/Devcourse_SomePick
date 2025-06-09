import image from "../../assets/images/image 8.png";

interface MatchingCardProps {
  blurClass?: string;
  width?: string;
  height?: string;
  imageWidth?: string;
  imageHeight?: string;
  text?: string;
}

export default function MatchingCard({
  blurClass = "",
  width = "w-[600px]",
  height = "h-[800px]",
  imageWidth = "w-[500px]",
  imageHeight = "h-[624px]",
  text = "text-[24px]",
}: MatchingCardProps) {
  return (
    <div
      className={`
        ${width} ${height}
        rounded-[20px]
        bg-[#F6F6F6]
        shadow-md
        flex flex-col
        p-6
        ${blurClass}
      `}
    >
      {/* 상단 텍스트 */}
      <h2 className={`${text} text-center`}>현우님의 이상형과 100% 일치해요!</h2>

      {/* 이미지 영역 */}
      <div className="flex-grow flex items-center justify-center">
        <div className={`${imageWidth} ${imageHeight} rounded-lg overflow-hidden`}>
          <img src={image} alt="매칭 이미지" className="w-[246] h-[307] object-cover" />
        </div>
      </div>
    </div>
  );
}
