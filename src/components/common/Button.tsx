import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button">;
export default function Button(props: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-[var(--sub-pink-color)] rounded-2xl flex items-center justify-center",
        "cursor-pointer hover:bg-[var(--hover-pink-color)] disabled:bg-[#d9d9d9] disabled:cursor-default",
        props.className
      )}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
