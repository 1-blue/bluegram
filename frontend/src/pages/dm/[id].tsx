import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";

// redux
import { END } from "redux-saga";
import wrapper from "@src/store/configureStore";
import { axiosInstance } from "@src/store/api";
import { loadToMeRequest, loadChatsRequest } from "@src/store/actions";

// type
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@src/../../types";
import type { ChatState, UserState } from "@src/store/reducers";
import type { IChatWithUser } from "@src/type";

// common-component
import Avatar from "@src/components/common/Avatar";

// util
import { dateOrTimeFormat } from "@src/libs/dateFormat";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";

const Chat = styled.li<{ isMine: boolean; length: number }>`
  display: flex;
  margin-bottom: 10px;
  flex-flow: ${({ isMine }) => (isMine ? "row-reverse" : "row")};

  & figure {
    flex-shrink: 0;
    ${({ isMine }) =>
      isMine
        ? css`
            margin-left: 10px;
          `
        : css`
            margin-right: 10px;
          `}
  }

  & p {
    max-width: ${({ length }) => (length > 20 ? "60%" : "100%")};
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.color.main};
    white-space: pre-wrap;
    border-radius: 6px;
    color: white;
  }

  & time {
    color: gray;
    font-size: 0.75rem;
  }
`;
const Form = styled.form`
  display: flex;
  margin: 10px;

  & textarea {
    flex: 1;

    resize: none;
    font-size: 1rem;
    font-weight: bold;
    padding: 12px 16px;
    overflow: hidden;

    border: 2px solid ${({ theme }) => theme.color.main};
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;

    &:focus {
      outline: none;
    }
  }

  & button[type="submit"] {
    background-color: ${({ theme }) => theme.color.main};
    color: white;
    padding: 8px;
    font-weight: bold;

    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const Room = () => {
  const router = useRouter();
  const { me } = useSelector(({ user }: { user: UserState }) => user);
  const { chats: loadChats, roomInformation } = useSelector(
    ({ chat }: { chat: ChatState }) => chat
  );

  // 2022/05/28 - 연결한 소켓 - by 1-blue
  const [socket, setSocket] = useState<null | Socket<
    ServerToClientEvents,
    ClientToServerEvents
  >>(null);
  // 2022/05/28 - 채팅들 - by 1-blue
  const [chats, setChats] = useState<IChatWithUser[]>([]);
  // 2022/05/28 - 현재 입력한 채팅 - by 1-blue
  const [chat, setChat] = useState<string>("");

  // 2022/05/28 - 기존 채팅 채워넣기 - by 1-blue
  useEffect(() => setChats(loadChats), [loadChats, setChats]);

  // 2022/05/28 - 서버와 소켓 연결 - by 1-blue
  useEffect(() => {
    if (socket) return;

    setSocket(
      io(process.env.NEXT_PUBLIC_SERVER_URL!, {
        withCredentials: true,
      })
    );
  }, []);

  // 2022/05/28 - 채팅방 입장 및 채팅 받기 이벤트 등록 - by 1-blue
  useEffect(() => {
    if (!me) return;

    socket?.on("connect", () => {
      console.log("소켓 연결 완료");

      socket.emit("onJoinRoom", router.query.id as string);

      socket.on("onReceive", ({ user, chat }) => {
        setChats((prev) => [
          ...prev,
          {
            _id: Date.now(),
            RoomId: +(router.query.id as string),
            UserId: user?._id,
            contents: chat,
            createdAt: new Date(),
            updatedAt: new Date(),
            User: user,
          },
        ]);
      });
    });
  }, [me, router, socket, setChats]);

  // 2022/05/28 - 채팅 전송 - by 1-blue
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // >>> 버그 수정 필요... 수정법을 못찾겠다...
    if (chat.length === 1) {
      setChat("");
      return console.log(
        "버그 때문에 임시 조치 >> 글자 완성중에 전송요청하면 마지막 글자가 또 전송되는 버그"
      );
    }

    if (!me) return;
    if (chat.trim() === "") return toast.error("내용을 채우고 전송해주세요!");
    if (chat.length > 200)
      return toast.error(
        `200자 이내만 입력가능합니다... ( 현재 ${chat.length}자 )`
      );

    socket?.emit("onSend", {
      userId: me?._id!,
      roomId: router.query.id as string,
      chat,
    });
    setChats((prev) => [
      ...prev,
      {
        _id: Date.now(),
        RoomId: +(router.query.id as string),
        UserId: me?._id,
        contents: chat,
        createdAt: new Date(),
        updatedAt: new Date(),
        User: me,
      },
    ]);
    setChat("");
  };

  // 2022/05/29 - textarea ref - by 1-blue
  const chatRef = useRef<HTMLTextAreaElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  // 2022/05/29 - textarea 자동 높이 조절 - by 1-blue
  const handleResizeHeight = useCallback(() => {
    if (!chatRef.current) return;

    chatRef.current.style.height = "auto";
    chatRef.current.style.height = chatRef.current?.scrollHeight + "px";
  }, [chatRef]);

  // 2022/05/29 - 허용하지 않는 접근 - by 1-blue
  if (!roomInformation?.users.some((user) => user._id === me?._id)) {
    toast.error("접근 권한이 없습니다.");
    router.push("/");
    return null;
  }

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        {roomInformation?.name}
      </h1>

      <section
        style={{
          backgroundColor: "rgba(40, 40, 200, 0.2)",
          padding: "20px 40px",
          height: "74vh",
          overflow: "auto",
          margin: "10px",
          borderRadius: "6px",
        }}
      >
        <ul>
          {chats.map((chat) => (
            <Chat
              key={chat._id}
              isMine={chat.UserId === me?._id}
              length={chat.contents.length}
            >
              <Avatar
                photo={chat.User?.Photos?.[0].name}
                width={40}
                height={40}
              />
              <div>
                <p>{chat.contents}</p>
                <time>
                  {dateOrTimeFormat(chat.createdAt, "YYYY-MM-DD-HH-MM-SS")}
                </time>
              </div>
            </Chat>
          ))}
        </ul>
      </section>
      <Form onSubmit={onSubmit}>
        <textarea
          placeholder="메시지 보내기..."
          onChange={(e) => setChat(e.target.value)}
          value={chat}
          ref={chatRef}
          onInput={handleResizeHeight}
          rows={1}
          onKeyDown={(e) => {
            if (e.code === "Enter" && e.shiftKey) return;
            if (e.code === "Enter") {
              e.preventDefault();
              return buttonRef.current?.click();
            }
          }}
        />
        <button type="submit" ref={buttonRef}>
          전송
        </button>
      </Form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      let cookie = context.req?.headers?.cookie;
      cookie = cookie ? cookie : "";
      axiosInstance.defaults.headers.Cookie = cookie;

      store.dispatch(loadToMeRequest());
      store.dispatch(loadChatsRequest({ RoomId: context.query.id as string }));

      store.dispatch(END);
      await store.sagaTask?.toPromise();

      // 위에서 말한대로 axios의 쿠키 제거
      axiosInstance.defaults.headers.Cookie = "";

      return {
        props: {},
      };
    }
  );

export default Room;
