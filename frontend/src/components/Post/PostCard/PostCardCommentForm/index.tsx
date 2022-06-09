import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// styled-components
import { Wrapper } from "./style";

// common-components
import Avatar from "@src/components/common/Avatar";
import Button from "@src/components/common/Button";

// type
import type { PostState, UserState } from "@src/store/reducers";

type Props = {
  text: string;
  onChangeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaResize: () => void;
  onSubmitComment: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line react/display-name
const PostCardCommentForm = forwardRef<HTMLTextAreaElement, Props>(
  (
    { text, onChangeText, textareaResize, onSubmitComment, setIsFocus },
    textareaRef
  ) => {
    const { me } = useSelector(({ user }: { user: UserState }) => user);
    const { appendCommentLoading } = useSelector(
      ({ post }: { post: PostState }) => post
    );

    return (
      <>
        {me?._id ? (
          <Wrapper onSubmit={onSubmitComment}>
            <Avatar
              width={28}
              height={28}
              photo={me?.Photos?.[0].name}
              style={{ marginRight: "10px" }}
            />

            <textarea
              value={text}
              onChange={onChangeText}
              onKeyDown={textareaResize}
              ref={textareaRef}
              rows={1}
              placeholder="댓글 달기..."
              className="post-card-form-text-area"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />

            <Button
              type="submit"
              className="post-card-comment-form-button"
              loading={appendCommentLoading}
              contents="제출"
            />

            <span className="post-card-comment-from-text-length">
              {text.trim().length} / 200
            </span>
          </Wrapper>
        ) : (
          <span
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            댓글을 입력하려면{" "}
            <Link href="/login">
              <a style={{ textDecoration: "underline" }}>로그인</a>
            </Link>
            후에 접근해주세요
          </span>
        )}
      </>
    );
  }
);

export default PostCardCommentForm;
