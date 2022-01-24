/**
 * 생성일: 2022/01/24
 * -
 * 작성자: 1-blue
 *
 * 로그인한 유저 회원탈퇴 폼
 */

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import Text from "@components/common/Text";

// hook
import useValidateInput from "@hooks/useValidateInput";

// action
import { signOutAction } from "@store/actions";

// styled-components
import { Wrapper } from "./style";

const SignOut = () => {
  const dispatch = useDispatch();
  const { signOutLoading } = useSelector(state => state.user);
  const [password, onChangePassword, , passwordRef, passwordValidate] = useValidateInput("");

  // 2022/01/24 - 회원탈퇴 요청 - by 1-blue
  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      // 유효성 검사
      if (!passwordValidate) {
        alert("비밀번호를 조건에 맞게 입력해주세요!");
        passwordRef.current.scrollIntoView();
        return passwordRef.current.select();
      }

      if (!confirm("정말 회원 탈퇴를 하시겠습니까?\n회원 탈퇴 시 모든 정보가 제거되고 되돌릴 수 없습니다.")) return;

      dispatch(signOutAction({ password }));
    },
    [password, passwordRef, passwordValidate],
  );
  return (
    <Wrapper>
      <Form onSubmit={onSubmit} autoComplete="on">
        <h1 className="form-title" style={{ fontSize: "1.4rem" }}>
          회원 탈퇴
        </h1>

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
          autoComplete="new-password"
        />
        <Text $success={passwordValidate} $error={!passwordValidate}>
          숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리여야 합니다.
        </Text>

        {/* 회원 탈퇴 버튼 */}
        <Button type="submit" $signup loading={signOutLoading}>
          회원 탈퇴
        </Button>
      </Form>
    </Wrapper>
  );
};

export default SignOut;
