/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 해시태그 검색에 사용
 */

import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./style";

const SearchInput = props => {
  return <Wrapper {...props} />;
};

SearchInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
