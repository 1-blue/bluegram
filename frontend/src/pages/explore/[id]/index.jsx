/**
 * 생성일: 2022/01/15
 * 수정일: -
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지
 * 특정 게시글의 세부 정보도 보여주지만, 특정 게시글 외 다른 게시글들도 보여줌
 */

import React from "react";
import { useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance, postsInstance } from "@store/api";

// actions
import { loadToMeAction, loadPostsDetailAction } from "@store/actions";

// components
import PostCard from "@components/PostCard";

const Explore = () => {
  const { postsOfDetail: posts } = useSelector(state => state.post);

  return (
    <>
      {/* 나머지 추가로 보여줄 게시글들 ( 현재 기준은 페이지의 게시글 이후에 업로드된 게시글을 최신순으로 보여줌 ) */}
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* 게시글 추가 로드 */}
      {/* {loadPostsLoading && <Spinner $page />} */}
    </>
  );
};

// 2022/01/15 - redux + server-side-rendering - by 1-blue
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
  let cookie = req?.headers?.cookie;
  cookie = cookie ? cookie : "";
  userInstance.defaults.headers.Cookie = cookie;
  postsInstance.defaults.headers.Cookie = cookie;

  store.dispatch(loadToMeAction());
  store.dispatch(loadPostsDetailAction({ lastId: +query.id + 1, limit: 15 }));

  store.dispatch(END);
  await store.sagaTask.toPromise();

  // axios의 쿠키 제거
  userInstance.defaults.headers.Cookie = "";
  postsInstance.defaults.headers.Cookie = "";
});

export default Explore;
