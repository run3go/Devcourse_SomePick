import { FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { deleteMatching } from "../../apis/matching";
import { deleteChatRoom } from "../../apis/message";
import { checkCouple, updateProfile } from "../../apis/user";
import { deleteImage, storeImage } from "../../apis/util";
import CoupleEdit from "../../components/profile/CoupleEdit";
import SoloEdit from "../../components/profile/SoloEdit";
import { useProfileForm } from "../../hooks/useProfileForm";
import { handleError } from "../../utils/handleError";

export default function ProfileEditPage() {
  const { state: profile }: { state: ProfileData } = useLocation();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: FormValues) => {
    const {
      status,
      age,
      nickname,
      job,
      location,
      mbti,
      height,
      description,
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
      status,
      description,
      main_image: mainUrl || profile.main_image,
      sub_image: subUrl || profile.sub_image,
      age: Number(age),
      height: Number(height),
      keywords: data.keywordList,
      interests: data.interestList,
      ideal_types: data.idealTypeList,
      partner_nickname: status === "solo" ? null : partnerNickname,
    };
    const error = await updateProfile(payload);
    if (
      typeof error === "object" &&
      "code" in error &&
      error.code === "23505"
    ) {
      toast.warn("중복된 닉네임입니다");
      return;
    }
    if (status === "couple") {
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

  const methods = useProfileForm(profile);
  const { handleSubmit, setValue, watch } = methods;
  const watchedStatus = watch("status", profile.status);

  if (watchedStatus === "couple") {
    return (
      <main className="relative flex justify-center pb-[50px] dark:bg-[var(--dark-bg-primary)]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleFormSubmit, handleError)}
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
            onSubmit={handleSubmit(handleFormSubmit, handleError)}
            className="flex items-center flex-col w-270"
          >
            <SoloEdit handleFileChange={handleFileChange} />
          </form>
        </FormProvider>
      </main>
    );
}
