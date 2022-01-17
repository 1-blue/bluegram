/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/17
 * 작성자: 1-blue
 *
 * 메뉴 ( 프로필 메뉴, 게시글의 댓글, 게시글에 사용 )
 * 현재 메뉴는 열고 난 이후에 어디든 클릭하면 닫히도록 구성
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";

// styled-component
import { Wrapper } from "./style";

const Menu = ({ onCloseMenu, children, ...restProps }) => {
  // 2022/01/16 - 영역 외 클릭시 메뉴 닫는 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", onCloseMenu);

    return () => window.removeEventListener("click", onCloseMenu);
  }, [onCloseMenu]);

  return <Wrapper {...restProps}>{children}</Wrapper>;
};

Menu.propTypes = {
  onCloseMenu: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,

  $profile: PropTypes.bool,
  $post: PropTypes.bool,
  $comment: PropTypes.bool,
};

export default Menu;
