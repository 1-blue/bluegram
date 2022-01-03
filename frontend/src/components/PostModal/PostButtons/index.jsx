import React from "react";
import Proptypes from "prop-types";

// component
import Icon from "@components/common/Icon";

// styled-components
import { Wrapper } from "./style";

const PostIconButtons = ({ onClickPostLike, isPostLiked, commentInputRef }) => {
  return (
    <Wrapper>
      <li>
        <Icon
          shape={isPostLiked ? "fillHeart" : "heart"}
          width={24}
          height={24}
          fill={isPostLiked ? "var(--heart-color)" : "black"}
          hoverfill={isPostLiked ? "red" : "gray"}
          onClick={onClickPostLike}
          animation="bounce-in"
        />
      </li>
      <li>
        <Icon shape="comment" width={24} height={24} hoverfill="gray" onClick={() => commentInputRef.current.focus()} />
      </li>
      <li>
        <Icon shape="airplane" width={24} height={24} hoverfill="gray" />
      </li>
      <li>
        <Icon shape="bookmark" width={24} height={24} hoverfill="gray" />
      </li>
    </Wrapper>
  );
};

PostIconButtons.propTypes = {
  onClickPostLike: Proptypes.func.isRequired,
  isPostLiked: Proptypes.bool.isRequired,
  commentInputRef: Proptypes.shape({
    current: Proptypes.instanceOf(Element),
  }),
};

export default PostIconButtons;
