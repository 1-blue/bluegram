import {
  RESET_MESSAGE,
  ADD_ROOM_FAILURE,
  ADD_ROOM_REQUEST,
  ADD_ROOM_SUCCESS,
  LOAD_ROOMS_REQUEST,
  LOAD_ROOMS_SUCCESS,
  LOAD_ROOMS_FAILURE,
  LOAD_CHATS_REQUEST,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
  ADD_CHAT,
  EXIT_ROOM_REQUEST,
  EXIT_ROOM_SUCCESS,
  EXIT_ROOM_FAILURE,
} from "@src/store/types";
import {
  IChatWithUser,
  IRoomInformation,
  IRoomWithUserAndLastChat,
} from "@src/type";
import type { ChatActionRequest } from "../actions";

type StateType = {
  rooms: IRoomWithUserAndLastChat[];
  chats: IChatWithUser[];
  roomInformation?: IRoomInformation | null;
  hasMoreChat: boolean;

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

const initState: StateType = {
  // 2022/05/28 - 로그인한 유저의 채팅방들 - by 1-blue
  rooms: [],

  // 2022/05/28 - 특정 채팅방의 채팅들 - by 1-blue
  chats: [],

  // 2022/05/31 - 채팅 추가 로드 가능 여부 - by 1-blue
  hasMoreChat: true,

  // 2022/05/28 - 특정 채팅방의 정보 - by 1-blue
  roomInformation: null,

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

function chatReducer(prevState = initState, action: ChatActionRequest) {
  switch (action.type) {
    // 2022/05/13 - 리셋 메시지 - by 1-blue
    case RESET_MESSAGE:
      return {
        ...prevState,
        addRoomLoading: false,
        addRoomDone: null,
        addRoomError: null,

        loadRoomsLoading: false,
        loadRoomsDone: null,
        loadRoomsError: null,

        loadChatsLoading: false,
        loadChatsDone: null,
        loadChatsError: null,
      };

    // 2022/05/28 - 채팅방 생성 - by 1-blue
    case ADD_ROOM_REQUEST:
      return {
        ...prevState,
        addRoomLoading: false,
        addRoomDone: null,
        addRoomError: null,
      };
    case ADD_ROOM_SUCCESS:
      return {
        ...prevState,
        addRoomLoading: false,
        addRoomDone: action.data.RoomId,
      };
    case ADD_ROOM_FAILURE:
      return {
        ...prevState,
        addRoomLoading: false,
        addRoomError: action.data.message,
      };

    // 2022/05/28 - 채팅방 로드 생성 - by 1-blue
    case LOAD_ROOMS_REQUEST:
      return {
        ...prevState,
        loadRoomsLoading: false,
        loadRoomsDone: null,
        loadRoomsError: null,
      };
    case LOAD_ROOMS_SUCCESS:
      // 2022/05/28 - 마지막 채팅을 기준으로 채팅방 정렬 - by 1-blue
      // mysql + sequelize로 가져오는 시간값은 string형...
      const sortedRooms = action.data.rooms.sort((a, b) => {
        if (a.Chats.length === 0 || b.Chats.length === 0) return 1;

        return (
          new Date(b.Chats[0].createdAt as unknown as string).getTime() -
          new Date(a.Chats[0].createdAt as unknown as string).getTime()
        );
      });

      return {
        ...prevState,
        loadRoomsLoading: false,
        loadRoomsDone: action.data.message,
        rooms: sortedRooms,
      };
    case LOAD_ROOMS_FAILURE:
      return {
        ...prevState,
        loadRoomsLoading: false,
        loadRoomsError: action.data.message,
      };

    // 2022/05/28 - 특정 채팅방의 채팅들 로드 생성 - by 1-blue
    case LOAD_CHATS_REQUEST:
      return {
        ...prevState,
        loadChatsLoading: true,
        loadChatsDone: null,
        loadChatsError: null,
      };
    case LOAD_CHATS_SUCCESS:
      return {
        ...prevState,
        loadChatsLoading: false,
        loadChatsDone: action.data.message,
        chats: [...action.data.chats, ...prevState.chats],
        roomInformation: action.data.roomInformation,
        hasMoreChat: action.data.chats.length === action.data.limit,
      };
    case LOAD_CHATS_FAILURE:
      return {
        ...prevState,
        loadChatsLoading: false,
        loadChatsError: action.data.message,
      };

    // 2022/05/31 - 채팅 추가 - by 1-blue
    case ADD_CHAT:
      return {
        ...prevState,
        chats: [...prevState.chats, action.data],
      };

    // 2022/06/01 - 채팅방 나가기 로드 생성 - by 1-blue
    case EXIT_ROOM_REQUEST:
      return {
        ...prevState,
        exitRoomLoading: true,
        exitRoomDone: null,
        exitRoomError: null,
      };
    case EXIT_ROOM_SUCCESS:
      return {
        ...prevState,
        exitRoomLoading: false,
        exitRoomDone: action.data.message,
      };
    case EXIT_ROOM_FAILURE:
      return {
        ...prevState,
        exitRoomLoading: false,
        exitRoomError: action.data.message,
      };

    default:
      return prevState;
  }
}

export default chatReducer;
