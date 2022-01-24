/**
 * 생성일: 2022/01/24
 * 수정일: -
 * 작성자: 1-blue
 *
 * 본인 정보 수정 페이지
 */

import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

// Redux + SSR
import wrapper from "@store/configureStore";
import { END } from "redux-saga";
import { userInstance } from "@store/api";

// actions
import { loadToMeDetailAction } from "@store/actions";

// common-components
import HeadInfo from "@components/common/HeadInfo";

// components
import NomalEdit from "@components/AccountEditPage/NomalEdit";
import PasswordEdit from "@components/AccountEditPage/PasswordEdit";
import SignOut from "@components/AccountEditPage/SignOut";

// styled-components
const Wrapper = styled.article`
  max-width: 400px;
  margin: auto;

  /* 본인 정보 수정 네비게이션 */
  & .account-edit-nav {
    display: flex;
    margin-bottom: 2em;
    justify-content: space-between;
  }

  /* 본인 정보 수정 네비게이션 버튼 */
  & .account-edit-nav-link {
    flex: 1;
    text-align: center;
  }
`;

const Account = () => {
  const router = useRouter();
  const { me } = useSelector(state => state.user);

  // 2022/01/24 -  - by 1-blue
  const contents = useCallback(kinds => {
    switch (kinds) {
      case "password":
        return <PasswordEdit />;

      case "signout":
        return <SignOut />;

      default:
        return <NomalEdit />;
    }
  }, []);

  // 2022/01/24 - 본인 프로필 수정인지 확인 - by 1-blue
  useEffect(() => {
    if (me._id !== +router.query.id) {
      alert("접근 권한이 없습니다.\n메인 페이지로 이동합니다.");
      return router.push("/");
    }
  }, []);

  if (me._id !== +router.query.id) return <div>접근 권한이 없습니다.</div>;

  return (
    <>
      <HeadInfo
        title="bluegram - account - edit"
        description="bluegram의 본인 정보 수정 페이지"
        image={`${me.Images[0].name}`}
      />

      <Wrapper>
        <section className="account-edit-nav">
          <Link href={`/account/edit/${router.query.id}?kinds=nomal`}>
            <a className="account-edit-nav-link">기본 정보 수정</a>
          </Link>
          <Link href={`/account/edit/${router.query.id}?kinds=password`}>
            <a className="account-edit-nav-link">비밀번호 수정</a>
          </Link>
          <Link href={`/account/edit/${router.query.id}?kinds=signout`}>
            <a className="account-edit-nav-link">회원 탈퇴</a>
          </Link>
        </section>

        {contents(router.query.kinds)}
      </Wrapper>
    </>
  );
};

// 2022/01/22 - redux + server-side-rendering - by 1-blue
// 프로필 수정 페이지는 변경이 자주 일어나지 않아서 getStaticProps로 하려 했지만, 쿠키를 가져올 수 없어서 포기
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  let cookie = context.req?.headers?.cookie;
  cookie = cookie ? cookie : "";
  userInstance.defaults.headers.Cookie = cookie;

  store.dispatch(loadToMeDetailAction());

  store.dispatch(END);
  await store.sagaTask.toPromise();

  // axios의 쿠키 제거
  userInstance.defaults.headers.Cookie = "";
});

export default Account;
