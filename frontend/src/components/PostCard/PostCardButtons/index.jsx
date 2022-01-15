import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";

const PostCardButtons = () => {
  return (
    <Wrapper>
      <Icon width={24} height={24} shape="heart" className="post-card-buttons-heart" />
      <Icon width={24} height={24} shape="comment" className="post-card-buttons-comment" />
      <Icon width={24} height={24} shape="airplane" className="post-card-buttons-airplane" />
      <div className="post-card-buttons-empty-place" />
      <Icon width={24} height={24} shape="bookmark" className="post-card-buttons-bookmark" />
    </Wrapper>
  );
};

PostCardButtons.propTypes = {};

export default PostCardButtons;
