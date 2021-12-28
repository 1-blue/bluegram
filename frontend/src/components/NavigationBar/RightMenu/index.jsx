import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// components
import Icon from "@components/common/Icon";
import Avatar from "@components/common/Avatar";
import Menu from "@components/common/Menu";
import CreatePostModal from "@components/CreatePostModal";

// styled-components
import { Wrapper } from "./style";

// action
import { localLogoutAction, resetMessageAction } from "@store/actions";

// hook
import useToggle from "@hooks/useToggle";

const RightMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { logoutDone, logoutError } = useSelector(state => state.auth);
  const [showProfileMenu, onClickShowProfileMenu, setShowProfileMenu] = useToggle(false);
  const [showCreatePostModal, onClickShowCreatePostModal, setShowCreatePostModal] = useToggle(false);

  // 2021/12/21 - 로그아웃 성공 및 실패 시 메시지 and 성공 시 리다이렉트 - by 1-blue
  useEffect(() => {
    if (!(logoutDone || logoutError)) return;
    alert(logoutDone || logoutError);

    dispatch(resetMessageAction());

    if (logoutDone) navigate("/explore");
  }, [logoutDone, logoutError]);

  // 2021/12/21 - 로그아웃 요청 - by 1-blue
  const onClickLogout = useCallback(() => {
    dispatch(localLogoutAction());
  }, []);

  // 2021/12/21 - 본인 프로필 메뉴 다른 영역 클릭시 닫기 이벤트 - by 1-blue
  const handleCloseMenu = useCallback(() => {
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
  }, [showProfileMenu]);

  // 2021/12/21 - 본인 프로필 메뉴 다른 영역 클릭시 닫기 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", handleCloseMenu);

    return () => window.removeEventListener("click", handleCloseMenu);
  }, [handleCloseMenu]);

  // 2021/12/22 - 클릭 시 게시글 생성 모달 닫기 - by 1-blue
  const onCloseCreatePostModal = useCallback(() => {
    setShowCreatePostModal(false);
  }, []);

  return (
    <Wrapper>
      {me ? (
        <>
          <li>
            <NavLink to="/">
              <Icon shape="home" width={24} height={24} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/directMessage">
              <Icon shape="airplane" width={24} height={24} />
            </NavLink>
          </li>
          <li>
            <Icon shape="postAdd" width={24} height={24} onClick={onClickShowCreatePostModal} />
            {showCreatePostModal && (
              <CreatePostModal showCreatePostModal={showCreatePostModal} onCloseModal={onCloseCreatePostModal} />
            )}
          </li>
          <li>
            <NavLink to="/explore">
              <Icon shape="compass" width={24} height={24} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <Icon shape="heart" width={24} height={24} />
            </NavLink>
          </li>
          <li>
            <Avatar
              width={30}
              height={30}
              image={me.Images[0]}
              alt="유저의 프로필 이미지"
              onClick={onClickShowProfileMenu}
            />
          </li>
          {showProfileMenu && (
            <Menu>
              <li>
                <NavLink to="/profile">
                  <Icon shape="avatar" width={20} height={20} />
                  <span>프로필</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <Icon shape="bookmark" width={20} height={20} />
                  <span>저장됨</span>
                </NavLink>
              </li>
              <li onClick={onClickLogout}>
                <span>로그아웃</span>
              </li>
            </Menu>
          )}
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">로그인</NavLink>
          </li>
          <li>
            <NavLink to="/signup">회원가입</NavLink>
          </li>
        </>
      )}
    </Wrapper>
  );
};

export default RightMenu;
