import Icon from "../common/Icon";

interface InputProps {
  type: string;
  placeholder: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginInput({
  type,
  placeholder,
  className,
  value,
  onChange,
}: InputProps) {
  return (
    <>
      <div className={`relative w-full h-12.5 ${className}`}>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {type === "email" ? (
            <Icon width="26px" height="20px" left="-55px" top="-760px" />
          ) : (
            <Icon width="28px" height="28px" left="-111px" top="-756px" />
          )}
        </div>

        <div className="absolute h-5 w-px bg-[var(--gray-300-59)] left-13.5 top-1/2 transform -translate-y-1/2" />

        <input
          type={type}
          placeholder={placeholder}
          className="w-full h-full bg-[var(--white)] border border-[var(--primary-pink)] rounded-full pl-16.5 focus:outline-none focus:shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-(color:--primary-pink-tone)"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
