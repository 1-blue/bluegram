import { axiosInstance } from ".";
// type
import type {
  AppendBookmarkBody,
  AppendBookmarkResponse,
  RemoveBookmarkBody,
  RemoveBookmarkResponse,
} from "../types";

// 2022/05/21 - 팔로우 요청 - by 1-blue
export const apiAppendBookmark = ({ PostId }: AppendBookmarkBody) =>
  axiosInstance.post<AppendBookmarkResponse>(`/bookmark/${PostId}`);
// 2022/05/21 - 언팔로우 요청 - by 1-blue
export const apiRemoveBookmark = ({ PostId }: RemoveBookmarkBody) =>
  axiosInstance.delete<RemoveBookmarkResponse>(`/bookmark/${PostId}`);
