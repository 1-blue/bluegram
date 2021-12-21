import React from "react";

// styled-component
import { Wrapper } from "./style";

const Menu = props => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Menu;
