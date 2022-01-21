import React from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const ProfilePostBookmarkCard = ({ id }) => {
  return (
    <Wrapper>
      <h1>ProfilePostBookmarkCard = {id}</h1>
    </Wrapper>
  );
};

ProfilePostBookmarkCard.propTypes = {
  id: Proptypes.string.isRequired,
};

export default ProfilePostBookmarkCard;
