import axios from "axios";

const authInstance = axios.create({
  baseURL:
    (process.env.NODE_ENV === "production" ? process.env.PROD_SERVER_URL : process.env.DEV_SERVER_URL) + "/image",
  withCredentials: true,
  timeout: 2500,
});

// 2021/12/20 - 이미지 전송 요청 - by 1-blue
export function apiUploadImages(formData) {
  return authInstance.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
