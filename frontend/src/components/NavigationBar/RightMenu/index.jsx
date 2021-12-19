import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// components
import Icon from "@components/common/Icon";
import Avatar from "@components/common/Avatar";

// styled-components
import { Wrapper } from "./style";

const RightMenu = () => {
  const { me } = useSelector(state => state.user);

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
              src={process.env.IMAGE_URL + "/" + me.Images[0].name}
              alt="유저의 프로필 이미지"
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
