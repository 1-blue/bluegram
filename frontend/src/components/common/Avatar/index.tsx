// type
import type { CSSProperties, MouseEvent } from "react";

// util
import { combinePhotoUrl } from "@src/libs/util";

// style
import { PhotoTag, Wrapper } from "./style";

type Props = {
  photo?: string | null;
  width: number;
  height: number;
  style?: CSSProperties;
  alt?: string;
  $cover?: boolean;
  $contain?: boolean;
  $priority?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

const Avatar = ({
  photo,
  alt = "유저 아바타",
  style,
  width,
  height,
  onClick,
  ...props
}: Props) => {
  return (
    <>
      {photo ? (
        <Wrapper width={width} height={height} onClick={onClick} style={style}>
          <PhotoTag
            src={combinePhotoUrl(photo)}
            layout="fill"
            alt={alt}
            {...props}
          />
        </Wrapper>
      ) : (
        <Wrapper width={width} height={height} onClick={onClick} style={style}>
          <PhotoTag src={`/avatar.png`} layout="fill" alt={alt} {...props} />
        </Wrapper>
      )}
    </>
  );
};

export default Avatar;
