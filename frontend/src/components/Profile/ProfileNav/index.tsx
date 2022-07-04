import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// type
import type { RootState } from "@src/store/configureStore";

const ProfileNav = () => {
  const {
    query: { id, kinds },
  } = useRouter();
  const { me } = useSelector(({ user }: RootState) => user);

  return (
    <Wrapper kinds={(kinds as string) || "post"}>
      <Link href={`/profile/${id}?kinds=post`}>
        <a className="nav-list">
          <span>게시글</span>
        </a>
      </Link>
      <Link href={`/profile/${id}?kinds=detailPost`}>
        <a className="nav-list">
          <span>상세 게시글</span>
        </a>
      </Link>
      {me?._id === +(id as string) && (
        <Link href={`/profile/${id}?kinds=bookmark`}>
          <a className="nav-list">
            <span>북마크</span>
          </a>
        </Link>
      )}
    </Wrapper>
  );
};

export default ProfileNav;
