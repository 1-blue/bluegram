/**
 * 생성일: 2022/01/24
 * 수정일: -
 * 작성자: 1-blue
 *
 * 로그인한 유저 기본 정보 수정 폼
 */

import React, { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// hook
import useValidateInput from "@hooks/useValidateInput";
import useText from "@hooks/useText";

// components
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Text from "@components/common/Text";
import ImageInput from "@components/common/ImageInput";

// action
import { editToMeAllAction } from "@store/actions";

const NomalEdit = () => {
  const dispatch = useDispatch();
  const { me, editToMeAllLoading } = useSelector(state => state.user);
  const { imagePreviews } = useSelector(state => state.image);
  const [name, onChangeName, , nameRef, nameValidate] = useValidateInput(me.name, true);
  const [email, onChangeEmail, , emailRef, emailValidate] = useValidateInput(me.email, true);
  const [phone, onChangePhone, , phoneRef, phoneValidate] = useValidateInput(me.phone, true);
  const [birthday, onChangeBirthday, , birthdayRef, birthdayValidate] = useValidateInput(me.birthday, true);
  const [about, onChangeAbout] = useText(me.about);
  const aboutRef = useRef(null);
  const inputCommonStyle = useMemo(() => ({ marginBottom: "0" }), []);

  // 2022/01/24 - 본인 정보 수정 요청 - by 1-blue
  const onSubmit = useCallback(
    e => {
      e.preventDefault();

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
        editToMeAllAction({
          name,
          email,
          phone,
          birthday,
          about,
          profileImage: imagePreviews[imagePreviews.length - 1],
        }),
      );
    },
    [
      name,
      email,
      phone,
      birthday,
      about,
      imagePreviews,
      nameRef,
      emailRef,
      phoneRef,
      birthdayRef,
      aboutRef,
      nameValidate,
      emailValidate,
      phoneValidate,
      birthdayValidate,
    ],
  );

  return (
    <Wrapper>
      <Form onSubmit={onSubmit} autoComplete="on">
        <h1 className="form-title" style={{ fontSize: "1.4rem" }}>
          기본 정보 수정
        </h1>

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

        {/* 회원 정보 수정 버튼 */}
        <Button type="submit" $signup loading={editToMeAllLoading}>
          수정
        </Button>
      </Form>
    </Wrapper>
  );
};

export default NomalEdit;
