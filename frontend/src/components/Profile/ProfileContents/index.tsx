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
  const contents = useCallback(
    (kinds: string) => {
      switch (kinds) {
        case "post":
          return <ProfilePostImageCard id={+(id as string)} />;
        case "detailPost":
          return <ProfilePostCard id={+(id as string)} />;
        case "bookmark":
          return <ProfilePostBookmarkCard id={+(id as string)} />;

        default:
          return <ProfilePostImageCard id={+(id as string)} />;
      }
    },
    [id]
  );

  return contents((kinds as string) || "post");
};

export default ProfileContents;
