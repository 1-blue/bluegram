/**
 * 생성일: 2022/01/22
 * 수정일: -
 * 작성자: 1-blue
 *
 * 특정 유저의 팔로워들을 보여주는 모달
 * 팔로우/언팔로우 기능 추가
 */

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Proptypes from "prop-types";

// common-component
import Modal from "@components/common/Modal";
import Avatar from "@components/common/Avatar";
import Button from "@components/common/Button";
import Spinner from "@components/common/Spinner";
import Icon from "@components/common/Icon";

const ProfileFollowerModal = ({ isOpenFollower, onCloseFollowerModal, onClickFollowButton }) => {
  const { me, Followers, followId, unfollowId, loadFollowersLoading, followLoading, unfollowLoading } = useSelector(
    state => state.user,
  );

  return (
    <>
      {isOpenFollower && Followers && (
        <Modal isOpen={isOpenFollower} onCloseModal={onCloseFollowerModal}>
          {/* 팔로워를 불러오는 중인지에 따라 스피너 처리 */}
          {loadFollowersLoading ? (
            <div className="follow-modal">
              <Spinner $page />
            </div>
          ) : (
            <ul className="follow-modal">
              {Followers.map(follower => (
                <li key={follower._id} className="follow-modal-follow-list">
                  <Link href={`/profile/${follower._id}`}>
                    <a>
                      <Avatar
                        width={30}
                        height={30}
                        image={follower.Images[0]}
                        className="follow-modal-follow-avatar"
                      />
                    </a>
                  </Link>
                  <Link href={`/profile/${follower._id}`}>
                    <a>
                      <span className="follow-modal-follow-name">{follower.name}</span>
                    </a>
                  </Link>
                  <div className="no-content" />
                  {/* 본인일 경우 팔로우/언팔로우 버튼 제거 */}
                  {me._id !== follower._id && (
                    <Button
                      type="button"
                      $follow
                      className="follow-modal-follow-button"
                      loading={
                        (followLoading || unfollowLoading) && (followId === follower._id || unfollowId === follower._id)
                      }
                      onClick={onClickFollowButton(
                        follower._id,
                        me.Followings.some(following => following._id === follower._id),
                      )}
                    >
                      {me.Followings.some(following => following._id === follower._id) ? "언팔로우" : "팔로우"}
                    </Button>
                  )}
                </li>
              ))}

              {/* 팔로워가 존재하지 않다면 */}
              {Followers.length === 0 && (
                <>
                  <li className="follow-modal-no-follow-icon">
                    <Icon width={40} height={40} shape="avatar" />
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
          )}
        </Modal>
      )}
    </>
  );
};

ProfileFollowerModal.propTypes = {
  isOpenFollower: Proptypes.bool.isRequired,
  onCloseFollowerModal: Proptypes.func.isRequired,
  onClickFollowButton: Proptypes.func.isRequired,
};

export default ProfileFollowerModal;
