import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// types
import type { AxiosResponse } from "axios";
import {
  AddRoomResponse,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_FAILURE,
  ADD_ROOM_REQUEST,
  LoadRoomsResponse,
  LOAD_ROOMS_SUCCESS,
  LOAD_ROOMS_FAILURE,
  LOAD_ROOMS_REQUEST,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
  LOAD_CHATS_REQUEST,
  LoadChatsResponse,
} from "@src/store/types";

// api
import { apiAddRoom, apiLoadRooms, apiLoadChats } from "@src/store/api";

function* addRoom(action: any) {
  try {
    const { data }: AxiosResponse<AddRoomResponse> = yield call(
      apiAddRoom,
      action.data
    );

    yield put({ type: ADD_ROOM_SUCCESS, data });
  } catch (error: any) {
    console.error("authSaga addRoom >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: ADD_ROOM_FAILURE, data: { message } });
  }
}
function* watchAddRoom() {
  yield takeLatest(ADD_ROOM_REQUEST, addRoom);
}

function* loadRooms() {
  try {
    const { data }: AxiosResponse<LoadRoomsResponse> = yield call(apiLoadRooms);

    yield put({ type: LOAD_ROOMS_SUCCESS, data });
  } catch (error: any) {
    console.error("authSaga loadRooms >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: LOAD_ROOMS_FAILURE, data: { message } });
  }
}
function* watchLoadRooms() {
  yield takeLatest(LOAD_ROOMS_REQUEST, loadRooms);
}

function* loadChats(action: any) {
  try {
    const { data }: AxiosResponse<LoadChatsResponse> = yield call(
      apiLoadChats,
      action.data
    );

    yield put({ type: LOAD_CHATS_SUCCESS, data });
  } catch (error: any) {
    console.error("authSaga loadChats >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put({ type: LOAD_CHATS_FAILURE, data: { message } });
  }
}
function* watchLoadChats() {
  yield takeLatest(LOAD_CHATS_REQUEST, loadChats);
}

export default function* chatSaga() {
  yield all([fork(watchAddRoom), fork(watchLoadRooms), fork(watchLoadChats)]);
}
