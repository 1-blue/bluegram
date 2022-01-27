/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/15
 * 작성자: 1-blue
 *
 * DM 페이지
 * socket.io를 이용해서 DM을 구현할 예정
 * ServerSideRedering 구문 추가
 */

import React from "react";
import styled from "styled-components";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance } from "@store/api/user";

// actions
import { loadToMeAction } from "@store/actions";

// common-components
import HeadInfo from "@components/common/HeadInfo";

// styled-components
const Wrapper = styled.section``;

const DM = () => {
  return (
    <>
      <HeadInfo title="bluegram - DM" description="다이렉트 메시지 페이지" />

      <Wrapper>
        <h1>DM</h1>
        <span>추후에 개발 진행 예정</span>
      </Wrapper>
    </>
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

export default DM;
