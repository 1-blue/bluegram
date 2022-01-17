/**
 * 생성일: 2022/01/17
 * 수정일: -
 * 작성자: 1-blue
 *
 * 답글 컴포넌트
 * 답글 제거 기능
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

const PostCardRecomment = ({ recomment, onRemoveComment }) => {
  const [isShowMenu, onOpenMenu, onCloseMenu] = useOpenClose(false);

  return (
    <Wrapper className="post-card-recomment-wrapper">
      <li className="post-card-recomment">
        {/* 작성자의 프로필 이미지 */}
        <Avatar
          width={30}
          height={30}
          image={recomment.User.Images[0]}
          alt="답글 유저의 프로필 이미지"
          $cursor
          className="post-card-recomment-avatar"
        />

        {/* 답글의 컨텐츠 wrapper */}
        <div className="post-card-recomment-content-wrapper">
          {/* 작성자명, 작성내용 */}
          <div className="post-card-recomment-content">
            <span className="post-card-recomment-user-name">{recomment.User.name}</span>
            <span className="post-card-recomment-text">{recomment.content}</span>
          </div>

          {/* 답글의 추가 정보 및 버튼 */}
          <div className="post-card-recomment-info">
            <span className="post-card-recomment-created-at">{timeFormat(recomment.createdAt)}</span>
            <button type="button" className="post-card-recomment-button">
              <b>답글 달기</b>
            </button>
          </div>
        </div>

        {/* 답글 좋아요 버튼 */}
        <div className="post-card-recomment-buttons">
          <button type="button" className="post-card-recomment-option-button" onClick={onOpenMenu}>
            <Icon width={16} height={16} shape="option" />
          </button>
          <button type="button" className="post-card-recomment-heart-button">
            <Icon width={16} height={16} shape="heart" />
          </button>
        </div>

        {/* 답글 옵션 메뉴 */}
        {isShowMenu && (
          <Menu $comment onCloseMenu={onCloseMenu}>
            <li className="menu-list" onClick={onRemoveComment(recomment._id)}>
              삭제
            </li>
            <li className="menu-list">신고</li>
            <li className="menu-list">숨기기</li>
          </Menu>
        )}
      </li>
    </Wrapper>
  );
};

PostCardRecomment.propTypes = {
  recomment: Proptypes.shape({
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
    CommentLikers: Proptypes.arrayOf(
      Proptypes.shape({
        _id: Proptypes.number,
      }),
    ),
  }).isRequired,
  onRemoveComment: Proptypes.func.isRequired,
};

export default PostCardRecomment;
