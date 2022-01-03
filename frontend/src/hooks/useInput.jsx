import React, { useCallback, useState } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = useCallback(e => setValue(e.target.value.trim()), []);

  return [value, onChangeValue, setValue];
};

export default useInput;
