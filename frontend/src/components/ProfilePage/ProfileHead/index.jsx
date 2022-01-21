import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@components/common/Avatar";

const ProfileHead = () => {
  const { user } = useSelector(state => state.user);

  return (
    <Wrapper>
      <Avatar width={60} height={60} image={user.Images[0]} className="user-profile-image" />
      <div className="flex-container">
        <span className="user-name">{user.name}</span>
        <Link href="#">
          <a className="profile-edit-link">프로필 편집</a>
        </Link>
      </div>
    </Wrapper>
  );
};

ProfileHead.propTypes = {};

export default ProfileHead;
