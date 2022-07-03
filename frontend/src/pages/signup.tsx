import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

// common-components
import Button from "@src/components/common/Button";

// common-component
import Input from "@src/components/common/Input";
import Textarea from "@src/components/common/Textarea";
import PhotoInput from "@src/components/common/PhotoInput";
import HeadInfo from "@src/components/common/HeadInfo";

// action
import { authActions } from "@src/store/reducers";

// type
import type { NextPage } from "next";
import type { RootState } from "@src/store/configureStore";

// styled-components
const Wrapper = styled.form`
  max-width: 400px;
  margin: auto;
  box-shadow: 0px 0px 10px gray;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 1rem 2rem;

  margin-bottom: 10vh;

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
`;

export type SignUpForm = {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  introduction: string;
  avatar?: string;
};

const SignupPage: NextPage = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector(({ auth }: RootState) => auth);

  // 2022/05/13 - 회원가입 관련 메서드들 - by 1-blue
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>();

  // 2022/05/13 - 회원가입 요청 - by 1-blue
  const onSignUp = useCallback(
    (body: SignUpForm) => dispatch(authActions.signUpRequest({ ...body })),
    [dispatch]
  );

  // 2022/05/15 - 이미지 드래그중인지 판단할 변수 - by 1-blue
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <HeadInfo
        title="blegram - 회원가입"
        description="blegram의 회원가입 페이지"
      />

      <Title>blegram - 회원가입</Title>

      <Wrapper
        autoComplete="on"
        onSubmit={handleSubmit(onSignUp)}
        onDragOver={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
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
        {/* passwordCheck */}
        <Input
          id="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          subText={errors.passwordCheck?.message}
          {...register("passwordCheck", {
            required: "비밀번호를 다시 입력해주세요!",
          })}
        />
        {/* name */}
        <Input
          id="name"
          type="text"
          placeholder="이름을 입력해주세요."
          subText={errors.name?.message}
          {...register("name", { required: "이름을 입력해주세요!" })}
        />
        {/* email */}
        <Input
          id="email"
          type="text"
          placeholder="이메일을 입력해주세요."
          subText={errors.email?.message}
          {...register("email", { required: "이메일을 입력해주세요!" })}
        />
        {/* phone */}
        <Input
          id="phone"
          type="text"
          placeholder="휴대폰 번호를 입력해주세요."
          subText={errors.phone?.message}
          {...register("phone", { required: "휴대폰 번호를 입력해주세요!" })}
        />
        {/* birthday */}
        <Input
          id="birthday"
          type="text"
          placeholder="생년월일을 입력해 주세요. ( 19981106 )"
          subText={errors.birthday?.message}
          {...register("birthday", { required: "생년월일을 입력해주세요!" })}
        />
        {/* 간단 자기 소개 */}
        <Textarea
          id="introduction"
          placeholder="5줄 이내로 간단한 자기소개를 입력해주세요."
          subText={errors.introduction?.message}
          {...register("introduction", {
            maxLength: {
              value: 100,
              message: "100자 이내로 입력해주세요!",
            },
          })}
        />

        {/* Avatar */}
        <PhotoInput
          getValues={getValues}
          setValue={setValue}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />

        {/* 회원가입 버튼 */}
        <Button
          type="submit"
          loading={signUpLoading}
          contents="회원가입"
          primary
        />
      </Wrapper>
    </>
  );
};

export default SignupPage;
