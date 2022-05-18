import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// redux + server-side-rendering
import wrapper from "@src/store/configureStore";
import { END } from "redux-saga";
// import { userInstance } from "@store/api/user";

// actions
import { loadToMeRequest, loadPostsRequest } from "@src/store/actions";
import { PostState } from "@src/store/reducers";

// common-components
// import HeadInfo from "@components/common/HeadInfo";

// components
import PhotoCard from "@src/components/PhotoCard";
import { userInstance } from "@src/store/api/user";
// import { AxiosInstance } from "axios";

// styled-components
const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 12px;
  @media (max-width: 480px) {
    gap: 2px;
  }
  @media (min-width: 480px) and (max-width: 768px) {
    gap: 4px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    gap: 8px;
  }
  @media (min-width: 1024px) and (max-width: 1600px) {
    gap: 10px;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  // const { posts, hasMorePosts, loadPostsLoading } = useSelector(
  //   ({ post }: { post: PostState }) => post
  // );

  // // 2022/05/07 - 무한 스크롤링 이벤트 함수 - by 1-blue
  // const infiniteScrollEvent = useCallback(() => {
  //   if (
  //     window.scrollY + document.documentElement.clientHeight >=
  //       document.documentElement.scrollHeight - 400 &&
  //     hasMorePosts &&
  //     !loadPostsLoading
  //   ) {
  //     if (!posts) {
  //       dispatch(loadPostsRequest({ lastId: 0, limit: 15 }));
  //     } else {
  //       dispatch(
  //         loadPostsRequest({ lastId: posts[posts.length - 1]._id, limit: 15 })
  //       );
  //     }
  //   }
  // }, [dispatch, posts, hasMorePosts, loadPostsLoading]);

  // // 2022/01/15 - 무한 스크롤링 이벤트 등록/해제 - by 1-blue
  // useEffect(() => {
  //   window.addEventListener("scroll", infiniteScrollEvent);

  //   return () => window.removeEventListener("scroll", infiniteScrollEvent);
  // }, [infiniteScrollEvent]);

  return (
    <>
      {/* <HeadInfo
        title="bluegram - home"
        description="메인 페이지"
        image={
          process.env.NEXT_PUBLIC_IMAGE_URL + "/" + posts[0].Images[0].name
        }
      /> */}
      <h1>메인</h1>

      {/* <Wrapper>
        {posts?.map((post) => (
          <PhotoCard key={post._id} post={post} />
        ))}
      </Wrapper> */}
      {/* <section>
        {posts?.map((post) => (
          <div
            key={post._id}
            style={{
              margin: "100px",
            }}
          >
            {post.content}
          </div>
        ))}
      </section> */}
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      /**
       * front-server와 backend-server가 서로 다르기때문에
       * axios의 "withCredentials" 옵션으로 브라우저의 쿠키를 전달할 수 없음
       * 따라서 직접 axios에 쿠키를 넣어주고 서버로 요청 후 다시 axios의 쿠키를 제거해주는 과정을 거침
       * 클라이언트는 여러 대지만 서버는 한대이기 때문에 서버 사용한 쿠키는 반드시 제거해 줘야 함
       */

      let cookie = context.req?.headers?.cookie;
      cookie = cookie ? cookie : "";
      userInstance.defaults.headers.Cookie = cookie;

      // 서버 사이드에서 dispatch할 내용을 적어줌
      store.dispatch(loadToMeRequest());
      // store.dispatch(loadPostsRequest({ lastId: -1, limit: 15 }));

      // 밑에 두 개는 REQUEST이후 SUCCESS가 될 때까지 기다려주게 해주는 코드
      store.dispatch(END);
      await store.sagaTask?.toPromise();

      // 위에서 말한대로 axios의 쿠키 제거
      userInstance.defaults.headers.Cookie = "";

      return {
        props: {},
      };
    }
  );

export default Home;
