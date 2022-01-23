/**
 * 생성일: 2022/01/23
 * 수정일: -
 * 작성자: 1-blue
 *
 * 프로필 페이지 query(kinds)에 따라 다른 컨텐츠 보여주도록 나누는 컴포넌트
 */

import React, { useCallback } from "react";
import Proptypes from "prop-types";

// components
import ProfilePostImageCard from "./ProfilePostImageCard";
import ProfilePostCard from "./ProfilePostCard";
import ProfilePostBookmarkCard from "./ProfilePostBookmarkCard";

const ProfileContents = ({ id, kinds }) => {
  // 2022/01/21 - 내용 - by 1-blue
  const contents = useCallback(kinds => {
    switch (kinds) {
      case "post":
        return <ProfilePostImageCard id={id} />;
      case "detailPost":
        return <ProfilePostCard id={id} />;
      case "bookmark":
        return <ProfilePostBookmarkCard id={id} />;

      default:
        break;
    }
  }, []);

  return contents(kinds);
};

ProfileContents.propTypes = {
  id: Proptypes.string.isRequired,
  kinds: Proptypes.string.isRequired,
};

ProfileContents.defaultProps = {
  kinds: "post",
};

export default ProfileContents;
