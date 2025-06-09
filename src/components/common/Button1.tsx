import React from "react";

interface ButtonProps {
  text?: string;
  width?: string; // Tailwind width 클래스 (예: "w-[70px]")
  height?: string; // Tailwind height 클래스 (예: "h-[25px]")
  borderRadius?: string; // ex. "8px", "12px"
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  width = "w-[70px]",
  height = "h-[25px]",
  borderRadius = "4px",
  children = "",
  onClick,
  text = "text-black text-sm font-medium",
  icon,
}: ButtonProps) {
  const style = { borderRadius };

  return (
    <button
      onClick={onClick}
      style={style}
      className={`
        ${width} ${height}
        ${text}
        bg-[#FFC7ED]
        hover:bg-[#FF9fd6]
        transition-colors duration-150
        cursor-pointer
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
