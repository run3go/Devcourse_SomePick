import { z } from "zod";
export const profileSchema = z.object({
  mainImageUrl: z.string(),
  subImageUrl: z.string().nullable(),
  mainImageFile: z.instanceof(File).nullable(),
  subImageFile: z.instanceof(File).nullable(),
  status: z.union([z.literal("solo"), z.literal("couple")]),
  nickname: z
    .string()
    .min(2, "닉네임을 2자부터 5자까지 입력 가능합니다")
    .max(5, "닉네임을 2자부터 5자까지 입력 가능합니다"),
  age: z.string().refine((age) => {
    const num = Number(age);
    return !isNaN(num) && num >= 20 && num < 40;
  }, "나이는 20부터 40까지 입력 가능합니다"),
  description: z.string().optional(),
  job: z.string(),
  location: z.string(),
  height: z.string().refine((height) => {
    const num = Number(height);
    return !isNaN(num) && num >= 130 && num <= 220;
  }, "키는 130부터 220까지 입력 가능합니다"),
  mbti: z.string(),
  partnerNickname: z.string(),
  keywordList: z
    .array(z.string())
    .min(4, "키워드는 최소 4개 이상 선택해야 합니다"),
  interestList: z
    .array(z.string())
    .min(4, "관심사는 최소 4개 이상 선택해야 합니다"),
  idealTypeList: z
    .array(z.string())
    .min(4, "이상형은 최소 4개 이상 선택해야 합니다"),
});
