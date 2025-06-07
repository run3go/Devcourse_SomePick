export default function SortDropdown() {
  return (
    <div className="relative inline-block text-left text-[#666666] border-[#666666]">
      {/* 최신순 버튼 */}
      <button className="h-[32px] px-2 bg-white flex items-center cursor-pointer text-[16px] leading-none">
        최신순
        <span className="toggle-icon" />
      </button>
      {/* 드롭다운 */}
      <div className="absolute mt-1 w-full rounded-md bg-white border">
        <div className="flex items-center h-[32px] px-4 hover:bg-pink-100 cursor-pointer text-[16px]">
          최신순
        </div>
        <div className="flex items-center h-[32px] px-4 hover:bg-pink-100 cursor-pointer text-[16px]">
          인기순
        </div>
      </div>
    </div>
  );
}
