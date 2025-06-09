import Button from "../common/Button";
import Icon from "../common/Icon";

interface CommentProps {
  className?: string;
  isReply?: boolean;
  placeholder?: string;
}

export default function CommentForm({
  className = "",
  isReply = false,
  placeholder = "댓글을 작성해주세요.",
}: CommentProps) {
  return (
    <form>
      <div className={`flex ${className}`}>
        {isReply && (
          <Icon
            width="16px"
            height="16px"
            left="-847px"
            top="-765px"
            className="cursor-pointer ml-[37px] mr-[7px] items-start mt-[10px]"
          />
        )}
        <textarea
          placeholder={placeholder}
          className={`bg-white rounded-2xl ${
            isReply ? "w-[918px]" : "w-[980px]"
          } resize-none px-[18px] py-[12px] text-[14px] mb-[10px] focus:outline-none focus:ring-2 focus:ring-[#FFC7ED]`}
        ></textarea>
      </div>
      <div className="flex w-full">
        <Button className="ml-auto w-[98px] h-[38px]">등록</Button>
      </div>
    </form>
  );
}
