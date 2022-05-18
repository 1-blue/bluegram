export type User = {
  _id: number;
  id?: string;
  password?: string;
  name: string;
  email?: string;
  birthday?: string;
  introduction?: string;
  snsId?: number;
  provider?: string;
};
export type Post = {
  _id: number;
  content: string;
};
export type Comment = {
  _id: number;
  content: string;
};
export type Hashtag = {
  _id: number;
  content: string;
};
export type Photo = {
  _id: number;
  name?: string;
  url?: string;
};

export type SimpleUser = {
  _id: number;
  name: string;
  Photos?: Photo[];
};
export interface IPostWithPhotoAndCommentAndCount extends Post {
  Photos?: Photo[];
  Comments?: Comment[];
}

export enum ICON {
  HEART = "HEART",
  COMMENT = "COMMENT",
  HOME = "HOME",
  AIRPLANE = "AIRPLANE",
  CIRCLE_ADD = "CIRCLE_ADD",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGNUP = "SIGNUP",
  PHOTO = "PHOTO",
  AVATAR = "AVATAR",
  BOOKMARK = "BOOKMARK",
}
