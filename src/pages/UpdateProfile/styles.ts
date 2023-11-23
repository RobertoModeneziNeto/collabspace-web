import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

export const Forms = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Form = styled.form`
  background: var(--zinc-800);

  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  h1 {
    color: var(--zinc-100);
    font-size: 1.5rem;
    font-weight: 500;
  }

  input[type="date"] {
    color: var(--zinc-300);
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(66.66%);
  }
`;

export const Sections = styled.div`
  width: 100%;
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0 1.5rem 0;
`;

export const Section = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  textarea {
    margin-bottom: 2rem;
    background: var(--zinc-700);
    color: var(--zinc-300);

    &::placeholder {
      color: var(--zinc-400);
    }
  }
`;

export const Label = styled.label`
  color: var(--zinc-100);
  font-weight: 300;
  margin: 1rem 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  background: var(--zinc-700);
  color: var(--zinc-300);
  font-size: 1rem;
  padding: 1.25rem 1rem;

  border-radius: 4px;
  border: 0;
  outline: 0;

  &::placeholder {
    color: var(--zinc-400);
  }

  &:focus {
    outline: 1px solid var(--emerald-500);
  }
`;

// export const Button = styled.button`
//   width: 180px;
//   height: 48px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 1.25rem 1rem;
//   border: 0;
//   outline: 0;
//   border-radius: 8px;
//   margin-top: 2rem;
//   color: var(--white);
//   font-weight: 600;
//   background: var(--emerald-500);
//   transition: all 0.15s;

//   cursor: pointer;

//   &:hover {
//     color: var(--zinc-200);
//     background: var(--emerald-600);
//   }
// `;

export const ChangePassword = styled.form`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  h1 {
    color: var(--zinc-100);
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  input {
    color: var(--zinc-300);
  }
`;

export const Address = styled.form`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  h1 {
    color: var(--zinc-100);
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;
  background: var(--zinc-700);
  color: var(--zinc-300);
  font-size: 1rem;
  padding: 0 0.75rem;

  border-radius: 4px;
  border: 0;
  outline: 0;

  &::placeholder {
    color: var(--zinc-400);
  }
`;
