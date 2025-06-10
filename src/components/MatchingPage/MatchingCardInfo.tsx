import image from "../../assets/images/image 8.png";
import Icon from "../common/Icon";
import Button from "../common/Button";

export default function MatchingCardInfo() {
  const keywords = [
    "잘생김",
    "예쁨",
    "귀여움",
    "성격 좋음",
    "감성적인",
    "패셔니스타",
    "착함",
    "똑똑함",
  ];

  const handleSendHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 하트 보내기 로직
    console.log("하트 보냈습니다!");
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 프로필 보기 로직
    console.log("프로필 보기!");
  };

  return (
    <div className="w-[600px] h-[800px] rounded-[20px] overflow-hidden shadow-md">
      {/* 상단 */}
      <div className="w-full h-[400px] bg-[#F6F6F6] flex flex-col items-center justify-center space-y-4">
        {/* 프로필이미지 */}
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
          <img src={image} alt="프로필 이미지" className="w-full h-full object-cover" />
          {/* 한줄소개 */}
        </div>
        <p className="text-[24px] text-center">여기에 한줄 소개가 들어갑니다.</p>
      </div>

      {/* 하단 */}
      <div className="w-full h-[400px] bg-white flex flex-col items-center justify-center gap-[40px]">
        <h2 className="text-[32px] text-[#FFC7ED] font-semibold">차은우</h2>
        <div className="flex gap-[30px]">
          {/* 하트 보내기 버튼 */}
          <Button
            className="w-[200px] h-[60px] text-[20px] text-[#FFFFFF] gap-2"
            onClick={handleSendHeart}
          >
            <Icon width="26px" height="24px" left="-564px" top="-227px" />
            <span className="inline-block leading-[1]">하트보내기</span>
          </Button>

          {/* 프로필 보기 버튼 */}
          <Button
            className="w-[200px] h-[60px] text-[20px] text-[#FFFFFF] gap-2"
            onClick={handleViewProfile}
          >
            <Icon width="22px" height="28px" left="-621px" top="-224px" />
            <span className="inline-block leading-[1]">프로필 보기</span>
          </Button>
        </div>
        {/* 정보 */}
        <div className="text-[20px] text-[#969696] flex gap-11">
          <span>만25세</span>
          <span>180cm</span>
          <span>서울</span>
          <span>공무원</span>
        </div>
        {/* 키워드 */}
        <ul className="flex flex-wrap justify-center gap-[10px] w-[450px]">
          {keywords.map((keyword) => (
            <li
              key={keyword}
              className="px-[13px] py-[5px] border border-[var(--primary-pink)] rounded-[50px]"
            >
              <span className="text-[20px] text-black">{keyword}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
