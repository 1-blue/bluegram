/**
 * 생성일: 2022/01/16
 * 수정일: 2022/01/18
 * 작성자: 1-blue
 *
 * 게시글의 댓글들 컨테이너
 * 본인 댓글에만 삭제 권한 부여
 * 댓글에 좋아요 로직 추가
 */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Menu from "@components/common/Menu";

// components
import PostCardRecomment from "./PostCardRecomment";
import PostCardLoadRecommentButton from "./PostCardLoadRecommentButton";
import PostCardCommentToggleButton from "../PostCardCommentToggleButton";

// hooks
import useOpenClose from "@hooks/useOpenClose";
import useToggle from "@hooks/useToggle";

// utils
import { timeFormat } from "@utils";

const PostCardComment = ({
  comment,
  onRemoveComment,
  onClickloadMoreRecomment,
  setRecommentData,
  onClickCommentLikeButton,
}) => {
  const { me } = useSelector(state => state.user);
  const [isShowMenu, onOpenMenu, onCloseMenu] = useOpenClose(false);
  const [isShowRecomment, onToggleComment] = useToggle(true);
  const [isMine, setIsMine] = useState(false);
  const [isLikedComment, setIsLikedComment] = useState(false);

  // 2022/01/18 - 본인 댓글인지 판단 - by 1-blue
  useEffect(() => setIsMine(comment.User._id === me._id), [comment.User._id, me._id]);

  // 2022/01/18 - 댓글에 좋아요 눌렀는지 판단 - by 1-blue
  useEffect(
    () => setIsLikedComment(comment.CommentLikers.some(liker => liker._id === me._id)),
    [comment.CommentLikers, me._id],
  );

  return (
    <Wrapper className="post-card-comment-wrapper">
      <li className="post-card-comment">
        {/* 작성자의 프로필 이미지 */}
        <Avatar
          width={30}
          height={30}
          image={comment.User.Images[0]}
          alt="댓글 유저의 프로필 이미지"
          $cursor
          className="post-card-comment-avatar"
        />

        {/* 댓글의 컨텐츠 wrapper */}
        <div className="post-card-comment-content-wrapper">
          {/* 작성자명, 작성내용 */}
          <div className="post-card-comment-content">
            <span className="post-card-comment-user-name">{comment.User.name}</span>
            <span className="post-card-comment-text">{comment.content}</span>
          </div>

          {/* 댓글의 추가 정보 및 버튼 */}
          <div className="post-card-comment-info">
            <span className="post-card-comment-created-at">{timeFormat(comment.createdAt)}</span>
            <button type="button" className="post-card-comment-like-button">
              {comment.CommentLikers.length > 0 && <b>좋아요 {comment.CommentLikers.length}개</b>}
            </button>
            <button
              type="button"
              className="post-card-comment-recomment-button"
              onClick={() => setRecommentData({ RecommentId: comment._id, username: comment.User.name })}
            >
              <b>답글 달기</b>
            </button>
          </div>
        </div>

        {/* 댓글 좋아요 버튼 */}
        <div className="post-card-comment-buttons">
          <button type="button" className="post-card-comment-option-button" onClick={onOpenMenu}>
            <Icon width={16} height={16} shape="option" />
          </button>
          <button
            type="button"
            className="post-card-comment-heart-button"
            onClick={onClickCommentLikeButton(isLikedComment, comment._id)}
          >
            <Icon
              width={16}
              height={16}
              shape="heart"
              $fill={isLikedComment}
              fill="var(--heart-color)"
              animation="heart-scale"
            />
          </button>
        </div>

        {/* 댓글 옵션 메뉴 */}
        {isShowMenu && (
          <Menu $comment onCloseMenu={onCloseMenu}>
            {isMine && (
              <li className="menu-list" onClick={onRemoveComment(comment._id)}>
                삭제
              </li>
            )}
            <li className="menu-list">신고</li>
            <li className="menu-list">숨기기</li>
          </Menu>
        )}
      </li>

      {/* 답글 토글 버튼 */}
      {comment.Recomments.length > 0 && !comment.hasMoreRecomments && (
        <PostCardCommentToggleButton isShowComment={isShowRecomment} onToggleComment={onToggleComment} $recomment />
      )}

      {/* 답글 더 보기 버튼 */}
      {comment.Recomments.length > 0 && comment.hasMoreRecomments && (
        <PostCardLoadRecommentButton
          allRecommentCount={comment.allRecommentCount}
          Recomments={comment.Recomments}
          CommentId={comment._id}
          onClickloadMoreRecomment={onClickloadMoreRecomment}
        />
      )}

      {/* 답글 */}
      {comment.Recomments[0]?.content &&
        isShowRecomment &&
        comment.Recomments.map(recomment => (
          <PostCardRecomment
            key={recomment._id}
            recomment={recomment}
            onRemoveComment={onRemoveComment}
            onClickCommentLikeButton={onClickCommentLikeButton}
          />
        ))}
    </Wrapper>
  );
};

PostCardComment.propTypes = {
  comment: Proptypes.shape({
    _id: Proptypes.number,
    content: Proptypes.string,
    createdAt: Proptypes.string,
    UserId: Proptypes.number,
    RecommentId: Proptypes.number,
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
    Recomments: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
      }),
    ),
    CommentLikers: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
      }),
    ),
  }).isRequired,
  onRemoveComment: Proptypes.func.isRequired,
  onClickloadMoreRecomment: Proptypes.func.isRequired,
  setRecommentData: Proptypes.func.isRequired,
  onClickCommentLikeButton: Proptypes.func.isRequired,
};

export default PostCardComment;
