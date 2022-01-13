/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 메뉴 ( 프로필 메뉴에 사용 )
 */

import React from "react";
import PropTypes from "prop-types";

// styled-component
import { Wrapper } from "./style";

const Menu = ({ children, ...restProps }) => {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  $profile: PropTypes.bool,
};

export default Menu;
