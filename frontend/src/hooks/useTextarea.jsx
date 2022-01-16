/**
 * 생성일: 2022/01/16
 * 수정일: -
 * 작성자: 1-blue
 *
 * 입력에 따라 자동으로 줄바꿈 되는 textarea hook
 */

import React, { useState, useCallback } from "react";

const useTextarea = initValue => {
  const [input, setInput] = useState(initValue);

  const onChangeInput = useCallback(e => {
    setInput(e.target.value);
  }, []);

  // ref => textarea, height => 최소 높이
  const resize = useCallback(
    (ref, height = 1) =>
      () => {
        if (ref.current.scrollHeight > height) {
          setTimeout(() => {
            ref.current.style.height = "1px";
            ref.current.style.height = ref.current.scrollHeight + "px";
          }, 0);
        }
      },
    [],
  );

  return [input, onChangeInput, setInput, resize];
};

export default useTextarea;
