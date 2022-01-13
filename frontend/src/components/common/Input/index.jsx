/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * input ( 로그인, 회원가입 페이지에서 사용 )
 */

import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const Input = props => {
  return <Wrapper {...props} />;
};

Input.propTypes = {
  type: Proptypes.string.isRequired,
  placeholder: Proptypes.string,
  maxLength: Proptypes.number,
  value: Proptypes.oneOfType([Proptypes.string, Proptypes.number]).isRequired,
  onChange: Proptypes.func.isRequired,
};

export default Input;
