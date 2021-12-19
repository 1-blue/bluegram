import React from "react";
import Proptypes from "prop-types";

// components
import { Wrapper } from "./style";

const Avatar = props => {
  return <Wrapper {...props} />;
};

Avatar.propTypes = {
  width: Proptypes.number,
  height: Proptypes.number,
  src: Proptypes.string,
  alt: Proptypes.string,
};

Avatar.defaultProps = {
  width: 40,
  height: 40,
  src: `${process.env.IMAGE_URL}/default.jpg`,
  alt: "이미지",
};

export default Avatar;
