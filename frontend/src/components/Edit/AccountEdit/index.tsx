import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// common-component
import Button from "@src/components/common/Button";
import Input from "@src/components/common/Input";
import PhotoInput from "@src/components/common/PhotoInput";
import Textarea from "@src/components/common/Textarea";

// styled-component
import { Wrapper } from "./style";

// action
import { userActions } from "@src/store/reducers";

// type
import type { RootState } from "@src/store/configureStore";
import type { SignUpForm } from "@src/pages/signup";

const AccountEdit = () => {
  const dispatch = useDispatch();
  const { detailMe, editAccountLoading } = useSelector(
    ({ user }: RootState) => user
  );
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: {
      id: detailMe?.id,
      name: detailMe?.name,
      phone: detailMe?.phone,
      email: detailMe?.email,
      birthday: detailMe?.birthday,
      introduction: detailMe?.introduction,
      avatar: detailMe?.Photos?.[0].name,
    },
  });

  // 2022/06/02 - 이미지 드래그중인지 판단할 변수 - by 1-blue
  const [isDragging, setIsDragging] = useState(false);

  // 2022/06/02 - 회원 정보 수정 - by 1-blue
  const editAccount = useCallback(
    (body: SignUpForm) => dispatch(userActions.editAccountRequest({ ...body })),
    [dispatch]
  );

  return (
    <>
      <Wrapper
        onDragOver={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onSubmit={handleSubmit(editAccount)}
      >
        {/* id */}
        <Input
          id="id"
          type="text"
          placeholder="아이디를 입력해주세요."
          subText={errors.id?.message}
          {...register("id", { required: "아이디를 입력해주세요!" })}
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

        {/* 계정 수정 버튼 */}
        <Button
          type="submit"
          loading={editAccountLoading}
          contents="정보 수정"
          primary
        />
      </Wrapper>
    </>
  );
};

export default AccountEdit;
