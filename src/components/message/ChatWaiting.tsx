import Button from "../common/Button";
import Icon from "../common/Icon";
import ChatCard from "./ChatCard";
import { useLoaderData } from "react-router";
export default function ChatWaiting({ userId }: { userId?: string }) {
  const {
    chatUserProfile,
  }: {
    chatUserProfile: ProfileData;
  } = useLoaderData();

  return (
    <>
      <div className="w-full h-full flex items-center justify-center dark:bg-[var(--dark-bg-secondary)]">
        <div className="w-full h-full mx-5 box-shadow-custom rounded-2xl flex items-center justify-center bg-[#FFC7ED]/29 dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-gray-100)]">
          <div className="w-[661px] h-[700px] border-[3px] rounded-2xl border-[#FFC7ED] bg-white px-[62px] py-9 dark:bg-[var(--dark-bg-primary)]">
            <div className="flex flex-col items-center gap-2.5">
              <Icon width="52px" height="45px" left="-51px" top="-1054px" />
              <div className="flex flex-col items-center font-semibold gap-3">
                <span>설렘 전송중 ...</span>
                <span>
                  <span className="text-[#FF66B3] dark:text-[var(--dark-gray-100)]">
                    {chatUserProfile.nickname}
                  </span>
                  님께 하트를 보냈어요!
                </span>
              </div>
            </div>
            <ChatCard
              profileImg={chatUserProfile.main_image}
              name={chatUserProfile?.nickname ?? "상대방"}
              age={`만 ${chatUserProfile.age}세`}
              message={chatUserProfile.description}
              items={[
                chatUserProfile.job || "모델",
                chatUserProfile.height
                  ? `${chatUserProfile.height}cm`
                  : "170cm",
                chatUserProfile.location || "서울",
                chatUserProfile.mbti || "ENFP",
              ]}
              keyword={chatUserProfile.keywords}
              interest={chatUserProfile.interests}
              userId={userId}
            />
            <div className="flex flex-col items-center gap-6">
              <Button className="w-[359px] h-[51px] bg-[#d9d9d9] cursor-auto hover:bg-[#d9d9d9] dark:text-[var(--dark-black)] dark:bg-[var(--gray-300)] dark:hover:bg-[var(--gray-300)]">
                아직 상대가 하트를 받지 않았어요!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
