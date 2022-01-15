import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import ImageCarousel from "@components/common/ImageCarousel";

const PostCardImage = ({ images }) => {
  return (
    <Wrapper>
      <ImageCarousel speed={500} images={images} />
    </Wrapper>
  );
};

PostCardImage.propTypes = {
  images: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
      name: Proptypes.string,
    }),
  ),
};

export default PostCardImage;
