export default function Alert({
  //예시
  //   <Alert
  //     title="죄송해요!"
  //     subtitle="로그인 한 유저만 사용할 수 있어요."
  //     isOk="로그인하러 가기"
  //     isNotOk="취소"
  //     onClick={() => {
  //       navigate("/auth/login");
  //     }}
  //     onCancel={() => setIsAlertOpen(false)}
  //   />
  title,
  subtitle,
  isOk,
  isNotOk,
  onClick,
  onCancel,
}: {
  title: string;
  subtitle?: string;
  isOk: string;
  isNotOk?: string;
  onClick?: () => void;
  onCancel?: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-50">
      <div
        className="w-[300px] h-[180px] bg-[var(--white)]
        rounded-[20px] flex flex-col justify-between px-4 py-4 shadow-md"
      >
        {/* 텍스트 */}
        <div className="flex flex-col justify-center items-center flex-1 text-center">
          <p className="text-[var(--gray-700)] text-[16px]">{title}</p>
          {subtitle && (
            <p className="text-[var(--gray-700)] text-[14px] mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex justify-center gap-[20px] mt-2 text-[14px]">
          <button
            className="text-white bg-[var(--primary-pink)] px-3 py-1 rounded
              hover:bg-[var(--primary-pink-tone)]"
            onClick={onClick}
          >
            {isOk}
          </button>
          {isNotOk && (
            <button
              className="bg-[var(--gray-300-50)] text-[var(--gray-500)] px-3 py-1 rounded hover:bg-[var(--gray-300)]"
              onClick={onCancel}
            >
              {isNotOk}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
