export default function Tags() {
  const tags = [
    {
      text: "키워드 매칭",
      bg: "var(--primary-pink)",
      color: "var(--white)",
    },
    { text: "잘생긴", bg: "", color: "var(--gray-700)" },
    { text: "얘기를 잘 들어주는", bg: "", color: "var(--gray-700)" },
    { text: "전시 관람", bg: "", color: "var(--gray-700)" },
    { text: "❤️", bg: "", color: "var(--gray-700)" },
    { text: "돈이 많은", bg: "", color: "var(--gray-700)" },
    {
      text: "다양한 키워드",
      bg: "var(--primary-pink)",
      color: "var(--white)",
    },
    { text: "예쁜", bg: "", color: "var(--gray-700)" },
    { text: "스윗남 / 스윗녀", bg: "", color: "000000" },
    { text: "똑똑한", bg: "", color: "var(--gray-700)" },
    { text: "성격 좋음", bg: "", color: "var(--gray-700)" },
    { text: "낮져밤이", bg: "", color: "var(--gray-700)" },
    { text: "사진 찍기", bg: "", color: "var(--gray-700)" },
    {
      text: "취향 맞춤형",
      bg: "var(--primary-pink)",
      color: "var(--white)",
    },
    { text: "애정 표현이 많은", bg: "", color: "var(--gray-700)" },
    { text: "여행", bg: "", color: "var(--gray-700)" },
    { text: "고양이상", bg: "", color: "var(--gray-700)" },
    { text: "듬직한", bg: "", color: "var(--gray-700)" },
    { text: "오픈마인드", bg: "", color: "var(--gray-700)" },
    { text: "📱", bg: "", color: "var(--gray-700)" },
    {
      text: "딱 맞는 이상형",
      bg: "var(--primary-pink)",
      color: "var(--white)",
    },
    { text: "꿀보이스", bg: "", color: "var(--gray-700)" },
    { text: "집순이 / 집돌이", bg: "", color: "var(--gray-700)" },
    { text: "드라이브", bg: "", color: "var(--gray-700)" },
    { text: "캠핑", bg: "", color: "var(--gray-700)" },
    { text: "패셔니스타", bg: "", color: "var(--gray-700)" },
    { text: "솔로 탈출", bg: "var(--primary-pink)", color: "var(--white)" },
    { text: "😍", bg: "", color: "var(--gray-700)" },
    { text: "유머감각", bg: "", color: "var(--gray-700)" },
    { text: "🍀", bg: "", color: "var(--gray-700)" },
    { text: "독서", bg: "", color: "var(--gray-700)" },
    { text: "귀여운", bg: "", color: "var(--gray-700)" },
    { text: "영화", bg: "", color: "var(--gray-700)" },
    { text: "ISFJ", bg: "", color: "var(--gray-700)" },
    {
      text: "내가 원하는 조건",
      bg: "var(--primary-pink)",
      color: "var(--white)",
    },
    { text: "맛집 탐방", bg: "", color: "var(--gray-700)" },
    { text: "춤을 좋아하는", bg: "", color: "var(--gray-700)" },
    { text: "연하 / 연상", bg: "", color: "var(--gray-700)" },
    { text: "러닝", bg: "", color: "var(--gray-700)" },
    { text: "웃는게 예쁜", bg: "", color: "var(--gray-700)" },
    { text: "매력적인", bg: "", color: "var(--gray-700)" },
    { text: "👍🏻", bg: "", color: "var(--gray-700)" },
    { text: "배려심 많은", bg: "", color: "var(--gray-700)" },
    { text: "ENTP", bg: "", color: "var(--gray-700)" },
    { text: "감성적인", bg: "", color: "var(--gray-700)" },
    { text: "대화가 잘 통하는", bg: "", color: "var(--gray-700)" },
    { text: "취미 공유", bg: "", color: "var(--gray-700)" },
    { text: "계획적인", bg: "", color: "var(--gray-700)" },
    { text: "MBTI 궁합", bg: "var(--primary-pink)", color: "var(--white)" },
    { text: "설렘 폭발", bg: "var(--primary-pink)", color: "var(--white)" },
    { text: "운동 좋아하는", bg: "", color: "var(--gray-700)" },
    { text: "감동을 잘 주는", bg: "", color: "var(--gray-700)" },
  ];
  return (
    <>
      <div className="border border-[var(--primary-pink)] shadow-md w-[540px] h-[590px] rounded-[20px]">
        <div className="mx-[30px] my-[30px] flex flex-wrap gap-2 justify-center">
          {tags.map((tag, index) => {
            const isWhiteText = tag.color === "var(--gray-700)";

            return (
              <span
                key={index}
                className={`border border-[var(--primary-pink)] px-2 py-1 rounded-full text-[18px] ${
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
