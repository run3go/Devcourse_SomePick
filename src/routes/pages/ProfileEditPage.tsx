import { FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { checkCouple, updateProfile } from "../../apis/user";
import { deleteImage, storeImage } from "../../apis/util";
import CoupleEdit from "../../components/profile/CoupleEdit";
import SoloEdit from "../../components/profile/SoloEdit";
import { useProfileForm } from "../../hooks/useProfileForm";

export default function ProfileEditPage() {
  const { state: profile }: { state: ProfileData } = useLocation();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: FormValue) => {
    const {
      status,
      age,
      nickname,
      job,
      location,
      mbti,
      height,
      partnerNickname,
    } = data;

    const mainUrl =
      data.mainImageFile &&
      (await storeImage(data.mainImageFile, "main_image"));
    const subUrl =
      data.subImageFile && (await storeImage(data.subImageFile, "sub_image"));

    const payload: ProfileUpdatePayload = {
      nickname,
      job,
      location,
      mbti,
      main_image: mainUrl || profile.main_image,
      sub_image: subUrl || profile.sub_image,
      age: Number(age),
      height: Number(height),
      keywords: data.keywordList,
      interests: data.interestList,
      ideal_types: data.idealTypeList,
      partner_nickname: status === "solo" ? null : partnerNickname,
    };
    await updateProfile(payload);
    if (status === "couple") {
      await checkCouple(data.partnerNickname, profile.gender);
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
      setTimeout(() => {
        deleteImage(url);
      }, 2000);
    }
  };

  const methods = useProfileForm(profile);
  const { handleSubmit, setValue, watch } = methods;
  const watchedStatus = watch("status", profile.status);

  if (watchedStatus === "couple") {
    return (
      <main className="relative flex justify-center pb-[50px] dark:bg-[var(--dark-bg-primary)]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex items-center flex-col w-270"
          >
            <CoupleEdit handleFileChange={handleFileChange} />
          </form>
        </FormProvider>
      </main>
    );
  } else
    return (
      <main className="relative flex justify-center pb-[150px] dark:bg-[var(--dark-bg-primary)]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex items-center flex-col w-270"
          >
            <SoloEdit handleFileChange={handleFileChange} />
          </form>
        </FormProvider>
      </main>
    );
}
