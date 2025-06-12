export interface Notification {
  id: number;
  created_at: string;
  sender: {
    id: string;
    nickname: string | null;
  };
  sender_id: string;
  receiver_id: string;
  post_id: number | null;
  type:
    | "like"
    | "comment"
    | "heart"
    | "follow"
    | "message"
    | "approve"
    | "reject"
    | "schedule"
    | null;
}
