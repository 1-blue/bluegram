/**
 * 생성일: 2022/01/15
 * 수정일: -
 * 작성자: 1-blue
 *
 * 상세 게시글 페이지의 내용 부분
 * 한 줄 이상일 경우 "...더보기" 버튼 추가
 * 해시태그 존재 시 해시태그 링크 추가
 */

import React from "react";
import Link from "next/link";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const PostCardContent = ({ content }) => {
  const [splitContent] = useState(content.split("\n"));
  const [isMultiline, setIsMultiline] = useState(false);

  // 2022/01/15 - 한 줄인지 여러 줄인지 계산 ( 굳이 없어도 되지만 이게 읽기 더 좋을 것 같음 ) - by 1-blue
  useEffect(() => (splitContent.length > 1 ? setIsMultiline(true) : setIsMultiline(false)), [splitContent]);

  // 2022/01/15 - 더 보기 버튼 클릭 이벤트 - by 1-blue
  const onClickMoreButton = useCallback(() => setIsMultiline(false), [setIsMultiline]);

  // 2022/01/15 - 문장에 해시태그 존재하면 링크 처리 - by 1-blue
  const preprocessHashtag = useCallback(contents => {
    return contents.split(/(#[^\s#]+)/gm).map(text => {
      if (text[0] !== "#") return text;

      return (
        <Link key={text} href={`/hashtag/${encodeURI(text.substr(1, text.length))}`}>
          <a className="post-card-content-hashtag">{text}</a>
        </Link>
      );
    });
  }, []);

  return (
    <Wrapper>
      <pre className="post-card-content-text">
        {isMultiline ? preprocessHashtag(splitContent[0]) : preprocessHashtag(content)}
      </pre>
      {isMultiline && (
        <button type="button" onClick={onClickMoreButton}>
          ...더보기
        </button>
      )}
    </Wrapper>
  );
};

PostCardContent.propTypes = {
  content: Proptypes.string.isRequired,
};

export default PostCardContent;
