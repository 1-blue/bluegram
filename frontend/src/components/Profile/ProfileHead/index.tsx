import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@src/components/common/Avatar";
import Button from "@src/components/common/Button";

// type
import type { ChatState, UserState } from "@src/store/reducers";

type Props = {
  onClickFollowButton: (UserId?: number, isFollow?: boolean) => void;
  onClickLogOut: () => void;
  onClickDM: () => void;
};

const ProfileHead = ({
  onClickFollowButton,
  onClickLogOut,
  onClickDM,
}: Props) => {
  const { me, user } = useSelector(({ user }: { user: UserState }) => user);
  const { followLoading, unfollowLoading } = useSelector(
    ({ user }: { user: UserState }) => user
  );
  const { addRoomLoading } = useSelector(
    ({ chat }: { chat: ChatState }) => chat
  );
  const isMyFollower = me?.Followings?.some(
    (following) => following._id === user?._id
  );

  return (
    <Wrapper followLoading={followLoading || unfollowLoading}>
      <Avatar
        width={60}
        height={60}
        photo={user?.Photos?.[0].name}
        style={{
          marginRight: "10px",
        }}
      />
      <div className="profile-head-right-container">
        <div className="profile-head-right-top-container">
          <span className="user-name">{user?.name}</span>
          {me?._id === user?._id && (
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogOut}
            >
              로그아웃
            </button>
          )}
        </div>
        {me?._id === user?._id ? (
          <>
            <Link href={`/account/edit/${me?._id}?kinds=account`}>
              <a className="profile-edit-link">프로필 편집</a>
            </Link>
          </>
        ) : (
          <>
            <Button
              type="button"
              className="profile-follow-button"
              onClick={onClickFollowButton(user?._id, isMyFollower)}
              loading={followLoading || unfollowLoading}
              contents={isMyFollower ? "언팔로우" : "팔로우"}
            />
            <Button
              type="button"
              className="profile-dm-button"
              onClick={onClickDM}
              loading={addRoomLoading}
              contents="DM 보내기"
            />
          </>
        )}
        <p className="profile-user-introduction">{user?.introduction}</p>
      </div>
    </Wrapper>
  );
};

export default ProfileHead;
