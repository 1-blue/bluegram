import axios from "axios";

const imageInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL + "/image",
  withCredentials: true,
  timeout: 20000,
});

// 2021/12/20 - 이미지 전송 요청 - by 1-blue
export function apiUploadImages(formData) {
  return imageInstance.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// 2022/01/14 - 특정 프리뷰 제거 요청 - by 1-blue
export function apiRemovePreview(body) {
  return imageInstance.delete(`/${body.preview}`);
}
