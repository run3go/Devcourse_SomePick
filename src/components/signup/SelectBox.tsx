import Select from "react-select";
import { optionsGroup } from "./data/optionsData";

interface SelectBoxProps {
  type: "job" | "location" | "mbti";
}

export default function SelectBox({ type }: SelectBoxProps) {
  const options = optionsGroup[type];

  const titleGroup = {
    job: "직업",
    location: "사는 지역",
    height: "키",
    mbti: "MBTI",
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <p className="ml-5 mb-1">{titleGroup[type]}</p>

        <Select
          options={options}
          isSearchable={false}
          placeholder="선택"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: "100px",
              width: "142px",
              height: "50px",
              paddingRight: "10px",
              paddingLeft: "10px",
              cursor: "pointer",
              borderColor: state.isFocused
                ? "var(--primary-pink-tone)"
                : "var(--primary-pink)",
              boxShadow: state.isFocused
                ? "0 0 10px var(--primary-pink-tone)"
                : "none",
              "&:hover": {
                borderColor: "var(--primary-pink)",
              },
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: "var(--primary-pink)",
              "&:hover": {
                color: "var(--primary-pink)",
              },
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
              color: "black",
              paddingLeft: "20px",
            }),
            indicatorSeparator: () => ({
              display: "none",
            }),
          }}
        />
      </div>
    </>
  );
}
