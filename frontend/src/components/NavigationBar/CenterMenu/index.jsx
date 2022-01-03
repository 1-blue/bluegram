import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// hook
import useInput from "@hooks/useInput";

// components
import SearchInput from "@components/common/SearchInput";

const CenterMenu = () => {
  const [text, onChangeText, setText] = useInput("");
  const navigate = useNavigate();

  const onKeyDown = useCallback(
    e => {
      if (e.keyCode !== 13) return;

      navigate(`/hashtag/${encodeURI(text)}`);
      setText("");
    },
    [text],
  );

  return (
    <SearchInput type="search" placeholder="해시태그 검색" value={text} onChange={onChangeText} onKeyDown={onKeyDown} />
  );
};

export default CenterMenu;
