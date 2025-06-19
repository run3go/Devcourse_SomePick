interface NotificationData {
  created_at: string;
  id: number;
  post_id: number | null;
  receiver_id: string;
  sender_id: string;
  type: string | null;
  sender: {
    id: string;
    nickname: string | null;
  };
}
