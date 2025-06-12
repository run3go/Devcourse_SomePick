import { useEffect, useState } from "react";
import Button from "../common/Button";
import Icon from "../common/Icon";
import ChatCard from "./ChatCard";
import { fetchProfile } from "../../apis/user";
export default function ChatWaiting({ userId }: { userId?: string }) {
  const [user, setUser] = useState<ProfileData | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;
      const data = await fetchProfile(userId);
      if (data) {
        setUser(data);
        console.log("hello");
      }
    };
    loadUser();
  }, [userId]);
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full mx-5 box-shadow-custom rounded-2xl flex items-center justify-center bg-[#FFC7ED]/29">
          <div className="w-[661px] h-[700px] border-[3px] rounded-2xl border-[#FFC7ED] bg-white px-[62px] py-9">
            <div className="flex flex-col items-center gap-2.5">
              <Icon width="63px" height="55px" left="-51px" top="-1054px" />
              <div className="flex flex-col items-center font-semibold gap-3">
                <span>설렘 전송중 ...</span>
                <span>
                  <span className="text-[#FF66B3]">{user?.nickname}</span>님께
                  하트를 보냈어요!
                </span>
              </div>
            </div>
            <ChatCard
              profileImg={user?.main_image}
              name={user?.nickname}
              age={`만 ${user?.age}세`}
              message={user?.description}
              items={[
                user?.job || "모델",
                user?.height ? `${user.height}cm` : "180cm",
                user?.location || "서울",
                user?.mbti || "ENFP",
              ]}
              userId={userId}
            />
            <div className="flex flex-col items-center gap-6">
              <Button className="w-[359px] h-[51px] bg-[#d9d9d9] cursor-auto hover:bg-[#d9d9d9]">
                아직 상대가 하트를 받지 않았어요!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
