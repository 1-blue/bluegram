/* eslint-disable prettier/prettier */

import React from "react";
import Proptypes from "prop-types";

// assets
import {
  Home, FillHome,
  PostAdd, FillPostAdd,
  Compass, FillCompass,
  Heart, FillHeart,
  BookMark, FillBookMark,
  Comment, FillComment,
  Airplane, FillAirplane,
  Avatar,
  Images,
  Play,
} from "../../../assets/icon";

// styled-component
import { Wrapper } from "./style";

const Icon = (props) => {
  switch (props.shape) {
    case "home":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Home {...props} />
        </Wrapper>
      );
    case "fillHome":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillHome {...props} />
        </Wrapper>
      );
    case "postAdd":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <PostAdd {...props} />
        </Wrapper>
      );
    case "fillPostAdd":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillPostAdd {...props} />
        </Wrapper>
      );
    case "compass":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Compass {...props} />
        </Wrapper>
      );
    case "fillCompass":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillCompass {...props} />
        </Wrapper>
      );
    case "heart":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Heart {...props} />
        </Wrapper>
      );
    case "fillHeart":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillHeart {...props} />
        </Wrapper>
      );
    case "bookmark":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <BookMark {...props} />
        </Wrapper>
      );
    case "fillBookmark":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillBookMark {...props} />
        </Wrapper>
      );
    case "comment":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Comment {...props} />
        </Wrapper>
      );
    case "fillComment":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillComment {...props} />
        </Wrapper>
      );
    case "airplane":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Airplane {...props} />
        </Wrapper>
      );
    case "fillAirplane":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <FillAirplane {...props} />
        </Wrapper>
      );
    case "avatar":
      return (
        <Wrapper hoverfill={props.hoverfill} animation={props.animation}>
          <Avatar {...props} />
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

    default:
      return (
        <Wrapper>
          <Avatar />
        </Wrapper>
      );
  }
};

Icon.propTypes = {
  shape: Proptypes.string,
  width: Proptypes.number,
  height: Proptypes.number,
  fill: Proptypes.string,
  onClick: Proptypes.func,
  hoverfill: Proptypes.string,
  animation: Proptypes.string,
};

Icon.defaultProps = {
  shape: "avatar",
  width: 24,
  height: 24,
  color: "black",
  onClick: null,
  hoverfill: null,
  animation: null,
};

export default Icon;
