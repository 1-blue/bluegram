// util
import { combinePhotoUrl } from "@src/libs/util";
import { PhotoTag, Wrapper } from "./style";

type Props = {
  photo?: string | null;
  alt?: string;
  $cover?: boolean;
  $contain?: boolean;
  $priority?: boolean;
};

const Photo = ({ photo, alt = "이미지", ...props }: Props) => {
  return (
    <>
      {photo && (
        <Wrapper>
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

export default Photo;
