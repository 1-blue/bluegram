import React from "react";

// styled-components
import { Wrapper } from "./style";

// common-components
import Carousel from "@src/components/common/Carousel";
import Photo from "@src/components/common/Photo";

type Props = {
  photos: (string | undefined)[];
};

const PostCardImage = ({ photos }: Props) => {
  return (
    <Wrapper>
      <Carousel>
        {photos?.map((photo) => (
          <Photo key={photo} photo={photo} $contain />
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default PostCardImage;
