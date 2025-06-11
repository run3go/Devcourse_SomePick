import { useState } from "react";
import Icon from "../common/Icon";
import { deleteImage, storeImage } from "../../apis/util";
import { useSignUpStore } from "../../stores/signupStore";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ProfileImgUpload() {
  const { setImageFile } = useSignUpStore();
  const [imageUrl, setImageUrl] = useState("");
  // const [imageFile, setImageFile] = useState<File | null>(null);
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

          // updateData({ main_image: url });
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

  return (
    <>
      <label
        htmlFor="profileImg"
        className="relative flex justify-center items-center w-40 h-48 bg-[var(--gray-300-59)] rounded-[18px] shadow-[0_2.21px_8.85px_rgba(0,0,0,0.25)] cursor-pointer hover:bg-[var(--gray-300)]"
      >
        {isLoading && <LoadingSpinner />}

        {!isLoading &&
          (imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="프로필 이미지"
                draggable="false"
                className="w-full h-full object-cover rounded-[18px]"
              />
              <div className="group absolute flex justify-center items-center w-40 h-48 rounded-2xl object-cover cursor-pointer hover:bg-[rgba(0,0,0,0.5)]">
                <div className="hidden group-hover:flex justify-center items-center w-[50px] h-[50px] bg-[#EAEAEA] rounded-full">
                  <Icon width="30px" height="30px" left="-647px" top="-755px" />
                </div>
              </div>
            </>
          ) : (
            <Icon width="30px" height="30px" left="-647px" top="-755px" />
          ))}
        <input
          id="profileImg"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImgChange}
          disabled={isLoading}
        />
      </label>
    </>
  );
}
