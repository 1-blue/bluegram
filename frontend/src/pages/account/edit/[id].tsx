import Link from "next/link";
import { useRouter } from "next/router";
import { END } from "redux-saga";
import styled from "styled-components";
import wrapper from "@src/store/configureStore";

// instance
import { axiosInstance } from "@src/store/api";

// type
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

// action
import { loadMeDetailRequest, loadToMeRequest } from "@src/store/actions";

// component
import AccountEdit from "@src/components/Edit/AccountEdit";
import PasswordEdit from "@src/components/Edit/PasswordEdit";
import SignOut from "@src/components/Edit/SignOut";

const Nav = styled.nav<{ kinds: string }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  & a {
    flex: 1;
    text-align: center;
    padding: 12px;
    background-color: gray;
    color: white;
    opacity: 0.9;
    transition: all 0.4s;

    border-right: 2px solid white;
    &:last-child {
      border-right: 0px;
    }

    &:hover {
      opacity: 1;
    }

    &:nth-child(1) {
      background-color: ${({ kinds, theme }) =>
        kinds === "account" && theme.color.main};
    }
    &:nth-child(2) {
      background-color: ${({ kinds, theme }) =>
        kinds === "password" && theme.color.main};
    }
    &:nth-child(3) {
      background-color: ${({ kinds, theme }) =>
        kinds === "signout" && theme.color.main};
    }
  }
`;

const Edit = () => {
  const router = useRouter();

  return (
    <>
      <Nav kinds={router.query.kinds as string}>
        <Link
          href={{
            href: "/",
            query: {
              kinds: "account",
              id: router.query.id,
            },
          }}
        >
          <a>기본 정보 수정</a>
        </Link>
        <Link
          href={{
            href: "/",
            query: {
              kinds: "password",
              id: router.query.id,
            },
          }}
        >
          <a>비밀번호 수정</a>
        </Link>
        <Link
          href={{
            href: "/",
            query: {
              kinds: "signout",
              id: router.query.id,
            },
          }}
        >
          <a>계정 삭제</a>
        </Link>
      </Nav>

      {router.query.kinds === "account" && <AccountEdit />}
      {router.query.kinds === "password" && <PasswordEdit />}
      {router.query.kinds === "signout" && <SignOut />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      let cookie = context.req?.headers?.cookie;
      cookie = cookie ? cookie : "";
      axiosInstance.defaults.headers.Cookie = cookie;

      // 서버 사이드에서 dispatch할 내용을 적어줌
      store.dispatch(loadToMeRequest());
      store.dispatch(loadMeDetailRequest({}));

      // 밑에 두 개는 REQUEST이후 SUCCESS가 될 때까지 기다려주게 해주는 코드
      store.dispatch(END);
      await store.sagaTask?.toPromise();

      // 위에서 말한대로 axios의 쿠키 제거
      axiosInstance.defaults.headers.Cookie = "";

      return {
        props: {},
      };
    }
  );

export default Edit;
