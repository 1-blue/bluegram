/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * Form ( 로그인, 회원가입 페이지에서 사용 )
 */

import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const Form = props => {
  return <Wrapper {...props}>{props.children}</Wrapper>;
};

Form.propTypes = {
  onSubmit: Proptypes.func.isRequired,
  children: Proptypes.node.isRequired,
};

export default Form;
