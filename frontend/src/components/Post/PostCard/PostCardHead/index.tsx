import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@src/components/common/Avatar";
import Icon from "@src/components/common/Icon";
import Button from "@src/components/common/Button";
import Menu from "@src/components/common/Menu";

// type
import { ICON } from "@src/type";
import type { SimpleUser } from "@src/type";
import type { UserState } from "@src/store/reducers";

type Props = {
  user: SimpleUser;
  onRemovePost: () => void;
  onClickFollowButton: (UserId: number, isFollow: boolean) => () => void;
};

const PostCardHead = ({ user, onRemovePost, onClickFollowButton }: Props) => {
  const { me, followLoading, unfollowLoading } = useSelector(
    ({ user }: { user: UserState }) => user
  );
  const [isMine, setIsMine] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  // 2022/05/21 - 메뉴 토글 - by 1-blue
  const onOpenMenu = useCallback(() => setIsShowMenu(true), []);
  const onCloseMenu = useCallback(() => setIsShowMenu(false), []);

  // 2022/01/18 - 본인 게시글인지 판단 - by 1-blue
  useEffect(() => setIsMine(user._id === me?._id), [user, me]);

  // 2022/01/19 - 본인이 팔로우한 유저인지 판단 - by 1-blue
  useEffect(
    () =>
      setIsFollow(
        me?.Followings?.some((following) => following._id === user._id) || false
      ),
    [user._id, me]
  );

  return (
    <Wrapper>
      <Link href={`/profile/${user._id}`}>
        <a>
          <Avatar
            width={40}
            height={40}
            photo={user.Photos?.[0].name}
            alt="유저 프로필 이미지"
            style={{ marginRight: "10px" }}
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
          loading={followLoading || unfollowLoading}
          onClick={onClickFollowButton(user._id, isFollow)}
          contents={isFollow ? "언팔로우" : "팔로우"}
          follow
        />
      )}
      <div className="post-card-head-empty-place" />
      <button
        type="button"
        className="post-card-head-option-button"
        onClick={onOpenMenu}
      >
        <Icon width={24} height={24} icon={ICON.V_OPTION} />
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

export default PostCardHead;
