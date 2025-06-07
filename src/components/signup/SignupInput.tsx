import { twMerge } from "tailwind-merge";

interface InputProps {
  label: string;
  type: string;
  name: string;
  className?: string;
}

export default function SignupInput({
  label,
  type,
  name,
  className,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={name} className="ml-1.5">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className={twMerge(
            "pl-5 mb-5 w-full h-[50px] bg-[var(--white)] border border-[var(--primary-pink)] rounded-full focus:outline-none focus:shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-(color:--primary-pink-tone)",
            className
          )}
        />
      </div>
    </>
  );
}
