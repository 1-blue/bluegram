import { SimpleUser } from "@src/type";

export type ServerToClientEvents = {
  onReceive: ({ user, chat }: { user: SimpleUser; chat: string }) => void;
};
export type ClientToServerEvents = {
  onJoinRoom: (roomId: string) => void;
  onSend: (data: { user: SimpleUser; roomId: string; chat: string }) => void;
};
export type InterServerEvents = {};
export type SocketData = {};
