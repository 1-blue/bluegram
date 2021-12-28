import React from "react";
import Proptypes from "prop-types";

// components
import Avatar from "@components/common/Avatar";
import Icon from "@components/common/Icon";
import Dialog from "@components/common/Dialog";

// hook
import useOpenClose from "@hooks/useOpenClose";

// styled-component
import { Wrapper } from "./style";

const PostHead = ({ image, name, className, isMine, onRemovePost }) => {
  const [showDialog, onOpenDialog, onCloseDialog] = useOpenClose(false);

  return (
    <Wrapper className={className}>
      <Avatar width={40} height={40} src={image.name ? process.env.IMAGE_URL + "/" + image.name : image.url} />
      <span className="post-head-username">{name}</span>
      <button type="button" className="post-conent-head-follow-button">
        팔로우
      </button>
      <Icon shape="option" fill="gray" hoverfill="black" onClick={onOpenDialog} />

      {showDialog && (
        <Dialog onClose={onCloseDialog} showDialog={showDialog}>
          {isMine ? (
            <>
              <li onClick={onRemovePost}>삭제</li>
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
  image: Proptypes.shape({
    _id: Proptypes.number,
    name: Proptypes.string,
  }).isRequired,
  name: Proptypes.string.isRequired,
  className: Proptypes.string.isRequired,
  isMine: Proptypes.bool.isRequired,
  onRemovePost: Proptypes.func.isRequired,
};

export default PostHead;
