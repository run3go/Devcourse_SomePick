import { useForm } from "react-hook-form";

export const useProfileForm = (profile: ProfileData) => {
  return useForm<FormValue>({
    defaultValues: {
      mainImageUrl: profile.main_image || "",
      subImageUrl: profile.sub_image || "",
      mainImageFile: null,
      subImageFile: null,
      nickname: profile.nickname || "",
      age: profile.age?.toString(),
      status: profile.status,
      description: profile.description || "",
      job: profile.job || "",
      location: profile.location || "",
      height: profile.height?.toString() || "",
      mbti: profile.mbti || "",
      partnerNickname: profile.partner_nickname || "",
      keywordList: profile.keywords || [],
      interestList: profile.interests || [],
      idealTypeList: profile.ideal_types || [],
    },
  });
};
