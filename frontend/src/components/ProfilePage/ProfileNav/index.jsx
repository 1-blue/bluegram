/**
 * 생성일: 2022/01/21
 * 수정일: 2022/01/22
 * 작성자: 1-blue
 *
 * 프로필 페이지 네비게이션 ( 유저 게시글, 유저 게시글 상세, 유저 북마크 )
 */

import React from "react";
import Link from "next/link";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";

const ProfileNav = ({ id, kinds }) => {
  return (
    <Wrapper kinds={kinds}>
      <Link href={`/profile/${id}?kinds=post`}>
        <a className="nav-list">
          <Icon width={24} height={24} shape="post" />
        </a>
      </Link>
      <Link href={`/profile/${id}?kinds=detailPost`}>
        <a className="nav-list">
          <Icon width={24} height={24} shape="airplane" />
        </a>
      </Link>
      <Link href={`/profile/${id}?kinds=bookmark`}>
        <a className="nav-list">
          <Icon width={24} height={24} shape="bookmark" />
        </a>
      </Link>
    </Wrapper>
  );
};

ProfileNav.propTypes = {
  id: Proptypes.string.isRequired,
  kinds: Proptypes.string.isRequired,
};

ProfileNav.defaultProps = {
  kinds: "post",
};

export default ProfileNav;
