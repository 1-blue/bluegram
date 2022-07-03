import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// Redux + SSR
import wrapper from "@src/store/configureStore";
import { END } from "redux-saga";
import { axiosInstance } from "@src/store/api";

// common-components
import HeadInfo from "@src/components/common/HeadInfo";

// components
import PostCard from "@src/components/Post/PostCard";

// action
import { postActions, userActions } from "@src/store/reducers";

// type
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
import type { RootState } from "@src/store/configureStore";

const HashtagPage: NextPage = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const {
    detailPosts: posts,
    hashtagData: { hasMoreHashtagPosts, postsOfHashtagCount },
    loadPostsOfHashtagLoading,
  } = useSelector(({ post }: RootState) => post);

  // 2022/05/25 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 400 &&
      hasMoreHashtagPosts &&
      !loadPostsOfHashtagLoading
    ) {
      dispatch(
        postActions.loadPostsOfHashtagRequest({
          hashtag: encodeURI((query.hashtag || "blegram") as string),
          lastId: !posts ? -1 : posts[posts.length - 1]._id,
          limit: 8,
        })
      );
    }
  }, [posts, hasMoreHashtagPosts, loadPostsOfHashtagLoading, query, dispatch]);

  // 2022/01/20 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  return (
    <>
      <HeadInfo
        title={`blegram - #${query.hashtag}`}
        description={`해시태그를 가진 게시글 검색 페이지 ( #${query.hashtag} )`}
        photo={posts?.[0].Photos?.[0].name}
      />

      {/* 해시태그 검색결과 총 개수 */}
      <span
        style={{
          display: "block",
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: "bold",
          margin: "1em 0",
        }}
      >
        👉 검색된 게시글 총 {postsOfHashtagCount}개 ( 검색어: {query.hashtag} )
        👈
      </span>

      {/* 나머지 추가로 보여줄 게시글들 ( 현재 기준은 페이지의 게시글 이후에 업로드된 게시글을 최신순으로 보여줌 ) */}
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {!hasMoreHashtagPosts && (
        <span
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "1.4rem",
            fontWeight: "bold",
            margin: "1em 0",
          }}
        >
          더 이상 불러올 게시글이 존재하지 않습니다...
        </span>
      )}
    </>
  );
};

// 2022/01/15 - redux + server-side-rendering - by 1-blue
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) =>
      async ({ req, query }: GetServerSidePropsContext) => {
        const hashtag = (query.hashtag || "blegram") as string;
        let cookie = req?.headers?.cookie;
        cookie = cookie ? cookie : "";
        axiosInstance.defaults.headers.Cookie = cookie;

        store.dispatch(userActions.loadToMeRequest());
        store.dispatch(
          postActions.loadPostsOfHashtagRequest({
            hashtag: encodeURI(hashtag),
            lastId: -1,
            limit: 8,
          })
        );

        store.dispatch(END);
        await store.sagaTask?.toPromise();

        // axios의 쿠키 제거
        axiosInstance.defaults.headers.Cookie = "";

        return {
          props: {},
        };
      }
  );

export default HashtagPage;
