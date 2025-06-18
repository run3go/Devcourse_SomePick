import Select from "react-select";

export type SortRule =
  | { value: "created_at"; label: "최신순" }
  | { value: "likes"; label: "인기순" };

interface SortDropdownProps {
  sortRule: SortRule;
  onChange: (rule: SortRule) => void;
}

const options: SortRule[] = [
  { value: "created_at", label: "최신순" },
  { value: "likes", label: "인기순" },
];

export default function SortDropdown({
  sortRule,
  onChange,
}: SortDropdownProps) {
  return (
    <div className="relative inline-block">
      <Select
        isSearchable={false}
        onChange={(newValue) => onChange(newValue as SortRule)}
        defaultValue={sortRule}
        options={options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "none",
            boxSizing: "border-box",
            borderRadius: "10px",
            width: "115px",
            height: "38px",
            paddingRight: "15px",
            paddingLeft: "5px",
            cursor: "pointer",
            borderColor: state.isFocused
              ? "var(--primary-pink-point)"
              : "var(--gray-700)",
            boxShadow: "none",
            "&:hover": {
              borderColor: "none",
            },
          }),
          dropdownIndicator: (base) => ({
            ...base,
            marginRight: "-10px",
            color: "var(--gray-700)",
          }),
          menu: (base) => ({
            ...base,
            border: "1px solid var(--primary-pink)",
            borderRadius: "10px",
            overflow: "hidden",
          }),
          menuList: (base) => ({
            ...base,
            padding: 0,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }),
          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            fontSize: "14px",
            backgroundColor: state.isSelected
              ? "var(--primary-pink)"
              : state.isFocused
              ? "var(--gray-300-50)"
              : "white",
            color: "var(--gray-700)",
          }),
          singleValue: (base) => ({
            ...base,
            color: "var(--gray-700)",
            fontSize: "14px",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
        }}
      />
    </div>
  );
}
