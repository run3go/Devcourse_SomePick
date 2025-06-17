import { useAuthStore } from "../../stores/authstore";
import ChatItem from "./ChatItem";

export default function ChatList({
  onChatClick,
  users,
  selectedUserId,
  type,
}: {
  onChatClick?: (
    userId: string,
    type?: "received" | "sent" | "matched"
  ) => void;
  users?: MatchingUser[];
  selectedUserId?: string | null;
  type: "received" | "sent" | "matched";
}) {
  const { session } = useAuthStore();

  return (
    <div className="border rounded-2xl p-1.5 my-3 border-[var(--primary-pink)] h-[300px] overflow-y-auto dark:bg-[var(--dark-white)]/27">
      {users?.map((user, idx) => {
        const isSentByMe = user.sender.id === session?.user.id;
        const targetUser = isSentByMe ? user.reciever : user.sender;

        const handleClick = () => {
          onChatClick?.(targetUser.id, type);
        };

        return (
          <div key={idx}>
            <ChatItem
              name={targetUser.nickname}
              profileImg={targetUser.main_image}
              onClick={handleClick}
              isSelected={selectedUserId === targetUser.id}
            />
            {idx !== users.length - 1 && (
              <hr className="border-[var(--primary-pink)] mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
