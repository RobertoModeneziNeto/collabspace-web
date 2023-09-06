import { styled } from "styled-components";

interface ContaineProps {
  $size: string;
}

export const Container = styled.img<ContaineProps>`
  display: block;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 100%;

  object-fit: cover;

  cursor: pointer;
`;
