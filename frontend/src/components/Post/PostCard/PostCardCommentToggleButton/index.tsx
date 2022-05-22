import React from "react";

// styled-components
import { Wrapper } from "./style";

type Props = {
  isShowComment: boolean;
  onToggleComment: () => void;
  $recomment?: boolean;
};

const PostCardCommentToggleButton = ({
  isShowComment,
  onToggleComment,
  $recomment,
}: Props) => {
  const text = $recomment ? "ㅡㅡㅡ 답글" : "댓글";

  return (
    <Wrapper $recomment={$recomment}>
      <button
        type="button"
        onClick={onToggleComment}
        className="post-card-toggle-comment-button"
      >
        {isShowComment ? `${text} 숨기기` : `${text} 모두 보기`}
      </button>
    </Wrapper>
  );
};

export default PostCardCommentToggleButton;
