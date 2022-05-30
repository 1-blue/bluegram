import styled, { css } from "styled-components";
import Image from "next/image";

export const Wrapper = styled.figure<{ $priview?: boolean }>`
  position: relative;
  background-color: black;
  width: 100%;
  padding-top: 100%;

  ${({ $priview }) =>
    $priview &&
    css`
      padding: 0%;
      height: 80vh;
      max-height: 1000px;
      border-radius: 0px;

      @media (max-width: 1024px) {
        max-height: 530px;
      }
    `}
`;

export const PhotoTag = styled(Image)<{ $cover?: boolean; $contain?: boolean }>`
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
