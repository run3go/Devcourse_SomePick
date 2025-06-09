export default function Confirm({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 bg-white top-[80px] flex flex-col items-center rounded-[10px] px-5 py-11 shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] w-[356px] h-[204px]">
      {children}
      <div className="flex gap-[35px] mt-[25px]">
        <button className="cursor-pointer text-xs w-[94px] h-[31px] rounded-[5px] bg-[var(--primary-pink)] hover:bg-[var(--primary-pink-tone)]">
          네
        </button>
        <button className="cursor-pointer text-xs w-[94px] h-[31px] rounded-[5px] bg-[#d9d9d9] hover:bg-[var(--gray-50)]">
          아니오
        </button>
      </div>
    </div>
  );
}
