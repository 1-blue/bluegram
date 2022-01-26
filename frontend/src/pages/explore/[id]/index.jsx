/**
 * 생성일: 2022/01/15
 * 수정일: 2022/01/17
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지
 * 인피니티 스크롤링 적용
 * 특정 게시글의 세부 정보도 보여주지만, 특정 게시글 외 다른 게시글들도 보여줌
 */

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance, postsInstance } from "@store/api";

// actions
import { loadToMeAction, loadPostsDetailAction } from "@store/actions";

// common-components
import HeadInfo from "@components/common/HeadInfo";
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";

// components
import PostCard from "@components/PostCard";

const Explore = () => {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const { postsOfDetail: posts, hasMorePostsOfDetail, loadDetailPostsLoading } = useSelector(state => state.post);

  // 2022/01/17 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400 &&
      hasMorePostsOfDetail &&
      !loadDetailPostsLoading
    ) {
      dispatch(loadPostsDetailAction({ lastId: posts[posts.length - 1]._id, limit: 8 }));
    }
  }, [posts.length, hasMorePostsOfDetail, loadDetailPostsLoading]);

  // 2022/01/17 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  // 2022/01/26 - 미리보기에 보여줄 게시글의 컨텐츠
  const contents = posts[0].content.length > 40 ? posts[0].content.substring(0, 100) + "ㆍㆍㆍ" : posts[0].content;

  return (
    <>
      <HeadInfo
        title="bluegram - explore"
        description={`${posts[0].User.name}님의 게시글\n( 좋아요: ${posts[0].PostLikers.length}, 댓글: ${posts[0].Comments.length})\n\n${contents}`}
        image={process.env.NEXT_PUBLIC_IMAGE_URL + "/" + posts[0].Images[0].name}
        url={asPath}
      />

      {/* 게시글들 ( 현재 기준은 페이지의 게시글 이후에 업로드된 게시글을 최신순으로 보여줌 ) */}
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* 게시글 추가 로드 */}
      {loadDetailPostsLoading && <Spinner $page />}

      {!hasMorePostsOfDetail && <Text $postEnd>더 이상 불러올 게시글이 존재하지 않습니다...</Text>}
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
  store.dispatch(loadPostsDetailAction({ lastId: +query.id + 1, limit: 8 }));

  store.dispatch(END);
  await store.sagaTask.toPromise();

  // axios의 쿠키 제거
  userInstance.defaults.headers.Cookie = "";
  postsInstance.defaults.headers.Cookie = "";
});

export default Explore;
