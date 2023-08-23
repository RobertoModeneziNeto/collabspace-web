import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Info = styled.div`
  h1 {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--zinc-200);
  }

  p {
    font-size: 0.875rem;
    font-weight: 200;
    color: var(--zinc-200);
  }
`;
