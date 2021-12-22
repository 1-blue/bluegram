import React from "react";
import PropTypes from "prop-types";

// styled-component
import { Wrapper } from "./style";

const Spinner = props => {
  return <Wrapper {...props} />;
};

Spinner.propTypes = {
  button: PropTypes.bool,
};

export default Spinner;
