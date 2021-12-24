import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const Form = props => {
  return <Wrapper {...props}>{props.children}</Wrapper>;
};

Form.propTypes = {
  onSubmit: Proptypes.func.isRequired,
  children: Proptypes.node.isRequired,
};

export default Form;
