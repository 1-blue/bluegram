/**
 * 생성일: 2022/01/16
 * 수정일: 2022/01/18
 * 작성자: 1-blue
 *
 * 게시글의 댓글 생성 폼
 * 아바타 정보 수정 ( 로그인한 유저의 이미지 부여 )
 */

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@components/common/Avatar";
import Button from "@components/common/Button";

const PostCardCommentForm = ({ text, onChangeText, resize, onSubmitComment }) => {
  const { me } = useSelector(state => state.user);
  const { appendCommentToPostLoading } = useSelector(state => state.post);
  const textareaRef = useRef(null);

  return (
    <Wrapper onSubmit={onSubmitComment(textareaRef)}>
      <Avatar width={28} height={28} image={me.Images[0]} $cursor className="post-card-comment-form-avatar" />

      <textarea
        value={text}
        onChange={onChangeText}
        onKeyDown={resize(textareaRef)}
        ref={textareaRef}
        rows={1}
        placeholder="댓글 달기..."
        className="post-card-form-text-area"
      />

      <Button type="submit" $comment className="post-card-comment-form-button" loading={appendCommentToPostLoading}>
        제출
      </Button>

      <span className="post-card-comment-from-text-length">{text.trim().length} / 200</span>
    </Wrapper>
  );
};

PostCardCommentForm.propTypes = {
  text: Proptypes.string.isRequired,
  onChangeText: Proptypes.func.isRequired,
  resize: Proptypes.func.isRequired,
  onSubmitComment: Proptypes.func.isRequired,
};

export default PostCardCommentForm;
