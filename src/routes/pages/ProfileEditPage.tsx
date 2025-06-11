import { useState } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { updateProfile } from "../../apis/user";
import { deleteImage, storeImage } from "../../apis/util";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileSelectBox from "../../components/profile/ProfileSelectBox";
import SelectTags from "../../components/profile/SelectTags";
import { interests, keywords, profileInfo } from "../../constants/data/tags";
import { useProfileForm } from "../../hooks/useProfileForm";

export default function ProfileEditPage() {
  const { state: profile }: { state: ProfileData } = useLocation();
  const navigate = useNavigate();

  const methods = useProfileForm(profile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = async (data: FormValue) => {
    const { status, nickname, age, job, location, height, mbti } = data;
    const mainUrl =
      data.mainImageFile &&
      (await storeImage(data.mainImageFile, "main_image"));
    const subUrl =
      data.subImageFile && (await storeImage(data.subImageFile, "sub_image"));
    const payload: ProfileUpdatePayload = {
      main_image: mainUrl || profile.main_image,
      sub_image: subUrl || profile.sub_image,
      status,
      nickname,
      job,
      location,
      mbti,
      age: Number(age),
      height: Number(height),
      keywords: data.keywordList,
      interests: data.interestList,
      ideal_types: data.idealTypeList,
    };
    await updateProfile(payload);
    navigate(`/profile/${profile.id}`);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "sub"
  ) => {
    if (!e?.target.files) return;
    const url = await storeImage(e.target.files[0], "temp");
    if (type === "main" && url) {
      setValue("mainImageUrl", url);
      setValue("mainImageFile", e.target.files[0]);
    } else if (type === "sub" && url) {
      setValue("subImageUrl", url);
      setValue("subImageFile", e.target.files[0]);
    }
    if (url) {
      setTimeout(() => {
        deleteImage(url);
      }, 2000);
    }
  };

  const { handleSubmit, register, setValue, control, getValues } = methods;
  const watchedStatus = useWatch({
    name: "status",
    control,
    defaultValue: profile.status,
  });
  if (watchedStatus === "couple") {
    return (
      <main className="relative flex justify-center mb-[50px]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex items-center flex-col w-270"
          >
            <div className="mt-16 flex gap-[68px]">
              <label htmlFor="main_image">
                <ProfileCard image={getValues().mainImageUrl} isMain isEdited />
                <input
                  className="hidden"
                  type="file"
                  id="main_image"
                  onChange={(e) => handleFileChange(e, "main")}
                />
              </label>
            </div>
            <div className="flex items-center gap-[18px] mt-[42px]">
              <div className="flex items-center gap-2">
                <Icon width="10px" height="9px" left="-49px" top="-405px" />
                <span className="font-semibold text-[var(--primary-pink-point)] leading-[1]">
                  상대 닉네임
                </span>
              </div>
              <input
                className="w-[150px] box-border py-2 border-3 border-[var(--gray-200)] rounded-[20px] pl-[20px] focus:outline-[var(--primary-pink)]"
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
                  setValue("status", "solo");
                }}
                onCancel={() => setIsModalOpen(false)}
              />
            )}
            <div className="flex flex-col w-full mt-[50px]">
              <Button
                type="submit"
                className="w-[264px] h-[38px] self-end mt-8"
              >
                <span className="leading-[1]">프로필 정보 저장</span>
              </Button>
            </div>
          </form>
        </FormProvider>
      </main>
    );
  } else
    return (
      <main className="relative flex justify-center mb-[150px]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex items-center flex-col w-270"
          >
            {/* 프로필 사진 */}
            <div className="mt-16 flex gap-[68px]">
              <label htmlFor="main_image">
                <ProfileCard image={getValues().mainImageUrl} isMain isEdited />
                <input
                  className="hidden"
                  type="file"
                  id="main_image"
                  onChange={(e) => handleFileChange(e, "main")}
                />
              </label>
              <label htmlFor="sub_image">
                <ProfileCard image={getValues().subImageUrl} isEdited />
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
                className="box-border w-[730px] py-4 border-3 border-[var(--gray-200)] rounded-[20px] pl-[30px] focus:outline-[var(--primary-pink)]"
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
              <h3 className="mb-[55px] text-xl font-bold border-l-8 border-[var(--primary-pink)] px-4 py-[10px]">
                내 정보
              </h3>
              <div className="flex gap-[76px] p-10 border-3 border-[var(--gray-200)] rounded-[20px]">
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
                      <ProfileSelectBox
                        type={item as "job" | "location" | "mbti"}
                      />
                    </li>
                  ))}
                </ul>
                {/* 태그 */}
                <ul className="flex flex-col gap-[38px] border-l border-[var(--gray-50)] pl-10">
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
              <Button
                type="submit"
                className="w-[264px] h-[38px] self-end mt-8"
              >
                <span className="leading-[1]">프로필 정보 저장</span>
              </Button>
            </div>
          </form>
        </FormProvider>
      </main>
    );
}
