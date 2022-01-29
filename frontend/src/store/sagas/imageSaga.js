/* eslint-disable prettier/prettier */

import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import {
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  REMOVE_PREVIEW_REQUEST, REMOVE_PREVIEW_SUCCESS, REMOVE_PREVIEW_FAILURE,
} from "@store/types";

// api
import { apiUploadImages, apiRemovePreview } from "@store/api";

function* uploadImages(action) {
  try {
    const { data } = yield call(apiUploadImages, action.data);

    yield put({ type: UPLOAD_IMAGES_SUCCESS, data });
  } catch (error) {
    console.error("imageSaga uploadImages >> ", error);
    yield put({ type: UPLOAD_IMAGES_FAILURE, data: error.response.data });
  }
}
function* removePreview(action) {
  try {
    const { data } = yield call(apiRemovePreview, action.data);

    yield put({ type: REMOVE_PREVIEW_SUCCESS, data });
  } catch (error) {
    console.error("imageSaga removePreview >> ", error);
    yield put({ type: REMOVE_PREVIEW_FAILURE, data: error.response.data });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRemovePreview() {
  yield takeLatest(REMOVE_PREVIEW_REQUEST, removePreview);
}

export default function* imageSaga() {
  yield all([fork(watchUploadImages), fork(watchRemovePreview)]);
}
