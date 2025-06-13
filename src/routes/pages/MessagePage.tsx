import { Outlet, useNavigate } from "react-router";
import Icon from "../../components/common/Icon";
import ChatList from "../../components/message/ChatList";
// import EmptyList from "../../components/message/EmptyList";
import { useEffect, useState } from "react";
import { fetchMatchingUsers } from "../../apis/matching";
import EmptyList from "../../components/message/EmptyList";
import { useAuthStore } from "../../stores/authStore";

export default function MessagePage() {
  const navigate = useNavigate();
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [selectedTab, setSelectedTab] = useState("받은 하트");
  const { session } = useAuthStore();
  const [matchingUsers, setMatchingUsers] = useState<Matching[]>([]);

  useEffect(() => {
    const getMatchingUsers = async () => {
      const data = await fetchMatchingUsers();
      if (data) {
        setMatchingUsers(data);
      }
    };
    getMatchingUsers();
  }, []);

  const handleChatClick = (userId: string) => {
    setIsChatSelected(true);
    if (selectedTab === "받은 하트") {
      navigate(`/message/${userId}/request`);
    }
    if (selectedTab === "보낸 하트") {
      navigate(`/message/${userId}/waiting`);
    }
  };

  const handleTab = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const filteredUsers = matchingUsers.filter((user) => {
    const isSentByMe = user.sender.id === session?.user.id;
    if (selectedTab === "받은 하트") return !isSentByMe;
    if (selectedTab === "보낸 하트") return isSentByMe;
    return true;
  });
  return (
    <>
      <div className="w-[1150px] h-full mx-auto gap-10 flex my-[5vh]">
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
            <ChatList
              onChatClick={handleChatClick}
              matchingUsers={filteredUsers}
            />
          </div>
          <div>
            <div>
              <div className="flex items-center mt-10 ml-2 gap-2">
                <Icon width="23px" height="23px" left="-409px" top="-880px" />
                <span className="text-[14px]">연결 중</span>
              </div>
            </div>
            {}
            {/* <ChatList
              onChatClick={handleChatClick}
              matchingUsers={filteredUsers}
            /> */}
            <EmptyList message="아직 연결중인 사람이 없어요!" />
          </div>
        </div>
        <div className="w-[878px] h-[817px] py-5 box-shadow-custom rounded-2xl items-center justify-center flex">
          {!isChatSelected ? (
            <div className="flex flex-col items-center gap-6">
              <Icon width="50px" height="50px" left="-50px" top="-941px" />
              <span className="text-[#969696]">DM을 확인해보세요!</span>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
}
