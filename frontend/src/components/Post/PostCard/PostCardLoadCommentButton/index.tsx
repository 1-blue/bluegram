import React from "react";
import { useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// common-components
import Spinner from "@src/components/common/Spinner";

// type
import type { ICommentWithUserAndLikerAndCountAndRecomments } from "@src/type";
import type { PostState } from "@src/store/reducers";

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
  const { loadCommentsLoading } = useSelector(
    ({ post }: { post: PostState }) => post
  );
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

      {loadCommentsLoading && <Spinner kinds="page" />}
    </Wrapper>
  );
};

export default PostCardLoadCommentButton;
