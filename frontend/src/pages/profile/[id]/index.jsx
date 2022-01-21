/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/21
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
import { userInstance, postsInstance } from "@store/api";

// actions
import { loadToMeAction, loadToUserAction, loadPostsOfUserAction, loadPostsDetailOfUserAction } from "@store/actions";

// components
import ProfileHead from "@components/ProfilePage/ProfileHead";
import ProfileButtons from "@components/ProfilePage/ProfileButtons";
import ProfileNav from "@components/ProfilePage/ProfileNav";
import ProfileContents from "@components/ProfilePage/ProfileContents";

const Profile = () => {
  const {
    query: { id, kinds },
  } = useRouter();

  return (
    <Wrapper>
      <ProfileHead />
      <ProfileButtons />
      <ProfileNav id={id} />
      <ProfileContents id={id} kinds={kinds} />
    </Wrapper>
  );
};

// 2022/01/21 - redux + server-side-rendering - by 1-blue
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  let cookie = context.req?.headers?.cookie;
  cookie = cookie ? cookie : "";
  userInstance.defaults.headers.Cookie = cookie;
  postsInstance.defaults.headers.Cookie = cookie;

  store.dispatch(loadToMeAction());
  store.dispatch(loadToUserAction({ UserId: context.query.id }));

  // 게시글, 상세 게시글, 북마크중에 요청
  switch (context.query.kinds) {
    case "post":
      store.dispatch(loadPostsOfUserAction({ UserId: context.query.id, lastId: -1, limit: 15 }));
      break;
    case "detailPost":
      store.dispatch(loadPostsDetailOfUserAction({ UserId: context.query.id, lastId: -1, limit: 8 }));
      break;
    case "bookmark":
      // 북마크한 게시글 불러오는 액션 추가하기
      // store.dispatch(loadToUserAction({ UserId: context.query.id }));
      break;

    default:
      store.dispatch(loadPostsOfUserAction({ UserId: context.query.id, lastId: -1, limit: 15 }));
      break;
  }

  store.dispatch(END);
  await store.sagaTask.toPromise();

  // axios의 쿠키 제거
  userInstance.defaults.headers.Cookie = "";
  postsInstance.defaults.headers.Cookie = "";
});

export default Profile;
