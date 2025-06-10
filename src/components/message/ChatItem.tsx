import Profile from "../../assets/images/profile_image.png";
export default function ChatItem({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) {
  return (
    <>
      <div
        className="flex gap-2.5 items-center p-1 mx-2 my-1 cursor-pointer rounded-[10px] hover:bg-[#FFEFFA]"
        onClick={onClick}
      >
        <img
          src={Profile}
          className="w-[30px] h-[30px] rounded-full object-cover object-center"
          alt={`${name} 프로필`}
        />
        <span className="text-[12px]">{name}</span>
      </div>
    </>
  );
}
