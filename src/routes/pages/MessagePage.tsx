import { useNavigate } from "react-router";
import ChatList from "../../components/message/ChatList";
import { useState } from "react";
import EmptyList from "../../components/message/EmptyList";
import { useAuthStore } from "../../stores/authStore";
import Icon from "../../components/common/Icon";

type MessagePageProps = {
  matchingUserProfile: Matching[];
  matchedUserProfile: Matching[];
};

export default function MessagePage({
  matchingUserProfile,
  matchedUserProfile,
}: MessagePageProps) {
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("받은 하트");
  const session = useAuthStore((state) => state.session);

  // 클릭된 목록 구분
  const handleChatClick = (
    userId: string,
    type?: "received" | "sent" | "matched"
  ) => {
    setSelectedUserId(userId);
    if (type === "received") {
      navigate(`/message/${userId}/request`);
    } else if (type === "sent") {
      navigate(`/message/${userId}/waiting`);
    } else {
      navigate(`/message/${userId}`);
    }
  };

  const handleTab = (tabName: string) => {
    setSelectedTab(tabName);
  };

  // 클릭된 목록으로 구분해서 사용자 목록 출력
  const filteredUsers = (matchingUserProfile ?? []).filter((user) => {
    if (user.is_matched === true) return false;

    const isSentByMe = user.sender.id === session?.user.id;
    if (selectedTab === "받은 하트") return !isSentByMe;
    if (selectedTab === "보낸 하트") return isSentByMe;
    return true;
  });
  return (
    <>
      <div className="w-[370px] h-full px-9 py-8 box-shadow-custom rounded-2xl">
        <div>
          <div className="flex gap-[20px] justify-center items-center">
            <div
              className={`flex items-center gap-2 cursor-pointer rounded-2xl ${
                selectedTab === "받은 하트"
                  ? "text-[13px] p-2 border border-[var(--primary-pink)]"
                  : "p-2 border border-transparent hover:border-[var(--primary-pink)] text-[11px]"
              }`}
              onClick={() => handleTab("받은 하트")}
            >
              {selectedTab === "받은 하트" ? (
                <Icon width="26px" height="22px" left="-362px" top="-881px" />
              ) : (
                <Icon width="21px" height="18px" left="-277px" top="-884px" />
              )}

              <span>받은 하트 목록</span>
            </div>
            <div
              className={`flex items-center gap-2 cursor-pointer rounded-2xl ${
                selectedTab === "보낸 하트"
                  ? "text-[13px] p-2 border border-[var(--primary-pink)]"
                  : "p-2 border border-transparent hover:border-[var(--primary-pink)] text-[11px]"
              }`}
              onClick={() => handleTab("보낸 하트")}
            >
              {selectedTab === "보낸 하트" ? (
                <Icon width="26px" height="22px" left="-125px" top="-958px" />
              ) : (
                <Icon width="21px" height="18px" left="-316px" top="-883px" />
              )}
              <div>보낸 하트 목록</div>
            </div>
          </div>
          {filteredUsers.length === 0 ? (
            selectedTab === "받은 하트" ? (
              <EmptyList message="받은 하트가 없어요 😢" />
            ) : (
              <EmptyList message="보낸 하트가 없어요 😢" />
            )
          ) : selectedTab === "받은 하트" ? (
            <ChatList
              onChatClick={handleChatClick}
              users={filteredUsers}
              selectedUserId={selectedUserId}
              type="received"
            />
          ) : (
            <ChatList
              onChatClick={handleChatClick}
              users={filteredUsers}
              selectedUserId={selectedUserId}
              type="sent"
            />
          )}
        </div>
        <div>
          <div>
            <div className="flex items-center mt-10 ml-2 gap-2">
              <Icon width="23px" height="23px" left="-409px" top="-880px" />
              <span className="text-[14px]">연결 중</span>
            </div>
          </div>
          {matchedUserProfile.length === 0 ? (
            <EmptyList message="아직 연결중인 사람이 없어요!" />
          ) : (
            <ChatList
              onChatClick={handleChatClick}
              users={matchedUserProfile}
              selectedUserId={selectedUserId}
              type="matched"
            />
          )}
        </div>
      </div>
    </>
  );
}
