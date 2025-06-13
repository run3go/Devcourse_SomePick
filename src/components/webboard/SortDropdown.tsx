export type SortRule = "created_at" | "likes";

interface SortDropdownProps {
  sortRule: SortRule;
  onChange: (rule: SortRule) => void;
}

export default function SortDropdown({ sortRule, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-block text-left">
      <select
        value={sortRule}
        onChange={(e) => onChange(e.target.value as SortRule)}
        className="
          h-[32px] px-2 pr-8
          text-[16px] leading-none text-[#666666]
          bg-white border border-[#666666] rounded-md
          appearance-none cursor-pointer
          focus:outline-none focus:ring-1
        "
      >
        <option value="created_at">최신순</option>
        <option value="likes">인기순</option>
      </select>
      {/* 토글 아이콘 (화살표) */}
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
