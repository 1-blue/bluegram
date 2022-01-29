/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/15
 * 작성자: 1-blue
 *
 * 알림 페이지
 * 본인의 알림을 보여줄 페이지 ( 게시글에 좋아요, 댓글, DM 등 )
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

// commom-components
import HeadInfo from "@components/common/HeadInfo";

// styled-components
const Wrapper = styled.section``;

const Notice = () => {
  return (
    <>
      <HeadInfo title="bluegram - notice" description="알림/정보 페이지" />

      <Wrapper>
        <h1>Notice</h1>
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

export default Notice;
