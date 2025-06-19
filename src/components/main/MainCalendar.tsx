import ShowCalendar from "../calendar/ShowCalendar";
import useFadeIn from "../common/useFadeIn";
import Icon from "../common/Icon";
export default function MainCalender() {
  const fadeIn = useFadeIn();
  return (
    <>
      <div {...fadeIn}>
        <div className="mt-[300px] flex flex-col items-center justify-center">
          <p className="mb-[10px] text-[24px] text-[var(--gray-500)] font-bold">
            연인과 함께 쓰는
          </p>
          <p className="text-[40px] font-bold dark:text-[var(--dark-gray-700)]">
            데이트 캘린더
          </p>
        </div>

        <div className="flex gap-[40px] items-center justify-center mt-[50px]">
          <div className="flex flex-col items-start">
            <div className="w-[650px] h-[500px] border-[var(--primary-pink)] border flex justify-center items-center shadow-lg rounded-[20px]">
              <ShowCalendar />
            </div>
            <div className="flex flex-col text-left mt-[30px] dark:text-[var(--dark-gray-700)]">
              <div className="flex items-center mb-[10px]">
                <div className="mr-[10px]">
                  <Icon
                    width="40px"
                    height="40px"
                    left="-41px"
                    top="-325.09px"
                  />
                </div>
                <p className="text-[24px] font-bold">일정 확인</p>
              </div>
              <p className="text-[16px]">
                내 연인과 나누고 싶은 일정과 기념일을 한눈에 확인할 수 있어요.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start]">
            <div className="w-[650px] h-[500px] border border-[var(--primary-pink)] flex flex-col shadow-lg rounded-[20px]">
              <p className="mt-[35px] ml-[30px] mb-[35px] text-[24px] text-[var(--primary-pink-point)]">
                선택된 날짜 - 6월 19일
              </p>
              <div className="ml-[30px] mb-[25px]">
                <p className="text-[20px] text-[var(--gray-500)] ml-[15px] mt-[15px]">
                  제목
                </p>
              </div>
              <hr className="ml-[30px] w-[90%] mb-[20px] border-[var(--primary-pink)]" />
              <div className="ml-[30px] mb-[25px] h-[200px]">
                <p className="text-[20px] text-[var(--gray-500)] ml-[15px] mt-[15px]">
                  메모
                </p>
              </div>
              <div className="flex justify-end mr-[35px]">
                <button className="w-[178px] h-[45px] bg-[var(--primary-pink)] rounded-[30px]">
                  일정 추가하기
                </button>
              </div>
            </div>
            <div className="flex flex-col text-left mt-[40px] dark:text-[var(--dark-gray-700)]">
              <div className="flex items-center mb-[10px]">
                <div className="mr-[10px]">
                  <Icon
                    width="30px"
                    height="30px"
                    left="-111px"
                    top="-330.09px"
                  />
                </div>
                <p className="text-[24px] font-bold">일정 작성</p>
              </div>
              <p className="text-[16px] text-[var(--gray-500)] dark:text-[var(--dark-gray-700)]">
                데이트, 기념일, 이벤트 등을 입력해 기록하고 관리할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
