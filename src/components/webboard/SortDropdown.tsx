import Icon from "../common/Icon";

export type SortRule = "created_at" | "likes";

interface SortDropdownProps {
  sortRule: SortRule;
  onChange: (rule: SortRule) => void;
}

export default function SortDropdown({
  sortRule,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="relative inline-block">
      <select
        value={sortRule}
        onChange={(e) => onChange(e.target.value as SortRule)}
        className="
          h-[40px] px-2 pr-8
          text-[16px] leading-none text-[#666666]
          bg-white border border-[#666666] rounded-[10px]
          appearance-none cursor-pointer
          focus:outline-none focus:ring-1 dark:bg-[#333333] dark:text-[var(--dark-gray-700)]
        "
      >
        <option value="created_at">최신순</option>
        <option value="likes">인기순</option>
      </select>
      {/* 토글 아이콘 (화살표) */}
      <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
        <Icon width="14px" height="8px" left="-715px" top="-743px" />
      </div>
    </div>
  );
}
