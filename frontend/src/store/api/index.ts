import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/api",
  withCredentials: true,
  timeout: 10000,
});

// const myRequestInterceptor = axiosInstance.interceptors.request.use(
//   config => {
//     return config;
//   },
//   error => {
//     console.log("오류 요청을 보내기전 호출됨");
//     return Promise.reject(error);
//   },
// );

export { apiLocalLogin, apiLocalLogout, apiSignup } from "./auth";
export { apiLoadToMe } from "./user";
export {
  apiLoadPosts,
  apiUploadPost,
  apiLoadDetailPosts,
  apiRemovePost,
} from "./post";
export { apiLoadComments, apiAppendComment, apiRemoveComment } from "./comment";
export {
  apiAppendLikeToComment,
  apiAppendLikeToPost,
  apiRemoveLikeToComment,
  apiRemoveLikeToPost,
} from "./like";
export { apiFollow, apiUnfollow } from "./follow";
export { apiAppendBookmark, apiRemoveBookmark } from "./bookmark";
