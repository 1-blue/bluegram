/**
 * 생성일: 2022/01/13
 * 수정일: -
 * 작성자: 1-blue
 *
 * 간단한 텍스트 hook ( 공백 불가능 )
 */

import React, { useCallback, useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = useCallback(e => setValue(e.target.value.trim()), []);

  return [value, onChangeValue, setValue];
};

export default useInput;
