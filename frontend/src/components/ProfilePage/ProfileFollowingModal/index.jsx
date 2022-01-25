/**
 * 생성일: 2022/01/22
 * 수정일: 2022/01/26
 * 작성자: 1-blue
 *
 * 특정 유저의 팔로잉들을 보여주는 모달
 * 팔로우/언팔로우 기능 추가
 * 비로그인시 접근 가능하도록 수정
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

const ProfileFollowingModal = ({ isOpenFollowing, onCloseFollowingModal, onClickFollowButton }) => {
  const { me, Followings, followId, unfollowId, loadFollowingsLoading, followLoading, unfollowLoading } = useSelector(
    state => state.user,
  );

  return (
    <>
      {isOpenFollowing && Followings && (
        <Modal isOpen={isOpenFollowing} onCloseModal={onCloseFollowingModal}>
          {/* 팔로잉를 불러오는 중인지에 따라 스피너 처리 */}
          {loadFollowingsLoading ? (
            <div className="follow-modal">
              <Spinner $page />
            </div>
          ) : (
            <ul className="follow-modal">
              {Followings.map(following => (
                <li key={following._id} className="follow-modal-follow-list">
                  <Link href={`/profile/${following._id}`}>
                    <a>
                      <Avatar
                        width={30}
                        height={30}
                        image={following.Images[0]}
                        className="follow-modal-follow-avatar"
                      />
                    </a>
                  </Link>
                  <Link href={`/profile/${following._id}`}>
                    <a>
                      <span className="follow-modal-follow-name">{following.name}</span>
                    </a>
                  </Link>
                  <div className="no-content" />
                  {/* 본인일 경우 팔로우/언팔로우 버튼 제거 */}
                  {me?._id !== following._id && (
                    <Button
                      type="button"
                      $follow
                      className="follow-modal-follow-button"
                      loading={
                        (followLoading || unfollowLoading) &&
                        (followId === following._id || unfollowId === following._id)
                      }
                      onClick={onClickFollowButton(
                        following._id,
                        me?.Followings?.some(meFollowing => meFollowing._id === following._id),
                      )}
                    >
                      {me?.Followings?.some(meFollowing => meFollowing._id === following._id) ? "언팔로우" : "팔로우"}
                    </Button>
                  )}
                </li>
              ))}

              {/* 팔로잉이 존재하지 않다면 */}
              {Followings.length === 0 && (
                <>
                  <li className="follow-modal-no-follow-icon">
                    <Icon width={40} height={40} shape="avatar" />
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
          )}
        </Modal>
      )}
    </>
  );
};

ProfileFollowingModal.propTypes = {
  isOpenFollowing: Proptypes.bool.isRequired,
  onCloseFollowingModal: Proptypes.func.isRequired,
  onClickFollowButton: Proptypes.func.isRequired,
};

export default ProfileFollowingModal;
