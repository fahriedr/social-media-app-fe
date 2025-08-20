export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  id: string;
  name: string;
  bio: string;
  avatar: URL | string;
};

export type INewPost = {
  caption: string;
  media: string[];
};

export type IUpdatePost = {
  id: number;
  postId: number;
  caption: string;
  media: string[]
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};


export type IPost = {
  id: number;
  user_id: number;
  caption: string;
  user: PostUser;
  media: PostMedia[];
  timestamp: string;
  _count: {
    likes: number;
    comments: number;
  }
}

type PostUser = {
  id: number;
  username: string;
  avatar: string;
}

type PostMedia = {
  id: number;
  link_url: string;
  timestamp: string;
}