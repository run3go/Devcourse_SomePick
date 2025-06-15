import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "../utils/profile.schema";

export const useProfileForm = (profile: ProfileData) => {
  return useForm<FormValues>({
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: zodResolver(profileSchema),
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
