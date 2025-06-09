import { twMerge } from "tailwind-merge";

export default function Icon({
  width,
  height,
  left,
  top,
  className,
}: {
  width: string;
  height: string;
  left: string;
  top: string;
  className?: string;
}) {
  return (
    <div
      className={twMerge("bg-no-repeat bg-[url('/emoji.png')]", className)}
      style={{ width, height, backgroundPosition: `${left} ${top}` }}
    />
  );
}
