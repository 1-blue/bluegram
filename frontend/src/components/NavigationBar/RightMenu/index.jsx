import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// components
import Icon from "@components/common/Icon";

// styled-components
import { Wrapper } from "./style";

const RightMenu = () => {
  const { me } = useSelector(state => state.auth);

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
          <li>내정보</li>
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
