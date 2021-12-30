import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// components
import Form from "@components/common/Form";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import ImageInput from "@components/common/ImageInput";

// hook
import useInput from "@hooks/useInput";
import useMessage from "@hooks/useMessage";

// action
import { resetMessageAction, signupAction } from "@store/actions";

const Wrapper = styled.main`
  max-width: 400px;
  margin: auto;

  @media (max-width: 768px) {
    max-width: 350px;
  }
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signupDone, signupError } = useSelector(state => state.user);
  const { imagePreviews } = useSelector(state => state.image);
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [name, onChangeName] = useInput("");
  const [phone, onChangePhone] = useInput("");
  const [birthday, onChangeBirthday] = useInput("");

  // 2021/12/20 - 회원가입 성공 시 홈페이지로 이동 및 성공 or 실패 메시지 alert - by 1-blue
  useMessage(signupDone, signupError);
  useEffect(() => {
    if (signupDone) navigate("/login");
  }, [signupDone]);

  // 2021/12/20 - 회원가입 요청 - by 1-blue
  const onSubmit = useCallback(
    e => {
      e.preventDefault();

      if (!id) return alert("아이디를 입력해주세요");
      if (!password) return alert("비밀번호를 입력해주세요");
      if (!passwordCheck) return alert("비밀번호확인을 입력해주세요");
      if (!name) return alert("이름을 입력해주세요");
      if (!phone) return alert("휴대폰번호를 입력해주세요");
      if (!birthday) return alert("생일을 입력해주세요");

      // 유효성 검사 ( >> 추후에 다른 입력값들에 대한 유효성 검사도 추가 )
      if (!(password === passwordCheck)) return alert("비밀번호를 확인해주세요");

      dispatch(signupAction({ id, password, name, phone, birthday, imageName: imagePreviews[0] }));
    },
    [id, password, passwordCheck, name, phone, birthday, imagePreviews],
  );

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <h1 className="form-title">bluegram</h1>
        {/* id */}
        <Input type="text" placeholder="아이디를 입력해주세요" value={id} onChange={onChangeId} />

        {/* password */}
        <Input type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={onChangePassword} />

        {/* passwordCheck */}
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />

        {/* name */}
        <Input type="text" placeholder="성명을 입력해주세요" value={name} onChange={onChangeName} />

        {/* phone */}
        <Input
          type="text"
          placeholder="휴대폰번호를 숫자만 입력해주세요"
          maxLength={11}
          value={phone}
          onChange={onChangePhone}
        />

        {/* birthday */}
        <Input
          type="text"
          placeholder="생년월일을 입력해주세요 ( 19981106 )"
          maxLength={8}
          value={birthday}
          onChange={onChangeBirthday}
        />

        {/* profileImage */}
        <ImageInput />

        {/* 회원가입 버튼 */}
        <Button type="submit" $signup>
          회원가입
        </Button>
      </Form>
    </Wrapper>
  );
};

export default SignupPage;
