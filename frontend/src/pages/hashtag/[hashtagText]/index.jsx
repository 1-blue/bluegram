/**
 * 생성일: 2022/01/20
 * 수정일: -
 * 작성자: 1-blue
 *
 * 해시태그 페이지
 */

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance, postsInstance } from "@store/api";

// actions
import { loadToMeAction, loadPostsOfHashtagAction } from "@store/actions";

// common-components
import HeadInfo from "@components/common/HeadInfo";
import Spinner from "@components/common/Spinner";
import Text from "@components/common/Text";

// components
import PostCard from "@components/PostCard";

const HashtagPage = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const {
    postsOfDetail: posts,
    hashtagPostsMetadata: { hasMoreHashtagPosts, postsOfHashtagCount, hashtagText },
    loadHashtagPostsLoading,
  } = useSelector(state => state.post);

  // 2022/01/20 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 400 &&
      hasMoreHashtagPosts &&
      !loadHashtagPostsLoading
    ) {
      dispatch(
        loadPostsOfHashtagAction({
          hashtagText: encodeURI(query.hashtagText),
          lastId: posts[posts.length - 1]._id,
          limit: 8,
        }),
      );
    }
  }, [posts.length, hasMoreHashtagPosts, loadHashtagPostsLoading, query.hashtagText]);

  // 2022/01/20 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  return (
    <>
      <HeadInfo
        title={`bluegram - hashtag - #${hashtagText}`}
        description={`해시태그 ( #${hashtagText} )`}
        image={process.env.NEXT_PUBLIC_IMAGE_URL + "/" + posts[0].Images[0].name}
      />

      {/* 해시태그 검색결과 총 개수 */}
      <Text $hashtagTitle>
        👉 검색된 게시글 총 {postsOfHashtagCount}개 ( 검색어: {hashtagText} ) 👈
      </Text>

      {/* 나머지 추가로 보여줄 게시글들 ( 현재 기준은 페이지의 게시글 이후에 업로드된 게시글을 최신순으로 보여줌 ) */}
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* 게시글 추가 로드 */}
      {loadHashtagPostsLoading && <Spinner $page />}

      {!hasMoreHashtagPosts && <Text $postEnd>더 이상 불러올 게시글이 존재하지 않습니다...</Text>}
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
  store.dispatch(loadPostsOfHashtagAction({ hashtagText: encodeURI(query.hashtagText), lastId: -1, limit: 8 }));

  store.dispatch(END);
  await store.sagaTask.toPromise();

  // axios의 쿠키 제거
  userInstance.defaults.headers.Cookie = "";
  postsInstance.defaults.headers.Cookie = "";
});

export default HashtagPage;
