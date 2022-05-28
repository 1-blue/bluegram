import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// icon
import Icon from "@src/components/common/Icon";

// type
import { ICON } from "@src/type";

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  input[type="search"] {
    padding: 8px;
    outline: none;
    border: ${({ theme }) => theme.color.main} 2px solid;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
  }
  button[type="submit"] {
    padding: 8px;
    background-color: ${({ theme }) => theme.color.main};
    color: white;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

type SearchForm = {
  word: string;
};

const CenterMenu = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<SearchForm>();

  // 2022/05/18 - 해시태그 검색 - by 1-blue
  const onSearch = useCallback(
    ({ word }: SearchForm) => {
      router.push(`/hashtag/${encodeURI(word)}`);
      reset();
    },
    [router, reset]
  );

  return (
    <Wrapper onSubmit={handleSubmit(onSearch)}>
      <input type="search" placeholder="해시태그 검색" {...register("word")} />
      <button type="submit">
        <Icon icon={ICON.SEARCH} width={19} height={19} />
      </button>
    </Wrapper>
  );
};

export default CenterMenu;
