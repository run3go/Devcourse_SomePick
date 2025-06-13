export default function ShareButton() {
  return (
    <>
      <div className="flex justify-center mt-[20px] mb-[60px]">
        <button
          className="border border-[var(--primary-pink)] bg-[var(--primary-pink)] shadow-md rounded-[20px] 
            w-[300px] h-[70px] text-[20px] font-bold text-[var(--white)] hover:bg-[var(--primary-pink-tone)] hover:shadow-lg transition
            duration-300 ease-in-out cursor-pointer"
        >
          내 운세 공유하기
        </button>
      </div>
    </>
  );
}
