import { axiosInstance } from ".";

// type
import type {
  AppendCommentBody,
  AppendCommentResponse,
  LoadCommentsBody,
  LoadCommentsResponse,
  LoadRecommentsBody,
  LoadRecommentsResponse,
  RemoveCommentBody,
  RemoveCommentResponse,
} from "@src/store/types";

// 2022/05/21 - 게시글의 댓글들 로드 요청 - by 1-blue
export const apiLoadComments = ({ lastId, limit, PostId }: LoadCommentsBody) =>
  axiosInstance.get<LoadCommentsResponse>(
    `/comment/post/${PostId}?lastId=${lastId}&limit=${limit}`
  );

// 2022/05/21 - 게시글의 댓글 추가 요청 - by 1-blue
export const apiAppendComment = (body: AppendCommentBody) =>
  axiosInstance.post<AppendCommentResponse>(`/comment/post`, body);

// 2022/05/21 - 게시글의 댓글 제거 요청 - by 1-blue
export const apiRemoveComment = ({ CommentId }: RemoveCommentBody) =>
  axiosInstance.delete<RemoveCommentResponse>(`/comment/post/${CommentId}`);

// 2022/05/23 - 특정 댓글의 답글들 가져오기 - by 1-blue
export const apiLoadRecomments = ({
  CommentId,
  lastId,
  limit,
}: LoadRecommentsBody) =>
  axiosInstance.get<LoadRecommentsResponse>(
    `/comment/recomment/${CommentId}?lastId=${lastId}&limit=${limit}`
  );
