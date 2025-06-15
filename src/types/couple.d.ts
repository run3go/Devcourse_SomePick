type Couple = {
  id: number;
  meet_date: string | null;
  partner_id: string;
  user1: UserData;
  user2: UserData;
};

type Schedule = {
  couple_id: number;
  created_at: string;
  date: string;
  id: number;
  memo: string | null;
  title: string;
};

type SchedulePayload = {
  couple_id: number;
  date: string;
  title: string;
  memo: string;
  id?: number;
};

type Matching = {
  created_at: string;
  id: number;
  is_matched: boolean;
  is_rejected: boolean;
  matching_user_id: string;
  user_id: string;
};
