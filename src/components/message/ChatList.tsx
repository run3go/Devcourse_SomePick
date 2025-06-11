import ChatItem from "./ChatItem";
import { useAuthStore } from "../../stores/authstore";

export default function ChatList({
  onChatClick,
  matchingUsers,
}: // selectedTab,
{
  onChatClick?: (userId: string) => void;
  // selectedTab?: string;
  matchingUsers: Matching[];
}) {
  const { session } = useAuthStore();

  return (
    <div className="border rounded-2xl p-1.5 my-3 border-[var(--primary-pink)] h-[300px] overflow-auto">
      {matchingUsers.map((user, idx) => {
        const isSentByMe = user.sender.id === session?.user.id;
        const targetUser = isSentByMe ? user.reciever : user.sender;

        return (
          <div key={idx}>
            <ChatItem
              name={targetUser.nickname}
              profileImg={targetUser.main_image}
              onClick={() => onChatClick?.(targetUser.id)}
            />
            {idx !== matchingUsers.length - 1 && (
              <hr className="border-[var(--primary-pink)] mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
