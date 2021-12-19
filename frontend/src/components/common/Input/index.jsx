import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const Input = props => {
  return <Wrapper {...props} />;
};

Input.propTypes = {
  type: Proptypes.string.isRequired,
  placeholder: Proptypes.string,
  maxLength: Proptypes.number,
  value: Proptypes.oneOfType([Proptypes.string, Proptypes.number]).isRequired,
  onChange: Proptypes.func.isRequired,
};

export default Input;
