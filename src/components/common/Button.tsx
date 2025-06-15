import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentPropsWithoutRef<"button">;
export default function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;
  return (
    <button
      className={twMerge(
        "bg-[var(--primary-pink)] rounded-2xl flex items-center justify-center transition-colors duration-150",
        "cursor-pointer hover:bg-[var(--primary-pink-tone)] disabled:bg-[#d9d9d9] disabled:cursor-default",
        "dark:bg-[var(--dark-primary-pink-tone)] dark:hover:bg-[var(--dark-primary-pink-point)] dark:text-white",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
