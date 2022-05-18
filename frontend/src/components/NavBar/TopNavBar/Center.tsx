import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSearch)}>
      <input type="search" placeholder="해시태그 검색" {...register("word")} />
    </form>
  );
};

export default CenterMenu;
