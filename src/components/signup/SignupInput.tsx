import { twMerge } from "tailwind-merge";

interface InputProps {
  label: string;
  type: string;
  name: string;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
}

export default function SignupInput({
  label,
  type,
  name,
  className,
  placeholder,
  value,
  onChange,
  isError = false,
  errorMessage,
}: InputProps) {
  return (
    <>
      <div className={twMerge("flex flex-col", className)}>
        <label htmlFor={name} className="ml-5 mb-1 flex gap-1">
          {label}
          {isError && errorMessage && (
            <span className="text-[var(--red)]">{errorMessage}</span>
          )}
        </label>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={twMerge(
            `pl-5 mb-5 w-full h-[50px] bg-[var(--white)] border rounded-full focus:outline-none focus:shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-(color:--primary-pink-tone) ${
              isError
                ? "border-[var(--red)] border-2"
                : "border-[var(--primary-pink)]"
            }`
          )}
          {...(name === "height"
            ? { inputMode: "numeric", pattern: "[0-9]*" }
            : {})}
          {...(name === "intro" ? { maxLength: 30 } : {})}
          {...(name === "userName"
            ? { autoComplete: "off", minLength: 2, maxLength: 5 }
            : {})}
        />
      </div>
    </>
  );
}
