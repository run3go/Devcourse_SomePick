import { twMerge } from "tailwind-merge";

export default function DefaultButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      <button
        className={twMerge(
          "mt-9 w-full h-12.5 bg-[var(--primary-pink)] rounded-full hover:bg-[var(--primary-pink-tone)] cursor-pointer",
          className
        )}
      >
        {text}
      </button>
    </>
  );
}
