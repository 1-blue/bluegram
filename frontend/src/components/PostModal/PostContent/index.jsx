import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const PostContent = ({ content }) => {
  return (
    <Wrapper>
      <span>
        {content.split(/(#[^\s#]+)/gm).map(text => {
          if (text[0] !== "#") return text;

          return (
            <Link key={text} to={`/hashtag/${encodeURI(text.substr(1, text.length))}`} className="hashtag">
              {text}
            </Link>
          );
        })}
      </span>
    </Wrapper>
  );
};

PostContent.propTypes = {
  content: Proptypes.string.isRequired,
};

export default PostContent;
