import { all, call, fork, put, takeLatest } from "redux-saga/effects";

// action
import { chatActions } from "@src/store/reducers";

// types
import type { AxiosResponse } from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  AddRoomResponse,
  LoadRoomsResponse,
  LoadChatsResponse,
  ExitRoomResponse,
  AddRoomBody,
  LoadChatsBody,
  ExitRoomBody,
} from "@src/store/types";

// api
import {
  apiAddRoom,
  apiLoadRooms,
  apiLoadChats,
  apiExitRoom,
} from "@src/store/api";

function* addRoom(action: PayloadAction<AddRoomBody>) {
  try {
    const { data }: AxiosResponse<AddRoomResponse> = yield call(
      apiAddRoom,
      action.payload
    );

    yield put(chatActions.addRoomSuccess(data));
  } catch (error: any) {
    console.error("chatSaga addRoom >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      chatActions.addRoomFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchAddRoom() {
  yield takeLatest(chatActions.addRoomRequest, addRoom);
}

function* loadRooms() {
  try {
    const { data }: AxiosResponse<LoadRoomsResponse> = yield call(apiLoadRooms);

    yield put(chatActions.loadRoomsSuccess(data));
  } catch (error: any) {
    console.error("chatSaga loadRooms >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      chatActions.loadRoomsFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchLoadRooms() {
  yield takeLatest(chatActions.loadRoomsRequest, loadRooms);
}

function* loadChats(action: PayloadAction<LoadChatsBody>) {
  try {
    const { data }: AxiosResponse<LoadChatsResponse> = yield call(
      apiLoadChats,
      action.payload
    );

    yield put(chatActions.loadChatsSuccess(data));
  } catch (error: any) {
    console.error("chatSaga loadChats >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      chatActions.loadChatsFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchLoadChats() {
  yield takeLatest(chatActions.loadChatsRequest, loadChats);
}

function* exitRoom(action: PayloadAction<ExitRoomBody>) {
  try {
    const { data }: AxiosResponse<ExitRoomResponse> = yield call(
      apiExitRoom,
      action.payload
    );

    yield put(chatActions.exitRoomSuccess(data));
  } catch (error: any) {
    console.error("chatSaga exitRoom >> ", error);

    const message =
      error?.name === "AxiosError"
        ? error.response.data.data.message
        : "서버측 에러입니다. \n잠시후에 다시 시도해주세요";

    yield put(
      chatActions.exitRoomFailure({ status: { ok: false }, data: { message } })
    );
  }
}
function* watchExitRoom() {
  yield takeLatest(chatActions.exitRoomRequest, exitRoom);
}

export default function* chatSaga() {
  yield all([
    fork(watchAddRoom),
    fork(watchLoadRooms),
    fork(watchLoadChats),
    fork(watchExitRoom),
  ]);
}
