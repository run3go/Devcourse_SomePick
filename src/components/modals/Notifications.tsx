import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { readAllNotification, readNotification } from "../../apis/notification";
import { useAuthStore } from "../../stores/authStore";
import Icon from "../common/Icon";

interface Props {
  notifications: NotificationData[];
  onNotificationsChange: (notifications: NotificationData[]) => void;
}

export default function Notifications({
  notifications,
  onNotificationsChange,
}: Props) {
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMyNotifications, setFilterMyNotifications] = useState<
    NotificationData[]
  >([]);

  useEffect(() => {
    if (notifications && session?.user.id) {
      const filtered = notifications.filter(
        (n) => n.sender_id !== session.user.id
      );
      setFilterMyNotifications(filtered);
      setIsLoading(false);
    }
  }, [notifications, session?.user.id]);

  // 알림 하나 하나 읽음 처리
  const handleNotification = async (notification: NotificationData) => {
    try {
      if (notification.id) {
        await readNotification(notification.id);
      }
      const updatedNotifications = filterMyNotifications.filter(
        (n) => n.id !== notification.id
      );
      onNotificationsChange(updatedNotifications);
      setFilterMyNotifications(updatedNotifications);

      switch (notification.type) {
        case "like":
        case "comment":
          if (notification.post_id) {
            navigate(`/post/detail/${notification.post_id}`);
          }
          break;
        case "childComment":
          if (notification.post_id) {
            navigate(`/post/detail/${notification.post_id}`);
          }
          break;
        case "heart":
          if (notification.sender_id) {
            navigate(`/message/${notification.sender_id}/request`);
          }
          break;
        case "message":
          if (notification.sender_id) {
            navigate(`/message/${notification.sender_id}/room`);
          }
          break;
        case "approve":
          if (notification.sender_id) {
            navigate(`/message/${notification.sender_id}/room`);
          }
          break;
        case "reject":
          break;
        case "follow":
          if (notification.sender_id) {
            navigate(`/profile/${notification.sender_id}`);
          }
          break;
        case "schedule":
          if (notification.sender_id) {
            navigate(`/couplecalendar`);
          }
          break;
        default:
          return `새로운 알림이 없어요!`;
      }
    } catch (e) {
      console.log("알림읽기", e);
    } finally {
      setIsLoading(false);
    }
  };

  // 전체 읽음
  const handleAllNotifications = async () => {
    try {
      await readAllNotification();
      onNotificationsChange([]);
    } catch (e) {
      console.log("전체 알림", e);
    }
  };

  //  알림 형태
  const formatNotifications = (notification: NotificationData) => {
    const senderName = notification.sender.nickname || "누군가";
    switch (notification.type) {
      case "like":
        return `${senderName}님이 회원님의 게시글에 좋아요를 눌렀어요.`;
      case "comment":
        return `${senderName}님이 회원님의 게시글에 댓글을 달았어요.`;
      case "childComment":
        return `${senderName}님이 회원님의 댓글에 대댓글을 달았어요.`;
      case "heart":
        return `누군가가 회원님에게 소개팅 하트를 보냈어요!`;
      case "follow":
        return `${senderName}님이 회원님을 팔로우 했어요.`;
      case "message":
        return `${senderName}님이 메세지를 보냈어요!`;
      case "approve":
        return `${senderName}님이 소개팅을 수락했어요!`;
      case "reject":
        return `${senderName}님이 소개팅을 거절했어요...ㅠㅠ`;
      case "schedule":
        return `${senderName}님이 일정을 추가했어요!`;
      default:
        return `새로운 알림이 없어요!`;
    }
  };

  return (
    <div
      className={twMerge(
        "w-[450px] h-[353px] p-[10px] border border-[var(--primary-pink)] rounded-[20px]",
        "bg-[#f6f6f6] absolute right-[10px] top-[50px] text-[var(--gray-50)]",
        "flex flex-col items-stretch gap-[10px]"
      )}
    >
      <div className="relative flex w-full justify-end">
        <span className="absolute left-[10px] top-[7px]">알림</span>
        {notifications.length > 0 && (
          <>
            <button
              onClick={handleAllNotifications}
              disabled={isLoading}
              className={twMerge("notification_item px-[18px] cursor-pointer")}
            >
              전체 읽음
            </button>
          </>
        )}
      </div>
      <ul className="notification_list flex flex-col gap-[10px] overflow-y-scroll">
        {isLoading ? (
          <li className="notification_item w-full text-center">
            불러오는 중..
          </li>
        ) : notifications.length > 0 ? (
          filterMyNotifications.map((notification) => (
            <li
              key={notification.id}
              onClick={() => handleNotification(notification)}
              className="notification_item w-full text-center"
            >
              {formatNotifications(notification)}
            </li>
          ))
        ) : (
          <>
            <div className="absolute top-[90px] left-1/2 -translate-x-1/2 w-25 h-25">
              <Icon
                width="100px"
                height="100px"
                left="-41px"
                top="-605.09px"
                className="cursor-pointer"
              ></Icon>
            </div>
            <span className="absolute bottom-[65px] left-1/2 -translate-x-1/2">
              새로운 알림이 없어요!
            </span>
          </>
        )}
      </ul>
    </div>
  );
}
