/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/14
 * 작성자: 1-blue
 *
 * 1024px 이상일 경우 상단 네비게이션 바 + 프로필 메뉴
 * 게시글 생성 모달 open 함수 추가
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
import useToggle from "@hooks/useToggle";

const TopNavigationBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { logoutDone, logoutError } = useSelector(state => state.auth);
  const { me } = useSelector(state => state.user);
  const [profileMenu, onClickProfileMenu, setProfileMenu] = useToggle(false);
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

  // 2021/12/21 - 본인 프로필 메뉴 다른 영역 클릭시 닫기 이벤트 - by 1-blue
  const handleCloseMenu = useCallback(() => {
    if (profileMenu) setProfileMenu(false);
  }, [profileMenu]);

  // 2021/12/21 - 본인 프로필 메뉴 다른 영역 클릭시 닫기 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", handleCloseMenu);

    return () => window.removeEventListener("click", handleCloseMenu);
  }, [handleCloseMenu]);

  // 2022/01/14 - 게시글 생성 모달 클릭 - by 1-blue
  const onClickCreatePostModal = useCallback(() => dispatch(openCreatePostModalAction()), []);

  return (
    <Wrapper>
      <NavLeft />
      <NavCenter />
      <NavRight onClickProfileMenu={onClickProfileMenu} onClickCreatePostModal={onClickCreatePostModal} />

      {/* 프로필 메뉴 */}
      {profileMenu && (
        <Menu $profile>
          <li onClick={() => profileRef.current.click()}>
            <Link href={`/profile/${me._id}`}>
              <a ref={profileRef}>
                <Icon shape="avatar" width={20} height={20} />
                <span>프로필</span>
              </a>
            </Link>
          </li>
          <li onClick={() => bookmarkRef.current.click()}>
            <Link href={`/profile/${me._id}/bookmark`}>
              <a ref={bookmarkRef}>
                <Icon shape="bookmark" width={20} height={20} />
                <span>저장됨</span>
              </a>
            </Link>
          </li>
          <li onClick={onClickLogout}>
            <span>로그아웃</span>
          </li>
        </Menu>
      )}
    </Wrapper>
  );
};

export default TopNavigationBar;
