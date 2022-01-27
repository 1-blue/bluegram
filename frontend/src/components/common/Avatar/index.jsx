/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 유저 아바타 이미지
 */

import React from "react";
import Proptypes from "prop-types";

// components
import { Wrapper } from "./style";

const Avatar = ({ image, width, height, ...restProps }) => {
  return (
    <Wrapper
      width={width}
      height={height}
      src={image?.name ? process.env.NEXT_PUBLIC_IMAGE_URL + "/" + image.name : image?.url}
      {...restProps}
    />
  );
};

Avatar.propTypes = {
  width: Proptypes.number,
  height: Proptypes.number,
  image: Proptypes.shape({
    _id: Proptypes.number,
    name: Proptypes.string,
    url: Proptypes.string,
  }),
  alt: Proptypes.string,
  $cursor: Proptypes.bool,
};

Avatar.defaultProps = {
  width: 40,
  height: 40,
  alt: "이미지",
};

export default Avatar;
