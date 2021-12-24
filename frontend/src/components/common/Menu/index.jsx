import React from "react";
import PropTypes from "prop-types";

// styled-component
import { Wrapper } from "./style";

const Menu = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
