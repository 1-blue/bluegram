import React from "react";
import PropTypes from "prop-types";

// styled-component
import { Wrapper } from "./style";

const Spinner = props => {
  return <Wrapper {...props} />;
};

Spinner.propTypes = {
  page: PropTypes.bool,
  modal: PropTypes.bool,
  button: PropTypes.bool,
  comment: PropTypes.bool,
};

export default Spinner;
