import axios from "axios";

// type
import type { LoadToMeResponse } from "../types";

export const userInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/api/user",
  withCredentials: true,
  timeout: 10000,
});

// 2022/05/07 - 본인 정보 요청 - by 1-blue
export const apiLoadToMe = () => userInstance.get<LoadToMeResponse>("/me");
