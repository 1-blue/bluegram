/**
 * 생성일: 2022/01/15
 * 수정일: -
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지의 머리 부분
 * 작성자 프사, 작성자 이름, 팔로우 버튼, 게시글 옵션 버튼이 존재
 */

import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Button from "@components/common/Button";

const PostCardHead = ({ user }) => {
  return (
    <Wrapper>
      <Avatar
        width={40}
        height={40}
        image={user.Images[0]}
        alt="유저 프로필 이미지"
        $cursor
        className="post-card-head-user-avatar"
      />
      <span className="post-card-head-user-name">{user.name}</span>
      <Button type="button" className="post-card-head-follow-button" $follow>
        팔로우
      </Button>
      <div className="post-card-head-empty-place" />
      <button type="button" className="post-card-head-option-button">
        <Icon width={24} height={24} shape="option" />
      </button>
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
};

export default PostCardHead;
