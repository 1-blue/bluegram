import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  IChatWithUser,
  IRoomInformation,
  IRoomWithUserAndLastChat,
} from "@src/type";
import type {
  AddChatBody,
  AddRoomBody,
  AddRoomResponse,
  ExitRoomBody,
  ExitRoomResponse,
  LoadChatsBody,
  LoadChatsResponse,
  LoadRoomsResponse,
  ResponseFailure,
} from "@src/store/types";

export type ChatStateType = {
  rooms: IRoomWithUserAndLastChat[];
  chats: IChatWithUser[];
  roomInformation?: IRoomInformation | null;
  hasMoreChat: boolean;
  addedRoomId: number | null;

  addRoomLoading: boolean;
  addRoomDone: null | string;
  addRoomError: null | string;

  loadRoomsLoading: boolean;
  loadRoomsDone: null | string;
  loadRoomsError: null | string;

  loadChatsLoading: boolean;
  loadChatsDone: null | string;
  loadChatsError: null | string;

  exitRoomLoading: boolean;
  exitRoomDone: null | string;
  exitRoomError: null | string;
};

const initialState: ChatStateType = {
  // 2022/05/28 - 로그인한 유저의 채팅방들 - by 1-blue
  rooms: [],

  // 2022/05/28 - 특정 채팅방의 채팅들 - by 1-blue
  chats: [],

  // 2022/05/31 - 채팅 추가 로드 가능 여부 - by 1-blue
  hasMoreChat: true,

  // 2022/05/28 - 특정 채팅방의 정보 - by 1-blue
  roomInformation: null,

  // 2022/07/03 - 추가한 채팅방 식별자 - by 1-blue
  addedRoomId: null,

  // 2022/05/28 - 채팅방 생성 관련 변수 - by 1-blue
  addRoomLoading: false,
  addRoomDone: null,
  addRoomError: null,

  // 2022/05/28 - 채팅방들 로드 관련 변수 - by 1-blue
  loadRoomsLoading: false,
  loadRoomsDone: null,
  loadRoomsError: null,

  // 2022/05/28 - 특정 채팅방의 채팅들 로드 관련 변수 - by 1-blue
  loadChatsLoading: false,
  loadChatsDone: null,
  loadChatsError: null,

  // 2022/06/01 - 채팅방 나가기 관련 변수 - by 1-blue
  exitRoomLoading: false,
  exitRoomDone: null,
  exitRoomError: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetMessage(state) {
      state.addRoomLoading = false;
      state.addRoomDone = null;
      state.addRoomError = null;
      state.loadRoomsLoading = false;
      state.loadRoomsDone = null;
      state.loadRoomsError = null;
      state.loadChatsLoading = false;
      state.loadChatsDone = null;
      state.loadChatsError = null;
    },
    // 2022/07/02 - 본인 채팅 추가 - by 1-blue
    addChat(state, action: PayloadAction<AddChatBody>) {
      state.chats = [...state.chats, action.payload];
    },
    // 2022/07/02 - 채팅들 패치 - by 1-blue
    loadChatsRequest(state, action: PayloadAction<LoadChatsBody>) {
      state.loadChatsLoading = true;
      state.loadChatsDone = null;
      state.loadChatsError = null;
    },
    loadChatsSuccess(state, action: PayloadAction<LoadChatsResponse>) {
      state.loadChatsLoading = false;
      state.loadChatsDone = action.payload.data.message;
      state.chats = [...action.payload.data.chats, ...state.chats];
      state.roomInformation = action.payload.data.roomInformation;
      state.hasMoreChat =
        action.payload.data.chats.length === action.payload.data.limit;
    },
    loadChatsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadChatsLoading = false;
      state.loadChatsError = action.payload.data.message;
    },
    // 2022/07/02 - 채팅방들 패치 - by 1-blue
    loadRoomsRequest(state) {
      state.loadRoomsLoading = true;
      state.loadRoomsDone = null;
      state.loadRoomsError = null;
    },
    loadRoomsSuccess(state, action: PayloadAction<LoadRoomsResponse>) {
      state.loadRoomsLoading = false;
      state.loadRoomsDone = action.payload.data.message;
      state.rooms = action.payload.data.rooms;
      state.rooms.sort((a, b) => {
        if (a.Chats.length === 0 || b.Chats.length === 0) return 1;

        return (
          new Date(b.Chats[0].createdAt as unknown as string).getTime() -
          new Date(a.Chats[0].createdAt as unknown as string).getTime()
        );
      });
    },
    // 2022/07/02 - 채팅방 추가 ( DM ) - by 1-blue
    addRoomRequest(state, action: PayloadAction<AddRoomBody>) {
      state.addRoomLoading = true;
      state.addRoomDone = null;
      state.addRoomError = null;
    },
    addRoomSuccess(state, action: PayloadAction<AddRoomResponse>) {
      state.addRoomLoading = false;
      state.addRoomDone = action.payload.data.message;
      state.addedRoomId = action.payload.data.RoomId;
    },
    addRoomFailure(state, action: PayloadAction<ResponseFailure>) {
      state.addRoomLoading = false;
      state.addRoomError = action.payload.data.message;
    },
    loadRoomsFailure(state, action: PayloadAction<ResponseFailure>) {
      state.loadRoomsLoading = false;
      state.loadRoomsError = action.payload.data.message;
    },
    // 2022/07/02 - 채팅방 영구적으로 나가기 - by 1-blue
    exitRoomRequest(state, action: PayloadAction<ExitRoomBody>) {
      state.exitRoomLoading = true;
      state.exitRoomDone = null;
      state.exitRoomError = null;
    },
    exitRoomSuccess(state, action: PayloadAction<ExitRoomResponse>) {
      state.exitRoomLoading = false;
      state.exitRoomDone = action.payload.data.message;
    },
    exitRoomFailure(state, action: PayloadAction<ResponseFailure>) {
      state.exitRoomLoading = false;
      state.exitRoomError = action.payload.data.message;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
