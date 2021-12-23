import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const PostContent = ({ content }) => {
  return (
    <Wrapper>
      <span>{content}</span>
    </Wrapper>
  );
};

PostContent.propTypes = {
  content: Proptypes.string.isRequired,
};

export default PostContent;
