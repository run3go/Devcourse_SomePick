import { twMerge } from "tailwind-merge";

export default function DefaultButton({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <>
      <button
        className={twMerge(
          "mt-9 w-full h-12.5 bg-[var(--primary-pink)] rounded-full hover:bg-[var(--primary-pink-tone)] cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
