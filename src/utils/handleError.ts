import type { FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";

export const handleError = (errors: FieldErrors<FormValues>) => {
  if (errors.nickname) {
    toast.warn(errors.nickname.message);
  } else if (errors.age) {
    toast.warn(errors.age.message);
  } else if (errors.height) {
    toast.warn(errors.height.message);
  } else if (errors.keywordList) {
    toast.warn(errors.keywordList.message);
  } else if (errors.interestList) {
    toast.warn(errors.interestList.message);
  } else if (errors.idealTypeList) {
    toast.warn(errors.idealTypeList.message);
  } else if (errors.partnerNickname) {
    toast.warn(errors.partnerNickname.message);
  }
};
