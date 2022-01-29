/**
 * 생성일: 2022/01/16
 * 수정일: -
 * 작성자: 1-blue
 *
 * 메뉴같은거 open과 close 함수 둘 다 제공하는 훅
 */

import React, { useCallback, useState } from "react";

const useOpenClose = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const onOpen = useCallback(() => setValue(true), []);
  const onClose = useCallback(() => setValue(false), []);

  return [value, onOpen, onClose, setValue];
};

export default useOpenClose;
