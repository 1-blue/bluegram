/* eslint-disable prettier/prettier */

/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 사용하는 모든 아이콘 ( props를 이용해서 종류, 크기, 색상 지정함 )
 */

import React from "react";
import Proptypes from "prop-types";

// assets
import {
  Logo,
  Home, FillHome,
  PostAdd, FillPostAdd,
  Compass, FillCompass,
  Heart, FillHeart,
  BookMark, FillBookMark,
  Comment, FillComment,
  Airplane, FillAirplane,
  Avatar, FillAvatar,
  Images,
  Play,
  Option,
  Post,
  Tag,
  Login,FillLogin,
  Signup,FillSignup,
  Search,
  ArrowTop,
  PostDetail,
} from "@assets/icon";

// styled-component
import { Wrapper } from "./style";

const Icon = React.forwardRef(({$fill, ...props}, iconRef) => {
  switch (props.shape) {
    case "logo":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Logo {...props} />
        </Wrapper>
      );
    case "home":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          {$fill ? <FillHome {...props} /> : <Home {...props} />}
        </Wrapper>
      );
    case "postAdd":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          {$fill ? <FillPostAdd {...props} /> : <PostAdd {...props} />}
        </Wrapper>
      );
    case "compass":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          {$fill ? <FillCompass {...props} /> : <Compass {...props} />}
        </Wrapper>
      );
    case "heart":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          {$fill ? <FillHeart {...props} /> : <Heart {...props} />}
        </Wrapper>
      );
    case "bookmark":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          {$fill ? <FillBookMark {...props} /> : <BookMark {...props} />}
        </Wrapper>
      );
    case "comment":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          {$fill ? <FillComment {...props} /> : <Comment {...props} />}
        </Wrapper>
      );
    case "airplane":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          {$fill ? <FillAirplane {...props} /> : <Airplane {...props} />}
        </Wrapper>
      );
    case "avatar":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          {$fill ? <FillAvatar {...props} /> : <Avatar {...props} />}
        </Wrapper>
      );
    case "images":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Images {...props} />
        </Wrapper>
      );
    case "play":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Play {...props} />
        </Wrapper>
      );
    case "option":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Option {...props} />
        </Wrapper>
      );
    case "post":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Post {...props} />
        </Wrapper>
      );
    case "tag":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Tag {...props} />
        </Wrapper>
      );
    case "login":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Login {...props} />
        </Wrapper>
      );
    case "fillLogin":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillLogin {...props} />
        </Wrapper>
      );
    case "signup":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Signup {...props} />
        </Wrapper>
      );
    case "fillSignup":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillSignup {...props} />
        </Wrapper>
      );
    case "search":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Search {...props} />
        </Wrapper>
      );
    case "arrowTop":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <ArrowTop {...props} />
        </Wrapper>
      );
    case "postDetail":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <PostDetail {...props} />
        </Wrapper>
      );

    default:
      return (
        <Wrapper>
          <Avatar />
        </Wrapper>
      );
  }
});

Icon.propTypes = {
  shape: Proptypes.string,
  width: Proptypes.number,
  height: Proptypes.number,
  fill: Proptypes.string,
  onClick: Proptypes.func,
  hoverfill: Proptypes.string,
  animation: Proptypes.string,
  $fill: Proptypes.bool,
};

Icon.defaultProps = {
  shape: "avatar",
  width: 24,
  height: 24,
  color: "black",
  onClick: null,
  hoverfill: null,
  animation: null,
  $fill: false,
};

export default Icon;
