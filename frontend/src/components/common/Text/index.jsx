/**
 * 생성일: 2022/01/17
 * 수정일: -
 * 작성자: 1-blue
 *
 * 페이지의 중간에 텍스트를 남길 때 사용
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

  $postEnd: Proptypes.bool,
};

export default Text;
