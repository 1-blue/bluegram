import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux + SSR
import wrapper from "@src/store/configureStore";
import { END } from "redux-saga";
import { axiosInstance } from "@src/store/api";

// actions
import { loadToMeRequest, loadDetailPostsRequest } from "@src/store/actions";

// common-components
// import HeadInfo from "@src/components/common/HeadInfo";
import Spinner from "@src/components/common/Spinner";

// components
import PostCard from "@src/components/Post/PostCard";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PostState } from "@src/store/reducers";

const Explore = () => {
  const dispatch = useDispatch();
  const {
    detailPosts: posts,
    hasMoreDeatailPosts,
    loadDetailPostsLoading,
  } = useSelector(({ post }: { post: PostState }) => post);

  // 2022/05/21 - 인피니티 스크롤링 함수 - by 1-blue
  const infiniteScrollEvent = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 400 &&
      hasMoreDeatailPosts &&
      !loadDetailPostsLoading
    ) {
      if (!posts) {
        dispatch(
          loadDetailPostsRequest({
            lastId: 0,
            limit: 8,
          })
        );
      } else {
        dispatch(
          loadDetailPostsRequest({
            lastId: posts[posts.length - 1]._id,
            limit: 8,
          })
        );
      }
    }
  }, [dispatch, posts, hasMoreDeatailPosts, loadDetailPostsLoading]);

  // 2022/05/21 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollEvent);

    return () => window.removeEventListener("scroll", infiniteScrollEvent);
  }, [infiniteScrollEvent]);

  return (
    <>
      {/* <HeadInfo
        title="bluegram - explore"
        description={`${posts[0].User.name}님의 게시글\n( 좋아요: ${posts[0].PostLikers.length}, 댓글: ${posts[0].Comments.length})\n\n${posts[0].content}`}
        image={
          process.env.NEXT_PUBLIC_IMAGE_URL + "/" + posts[0].Images[0].name
        }
      /> */}

      {/* 게시글들 ( 현재 기준은 페이지의 게시글 이후에 업로드된 게시글을 최신순으로 보여줌 ) */}
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* 게시글 추가 로드 */}
      {loadDetailPostsLoading && <Spinner kinds="page" />}

      {!hasMoreDeatailPosts && <span>더 이상 불러올 게시글이 없습니다.</span>}
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) =>
      async ({ req, query }: GetServerSidePropsContext) => {
        let cookie = req?.headers?.cookie;
        cookie = cookie ? cookie : "";
        axiosInstance.defaults.headers.Cookie = cookie;

        store.dispatch(loadToMeRequest());
        store.dispatch(
          loadDetailPostsRequest({ lastId: +query.postId! + 1, limit: 8 })
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

export default Explore;
