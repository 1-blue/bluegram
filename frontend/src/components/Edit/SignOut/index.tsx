import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// redux
import { signOutRequest } from "@src/store/actions/userAction";
import type { UserState } from "@src/store/reducers";

// style
import { Wrapper } from "../AccountEdit/style";

// common-component
import Button from "@src/components/common/Button";
import Input from "@src/components/common/Input";

type SignOutForm = {
  password: string;
};

const SignOut = () => {
  const dispatch = useDispatch();
  const { signOutLoading } = useSelector(
    ({ user }: { user: UserState }) => user
  );

  // 2022/06/02 - 비밀번호 변경 관련 메서드들 - by 1-blue
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignOutForm>();

  // 2022/06/02 - 비밀번호 변경 요청 - by 1-blue
  const editPassword = useCallback(
    ({ password }: SignOutForm) => {
      dispatch(
        signOutRequest({
          password,
        })
      );
    },
    [dispatch]
  );

  return (
    <>
      <Wrapper onSubmit={handleSubmit(editPassword)}>
        {/* password */}
        <Input
          id="password"
          type="password"
          placeholder="기존 비밀번호를 입력해주세요."
          subText={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력해주세요!",
          })}
        />
        {/* 계정 수정 버튼 */}
        <Button
          type="submit"
          loading={signOutLoading}
          contents="회원 탈퇴"
          primary
        />
      </Wrapper>
    </>
  );
};

export default SignOut;
