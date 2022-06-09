import React from "react";

// styled-components
import { Wrapper } from "./style";

// utils
import { timeFormat } from "@src/libs/dateFormat";

type Props = {
  likeCount: number;
  createdAt: Date;
};

const PostCardInfo = ({ likeCount, createdAt }: Props) => {
  return (
    <Wrapper>
      <span className="post-card-info-like-count">좋아요 {likeCount}개</span>
      <span className="post-card-info-created-at">{timeFormat(createdAt)}</span>
    </Wrapper>
  );
};

export default PostCardInfo;
