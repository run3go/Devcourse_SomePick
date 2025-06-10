import Icon from "../common/Icon";

export default function ProfileImgUpload() {
  return (
    <>
      <label className="flex justify-center items-center w-40 h-48 bg-[var(--gray-300-59)] rounded-[18px] shadow-[0_2.21px_8.85px_rgba(0,0,0,0.25)] cursor-pointer hover:bg-[var(--gray-300)]">
        <Icon width="30px" height="30px" left="-647px" top="-755px" />
        <input type="file" accept="image/*" className="hidden" />
      </label>
    </>
  );
}
