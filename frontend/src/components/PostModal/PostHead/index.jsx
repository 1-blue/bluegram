// 2021/12/22 - 게시글 모달의 머리부분 ( 유저 프사, 유저 이름, 옵션버튼 ) - by 1-blue

import React from "react";
import Proptypes from "prop-types";

// components
import Avatar from "@components/common/Avatar";

// styled-component
import { Wrapper } from "./style";

const PostHead = ({ image, name }) => {
  return (
    <Wrapper>
      <Avatar width={40} height={40} src={image.name ? process.env.IMAGE_URL + "/" + image.name : image.url} />
      <span className="post-head-username">{name}</span>
      <button type="button" className="post-conent-head-follow-button">
        팔로우
      </button>
    </Wrapper>
  );
};

PostHead.propTypes = {
  image: Proptypes.shape({
    _id: Proptypes.number,
    name: Proptypes.string,
  }).isRequired,
  name: Proptypes.string.isRequired,
};

export default PostHead;
