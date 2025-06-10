import image from "../../assets/images/KakaoTalk_20241210_084712919.jpg";

export default function Postcard() {
  return (
    <div
      className="flex items-stretch w-[1360px] h-[280px]
                 border-2 rounded-xl border-[#FFC7ED]
                 hover:border-[#FF66B3] hover:shadow-lg
                 transition-all duration-200
                 bg-white cursor-pointer p-8"
    >
      <div className="flex-1  flex flex-col">
        <div className="space-y-2">
          {/* 프로필 */}
          <div className="flex items-center">
            <img
              src={image}
              alt="사진"
              className="w-[44px] h-[40px] rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <span className="font-medium">이현우</span>
              <span className="text-[#969696]">2025.06.07</span>
            </div>
          </div>

          {/* 제목 */}
          <h2 className="text-lg font-bold">안녕하세요 이현우에요</h2>

          {/* 본문 */}
          <p className="leading-relaxed overflow-hidden line-clamp-4">제가 진짜 좀 힘들어요</p>
        </div>

        {/* 좋아요 댓글 */}
        <div className="flex items-center space-x-6 mt-auto">
          <div className="flex items-center">
            <span className="heart mr-1" />
            <span>10</span>
          </div>
          <div className="flex items-center">
            <span className="comment mr-1" />
            <span>71</span>
          </div>
        </div>
      </div>

      {/* 우측 이미지 */}
      <div className="p-4 flex-shrink-0 self-center">
        <img src={image} alt="Post" className="w-[241px] h-[214px] object-cover rounded-lg" />
      </div>
    </div>
  );
}
