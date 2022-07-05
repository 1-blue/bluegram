import { axiosInstance } from ".";
// type
import type {
  AppendBookmarkBody,
  AppendBookmarkResponse,
  LoadPostsOfBookmarkResponse,
  RemoveBookmarkBody,
  RemoveBookmarkResponse,
  LoadPostsOfBookmarkBody,
} from "@src/store/types";

// 2022/05/21 - 북마크 추가 요청 - by 1-blue
export const apiAppendBookmark = ({ PostId }: AppendBookmarkBody) =>
  axiosInstance.post<AppendBookmarkResponse>(`/bookmark/${PostId}`);

// 2022/05/21 - 북마크 제거 요청 - by 1-blue
export const apiRemoveBookmark = ({ PostId }: RemoveBookmarkBody) =>
  axiosInstance.delete<RemoveBookmarkResponse>(`/bookmark/${PostId}`);

// 2022/05/26 - 로그인한 유저의 북마크된 게시글들 요청 - by 1-blue
export const apiLoadPostsOfBookmark = ({
  lastId,
  limit,
}: LoadPostsOfBookmarkBody) =>
  axiosInstance.get<LoadPostsOfBookmarkResponse>(
    `/bookmark?lastId=${lastId}&limit=${limit}`
  );
