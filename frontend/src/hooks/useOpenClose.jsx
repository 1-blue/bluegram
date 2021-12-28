import React, { useCallback, useState } from "react";

const useOpenClose = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const onOpen = useCallback(() => setValue(true), []);
  const onClose = useCallback(() => setValue(false), []);

  return [value, onOpen, onClose, setValue];
};

export default useOpenClose;
