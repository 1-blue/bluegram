/**
 * 생성일: 2022/01/17
 * 수정일: -
 * 작성자: 1-blue
 *
 * 댓글/답글 토글 버튼 ( visible/unvisible )
 */

import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const PostCardCommentToggleButton = ({ isShowComment, onToggleComment, $recomment }) => {
  const text = $recomment ? "ㅡㅡㅡ 답글" : "댓글";

  return (
    <Wrapper $recomment={$recomment}>
      <button type="button" onClick={onToggleComment} className="post-card-toggle-comment-button">
        {isShowComment ? `${text} 숨기기` : `${text} 모두 보기`}
      </button>
    </Wrapper>
  );
};

PostCardCommentToggleButton.propTypes = {
  isShowComment: Proptypes.bool.isRequired,
  onToggleComment: Proptypes.func.isRequired,
  $recomment: Proptypes.bool,
};

PostCardCommentToggleButton.defaultProps = {
  $recomment: false,
};

export default PostCardCommentToggleButton;
