/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 스피너 ( 페이지, 버튼 스피너 존재 )
 */

import React from "react";
import PropTypes from "prop-types";

// styled-component
import { Wrapper } from "./style";

const Spinner = props => {
  return <Wrapper {...props} />;
};

Spinner.propTypes = {
  $page: PropTypes.bool,
  $button: PropTypes.bool,
  $modal: PropTypes.bool,
};

export default Spinner;
