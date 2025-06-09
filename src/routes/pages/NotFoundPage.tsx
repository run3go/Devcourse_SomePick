import errorImg from "../../assets/images/404.png";
export default function NotFoundPage() {
  return (
    <>
      <div className="mt-[90px] flex flex-col items-center justify-center text-center">
        <h1 className="font-bold mb-[10px] text-[#FFC7ED] text-[56px]">
          404 Not Found
        </h1>
        <p className="text-[24px] mb-[25px] text-[#969696]">
          페이지를 찾을 수 없습니다.
        </p>

        <button
          className="border bg-[#FFC7ED] text-white hover:bg-[#FF9FD6] hover:shadow-xl transition
      duration-300 ease-in-out text-[24px] cursor-pointer shadow-md shadow-[#FFC7ED] border-[#FFC7ED] rounded-[20px] w-[300px] h-[70px]"
        >
          <span className="font-bold">홈</span>으로 돌아가기
        </button>
        <img
          src={errorImg}
          alt="404 에러 이미지"
          className="ml-[30px] w-[600px] mt-[35px] h-[600px]"
        />
      </div>
    </>
  );
}
