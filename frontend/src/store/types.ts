import {
  ICommentWithUserAndLikerAndCountAndRecomments,
  IPostWithPhotoAndCommentAndLikerAndCount,
  ICommentWithUserAndLikerAndCount,
  SimpleUser,
  UserWithPostAndFollowerAndFollowing,
  IRoomWithUserAndLastChat,
  IChatWithUser,
  IRoomInformation,
} from "@src/type";

// 2022/05/13 - 리셋 메시지 - by 1-blue
export const RESET_MESSAGE = "RESET_MESSAGE" as const;

// 2022/05/22 - 예측가능한 실패인 경우 응답 타입 ( 403, 409 등 ) - by 1-blue
export type FailureResponse = {
  message: string;
};

// 2022/05/06 - 로그인 관련 타입 - by 1-blue
export const LOCAL_LOGIN_REQUEST = "LOCAL_LOGIN_REQUEST" as const;
export const LOCAL_LOGIN_SUCCESS = "LOCAL_LOGIN_SUCCESS" as const;
export const LOCAL_LOGIN_FAILURE = "LOCAL_LOGIN_FAILURE" as const;
export type LogInBody = {
  id: string;
  password: string;
};
export type LogInResponse = {
  ok: boolean;
  message: string;
  user: SimpleUser;
};

// 2022/05/06 - 로그아웃 관련 타입 - by 1-blue
export const LOCAL_LOGOUT_REQUEST = "LOCAL_LOGOUT_REQUEST" as const;
export const LOCAL_LOGOUT_SUCCESS = "LOCAL_LOGOUT_SUCCESS" as const;
export const LOCAL_LOGOUT_FAILURE = "LOCAL_LOGOUT_FAILURE" as const;
export type LogOutResponse = {
  ok: boolean;
  message: string;
};

// 2022/05/13 - 회원가입 관련 타입 - by 1-blue
export const SIGNUP_REQUEST = "SIGNUP_REQUEST" as const;
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS" as const;
export const SIGNUP_FAILURE = "SIGNUP_FAILURE" as const;
export type SignUpBody = {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  introduction: string;
};
export type SignUpResponse = {
  ok: boolean;
  message: string;
};

// 2022/05/07 - 본인 정보 요청 관련 타입 - by 1-blue
export const LOAD_TO_ME_REQUEST = "LOAD_TO_ME_REQUEST" as const;
export const LOAD_TO_ME_SUCCESS = "LOAD_TO_ME_SUCCESS" as const;
export const LOAD_TO_ME_FAILURE = "LOAD_TO_ME_FAILURE" as const;
export type LoadToMeResponse = {
  ok: boolean;
  message: string;
  user: UserWithPostAndFollowerAndFollowing;
} | null;

// 2022/05/19 - 게시글 생성 모달 열기/닫기 - by 1-blue
export const OPEN_WRITE_MODAL = "OPEN_WRITE_MODAL" as const;
export const CLOSE_WRITE_MODAL = "CLOSE_WRITE_MODAL" as const;

// 2022/05/07 - 모든 게시글들 로드 요청 관련 타입 - by 1-blue
export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST" as const;
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS" as const;
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE" as const;
export type LoadPostsBody = {
  lastId: number;
  limit: number;
};
export type LoadPostsResponse = {
  limit: number;
  posts: IPostWithPhotoAndCommentAndLikerAndCount[];
};

// 2022/05/07 - 게시글 업로드 요청 관련 타입 - by 1-blue
export const UPLOAD_POST_REQUEST = "UPLOAD_POST_REQUEST" as const;
export const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS" as const;
export const UPLOAD_POST_FAILURE = "UPLOAD_POST_FAILURE" as const;
export type UploadPostBody = {
  content: string;
  photos: string[];
};
export type UploadPostResponse = {
  ok: boolean;
  message: string;
  createdPost: IPostWithPhotoAndCommentAndLikerAndCount;
};

// 2022/05/21 - 게시글들 상세 정보 로드 요청 관련 타입 - by 1-blue
export const LOAD_DETAIL_POSTS_REQUEST = "LOAD_DETAIL_POSTS_REQUEST" as const;
export const LOAD_DETAIL_POSTS_SUCCESS = "LOAD_DETAIL_POSTS_SUCCESS" as const;
export const LOAD_DETAIL_POSTS_FAILURE = "LOAD_DETAIL_POSTS_FAILURE" as const;
export type LoadDetailPostsBody = {
  lastId: number;
  limit: number;
};
export type LoadDetailPostsResponse = {
  ok: boolean;
  message: string;
  posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  limit: number;
};

// 2022/05/21 - 게시글 제거 요청 관련 타입 - by 1-blue
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST" as const;
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS" as const;
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE" as const;
export type RemovePostBody = {
  PostId: number;
};
export type RemovePostResponse = {
  ok: boolean;
  message: string;
  removedPostId: number;
};

// 2022/05/21 - 게시글의 댓글 요청 관련 타입 - by 1-blue
export const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST" as const;
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS" as const;
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE" as const;
export type LoadCommentsBody = {
  PostId: number;
  lastId: number | null;
  limit: number;
};
export type LoadCommentsResponse = {
  ok: boolean;
  message: string;
  Comments: ICommentWithUserAndLikerAndCountAndRecomments[];
  PostId: number;
  limit: number;
};

// 2022/05/21 - 게시글의 댓글 추가 요청 관련 타입 - by 1-blue
export const APPEND_COMMENT_REQUEST = "APPEND_COMMENT_REQUEST" as const;
export const APPEND_COMMENT_SUCCESS = "APPEND_COMMENT_SUCCESS" as const;
export const APPEND_COMMENT_FAILURE = "APPEND_COMMENT_FAILURE" as const;
export type AppendCommentBody = {
  PostId: number;
  content: string;
  RecommentId?: number | null;
};
export type AppendCommentResponse = {
  ok: boolean;
  message: string;
  createdComment: ICommentWithUserAndLikerAndCountAndRecomments;
  RecommentId: number;
};
// 2022/05/21 - 게시글의 댓글 제거 요청 관련 타입 - by 1-blue
export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST" as const;
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS" as const;
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE" as const;
export type RemoveCommentBody = {
  CommentId: number;
};
export type RemoveCommentResponse = {
  ok: boolean;
  message: string;
  removedCommentId: number;
  removedPostId: number;
  RecommentId?: number | null;
};

// 2022/05/21 - 게시글에 좋아요 추가 요청 관련 타입 - by 1-blue
export const APPEND_LIKE_TO_POST_REQUEST =
  "APPEND_LIKE_TO_POST_REQUEST" as const;
export const APPEND_LIKE_TO_POST_SUCCESS =
  "APPEND_LIKE_TO_POST_SUCCESS" as const;
export const APPEND_LIKE_TO_POST_FAILURE =
  "APPEND_LIKE_TO_POST_FAILURE" as const;
export type AppendLikeToPostBody = {
  PostId: number;
};
export type AppendLikeToPostResponse = {
  ok: boolean;
  message: string;
  likedPostId: number;
  UserId: number;
};
// 2022/05/21 - 게시글에 좋아요 제거 요청 관련 타입 - by 1-blue
export const REMOVE_LIKE_TO_POST_REQUEST =
  "REMOVE_LIKE_TO_POST_REQUEST" as const;
export const REMOVE_LIKE_TO_POST_SUCCESS =
  "REMOVE_LIKE_TO_POST_SUCCESS" as const;
export const REMOVE_LIKE_TO_POST_FAILURE =
  "REMOVE_LIKE_TO_POST_FAILURE" as const;
export type RemoveLikeToPostBody = {
  PostId: number;
};
export type RemoveLikeToPostResponse = {
  ok: boolean;
  message: string;
  unlikedPostId: number;
  UserId: number;
};

// 2022/05/21 - 댓글의 좋아요 추가 요청 관련 타입 - by 1-blue
export const APPEND_LIKE_TO_COMMENT_REQUEST =
  "APPEND_LIKE_TO_COMMENT_REQUEST" as const;
export const APPEND_LIKE_TO_COMMENT_SUCCESS =
  "APPEND_LIKE_TO_COMMENT_SUCCESS" as const;
export const APPEND_LIKE_TO_COMMENT_FAILURE =
  "APPEND_LIKE_TO_COMMENT_FAILURE" as const;
export type AppendLikeToCommentBody = {
  CommentId: number;
};
export type AppendLikeToCommentResponse = {
  ok: boolean;
  message: string;
  PostId: number;
  CommentId: number;
  RecommentId?: number | null;
  commentLiker: {
    _id: number;
    name: string;
  };
};
// 2022/05/21 - 댓글의 좋아요 제거 요청 관련 타입 - by 1-blue
export const REMOVE_LIKE_TO_COMMENT_REQUEST =
  "REMOVE_LIKE_TO_COMMENT_REQUEST" as const;
export const REMOVE_LIKE_TO_COMMENT_SUCCESS =
  "REMOVE_LIKE_TO_COMMENT_SUCCESS" as const;
export const REMOVE_LIKE_TO_COMMENT_FAILURE =
  "REMOVE_LIKE_TO_POST_FAILURE" as const;
export type RemoveLikeToCommentBody = {
  CommentId: number;
};
export type RemoveLikeToCommentResponse = {
  ok: boolean;
  message: string;
  PostId: number;
  CommentId: number;
  RecommentId?: number | null;
  UserId: number;
};

// 2022/05/21 - 팔로우 요청 관련 타입 - by 1-blue
export const FOLLOW_REQUEST = "FOLLOW_REQUEST" as const;
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS" as const;
export const FOLLOW_FAILURE = "FOLLOW_FAILURE" as const;
export type FollowBody = {
  UserId: number;
};
export type FollowResponse = {
  ok: boolean;
  message: string;
  followingId: number;
  followerId: number;
};
// 2022/05/21 - 언팔로우 요청 관련 타입 - by 1-blue
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST" as const;
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS" as const;
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE" as const;
export type UnfollowBody = {
  UserId: number;
};
export type UnfollowResponse = {
  ok: boolean;
  message: string;
  unfollowingId: number;
  unfollowerId: number;
};

// 2022/05/21 - 게시글 북마크 요청 관련 타입 - by 1-blue
export const APPEND_BOOKMARK_REQUEST = "APPEND_BOOKMARK_REQUEST" as const;
export const APPEND_BOOKMARK_SUCCESS = "APPEND_BOOKMARK_SUCCESS" as const;
export const APPEND_BOOKMARK_FAILURE = "APPEND_BOOKMARK_FAILURE" as const;
export type AppendBookmarkBody = {
  PostId: number;
};
export type AppendBookmarkResponse = {
  ok: boolean;
  message: string;
  PostId: number;
  UserId: number;
};
// 2022/05/21 - 게시글 북마크 요청 관련 타입 - by 1-blue
export const REMOVE_BOOKMARK_REQUEST = "REMOVE_BOOKMARK_REQUEST" as const;
export const REMOVE_BOOKMARK_SUCCESS = "REMOVE_BOOKMARK_SUCCESS" as const;
export const REMOVE_BOOKMARK_FAILURE = "REMOVE_BOOKMARK_FAILURE" as const;
export type RemoveBookmarkBody = {
  PostId: number;
};
export type RemoveBookmarkResponse = {
  ok: boolean;
  message: string;
  PostId: number;
  UserId: number;
};

// 2022/05/23 - 특정 댓글의 답글 요청 관련 타입 - by 1-blue
export const LOAD_RECOMMENTS_REQUEST = "LOAD_RECOMMENTS_REQUEST" as const;
export const LOAD_RECOMMENTS_SUCCESS = "LOAD_RECOMMENTS_SUCCESS" as const;
export const LOAD_RECOMMENTS_FAILURE = "LOAD_RECOMMENTS_FAILURE" as const;
export type LoadRecommentsBody = {
  CommentId: number;
  lastId: number | null;
  limit: number;
};
export type LoadRecommentsResponse = {
  ok: boolean;
  message: string;
  Recomments: ICommentWithUserAndLikerAndCount[];
  targetPostId: number;
  targetCommentId: number;
  limit: number;
};

// 2022/05/25 - 특정 해시태그를 가지는 게시글들 요청 타입 - by 1-blue
export const LOAD_POSTS_OF_HASHTAG_REQUEST =
  "LOAD_POSTS_OF_HASHTAG_REQUEST" as const;
export const LOAD_POSTS_OF_HASHTAG_SUCCESS =
  "LOAD_POSTS_OF_HASHTAG_SUCCESS" as const;
export const LOAD_POSTS_OF_HASHTAG_FAILURE =
  "LOAD_POSTS_OF_HASHTAG_FAILURE" as const;
export type LoadPostsOfHashtagBody = {
  hashtag: string;
  lastId: number | null;
  limit: number;
};
export type LoadPostsOfHashtagResponse = {
  ok: boolean;
  message: string;
  limit: number;
  posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  postCount: number;
  hashtag: string;
};

// 2022/05/26 - 특정 유저 정보 요청 타입 - by 1-blue
export const LOAD_TO_USER_REQUEST = "LOAD_TO_USER_REQUEST" as const;
export const LOAD_TO_USER_SUCCESS = "LOAD_TO_USER_SUCCESS" as const;
export const LOAD_TO_USER_FAILURE = "LOAD_TO_USER_FAILURE" as const;
export type LoadToUserBody = {
  UserId: number;
};
export type LoadToUserResponse = {
  ok: boolean;
  message: string;
  user: UserWithPostAndFollowerAndFollowing;
};

// 2022/05/26 - 특정 유저의 게시글들 요청 타입 - by 1-blue
export const LOAD_POSTS_OF_USER_REQUEST = "LOAD_POSTS_OF_USER_REQUEST" as const;
export const LOAD_POSTS_OF_USER_SUCCESS = "LOAD_POSTS_OF_USER_SUCCESS" as const;
export const LOAD_POSTS_OF_USER_FAILURE = "LOAD_POSTS_OF_USER_FAILURE" as const;
export type LoadPostsOfUserBody = {
  UserId: number;
  lastId: number;
  limit: number;
};
export type LoadPostsOfUserResponse = {
  ok: boolean;
  message: string;
  posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  limit: number;
};

// 2022/05/26 - 특정 유저의 상세 게시글들 요청 타입 - by 1-blue
export const LOAD_POSTS_DETAIL_OF_USER_REQUEST =
  "LOAD_POSTS_DETAIL_OF_USER_REQUEST" as const;
export const LOAD_POSTS_DETAIL_OF_USER_SUCCESS =
  "LOAD_POSTS_DETAIL_OF_USER_SUCCESS" as const;
export const LOAD_POSTS_DETAIL_OF_USER_FAILURE =
  "LOAD_POSTS_DETAIL_OF_USER_FAILURE" as const;
export type LoadPostsDetailOfUserBody = {
  UserId: number;
  lastId: number;
  limit: number;
};
export type LoadPostsDetailOfUserResponse = {
  ok: boolean;
  message: string;
  posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  limit: number;
};

// 2022/05/26 - 특정 유저의 팔로워들 요청 타입 - by 1-blue
export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST" as const;
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS" as const;
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE" as const;
export type LoadFollowersBody = {
  UserId: number;
};
export type LoadFollowersResponse = {
  ok: boolean;
  message: string;
  followers: SimpleUser[];
};

// 2022/05/26 - 특정 유저의 팔로잉들 요청 타입 - by 1-blue
export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST" as const;
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS" as const;
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE" as const;
export type LoadFollowingsBody = {
  UserId: number;
};
export type LoadFollowingsResponse = {
  ok: boolean;
  message: string;
  followings: SimpleUser[];
};

// 2022/05/26 - 로그인한 유저의 북마크된 게시글들 요청 타입 - by 1-blue
export const LOAD_POSTS_OF_BOOKMARK_REQUEST =
  "LOAD_POSTS_OF_BOOKMARK_REQUEST" as const;
export const LOAD_POSTS_OF_BOOKMARK_SUCCESS =
  "LOAD_POSTS_OF_BOOKMARK_SUCCESS" as const;
export const LOAD_POSTS_OF_BOOKMARK_FAILURE =
  "LOAD_POSTS_OF_BOOKMARK_FAILURE" as const;
export type LoadPostsOfBookmarkBody = {};
export type LoadPostsOfBookmarkResponse = {
  ok: boolean;
  message: string;
  posts: IPostWithPhotoAndCommentAndLikerAndCount[];
  limit: number;
};

// 2022/05/28 - 로그인한 유저의 채팅방들 요청 타입 - by 1-blue
export const LOAD_ROOMS_REQUEST = "LOAD_ROOMS_REQUEST" as const;
export const LOAD_ROOMS_SUCCESS = "LOAD_ROOMS_SUCCESS" as const;
export const LOAD_ROOMS_FAILURE = "LOAD_ROOMS_FAILURE" as const;
export type LoadRoomsBody = {};
export type LoadRoomsResponse = {
  ok: boolean;
  message: string;
  rooms: IRoomWithUserAndLastChat[];
};

// 2022/05/28 - 로그인한 유저의 채팅방 생성 요청 타입 - by 1-blue
export const ADD_ROOM_REQUEST = "ADD_ROOM_REQUEST" as const;
export const ADD_ROOM_SUCCESS = "ADD_ROOM_SUCCESS" as const;
export const ADD_ROOM_FAILURE = "ADD_ROOM_FAILURE" as const;
export type AddRoomBody = {
  roomName: string;
  UserId: number;
};
export type AddRoomResponse = {
  ok: boolean;
  message: string;
  RoomId: number;
};

// 2022/05/28 - 특정 채팅방의 채팅기록 요청 타입 - by 1-blue
export const LOAD_CHATS_REQUEST = "LOAD_CHATS_REQUEST" as const;
export const LOAD_CHATS_SUCCESS = "LOAD_CHATS_SUCCESS" as const;
export const LOAD_CHATS_FAILURE = "LOAD_CHATS_FAILURE" as const;
export type LoadChatsBody = {
  RoomId: string;
  lastId: number;
  limit: number;
};
export type LoadChatsResponse = {
  ok: boolean;
  message: string;
  chats: IChatWithUser[];
  roomInformation: IRoomInformation;
  limit: number;
};

// 2022/05/31 - 채팅 추가 - by 1-blue
export const ADD_CHAT = "ADD_CHAT" as const;
export type AddChatBody = {
  _id: number;
  RoomId: number;
  UserId: number;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  User: SimpleUser;
};

// 2022/06/01 - 채팅방 나가기 - by 1-blue
export const EXIT_ROOM_REQUEST = "EXIT_ROOM_REQUEST" as const;
export const EXIT_ROOM_SUCCESS = "EXIT_ROOM_SUCCESS" as const;
export const EXIT_ROOM_FAILURE = "EXIT_ROOM_FAILURE" as const;
export type ExitRoomBody = {
  RoomId: number;
};
export type ExitRoomResponse = {
  ok: boolean;
  message: string;
};
