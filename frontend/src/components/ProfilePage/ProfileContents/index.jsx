/**
 * 생성일: 2022/01/23
 * 수정일: 2022/01/27
 * 작성자: 1-blue
 *
 * 프로필 페이지 query(kinds)에 따라 다른 컨텐츠 보여주도록 나누는 컴포넌트
 * props제거... 직접 router에서 값얻어서 사용
 */

import React, { useCallback } from "react";
import { useRouter } from "next/router";

// components
import ProfilePostImageCard from "./ProfilePostImageCard";
import ProfilePostCard from "./ProfilePostCard";
import ProfilePostBookmarkCard from "./ProfilePostBookmarkCard";

const ProfileContents = () => {
  const {
    query: { id, kinds },
  } = useRouter();

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
        return <ProfilePostImageCard id={id} />;
    }
  }, []);

  return contents(kinds || "post");
};

export default ProfileContents;
