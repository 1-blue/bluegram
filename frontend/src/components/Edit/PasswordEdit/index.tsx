import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// redux
import { editPasswordRequest } from "@src/store/actions/userAction";
import type { UserState } from "@src/store/reducers";

// style
import { Wrapper } from "../AccountEdit/style";

// common-component
import Button from "@src/components/common/Button";
import Input from "@src/components/common/Input";

type PasswordForm = {
  currentPassword: string;
  passwordCheck: string;
  password: string;
};

const PasswordEdit = () => {
  const dispatch = useDispatch();
  const { editPasswordLoading } = useSelector(
    ({ user }: { user: UserState }) => user
  );

  // 2022/06/02 - 비밀번호 변경 관련 메서드들 - by 1-blue
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>();

  // 2022/06/02 - 비밀번호 변경 요청 - by 1-blue
  const editPassword = useCallback(
    ({ currentPassword, password, passwordCheck }: PasswordForm) => {
      if (password !== passwordCheck)
        return toast.error("비밀번호와 비밀번호확인이 불일치합니다!", {
          autoClose: 3000,
        });

      dispatch(
        editPasswordRequest({
          currentPassword,
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
          placeholder="변경할 비밀번호를 입력해주세요."
          subText={errors.password?.message}
          {...register("password", { required: "비밀번호를 입력해주세요!" })}
        />
        {/* passwordCheck */}
        <Input
          id="passwordCheck"
          type="password"
          placeholder="변경할 비밀번호를 다시 입력해주세요."
          subText={errors.passwordCheck?.message}
          {...register("passwordCheck", {
            required: "비밀번호를 다시 입력해주세요!",
          })}
        />
        {/* password */}
        <Input
          id="currentPassword"
          type="password"
          placeholder="기존 비밀번호를 입력해주세요."
          subText={errors.currentPassword?.message}
          {...register("currentPassword", {
            required: "기존 비밀번호를 입력해주세요!",
          })}
        />
        {/* 계정 수정 버튼 */}
        <Button
          type="submit"
          loading={editPasswordLoading}
          contents="비밀번호 변경"
          primary
        />
      </Wrapper>
    </>
  );
};

export default PasswordEdit;
