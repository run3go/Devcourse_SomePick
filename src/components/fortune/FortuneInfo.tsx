import firstCouple from "../../assets/images/taro.png";
export default function FortuneInfo() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mt-[192px]">
          <img
            src={firstCouple}
            alt="타로 커플"
            className="w-[380px] h-[253px]"
          />
        </div>
        <div className="text-center mt-4">
          <p className="font-bold text-[32px]">
            <span className="text-[#FFC7ED]">지유</span>님, 오늘의 운세가
            준비되었어요!
          </p>
          <br />
          <p className="font-bold text-[20px] text-[#969696]">
            셋 중 하나의 카드를 클릭해보세요.
          </p>
        </div>
      </div>
    </>
  );
}
