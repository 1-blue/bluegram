/**
 * 생성일: 2022/01/20
 * 수정일: -
 * 작성자: 1-blue
 *
 * 해시태그 검색 및 페이지 최상단 이동 버튼
 */

import React, { useCallback } from "react";
import { useRouter } from "next/router";

// styled-components
import { Wrapper } from "./style";

// common-components
import Icon from "@components/common/Icon";
import Modal from "@components/common/Modal";
import Button from "@components/common/Button";

// hooks
import useOpenClose from "@hooks/useOpenClose";
import useInput from "@hooks/useInput";

const SideBar = () => {
  const router = useRouter();
  const [isOpenSearch, onOpenSearchModal, onCloseSearchModal] = useOpenClose(false);
  const [text, onChangeText, setText] = useInput("");

  // 2022/01/20 - 검색 시 해시태그 페이지로 이동 및 초기화 - by 1-blue
  const onSearch = useCallback(
    e => {
      e.preventDefault();

      if (!text.trim()) return alert("검색어를 입력해주세요!");

      setText("");
      onCloseSearchModal();
      router.push(`/hashtag/${text}`);
    },
    [text, setText, onCloseSearchModal, router],
  );

  // 2022/01/20 - 페이지 최상단으로 이동 - by 1-blue
  const onMoveScrollTop = useCallback(() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }), []);

  return (
    <Wrapper>
      <button type="button" className="side-bar-button" onClick={onOpenSearchModal}>
        <Icon shape="search" width={20} height={20} fill="white" />
      </button>
      <button type="button" className="side-bar-button" onClick={onMoveScrollTop}>
        <Icon shape="arrowTop" width={20} height={20} fill="white" />
      </button>

      {/* 해시태그 검색 메뉴 */}
      {isOpenSearch && (
        <Modal isOpen={isOpenSearch} onCloseModal={onCloseSearchModal}>
          <form autoComplete="on" onSubmit={onSearch} className="modal-search-form">
            <label htmlFor="search" hidden>
              해시태그 검색
            </label>
            <input
              id="search"
              name="search"
              type="search"
              placeholder="해시태그를 입력해 주세요."
              value={text}
              onChange={onChangeText}
              className="modal-search-input"
              autoFocus
            />
            <Button type="submit" $search>
              <Icon shape="search" width={20} height={20} fill="white" />
            </Button>
          </form>
        </Modal>
      )}
    </Wrapper>
  );
};

export default SideBar;
