import { axiosInstance } from ".";

// type
import type {
  AddRoomBody,
  AddRoomResponse,
  ExitRoomBody,
  LoadChatsBody,
  LoadChatsResponse,
  LoadRoomsResponse,
} from "@src/store/types";

// 2022/05/28 - 로그인한 유저의 채팅방들 로드 요청 - by 1-blue
export const apiLoadRooms = () => axiosInstance.get<LoadRoomsResponse>(`/room`);

// 2022/05/28 - 로그인한 유저의 채팅방 생성 요청 - by 1-blue
export const apiAddRoom = (body: AddRoomBody) =>
  axiosInstance.post<AddRoomResponse>(`/room`, body);

// 2022/05/28 - 특정 채팅방의 채팅들 요청 - by 1-blue
export const apiLoadChats = ({ RoomId, lastId, limit }: LoadChatsBody) =>
  axiosInstance.get<LoadChatsResponse>(
    `/chats/${RoomId}?lastId=${lastId}&limit=${limit}`
  );

// 2022/06/01 - 채팅방 나가기 요청 - by 1-blue
export const apiExitRoom = ({ RoomId }: ExitRoomBody) =>
  axiosInstance.delete<LoadChatsResponse>(`/room?RoomId=${RoomId}`);
