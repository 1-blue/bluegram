import { useCallback, useEffect, useState } from "react";

// hook
import useScrollUpDown from "@src/hooks/useScrollUpDown";

// type
import { ICON } from "@src/type";

// common-component
import Icon from "@src/components/common/Icon";

// style
import { ScrollUpButton, SearchButton, SearchForm, Wrapper } from "./style";
import Modal from "../common/Modal";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type Props = {
  width: number;
};

type SearchForm = {
  word: string;
};

const SideButton = ({ width }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const onClose = useCallback(
    (e: any) => {
      if (
        e.target.nodeName === "svg" ||
        e.target.nodeName === "path" ||
        e.target.nodeName === "BUTTON"
      )
        return;

      setIsShow(false);
      setIsClicked(false);
    },
    [setIsShow, setIsClicked]
  );

  // 2022/05/28 - 영역 외 클릭 시 닫기 이벤트 등록 - by 1-blue
  useEffect(() => {
    setTimeout(() => window.addEventListener("click", onClose), 0);

    return () => window.removeEventListener("click", onClose);
  }, [onClose]);

  // 2022/05/28 - 스크롤 방향 얻기 - by 1-blue
  const [isDown] = useScrollUpDown();

  // 2022/05/28 - 해시태그 검색창 토글 - by 1-blue
  const [isOpen, setIsOpen] = useState(false);
  // 2022/05/28 - 해시태그 검색 관련 - by 1-blue
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<SearchForm>();
  // 2022/05/28 - 해시태그 검색 - by 1-blue
  const onSearch = useCallback(
    ({ word }: SearchForm) => {
      router.push(`/hashtag/${encodeURI(word)}`);
      reset();
      setIsOpen(false);
    },
    [router, reset, setIsOpen]
  );

  if (router.asPath.includes("/dm")) return null;

  return (
    <>
      <Wrapper
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => {
          if (isClicked) return;
          setIsShow(false);
        }}
        onClick={() => {
          if (isClicked) {
            setIsClicked(false);
            setIsShow(false);
          } else {
            setIsClicked(true);
            setIsShow(true);
          }
        }}
        isDown={width > 768 ? true : isDown}
      >
        <button type="button">
          <Icon icon={ICON.COG} width={36} height={36} />
        </button>
      </Wrapper>

      {isShow && (
        <>
          <ScrollUpButton
            type="button"
            isDown={width > 768 ? true : isDown}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Icon icon={ICON.UP} width={20} height={20} />
          </ScrollUpButton>
          <SearchButton
            type="button"
            isDown={width > 768 ? true : isDown}
            onClick={() => setIsOpen(true)}
          >
            <Icon icon={ICON.SEARCH} width={20} height={20} />
          </SearchButton>
        </>
      )}

      {isOpen && (
        <Modal isOpen={isOpen} onCloseModal={() => setIsOpen(false)}>
          <SearchForm onSubmit={handleSubmit(onSearch)}>
            <input
              type="search"
              placeholder="해시태그 검색"
              {...register("word")}
              autoFocus
            />
            <button type="submit">
              <Icon icon={ICON.SEARCH} width={19} height={19} />
            </button>
          </SearchForm>
        </Modal>
      )}
    </>
  );
};

export default SideButton;
