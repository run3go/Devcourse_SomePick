type CommonOptions = {
  nickname: string;
  main_image: string;
  age: number;
  gender: "male" | "female";
  status: "solo" | "couple";
};

type SoloOptions = CommonOptions & {
  sub_image: string;
  job: string;
  height: number;
  location: string;
  mbti: string;
  keywords: string[];
  interests: string[];
  ideal_types: string[];
  description?: string;
};

type CoupleOptions = CommonOptions & {
  partner_nickname?: string;
};

type ProfileUpdatePayload = Partial<{
  nickname: string;
  main_image: string;
  sub_image: string;
  job: string;
  height: number;
  location: string;
  mbti: string;
  description: string;
  keywords: string[];
  interests: string[];
  ideal_types: string[];
  partner_email: string;
  status: "solo" | "couple";
}>;
