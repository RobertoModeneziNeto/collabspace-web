import { css, styled } from "styled-components";

interface ContaineProps {
  $size: string;
  $borderEffect?: boolean;
}

export const Container = styled.img<ContaineProps>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  min-height: 56px;
  min-width: 56px;
  background: white;
  border-radius: 6px;
  object-fit: cover;

  cursor: pointer;

  ${({ $borderEffect }) =>
    $borderEffect &&
    css`
      border: 3px solid var(--zinc-800);
      box-shadow: 0px 0px 1px 2px var(--emerald-500);
    `}
`;
