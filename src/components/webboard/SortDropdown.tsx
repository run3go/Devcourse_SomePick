export default function SortDropdown() {
  return (
    <div className="relative inline-block text-left">
      <select
        className="
          h-[32px] px-2 pr-8
          text-[16px] leading-none text-[#666666]
          bg-white border border-[#666666] rounded-md
          appearance-none cursor-pointer
          focus:outline-none focus:ring-1 
        "
        defaultValue="recent"
      >
        <option value="recent">최신순</option>
        <option value="popular">인기순</option>
      </select>
      {/* 기존 toggle-icon 클래스가 화살표 아이콘을 렌더링한다고 가정 */}
      <span
        className="
          toggle-icon
          pointer-events-none
          absolute top-[8px] right-2
          flex items-center
        "
      />
    </div>
  );
}
