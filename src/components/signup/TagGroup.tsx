export default function TagGroup({ title }: { title: string }) {
  return (
    <>
      <div>
        <p>{title}</p>
        <p className="text-[var(--gray-500)] text-sm mb-3">4개~8개 선택</p>
        <div className="flex justify-center items-center w-19 h-7 border border-[var(--primary-pink)] border-dashed rounded-[50px]">
          <div className="sprite-pre-tag-icon"></div>
        </div>
        <div className="flex flex-wrap gap-2 w-77 h-57 mt-13 border border-[var(--primary-pink)] rounded-4xl p-4">
          <div className="w-19 h-7 border border-[var(--primary-pink)] rounded-[50px] text-center leading-7 hover:border-[var(--primary-pink-point)] cursor-pointer">
            잘생김
          </div>
          <div className="w-19 h-7 border border-[var(--primary-pink)] rounded-[50px] text-center leading-7 hover:border-[var(--primary-pink-point)] cursor-pointer bg-[var(--primary-pink)]">
            잘생김
          </div>
        </div>
      </div>
    </>
  );
}
