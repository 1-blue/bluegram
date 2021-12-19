import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const Icon = ({ shape }) => {
  return <Wrapper shape={shape} />;
};

Icon.propTypes = {
  shape: Proptypes.string.isRequired,
};

export default Icon;
