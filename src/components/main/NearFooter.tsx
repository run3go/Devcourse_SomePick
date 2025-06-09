export default function NearFooter() {
  return (
    <>
      <div className="flex flex-col text-center items-center mt-[150px] mb-[150px]">
        <p className="text-[32px]">
          설레는 시작을 기다리는{" "}
          <span className="text-[#FFC7ED] font-bold">솔로</span>부터 <br />
          사랑을 더 특별하게 만들고 싶은{" "}
          <span className="text-[#FFC7ED] font-bold">커플</span>까지 <br />
          사랑의 모든 순간,
          <span className="text-[#FFC7ED] font-bold"> 썸픽</span>에서 시작해요!
        </p>

        <button
          className="mt-[25px] border bg-[#FFC7ED] text-white hover:bg-[--primary-pink-tone] hover:shadow-xl transition
            duration-300 ease-in-out text-[24px] cursor-pointer shadow-md shadow-[#FFC7ED] border-[#FFC7ED] rounded-[20px] w-[300px] h-[70px]"
        >
          <span className="font-bold">썸픽</span> 회원가입하러 가기
        </button>
      </div>
    </>
  );
}
