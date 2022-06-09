import React from "react";

// styled-components
import { Wrapper } from "./style";

// type
import type { ICommentWithUserAndLikerAndCountAndRecomments } from "@src/type";

type Props = {
  Comments: ICommentWithUserAndLikerAndCountAndRecomments[];
  allCommentCount: number;
  onClickloadMoreComment: (lastId: number) => () => void;
};

const PostCardLoadCommentButton = ({
  Comments,
  allCommentCount,
  onClickloadMoreComment,
}: Props) => {
  return (
    <Wrapper>
      <button
        type="button"
        onClick={onClickloadMoreComment(Comments[Comments.length - 1]._id)}
        className="post-card-load-more-comment-button"
      >
        댓글{" "}
        {allCommentCount === Comments.length
          ? allCommentCount
          : allCommentCount - Comments.length}
        개 더 불러오기
      </button>
    </Wrapper>
  );
};

export default PostCardLoadCommentButton;
