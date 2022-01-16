/**
 * 생성일: 2022/01/16
 * 수정일: -
 * 작성자: 1-blue
 *
 * 게시글의 댓글들 컨테이너
 */

import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Menu from "@components/common/Menu";

// hooks
import useOpenClose from "@hooks/useOpenClose";

// utils
import { timeFormat } from "@utils";

const PostCardComment = ({ comment, onRemoveComment }) => {
  const [isShowMenu, onOpenMenu, onCloseMenu] = useOpenClose(false);

  return (
    <Wrapper>
      <li key={comment._id} className="post-card-comment">
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
            <button type="button" className="post-card-comment-recomment-button">
              <b>답글 달기</b>
            </button>
          </div>
        </div>

        {/* 댓글 좋아요 버튼 */}
        <div className="post-card-comment-buttons">
          <button type="button" className="post-card-comment-option-button" onClick={onOpenMenu}>
            <Icon width={16} height={16} shape="option" />
          </button>
          <button type="button" className="post-card-comment-heart-button">
            <Icon width={16} height={16} shape="heart" />
          </button>
        </div>

        {/* 게시글 옵션 메뉴 */}
        {isShowMenu && (
          <Menu $comment onCloseMenu={onCloseMenu}>
            <li className="post-card-comment-menu-list" onClick={onRemoveComment(comment._id)}>
              삭제
            </li>
            <li className="post-card-comment-menu-list">신고</li>
            <li className="post-card-comment-menu-list">숨기기</li>
          </Menu>
        )}
      </li>
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
};

export default PostCardComment;
