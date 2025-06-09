export default function Tags() {
  const tags = [
    { text: "키워드 매칭", bg: "#FFC7ED", color: "#FFFFFF" },
    { text: "잘생긴", bg: "", color: "#000000" },
    { text: "얘기를 잘 들어주는", bg: "", color: "#000000" },
    { text: "전시 관람", bg: "", color: "#000000" },
    { text: "❤️", bg: "", color: "#FFFFFF" },
    { text: "돈이 많은", bg: "", color: "#000000" },
    { text: "다양한 키워드", bg: "#FFC7ED", color: "#FFFFFF" },
    { text: "예쁜", bg: "", color: "#000000" },
    { text: "스윗남 / 스윗녀", bg: "", color: "000000" },
    { text: "똑똑한", bg: "", color: "#000000" },
    { text: "성격 좋음", bg: "", color: "#000000" },
    { text: "낮져밤이", bg: "", color: "#000000" },
    { text: "사진 찍기", bg: "", color: "#000000" },
    { text: "취향 맞춤형", bg: "#FFC7ED", color: "#FFFFFF" },
    { text: "애정 표현이 많은", bg: "", color: "#000000" },
    { text: "여행", bg: "", color: "#000000" },
    { text: "고양이상", bg: "", color: "#000000" },
    { text: "듬직한", bg: "", color: "#000000" },
    { text: "오픈마인드", bg: "", color: "#000000" },
    { text: "📱", bg: "", color: "#000000" },
    { text: "딱 맞는 이상형", bg: "#FFC7ED", color: "#FFFFFF" },
    { text: "꿀보이스", bg: "", color: "#000000" },
    { text: "집순이 / 집돌이", bg: "", color: "#000000" },
    { text: "드라이브", bg: "", color: "#000000" },
    { text: "캠핑", bg: "", color: "#000000" },
    { text: "패셔니스타", bg: "", color: "#000000" },
    { text: "솔로 탈출", bg: "#FFC7ED", color: "#FFFFFF" },
    { text: "😍", bg: "", color: "#000000" },
    { text: "유머감각", bg: "", color: "#000000" },
    { text: "🍀", bg: "", color: "#000000" },
    { text: "독서", bg: "", color: "#000000" },
    { text: "귀여운", bg: "", color: "#000000" },
    { text: "영화", bg: "", color: "#000000" },
    { text: "댕댕미", bg: "", color: "#000000" },
    { text: "내가 원하는 조건", bg: "#FFC7ED", color: "#FFFFFF" },
    { text: "맛집 탐방", bg: "", color: "#000000" },
    { text: "춤을 좋아하는", bg: "", color: "#000000" },
    { text: "연하 / 연상", bg: "", color: "#000000" },
    { text: "러닝", bg: "", color: "#000000" },
    { text: "웃는게 예쁜", bg: "", color: "#000000" },
    { text: "매력적인", bg: "", color: "#000000" },
    { text: "👍🏻", bg: "", color: "#000000" },
  ];
  return (
    <>
      <div className="border border-[#FFC7ED] shadow-md w-[540px] h-[460px] rounded-[20px]">
        <div className="mx-[30px] my-[30px] flex flex-wrap gap-2 justify-center">
          {tags.map((tag, index) => {
            const isWhiteText = tag.color === "#FFFFFF";

            return (
              <span
                key={index}
                className={`border border-[#FFC7ED] px-2 py-1 rounded-full text-[18px] ${
                  isWhiteText ? "font-bold" : ""
                }`}
                style={{
                  backgroundColor: tag.bg,
                  color: tag.color,
                }}
              >
                {tag.text}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
