import styled, { css } from "styled-components";
import Image from "next/image";

export const Wrapper = styled.figure<{ width: number; height: number }>`
  position: relative;
  background-color: black;
  border-radius: 100%;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  cursor: pointer;
`;

export const PhotoTag = styled(Image)<{ $cover?: boolean; $contain?: boolean }>`
  border-radius: 100%;
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
