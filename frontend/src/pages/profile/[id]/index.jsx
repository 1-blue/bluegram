/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 프로필 페이지
 * 특정 유저의 프로필을 보여줄 페이지
 */

import React from "react";
import { useRouter } from "next/router";

// styled-components
import { Wrapper } from "./style";

const Profile = () => {
  const {
    query: { id: UserId },
  } = useRouter();

  return (
    <Wrapper>
      <h1>Profile - {UserId}</h1>
    </Wrapper>
  );
};
export default Profile;
