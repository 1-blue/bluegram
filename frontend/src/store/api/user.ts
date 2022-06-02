import { axiosInstance } from ".";

// type
import type {
  EditAccountBody,
  EditAccountResponse,
  EditPasswordBody,
  EditPasswordResponse,
  LoadToMeResponse,
  LoadToUserBody,
  LoadToUserResponse,
  SignOutBody,
  SignOutResponse,
} from "../types";

// 2022/05/07 - 본인 정보 요청 - by 1-blue
export const apiLoadToMe = () =>
  axiosInstance.get<LoadToMeResponse>("/user/me");

// 2022/05/26 - 특정 유저 정보 요청 - by 1-blue
export const apiLoadToUser = ({ UserId }: LoadToUserBody) =>
  axiosInstance.get<LoadToUserResponse>(`/user/${UserId}`);

// 2022/06/02 - 로그인한 유저 상세 정보 요청 - by 1-blue
export const apiLoadMeDetail = () =>
  axiosInstance.get<LoadToUserResponse>(`/user/me/detail`);

// 2022/06/02 - 로그인한 유저 기본 정보 변경 요청 - by 1-blue
export const apiEditAccount = (body: EditAccountBody) =>
  axiosInstance.put<EditAccountResponse>(`/user`, body);

// 2022/06/02 - 로그인한 유저 비밀번호 변경 요청 - by 1-blue
export const apiEditPassword = (body: EditPasswordBody) =>
  axiosInstance.patch<EditPasswordResponse>(`/user`, body);

// 2022/06/02 - 로그인한 유저 회원 탈퇴 요청 - by 1-blue
export const apiSignOut = ({ password }: SignOutBody) =>
  axiosInstance.delete<SignOutResponse>(`/user/${password}`);
