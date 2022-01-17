/**
 * 생성일: 2022/01/17
 * 수정일: -
 * 작성자: 1-blue
 *
 * 답글 더 불러오기 버튼
 */

import React from "react";
import { useSelector } from "react-redux";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Spinner from "@components/common/Spinner";

const PostCardLoadRecommentButton = ({ allRecommentCount, Recomments, onClickloadMoreRecomment, CommentId }) => {
  const { loadRecommentsLoading } = useSelector(state => state.post);

  return (
    <Wrapper>
      <button
        type="button"
        onClick={onClickloadMoreRecomment(
          Recomments[Recomments.length - 1].content ? Recomments[Recomments.length - 1]._id : null,
          CommentId,
        )}
        className="post-card-load-more-recomment-button"
      >
        답글
        {allRecommentCount === Recomments.length ? allRecommentCount : allRecommentCount - Recomments.length}개 더
        불러오기
      </button>

      {loadRecommentsLoading && <Spinner $page />}
    </Wrapper>
  );
};

PostCardLoadRecommentButton.propTypes = {
  allRecommentCount: Proptypes.number.isRequired,
  Recomments: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
    }),
  ).isRequired,
  onClickloadMoreRecomment: Proptypes.func.isRequired,
};

export default PostCardLoadRecommentButton;
