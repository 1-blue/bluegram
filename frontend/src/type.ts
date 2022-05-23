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

export type SimpleUser = {
  _id: number;
  name: string;
  Photos?: Photo[];
};
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
