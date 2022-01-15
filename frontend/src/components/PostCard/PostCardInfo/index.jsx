/**
 * 생성일: 2022/01/15
 * 수정일: -
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지의 정보 부분
 * 게시글 좋아요 개수, 게시글 생성 시간
 */

import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// utils
import { timeFormat } from "@utils";

const PostCardInfo = ({ likeCount, createdAt }) => {
  return (
    <Wrapper>
      <span className="post-card-info-like-count">좋아요 {likeCount}개</span>
      <span className="post-card-info-created-at">{timeFormat(createdAt)}</span>
    </Wrapper>
  );
};

PostCardInfo.propTypes = {
  likeCount: Proptypes.number.isRequired,
  createdAt: Proptypes.string.isRequired,
};

export default PostCardInfo;
