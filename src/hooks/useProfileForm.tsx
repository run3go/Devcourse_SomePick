import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema, type FormValues } from "../utils/profile.schema";

export const useProfileForm = (profile: ProfileData) => {
  const isSolo = profile.status === "solo";
  return useForm<FormValues>({
    mode: "onSubmit",
    shouldFocusError: false,
    resolver: zodResolver(profileSchema),
    defaultValues: isSolo
      ? {
          status: "solo",
          mainImageUrl: profile.main_image || "",
          subImageUrl: profile.sub_image || "",
          mainImageFile: null,
          subImageFile: null,
          nickname: profile.nickname || "",
          age: profile.age?.toString(),
          description: profile.description || "",
          job: profile.job || "",
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
        },
  });
};
