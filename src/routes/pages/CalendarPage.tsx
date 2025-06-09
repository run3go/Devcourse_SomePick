import Calendar from "../../components/calendar/Calendar";

export default function CalendarPage() {
  return (
    <main className="flex justify-center mb-[150px]">
      <div className="w-[1366px]">
        <div className="flex h-[794px] gap-6">
          <div className="flex flex-col gap-6 w-[257px]">
            <div className="flex flex-col h-[203px] items-center border-y-5 border-[var(--primary-pink)] py-9">
              <h2 className="text-2xl font-medium">TODAY</h2>
              <span className="text-xl">
                <strong className="font-semibold text-[var(--primary-pink-tone)]">
                  은우
                </strong>
                님과
              </span>
              <span className="text-[40px] font-bold text-[var(--primary-pink-point)]">
                D+300
              </span>
              {/* <span className="mb-[26px]">
                <strong className="text-[var(--primary-pink-tone)]">은우</strong>
                님과 첫 만남, 언제였나요?
              </span>
              <input
                type="text"
                className="border border-[var(--primary-pink)] mb-4 rounded-full"
              />
              <button>저장</button> */}
            </div>
            <div className="flex flex-col px-4 py-7 h-[565px] border border-[var(--primary-pink)]">
              <h2 className="text-center font-semibold text-xl text-[var(--primary-pink-point)] border-b pb-[10px] mb-[18px]">
                다음 일정
              </h2>
              <h3 className="text-xl border-l-8 border-[var(--primary-pink)] pl-5">
                6월 10일
              </h3>
              <ul className="flex flex-col gap-4 mt-5">
                <li className="flex items-center justify-between flex-wrap">
                  <div className="w-[13px] h-[13px] bg-[var(--primary-pink)] mr-5 "></div>
                  <span className="inline-block grow-1 text-xl">
                    은우랑 데이트
                  </span>
                  <div className="w-5 h-5 bg-[var(--primary-pink)] ml-2"></div>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <div className="w-[13px] h-[13px] bg-[var(--primary-pink)] mr-5 "></div>
                  <span className="inline-block grow-1 text-xl">부산 가기</span>
                  <div className="w-5 h-5 bg-[var(--primary-pink)] ml-2"></div>
                  <span className="text-sm text-[var(--gray-50)] ml-[35px]">
                    해운대 꼭 가기!
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-[60px] pl-[162px] flex-grow shadow-[0_2px_8px_0_rgba(0,0,0,0.4)] rounded-[30px]">
            <Calendar />
          </div>
        </div>
        <div className="flex flex-col gap-[27px] h-[565px] rounded-[20px] bg-[#fff2fb] mt-[61px] px-[90px] py-[35px]">
          <h2 className="text-[32px]">선택된 날짜 - 6월 19일</h2>
          <input
            type="text"
            placeholder="제목"
            className="bg-white text-xl text-[var(--gray-50)] py-[23px] px-[34px] rounded-[20px]"
          />
          <textarea
            name="text"
            id="memo"
            placeholder="메모"
            className="bg-white text-xl text-[var(--gray-50)] py-[23px] px-[34px] rounded-[20px] resize-none h-[233px]"
          />
          {/* 이후에 버튼 컴포넌트 추가 */}
          <button className="self-end mt-[15px]">일정 추가하기</button>
        </div>
      </div>
    </main>
  );
}
