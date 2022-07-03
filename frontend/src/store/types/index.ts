// 2022/07/03 - 응답 status 기본 타입 - by 1-blue
export type ResponseStatus = {
  status: {
    ok: boolean;
  };
};
// 2022/07/03 - 응답 데이터 기본 타입 - by 1-blue
export type ResponseData = {
  message: string;
};
// 2022/07/03 - 예측가능한 실패인 경우 응답 타입 ( 403, 409 등 ) - by 1-blue
export type ResponseFailure = {
  status: { ok: boolean };
  data: { message: string };
};
// 2022/07/03 - 이미지 반환 타입 - by 1-blue
export type ResponseOfPhoto = ResponseStatus & {
  data: ResponseData & {
    photos: string[];
  };
};

export type {
  LogInBody,
  LogInResponse,
  LogOutResponse,
  SignUpBody,
  SignUpResponse,
} from "./auth";
export type {
  AppendBookmarkBody,
  AppendBookmarkResponse,
  LoadPostsOfBookmarkResponse,
  RemoveBookmarkBody,
  RemoveBookmarkResponse,
} from "./bookmark";
export type {
  AppendCommentBody,
  AppendCommentResponse,
  LoadCommentsBody,
  LoadCommentsResponse,
  LoadRecommentsBody,
  LoadRecommentsResponse,
  RemoveCommentBody,
  RemoveCommentResponse,
} from "./comment";
export type {
  FollowBody,
  FollowResponse,
  LoadFollowersBody,
  LoadFollowersResponse,
  LoadFollowingsBody,
  LoadFollowingsResponse,
  UnfollowBody,
  UnfollowResponse,
} from "./follow";
export type {
  AppendLikeToCommentBody,
  AppendLikeToCommentResponse,
  AppendLikeToPostBody,
  AppendLikeToPostResponse,
  RemoveLikeToCommentBody,
  RemoveLikeToCommentResponse,
  RemoveLikeToPostBody,
  RemoveLikeToPostResponse,
} from "./like";
export type {
  LoadDetailPostsBody,
  LoadDetailPostsResponse,
  LoadPostsBody,
  LoadPostsDetailOfUserBody,
  LoadPostsDetailOfUserResponse,
  LoadPostsOfHashtagBody,
  LoadPostsOfHashtagResponse,
  LoadPostsOfUserBody,
  LoadPostsOfUserResponse,
  LoadPostsResponse,
  RemovePostBody,
  RemovePostResponse,
  UploadPostBody,
  UploadPostResponse,
} from "./post";
export type {
  AddChatBody,
  LoadChatsBody,
  LoadChatsResponse,
  AddRoomBody,
  AddRoomResponse,
  ExitRoomBody,
  ExitRoomResponse,
  LoadRoomsResponse,
} from "./chat";
export type {
  EditAccountBody,
  EditAccountResponse,
  EditPasswordBody,
  EditPasswordResponse,
  LoadToMeDetailResponse,
  LoadToMeResponse,
  LoadToUserBody,
  LoadToUserResponse,
  SignOutBody,
  SignOutResponse,
} from "./user";
