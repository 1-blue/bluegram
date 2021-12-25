/* eslint-disable prettier/prettier */

import React from "react";
import Proptypes from "prop-types";

import {
  Home, FillHome,
  PostAdd, FillPostAdd,
  Compass, FillCompass,
  Heart, FillHeart,
  BookMark, FillBookMark,
  Comment, FillComment,
  Airplane,FillAirplane,
  Avatar,
  Images,
  Play,
} from "../../../assets/icon";

const Icon = ({ shape, width, height, color, onClick }) => {
  switch (shape) {
    case "home":
      return <Home width={width} height={height} fill={color} onClick={onClick} />;
    case "fillHome":
      return <FillHome width={width} height={height} fill={color} onClick={onClick} />;
    case "postAdd":
      return <PostAdd width={width} height={height} fill={color} onClick={onClick} />;
    case "fillPostAdd":
      return <FillPostAdd width={width} height={height} fill={color} onClick={onClick} />;
    case "compass":
      return <Compass width={width} height={height} fill={color} onClick={onClick} />;
    case "fillCompass":
      return <FillCompass width={width} height={height} fill={color} onClick={onClick} />;
    case "heart":
      return <Heart width={width} height={height} fill={color} onClick={onClick} />;
    case "fillHeart":
      return <FillHeart width={width} height={height} fill={color} onClick={onClick} />;
    case "bookmark":
      return <BookMark width={width} height={height} fill={color} onClick={onClick} />;
    case "fillBookmark":
      return <FillBookMark width={width} height={height} fill={color} onClick={onClick} />;
    case "comment":
      return <Comment width={width} height={height} fill={color} onClick={onClick} />;
    case "fillComment":
      return <FillComment width={width} height={height} fill={color} onClick={onClick} />;
    case "airplane":
      return <Airplane width={width} height={height} fill={color} onClick={onClick} />;
    case "fillAirplane":
      return <FillAirplane width={width} height={height} fill={color} onClick={onClick} />;
    case "avatar":
      return <Avatar width={width} height={height} fill={color} onClick={onClick} />;
    case "images":
      return <Images width={width} height={height} fill={color} onClick={onClick} />;
    case "play":
      return <Play width={width} height={height} fill={color} onClick={onClick} />;

    default:
      return <Avatar />;
  }
};

Icon.propTypes = {
  shape: Proptypes.string,
  width: Proptypes.bool,
  height: Proptypes.bool,
  color: Proptypes.bool,
  onClick: Proptypes.func,
};

Icon.defaultProps = {
  shape: "avatar",
  width: 24,
  height: 24,
  color: "black",
  onClick: null,
};

export default Icon;
