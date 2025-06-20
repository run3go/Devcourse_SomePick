type Author = {
  id: string;
  main_image: string | null;
  nickname: string | null;
  status?: stirng | null;
};

type Comments = {
  id: number;
  parent_id?: number | null;
  comment: string;
  author: Author;
  created_at: string;
  comments: ChildComments[];
  deleted?: boolean;
  edited?: boolean;
};

type ChildComments = {
  id: number;
  parent_id?: number | null;
  comment: string;
  author: Author;
  created_at: string;
  deleted?: boolean;
  edited?: boolean;
};

type Like = {
  id?: number;
  user_id?: string;
};

type SimpleComment = {
  id: number;
  deleted: boolean;
  comments: SimpleChildComments[];
};

type SimpleChildComments = {
  id: number;
  deleted?: boolean;
};

type PostData = {
  id: number;
  created_at: string;
  author: UserData;
  channel?: Channel;
  title: string;
  contents: string;
  fortune_telling: string | null;
  images?: string[] | null;
  comments: SimpleComment[];
  likes: Like[];
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
  images?: string[] | null;
};

type MiniProfilecardProps = {
  user: {
    id: string;
    main_image: string | null;
    nickname: string | null;
    status?: "solo" | "couple";
    is_followed?: boolean;
  };
  onClose: () => void;
  onFollowToggle?: (userId: string, isNowFollowing: boolean) => void;
};

type Anchor = { x: number; y: number };

type Selected = { user: Author; anchor: Anchor };

type ChannelName = "free" | "dating";
