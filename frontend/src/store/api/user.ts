import { axiosInstance } from ".";

// type
import type {
  LoadToMeResponse,
  LoadToUserBody,
  LoadToUserResponse,
} from "../types";

// 2022/05/07 - 본인 정보 요청 - by 1-blue
export const apiLoadToMe = () =>
  axiosInstance.get<LoadToMeResponse>("/user/me");

// 2022/05/26 - 특정 유저 정보 요청 - by 1-blue
export const apiLoadToUser = ({ UserId }: LoadToUserBody) =>
  axiosInstance.get<LoadToUserResponse>(`/user/${UserId}`);
