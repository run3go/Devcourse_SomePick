type Couple = {
  id: number;
  meet_date: string | null;
  partner_id: string;
  user1: UserData;
  user2: UserData;
};

type Schedule = {
  id: number;
  date: string;
  title: string;
  memo: string;
};
