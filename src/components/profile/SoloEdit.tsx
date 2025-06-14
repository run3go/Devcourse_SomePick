import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router";
import { twMerge } from "tailwind-merge";
import { interests, keywords, profileInfo } from "../../constants/data/tags";
import Alert from "../common/Alert";
import Button from "../common/Button";
import Icon from "../common/Icon";
import ProfileCard from "./ProfileCard";
import ProfileSelectBox from "./ProfileSelectBox";
import SelectTags from "./SelectTags";

export default function SoloEdit({
  handleFileChange,
}: {
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "sub"
  ) => void;
}) {
  const { state: profile }: { state: ProfileData } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { watch, register, setValue } = useFormContext();
  const watchedMainImage = watch("mainImageUrl", profile.main_image);
  const watchedSubImage = watch("subImageUrl", profile.sub_image);
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
        <label htmlFor="sub_image">
          <ProfileCard image={watchedSubImage} isEdited />
          <input
            className="hidden"
            type="file"
            id="sub_image"
            onChange={(e) => handleFileChange(e, "sub")}
          />
        </label>
      </div>
      {/* 한줄 소개 */}
      <div className="flex items-center gap-[18px] mt-[42px] mb-[37px]">
        <div className="flex items-center gap-2">
          <Icon width="10px" height="9px" left="-49px" top="-405px" />
          <span className="font-semibold text-[var(--primary-pink-point)] leading-[1]">
            한줄 소개
          </span>
        </div>
        <input
          className={twMerge(
            "box-border w-[730px] py-4 border-3 border-[var(--gray-200)] rounded-[20px] pl-[30px] focus:outline-[var(--primary-pink)]",
            "dark:text-[var(--dark-white)] dark:border-[var(--primary-pink)]",
            "dark:outline-0 dark:focus:border-[var(--primary-pink-point)]"
          )}
          {...register("description")}
        />
      </div>
      <Button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-[264px] h-[38px]"
      >
        커플로 전환하기
      </Button>
      {isModalOpen && (
        <Alert
          title="정말로 커플로 전환하시겠습니까?"
          subtitle="매칭과 채팅 기록이 모두 삭제됩니다."
          isOk="네"
          isNotOk="아니요"
          onClick={() => {
            setValue("status", "couple");
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      <div className="flex flex-col w-full mb-[137px] mt-[132px]">
        <h3
          className={twMerge(
            "mb-[55px] text-xl font-bold border-l-8 border-[var(--primary-pink)] px-4 py-[10px]",
            "dark:text-[var(--dark-white)]"
          )}
        >
          내 정보
        </h3>
        <div
          className={twMerge(
            "flex gap-[76px] p-10 border-3 border-[var(--gray-200)] rounded-[20px]",
            "dark:border-[var(--primary-pink)] dark:bg-[var(--dark-bg-secondary)]"
          )}
        >
          <ul className="flex flex-col gap-7">
            {/* 닉네임, 나이, 키 */}
            {["nickname", "age", "height"].map((item) => (
              <li key={item} className="flex items-center">
                <span className="user-info">
                  {profileInfo[item as "nickname" | "age" | "height"]}
                </span>
                <input
                  type="text"
                  className="user-info-input"
                  {...register(item as "nickname" | "age" | "height")}
                />
              </li>
            ))}
            {/* 직업, 지역, mbti */}
            {["job", "location", "mbti"].map((item) => (
              <li key={item} className="flex items-center">
                <span className="user-info">
                  {profileInfo[item as "job" | "location" | "mbti"]}
                </span>
                <ProfileSelectBox type={item as "job" | "location" | "mbti"} />
              </li>
            ))}
          </ul>
          {/* 태그 */}
          <ul className="dark:text-[var(--dark-white)] flex flex-col gap-[38px] border-l border-[var(--gray-50)] pl-10">
            <SelectTags
              type="나를 표현하는 키워드"
              list={keywords}
              name="keywordList"
            />
            <SelectTags
              type="나의 관심사"
              list={interests}
              name="interestList"
            />
            <SelectTags
              type="나의 이상형"
              list={keywords}
              name="idealTypeList"
            />
          </ul>
        </div>
        <Button type="submit" className="w-[264px] h-[38px] self-end mt-8">
          <span className="leading-[1]">프로필 정보 저장</span>
        </Button>
      </div>
    </>
  );
}
