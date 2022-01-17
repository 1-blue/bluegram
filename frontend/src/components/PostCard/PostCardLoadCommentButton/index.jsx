/**
 * 생성일: 2022/01/16
 * 수정일: -
 * 작성자: 1-blue
 *
 * 게시글의 댓글 더 불러오기 버튼 + 불러올 때 스피너
 */

import React from "react";
import { useSelector } from "react-redux";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Spinner from "@components/common/Spinner";

const PostCardLoadCommentButton = ({ Comments, allCommentCount, onClickloadMoreComment }) => {
  const { loadCommentsLoading } = useSelector(state => state.post);

  return (
    <Wrapper>
      <button
        type="button"
        onClick={onClickloadMoreComment(Comments[Comments.length - 1]._id)}
        className="post-card-load-more-comment-button"
      >
        댓글 {allCommentCount === Comments.length ? allCommentCount : allCommentCount - Comments.length}개 더 불러오기
      </button>

      {loadCommentsLoading && <Spinner $page />}
    </Wrapper>
  );
};

PostCardLoadCommentButton.propTypes = {
  Comments: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
      content: Proptypes.string,
      createdAt: Proptypes.string,
      UserId: Proptypes.number,
      User: Proptypes.shape({
        _id: Proptypes.number,
        name: Proptypes.string,
        Images: Proptypes.arrayOf(
          Proptypes.shape({
            _id: Proptypes.number,
            name: Proptypes.string,
          }),
        ),
      }),
      CommentLikers: Proptypes.arrayOf(
        Proptypes.shape({
          _id: Proptypes.number,
        }),
      ),
      Recomments: Proptypes.arrayOf(
        Proptypes.shape({
          _id: Proptypes.number,
        }),
      ),
    }),
  ).isRequired,
  allCommentCount: Proptypes.oneOfType([Proptypes.bool, Proptypes.node]).isRequired,
  onClickloadMoreComment: Proptypes.func.isRequired,
};

export default PostCardLoadCommentButton;
