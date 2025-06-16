import type { FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";

export const handleError = (errors: FieldErrors<FormValues>) => {
  if (errors.subImageUrl) {
    //서브 이미지
    toast.warn(errors.subImageUrl.message);
  } else if (errors.nickname) {
    // 닉네임
    toast.warn(errors.nickname.message);
  } else if (errors.age) {
    // 나이
    toast.warn(errors.age.message);
  } else if (errors.height) {
    // 키
    toast.warn(errors.height.message);
  } else if (errors.keywordList) {
    // 키워드
    toast.warn(errors.keywordList.message);
  } else if (errors.interestList) {
    // 관심사
    toast.warn(errors.interestList.message);
  } else if (errors.idealTypeList) {
    // 이상형
    toast.warn(errors.idealTypeList.message);
  } else if (errors.partnerNickname) {
    // 파트너 닉네임
    toast.warn(errors.partnerNickname.message);
  }
};
