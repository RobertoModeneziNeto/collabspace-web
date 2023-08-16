import { css, styled } from "styled-components";

interface ContaineProps {
  $borderEffect?: boolean;
}

export const Container = styled.img<ContaineProps>`
  width: 56px;
  height: 56px;
  min-height: 56px;
  min-width: 56px;
  background: white;
  border-radius: 6px;
  object-fit: cover;

  ${({ $borderEffect }) =>
    $borderEffect &&
    css`
      border: 3px solid var(--zinc-800);
      box-shadow: 0px 0px 1px 2px var(--emerald-500);
    `}
`;
