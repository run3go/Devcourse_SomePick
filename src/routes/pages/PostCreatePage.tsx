import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";

export default function PostCreatePage() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-5">
          <BackButton />
          <div className="flex flex-col w-[1080px] [height:calc(100vh-250px)] border border-[var(--primary-pink)] rounded-2xl px-12.5 py-7.5">
            <div className="border-b border-[var(--gray-700)] w-full pb-5 mb-5">
              <label className="text-xl">
                제목
                <input
                  type="text"
                  placeholder="제목을 작성해주세요"
                  className="ml-7 placeholder:text-[var(--gray-500)] focus:outline-none"
                />
              </label>
            </div>

            <textarea
              placeholder="당신의 이야기를 자유롭게 들려주세요"
              className="placeholder:text-[var(--gray-500)] h-[487px] focus:outline-none resize-none"
            />

            <label className="flex justify-center items-center size-18 bg-[var(--primary-pink)] rounded-2xl cursor-pointer hover:bg-[var(--primary-pink-tone)]">
              <Icon width="16px" height="16px" left="-323px" top="-762px" />
              <input type="file" accept="image/*" className="hidden" />
            </label>

            <div className="flex justify-center">
              <Button className="w-[252px] mt-9 h-12.5 rounded-full">
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
