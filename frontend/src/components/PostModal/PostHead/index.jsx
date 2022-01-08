import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

// components
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Dialog from "@components/common/Dialog";
import Spinner from "@components/common/Spinner";

// hook
import useOpenClose from "@hooks/useOpenClose";

// styled-component
import { Wrapper } from "./style";

const PostHead = ({ me, post, className, onRemovePost, onFollow }) => {
  const [showDialog, onOpenDialog, onCloseDialog] = useOpenClose(false);
  // 2021/12/30 - 로그인한 유저가 게시글 작성자를 팔로우했는지 여부 - by 1-blue
  const isFollow = me.Followings.some(following => following._id === post.User._id);
  const { followLoading, unfollowLoading } = useSelector(state => state.user);

  return (
    <Wrapper className={className}>
      <Link to={`/profile/${post.User._id}/post`}>
        <Avatar width={40} height={40} image={post.User.Images[0]} />
      </Link>
      <span className="post-head-username">{post.User.name}</span>
      {post.User._id === me._id || (
        <button type="button" className="post-conent-head-follow-button" onClick={onFollow(isFollow, post.User._id)}>
          {followLoading || unfollowLoading ? <Spinner button /> : isFollow ? "언팔로우" : "팔로우"}
        </button>
      )}
      <Icon shape="option" fill="gray" hoverfill="black" onClick={onOpenDialog} />
      {showDialog && (
        <Dialog onClose={onCloseDialog} showDialog={showDialog}>
          {post.User._id === me._id ? (
            <>
              <li onClick={onRemovePost} className="post-delete-button">
                삭제
              </li>
              <li>수정</li>
            </>
          ) : (
            <>
              <li>신고</li>
            </>
          )}
        </Dialog>
      )}
    </Wrapper>
  );
};

PostHead.propTypes = {
  me: Proptypes.shape({
    _id: Proptypes.number,
    name: Proptypes.string,
    provider: Proptypes.oneOfType([Proptypes.node, Proptypes.string]),
    createdAt: Proptypes.string,
    Images: Proptypes.arrayOf(Proptypes.object),
    Posts: Proptypes.arrayOf(Proptypes.object),
    Followers: Proptypes.arrayOf(Proptypes.object),
    Followings: Proptypes.arrayOf(Proptypes.object),
  }),
  post: Proptypes.shape({
    _id: Proptypes.number,
    content: Proptypes.string,
    createdAt: Proptypes.string,
    User: Proptypes.object,
    Images: Proptypes.arrayOf(Proptypes.object),
    Comments: Proptypes.arrayOf(Proptypes.object),
    PostLikers: Proptypes.arrayOf(Proptypes.object),
  }),
  className: Proptypes.string.isRequired,
  onRemovePost: Proptypes.func.isRequired,
  onFollow: Proptypes.func.isRequired,
};

export default PostHead;
