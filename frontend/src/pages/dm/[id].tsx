import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";

// redux
import { END } from "redux-saga";
import wrapper from "@src/store/configureStore";
import { axiosInstance } from "@src/store/api";
import { loadToMeRequest, loadChatsRequest } from "@src/store/actions";
import { addChatRequest, exitRoomRequest } from "@src/store/actions/chatAction";

// type
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@src/../../types";
import type { ChatState, UserState } from "@src/store/reducers";

// common-component
import Avatar from "@src/components/common/Avatar";
import HeadInfo from "@src/components/common/HeadInfo";

// util
import { dateOrTimeFormat } from "@src/libs/dateFormat";

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
const AbsoluteButton = styled.button`
  position: absolute;
  top: 0;
  background-color: ${({ theme }) => theme.color.blue};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
`;

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector(({ user }: { user: UserState }) => user);
  const {
    chats,
    roomInformation,
    hasMoreChat,
    loadChatsLoading,
    exitRoomDone,
  } = useSelector(({ chat }: { chat: ChatState }) => chat);

  // 2022/05/28 - 연결한 소켓 - by 1-blue
  const [socket, setSocket] = useState<null | Socket<
    ServerToClientEvents,
    ClientToServerEvents
  >>(null);
  // 2022/05/28 - 현재 입력한 채팅 - by 1-blue
  const [chat, setChat] = useState<string>("");

  // 2022/05/28 - 서버와 소켓 연결 - by 1-blue
  useEffect(() => {
    setSocket(
      (prev) =>
        prev ||
        io(process.env.NEXT_PUBLIC_SERVER_URL!, {
          withCredentials: true,
          transports: ["websocket"],
        })
    );
  }, []);

  // 2022/05/28 - 채팅방 입장 및 채팅 받기 이벤트 등록 - by 1-blue
  useEffect(() => {
    if (!me) return;

    socket?.on("connect", () => {
      socket.emit("onJoinRoom", router.query.id as string);

      socket.on("onReceive", ({ user, chat }) => {
        dispatch(
          addChatRequest({
            _id: Date.now(),
            RoomId: +(router.query.id as string),
            UserId: user?._id,
            contents: chat,
            createdAt: new Date(),
            updatedAt: new Date(),
            User: user,
          })
        );
      });
    });
  }, [me, router, socket, dispatch]);

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
    dispatch(
      addChatRequest({
        _id: Date.now(),
        RoomId: +(router.query.id as string),
        UserId: me?._id,
        contents: chat,
        createdAt: new Date(),
        updatedAt: new Date(),
        User: me,
      })
    );
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

  //
  const chatWrapperRef = useRef<HTMLSelectElement | null>(null);
  useEffect(() => {
    if (!chatWrapperRef.current) return;

    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  }, [chatWrapperRef]);

  // 2022/05/07 - 무한 스크롤링 이벤트 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (!chatWrapperRef.current) return;

    if (
      chatWrapperRef.current.scrollTop <= 400 &&
      hasMoreChat &&
      !loadChatsLoading
    ) {
      if (chats.length === 0) {
        dispatch(
          loadChatsRequest({
            RoomId: router.query.id as string,
            lastId: -1,
            limit: 20,
          })
        );
      } else {
        dispatch(
          loadChatsRequest({
            RoomId: router.query.id as string,
            lastId: chats[0]._id,
            limit: 20,
          })
        );
      }
    }
  }, [router, dispatch, chats, hasMoreChat, loadChatsLoading, chatWrapperRef]);

  // 2022/01/15 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    chatWrapperRef.current?.addEventListener("scroll", infiniteScrollEvent);

    return () =>
      chatWrapperRef.current?.removeEventListener(
        "scroll",
        infiniteScrollEvent
      );
  }, [infiniteScrollEvent, chatWrapperRef]);

  // 2022/06/01 - 채팅방 나가기 - by 1-blue
  const onExitRoom = useCallback(() => {
    if (!confirm("채팅방을 나가면 되돌릴 수 없습니다.\n정말 실행하시겠습니까?"))
      return;

    dispatch(exitRoomRequest({ RoomId: roomInformation?._id! }));
  }, [dispatch, roomInformation]);
  // 2022/06/01 - 채팅방 나가기 성공 시 실행 - by 1-blue
  useEffect(() => {
    if (!exitRoomDone) return;

    toast.success(exitRoomDone);
    router.back();
  }, [exitRoomDone, router]);

  return (
    <>
      <HeadInfo title="blegram - 채팅" description="blegram의 채팅 페이지" />

      <section style={{ position: "relative" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "bold",
            margin: "20px 0",
          }}
        >
          {roomInformation?.name}
        </h1>

        <AbsoluteButton
          type="button"
          style={{ left: 10 }}
          onClick={() => router.back()}
        >
          뒤로 가기
        </AbsoluteButton>
        <AbsoluteButton
          type="button"
          style={{ right: 10 }}
          onClick={onExitRoom}
        >
          채팅방 나가기
        </AbsoluteButton>
      </section>

      <section
        ref={chatWrapperRef}
        style={{
          backgroundColor: "rgba(40, 40, 200, 0.2)",
          padding: "20px 40px",
          height: "74vh",
          overflow: "auto",
          margin: "10px",
          borderRadius: "6px",
        }}
      >
        {!hasMoreChat && (
          <h3 className="info" style={{ marginTop: "1rem" }}>
            더 이상 불러올 채팅이 없습니다.
          </h3>
        )}
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
      store.dispatch(
        loadChatsRequest({
          RoomId: context.query.id as string,
          lastId: -1,
          limit: 20,
        })
      );

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
