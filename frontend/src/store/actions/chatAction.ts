import {
  ADD_ROOM_REQUEST,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_FAILURE,
  AddRoomResponse,
  AddRoomBody,
  FailureResponse,
  LoadRoomsBody,
  LoadRoomsResponse,
  LOAD_ROOMS_REQUEST,
  LOAD_ROOMS_SUCCESS,
  LOAD_ROOMS_FAILURE,
  LoadChatsBody,
  LoadChatsResponse,
  LOAD_CHATS_REQUEST,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
  AddChatBody,
  ADD_CHAT,
  ExitRoomBody,
  ExitRoomResponse,
  EXIT_ROOM_REQUEST,
  EXIT_ROOM_SUCCESS,
  EXIT_ROOM_FAILURE,
} from "@src/store/types";
import { resetMessage } from ".";

// 2022/05/28 - 로그인한 유저의 채팅방 생성 액션 크리에이터 - by 1-blue
export const addRoomRequest = (data: AddRoomBody) => ({
  type: ADD_ROOM_REQUEST,
  data,
});
export const addRoomSuccess = (data: AddRoomResponse) => ({
  type: ADD_ROOM_SUCCESS,
  data,
});
export const addRoomFailure = (data: FailureResponse) => ({
  type: ADD_ROOM_FAILURE,
  data,
});

// 2022/05/28 - 로그인한 유저의 채팅방들 로드 액션 크리에이터 - by 1-blue
export const loadRoomsRequest = (data: LoadRoomsBody) => ({
  type: LOAD_ROOMS_REQUEST,
  data,
});
export const loadRoomsSuccess = (data: LoadRoomsResponse) => ({
  type: LOAD_ROOMS_SUCCESS,
  data,
});
export const loadRoomsFailure = (data: FailureResponse) => ({
  type: LOAD_ROOMS_FAILURE,
  data,
});

// 2022/05/28 - 로그인한 유저의 채팅방들 로드 액션 크리에이터 - by 1-blue
export const loadChatsRequest = (data: LoadChatsBody) => ({
  type: LOAD_CHATS_REQUEST,
  data,
});
export const loadChatsSuccess = (data: LoadChatsResponse) => ({
  type: LOAD_CHATS_SUCCESS,
  data,
});
export const loadChatsFailure = (data: FailureResponse) => ({
  type: LOAD_CHATS_FAILURE,
  data,
});

// 2022/05/31 - 채팅 추가하기 - by 1-blue
export const addChatRequest = (data: AddChatBody) => ({
  type: ADD_CHAT,
  data,
});

// 2022/06/01 - 채팅방 나가기 액션 크리에이터 - by 1-blue
export const exitRoomRequest = (data: ExitRoomBody) => ({
  type: EXIT_ROOM_REQUEST,
  data,
});
export const exitRoomSuccess = (data: ExitRoomResponse) => ({
  type: EXIT_ROOM_SUCCESS,
  data,
});
export const exitRoomFailure = (data: FailureResponse) => ({
  type: EXIT_ROOM_FAILURE,
  data,
});

export type ChatActionRequest =
  | ReturnType<typeof resetMessage>
  | ReturnType<typeof addRoomRequest>
  | ReturnType<typeof addRoomSuccess>
  | ReturnType<typeof addRoomFailure>
  | ReturnType<typeof loadRoomsRequest>
  | ReturnType<typeof loadRoomsSuccess>
  | ReturnType<typeof loadRoomsFailure>
  | ReturnType<typeof loadChatsRequest>
  | ReturnType<typeof loadChatsSuccess>
  | ReturnType<typeof loadChatsFailure>
  | ReturnType<typeof addChatRequest>
  | ReturnType<typeof exitRoomRequest>
  | ReturnType<typeof exitRoomSuccess>
  | ReturnType<typeof exitRoomFailure>;
