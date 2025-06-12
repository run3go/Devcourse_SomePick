// import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { deleteSchedule } from "../../apis/calendar";
import { deleteComment } from "../../apis/comment";
import { useCalendarStore } from "../../stores/calendarStore";
import Icon from "../common/Icon";

type MoreMenuProps = {
  id: number;
  isParent?: boolean | undefined;
  type: "post" | "comment" | "schedule";
  closeMenu: () => void;
  onClick: () => void;
};

export default function MoreMenu({
  id,
  isParent,
  type,
  onClick,
  closeMenu,
}: MoreMenuProps) {
  // const navigate = useNavigate();
  const { deleteSchedule: deleteScheduleById } = useCalendarStore();
  const handleDelte = async () => {
    if (type === "post") {
      // await deletePost(id);
      toast.success("게시글이 삭제되었습니다.");
      // navigate("/post/free");
    } else if (type === "comment") {
      await deleteComment(id, isParent ?? false);
      toast.success("댓글이 삭제되었습니다.");
    } else if (type === "schedule") {
      await deleteSchedule(id);
      toast.success("일정이 삭제되었습니다.");
      deleteScheduleById(id);
    }
    closeMenu();
  };
  return (
    <>
      <div className="absolute right-0 mt-2 bg-white p-2.5 rounded-[10px] border border-[var(--gray-500)] flex flex-col w-[82px] z-50">
        <div className="flex items-center justify-center gap-[5px] pb-2.5">
          <button
            onClick={onClick}
            className="text-[10px] text-[var(--gray-700)] cursor-pointer"
          >
            수정하기
          </button>
          <Icon
            width="12px"
            height="12px"
            left="-556px"
            top="-764px"
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center gap-[5px] menu-box">
          <button
            className="text-[var(--red)]/60 text-[10px] cursor-pointer"
            onClick={handleDelte}
          >
            삭제하기
          </button>
          <Icon
            width="12px"
            height="13px"
            left="-597px"
            top="-763px"
            className="cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
