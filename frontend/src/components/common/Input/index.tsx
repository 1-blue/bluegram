import React from "react";

// type
import type { UseFormRegister } from "react-hook-form";
import type { SignUpForm } from "@src/pages/signup";
import type { LoginForm } from "@src/pages/login";

// style
import { InputWrapper } from "./style";

type Props = {
  id: string;
  type: "number" | "text" | "search" | "password";
  placeholder: string;
  subText?: string;
  [index: string]: any;
};

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<
  HTMLInputElement,
  Props &
    ReturnType<UseFormRegister<SignUpForm>> &
    ReturnType<UseFormRegister<LoginForm>>
>(({ id, type, placeholder, subText, ...props }, ref) => {
  return (
    <InputWrapper>
      <label htmlFor={id}>{id}</label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        {...props}
        ref={ref}
      />
      <span>{subText}</span>
    </InputWrapper>
  );
});

export default Input;
