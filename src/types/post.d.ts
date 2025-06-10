type PostData = {
  id: number;
  created_at: string;
  author: UserData;
  channel: Channel;
  title: string;
  contents: string;
  fortune_telling: string;
  image: string;
  comments: [];
  likes: [];
};

type Channel = {
  name: string;
  description: string;
};
