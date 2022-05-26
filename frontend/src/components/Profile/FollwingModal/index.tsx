import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// common-component
import Avatar from "@src/components/common/Avatar";
import Button from "@src/components/common/Button";
import Spinner from "@src/components/common/Spinner";
import Icon from "@src/components/common/Icon";
import Rename from "@src/components/common/Rename";

// type
import { ICON } from "@src/type";
import type { UserState } from "@src/store/reducers";

type Props = {
  isOpenFollowingModal: boolean;
  onToggleFollowingModal: () => void;
  onClickFollowButton: (UserId: number, isFollow: boolean) => void;
};

const FollowingModal = ({
  isOpenFollowingModal,
  onToggleFollowingModal,
  onClickFollowButton,
}: Props) => {
  const {
    me,
    Followings,
    loadFollowingsLoading,
    followLoading,
    unfollowLoading,
  } = useSelector(({ user }: { user: UserState }) => user);

  return (
    <>
      {isOpenFollowingModal && Followings && (
        <Rename
          isOpen={isOpenFollowingModal}
          onCloseModal={onToggleFollowingModal}
        >
          {/* 팔로잉를 불러오는 중인지에 따라 스피너 처리 */}
          <ul className="follow-modal">
            {Followings?.map((following) => (
              <li key={following._id} className="follow-modal-follow-list">
                <Link href={`/profile/${following._id}`}>
                  <a>
                    <Avatar
                      width={30}
                      height={30}
                      photo={following.Photos?.[0].name}
                      style={{ marginRight: "10px" }}
                    />
                  </a>
                </Link>
                <Link href={`/profile/${following._id}`}>
                  <a>
                    <span className="follow-modal-follow-name">
                      {following.name}
                    </span>
                  </a>
                </Link>
                <div className="no-content" />
                {/* 본인일 경우 팔로우/언팔로우 버튼 제거 */}
                {me?._id !== following._id && (
                  <Button
                    type="button"
                    $follow
                    className="follow-modal-follow-button"
                    loading={followLoading || unfollowLoading}
                    spinnerColor="cornflowerblue"
                    onClick={onClickFollowButton(
                      following._id,
                      me?.Followings?.some(
                        (meFollowing) => meFollowing._id === following._id
                      ) || false
                    )}
                    contents={
                      me?.Followings?.some(
                        (meFollowing) => meFollowing._id === following._id
                      )
                        ? "언팔로우"
                        : "팔로우"
                    }
                  />
                )}
              </li>
            ))}

            {/* 팔로잉이 존재하지 않다면 */}
            {Followings.length === 0 && (
              <>
                <li className="follow-modal-no-follow-icon">
                  <Icon width={40} height={40} icon={ICON.AVATAR} />
                  <span>아바타</span>
                </li>
                <li className="follow-modal-no-follow-title">
                  <span>팔로잉</span>
                </li>
                <li className="follow-modal-no-follow-description">
                  <span>회원님이 팔로우하는 사람이 존재하지 않습니다.</span>
                </li>
              </>
            )}
          </ul>
        </Rename>
      )}

      {loadFollowingsLoading && <Spinner kinds="page" />}
    </>
  );
};

export default FollowingModal;
