import Icon from "../common/Icon";
import MoreMenu from "./MoreMenu";

export default function PostHeader({ profileImg }: { profileImg: string }) {
  return (
    <>
      <header>
        <div className="flex justify-between items-center">
          <h1 className="text-[20px]">첫 데이트… 너무 귀엽고 설렜어요ㅎㅎ💓</h1>
          <div className="relative inline-block">
            <Icon width="14px" height="4px" left="-511px" top="-768px" />
            <MoreMenu />
          </div>
        </div>
        <span className="text-[16px] text-[#969696]">
          2025년 06월 04일 17:16
        </span>
      </header>
      <hr className="my-[15px] border-white border-1" />
      <div className="flex gap-2.5 mb-5 items-center">
        <img
          className="w-[30px] h-[30px] rounded-full object-center object-cover"
          src={profileImg}
        />
        <span className="cursor-pointer">차은우</span>
      </div>
    </>
  );
}
