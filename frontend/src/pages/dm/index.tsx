import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";

// redux
import { END } from "redux-saga";
import wrapper from "@src/store/configureStore";
import { axiosInstance } from "@src/store/api";
import { loadRoomsRequest, loadToMeRequest } from "@src/store/actions";

import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { ChatState } from "@src/store/reducers";
import { dateOrTimeFormat } from "@src/libs/dateFormat";
import Avatar from "@src/components/common/Avatar";

const Wrapper = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 20px;

  & li:first-child {
    border-top: gray 1px solid;
  }
  & li {
    width: 100%;
    border-bottom: gray 1px solid;
    text-align: center;
    padding: 10px;

    & a {
      display: flex;

      & .contents {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;

        & .room-name {
          margin-bottom: 6px;
        }

        & .last-chat {
          font-size: 0.8rem;
          color: gray;
        }
      }

      & .empty-space {
        flex: 1;
      }

      & time {
        font-size: 0.7rem;
        color: gray;
      }
    }
  }
`;

const DM = () => {
  const { rooms } = useSelector(({ chat }: { chat: ChatState }) => chat);

  return (
    <>
      <Wrapper>
        {rooms.map((room) => (
          <li key={room._id}>
            <Link href={`/dm/${room._id}`}>
              <a>
                <Avatar
                  photo={room.RoomUser[0].Photos?.[0].name}
                  width={40}
                  height={40}
                  style={{ marginRight: "14px" }}
                />
                <div className="contents">
                  <h3 className="room-name">
                    {room.name} - {room.RoomUser[0].name}
                  </h3>
                  <span className="last-chat">{room.Chats[0].contents}</span>
                </div>
                <div className="empty-space" />
                <time>
                  {dateOrTimeFormat(
                    room.Chats[0].createdAt,
                    "YYYY-MM-DD-HH-MM-SS"
                  )}
                </time>
              </a>
            </Link>
          </li>
        ))}
      </Wrapper>
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
      store.dispatch(loadRoomsRequest({}));

      store.dispatch(END);
      await store.sagaTask?.toPromise();

      // 위에서 말한대로 axios의 쿠키 제거
      axiosInstance.defaults.headers.Cookie = "";

      return {
        props: {},
      };
    }
  );

export default DM;
