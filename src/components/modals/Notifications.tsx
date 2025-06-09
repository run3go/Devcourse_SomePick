import { twMerge } from "tailwind-merge";

export default function Notifications() {
  return (
    <div
      className={twMerge(
        "w-[450px] h-[353px] p-[10px] border border-[var(--primary-pink)] rounded-[20px]",
        "bg-[#f6f6f6] absolute right-0 top-[40px] text-[var(--gray-50)]",
        "flex flex-col items-stretch gap-[10px]"
        // 알림이 전혀 없을 경우
        // "h-[295px]"
      )}
    >
      <div className="relative flex w-full justify-end">
        <span className="absolute left-[10px] top-[7px]">알림</span>
        <button
          className={twMerge("notification_item px-[18px] cursor-pointer")}
        >
          전체 읽음
        </button>
      </div>
      <ul className="notification_list flex flex-col gap-[10px] overflow-y-scroll">
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 좋아요를 눌렀어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 댓글을 달았어요.
        </li>
        <li className="notification_item w-full text-center">
          누군가가 회원님에게 소개팅 하트를 보냈어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 좋아요를 눌렀어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 댓글을 달았어요.
        </li>
        <li className="notification_item w-full text-center">
          누군가가 회원님에게 소개팅 하트를 보냈어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 좋아요를 눌렀어요.
        </li>
        <li className="notification_item w-full text-center">
          ooo님이 회원님의 게시글에 댓글을 달았어요.
        </li>
        <li className="notification_item w-full text-center">
          누군가가 회원님에게 소개팅 하트를 보냈어요.
        </li>
      </ul>
      {/* 알림이 전혀 없을 경우 */}
      {/* <div className="absolute top-[90px] left-1/2 -translate-x-1/2 border w-25 h-25"></div>
      <span className="absolute bottom-[65px] left-1/2 -translate-x-1/2">
        새로운 알림이 없어요!
      </span> */}
    </div>
  );
}
