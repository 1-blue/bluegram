/**
 * 생성일: 2022/01/15
 * 수정일: -
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지의 버튼들
 * 좋아요, 댓글, DM, 북마크 버튼 추가 ( 기능은 아직 없음 )
 */

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
