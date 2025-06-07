export default function ProfileImgUpload() {
  return (
    <>
      <div className="flex justify-center items-center w-40 h-48 bg-[var(--gray-300-59)] rounded-[18px] shadow-[0_2.21px_8.85px_rgba(0,0,0,0.25)] cursor-pointer">
        <div className="sprite-add-ProfileImg-icon" />
        <input type="file" accept="image/*" className="hidden" />
      </div>
    </>
  );
}
