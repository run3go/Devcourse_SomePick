interface InputProps {
  icon: string;
  type: string;
  placeholder: string;
  className?: string;
}

export default function LoginInput({
  icon,
  type,
  placeholder,
  className,
}: InputProps) {
  return (
    <>
      <div className={`relative w-full h-12.5 ${className}`}>
        <div
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${icon}`}
        />

        <div className="absolute h-5 w-px bg-[var(--gray-300-59)] left-13.5 top-1/2 transform -translate-y-1/2" />

        <input
          type={type}
          placeholder={placeholder}
          className="w-full h-full bg-[var(--white)] border border-[var(--primary-pink)] rounded-full pl-16.5 focus:outline-none focus:shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:shadow-(color:--primary-pink-tone)"
        />
      </div>
    </>
  );
}
