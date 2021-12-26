import { UPLOAD_IMAGES_REQUEST, RESET_IMAGE_PREVIEW_REQUEST } from "@store/types";

// 2021/12/20 - 이미지 요청 - by 1-blue
export function uploadImagesAction(data) {
  return {
    type: UPLOAD_IMAGES_REQUEST,
    data,
  };
}

// 2021/12/20 - 이미지 요청 - by 1-blue
export function resetImagePreview(data) {
  return {
    type: RESET_IMAGE_PREVIEW_REQUEST,
    data,
  };
}
