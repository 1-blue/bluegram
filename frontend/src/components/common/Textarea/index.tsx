import { SignUpForm } from "@src/pages/signup";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { TextareaWrapper } from "./style";

type Props = {
  id: string;
  placeholder: string;
  subText?: string;
  [index: string]: any;
};

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  Props & ReturnType<UseFormRegister<SignUpForm>>
>(({ id, placeholder, subText, ...props }, ref) => {
  return (
    <TextareaWrapper>
      <label htmlFor={id}>{id}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        rows={5}
        {...props}
        ref={ref}
      />
      <span>{subText}</span>
    </TextareaWrapper>
  );
});

export default Textarea;
