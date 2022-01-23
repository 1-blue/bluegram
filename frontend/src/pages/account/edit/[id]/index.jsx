import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance } from "@store/api";

// actions
import { loadToMeAction } from "@store/actions";
import { useEffect } from "react";

// styled-components
const Wrapper = styled.section``;

const Account = () => {
  const { me } = useSelector(state => state.user);
  const router = useRouter();

  useEffect(() => {
    if (me._id !== +router.query.id) {
      alert("접근 권한이 없습니다.\n메인 페이지로 이동합니다.");
      return router.push("/");
    }
  }, []);

  if (me._id !== +router.query.id) return <div>X</div>;

  return (
    <Wrapper>
      <h1>Account - {router.query.id}</h1>
    </Wrapper>
  );
};

// 2022/01/22 - redux + server-side-rendering - by 1-blue
// 프로필 수정 페이지는 변경이 자주 일어나지 않아서 getStaticProps로 하려 했지만, 쿠키를 가져올 수 없어서 포기
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  console.log("axt >> ", context);
  let cookie = context.req?.headers?.cookie;
  cookie = cookie ? cookie : "";
  userInstance.defaults.headers.Cookie = cookie;

  store.dispatch(loadToMeAction());

  store.dispatch(END);
  await store.sagaTask.toPromise();

  // axios의 쿠키 제거
  userInstance.defaults.headers.Cookie = "";
});

export default Account;
