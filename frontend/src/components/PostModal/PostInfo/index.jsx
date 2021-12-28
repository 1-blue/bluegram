import React from "react";
import Proptypes from "prop-types";

// util
import { timeFormat } from "@utils/dateFormat";

// styled-components
import { Wrapper } from "./style";

const PostInfo = ({ PostLikers, createdAt }) => {
  return (
    <Wrapper>
      <span className="like-count">좋아요 {PostLikers.length}개</span>
      <span className="past-time">{timeFormat(createdAt)}</span>
    </Wrapper>
  );
};

PostInfo.propTypes = {
  PostLikers: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
    }),
  ).isRequired,
  createdAt: Proptypes.string.isRequired,
};

export default PostInfo;
