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
