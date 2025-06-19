import { useEffect, useRef, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { deleteMatching } from "../../apis/matching";
import { deleteChatRoom } from "../../apis/message";
import { checkCouple, deleteCouple, updateProfile } from "../../apis/user";
import { deleteImage, storeImage } from "../../apis/util";
import { showWarnToast } from "../../components/common/ShowToast";
import CoupleEdit from "../../components/profile/CoupleEdit";
import SoloEdit from "../../components/profile/SoloEdit";
import { useProfileForm } from "../../hooks/useProfileForm";
import { handleError } from "../../utils/handleError";
import type { FormValues } from "../../utils/profile.schema";

export default function ProfileEditPage() {
  const { state: profile }: { state: ProfileData } = useLocation();
  const navigate = useNavigate();

  const [isSolo, setIsSolo] = useState(profile.status === "solo");
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleFormSubmit = async (data: FormValues) => {
    if (data.status === "solo") {
      const { age, nickname, job, location, mbti, height, description } = data;

      const mainUrl =
        data.mainImageFile &&
        (await storeImage(data.mainImageFile, "main_image"));
      const subUrl =
        data.subImageFile && (await storeImage(data.subImageFile, "sub_image"));

      const payload: ProfileUpdatePayload = {
        status: "solo",
        nickname,
        job,
        location,
        mbti,
        description,
        main_image: mainUrl || profile.main_image,
        sub_image: subUrl || profile.sub_image,
        age: Number(age),
        height: Number(height),
        keywords: data.keywordList,
        interests: data.interestList,
        ideal_types: data.idealTypeList,
      };
      const error = await updateProfile(payload);
      if (
        typeof error === "object" &&
        "code" in error &&
        error.code === "23505"
      ) {
        showWarnToast("중복된 닉네임입니다");
        return;
      }
    } else {
      const mainUrl =
        data.mainImageFile &&
        (await storeImage(data.mainImageFile, "main_image"));

      const payload: ProfileUpdatePayload = {
        status: "couple",
        partner_nickname: data.partnerNickname,
        main_image: mainUrl || profile.main_image,
      };
      await updateProfile(payload);

      if (
        profile.couple_id &&
        profile.partner_nickname !== data.partnerNickname
      ) {
        await deleteCouple(profile.couple_id);
      }
      Promise.all([
        await checkCouple(data.partnerNickname, profile.gender),
        await deleteChatRoom(),
        await deleteMatching(),
      ]);
    }
    navigate(`/profile/${profile.id}`);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "sub"
  ) => {
    if (!e.target.files) return;
    const url = await storeImage(e.target.files[0], "temp");
    if (type === "main" && url) {
      setValue("mainImageUrl", url);
      setValue("mainImageFile", e.target.files[0]);
    } else if (type === "sub" && url) {
      setValue("subImageUrl", url);
      setValue("subImageFile", e.target.files[0]);
    }
    if (url) {
      setTimeout(async () => {
        await deleteImage(url);
      }, 2000);
    }
  };

  const getSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const changeStatus = () => {
    setIsSolo((state) => !state);
  };

  const methods = useProfileForm(profile);
  const { handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    reset(
      isSolo
        ? {
            status: "solo",
            mainImageUrl: profile.main_image || "",
            subImageUrl: profile.sub_image || "",
            mainImageFile: null,
            subImageFile: null,
            nickname: profile.nickname || "",
            age: profile.age?.toString(),
            description: profile.description || "",
            job: profile.job || "학생",
            location: profile.location || "",
            height: profile.height?.toString() || "",
            mbti: profile.mbti || "",
            keywordList: profile.keywords || [],
            interestList: profile.interests || [],
            idealTypeList: profile.ideal_types || [],
          }
        : {
            status: "couple",
            mainImageUrl: profile.main_image || "",
            mainImageFile: null,
            partnerNickname: profile.partner_nickname || "",
          }
    );
  }, [isSolo, reset, profile]);

  if (!isSolo) {
    return (
      <main className="relative flex justify-center pb-[50px] dark:bg-[var(--dark-bg-primary)]">
        <FormProvider {...methods}>
          <form
            ref={formRef}
            onSubmit={handleSubmit(handleFormSubmit, handleError)}
            className="flex items-center flex-col w-270"
          >
            <CoupleEdit
              handleFileChange={handleFileChange}
              changeStatus={changeStatus}
              getSubmit={getSubmit}
            />
          </form>
        </FormProvider>
      </main>
    );
  } else
    return (
      <main className="relative flex justify-center pb-[150px] dark:bg-[var(--dark-bg-primary)]">
        <FormProvider {...methods}>
          <form
            ref={formRef}
            onSubmit={handleSubmit(handleFormSubmit, handleError)}
            className="flex items-center flex-col w-270"
          >
            <SoloEdit
              handleFileChange={handleFileChange}
              changeStatus={changeStatus}
              getSubmit={getSubmit}
            />
          </form>
        </FormProvider>
      </main>
    );
}
