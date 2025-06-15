import { twMerge } from "tailwind-merge";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <>
      <div
        className={twMerge(
          "animate-spin rounded-full h-[30px] w-[30px] border-3 border-[color:var(--white)] border-t-[color:var(--primary-pink-point)]",
          className
        )}
      ></div>
    </>
  );
}
