import styled from "styled-components";

const StyledSearcher = styled.div`
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid ${({ theme }) => theme.borderBase};
  border-radius: 2px;
  box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
  max-width: 425px;
  width: 100%;
  &:focus-within {
    outline: 1px solid ${({ theme }) => theme.borderBase};
  }
  label {
    flex-grow: 1;
    flex-shrink: 0;
    border: none;
    background-color: ${({ theme }) => theme.backgroundLevel2};
    box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
    border-left: 1px solid ${({ theme }) => theme.borderBase};
    width: 40px;
    line-height: 2.5rem;
    text-align: center;
    height: 40px;
    @media (min-width: 600px) {
      width: 64px;
      height: 40px;
    }
  }

  input {
    border: none;
    width: 80%;
    overflow: hidden;
    padding: 6px 6px;
    color: ${({ theme }) => theme.textColorBase};
    background-color: ${({ theme }) => theme.backgroundBase};
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.textColorBase};
      opacity: 0.7;
    }
  }
`;

export default StyledSearcher