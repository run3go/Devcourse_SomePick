type Message = {
  id: number;
  chat_room_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  seen: boolean;
  created_at: string;
};
