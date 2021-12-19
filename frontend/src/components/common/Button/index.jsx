import React from "react";
import Proptypes from "prop-types";

import { Wrapper } from "./style";

const Button = props => {
  return (
    <Wrapper {...props}>
      <span className="button-text">{props.children}</span>
    </Wrapper>
  );
};

Button.propTypes = {
  type: Proptypes.string.isRequired,
  signup: Proptypes.bool,
  local: Proptypes.bool,
  facebook: Proptypes.bool,
  naver: Proptypes.bool,
};

Button.defaultProps = {
  signup: true,
};

export default Button;
