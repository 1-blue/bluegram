import React from "react";
import Proptypes from "prop-types";

// components
import { Wrapper } from "./style";

const Avatar = props => {
  return (
    <Wrapper
      {...props}
      src={
        props.image?.name
          ? (process.env.NODE_ENV === "production" ? process.env.PROD_IMAGE_URL : process.env.DEV_IMAGE_URL) +
            "/" +
            props.image.name
          : props.image?.url
      }
    />
  );
};

Avatar.propTypes = {
  width: Proptypes.number,
  height: Proptypes.number,
  image: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
      name: Proptypes.string,
      url: Proptypes.string,
    }),
  ),
  alt: Proptypes.string,
};

Avatar.defaultProps = {
  width: 40,
  height: 40,
  alt: "이미지",
};

export default Avatar;
