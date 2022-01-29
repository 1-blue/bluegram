/**
 * 생성일: 2022/01/15
 * 수정일: 2022/01/26
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지의 머리 부분
 * 작성자 프사, 작성자 이름, 팔로우 버튼, 게시글 옵션 버튼이 존재
 * 작성자만 삭제 권한 부여
 * 작성자 프로필 페이지 링크 추가
 * 비로그인시 접근 가능하도록 수정
 */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Button from "@components/common/Button";
import Menu from "@components/common/Menu";

// hooks
import useOpenClose from "@hooks/useOpenClose";

const PostCardHead = ({ user, onRemovePost, onClickFollowButton }) => {
  const { me, followLoading, unfollowLoading } = useSelector(state => state.user);
  const [isShowMenu, onOpenMenu, onCloseMenu] = useOpenClose();
  const [isMine, setIsMine] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  // 2022/01/18 - 본인 게시글인지 판단 - by 1-blue
  useEffect(() => setIsMine(user._id === me._id), [user._id, me]);

  // 2022/01/19 - 본인이 팔로우한 유저인지 판단 - by 1-blue
  useEffect(() => setIsFollow(me?.Followings?.some(following => following._id === user._id)), [user._id, me]);

  return (
    <Wrapper>
      <Link href={`/profile/${user._id}`}>
        <a>
          <Avatar
            width={40}
            height={40}
            image={user.Images[0]}
            alt="유저 프로필 이미지"
            $cursor
            className="post-card-head-user-avatar"
          />
        </a>
      </Link>
      <Link href={`/profile/${user._id}`}>
        <a>
          <span className="post-card-head-user-name">{user.name}</span>
        </a>
      </Link>
      {!isMine && (
        <Button
          type="button"
          className="post-card-head-follow-button"
          $follow
          loading={followLoading || unfollowLoading}
          onClick={onClickFollowButton(user._id, isFollow)}
        >
          {isFollow ? "언팔로우" : "팔로우"}
        </Button>
      )}
      <div className="post-card-head-empty-place" />
      <button type="button" className="post-card-head-option-button" onClick={onOpenMenu}>
        <Icon width={24} height={24} shape="option" />
      </button>

      {/* 댓글 옵션 메뉴 */}
      {isShowMenu && (
        <Menu $post onCloseMenu={onCloseMenu}>
          {isMine && (
            <li className="menu-list" onClick={onRemovePost}>
              삭제
            </li>
          )}
          <li className="menu-list">신고</li>
          <li className="menu-list">숨기기</li>
        </Menu>
      )}
    </Wrapper>
  );
};

PostCardHead.propTypes = {
  user: Proptypes.shape({
    _id: Proptypes.number,
    name: Proptypes.string,
    Images: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
        name: Proptypes.string,
        url: Proptypes.string,
      }),
    ),
  }).isRequired,
  onRemovePost: Proptypes.func.isRequired,
  onClickFollowButton: Proptypes.func.isRequired,
};

export default PostCardHead;
