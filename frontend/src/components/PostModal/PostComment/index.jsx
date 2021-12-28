import React from "react";
import Proptypes from "prop-types";

// component
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Dialog from "@components/common/Dialog";

// hook
import useOpenClose from "@hooks/useOpenClose";

// util
import { timeFormat } from "@utils/dateFormat";

// styled-components
import { Wrapper } from "./style";

const PostComment = ({ comment, isMineComment, onRemoveComment, onClickCommentLike, isMineCommentLike }) => {
  const [showDialog, onOpenDialog, onCloseDialog] = useOpenClose(false);

  return (
    <Wrapper>
      <Avatar width={40} height={40} image={comment.User?.Images[0]} />
      <div className="comment-container">
        <b className="comment-username">{comment.User.name}</b>
        <pre className="comment-content">{comment.content}</pre>
        <div className="comment-option-list">
          <span className="comment-time">{timeFormat(comment.createdAt)}</span>
          {comment.CommentLikers.length > 0 && (
            <button type="button" className="comment-like-button">
              좋아요 {comment.CommentLikers.length}개
            </button>
          )}
          <button type="button" className="comment-recomment-button">
            답글달기
          </button>
          <Icon shape="option" width={16} height={16} fill="gray" hoverfill="black" onClick={onOpenDialog} />
          {showDialog && (
            <Dialog onClose={onCloseDialog} showDialog={showDialog}>
              {isMineComment ? (
                <>
                  <li onClick={onRemoveComment(comment._id)}>삭제</li>
                  <li>수정</li>
                </>
              ) : (
                <>
                  <li>신고</li>
                </>
              )}
            </Dialog>
          )}
        </div>

        <Icon
          shape={isMineCommentLike ? "fillHeart" : "heart"}
          width={16}
          height={16}
          fill={isMineCommentLike ? "var(--heart-color)" : "gray"}
          hoverfill={isMineCommentLike ? "red" : "black"}
          animation="bounce-in"
          onClick={onClickCommentLike(comment._id, isMineCommentLike)}
        />
      </div>
    </Wrapper>
  );
};

PostComment.propTypes = {
  comment: Proptypes.shape({
    _id: Proptypes.number,
    content: Proptypes.string,
    UserId: Proptypes.number,
    CommentId: Proptypes.oneOfType([Proptypes.number, Proptypes.node]),
    createdAt: Proptypes.string,
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
        name: Proptypes.string,
        Images: Proptypes.arrayOf(
          Proptypes.shape({
            _id: Proptypes.number,
            name: Proptypes.string,
          }),
        ),
        CommentLikes: Proptypes.shape({
          createdAt: Proptypes.string,
          UserId: Proptypes.number,
          CommentId: Proptypes.number,
        }),
      }),
    ),
  }).isRequired,
  isMineComment: Proptypes.bool.isRequired,
  onRemoveComment: Proptypes.func.isRequired,
  onClickCommentLike: Proptypes.func.isRequired,
  isMineCommentLike: Proptypes.bool.isRequired,
};

export default PostComment;
