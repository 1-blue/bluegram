/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/23
 * 작성자: 1-blue
 *
 * 로그인 페이지
 * autoComplete 수정
 */

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

// common-components
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import Button from "@components/common/Button";

// hooks
import useInput from "@hooks/useInput";

// action
import { resetMessageAction, localLoginAction } from "@store/actions";
import { useRef } from "react";

// styled-component
const Wrapper = styled.section`
  max-width: 400px;
  margin: auto;
  padding-top: 2em;

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loginLoading, loginDone, loginError } = useSelector(state => state.auth);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const kakaoButtonRef = useRef(null);

  // 2021/12/20 - 로그인 성공 시 메시지와 redirect / 로그인 실패 시 메시지 - by 1-blue
  useEffect(() => {
    if (!(loginDone || loginError)) return;
    alert(loginDone || loginError);

    dispatch(resetMessageAction());

    if (loginDone) router.push("/");
  }, [loginDone, loginError]);

  // 2021/12/20 - 로컬 로그인 요청 - by 1-blue
  const onLocalLogin = useCallback(
    e => {
      e.preventDefault();

      if (!id) return alert("아이디를 입력해주세요");
      if (!password) return alert("비밀번호를 입력해주세요");

      dispatch(localLoginAction({ id, password }));
    },
    [id, password],
  );

  return (
    <Wrapper>
      <Form onSubmit={onLocalLogin} autoComplete="on">
        <h1 className="form-title">bluegram</h1>
        {/* id */}
        <Input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onChangeId}
          autoFocus
          autoComplete="username"
        />

        {/* password */}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={onChangePassword}
          autoComplete="new-password"
        />

        {/* 일반 로그인 버튼 */}
        <Button type="submit" $local loading={loginLoading}>
          로그인
        </Button>

        {/* 페이스북 로그인 버튼 */}
        <Button type="button" $facebook>
          페이스북 로그인
        </Button>
        {/* 네이버 로그인 버튼 */}
        <Button type="button" $naver>
          네이버 로그인
        </Button>
        {/* 카카오 로그인 버튼 */}
        <Button type="button" $kakao onClick={() => kakaoButtonRef.current.click()}>
          <a href={process.env.KAKAO_URL} ref={kakaoButtonRef}>
            카카오 로그인
          </a>
        </Button>

        <div className="form-footer">
          <Link href="/signup">
            <a>가입하기</a>
          </Link>
          <Link href="#">
            <a>아이디 / 비밀번호 찾기</a>
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default LoginPage;
