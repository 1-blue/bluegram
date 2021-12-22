import React from "react";
import Proptypes from "prop-types";

// util
import { timeFormat } from "@util/dateFormat";

// styled-components
import { Wrapper } from "./style";

const PostInfo = ({ Likers, updatedAt }) => {
  return (
    <Wrapper>
      <span className="like-count">좋아요 {Likers.length}개</span>
      <span className="past-time">{timeFormat(updatedAt)}</span>
    </Wrapper>
  );
};

PostInfo.propTypes = {
  Likers: Proptypes.shape({
    _id: Proptypes.number,
  }).isRequired,
  updatedAt: Proptypes.string.isRequired,
};

export default PostInfo;
