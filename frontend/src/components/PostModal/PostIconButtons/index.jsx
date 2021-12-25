import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";

// component
import Icon from "@components/common/Icon";

// styled-components
import { Wrapper } from "./style";

// actions
import { resetMessageAction, appendLikeToPostAction, removeLikeToPostAction } from "@store/actions";

const PostIconButtons = ({ PostId }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { post, appendLikeToPostDone, appendLikeToPostError, removeLikeToPostDone, removeLikeToPostError } =
    useSelector(state => state.post);
  const [isLiked, setIsLiked] = useState(post.Likers.some(liker => liker._id === me._id));
  const [isClickd, setIsClickd] = useState(false);

  // 2021/12/25 - 좋아요 추가 성공 시 메시지와 redirect / 좋아요 추가 실패 시 메시지 - by 1-blue
  useEffect(() => {
    if (!(appendLikeToPostDone || appendLikeToPostError)) return;
    alert(appendLikeToPostDone || appendLikeToPostError);

    dispatch(resetMessageAction());
  }, [appendLikeToPostDone, appendLikeToPostError]);

  // 2021/12/25 - 좋아요 제거 성공 시 메시지와 redirect / 좋아요 제거 실패 시 메시지 - by 1-blue
  useEffect(() => {
    if (!(removeLikeToPostDone || removeLikeToPostError)) return;
    alert(removeLikeToPostDone || removeLikeToPostError);

    dispatch(resetMessageAction());
  }, [removeLikeToPostDone, removeLikeToPostError]);

  // 2021/12/25 - 좋아요 추가/삭제 요청 - by 1-blue
  const onClickLike = useCallback(() => {
    setIsLiked(prev => !prev);
    setIsClickd(true);

    // 좋아요 제거
    if (isLiked) return dispatch(removeLikeToPostAction({ PostId }));

    // 좋아요 추가
    return dispatch(appendLikeToPostAction({ PostId }));
  }, [isLiked]);

  return (
    <Wrapper>
      <li>
        <Icon
          shape={isLiked ? "fillHeart" : "heart"}
          width={24}
          height={24}
          fill={isLiked ? "var(--heart-color)" : "black"}
          hoverfill={isLiked ? "red" : "gray"}
          onClick={onClickLike}
          animation={isClickd ? "bounce-in" : null}
        />
      </li>
      <li>
        <Icon shape="comment" width={24} height={24} hoverfill="gray" />
      </li>
      <li>
        <Icon shape="airplane" width={24} height={24} hoverfill="gray" />
      </li>
      <li>
        <Icon shape="bookmark" width={24} height={24} hoverfill="gray" />
      </li>
    </Wrapper>
  );
};

PostIconButtons.propTypes = {
  PostId: Proptypes.number.isRequired,
};

export default PostIconButtons;
