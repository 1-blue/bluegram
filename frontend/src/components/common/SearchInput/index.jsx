import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./style";

const SearchInput = props => {
  return <Wrapper {...props} />;
};

SearchInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
