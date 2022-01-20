/**
 * 생성일: 2022/01/17
 * 수정일: 2022/01/19
 * 작성자: 1-blue
 *
 * 페이지의 중간에 텍스트를 남길 때 사용
 * 회원가입 페이지 유효성 검사 불일치 텍스트
 */

import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const Text = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

Text.propTypes = {
  children: Proptypes.node.isRequired,

  $hashtagTitle: Proptypes.bool,
  $postEnd: Proptypes.bool,
  $success: Proptypes.bool,
  $error: Proptypes.bool,
};

export default Text;
