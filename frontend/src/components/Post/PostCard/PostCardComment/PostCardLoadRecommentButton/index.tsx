import React from "react";
import { useSelector } from "react-redux";

// styled-components
import { Wrapper } from "./style";

// common-components
import Spinner from "@src/components/common/Spinner";

// type
import type { SimpleUser } from "@src/type";
import type { PostState } from "@src/store/reducers";

type Props = {
  allRecommentCount: number;
  Recomments: {
    _id: number;
    content: string;
    createdAt: Date;
    User: SimpleUser;
    CommentLikers: {
      _id: number;
      name: string;
    }[];
  }[];
  onClickloadMoreRecomment: (
    lastId: number | null,
    CommentId: number
  ) => () => void;
  CommentId: number;
};

const PostCardLoadRecommentButton = ({
  allRecommentCount,
  Recomments,
  onClickloadMoreRecomment,
  CommentId,
}: Props) => {
  // const { loadRecommentsLoading, loadCommentId } = useSelector(
  //   ({ post }: { post: PostState }) => post
  // );

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
        {allRecommentCount === Recomments.length
          ? allRecommentCount
          : allRecommentCount - Recomments.length}
        개 더 불러오기
      </button>

      {/* {loadRecommentsLoading && loadCommentId === CommentId && (
        <Spinner kinds="page" />
      )} */}
    </Wrapper>
  );
};

export default PostCardLoadRecommentButton;
