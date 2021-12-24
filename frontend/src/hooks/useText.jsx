import React, { useCallback, useState } from "react";

const useText = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChnageValue = useCallback(e => setValue(e.target.value), []);

  return [value, onChnageValue, setValue];
};

export default useText;
