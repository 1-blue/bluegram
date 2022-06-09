import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

// common-components
import Button from "@src/components/common/Button";
import Input from "@src/components/common/Input";
import HeadInfo from "@src/components/common/HeadInfo";

// type
import type { AuthState } from "@src/store/reducers";

// action
import { localLoginRequest } from "@src/store/actions";

// styled-component
const Wrapper = styled.form`
  max-width: 400px;
  margin: auto;
  box-shadow: 0px 0px 10px gray;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 1rem 2rem;

  & > .form-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    & > a {
      &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 2px;
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 10vh 0 1rem;
`;

export type LoginForm = {
  id: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector(({ auth }: { auth: AuthState }) => auth);

  // 2022/05/13 - 로그인 요청 관련 메서드들 - by 1-blue
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // 2022/05/13 - 로그인 요청 - by 1-blue
  const onLocalLogIn = useCallback(
    ({ id, password }: LoginForm) =>
      dispatch(localLoginRequest({ id, password })),
    [dispatch]
  );

  return (
    <>
      <HeadInfo
        title="blegram - 로그인"
        description="blegram의 로그인 페이지"
      />

      <Title>blegram - 로그인</Title>

      <Wrapper onSubmit={handleSubmit(onLocalLogIn)} autoComplete="on">
        {/* id */}
        <Input
          id="id"
          type="text"
          placeholder="아이디를 입력해주세요."
          subText={errors.id?.message}
          {...register("id", { required: "아이디를 입력해주세요!" })}
        />
        {/* password */}
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          subText={errors.password?.message}
          {...register("password", { required: "비밀번호를 입력해주세요!" })}
        />

        {/* 일반 로그인 버튼 */}
        <Button
          type="submit"
          loading={loginLoading}
          contents="로그인"
          primary
        />

        <div className="form-footer">
          <Link href="/signup">
            <a>가입하기</a>
          </Link>
          <Link href="#">
            <a>아이디 / 비밀번호 찾기</a>
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

export default LoginPage;
