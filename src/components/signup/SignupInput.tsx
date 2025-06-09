import { twMerge } from "tailwind-merge";
import DefaultButton from "../common/DefaultButton";

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
        <div className="flex justify-between items-end mx-1.5">
          <label htmlFor={name}>{label}</label>
          {name === "userName" ? (
            <DefaultButton
              text="중복 확인"
              className="w-18 h-6 mb-1 text-[12px]"
            />
          ) : null}
        </div>

        <input
          type={type}
          name={name}
          className={twMerge(
            "pl-5 mb-5 w-full h-[50px] bg-[var(--white)] border border-[var(--primary-pink)] rounded-full focus:outline-none focus:shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-(color:--primary-pink-tone)",
            className
          )}
          {...(name === "height" ? { min: 130, max: 299, step: 1 } : {})}
          {...(name === "intro" ? { maxlength: "30" } : {})}
        />
      </div>
    </>
  );
}
