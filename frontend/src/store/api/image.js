import axios from "axios";

const authInstance = axios.create({
  baseURL: `${process.env.SERVER_URL}/image`,
  withCredentials: true,
  timeout: 1000,
});

// 이미지 전송 요청
export function apiUploadImages(formData) {
  return authInstance.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
