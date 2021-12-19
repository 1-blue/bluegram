import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import { UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE } from "@store/types";

// api
import { apiUploadImages } from "@store/api";

function* uploadImages(action) {
  try {
    const { data } = yield call(apiUploadImages, action.data);

    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* imageSaga() {
  yield all([fork(watchUploadImages)]);
}
