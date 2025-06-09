import Profile from "../../assets/images/profile_image.png";
export default function ChatItem({ name }: { name: string }) {
  return (
    <>
      <div className="flex gap-2.5 items-center p-1.5 m-2 cursor-pointer rounded-2xl hover:bg-[#FFEFFA]">
        <img
          src={Profile}
          className="w-[46px] h-[46px] rounded-full"
          alt={`${name} 프로필`}
        />
        <span>{name}</span>
      </div>
    </>
  );
}
