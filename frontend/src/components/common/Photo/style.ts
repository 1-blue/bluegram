import styled, { css } from "styled-components";
import Image from "next/image";

export const Wrapper = styled.figure`
  position: relative;
  background-color: black;
  border-radius: 4px;
  width: 100%;
  padding-top: 100%;
`;

export const PhotoTag = styled(Image)<{ $cover?: boolean; $contain?: boolean }>`
  border-radius: 4px;
  ${({ $cover }) =>
    $cover &&
    css`
      object-fit: cover;
    `}
  ${({ $contain }) =>
    $contain &&
    css`
      object-fit: contain;
    `}
`;
