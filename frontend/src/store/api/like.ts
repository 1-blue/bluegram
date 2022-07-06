import { axiosInstance } from ".";

// type
import type {
  AppendLikeToCommentBody,
  AppendLikeToCommentResponse,
  AppendLikeToPostBody,
  AppendLikeToPostResponse,
  RemoveLikeToCommentBody,
  RemoveLikeToCommentResponse,
  RemoveLikeToPostBody,
  RemoveLikeToPostResponse,
} from "@src/store/types";

// 2022/05/21 - 게시글에 좋아요 추가 요청 - by 1-blue
export const apiAppendLikeToPost = ({ PostId }: AppendLikeToPostBody) =>
  axiosInstance.post<AppendLikeToPostResponse>(`/like/post/${PostId}`);
// 2022/05/21 - 게시글에 좋아요 제거 요청 - by 1-blue
export const apiRemoveLikeToPost = ({ PostId }: RemoveLikeToPostBody) =>
  axiosInstance.delete<RemoveLikeToPostResponse>(`/like/post/${PostId}`);

// 2022/05/21 - 댓글에 좋아요 추가 요청 - by 1-blue
export const apiAppendLikeToComment = ({
  CommentId,
}: AppendLikeToCommentBody) =>
  axiosInstance.post<AppendLikeToCommentResponse>(`/like/comment/${CommentId}`);
// 2022/05/21 - 댓글에 좋아요 제거 요청 - by 1-blue
export const apiRemoveLikeToComment = ({
  CommentId,
}: RemoveLikeToCommentBody) =>
  axiosInstance.delete<RemoveLikeToCommentResponse>(
    `/like/comment/${CommentId}`
  );
