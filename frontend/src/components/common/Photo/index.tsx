// util
import { combinePhotoUrl } from "@src/libs/util";

// style
import { PhotoTag, Wrapper } from "./style";

type Props = {
  photo?: string | null;
  alt?: string;
  $cover?: boolean;
  $contain?: boolean;
  $priority?: boolean;
  $priview?: boolean;
};

const Photo = ({ photo, alt = "이미지", $priview, ...props }: Props) => {
  return (
    <>
      {photo && (
        <Wrapper $priview={$priview}>
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
