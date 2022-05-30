import React from "react";

// styled-components
import { Wrapper } from "./style";

// type
import type { ICommentWithUserAndLikerAndCount } from "@src/type";

type Props = {
  allCommentCount: number;
  Recomments: ICommentWithUserAndLikerAndCount[];
  onClickloadMoreRecomment: (
    lastId: number | null,
    CommentId: number
  ) => () => void;
  CommentId: number;
};

const PostCardLoadRecommentButton = ({
  allCommentCount,
  Recomments,
  onClickloadMoreRecomment,
  CommentId,
}: Props) => {
  return (
    <Wrapper>
      <button
        type="button"
        onClick={onClickloadMoreRecomment(
          Recomments[Recomments.length - 1].content && Recomments[0].content
            ? Recomments[Recomments.length - 1]._id
            : null,
          CommentId
        )}
        className="post-card-load-more-recomment-button"
      >
        ㅡㅡㅡ 답글
        {allCommentCount === Recomments.length
          ? allCommentCount
          : allCommentCount - Recomments.length}
        개 더 불러오기
      </button>
    </Wrapper>
  );
};

export default PostCardLoadRecommentButton;
