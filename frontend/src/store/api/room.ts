import { axiosInstance } from ".";
// type
import type {
  AddRoomBody,
  AddRoomResponse,
  LoadChatsBody,
  LoadChatsResponse,
  LoadRoomsResponse,
} from "../types";

// 2022/05/28 - 로그인한 유저의 채팅방들 로드 요청 - by 1-blue
export const apiLoadRooms = () => axiosInstance.get<LoadRoomsResponse>(`/room`);

// 2022/05/28 - 로그인한 유저의 채팅방 생성 요청 - by 1-blue
export const apiAddRoom = (body: AddRoomBody) =>
  axiosInstance.post<AddRoomResponse>(`/room`, body);

// 2022/05/28 - 특정 채팅방의 채팅들 요청 - by 1-blue
export const apiLoadChats = ({ RoomId }: LoadChatsBody) =>
  axiosInstance.get<LoadChatsResponse>(`/chats/${RoomId}`);
