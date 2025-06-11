type Author = {
  id: string;
  main_image: string | null;
  nickname: string | null;
};

type Comments = {
  id: number;
  comment: string;
  author: Author;
  created_at?: string;
  comments?: Comments[];
};

type Like = {
  user_id: string;
};

type Channel = {
  name: string;
  description: string | null;
};

type Post = {
  title: string;
  contents: string;
  created_at: string;
  fortune_telling: string | null;
  channel: Channel | null;
  author: Author;
  comments: Comments[];
  likes: Like[];
  image?: string | null;
};
