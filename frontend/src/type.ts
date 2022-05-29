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
  DOCUMENT_DUPLICATE = "DOCUMENT_DUPLICATE",
  V_OPTION = "V_OPTION",
  H_OPTION = "H_OPTION",
  SEARCH = "SEARCH",
  UP = "UP",
  COG = "COG",
}

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
  createdAt: Date;
  updatedAt: Date;
};
export type Post = {
  _id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
};
export type Comment = {
  _id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
  PostId: number;
  RecommentId?: number;
};
export type Photo = {
  _id: number;
  name?: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
  PostId: number;
};
export type Room = {
  _id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  RoomUsers: {
    createdAt: Date;
    updatedAt: Date;
    UserId: number;
    RoomId: number;
  };
};
export type Chat = {
  _id: number;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
  RoomId: number;
};

export type SimpleType = {
  _id: number;
};
export type SimpleUser = {
  _id: number;
  name: string;
  introduction?: string;
  Photos?: Photo[];
};
export interface UserWithPostAndFollowerAndFollowing extends SimpleUser {
  introduction?: string;
  Posts: SimpleType[];
  Followers: SimpleType[];
  Followings: SimpleType[];
}
export interface IPostWithPhotoAndCommentAndLikerAndCount extends Post {
  allCommentCount: number;
  hasMoreComments: boolean;
  User: SimpleUser;
  Photos: Photo[];
  Comments: ICommentWithUserAndLikerAndCountAndRecomments[];
  PostLikers: SimpleUser[];
  PostBookmarks: SimpleUser[];
}
export interface ICommentWithUserAndLikerAndCount extends Comment {
  allCommentCount: number;
  hasMoreComments: boolean;
  User: SimpleUser;
  CommentLikers: SimpleUser[];
}
export interface ICommentWithUserAndLikerAndCountAndRecomments
  extends ICommentWithUserAndLikerAndCount {
  Recomments: ICommentWithUserAndLikerAndCount[];
}
export interface IRoomWithUserAndLastChat extends Room {
  RoomUser: SimpleUser[];
  Chats: Chat[];
}
export interface IChatWithUser extends Chat {
  User: SimpleUser;
}
export interface IRoomInformation {
  name: string;
  users: { _id: number; name: string }[];
}
