// 2021/12/22 게시글 및 해시태그 검색 by 1-blue

import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./style";

const SearchInput = props => {
  // >> focus시 추천 검색어 보여주기 + 디바운싱 적용
  return <Wrapper {...props} />;
};

SearchInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
