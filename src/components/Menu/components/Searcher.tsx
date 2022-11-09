import { SetStateAction, useState } from "react";
import styled from "styled-components";

const StyledSearcher = styled.input`
  border: 1px solid ${({ theme }) => theme.borderBase};
  max-width: 425px;
  width: 100%;
  border-radius: 2px;
  overflow: hidden;
  padding: 4px 6px;
  color: ${({ theme }) => theme.textColorBase};
  background-color: ${({ theme }) => theme.backgroundBase};
`;

export interface ISearcher {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
}

function Searcher({ search, setSearch }: ISearcher) {
  return (
    <StyledSearcher
      type="search"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    ></StyledSearcher>
  );
}

export default Searcher;
