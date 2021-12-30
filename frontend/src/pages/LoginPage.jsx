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

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginLoading, loginDone, loginError } = useSelector(state => state.auth);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  // 2021/12/20 - 로그인 성공 시 메시지와 redirect / 로그인 실패 시 메시지 - by 1-blue
  useEffect(() => {
    if (!(loginDone || loginError)) return;
    alert(loginDone || loginError);

    dispatch(resetMessageAction());

    if (loginDone) navigate("/explore");
  }, [loginDone, loginError]);

  // 2021/12/20 - 로컬 로그인 요청 - by 1-blue
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
          <a href={process.env.NODE_ENV === "production" ? process.env.PROD_KAKAO_URL : process.env.DEV_KAKAO_URL}>
            카카오 로그인
          </a>
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
