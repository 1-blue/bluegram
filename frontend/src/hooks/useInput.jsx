import React, { useCallback, useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChnageValue = useCallback(e => {
    setValue(e.target.value.trim());
  }, []);

  return [value, onChnageValue, setValue];
};

export default useInput;
