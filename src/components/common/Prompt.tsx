export default function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 bg-white top-[80px] flex flex-col items-center rounded-[10px] px-5 py-11 shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] w-[356px] h-[204px]">
      {children}
      <input
        type="text"
        className="outline-0 text-sm pl-3 w-full h-9 rounded-full border border-[var(--primary-pink)] mt-[13px] mb-[17px] focus:shadow-[0_0_10px_0_rgba(255,102,179,0.5)]"
      />
      <button className="cursor-pointer text-xs w-[94px] h-[31px] rounded-[5px] bg-[var(--primary-pink)] hover:bg-[var(--primary-pink-tone)]">
        확인
      </button>
    </div>
  );
}
