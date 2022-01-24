/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/23
 * 작성자: 1-blue
 *
 * 회원가입 페이지
 * 유효성 검사, 포커스, 경고 텍스트 추가
 * 간단한 자기 소개 입력란 추가
 * autoComplete 수정 및 preview 초기화 추가
 */

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";

// common-components
import HeadInfo from "@components/common/HeadInfo";
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import ImageInput from "@components/common/ImageInput";
import Text from "@components/common/Text";

// hook
import useValidateInput from "@hooks/useValidateInput";
import useText from "@hooks/useText";

// action
import { resetMessageAction, signupAction, resetImagePreview } from "@store/actions";

// styled-components
const Wrapper = styled.section`
  max-width: 400px;
  margin: auto;
  padding-top: 2em;

  /* 간단 자기 소개 */
  .about {
    width: 60%;
    padding: 0.5em;
    margin-bottom: 0.8em;
    border: 1px solid purple;
    font-size: 0.8rem;
    font-weight: 500;
    resize: none;
    font-family: inherit;

    &::placeholder {
      font-size: 0.6rem;
    }
  }

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;

const SignupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signupDone, signupError, signupLoading } = useSelector(state => state.user);
  const { imagePreviews } = useSelector(state => state.image);
  const [id, onChangeId, , idRef, idValidate] = useValidateInput("");
  const [password, onChangePassword, , passwordRef, passwordValidate] = useValidateInput("");
  const [passwordCheck, onChangePasswordCheck, , passwordCheckRef, passwordCheckValidate] = useValidateInput("");
  const [name, onChangeName, , nameRef, nameValidate] = useValidateInput("");
  const [email, onChangeEmail, , emailRef, emailValidate] = useValidateInput("");
  const [phone, onChangePhone, , phoneRef, phoneValidate] = useValidateInput("");
  const [birthday, onChangeBirthday, , birthdayRef, birthdayValidate] = useValidateInput("");
  const [about, onChangeAbout] = useText("");
  const aboutRef = useRef(null);
  const inputCommonStyle = useMemo(() => ({ marginBottom: "0" }), []);

  // 2021/12/20 - 회원가입 성공 시 홈페이지로 이동 및 성공 or 실패 메시지 alert - by 1-blue
  useEffect(() => {
    if (!(signupDone || signupError)) return;
    alert(signupDone || signupError);

    dispatch(resetMessageAction());
    dispatch(resetImagePreview());

    if (signupDone) router.push("/login");
  }, [signupDone, signupError]);

  // 2022/01/19 - 회원가입 요청 - by 1-blue
  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      // 유효성 검사
      if (!idValidate) {
        alert("아이디를 조건에 맞게 입력해주세요!");
        idRef.current.scrollIntoView();
        return idRef.current.select();
      }
      if (!passwordValidate) {
        alert("비밀번호를 조건에 맞게 입력해주세요!");
        passwordRef.current.scrollIntoView();
        return passwordRef.current.select();
      }
      if (!passwordCheckValidate || !(password === passwordCheck)) {
        alert("비밀번호확인을 조건에 맞게 입력해주세요!");
        passwordCheckRef.current.select();
        return passwordCheckRef.current.select();
      }
      if (!nameValidate) {
        alert("이름을 조건에 맞게 입력해주세요!");
        nameRef.current.scrollIntoView();
        return nameRef.current.select();
      }
      if (!emailValidate) {
        alert("이메일을 조건에 맞게 입력해주세요!");
        emailRef.current.scrollIntoView();
        return emailRef.current.select();
      }
      if (!phoneValidate) {
        alert("휴대폰번호를 조건에 맞게 입력해주세요!");
        phoneRef.current.scrollIntoView();
        return phoneRef.current.select();
      }
      if (!birthdayValidate) {
        alert("생일을 조건에 맞게 입력해주세요!");
        birthdayRef.current.scrollIntoView();
        return birthdayRef.current.select();
      }
      if (about.trim().length >= 100) {
        alert("자기 소개는 100자 이내로 입력해주세요!");
        aboutRef.current.scrollIntoView();
        return aboutRef.current.select();
      }

      dispatch(
        signupAction({
          id,
          password,
          name,
          email,
          phone,
          birthday,
          about,
          imageName: imagePreviews[imagePreviews.length - 1],
        }),
      );
    },
    [
      id,
      password,
      passwordCheck,
      name,
      email,
      phone,
      birthday,
      about,
      imagePreviews,
      idRef,
      passwordRef,
      passwordCheckRef,
      nameRef,
      emailRef,
      phoneRef,
      birthdayRef,
      aboutRef,
      idValidate,
      passwordValidate,
      passwordCheckValidate,
      nameValidate,
      emailValidate,
      phoneValidate,
      birthdayValidate,
    ],
  );

  return (
    <>
      <HeadInfo title="bluegram - signup" description="bluegram 회원가입 페이지" />

      <Wrapper>
        <Form onSubmit={onSubmit} autoComplete="on">
          <h1 className="form-title">bluegram</h1>
          {/* id */}
          <label htmlFor="id" hidden>
            아이디 입력
          </label>
          <Input
            id="id"
            name="id"
            type="text"
            placeholder="아이디를 입력해 주세요"
            value={id}
            onChange={onChangeId("id")}
            autoFocus
            ref={idRef}
            style={inputCommonStyle}
            autoComplete="username"
          />
          <Text $success={idValidate} $error={!idValidate}>
            숫자와 영어가 최소 한 글자 이상 포함되고, 최소 6자리여야 합니다.
          </Text>

          {/* password */}
          <label htmlFor="password" hidden>
            비밀번호 입력
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={onChangePassword("password")}
            ref={passwordRef}
            style={inputCommonStyle}
            autoComplete="new-password"
          />
          <Text $success={passwordValidate} $error={!passwordValidate}>
            숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리여야 합니다.
          </Text>

          {/* passwordCheck */}
          <label htmlFor="passwordCheck" hidden>
            비밀번호 확인 입력
          </label>
          <Input
            id="passwordCheck"
            name="passwordCheck"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요"
            value={passwordCheck}
            onChange={onChangePasswordCheck("password")}
            ref={passwordCheckRef}
            style={inputCommonStyle}
            autoComplete="new-password"
          />
          <Text $success={password === passwordCheck} $error={!(password === passwordCheck)}>
            비밀번호와 비밀번호 확인이 일치해야 합니다.
          </Text>

          {/* name */}
          <label htmlFor="name" hidden>
            이름 입력
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="성명을 입력해 주세요"
            value={name}
            onChange={onChangeName("name")}
            ref={nameRef}
            style={inputCommonStyle}
            autoComplete="nickname"
          />
          <Text $success={nameValidate} $error={!nameValidate}>
            최소 1자 최대 20자 이내여야 합니다.
          </Text>

          {/* email */}
          <label htmlFor="email" hidden>
            이메일 입력
          </label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="이메일을 입력해 주세요 ( 1-blue98@naver.com )"
            value={email}
            onChange={onChangeEmail("email")}
            ref={emailRef}
            style={inputCommonStyle}
            autoComplete="email"
          />
          <Text $success={emailValidate} $error={!emailValidate}>
            이메일 형식에 맞게 입력해 주세요
          </Text>

          {/* phone */}
          <label htmlFor="phone" hidden>
            휴대폰 번호 입력
          </label>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder="휴대폰번호를 숫자만 입력해 주세요"
            maxLength={11}
            value={phone}
            onChange={onChangePhone("phone")}
            ref={phoneRef}
            style={inputCommonStyle}
            autoComplete="tel"
          />
          <Text $success={phoneValidate} $error={!phoneValidate}>
            숫자만 11자리 입력해 주세요
          </Text>

          {/* birthday */}
          <label htmlFor="birthday" hidden>
            생일 입력
          </label>
          <Input
            id="birthday"
            name="birthday"
            type="text"
            placeholder="생년월일을 입력해 주세요 ( 19981106 )"
            maxLength={8}
            value={birthday}
            onChange={onChangeBirthday("birthday")}
            ref={birthdayRef}
            style={inputCommonStyle}
            autoComplete="bday"
          />
          <Text $success={birthdayValidate} $error={!birthdayValidate}>
            숫자만 8자리 입력해 주세요
          </Text>

          {/* 간단 자기 소개 */}
          <textarea
            name="about"
            id="aout"
            rows="5"
            value={about}
            onChange={onChangeAbout}
            placeholder="5줄 이내로 간단한 자기소개를 입력해주세요"
            className="about"
            autoComplete="on"
            ref={aboutRef}
          />
          <Text $success={about.trim().length <= 100} $error={about.trim().length > 100}>
            100자 이내로 입력해주세요!
          </Text>

          {/* profileImage */}
          <ImageInput />

          {/* 회원가입 버튼 */}
          <Button type="submit" $signup loading={signupLoading}>
            회원가입
          </Button>
        </Form>
      </Wrapper>
    </>
  );
};

export default SignupPage;
