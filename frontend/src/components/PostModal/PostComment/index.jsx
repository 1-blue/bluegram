import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

// components
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Dialog from "@components/common/Dialog";
import PostRecomment from "@components/PostModal/PostRecomment";
import Spinner from "@components/common/Spinner";

// hook
import useOpenClose from "@hooks/useOpenClose";
import useToggle from "@hooks/useToggle";

// util
import { timeFormat } from "@utils/dateFormat";

// styled-components
import { Wrapper } from "./style";

const PostComment = ({
  comment,
  UserId,
  onRemoveComment,
  onClickCommentLike,
  onChangeRecommentData,
  onClickLoadRecomment,
}) => {
  const [showDialog, onOpenDialog, onCloseDialog] = useOpenClose(false);
  const [toggleRecomment, onToggleRecomment] = useToggle(false);
  const { loadRecommentsLoading } = useSelector(state => state.post);
  const { Recomments } = useSelector(state => state.post.post.Comments.find(comment2 => comment2._id === comment._id));
  const [showDialogToggle, onOpenDialogToggle, onCloseDialogToggle] = useOpenClose(false);

  const isMineCommentLike = comment.CommentLikers.some(liker => liker._id === UserId);

  return (
    <Wrapper onMouseEnter={onOpenDialogToggle} onMouseLeave={onCloseDialogToggle}>
      <Link to={`/profile/${comment.User._id}/post`}>
        <Avatar width={32} height={32} image={comment.User.Images[0]} />
      </Link>
      <div className="comment-container">
        <b className="comment-username">{comment.User.name}</b>
        <span className="comment-content">{comment.content}</span>
        <div className="comment-option-list">
          <span className="comment-time">{timeFormat(comment.createdAt)}</span>
          {comment.CommentLikers.length > 0 && (
            <button type="button" className="comment-like-button">
              좋아요 {comment.CommentLikers.length}개
            </button>
          )}
          <button
            type="button"
            className="comment-recomment-button"
            onClick={onChangeRecommentData(comment._id, comment.User.name)}
          >
            답글달기
          </button>
          {showDialogToggle && (
            <Icon shape="option" width={16} height={16} fill="gray" hoverfill="black" onClick={onOpenDialog} />
          )}

          {comment.Recomments.length > 0 && (
            <div onClick={onClickLoadRecomment(comment._id)}>
              <button type="button" onClick={onToggleRecomment}>
                답글 {comment.Recomments.length}개 더보기
              </button>
            </div>
          )}

          {showDialog && (
            <Dialog onClose={onCloseDialog} showDialog={showDialog}>
              {comment.User._id === UserId ? (
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
          shape="heart"
          width={16}
          height={16}
          fill={isMineCommentLike ? "var(--heart-color)" : "gray"}
          hoverfill={isMineCommentLike ? "red" : "black"}
          animation="bounce-in"
          onClick={onClickCommentLike(comment._id, isMineCommentLike)}
          $fill={isMineCommentLike}
        />

        {/* 이거 답글 컴포넌트로 옮기기 */}
        {toggleRecomment &&
          (loadRecommentsLoading ? (
            <Spinner comment />
          ) : (
            <ul>
              {Recomments.map(recomment => (
                <li key={recomment._id}>
                  <PostRecomment
                    recomment={recomment}
                    isMineRecomment={recomment.User._id === UserId}
                    isMineRecommentLike={recomment.CommentLikers.some(liker => liker._id === UserId)}
                    onClickCommentLike={onClickCommentLike}
                    onRemoveComment={onRemoveComment}
                  />
                </li>
              ))}
            </ul>
          ))}
      </div>
    </Wrapper>
  );
};

PostComment.propTypes = {
  comment: Proptypes.shape({
    _id: Proptypes.number,
    content: Proptypes.string,
    UserId: Proptypes.number,
    RecommentId: Proptypes.oneOfType([Proptypes.number, Proptypes.node]),
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
    Recomments: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
        content: Proptypes.string,
        createdAt: Proptypes.string,
        UserId: Proptypes.number,
        RecommentOd: Proptypes.number,
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
      }),
    ),
  }).isRequired,
  UserId: Proptypes.number,
  onRemoveComment: Proptypes.func.isRequired,
  onClickCommentLike: Proptypes.func.isRequired,
  onChangeRecommentData: Proptypes.func.isRequired,
  onClickLoadRecomment: Proptypes.func.isRequired,
};

export default PostComment;
