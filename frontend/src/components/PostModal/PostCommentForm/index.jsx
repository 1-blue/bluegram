import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";

// hook
import useText from "@hooks/useText";

// action
import { resetMessageAction, appendCommentToPostAction } from "@store/actions";

// styled-components
import { Wrapper } from "./style";

const PostCommentForm = ({ PostId }) => {
  const dispatch = useDispatch();
  const { appendCommentToPostDone, appendCommentToPostError } = useSelector(state => state.post);
  const [content, onChangeContent, setContent] = useText("");
  const [contentRows, setContentRows] = useState(1);
  const buttonRef = useRef(null);

  // 2021/12/27 - 게시글의 댓글 성공 시 메시지 / 게시글의 댓글 실패 시 메시지 - by 1-blue
  useEffect(() => {
    if (!(appendCommentToPostDone || appendCommentToPostError)) return;
    alert(appendCommentToPostDone || appendCommentToPostError);

    dispatch(resetMessageAction());

    setContent("");
  }, [appendCommentToPostDone, appendCommentToPostError]);

  // 2021/12/27 - 엔터 클릭 시 댓글 제출/shift+enter시 줄바꿈 - by 1-blue
  const onKeyDown = useCallback(
    e => {
      if (e.keyCode === 13) {
        if (!e.shiftKey) {
          e.preventDefault();
          buttonRef.current.click();
        } else if (e.shiftKey) {
          setContentRows(prev => (prev < 4 ? prev + 1 : prev));
        }
      }
    },
    [buttonRef.current],
  );

  // 2021/12/27 - 댓글 제출 - by 1-blue
  const onSubmitComment = useCallback(
    e => {
      e.preventDefault();

      if (!content.trim()) return alert("댓글을 입력한 후에 제출해주세요!");

      dispatch(appendCommentToPostAction({ content, PostId, CommentId: null }));
    },
    [content, PostId],
  );

  return (
    <Wrapper onSubmit={onSubmitComment}>
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
  PostId: Proptypes.number.isRequired,
};

export default PostCommentForm;
