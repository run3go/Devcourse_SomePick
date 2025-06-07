import React from "react";

interface ButtonProps {
  width?: string; // Tailwind width 클래스 (예: "w-[70px]")
  height?: string; // Tailwind height 클래스 (예: "h-[25px]")
  borderRadius?: string; // ex. "8px", "12px"
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  width = "w-[70px]",
  height = "h-[25px]",
  borderRadius = "4px",
  children = "",
  onClick,
}: ButtonProps) {
  const style = { borderRadius };

  return (
    <button
      onClick={onClick}
      style={style}
      className={`
        ${width} ${height}
        bg-[#FFC7ED]
        text-black text-sm font-medium
        hover:bg-[#FF9fd6]
        transition-colors duration-150
        cursor-pointer
      `}
    >
      {children}
    </button>
  );
}
