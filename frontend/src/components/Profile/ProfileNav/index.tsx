import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@src/components/common/Icon";
import { UserState } from "@src/store/reducers";
import { ICON } from "@src/type";

const ProfileNav = () => {
  const {
    query: { id, kinds },
  } = useRouter();
  const { me } = useSelector(({ user }: { user: UserState }) => user);

  return (
    <Wrapper kinds={(kinds as string) || "post"}>
      <Link href={`/profile/${id}?kinds=post`}>
        <a className="nav-list">
          {/* <Icon width={24} height={24} shape="post" /> */}
          <span>post</span>
        </a>
      </Link>
      <Link href={`/profile/${id}?kinds=detailPost`}>
        <a className="nav-list">
          {/* <Icon width={24} height={24} shape="postDetail" /> */}
          <span>postDetail</span>
        </a>
      </Link>
      {me?._id === +(id as string) && (
        <Link href={`/profile/${id}?kinds=bookmark`}>
          <a className="nav-list">
            <Icon width={24} height={24} icon={ICON.BOOKMARK} />
          </a>
        </Link>
      )}
    </Wrapper>
  );
};

export default ProfileNav;
