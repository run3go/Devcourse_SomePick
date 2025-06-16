import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  createPost,
  fetchPostByPostId,
  updatePost,
} from "../../apis/posts/postCrud";
import { deleteImage, storeImage } from "../../apis/util";
import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import LoadingSpinner from "../../components/common/LoadingSpinner";
// 운세 페이지에서 이미지 불러오기
import { useUploadImageStore } from "../../stores/useUploadImageStore";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams(); // id

  // 운세 페이지에서 이미지 불러오기
  const { image } = useUploadImageStore();
  const clearImage = useUploadImageStore((state) => state.clearImage);

  useEffect(() => {
    if (image.length) {
      const getFortuneImage = async () => {
        const imageUrl = await storeImage(image[0], "temp");
        setImageFiles((prev) => [...prev, image[0]]);
        if (imageUrl) {
          setImageUrls((prev) => [...prev, imageUrl]);
        }
        setTitle("[오늘 내 운세]");
      };
      getFortuneImage();
      clearImage();
    }
  }, [image, clearImage]);

  // console.log(params);

  const { state: channel } = location;

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [prevImageUrls, setPrevImageUrls] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>(image ? [...image] : []);
  // const [imageUrl, setImageUrl] = useState("");
  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [fortune, setFortune] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backTo, setBackTo] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (params.id) {
        const postRes = await fetchPostByPostId(Number(params.id));
        if (postRes) {
          setTitle(postRes.title || "");
          setContents(postRes.contents || "");
          setPrevImageUrls(postRes.images || []);
          setImageUrls(postRes.images || []);
          // setFortune(postRes.fortune_telling || "");
          setBackTo(postRes.channel.name);
        }
      }
    };

    loadPost();
  }, [params.id]);

  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const availableSlots = 8 - imageFiles.length;
    if (availableSlots <= 0) {
      toast.warn("이미지는 최대 8장까지 업로드할 수 있어요!");
      return;
    }

    const files = Array.from(e.target.files).slice(0, availableSlots);

    setIsLoading(true);

    try {
      const urls = await Promise.all(
        files.map((file) => storeImage(file, "temp"))
      );
      setImageFiles((prev) => [...prev, ...files]);
      setImageUrls((prev) => [
        ...prev,
        ...urls.filter((url): url is string => typeof url === "string"),
      ]);
    } catch (e) {
      console.error("이미지 업로드 실패", e);
    } finally {
      setIsLoading(false);
      e.target.value = "";
    }

    if (imageUrls) {
      imageUrls.map(
        (url) =>
          setTimeout(() => {
            deleteImage(url);
          }, 300000) // 5분 후 삭제
      );
    }
  };

  const handleImgDelete = (index: number) => {
    const urlToDelete = imageUrls[index];

    if (prevImageUrls.includes(urlToDelete)) {
      setPrevImageUrls((prev) => prev.filter((url) => url !== urlToDelete));
    } else {
      const deleteIndex = imageUrls
        .slice(prevImageUrls.length)
        .findIndex((url) => url === urlToDelete);

      setImageFiles((prev) => prev.filter((_, i) => i !== deleteIndex));
    }

    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(imageFiles);

    if (params.id) {
      await updatePost(
        Number(params.id),
        title,
        contents,
        prevImageUrls.length > 0 ? prevImageUrls : undefined,
        imageFiles.length > 0 ? imageFiles : null
        // fortune ? fortune : ""
      );

      // alert("게시물이 수정 되었습니다!");
      toast.success("게시물이 수정 되었습니다!");
      navigate(`/post/${backTo}`);
    } else {
      await createPost(
        channel,
        title,
        contents,
        imageFiles ? imageFiles : null
        // fortune ? fortune : ""
      );
      // alert("게시물이 업로드 되었습니다!");
      toast.success("게시물이 업로드 되었습니다!");
      navigate(`/post/${channel}`);
    }
  };

  return (
    <>
      {/* 이거 주석 없애면 이미지 볼 수 있어욤 */}
      {/* {image.length > 0 ? (
        <img
          src={URL.createObjectURL(image[0])}
          alt="운세 이미지"
          width="300"
        />
      ) : (
        <p>이미지가 없습니다</p>
      )} */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-5">
          <BackButton className="mt-10" />

          <div className="text-center dark:text-[var(--dark-gray-700)]">
            {channel === "dating" || backTo === "dating" ? (
              <>
                <p className="text-[30px] font-bold">연애백과</p>
                <p className="text-[20px]">
                  연애에 대한 모든 이야기, 자유롭게 공유해요!
                </p>
              </>
            ) : (
              <>
                <p className="text-[30px] font-bold">자유게시판</p>
                <p className="text-[20px]">
                  잡담부터 고민까지, 자유롭게 얘기해봐요!
                </p>
              </>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[1080px] [height:calc(100vh-340px)] border-t-2 border-[var(--gray-500)] pl-2 py-7.5 dark:text-[var(--dark-gray-700)]"
          >
            <label className="w-full mb-5">
              제목
              <input
                type="text"
                placeholder="제목을 작성해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-5 placeholder:text-[var(--gray-500)] focus:outline-none bg-[var(--gray-100)] p-2 w-[94%] rounded-lg text-[var(--dark-black)]"
              />
            </label>

            <div className="w-full mb-5 flex">
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                placeholder="당신의 이야기를 자유롭게 들려주세요"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="placeholder:text-[var(--gray-500)] ml-5 h-[380px] w-[94%] focus:outline-none resize-none bg-[var(--gray-100)] rounded-lg p-2 text-[var(--dark-black)]"
              />
            </div>

            <div className="flex ml-13 gap-4">
              {imageUrls.map((url, index) => (
                <div
                  key={`img-${index}`}
                  className="relative flex justify-center items-center size-26 group"
                >
                  <img
                    src={url}
                    alt={`게시물 이미지 ${index}`}
                    draggable="false"
                    className="w-full h-full object-cover rounded-[18px]"
                  />
                  <div
                    onClick={() => handleImgDelete(index)}
                    className="absolute top-0 left-0 hidden group-hover:flex justify-center items-center size-26 rounded-2xl cursor-pointer hover:bg-[rgba(0,0,0,0.5)] z-10"
                  >
                    <div className="flex justify-center items-center size-12 bg-[#EAEAEA] rounded-full">
                      <Icon
                        width="22px"
                        height="4px"
                        left="-270px"
                        top="-713px"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {imageUrls.length < 8 && (
                <div className="relative flex justify-center items-center size-26 group">
                  <label
                    htmlFor="postImg"
                    className={`flex justify-center items-center size-26 bg-[var(--primary-pink)] rounded-2xl cursor-pointer`}
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <Icon
                        width="28px"
                        height="28px"
                        left="-219px"
                        top="-701px"
                      />
                    )}

                    <input
                      id="postImg"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImgChange}
                      disabled={isLoading}
                      ref={inputRef}
                      multiple
                    />
                  </label>
                </div>
              )}
            </div>

            {/* <div className="relative flex justify-center ml-13 items-center size-26 group">
              <label
                htmlFor="postImg"
                className={`${
                  imageUrl ? "" : "hover:bg-[var(--primary-pink-tone)]"
                } flex justify-center items-center size-26 bg-[var(--primary-pink)] rounded-2xl cursor-pointer`}
              >
                {isLoading && <LoadingSpinner />}

                {!isLoading &&
                  (imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="게시물 이미지"
                      draggable="false"
                      className="w-full h-full object-cover rounded-[18px]"
                    />
                  ) : (
                    <Icon
                      width="28px"
                      height="28px"
                      left="-219px"
                      top="-701px"
                    />
                  ))}

                <input
                  id="postImg"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImgChange}
                  disabled={isLoading}
                  ref={inputRef}
                />
              </label>

              {imageUrl && !isLoading && (
                <div
                  onClick={handleImgDelete}
                  className="absolute top-0 left-0 hidden group-hover:flex justify-center items-center size-26 rounded-2xl cursor-pointer hover:bg-[rgba(0,0,0,0.5)] z-10"
                >
                  <div className="flex justify-center items-center size-12 bg-[#EAEAEA] rounded-full">
                    <Icon
                      width="22px"
                      height="4px"
                      left="-270px"
                      top="-713px"
                    />
                  </div>
                </div>
              )}
            </div> */}

            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-[252px] mt-5 h-12.5 rounded-full dark:text-[var(--dark-black)]"
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
