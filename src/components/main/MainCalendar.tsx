import ShowCalendar from "../calendar/ShowCalendar";
import useFadeIn from "../common/useFadeIn";
export default function MainCalender() {
  const fadeIn = useFadeIn();
  return (
    <>
      <div {...fadeIn}>
        <div className="mt-[300px] flex flex-col items-center justify-center">
          <p className="mb-[10px] text-[24px] text-[var(--gray-500)] font-bold">
            연인과 함께 쓰는
          </p>
          <p className="text-[40px] font-bold">데이트 캘린더</p>
        </div>

        <div className="flex gap-[40px] items-center justify-center mt-[50px]">
          <div className="flex flex-col items-start">
            <div className="w-[650px] h-[500px] border-[var(--primary-pink)] border flex justify-center items-center shadow-lg rounded-[20px]">
              <ShowCalendar />
            </div>
            <div className="flex flex-col text-left mt-[30px]">
              <div className="flex items-center mb-[10px]">
                <div className="iconC mr-[10px]"></div>
                <p className="text-[24px] font-bold">일정 확인</p>
              </div>
              <p className="text-[16px]">
                내 연인과 나누고 싶은 일정과 기념일을 한눈에 확인할 수 있어요.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start]">
            <div className="w-[650px] h-[500px] bg-[#FFF2FB] flex flex-col shadow-lg rounded-[20px]">
              <p className="mt-[35px] ml-[30px] mb-[35px] text-[24px]">
                선택된 날짜 - 6월 19일
              </p>
              <div className="border-0 ml-[30px] mb-[25px] bg-[#ffffff] rounded-[20px] w-[585px] h-[62px]">
                <p className="text-[20px] text-[var(--gray-500)] ml-[15px] mt-[15px]">
                  제목
                </p>
              </div>
              <div className="ml-[30px] mb-[25px] border-0 bg-[#ffffff] rounded-[20px] w-[585px] h-[206px]">
                <p className="text-[20px] text-[var(--gray-500)] ml-[15px] mt-[15px]">
                  내용
                </p>
              </div>
              <div className="flex justify-end mr-[35px]">
                <button className="w-[178px] h-[45px] bg-[var(--primary-pink)] rounded-[15px]">
                  일정 추가하기
                </button>
              </div>
            </div>
            <div className="flex flex-col text-left mt-[40px]">
              <div className="flex items-center mb-[10px]">
                <div className="iconD mr-[10px]"></div>
                <p className="text-[24px] font-bold">일정 작성</p>
              </div>
              <p className="text-[16px] text-[var(--gray-500)]">
                데이트, 기념일, 이벤트 등을 입력해 기록하고 관리할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
