import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const useModal = (): [
  MutableRefObject<HTMLElement | null>,
  boolean,
  Dispatch<SetStateAction<boolean>>
] => {
  const modalRef = useRef<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 2022/05/18 - 영역외 클릭 시 모달 닫기 이벤트 - by 1-blue
  const handleCloseModal = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  // 2022/05/18 - 모달 닫기 이벤트 등록 - by 1-blue
  useEffect(() => {
    setTimeout(() => window.addEventListener("click", handleCloseModal), 0);
    return () => window.removeEventListener("click", handleCloseModal);
  }, [handleCloseModal]);

  return [modalRef, isOpen, setIsOpen];
};

export default useModal;
