/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/16
 * 작성자: 1-blue
 *
 * 1024px 이상일 경우 상단 네비게이션 바 + 프로필 메뉴
 * 게시글 생성 모달 open 함수 추가
 * 메뉴 컴포넌트 수정에 따라 코드 수정
 */

import React, { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

// styled-components
import { Wrapper } from "./style";

// common-components
import Menu from "@components/common/Menu";
import Icon from "@components/common/Icon";

// components
import NavLeft from "./NavLeft";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";

// action
import { resetMessageAction, localLogoutAction, openCreatePostModalAction } from "@store/actions";

// hook
import useOpenClose from "@hooks/useOpenClose";

const TopNavigationBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { logoutDone, logoutError } = useSelector(state => state.auth);
  const { me } = useSelector(state => state.user);
  const [isShowMenu, onOpenMenu, onCloseMenu] = useOpenClose(false);
  const profileRef = useRef(null);
  const bookmarkRef = useRef(null);

  // 2021/12/21 - 로그아웃 요청 - by 1-blue
  const onClickLogout = useCallback(() => dispatch(localLogoutAction()), []);

  // 2021/12/21 - 로그아웃 성공/실패 시 메시지 and 리다이렉트 - by 1-blue
  useEffect(() => {
    if (!(logoutDone || logoutError)) return;
    alert(logoutDone || logoutError);

    dispatch(resetMessageAction());

    if (logoutDone) router.push("/");
  }, [logoutDone, logoutError]);

  // 2022/01/14 - 게시글 생성 모달 클릭 - by 1-blue
  const onClickCreatePostModal = useCallback(() => dispatch(openCreatePostModalAction()), []);

  return (
    <Wrapper>
      <NavLeft />
      <NavCenter />
      <NavRight onClickProfileMenu={onOpenMenu} onClickCreatePostModal={onClickCreatePostModal} />

      {/* 프로필 메뉴 */}
      {isShowMenu && (
        <Menu $profile onCloseMenu={onCloseMenu}>
          <li onClick={() => profileRef.current.click()} className="menu-list">
            <Link href={`/profile/${me._id}`}>
              <a ref={profileRef} className="nav-menu-link">
                <Icon shape="avatar" width={20} height={20} />
                <span className="menu-text">프로필</span>
              </a>
            </Link>
          </li>
          <li onClick={() => bookmarkRef.current.click()} className="menu-list">
            <Link href={`/profile/${me._id}/bookmark`}>
              <a ref={bookmarkRef} className="nav-menu-link">
                <Icon shape="bookmark" width={20} height={20} />
                <span className="menu-text">저장됨</span>
              </a>
            </Link>
          </li>
          <li onClick={onClickLogout} className="menu-list">
            <span className="menu-text">로그아웃</span>
          </li>
        </Menu>
      )}
    </Wrapper>
  );
};

export default TopNavigationBar;
