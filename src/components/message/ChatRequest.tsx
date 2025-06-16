import Button from "../common/Button";
import Icon from "../common/Icon";
import ChatCard from "./ChatCard";
import { useState } from "react";
import Alert from "../common/Alert";
import { useLoaderData } from "react-router";
export default function ChatRequest({
  onAccept,
  onReject,
  userId,
}: {
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  userId?: string;
}) {
  const {
    chatUserProfile,
  }: {
    chatUserProfile: ProfileData;
  } = useLoaderData();
  // const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"reject" | "accept" | null>(null);

  // 거절 확인 알림창 열기
  const openRejectAlert = () => {
    setAlertType("reject");
    setIsAlertOpen(true);
  };

  // 수락 확인 알림창 열기
  const openAcceptAlert = async () => {
    if (!userId) return;
    setAlertType("accept");
    setIsAlertOpen(true);
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center dark:bg-[var(--dark-bg-secondary)]">
        <div className="w-full h-full mx-5 box-shadow-custom rounded-2xl flex items-center justify-center bg-[var(--primary-pink)]/29 dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-gray-100)]">
          <div className="w-[661px] h-[700px] border-[3px] rounded-2xl border-[var(--primary-pink)] bg-white px-[62px] py-9 dark:bg-[var(--dark-bg-primary)]">
            <div className="flex flex-col items-center gap-2.5">
              <Icon width="52px" height="45px" left="-155px" top="-1054px" />
              <div className="flex flex-col items-center font-semibold gap-3">
                <span>설렘도착</span>
                <span>
                  <span className="text-[var(--primary-pink-point)] dark:text-[var(--dark-gray-100)]">
                    {chatUserProfile.nickname}
                  </span>
                  님이 하트를 보냈어요!
                </span>
              </div>
            </div>
            <ChatCard
              profileImg={chatUserProfile.main_image}
              name={chatUserProfile.nickname}
              age={`만 ${chatUserProfile.age}세`}
              message={chatUserProfile.description}
              items={[
                chatUserProfile.job || "직업",
                chatUserProfile.height ? `${chatUserProfile.height}cm` : "키",
                chatUserProfile.location || "지역",
                chatUserProfile.mbti || "MBTI",
              ]}
              keyword={chatUserProfile.keywords}
              interest={chatUserProfile.interests}
              userId={userId}
            />
            <div className="flex flex-col items-center gap-6">
              <span>{chatUserProfile.nickname}님과 연결하시겠습니까?</span>
              <div className="flex gap-14 ">
                <Button
                  className="w-[157px] h-[47px] text-[14px] dark:text-[var(--dark-black)]"
                  onClick={openAcceptAlert}
                >
                  연결할래요
                </Button>
                <Button
                  className="w-[157px] h-[47px] text-[14px] bg-[var(--gray-300)] hover:bg-[var(--gray-500)]/70 dark:text-[var(--dark-black)] dark:bg-[var(--gray-300)] dark:hover:bg-[var(--gray-500)]/70"
                  onClick={openRejectAlert}
                >
                  다음에요
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAlertOpen && alertType === "reject" && (
        <Alert
          title="정말 거절하시겠습니까?"
          subtitle="채팅방에서 목록이 지워집니다."
          isOk="네"
          isNotOk="아니요"
          onClick={() => {
            setIsAlertOpen(false);
            if (userId) onReject(userId);
          }}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}

      {isAlertOpen && alertType === "accept" && (
        <Alert
          title="채팅방이 생성되었어요!"
          subtitle="이제 대화를 시작해보세요 💬"
          isOk="확인"
          onClick={() => {
            setIsAlertOpen(false);
            if (userId) onAccept(userId);
          }}
        />
      )}
    </>
  );
}
