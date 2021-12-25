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
          <Icon shape="heart" width={24} height={24} />
        </li>
        <li>
          <Icon shape="compass" width={24} height={24} />
        </li>
        <li>
          <Icon shape="airplane" width={24} height={24} />
        </li>
      </div>

      <li>
        <Icon shape="bookmark" width={24} height={24} />
      </li>
    </Wrapper>
  );
};

PostIconButtons.propTypes = {};

export default PostIconButtons;
