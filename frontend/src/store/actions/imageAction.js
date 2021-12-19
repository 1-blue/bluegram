import { UPLOAD_IMAGES_REQUEST } from "@store/types";

// 이미지 요청
export function uploadImagesAction(data) {
  return {
    type: UPLOAD_IMAGES_REQUEST,
    data,
  };
}
