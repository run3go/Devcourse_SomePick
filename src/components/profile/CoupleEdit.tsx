import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router";
import { twMerge } from "tailwind-merge";
import Alert from "../common/Alert";
import Button from "../common/Button";
import Icon from "../common/Icon";
import ProfileCard from "./ProfileCard";

export default function CoupleEdit({
  handleFileChange,
  changeStatus,
}: {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "sub"
  ) => void;
  changeStatus: () => void;
}) {
  const { state: profile }: { state: ProfileData } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { watch, register } = useFormContext();
  const watchedMainImage = watch("mainImageUrl", profile.main_image);

  return (
    <>
      <div className="mt-16 flex gap-[68px]">
        <label htmlFor="main_image">
          <ProfileCard image={watchedMainImage} isMain isEdited />

          <input
            className="hidden"
            type="file"
            id="main_image"
            onChange={(e) => handleFileChange(e, "main")}
          />
        </label>
      </div>
      <div className="flex items-center gap-[20px] mt-[42px]">
        <div className="flex items-center gap-2">
          <Icon width="10px" height="9px" left="-49px" top="-405px" />
          <span className="font-semibold text-[var(--primary-pink-point)] leading-[1]">
            상대 닉네임
          </span>
        </div>
        <input
          className={twMerge(
            "w-[150px] box-border py-2 border-3 border-[var(--gray-200)] rounded-[20px] pl-[20px] focus:outline-[var(--primary-pink)]",
            "dark:border-[var(--primary-pink-tone)] dark:focus:outline-0 dark:focus:border-[var(--primary-pink-point)]",
            "dark:text-[var(--dark-white)]"
          )}
          minLength={2}
          maxLength={5}
          autoComplete={"off"}
          {...register("partnerNickname")}
        />
      </div>
      <Button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-[264px] h-[38px] mt-[37px]"
      >
        솔로로 전환하기
      </Button>
      {isModalOpen && (
        <Alert
          title="정말로 솔로로 전환하시겠습니까?"
          subtitle="기존 커플 기록이 전부 삭제됩니다"
          isOk="네"
          isNotOk="아니요"
          onClick={() => {
            setIsModalOpen(false);
            changeStatus();
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      <div className="flex flex-col w-full  mt-[50px]">
        <Button type="submit" className="w-[264px] h-[38px] self-end mt-8">
          <span className="leading-[1]">프로필 정보 저장</span>
        </Button>
      </div>
    </>
  );
}
