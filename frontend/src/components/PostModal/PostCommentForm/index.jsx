import React, { useState, useCallback, useRef } from "react";
import Proptypes from "prop-types";

// hook
import useText from "@hooks/useText";

// styled-components
import { Wrapper } from "./style";
import { useEffect } from "react";

const PostCommentForm = ({ onAppendComment, recommentData, setRecommentData, commentInputRef }) => {
  const [content, onChangeContent, setContent] = useText("");
  const [contentRows, setContentRows] = useState(1);
  const buttonRef = useRef(null);

  // 2021/12/27 - 엔터 클릭 시 댓글 제출/shift+enter시 줄바꿈 - by 1-blue
  const onKeyDown = useCallback(
    e => {
      if (content.length === 0) {
        setRecommentData({ RecommentId: null, username: null });
      }
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
    [buttonRef.current, content],
  );

  useEffect(() => {
    setContent(recommentData.username ? "@" + recommentData.username + " " : "");

    if (recommentData.username) commentInputRef.current.focus();
  }, [recommentData.username, commentInputRef.current]);

  return (
    <Wrapper onSubmit={onAppendComment(content, recommentData.RecommentId)}>
      <textarea
        type="text"
        placeholder="댓글 달기..."
        rows={contentRows}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        ref={commentInputRef}
      />
      <button type="submit" ref={buttonRef}>
        게시
      </button>
    </Wrapper>
  );
};

PostCommentForm.propTypes = {
  onAppendComment: Proptypes.func.isRequired,
  recommentData: Proptypes.shape({
    RecommentId: Proptypes.oneOfType([Proptypes.number, Proptypes.node]),
    username: Proptypes.oneOfType([Proptypes.string, Proptypes.node]),
  }),
  commentInputRef: Proptypes.shape({
    current: Proptypes.instanceOf(Element),
  }),
};

export default PostCommentForm;
