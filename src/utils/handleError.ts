import type { FieldErrors } from "react-hook-form";
import { showWarnToast } from "../components/common/ShowToast";

export const handleError = (errors: FieldErrors<FormValues>) => {
  if (errors.subImageUrl) {
    //서브 이미지
    showWarnToast(errors.subImageUrl.message!);
  } else if (errors.nickname) {
    // 닉네임
    showWarnToast(errors.nickname.message!);
  } else if (errors.age) {
    // 나이
    showWarnToast(errors.age.message!);
  } else if (errors.height) {
    // 키
    showWarnToast(errors.height.message!);
  } else if (errors.keywordList) {
    // 키워드
    showWarnToast(errors.keywordList.message!);
  } else if (errors.interestList) {
    // 관심사
    showWarnToast(errors.interestList.message!);
  } else if (errors.idealTypeList) {
    // 이상형
    showWarnToast(errors.idealTypeList.message!);
  } else if (errors.partnerNickname) {
    // 파트너 닉네임
    showWarnToast(errors.partnerNickname.message!);
  }
};
