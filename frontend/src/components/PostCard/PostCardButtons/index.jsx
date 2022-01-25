/**
 * 생성일: 2022/01/15
 * 수정일: 2022/01/26
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지의 버튼들
 * 좋아요, 댓글, DM, 북마크 버튼 추가 ( 기능은 아직 없음 )
 * 좋아요 기능 추가
 * 댓글 focus 시 아이콘 변경 및 댓글 아이콘 기능 focus 기능 추가
 * 북마크 기능 추가
 * 비로그인시에도 접근 가능하도록 수정
 */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";

const PostCardButtons = ({
  likers,
  bookmarkers,
  onClickPostLikeButton,
  isFocus,
  onClickCommentIconButton,
  onClickBookmarkButton,
}) => {
  const { me } = useSelector(state => state.user);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [isBookmarkedPost, setIsBookmarkedPost] = useState(false);

  // 2022/01/18 - 본인이 게시글에 좋아요 눌렀는지 확인 - by 1-blue
  useEffect(() => setIsLikedPost(likers.some(liker => liker._id === me._id)), [me, likers]);

  // 2022/01/18 - 본인이 게시글에 북마크 눌렀는지 확인 - by 1-blue
  useEffect(() => setIsBookmarkedPost(bookmarkers.some(bookmarker => bookmarker._id === me._id)), [me, bookmarkers]);

  return (
    <Wrapper>
      {/* 좋아요 */}
      <button type="button" onClick={onClickPostLikeButton(isLikedPost)} className="post-card-buttons-heart">
        <Icon
          width={24}
          height={24}
          shape="heart"
          $fill={isLikedPost}
          fill="var(--heart-color)"
          animation="heart-scale"
        />
      </button>

      {/* 댓글 */}
      <button type="button" onClick={onClickCommentIconButton} className="post-card-buttons-comment">
        <Icon width={24} height={24} shape="comment" $fill={isFocus} fill="var(--comment-color)" />
      </button>

      {/* DM */}
      <button type="button" className="post-card-buttons-airplane">
        <Icon width={24} height={24} shape="airplane" className="post-card-buttons-airplane" />
      </button>

      {/* 빈 공간 차지 */}
      <div className="post-card-buttons-empty-place" />

      {/* 북마크 */}
      <button type="button" onClick={onClickBookmarkButton(isBookmarkedPost)} className="post-card-buttons-bookmark">
        <Icon
          width={24}
          height={24}
          shape="bookmark"
          $fill={isBookmarkedPost}
          fill="var(--bookmark-color)"
          animation="heart-scale"
        />
      </button>
    </Wrapper>
  );
};

PostCardButtons.propTypes = {
  likers: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
      PostLikes: Proptypes.shape({
        createdAt: Proptypes.string,
      }),
    }),
  ).isRequired,
  bookmarkers: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
    }),
  ).isRequired,
  onClickPostLikeButton: Proptypes.func.isRequired,
  isFocus: Proptypes.bool.isRequired,
  onClickCommentIconButton: Proptypes.func.isRequired,
  onClickBookmarkButton: Proptypes.func.isRequired,
};

export default PostCardButtons;
