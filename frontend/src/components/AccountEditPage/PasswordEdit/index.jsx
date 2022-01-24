/**
 * 생성일: 2022/01/24
 * -
 * 작성자: 1-blue
 *
 * 로그인한 유저 비밀번호 변경 폼
 */

import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// components
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Text from "@components/common/Text";

// hook
import useValidateInput from "@hooks/useValidateInput";

// action
import { editToMePasswordAction } from "@store/actions";

const PasswordEdit = () => {
  const dispatch = useDispatch();
  const { editToMePasswordLoading } = useSelector(state => state.user);
  const [currentPassword, onChangeCurrentPassword, , currentPasswordRef, currentPasswordValidate] =
    useValidateInput("");
  const [password, onChangePassword, , passwordRef, passwordValidate] = useValidateInput("");
  const [passwordCheck, onChangePasswordCheck, , passwordCheckRef, passwordCheckValidate] = useValidateInput("");
  const inputCommonStyle = useMemo(() => ({ marginBottom: "0" }), []);

  // 2022/01/24 - 비밀번호 변경 요청 - by 1-blue
  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      // 유효성 검사
      if (!currentPasswordValidate) {
        alert("현재 비밀번호를 조건에 맞게 입력해주세요!");
        currentPasswordRef.current.scrollIntoView();
        return currentPasswordRef.current.select();
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

      dispatch(editToMePasswordAction({ currentPassword, password }));
    },
    [
      currentPassword,
      password,
      passwordCheck,
      currentPasswordRef,
      passwordRef,
      passwordCheckRef,
      currentPasswordValidate,
      passwordValidate,
      passwordCheckValidate,
    ],
  );

  return (
    <Wrapper>
      <Form onSubmit={onSubmit} autoComplete="on">
        <h1 className="form-title" style={{ fontSize: "1.4rem" }}>
          비밀번호 수정
        </h1>

        {/* 기존 비밀번호 */}
        <label htmlFor="currentPassword" hidden>
          기존 비밀번호 입력
        </label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="기존 비밀번호를 입력해 주세요"
          value={currentPassword}
          onChange={onChangeCurrentPassword("password")}
          ref={currentPasswordRef}
          style={inputCommonStyle}
          autoComplete="new-password"
        />
        <Text $success={currentPasswordValidate} $error={!currentPasswordValidate}>
          숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리여야 합니다.
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

        {/* 비밀번호 변경 버튼 */}
        <Button type="submit" $signup loading={editToMePasswordLoading}>
          변경
        </Button>
      </Form>
    </Wrapper>
  );
};

export default PasswordEdit;
