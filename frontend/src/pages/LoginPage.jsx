import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

// components
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import Button from "@components/common/Button";

// hooks
import useInput from "@hooks/useInput";

// action
import { resetMessageAction, localLoginAction } from "@store/actions";

// styled-component
const Wrapper = styled.main`
  max-width: 400px;
  margin: auto;

  /* 폼의 제목, 목적, 이름 */
  & > form > .form-title {
    text-align: center;
    margin-bottom: 1rem;
  }

  & > form > .form-footer {
    width: 60%;
    display: flex;
    justify-content: space-between;

    & a {
      font-size: 0.7rem;
      cursor: pointer;
    }
    & a:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginLoading, loginDone, loginError } = useSelector(state => state.auth);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (!(loginDone || loginError)) return;
    alert(loginDone || loginError);

    dispatch(resetMessageAction());

    if (loginDone) navigate("/");
  }, [loginDone, loginError]);

  // 로컬 로그인
  const onLocalLogin = useCallback(
    e => {
      e.preventDefault();
      dispatch(localLoginAction({ id, password }));
    },
    [id, password],
  );

  return (
    <Wrapper>
      <Form onSubmit={onLocalLogin}>
        <h1 className="form-title">bluegram</h1>
        {/* id */}
        <Input type="text" placeholder="아이디를 입력해주세요" value={id} onChange={onChangeId} />

        {/* password */}
        <Input type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={onChangePassword} />

        {/* 일반 로그인 버튼 */}
        <Button type="submit" $local $loading={loginLoading}>
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
        <Button type="button" $kakao>
          <a href={process.env.KAKAO_URL}>카카오 로그인</a>
        </Button>

        <div className="form-footer">
          <Link to="/signup">가입하기</Link>
          <Link to="#">아이디 / 비밀번호 찾기</Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default LoginPage;
