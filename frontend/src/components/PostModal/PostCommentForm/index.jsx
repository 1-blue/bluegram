import React, { useState, useCallback, useRef } from "react";
import Proptypes from "prop-types";

// hook
import useText from "@hooks/useText";

// styled-components
import { Wrapper } from "./style";

const PostCommentForm = ({ onAppendComment }) => {
  const [content, onChangeContent, setContent] = useText("");
  const [contentRows, setContentRows] = useState(1);
  const buttonRef = useRef(null);

  // 2021/12/27 - 엔터 클릭 시 댓글 제출/shift+enter시 줄바꿈 - by 1-blue
  const onKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        if (!e.shiftKey) {
          e.preventDefault();
          buttonRef.current.click();
          setContent("");
        } else if (e.shiftKey) {
          setContentRows(prev => (prev < 4 ? prev + 1 : prev));
        }
      }
    },
    [buttonRef.current],
  );

  return (
    <Wrapper onSubmit={onAppendComment(content, null)}>
      <textarea
        type="text"
        placeholder="댓글 달기..."
        rows={contentRows}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
      />
      <button type="submit" ref={buttonRef}>
        게시
      </button>
    </Wrapper>
  );
};

PostCommentForm.propTypes = {
  onAppendComment: Proptypes.func.isRequired,
};

export default PostCommentForm;
