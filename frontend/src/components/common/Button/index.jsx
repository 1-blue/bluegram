import React from "react";
import Proptypes from "prop-types";

// component
import Spinner from "@components/common/Spinner";

// styled-component
import { Wrapper } from "./style";

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
  onClick: Proptypes.func.isRequired,
  children: Proptypes.string,
  $loading: Proptypes.bool,

  $signup: Proptypes.bool,
  $local: Proptypes.bool,
  $facebook: Proptypes.bool,
  $naver: Proptypes.bool,
  $kakao: Proptypes.bool,
  $upload: Proptypes.bool,
  $submit: Proptypes.bool,
};

Button.defaultProps = {
  $loading: false,
  children: "click me",
};

export default Button;
