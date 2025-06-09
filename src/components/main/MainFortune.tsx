import FortuneCards from "../fortune/FortuneCards";
export default function MainFortune() {
  return (
    <>
      <div className="mt-[150px] flex flex-col items-center justify-center">
        <p className="mb-[10px] text-[24px] text-[#969696] font-bold">
          지금 내 연애, 어디쯤일까?
        </p>
        <p className="text-[32px] font-bold">운세로 체크!</p>
      </div>

      <div className=" mb-[60px]">
        <FortuneCards></FortuneCards>
      </div>
      <div className="flex flex-col items-center text-center mt-[-50px]">
        <div className="flex items-center mb-[10px]">
          <div className="iconE mr-[10px]"></div>
          <p className="text-[20px] font-bold">내 연애운을 확인해요.</p>
        </div>
        <p className="text-[16px]">
          오늘의 연애운을 확인하세요!<br></br>
          결과를 게시판에 공유할 수도 있어요.
        </p>
      </div>
    </>
  );
}
