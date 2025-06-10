import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";

export default function PostCreatePage() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-5">
          <BackButton />

          <div className="text-center">
            <p className="text-[30px] font-bold">연애백과</p>
            {/* <p className="text-[30px] font-bold">자유게시판</p> */}
            <p className="text-[20px]">
              연애에 대한 모든 이야기, 자유롭게 공유해요!
            </p>
            {/* <p className="text-[20px]">
              잡담부터 고민까지, 자유롭게 얘기해봐요!
            </p> */}
          </div>

          <div className="flex flex-col w-[1080px] [height:calc(100vh-340px)] border-t-2 border-[var(--gray-500)] pl-2 py-7.5">
            <label className="w-full mb-5">
              제목
              <input
                type="text"
                placeholder="제목을 작성해주세요"
                className="ml-5 placeholder:text-[var(--gray-500)] focus:outline-none bg-[var(--gray-100)] p-2 w-[94%] rounded-lg"
              />
            </label>

            <div className="w-full mb-5 flex">
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                placeholder="당신의 이야기를 자유롭게 들려주세요"
                className="placeholder:text-[var(--gray-500)] ml-5 h-[300px] w-[94%] focus:outline-none resize-none bg-[var(--gray-100)] rounded-lg p-2"
              />
            </div>

            <label className="flex justify-center ml-13 items-center size-18 bg-[var(--primary-pink)] rounded-2xl cursor-pointer hover:bg-[var(--primary-pink-tone)]">
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
