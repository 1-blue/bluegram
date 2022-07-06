import type { ResponseData, ResponseStatus } from ".";
import type {
  IRoomWithUserAndLastChat,
  IChatWithUser,
  IRoomInformation,
  SimpleUser,
} from "@src/type";

// 2022/07/03 - 채팅 추가 타입 - by 1-blue
export type AddChatBody = {
  _id: number;
  RoomId: number;
  UserId: number;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
  User: SimpleUser;
};

// 2022/07/03 - 특정 채팅방의 채팅기록 요청/응답 타입 - by 1-blue
export type LoadChatsBody = {
  RoomId: string;
  lastId: number;
  limit: number;
};
export type LoadChatsResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
    chats: IChatWithUser[];
    roomInformation: IRoomInformation;
  };
};

// 2022/07/03 - 로그인한 유저의 채팅방들 요청/응답 타입 - by 1-blue
export type LoadRoomsResponse = ResponseStatus & {
  data: ResponseData & {
    rooms: IRoomWithUserAndLastChat[];
  };
};

// 2022/07/03 - 로그인한 유저의 채팅방 생성 요청/응답 타입 - by 1-blue
export type AddRoomBody = {
  roomName: string;
  UserId: number;
};
export type AddRoomResponse = ResponseStatus & {
  data: ResponseData & {
    RoomId: number;
  };
};

// 2022/07/03 - 채팅방 영구적으로 나가기 요청/응답 타입 - by 1-blue
export type ExitRoomBody = {
  RoomId: number;
};
export type ExitRoomResponse = ResponseStatus & {
  data: ResponseData;
};
