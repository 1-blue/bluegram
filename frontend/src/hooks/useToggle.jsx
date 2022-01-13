/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 간단한 토글 hook
 */

import React, { useCallback, useState } from "react";

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const onChnageValue = useCallback(() => setValue(prev => !prev), []);

  return [value, onChnageValue, setValue];
};

export default useToggle;
