/**
 * 생성일: 2022/01/21
 * 수정일: 2022/01/27
 * 작성자: 1-blue
 *
 * 프로필 페이지 네비게이션 ( 유저 게시글, 유저 게시글 상세, 유저 북마크 )
 * 유저 북마크 네비게이션 추가
 * props 제거하고 직접 router에서 값얻도록 수정
 */

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";

const ProfileNav = () => {
  const {
    query: { id, kinds },
  } = useRouter();
  const { me } = useSelector(state => state.user);

  return (
    <Wrapper kinds={kinds || "post"}>
      <Link href={`/profile/${id}?kinds=post`}>
        <a className="nav-list">
          <Icon width={24} height={24} shape="post" />
        </a>
      </Link>
      <Link href={`/profile/${id}?kinds=detailPost`}>
        <a className="nav-list">
          <Icon width={24} height={24} shape="postDetail" />
        </a>
      </Link>
      {me._id === +id && (
        <Link href={`/profile/${id}?kinds=bookmark`}>
          <a className="nav-list">
            <Icon width={24} height={24} shape="bookmark" />
          </a>
        </Link>
      )}
    </Wrapper>
  );
};

export default ProfileNav;
