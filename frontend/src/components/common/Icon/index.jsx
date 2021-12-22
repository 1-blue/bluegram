import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const Icon = props => {
  return <Wrapper {...props} />;
};

Icon.propTypes = {
  shape: Proptypes.string.isRequired,
  big: Proptypes.bool,
  medium: Proptypes.bool,
  small: Proptypes.bool,
};

export default Icon;
