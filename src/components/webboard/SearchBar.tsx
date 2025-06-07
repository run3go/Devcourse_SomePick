export default function SearchBar() {
  return (
    <div className="flex items-center px-3 w-[258px] h-[40px] border border-[#666666] rounded-[10px] focus-within:border-[#FF66B3]">
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="flex-1 bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-400"
      />
      <button className="btn-search-icon" />
    </div>
  );
}
