/**
 * 생성일: 2022/01/15
 * 수정일: 2022/01/17
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지의 버튼들
 * 좋아요, 댓글, DM, 북마크 버튼 추가 ( 기능은 아직 없음 )
 */

import React from "react";
import { useSelector } from "react-redux";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";
import { useState } from "react";
import { useEffect } from "react";

const PostCardButtons = ({ likers, onClickPostLikeButton }) => {
  const { me } = useSelector(state => state.user);
  const [isLikedPost, setIsLikedPost] = useState(false);

  // 2022/01/18 - 본인이 게시글에 좋아요 눌렀는지 확인 - by 1-blue
  useEffect(() => setIsLikedPost(likers.some(liker => liker._id === me._id)), [me._id, likers]);

  return (
    <Wrapper>
      <button type="button" onClick={onClickPostLikeButton(isLikedPost)} className="post-card-buttons-heart">
        <Icon width={24} height={24} shape="heart" $fill={isLikedPost} fill="var(--heart-color)" />
      </button>
      <Icon width={24} height={24} shape="comment" className="post-card-buttons-comment" />
      <Icon width={24} height={24} shape="airplane" className="post-card-buttons-airplane" />
      <div className="post-card-buttons-empty-place" />
      <Icon width={24} height={24} shape="bookmark" className="post-card-buttons-bookmark" />
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
  onClickPostLikeButton: Proptypes.func.isRequired,
};

export default PostCardButtons;
