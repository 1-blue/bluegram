import { axiosInstance } from ".";

// type
import type { LoadToMeResponse } from "../types";

// 2022/05/07 - 본인 정보 요청 - by 1-blue
export const apiLoadToMe = () =>
  axiosInstance.get<LoadToMeResponse>("/user/me");
