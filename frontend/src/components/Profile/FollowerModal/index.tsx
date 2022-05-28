import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// common-component
import Modal from "@src/components/common/Modal";
import Avatar from "@src/components/common/Avatar";
import Button from "@src/components/common/Button";
import Spinner from "@src/components/common/Spinner";
import Icon from "@src/components/common/Icon";

// type
import { ICON } from "@src/type";
import type { UserState } from "@src/store/reducers";

type Props = {
  isOpenFollowingModal: boolean;
  onToggleFollowerModal: () => void;
  onClickFollowButton: (UserId?: number, isFollow?: boolean) => void;
};

const FollowerModal = ({
  isOpenFollowingModal,
  onToggleFollowerModal,
  onClickFollowButton,
}: Props) => {
  const {
    me,
    Followers,
    loadFollowersLoading,
    followLoading,
    unfollowLoading,
  } = useSelector(({ user }: { user: UserState }) => user);

  return (
    <>
      {isOpenFollowingModal && Followers && (
        <Modal
          isOpen={isOpenFollowingModal}
          onCloseModal={onToggleFollowerModal}
        >
          {/* 팔로워를 불러오는 중인지에 따라 스피너 처리 */}
          <ul className="follow-modal">
            {Followers.map((follower) => (
              <li key={follower._id} className="follow-modal-follow-list">
                <Link href={`/profile/${follower._id}`}>
                  <a>
                    <Avatar
                      width={30}
                      height={30}
                      photo={follower.Photos?.[0].name}
                      style={{ marginRight: "10px" }}
                    />
                  </a>
                </Link>
                <Link href={`/profile/${follower._id}`}>
                  <a>
                    <span className="follow-modal-follow-name">
                      {follower.name}
                    </span>
                  </a>
                </Link>
                <div className="no-content" />
                {/* 본인일 경우 팔로우/언팔로우 버튼 제거 */}
                {me?._id !== follower._id && (
                  <Button
                    type="button"
                    $follow
                    className="follow-modal-follow-button"
                    loading={followLoading || unfollowLoading}
                    spinnerColor="cornflowerblue"
                    onClick={onClickFollowButton(
                      follower._id,
                      me?.Followings?.some(
                        (following) => following._id === follower._id
                      )
                    )}
                    contents={
                      me?.Followings?.some(
                        (following) => following._id === follower._id
                      )
                        ? "언팔로우"
                        : "팔로우"
                    }
                  />
                )}
              </li>
            ))}

            {/* 팔로워가 존재하지 않다면 */}
            {Followers.length === 0 && (
              <>
                <li className="follow-modal-no-follow-icon">
                  <Icon width={40} height={40} icon={ICON.AVATAR} />
                </li>
                <li className="follow-modal-no-follow-title">
                  <span>팔로잉</span>
                </li>
                <li className="follow-modal-no-follow-description">
                  <span>회원님을 팔로우하는 사람이 존재하지 않습니다.</span>
                </li>
              </>
            )}
          </ul>
        </Modal>
      )}

      {loadFollowersLoading && <Spinner kinds="page" />}
    </>
  );
};

export default FollowerModal;
