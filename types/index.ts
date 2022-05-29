import { SimpleUser } from "@src/type";

export type ServerToClientEvents = {
  onReceive: ({ user, chat }: { user: SimpleUser; chat: string }) => void;
};
export type ClientToServerEvents = {
  onJoinRoom: (roomId: string) => void;
  onSend: (data: { userId: number; roomId: string; chat: string }) => void;
};
export type InterServerEvents = {
  ping: () => void;
};
export type SocketData = {
  name: string;
  age: number;
};
