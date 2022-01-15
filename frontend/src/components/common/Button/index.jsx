/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 모든 버튼들 ( props를 이용해서 용도를 구분함 )
 */

import React from "react";
import Proptypes from "prop-types";

// styled-component
import { Wrapper } from "./style";

// component
import Spinner from "@components/common/Spinner";

const Button = props => {
  return (
    <Wrapper {...props}>
      {props.loading && <Spinner button />}
      <span className="button-text">{props.children}</span>
    </Wrapper>
  );
};

Button.propTypes = {
  type: Proptypes.string.isRequired,
  onClick: Proptypes.func,
  children: Proptypes.oneOfType([Proptypes.string, Proptypes.node]),
  $loading: Proptypes.bool,

  $signup: Proptypes.bool,
  $local: Proptypes.bool,
  $facebook: Proptypes.bool,
  $naver: Proptypes.bool,
  $kakao: Proptypes.bool,
  $upload: Proptypes.bool,
  $follow: Proptypes.bool,
};

Button.defaultProps = {
  $loading: false,
  children: "click me",
};

export default Button;
