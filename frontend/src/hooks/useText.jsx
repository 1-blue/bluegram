/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 간단한 텍스트 hook
 */

import React, { useCallback, useState } from "react";

const useText = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = useCallback(e => setValue(e.target.value), []);

  return [value, onChangeValue, setValue];
};

export default useText;
