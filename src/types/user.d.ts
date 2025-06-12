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
  keywords: string;
  interests: string;
  ideal_types: string;
  description?: string;
};

type CoupleOptions = CommonOptions & {
  partner_nickname?: string;
};

type ProfileUpdatePayload = Partial<{
  age: number;
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
  partner_nickname: string | null;
  status: "solo" | "couple";
}>;

type ProfileData = {
  id: string;
  age: number;
  gender: "male" | "female";
  nickname: string;
  main_image: string;
  sub_image: string;
  job: string | null;
  height: number | null;
  location: string | null;
  mbti: string | null;
  description: string | null;
  keywords: string[] | null;
  interests: string[] | null;
  ideal_types: string[] | null;
  partner_nickname: string | null;
  couple_id: string | null;
  couple: {
    user1: UserData;
    user2: UserData;
  };
  status: "solo" | "couple";
};

type SoloProfile = SoloOptions & {
  id: string;
};

type CoupleProfile = CoupleOptions & {
  id: string;
  couple_id: string;
  partner_nickname: string;
  couple: {
    user1: UserData;
    user2: UserData;
  };
};

type UserData = {
  id: string;
  main_image: string | null;
  nickname: string | null;
};

type Matching = {
  created_at: string;
  id: number;
  is_matched: boolean;
  matching_user_id: string;
  user_id: string;
  sender: ProfileData;
  reciever: ProfileData;
}

type FormValue = {
  mainImageUrl: string;
  subImageUrl: string | null;
  mainImageFile: File | null;
  subImageFile: File | null;
  nickname: string;
  age: string;
  status: "solo" | "couple";
  description: string;
  job: string;
  location: string;
  height: string;
  mbti: string;
  partnerNickname: string;
  keywordList: string[];
  interestList: string[];
  idealTypeList: string[];
};
