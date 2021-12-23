import React from "react";
import Proptypes from "prop-types";

// component
import Icon from "@components/common/Icon";

// styled-components
import { Wrapper } from "./style";

const PostIconButtons = () => {
  return (
    <Wrapper>
      <div>
        <li>
          <Icon shape="heart" medium />
        </li>
        <li>
          <Icon shape="compass" medium />
        </li>
        <li>
          <Icon shape="dm" medium />
        </li>
      </div>

      <li>
        <Icon shape="bookmark" medium />
      </li>
    </Wrapper>
  );
};

PostIconButtons.propTypes = {};

export default PostIconButtons;
