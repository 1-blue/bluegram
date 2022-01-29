/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 1024px 이상일 경우 상단 네비게이션 바 우측 영역
 * 웹페이지의 각 링크
 */

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";
import Avatar from "@components/common/Avatar";

const RightMenu = ({ onClickProfileMenu, onClickCreatePostModal }) => {
  const router = useRouter();
  const { me } = useSelector(state => state.user);
  const { showCreatePostModal } = useSelector(state => state.post);

  return (
    <Wrapper>
      {/* 로그인 상태일 경우 */}
      {me._id ? (
        <>
          <Link href="/">
            <a className="nav-link">
              <Icon shape="home" width={24} height={24} $fill={!showCreatePostModal && router.pathname === "/"} />
            </a>
          </Link>
          <Link href="/dm">
            <a className="nav-link">
              <Icon
                shape="airplane"
                width={24}
                height={24}
                $fill={!showCreatePostModal && router.pathname.startsWith("/dm")}
              />
            </a>
          </Link>
          <i className="nav-link" onClick={onClickCreatePostModal}>
            <Icon shape="postAdd" width={24} height={24} $fill={showCreatePostModal} />
          </i>
          <Link href="/notice">
            <a className="nav-link">
              <Icon
                shape="heart"
                width={24}
                height={24}
                $fill={!showCreatePostModal && router.pathname.startsWith("/notice")}
              />
            </a>
          </Link>
          <Avatar
            width={30}
            height={30}
            image={me.Images[0]}
            alt="유저의 프로필 이미지"
            $cursor
            onClick={onClickProfileMenu}
          />
        </>
      ) : (
        // 비로그인 상태일 경우
        <>
          <Link href="/login">
            <a className="nav-link">로그인</a>
          </Link>
          <Link href="/signup">
            <a className="nav-link">회원가입</a>
          </Link>
        </>
      )}
    </Wrapper>
  );
};

RightMenu.propTypes = {
  onClickProfileMenu: PropTypes.func.isRequired,
  onClickCreatePostModal: PropTypes.func.isRequired,
};

export default RightMenu;
