// 2021/12/22 토글버튼 state by 1-blue

import React, { useCallback, useState } from "react";

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const onChnageValue = useCallback(e => {
    setValue(prev => !prev);
  }, []);

  return [value, onChnageValue, setValue];
};

export default useToggle;
