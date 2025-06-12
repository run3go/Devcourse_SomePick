// import { useNavigate } from "react-router";
// import Profile from "../../assets/images/profile_image.png";
import Button from "../common/Button";
import Icon from "../common/Icon";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import Alert from "../common/Alert";
import { fetchProfile } from "../../apis/user";
export default function ChatRequest({
  onAccept,
  userId,
}: {
  onAccept: () => void;
  userId?: string;
}) {
  // const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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

  const handleClick = () => {
    setIsAlertOpen(true);
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full mx-5 box-shadow-custom rounded-2xl flex items-center justify-center bg-[var(--primary-pink)]/29">
          <div className="w-[661px] h-[700px] border-[3px] rounded-2xl border-[var(--primary-pink)] bg-white px-[62px] py-9">
            <div className="flex flex-col items-center gap-2.5">
              <Icon width="52px" height="45px" left="-155px" top="-1054px" />
              <div className="flex flex-col items-center font-semibold gap-3">
                <span>설렘도착</span>
                <span>
                  <span className="text-[var(--primary-pink-point)]">
                    {user?.nickname}
                  </span>
                  님이 하트를 보냈어요!
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
              <span>{user?.nickname}님과 연결하시겠습니까?</span>
              <div className="flex gap-14">
                <Button
                  className="w-[157px] h-[47px] text-[14px]"
                  onClick={onAccept}
                >
                  연결할래요
                </Button>
                <Button
                  className="w-[157px] h-[47px] text-[14px] bg-[var(--gray-300)] hover:bg-[var(--gray-500)]/70"
                  onClick={handleClick}
                >
                  다음에요
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAlertOpen && (
        <Alert
          title="정말 거절하시겠습니까?"
          subtitle="채팅방에서 목록이 지워집니다."
          isOk="네"
          isNotOk="아니요"
          onClick={() => setIsAlertOpen(false)}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
}
