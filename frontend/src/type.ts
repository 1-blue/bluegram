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
  createdAt: Date;
  UserId: number;
};
export type Comment = {
  _id: number;
  content: string;
  createdAt: Date;
  RecommentId?: number;
  UserId: number;
  PostId: number;
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
export interface IPostWithPhotoAndCommentAndLikerAndCount extends Post {
  allCommentCount: number;
  hasMoreComments: boolean;
  User: SimpleUser;
  Photos: Photo[];
  Comments: (ICommentWithUserAndRecommentAndLiker & {
    allRecommentCount: number;
  })[];
  PostLikers: SimpleUser[];
  PostBookmarks: {
    _id: number;
  }[];
}
export interface IDetailPost extends Post {
  User: SimpleUser;
  Photos: Photo[];
  Comments: (Comment & { User: SimpleUser })[];
  PostLikers: {
    _id: number;
    createdAt: Date;
  }[];
  PostBookmarks: {
    _id: number;
  }[];
}
export interface ICommentWithUserAndRecommentAndLiker extends Comment {
  hasMoreRecomments?: boolean;
  User: SimpleUser;
  Recomments: {
    _id: number;
    content: string;
    createdAt: Date;
    User: SimpleUser;
    CommentLikers: {
      _id: number;
      name: string;
    }[];
  }[];
  CommentLikers: {
    _id: number;
    name: string;
  }[];
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
  DOCUMENT_DUPLICATE = "DOCUMENT_DUPLICATE",
  V_OPTION = "V_OPTION",
  H_OPTION = "H_OPTION",
}
