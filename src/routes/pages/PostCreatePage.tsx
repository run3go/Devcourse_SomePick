import React, { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { deleteImage, storeImage } from "../../apis/util";

export default function PostCreatePage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsLoading(true);

      try {
        const url = await storeImage(file, "temp");

        if (url) {
          setImageUrl(url);
          setImageFile(file);

          console.log("image upload success!", url);
        } else {
          console.error("image upload failed.");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }

      if (imageUrl) {
        setTimeout(() => {
          deleteImage(imageUrl);
        }, 2000);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
  };

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

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[1080px] [height:calc(100vh-340px)] border-t-2 border-[var(--gray-500)] pl-2 py-7.5"
          >
            <label className="w-full mb-5">
              제목
              <input
                type="text"
                placeholder="제목을 작성해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-5 placeholder:text-[var(--gray-500)] focus:outline-none bg-[var(--gray-100)] p-2 w-[94%] rounded-lg"
              />
            </label>

            <div className="w-full mb-5 flex">
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                placeholder="당신의 이야기를 자유롭게 들려주세요"
                value={contents}
                onChange={(e) => e.target.value}
                className="placeholder:text-[var(--gray-500)] ml-5 h-[300px] w-[94%] focus:outline-none resize-none bg-[var(--gray-100)] rounded-lg p-2"
              />
            </div>

            <label
              htmlFor="postImg"
              className="relative flex justify-center ml-13 items-center size-26 bg-[var(--primary-pink)] rounded-2xl cursor-pointer hover:bg-[var(--primary-pink-tone)]"
            >
              {isLoading && <LoadingSpinner />}

              {!isLoading &&
                (imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="게시물 이미지"
                      draggable="false"
                      className="w-full h-full object-cover rounded-[18px]"
                    />
                    <div className="group absolute flex justify-center items-center size-26 rounded-2xl object-cover cursor-pointer hover:bg-[rgba(0,0,0,0.5)]">
                      <div className="hidden group-hover:flex justify-center items-center size-12 bg-[#EAEAEA] rounded-full">
                        <Icon
                          width="22px"
                          height="4px"
                          left="-270px"
                          top="-713px"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <Icon width="28px" height="28px" left="-219px" top="-701px" />
                ))}

              <input
                id="postImg"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImgChange}
                disabled={isLoading}
              />
            </label>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-[252px] mt-5 h-12.5 rounded-full"
              >
                저장
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
