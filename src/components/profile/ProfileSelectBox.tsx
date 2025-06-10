import Select from "react-select";
import { optionsGroup } from "../signup/data/optionsData";
interface SelectBoxProps {
  type: "job" | "location" | "mbti";
}
export default function ProfileSelectBox({ type }: SelectBoxProps) {
  const options = optionsGroup[type];
  return (
    <Select
      placeholder=""
      options={options}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          boxSizing: "border-box",
          borderRadius: "10px",
          width: "131px",
          height: "38px",
          paddingRight: "15px",
          paddingLeft: "5px",
          cursor: "pointer",
          borderColor: state.isFocused
            ? "var(--primary-pink)"
            : "var(--gray-300)",
          outlineColor: state.isFocused
            ? "var(--primary-pink)"
            : "var(--gray-300)",
          boxShadow: "none",
          "&:hover": {
            borderColor: "none",
          },
        }),
        dropdownIndicator: (base) => ({
          ...base,
          marginRight: "-10px",
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
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
      }}
    />
  );
}
