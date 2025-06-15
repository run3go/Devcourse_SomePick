type NotificationData = {
  id: number;
  created_at: string;
  sender: {
    id: string;
    nickname: string | null;
  };
  sender_id: string;
  receiver_id: string;
  post_id: number | null;
  type: string | null;
};
