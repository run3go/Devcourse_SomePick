import Icon from "../../components/common/Icon";

export default function ChatEmptyPage() {
  return (
    <>
      <div className="flex flex-col items-center gap-6 dark:text-[var(--dark-gray-700)]">
        <Icon width="50px" height="50px" left="-50px" top="-941px" />
        <span className="text-[#969696]">DM을 확인해주세요!</span>
      </div>
    </>
  );
}
