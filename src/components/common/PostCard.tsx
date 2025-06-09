import profileImage from "../../assets/images/profile_image.png";
import Icon from "./Icon";

export default function PostCard() {
  return (
    <div className="flex flex-col gap-3 w-full p-5 border-1 border-[var(--sub-pink-color)] cursor-pointer rounded-2xl hover:border-[var(--main-pink-color)] hover:shadow-[0_3px_8px_0_rgba(255,102,179,0.24)]">
      <span className="text-[var(--sub-pink-color)] text-sm font-semibold">
        연애백과
      </span>
      <div className="flex justify-between">
        <div>
          <div className="flex gap-[10px] mb-3">
            <img
              className="w-[30px] h-[30px] rounded-full object-cover"
              src={profileImage}
              alt="프로필 이미지"
            />
            <span>차은우</span>
            <span className="text-[var(--sub-gray-color)]">2025.06.04</span>
          </div>
          <h4 className="text-xl mb-3">
            장거리 연애 1년째… 솔직히 좀 지치네요😢
          </h4>
          <span className="inline-block w-[900px] text-ellipsis text-nowrap overflow-hidden">
            연애한 지는 1년 넘었는데, 서로 다른 지역이라 계속 장거리 중이에요.
            한 달에 한두 번 정도밖에 못 보니까 자꾸 서운한 게 생기더라고요 ㅠ
            영상통화나 톡으
          </span>
        </div>
        <img
          className="w-[85px] h-[85px] rounded-2xl self-end object-cover"
          src={profileImage}
          alt="게시물 이미지"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-1">
          <Icon width="18px" height="16px" left="-415px" top="-762px" />
          <span className="inline-block leading-1">90</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon width="18px" height="16px" left="-415px" top="-762px" />
          <span className="inline-block leading-1">2</span>
        </div>
      </div>
    </div>
  );
}
