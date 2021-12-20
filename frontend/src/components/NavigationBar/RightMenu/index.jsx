import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

// components
import Icon from "@components/common/Icon";
import Avatar from "@components/common/Avatar";

// styled-components
import { Wrapper } from "./style";

// action
import { localLogoutAction, resetMessageAction } from "@store/actions";

const RightMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { logoutDone, logoutError } = useSelector(state => state.auth);

  useEffect(() => {
    if (!(logoutDone || logoutError)) return;
    alert(logoutDone || logoutError);

    dispatch(resetMessageAction());

    if (logoutDone) navigate("/");
  }, [logoutDone, logoutError]);

  const onClickLogout = useCallback(() => {
    dispatch(localLogoutAction());
  }, []);

  return (
    <Wrapper>
      {me ? (
        <>
          <li>
            <NavLink to="/">
              <Icon shape="home" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <Icon shape="dm" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <Icon shape="add" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <Icon shape="find" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <Icon shape="heart" />
            </NavLink>
          </li>
          <li>
            <Avatar
              width={20}
              height={20}
              src={me.provider ? me.Images[0].url : process.env.IMAGE_URL + "/" + me.Images[0].name}
              alt="유저의 프로필 이미지"
              onClick={onClickLogout}
            />
          </li>
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
