// util
import { combinePhotoUrl } from "@src/libs/util";
import { MouseEvent } from "react";
import { PhotoTag, Wrapper } from "./style";

type Props = {
  photo?: string | null;
  alt?: string;
  width: number;
  height: number;
  $cover?: boolean;
  $contain?: boolean;
  $priority?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

const Avatar = ({
  photo,
  alt = "유저 아바타",
  width,
  height,
  onClick,
  ...props
}: Props) => {
  return (
    <>
      {photo && (
        <Wrapper width={width} height={height} onClick={onClick}>
          <PhotoTag
            src={combinePhotoUrl(photo)}
            layout="fill"
            alt={alt}
            {...props}
          />
        </Wrapper>
      )}
    </>
  );
};

export default Avatar;
