import { twMerge } from "tailwind-merge";

interface InputProps {
  label: string;
  type: string;
  name: string;
  className?: string;
  placeholder?: string;
}

export default function SignupInput({
  label,
  type,
  name,
  className,
  placeholder,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={name} className="ml-5 mb-1">
          {label}
        </label>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={twMerge(
            "pl-5 mb-5 w-full h-[50px] bg-[var(--white)] border border-[var(--primary-pink)] rounded-full focus:outline-none focus:shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-(color:--primary-pink-tone)",
            className
          )}
          {...(name === "height" ? { min: 130, max: 299, step: 1 } : {})}
          {...(name === "intro" ? { maxlength: 30 } : {})}
          {...(name === "userName"
            ? { autoComplete: "off", minLength: 2, maxLength: 5 }
            : {})}
        />
      </div>
    </>
  );
}
