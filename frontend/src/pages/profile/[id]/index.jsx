/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/15
 * 작성자: 1-blue
 *
 * 프로필 페이지
 * 특정 유저의 프로필을 보여줄 페이지
 * ServerSideRedering 구문 추가
 */

import React from "react";
import { useRouter } from "next/router";

// styled-components
import { Wrapper } from "./style";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance } from "@store/api/user";

// actions
import { loadToMeAction } from "@store/actions";

const Profile = () => {
  const {
    query: { id: UserId },
  } = useRouter();

  return (
    <Wrapper>
      <h1>Profile - {UserId}</h1>
    </Wrapper>
  );
};

// 2022/01/15 - redux + server-side-rendering - by 1-blue
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  let cookie = context.req?.headers?.cookie;
  cookie = cookie ? cookie : "";
  userInstance.defaults.headers.Cookie = cookie;

  // 서버 사이드에서 dispatch할 내용을 적어줌
  store.dispatch(loadToMeAction());

  store.dispatch(END);
  await store.sagaTask.toPromise();

  // axios의 쿠키 제거
  userInstance.defaults.headers.Cookie = "";
});

export default Profile;
